type BinaryDigit = 0 | 1;
type Segment = `${BinaryDigit}${BinaryDigit}${BinaryDigit}`;

export type Code = `${Segment}-${Segment}-${Segment}`;

export function codeToDecimal(code: Code): string {
  const parts = code.split('-');

  if (parts.length !== 3 || parts.some(part => part.length !== 3)) {
    throw new Error('Invalid code format');
  }

  return parts.map(part => parseInt(part, 2).toString()).join('');
}
