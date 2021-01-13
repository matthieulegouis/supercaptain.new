import { db, firebase, auth } from '../../../firestore';

export default function updateProfile(payload) {
  return new Promise((resolve, reject) => {
    const user = auth.currentUser;
    const key = Object.keys(payload)[0];
    const userRef = db.collection('users').doc(user.uid);
    if (payload[key] !== '') {
      // Update the field when the payload is not empty
      userRef
        .update(payload)
        .then(() => resolve())
        .catch((error) => reject(error));
    } else {
      // Delete the field when the payload is empty
      const obj = {};
      obj[key] = firebase.firestore.FieldValue.delete();
      userRef
        .update(obj)
        .then(() => resolve())
        .catch((error) => reject(error));
    }
  });
}
