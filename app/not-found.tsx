'use client';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useSite } from '@/components/site-context';
export default function NotFound() {
  const { language } = useSite();
  return (
    <main id="top" className="not-found">
      <span>404 · OUT OF ROUTE</span>
      <h1>
        {language === 'zh' ? '该页面不存在' : 'This route does not exist'}
      </h1>
      <p>
        {language === 'zh'
          ? '返回主页，继续查看研究与项目。'
          : 'Return home to continue exploring the research and projects.'}
      </p>
      <Link href="/">
        <ArrowLeft />
        {language === 'zh' ? '返回首页' : 'Back home'}
      </Link>
    </main>
  );
}
