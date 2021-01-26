import { db, auth } from '../../../firestore';

export default function createCompany(name) {
  return new Promise((resolve, reject) => {
    const user = auth.currentUser;
    db.collection('companies')
      .add({
        name,
        admin: user.uid,
      })
      .then(() => resolve())
      .catch((error) => reject(error));
  });
}
