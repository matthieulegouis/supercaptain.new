import Link from 'next/link';

export default function Teaser({ data }) {
  return (
    <div>
      <Link href={`/companies/${data.id}`}>
        <a>{data.name}</a>
      </Link>
    </div>
  );
}
