import { notFound } from 'next/navigation';
import { notes, publishedNotes } from '@/content/notes';

export function generateStaticParams() {
  return publishedNotes.map((note) => ({ slug: note.slug }));
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = notes.find((item) => item.slug === slug && item.published);
  if (!note) notFound();
  return null;
}
