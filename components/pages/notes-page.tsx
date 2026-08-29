'use client';

import { EmptyState } from '@/components/empty-state';
import { PageHero } from '@/components/page-hero';
import { useSite } from '@/components/site-context';

export function NotesPage() {
  const { t } = useSite();
  return (
    <main id="top" className="page-main">
      <div className="content-width">
        <PageHero
          index="05"
          title={t.page.notesTitle}
          description={t.page.notesIntro}
        />
        <div className="notes-categories">
          {[
            'Cooperative Perception',
            'Autonomous Driving',
            'ROS & Robotics',
            'Embedded Systems',
            'Simulation',
            'Engineering & Deployment',
          ].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <EmptyState title={t.page.notesEmpty} body={t.page.notesEmptyBody} />
      </div>
    </main>
  );
}
