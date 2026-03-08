package com.ecommerce.backend.security.controller;

import com.ecommerce.backend.repository.UserRepository;
import com.ecommerce.backend.security.dto.request.LoginRequest;
import com.ecommerce.backend.security.dto.response.LoginResponse;
import com.ecommerce.backend.security.repository.RefreshTokenRepository;
import com.ecommerce.backend.security.service.AuthService;
import com.ecommerce.backend.security.service.AuthServiceImpl;
import com.ecommerce.backend.security.service.RefreshTokenService;
import com.ecommerce.backend.security.utils.CookieUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = {"http://localhost:5173", "https://tech-store-ts.vercel.app"})
public class AuthController {

    private final AuthService authService;

    private final RefreshTokenService refreshTokenService;

    public AuthController(UserRepository userRepository, AuthServiceImpl authService, RefreshTokenService refreshTokenService, RefreshTokenRepository refreshTokenRepository) {
        this.authService = authService;
        this.refreshTokenService = refreshTokenService;
    }

//    @PostMapping("/register")
//    public User register(@RequestBody User user) {
//        return authService.register(user);
//    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {

            LoginResponse result = authService.verify(loginRequest);
            ResponseCookie cookie = ResponseCookie.from("refresh_token", result.getRefresh_token())
                    .httpOnly(true)
                    .secure(true)
                    .path("/api/v1/auth")
                    .sameSite("Strict")
                    .maxAge(29 * 24 * 60 * 60)
                    .build();

            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(
                    LoginResponse.builder()
                            .access_token(result.getAccess_token())
                            .build());
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> generateAccessTokenViaRefreshToken(@CookieValue(value = "refresh_token", required = false) String refreshTokenFromCookie, HttpServletResponse response) {

        if (refreshTokenFromCookie == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("refresh token is invalid or null");

        if (refreshTokenFromCookie.isBlank())
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("missing refresh token!");

        LoginResponse result = refreshTokenService.generateAccessTokenAndRotateRefreshToken(refreshTokenFromCookie);

        // Update the cookie
        ResponseCookie cookie = ResponseCookie.from("refresh_token", result.getRefresh_token())
                .httpOnly(true)
                .secure(true) // true in prod
                .path("/api/v1/auth")
                .maxAge(30L * 24 * 60 * 60)
                .sameSite("Strict")
                .build();


        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(
                        LoginResponse.builder()
                                .access_token(result.getAccess_token())
                                .build()
                );
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            @CookieValue(value = "refresh_token", required = false) String refreshToken,
            HttpServletResponse response
    ) {
        authService.logout(refreshToken);

        ResponseCookie deleteCookie = CookieUtil.deleteRefreshTokenCookie();
        response.setHeader(HttpHeaders.SET_COOKIE, deleteCookie.toString());

        return ResponseEntity.ok(
                Map.of("message", "Logout successfully"));
    }
}
