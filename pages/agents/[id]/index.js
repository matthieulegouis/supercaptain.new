import fetchAgent from '../../../utils/functions/agent/fetchAgent';
import Main from '../../../components/layout/Main';
import Agent from '../../../components/agent/Full';

function Page(props) {
  const { username } = props;

  return (
    <Main title={username}>
      <Agent data={props} />
    </Main>
  );
}

export async function getServerSideProps(context) {
  const agent = await fetchAgent(context.params.id);
  if (!agent) {
    return {
      notFound: true,
    };
  }

  return {
    props: agent,
  };
}

export default Page;
