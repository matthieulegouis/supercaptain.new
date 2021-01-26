import { db } from '../../../firestore';

export default async function fetchCompanies() {
  const companies = [];
  const companiesRef = db.collection('companies');
  const snapshot = await companiesRef.get();
  snapshot.forEach((doc) => {
    companies.push({
      id: doc.id,
      name: doc.data().name || '',
    });
  });
  return new Promise((resolve) => {
    resolve(companies);
  });
}
