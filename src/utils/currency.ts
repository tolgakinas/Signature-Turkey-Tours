import { CurrencyCode, CurrencyConfig } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    rate: 1.0,
    label: 'USD ($)',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    rate: 0.92,
    label: 'EUR (€)',
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rate: 0.79,
    label: 'GBP (£)',
  },
  CAD: {
    code: 'CAD',
    symbol: 'CA$',
    rate: 1.36,
    label: 'CAD (CA$)',
  },
  AUD: {
    code: 'AUD',
    symbol: 'AU$',
    rate: 1.52,
    label: 'AUD (AU$)',
  },
  TRY: {
    code: 'TRY',
    symbol: '₺',
    rate: 34.2,
    label: 'TRY (₺)',
  },
};

export function formatPrice(
  usdAmount: number,
  currencyCode: CurrencyCode = 'USD'
): string {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = Math.round(usdAmount * currency.rate);
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code,
    maximumFractionDigits: 0,
  }).format(converted);
}
