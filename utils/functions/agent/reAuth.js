import { firebase } from '../../../firestore';

export default function reAuth(password) {
  return new Promise((resolve, reject) => {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}
