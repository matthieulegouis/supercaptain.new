// Check if fullname is correct
const checkFormatFullname = (fullname) => {
  if (fullname.length > 4) {
    return true;
  }
  return false;
};

export default checkFormatFullname;
