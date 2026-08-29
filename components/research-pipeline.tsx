'use client';

import {
  ArrowRight,
  CircleDot,
  Network,
  Route,
  ScanSearch,
  ShieldCheck,
} from 'lucide-react';
import { researchPipeline } from '@/content/research';
import { localize } from '@/lib/content';
import { useSite } from './site-context';

const icons = [ScanSearch, Network, CircleDot, Route, ShieldCheck];
export function ResearchPipeline() {
  const { language } = useSite();
  return (
    <div
      className="pipeline"
      aria-label={language === 'zh' ? '研究链路' : 'Research pipeline'}
    >
      {researchPipeline.map((stage, index) => {
        const Icon = icons[index];
        return (
          <div className="pipeline-unit" key={stage.key}>
            <div className="pipeline-stage">
              <span className="pipeline-icon">
                <Icon />
              </span>
              <small>{String(index + 1).padStart(2, '0')}</small>
              <strong>{localize(stage.title, language)}</strong>
              <p>{localize(stage.detail, language)}</p>
            </div>
            {index < researchPipeline.length - 1 && (
              <ArrowRight className="pipeline-arrow" />
            )}
          </div>
        );
      })}
    </div>
  );
}
