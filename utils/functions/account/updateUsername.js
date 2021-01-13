import { functions } from '../../../firestore';

export default function updateUsername(username) {
  return new Promise((resolve, reject) => {
    // Cloud function "updateUsername"
    const cloudFunction = functions.httpsCallable('updateUsername');
    cloudFunction({ username })
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}
