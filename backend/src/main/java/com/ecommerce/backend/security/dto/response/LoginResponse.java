package com.ecommerce.backend.security.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {
    private String access_token;

    @JsonIgnore
    private String refresh_token;

    @Builder.Default
    private String token_type = "BEARER";
}
