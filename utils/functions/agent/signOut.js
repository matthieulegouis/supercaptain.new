import { auth } from '../../../firestore';

export default function signOut() {
  return new Promise((resolve, reject) => {
    auth
      .signOut()
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}
