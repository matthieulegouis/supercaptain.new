import { db } from '../../../firestore';

export default async function fetchCompany(id) {
  const companyRef = db.collection('companies').doc(id);
  const doc = await companyRef.get();
  return new Promise((resolve, reject) => {
    if (!doc.exists) reject();
    else {
      const data = {
        id,
        name: doc.data().name || '',
      };
      resolve(data);
    }
  });
}
