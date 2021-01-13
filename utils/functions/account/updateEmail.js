import { functions } from '../../../firestore';
import signIn from './signIn';

export default function updateEmail(email, password) {
  return new Promise((resolve, reject) => {
    console.log('aa', email, password);
    // Cloud function "updateEmail"
    const cloudFunction = functions.httpsCallable('updateEmail');
    cloudFunction({ email })
      .then(() => signIn(email, password))
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}
