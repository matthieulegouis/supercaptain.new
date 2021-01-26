import { db } from '../../../firestore';

export default async function fetchAgents() {
  const agents = [];
  const agentsRef = db.collection('users');
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
