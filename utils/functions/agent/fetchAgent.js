import { db } from '../../../firestore';

export default async function fetchAgent(id) {
  const agentRef = db.collection('users').doc(id);
  const doc = await agentRef.get();
  return new Promise((resolve, reject) => {
    if (!doc.exists) reject();
    else {
      const data = {
        id,
        username: doc.data().username || '',
        fullName: doc.data().fullName || '',
        title: doc.data().title || '',
        avatar: doc.data().avatar || '',
      };
      resolve(data);
    }
  });
}
