import fetchMission from '../../../utils/functions/mission/fetchMission';
import Main from '../../../components/layout/Main';
import Full from '../../../components/mission/Full';

function Page(props) {
  const { title } = props;

  return (
    <Main title={title}>
      <Full data={props} />
    </Main>
  );
}

export async function getServerSideProps(context) {
  const mission = await fetchMission(context.params.id);
  if (!mission) {
    return {
      notFound: true,
    };
  }

  return {
    props: mission,
  };
}

export default Page;
