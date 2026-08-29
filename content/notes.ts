import type { NoteMeta } from './types';

export const notes: NoteMeta[] = [
  {
    slug: 'draft-writing-template',
    title: {
      zh: '技术笔记写作模板（草稿）',
      en: 'Technical Note Template (Draft)',
    },
    summary: {
      zh: '仅用于说明笔记内容结构，不会出现在公开列表中。',
      en: 'A structure example only; it is excluded from the public notes list.',
    },
    tags: ['Draft'],
    published: false,
  },
];

export const publishedNotes = notes.filter((note) => note.published);
