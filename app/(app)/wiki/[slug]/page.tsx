import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getWikiPathway } from '@/lib/wiki-content';
import WikiMarkdown from '@/components/WikiMarkdown';

export default async function WikiPathwayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pathway = await getWikiPathway(slug);
  if (!pathway) notFound();

  return (
    <div className="flex-1 overflow-y-auto bg-paper p-4 sm:p-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/wiki" className="text-xs font-medium text-ink-soft transition hover:text-coral">
          ← The Wiki
        </Link>
        <div className="mt-4 rounded-2xl border border-navy/10 bg-white p-6 sm:p-8">
          <WikiMarkdown markdown={pathway.content} />
        </div>
      </div>
    </div>
  );
}
