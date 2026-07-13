import dayjs from "dayjs";
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";

/**
 * Formats a numeric value into a currency string.
 * Defaults to USD formatting as standard U.S. money ($ with exactly two decimal places).
 * Handles the formatting using Intl.NumberFormat and falls back to a manual formatting
 * in case Intl is not fully supported or fails (e.g. invalid currency codes).
 *
 * @param value - The numeric value or string representing the value to format.
 * @param currency - The currency code (default: 'USD').
 * @returns Formatted currency string.
 */
export function formatCurrency(
  value: number | string,
  currency: string = "USD"
): string {
  // Convert value to a float number
  const numericValue = typeof value === "number" ? value : parseFloat(value);

  // Return fallback for non-numeric values
  if (isNaN(numericValue)) {
    return "$0.00";
  }

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericValue);
  } catch (error) {
    // Fallback: manually format standard U.S. money or the specified currency symbol
    const symbols: Record<string, string> = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
      CAD: "CA$",
      AUD: "A$",
      INR: "₹",
    };

    const symbol = symbols[currency.toUpperCase()] || "$";
    return `${symbol}${numericValue.toFixed(2)}`;
  }
}

export const formatSubscriptionDateTime = (value?: string): string => {
  if(!value) return "Not provided";
  const parsedDate = dayjs(value);
  return parsedDate.isValid() ? parsedDate.format("MM/DD/YYYY") : "Not provided";
};

export const formatStatusLabel = (value?: string): string => {
  if(!value) return "Unknown";
  return value.charAt(0).toUpperCase() + value.slice(1);
};
