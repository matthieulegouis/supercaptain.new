// Check if username is correct
const minLength = 4;
const maxLength = 31;

const checkFormatUsername = (username) => {
  if (username && (username.length > minLength) && (username.length < maxLength)) {
    const re = /^[0-9a-zA-Z_.-]+$/;
    return re.test(String(username).toLowerCase());
  }
  return false;
};

export default checkFormatUsername;
