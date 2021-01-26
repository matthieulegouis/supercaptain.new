import { db, auth } from '../../../firestore';

export default function createMission(title) {
  return new Promise((resolve, reject) => {
    const user = auth.currentUser;
    db.collection('missions')
      .add({
        title,
        admin: user.uid,
      })
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}
