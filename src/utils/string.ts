function isNumber(value: any) {
  return isFinite(value);
}

function nextChar(c: string) {
  return c ? String.fromCharCode(c.charCodeAt(0) + 1) : 'A';
}

function nextMultiChar(s: string) {
  return s.replace(/([^Z]?)(Z*)$/, (_, a, z) => nextChar(a) + z.replace(/Z/g, 'A'));
}

export function getNextCharacter(character: string) {
  if (isNumber(character)) {
    return `${+character + 1}`;
  }

  return nextMultiChar(character);
}
