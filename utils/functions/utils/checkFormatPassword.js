export default function checkFormatPassword(password) {
  if (password.length > 7) return true;
  return false;
}
