import { functions } from '../../../firestore';

export default function sendEmailCode(email) {
  return new Promise((resolve, reject) => {
    // Cloud function "sendVerificationCode"
    const cloudFunction = functions.httpsCallable('sendVerificationCode');
    cloudFunction({ email })
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}
