import { useEffect, useState } from 'react';

import fetchAgents from '../../utils/functions/agent/fetchAgents';
import Main from '../../components/layout/Main';
import Teaser from '../../components/agent/Teaser';

export default function Page() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetchAgents().then((data) => setAgents(data));
  }, []);

  return (
    <Main title="Account">
      {agents.map((agent) => (
        <Teaser key={agent.id} data={agent} />
      ))}
    </Main>
  );
}
