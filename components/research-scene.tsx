'use client';

import { Network } from 'lucide-react';
import { useSite } from './site-context';

export function ResearchScene() {
  const { language } = useSite();
  return (
    <figure
      className="research-scene"
      aria-label={
        language === 'zh'
          ? '两辆协作车辆共享被遮挡目标信息并生成规划轨迹的鸟瞰研究图景'
          : 'Bird’s-eye research scene where two cooperative vehicles share an occluded target and generate a planned trajectory'
      }
    >
      <div className="scene-label">
        <Network size={15} /> V2V COOPERATIVE SCENE <span>CONCEPT VIEW</span>
      </div>
      <svg viewBox="0 0 640 520" aria-hidden="true">
        <defs>
          <linearGradient id="road" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#102238" />
            <stop offset="1" stopColor="#081421" />
          </linearGradient>
          <linearGradient id="cone" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#38bdf8" stopOpacity=".38" />
            <stop offset="1" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
          <filter id="sceneGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="640" height="520" rx="24" fill="url(#road)" />
        <g opacity=".22" stroke="#8ea4ba">
          {Array.from({ length: 13 }).map((_, i) => (
            <line key={`v${i}`} x1={i * 54} y1="0" x2={i * 54} y2="520" />
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 52} x2="640" y2={i * 52} />
          ))}
        </g>
        <path
          d="M80 0V520M320 0V520M560 0V520"
          stroke="#e6eef7"
          strokeOpacity=".2"
          strokeWidth="2"
          strokeDasharray="16 18"
        />
        <path
          className="trajectory"
          d="M155 470C168 390 224 350 262 306C306 256 305 172 390 128C433 106 483 92 526 49"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#sceneGlow)"
          strokeDasharray="8 8"
        />
        <path d="M166 399L40 330L40 468Z" fill="url(#cone)" />
        <path
          d="M457 160L600 82L600 240Z"
          fill="url(#cone)"
          transform="rotate(180 528 161)"
        />
        <g transform="translate(132 364) rotate(-8)">
          <rect
            width="72"
            height="118"
            rx="20"
            fill="#0e2a42"
            stroke="#38bdf8"
            strokeWidth="2"
          />
          <rect
            x="11"
            y="23"
            width="50"
            height="55"
            rx="12"
            fill="#38bdf8"
            fillOpacity=".18"
          />
          <circle cx="36" cy="14" r="4" fill="#22d3ee" />
        </g>
        <g transform="translate(429 100) rotate(12)">
          <rect
            width="72"
            height="118"
            rx="20"
            fill="#172642"
            stroke="#818cf8"
            strokeWidth="2"
          />
          <rect
            x="11"
            y="23"
            width="50"
            height="55"
            rx="12"
            fill="#818cf8"
            fillOpacity=".18"
          />
          <circle cx="36" cy="14" r="4" fill="#818cf8" />
        </g>
        <rect
          x="270"
          y="188"
          width="105"
          height="158"
          rx="8"
          fill="#07111f"
          stroke="#304960"
          strokeWidth="2"
        />
        <g transform="translate(405 278)">
          <circle r="17" fill="#f2b84b" fillOpacity=".16" stroke="#f2b84b" />
          <circle r="5" fill="#f2b84b" />
          <text x="28" y="5" fill="#f2d08a" fontSize="12">
            OCCLUDED AGENT
          </text>
        </g>
        <path
          className="signal"
          d="M191 385C260 330 349 245 456 166"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeDasharray="5 9"
        />
        <g fill="#22d3ee" filter="url(#sceneGlow)">
          <circle cx="248" cy="334" r="4" />
          <circle cx="321" cy="273" r="4" />
          <circle cx="392" cy="212" r="4" />
        </g>
        <g transform="translate(30 30)">
          <rect
            width="202"
            height="54"
            rx="10"
            fill="#07111f"
            stroke="#24435d"
          />
          <text x="16" y="22" fill="#8ea4ba" fontSize="10">
            SHARED SEMANTIC EVIDENCE
          </text>
          <text x="16" y="41" fill="#e6eef7" fontSize="13">
            vehicle · occlusion · intent
          </text>
        </g>
        <g transform="translate(403 417)">
          <rect
            width="207"
            height="66"
            rx="10"
            fill="#07111f"
            stroke="#24435d"
          />
          <text x="15" y="24" fill="#8ea4ba" fontSize="10">
            PLANNING CONFIDENCE
          </text>
          <rect x="15" y="38" width="145" height="5" rx="3" fill="#18334a" />
          <rect x="15" y="38" width="108" height="5" rx="3" fill="#22d3ee" />
          <text x="170" y="44" fill="#22d3ee" fontSize="11">
            EVIDENCE
          </text>
        </g>
      </svg>
      <div className="scene-legend">
        <span>
          <i className="cyan" />
          {language === 'zh' ? '自车感知' : 'ego perception'}
        </span>
        <span>
          <i className="violet" />
          {language === 'zh' ? '协作视角' : 'cooperative view'}
        </span>
        <span>
          <i className="amber" />
          {language === 'zh' ? '遮挡目标' : 'occluded target'}
        </span>
      </div>
    </figure>
  );
}
