import { db } from '../../../firestore';

export default function checkAvailabilityEmail(email) {
  return new Promise((resolve, reject) => {
    db.collection('emails')
      .doc(email)
      .get()
      .then((doc) => {
        if (doc.exists) reject();
        else resolve();
      })
      .catch(() => reject());
  });
}
