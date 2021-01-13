const MIN_LENGTH = 4;
const MAX_LENGTH = 31;

export default function checkFormatUsername(username) {
  if (username && username.length > MIN_LENGTH && username.length < MAX_LENGTH) {
    const re = /^[0-9a-zA-Z_.-]+$/;
    return re.test(String(username).toLowerCase());
  }
  return false;
}
