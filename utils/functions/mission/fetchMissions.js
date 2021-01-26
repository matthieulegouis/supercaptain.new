import { db } from '../../../firestore';

export default async function fetchMissions() {
  const missions = [];
  const missionsRef = db.collection('missions');
  const snapshot = await missionsRef.get();
  snapshot.forEach((doc) => {
    missions.push({
      id: doc.id,
      title: doc.data().title || '',
    });
  });
  return new Promise((resolve) => {
    resolve(missions);
  });
}
