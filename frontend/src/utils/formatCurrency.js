const formatter = new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "INR",
	maximumFractionDigits: 0,
});

export function formatCurrencyInr(amount) {
	return formatter.format(amount);
}
