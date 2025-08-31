export interface ExchangeRates {
  INR: number;
  USD: number;
  EUR: number;
  GBP: number;
}

export type Currency = keyof ExchangeRates;

export const currencySymbols: Record<Currency, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£'
};

export const currencyNames: Record<Currency, string> = {
  INR: 'Indian Rupee',
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound'
};

// Default exchange rates (1 USD = X other currencies)
export const defaultExchangeRates: ExchangeRates = {
  INR: 83.0,  // 1 USD = 83 INR
  USD: 1.0,   // Base currency
  EUR: 0.92,  // 1 USD = 0.92 EUR
  GBP: 0.79   // 1 USD = 0.79 GBP
};

export const convertCurrency = (
  amount: number, 
  fromCurrency: Currency = 'INR', 
  toCurrency: Currency = 'INR',
  exchangeRates: ExchangeRates = defaultExchangeRates
): number => {
  if (fromCurrency === toCurrency) return amount;
  
  // Convert to USD first (base currency)
  const usdAmount = amount / exchangeRates[fromCurrency];
  // Then convert to target currency
  return usdAmount * exchangeRates[toCurrency];
};

export const formatCurrency = (
  amount: number, 
  currency: Currency = 'INR',
  exchangeRates: ExchangeRates = defaultExchangeRates
): string => {
  const symbol = currencySymbols[currency];
  
  switch (currency) {
    case 'INR':
      return `${symbol}${Math.round(amount).toLocaleString('en-IN')}`;
    case 'USD':
      return `${symbol}${amount.toFixed(2)}`;
    case 'EUR':
      return `${symbol}${amount.toFixed(2)}`;
    case 'GBP':
      return `${symbol}${amount.toFixed(2)}`;
    default:
      return `${symbol}${amount.toFixed(2)}`;
  }
};

export const getConvertedPrice = (
  originalPrice: number,
  originalCurrency: Currency = 'INR',
  targetCurrency: Currency,
  exchangeRates: ExchangeRates = defaultExchangeRates
): string => {
  const convertedAmount = convertCurrency(originalPrice, originalCurrency, targetCurrency, exchangeRates);
  return formatCurrency(convertedAmount, targetCurrency, exchangeRates);
};

// Fetch real-time exchange rates from a free API
export const fetchExchangeRates = async (): Promise<ExchangeRates> => {
  try {
    // Using a free exchange rate API
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    
    return {
      INR: data.rates.INR || defaultExchangeRates.INR,
      USD: 1.0,
      EUR: data.rates.EUR || defaultExchangeRates.EUR,
      GBP: data.rates.GBP || defaultExchangeRates.GBP
    };
  } catch (error) {
    console.warn('Failed to fetch exchange rates, using defaults:', error);
    return defaultExchangeRates;
  }
};
