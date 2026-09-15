export const USD_RATE = 280; // 1 USD = 280 PKR

export function formatCurrency(amountInPKR, currency = 'PKR') {
  if (currency === 'USD') {
    const usdAmount = Math.round(amountInPKR / USD_RATE);
    return `$${usdAmount.toLocaleString('en-US')}`;
  }
  
  return `PKR ${amountInPKR.toLocaleString('en-PK')}`;
}

export function convertAmount(amountInPKR, currency = 'PKR') {
  if (currency === 'USD') {
    return Math.round(amountInPKR / USD_RATE);
  }
  return amountInPKR;
}
