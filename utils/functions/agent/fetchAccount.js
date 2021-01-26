import { db, auth } from '../../../firestore';

export default function fetchAccount() {
  return new Promise((resolve, reject) => {
    const user = auth.currentUser;
    db.collection('users')
      .doc(user.uid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const data = {
            id: user.uid,
            username: doc.data().username,
            fullName: doc.data().fullName,
            gender: doc.data().gender,
            birthday: new Date(doc.data().birthday.seconds * 1000),
            language: doc.data().language,
            title: doc.data().title,
          };
          resolve(data);
        } else {
          reject();
        }
      });
  });
}
