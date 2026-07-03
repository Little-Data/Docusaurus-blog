import React, {useState, useEffect, useRef, useMemo} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';

const METEOR_COUNT = 80;
const FIRE_CHANCE = 0.1;
const RAINBOW_CHANCE = 0.05;

const METEOR_COLORS = [
  '#93c5fd', '#a78bfa', '#38bdf8',
  '#fcd34d', '#fb923c', '#f87171',
];

const FIRE_COLORS = [
  '#ffffff', '#ffe066', '#ffb3ba', '#b3fffd', '#cda0ff',
];

function randomColor(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function FooterLayout({style, links, logo, copyright}) {
  const showerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // 首次进入视口时，一次性生成全部随机数据
  const meteors = useMemo(() => {
    if (!visible) return [];

    return Array.from({length: METEOR_COUNT}).map((_, i) => {
      const roll = Math.random();
      const isRainbow = roll < RAINBOW_CHANCE;
      const isFire = !isRainbow && roll < RAINBOW_CHANCE + FIRE_CHANCE;

      const color = isRainbow
        ? 'rainbow'
        : isFire
          ? randomColor(FIRE_COLORS)
          : randomColor(METEOR_COLORS);

      const cls = isRainbow
        ? 'rainbow'
        : isFire
          ? 'fire'
          : Math.random() > 0.5
            ? 'warm'
            : 'cold';

      // 起始 X 全容器随机
      const startX = Math.random() * 100;

      // 起始 Y 也随机（从顶部到容器中部）
      const startY = -(Math.random() * 40 + 5); // -5% ~ -45%

      // 落点随机偏移
      const offsetX = (Math.random() - 0.5) * 50; // ±25%
      const endX = Math.max(0, Math.min(100, startX + offsetX));

      // 速度随机
      const duration = isFire
        ? 5 + Math.random() * 3
        : 2.5 + Math.random() * 3;

      // 延迟随机（分散启动）
      const delay = Math.random() * 10;

      // 大小随机
      const size = isFire
        ? 12 + Math.random() * 8
        : 6 + Math.random() * 6;

      return {
        key: `${i}-${startX.toFixed(1)}`, // 防止复用
        cls,
        color,
        isFire,
        isRainbow,
        startX,
        startY,
        endX,
        duration,
        delay,
        size,
      };
    });
  }, [visible]); // 只在首次可见时生成

  useEffect(() => {
    const el = showerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      {threshold: 0.1}
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      className={clsx(
        ThemeClassNames.layout.footer.container,
        'footer',
        {'footer--dark': style === 'dark'}
      )}
    >
      <div ref={showerRef} className="meteor-shower">
        {meteors.map((m) => (
          <span
            key={m.key}
            className={clsx('meteor', m.cls)}
            style={{
              '--start-x': `${m.startX}%`,
              '--start-y': `${m.startY}%`,
              '--end-x': `${m.endX}%`,
              '--duration': `${m.duration}s`,
              '--delay': `${m.delay}s`,
              '--size': `${m.size}px`,
              '--color': m.color !== 'rainbow' ? m.color : undefined,
            }}
          >
            <i
              className={clsx(
                'meteor-tail',
                m.isFire && 'fire',
                m.isRainbow && 'rainbow'
              )}
            />
          </span>
        ))}
      </div>

      <div className="container container-fluid">
        {links}
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && <div className="margin-bottom--sm">{logo}</div>}
            {copyright}
          </div>
        )}
      </div>
    </footer>
  );
}