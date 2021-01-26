import { useEffect, useState } from 'react';

import fetchCompanies from '../../utils/functions/company/fetchCompanies';
import Main from '../../components/layout/Main';
import Teaser from '../../components/company/Teaser';

export default function Page() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies().then((data) => setCompanies(data));
  }, []);

  return (
    <Main title="Account">
      {companies.map((company) => (
        <Teaser key={company.id} data={company} />
      ))}
    </Main>
  );
}
