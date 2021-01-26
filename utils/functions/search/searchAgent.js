import { db } from '../../../firestore';

export default async function searchAgents(string) {
  const agents = [];
  const agentsRef = db.collection('users').where('username', '<=', string);
  const snapshot = await agentsRef.get();
  snapshot.forEach((doc) => {
    agents.push({
      id: doc.id,
      username: doc.data().username || '',
      fullName: doc.data().fullName || '',
      title: doc.data().title || '',
      avatar: doc.data().avatar || '',
    });
  });
  return new Promise((resolve) => {
    resolve(agents);
  });
}
