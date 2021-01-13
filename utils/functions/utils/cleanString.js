// Clean string by removing spaces and accents
export default function cleanString(string) {
  if (string) {
    return string
      .toLowerCase()
      .replace(/\s/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
  return false;
}
