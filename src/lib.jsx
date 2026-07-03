import React, { useState, useEffect } from 'react';

/**
 * Parse a CSS declaration string ("padding:12px;color:var(--fg)") into a
 * React style object. Lets us keep the design's inline styles verbatim.
 */
export function sx(str) {
  const out = {};
  if (!str) return out;
  for (const decl of str.split(';')) {
    if (!decl.trim()) continue;
    const i = decl.indexOf(':');
    if (i === -1) continue;
    const key = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    // -webkit-background-clip -> WebkitBackgroundClip, background-clip -> backgroundClip
    const camel = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[camel] = val;
  }
  return out;
}

/** Merge several CSS strings / style objects into one style object. */
export function merge(...parts) {
  return parts.reduce((acc, p) => {
    if (!p) return acc;
    return { ...acc, ...(typeof p === 'string' ? sx(p) : p) };
  }, {});
}

/** Hover state hook returning [hovered, bindProps]. */
export function useHover() {
  const [hovered, setHovered] = useState(false);
  return [
    hovered,
    {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    },
  ];
}

/**
 * Element that applies `base` styles normally and merges `hover` styles while
 * hovered — mirrors the design system's style-hover behaviour.
 */
export function HoverBox({ as: Tag = 'div', base, hover, style, children, ...rest }) {
  const [hovered, bind] = useHover();
  return (
    <Tag
      style={merge(base, style, hovered ? hover : null)}
      {...bind}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Reactive media-query hook. Returns true while `query` matches the viewport,
 * and updates on resize / orientation change. Used to switch inline layouts
 * (e.g. multi-column → stacked) on phones and small tablets.
 */
export function useMediaQuery(query) {
  const get = () =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(query).matches
      : false;
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    // addEventListener is the modern API; addListener is the Safari <14 fallback.
    if (mql.addEventListener) mql.addEventListener('change', onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', onChange);
      else mql.removeListener(onChange);
    };
  }, [query]);
  return matches;
}

/** Countdown to `start`; reports live/over windows. Ticks every second. */
export function useCountdown(startISO, endISO) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const start = new Date(startISO).getTime();
  const end = new Date(endISO).getTime();
  const diff = Math.max(0, start - now);
  const pad = (n) => String(n).padStart(2, '0');

  return {
    days: pad(Math.floor(diff / 86400000)),
    hours: pad(Math.floor(diff / 3600000) % 24),
    mins: pad(Math.floor(diff / 60000) % 60),
    secs: pad(Math.floor(diff / 1000) % 60),
    live: now >= start && now < end,
    over: now >= end,
  };
}
