import { firebase, auth } from '../../../firestore';

export default function signIn(email, password) {
  return new Promise((resolve, reject) => {
    auth
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => auth.signInWithEmailAndPassword(email, password))
      .then((user) => resolve(user))
      .catch((error) => reject(error));
  });
}
