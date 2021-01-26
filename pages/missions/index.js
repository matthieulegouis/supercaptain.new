import { useEffect, useState } from 'react';

import fetchMissions from '../../utils/functions/mission/fetchMissions';
import Main from '../../components/layout/Main';
import Teaser from '../../components/mission/Teaser';

export default function Page() {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    fetchMissions().then((data) => setMissions(data));
  }, []);

  return (
    <Main title="Account">
      {missions.map((mission) => (
        <Teaser key={mission.id} data={mission} />
      ))}
    </Main>
  );
}
