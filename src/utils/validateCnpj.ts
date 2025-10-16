export function isValidCnpj(cnpj: string): boolean {
    const clean = cnpj.replace(/\D/g, '');
  
    if (clean.length !== 14 || /^(\d)\1+$/.test(clean)) return false;
  
    const calcCheckDigit = (length: number) => {
      const weights = length === 12
        ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  
      const numbers = clean
        .substring(0, length)
        .split('')
        .map((n) => parseInt(n, 10));
  
      const sum = numbers.reduce((acc, digit, i) => acc + digit * weights[i], 0);
      const remainder = sum % 11;
  
      return remainder < 2 ? 0 : 11 - remainder;
    };
  
    const digit1 = calcCheckDigit(12);
    const digit2 = calcCheckDigit(13);
  
    return digit1 === parseInt(clean[12], 10) && digit2 === parseInt(clean[13], 10);
  }
  