import { db, auth } from '../../firestore';

export default function fetchProfile() {
  return new Promise((resolve, reject) => {
    const user = auth.currentUser;
    db.collection('users')
      .doc(user.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const data = {
            username: doc.data().username,
            fullName: doc.data().fullName,
            gender: doc.data().gender,
            birthday: doc.data().birthday,
          };
          resolve(data);
        } else {
          reject();
        }
      });
  });
}
