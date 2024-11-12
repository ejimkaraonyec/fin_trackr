type FormatOptions = {
  /**
   * Include the currency symbol (₦)
   * @default true
   */
  showCurrency?: boolean;
  /**
   * Number of decimal places to show
   * @default 2
   */
  decimals?: number;
  /**
   * Show decimals even if they're zero
   * @default false
   */
  forceDecimals?: boolean;
  /**
   * Format negative numbers with parentheses instead of minus sign
   * @default false
   */
  useParentheses?: boolean;
};

/**
 * Formats a number as Nigerian Naira
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted string
 *
 * @example
 * formatNaira(1234567.89) // "₦1,234,567.89"
 * formatNaira(1234567.89, { showCurrency: false }) // "1,234,567.89"
 * formatNaira(1234567, { decimals: 0 }) // "₦1,234,567"
 * formatNaira(-1234.56, { useParentheses: true }) // "(₦1,234.56)"
 */
export function formatNaira(
  amount: number,
  options: FormatOptions = {}
): string {
  const {
    showCurrency = true,
    decimals = 2,
    forceDecimals = false,
    useParentheses = false,
  } = options;

  // Handle negative numbers
  const isNegative = amount < 0;
  const absoluteAmount = Math.abs(amount);

  // Format the number with proper grouping and decimals
  const formatted = new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: forceDecimals ? decimals : 0,
    maximumFractionDigits: decimals,
    useGrouping: true,
  }).format(absoluteAmount);

  // Build the final string
  let result = "";

  // Add currency symbol if requested
  if (showCurrency) {
    result += "₦";
  }

  // Handle negative numbers and parentheses
  if (isNegative) {
    if (useParentheses) {
      return `(${result}${formatted})`;
    }
    return `-${result}${formatted}`;
  }

  return `${result}${formatted}`;
}

/**
 * Formats a compact version of the amount (e.g., 1.2M, 50K)
 * Useful for displaying large numbers in limited space
 *
 * @example
 * formatCompactNaira(1234567) // "₦1.2M"
 * formatCompactNaira(1234) // "₦1.2K"
 */
export function formatCompactNaira(
  amount: number,
  showCurrency = true
): string {
  const formatted = new Intl.NumberFormat("en-NG", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);

  return showCurrency ? `₦${formatted}` : formatted;
}

/**
 * Parses a formatted Naira string back to a number
 * @param value - The formatted string to parse
 * @returns number
 *
 * @example
 * parseNairaString("₦1,234.56") // 1234.56
 * parseNairaString("(₦1,234.56)") // -1234.56
 */
export function parseNairaString(value: string): number {
  // Remove currency symbol and commas
  const cleaned = value.replace(/[₦,]/g, "");

  // Check for parentheses (negative numbers)
  if (cleaned.startsWith("(") && cleaned.endsWith(")")) {
    return -Number(cleaned.slice(1, -1));
  }

  return Number(cleaned);
}
