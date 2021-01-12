import { auth } from '../../firestore';

export default function updatePassword(password) {
  return new Promise((resolve, reject) => {
    const user = auth.currentUser;
    user
      .updatePassword(password)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}
