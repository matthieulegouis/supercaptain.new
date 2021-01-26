import calculateAge from './calculateAge';
import MINIMUM_AGE from '../../consts/minimumAge';

export default function checkBirthday(date) {
  const age = calculateAge(date);
  if (age > MINIMUM_AGE - 1) {
    return true;
  }
  return false;
}
