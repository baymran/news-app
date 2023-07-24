export function removeLeadingSlash(str: string): string {
  if (str.charAt(0) === '/') {
    str = str.substr(1);
  }

  if (str.charAt(str.length - 1) === '/') {
    str = str.substr(0, str.length - 1);
  }

  return str;
}
