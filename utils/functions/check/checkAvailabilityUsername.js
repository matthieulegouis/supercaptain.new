import { db } from '../../../firestore';

export default function checkAvailabilityUsername(username) {
  return new Promise((resolve, reject) => {
    db.collection('usernames')
      .doc(username)
      .get()
      .then((doc) => {
        if (doc.exists) reject();
        else resolve();
      })
      .catch(() => reject());
  });
}
