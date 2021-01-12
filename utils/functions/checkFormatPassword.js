// Check if password is correct
const checkFormatPassword = (password) => {
  if (password.length > 7) {
    return true;
  }
  return false;
};

export default checkFormatPassword;
