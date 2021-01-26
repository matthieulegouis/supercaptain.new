import Link from 'next/link';

export default function Teaser({ data }) {
  return (
    <div>
      <Link href={`/agents/${data.id}`}>
        <a>{data.username}</a>
      </Link>
    </div>
  );
}
