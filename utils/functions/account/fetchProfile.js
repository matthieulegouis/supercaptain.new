import { db, auth } from '../../../firestore';

export default function fetchProfile() {
  return new Promise((resolve, reject) => {
    const user = auth.currentUser;
    db.collection('users')
      .doc(user.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const data = {
            email: doc.data().email,
            fullName: doc.data().fullName,
            gender: doc.data().gender,
            birthday: doc.data().birthday,
            language: doc.data().language,
          };
          resolve(data);
        } else {
          reject();
        }
      });
  });
}
