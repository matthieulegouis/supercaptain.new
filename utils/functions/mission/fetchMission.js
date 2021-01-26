import { db } from '../../../firestore';

export default async function fetchMission(id) {
  const missionRef = db.collection('missions').doc(id);
  const doc = await missionRef.get();
  return new Promise((resolve, reject) => {
    if (!doc.exists) reject();
    else {
      const data = {
        id,
        title: doc.data().title || '',
      };
      resolve(data);
    }
  });
}
