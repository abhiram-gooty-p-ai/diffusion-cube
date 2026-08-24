import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getWikiPathway } from '@/lib/wiki-content';
import WikiMarkdown from '@/components/WikiMarkdown';

export default async function WikiPathwayPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { slug } = await params;
  const { from } = await searchParams;
  const pathway = await getWikiPathway(slug);
  if (!pathway) notFound();

  // "View it live" from the Contributor's pathway pane links here with
  // ?from=contribute so the back link returns there instead of the wiki
  // index — this page is reached from either place, so the back
  // destination has to depend on how the visitor arrived, not just default
  // to the wiki.
  const backHref = from === 'contribute' ? '/contribute' : '/wiki';
  const backLabel = from === 'contribute' ? '← Back to Contributions' : '← The Wiki';

  return (
    <div className="flex-1 overflow-y-auto bg-paper p-4 sm:p-8">
      <div className="mx-auto max-w-3xl">
        <Link href={backHref} className="text-xs font-medium text-ink-soft transition hover:text-coral">
          {backLabel}
        </Link>
        <div className="mt-4 rounded-2xl border border-navy/10 bg-white p-6 sm:p-8">
          <WikiMarkdown markdown={pathway.content} />
        </div>
      </div>
    </div>
  );
}
