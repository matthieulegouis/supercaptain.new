import fetchCompany from '../../../utils/functions/company/fetchCompany';
import Main from '../../../components/layout/Main';
import Full from '../../../components/company/Full';

function Page(props) {
  const { name } = props;

  return (
    <Main title={name}>
      <Full data={props} />
    </Main>
  );
}

export async function getServerSideProps(context) {
  const company = await fetchCompany(context.params.id);
  if (!company) {
    return {
      notFound: true,
    };
  }

  return {
    props: company,
  };
}

export default Page;
