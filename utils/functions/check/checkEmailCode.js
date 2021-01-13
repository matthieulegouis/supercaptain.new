import { functions } from '../../../firestore';

export default function checkEmailCode(email, code) {
  return new Promise((resolve, reject) => {
    // Cloud function "verifyCode"
    const cloudFunction = functions.httpsCallable('verifyCode');
    cloudFunction({ email, code })
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}
