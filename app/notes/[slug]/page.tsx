import { notFound } from 'next/navigation';
import { notes } from '@/content/notes';
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
