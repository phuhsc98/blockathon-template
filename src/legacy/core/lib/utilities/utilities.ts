export function utilities(): string {
  return 'utilities';
}

export const arrayBuilder = (num: number) => Array.from(Array(num).keys());

export function convertRemToPixels(rem: number) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function numberToStringPadStart(num: number, str = '0') {
  return num.toString().padStart(2, str);
}

export function getEnv(): object {
  return process.env;
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function numberToAlphabet(number: number, result = ''): string {
  let charIndex = number % alphabet.length;
  let quotient = number / alphabet.length;
  if (charIndex - 1 == -1) {
    charIndex = alphabet.length;
    quotient--;
  }
  result = alphabet.charAt(charIndex - 1) + result;

  if (quotient >= 1) {
    return numberToAlphabet(parseInt(`${quotient}`), result);
  }

  return result;
}

export function isInteger(number: number) {
  return number % 1 === 0;
}

export function checkIfKeyExistsInEnumType<T extends string>(key: T, enumType: Record<string, T>): boolean {
  return key in enumType;
}

export function getEnvValue(key: string): string {
  if (!key) return '';

  return process.env[key] || '';
}
