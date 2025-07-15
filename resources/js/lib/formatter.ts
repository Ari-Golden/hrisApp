// lib/formatter.ts
export const formatCurrency = (val: number): string => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(val);
