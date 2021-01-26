import Link from 'next/link';

export default function Teaser({ data }) {
  return (
    <div>
      <Link href={`/missions/${data.id}`}>
        <a>{data.title}</a>
      </Link>
    </div>
  );
}
