import React, { useState, useEffect } from 'react';
import { sx, merge, HoverBox, useCountdown, useMediaQuery } from './lib.jsx';
import {
  NAV, STATS, FACTS, TRACK_DATA, TAG, DAY1, DAY2, PANELS, RULE_CARDS,
  FAQ_DATA, REG_STEPS, TEAM, initials, EVENT_START, EVENT_END,
} from './data.js';
import qrRegister from './qr-register.svg';
import rulebookPdf from './assets/SparkEEC_1_0_Rulebook.pdf';
import sociseLogo from './assets/socise logo.jpg';
import awsLogo from './assets/aws logo.jpg';
import everestLogo from './assets/everest logo.jpg';
import ieeeLogo from './assets/ieee student branch EEC.jpeg';
import hultLogo from './assets/Hult logo.jpg';
import anishPhoto from './assets/anish bhattarai.jpeg';
import sagarPhoto from './assets/Sagar Bist.jpeg';
import nehaPalPhoto from './assets/nehapal.jpeg';
import saminThapaPhoto from './assets/samin thapa photo.jpeg';
import subashBhattaPhoto from './assets/subash bhatta photo.jpeg';
import swornimaPhoto from './assets/swornima.jpeg';
import rehanPhoto from './assets/rehan lamichhane.jpeg';
import piyushPhoto from './assets/piyush chand.jpeg';

/* Team member photos — keyed by the exact name in data.js TEAM/featured entries.
   `pos` is the object-position focal point so the crop lands on the face
   (portraits vary from head-and-shoulders to full-body shots).
   Members without an entry fall back to their initials avatar. */
const MEMBER_PHOTOS = {
  'Anish Bhattarai': { src: anishPhoto, pos: 'center 24%' },
  'Sagar Bist': { src: sagarPhoto, pos: 'center 28%' },
  'Neha Pal': { src: nehaPalPhoto, pos: 'center 25%' },
  'Samin Thapa': { src: saminThapaPhoto, pos: 'center 22%' },
  'Subash Raj Bhatta': { src: subashBhattaPhoto, pos: 'center 20%' },
  'Swornima C Tamang': { src: swornimaPhoto, pos: 'center 25%' },
  'Rehan Lamichhane': { src: rehanPhoto, pos: 'center 12%' },
  'Piyush Chand': { src: piyushPhoto, pos: 'center 20%' },
};

/* Registration config — wire these to a real form / flag as needed. */
const REGISTRATION_OPEN = true;
const REGISTRATION_URL = 'https://forms.gle/jgyvLobrsxAPhiA38';

/* SparkEEC brand mark. Served as a static file from /public (see
   public/sparkeec-logo.png) so it ships with the static build. If the file is
   missing it hides itself, leaving the animated wordmark intact. */
const LOGO_SRC = import.meta.env.BASE_URL + 'sparkeec-logo.png';
function LogoMark({ size = 42, radius = 11, style }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <span style={merge(`flex:none;display:inline-flex;width:${size}px;height:${size}px;border-radius:${radius}px;background:#ffffff;overflow:hidden;box-shadow:0 2px 12px rgba(95,139,255,0.4)`, style)}>
      <img src={LOGO_SRC} alt="SparkEEC logo" width={size} height={size} onError={() => setOk(false)} style={sx('width:100%;height:100%;object-fit:contain')} />
    </span>
  );
}

/* ============================ NAV ============================ */
function Nav({ page, go, theme, toggleTheme }) {
  const letters = 'SparkEEC'.split('');
  // Collapse the horizontal link row into a hamburger menu on phones / small
  // tablets, where 6 links + logo + actions cannot fit on one line.
  const isMobile = useMediaQuery('(max-width: 860px)');
  const [open, setOpen] = useState(false);

  // Close the mobile menu automatically when we grow back to desktop width.
  useEffect(() => { if (!isMobile) setOpen(false); }, [isMobile]);

  const navTo = (k) => { setOpen(false); go(k); };

  const themeBtn = (
    <HoverBox
      as="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      base="cursor:pointer;flex:none;width:40px;height:40px;border-radius:50%;border:1px solid rgba(var(--wc),0.16);background:rgba(var(--wc),0.05);color:var(--fg);font-size:18px;line-height:1;display:flex;align-items:center;justify-content:center;transition:all 0.25s"
      hover="background:rgba(var(--wc),0.12);border-color:rgba(160,107,245,0.5)"
    >
      {theme === 'dark' ? '\u2600' : '\u263e'}
    </HoverBox>
  );

  return (
    <div style={sx('position:fixed;top:0;left:0;right:0;z-index:100;background:var(--nav-bg);backdrop-filter:blur(14px);border-bottom:1px solid rgba(var(--wc),0.07)')}>
      <div style={sx(`max-width:1200px;margin:0 auto;padding:0 ${isMobile ? '18px' : '28px'};height:${isMobile ? '62px' : '76px'};display:flex;align-items:center;justify-content:space-between;gap:16px`)}>
        <div onClick={() => navTo('home')} style={sx(`cursor:pointer;user-select:none;display:flex;align-items:center;font-size:${isMobile ? '19px' : '23px'};font-weight:700;letter-spacing:-0.02em`)}>
          <LogoMark size={isMobile ? 34 : 42} radius={isMobile ? 9 : 11} style={`margin-right:${isMobile ? '10px' : '13px'}`} />
          {letters.map((ch, i) => (
            <span key={i} style={sx(`display:inline-block;animation:letterLoop 2.6s ease-in-out infinite;animation-delay:${(-0.2 * i).toFixed(1)}s`)}>{ch}</span>
          ))}
          <span style={sx("margin-left:8px;font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;color:var(--muted);border:1px solid rgba(var(--wc),0.16);border-radius:6px;padding:2px 7px;letter-spacing:0.02em")}>1.0</span>
        </div>

        {!isMobile && (
          <div style={sx('display:flex;align-items:center;gap:28px;flex-wrap:wrap')}>
            {NAV.map(([k, label]) => (
              <HoverBox
                as="span"
                key={k}
                onClick={() => go(k)}
                base={`cursor:pointer;font-size:16.5px;color:${page === k ? 'var(--fg-strong)' : 'var(--muted)'};font-weight:${page === k ? 600 : 450};transition:color 0.2s`}
                hover="color:var(--fg-strong)"
              >
                {label}
              </HoverBox>
            ))}
          </div>
        )}

        {!isMobile && (
          <div style={sx('display:flex;align-items:center;gap:12px')}>
            {themeBtn}
            <HoverBox
              as="button"
              onClick={() => go('register')}
              base="cursor:pointer;background:transparent;border:1px solid rgba(43,184,245,0.55);color:#6fccf7;border-radius:999px;padding:11px 24px;font-size:15.5px;font-weight:600;white-space:nowrap;transition:all 0.25s"
              hover="background:rgba(43,184,245,0.12);color:var(--fg-strong);border-color:#2bb8f5"
            >
              Register
            </HoverBox>
          </div>
        )}

        {isMobile && (
          <div style={sx('display:flex;align-items:center;gap:10px')}>
            {themeBtn}
            <HoverBox
              as="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              base="cursor:pointer;flex:none;width:42px;height:42px;border-radius:12px;border:1px solid rgba(var(--wc),0.16);background:rgba(var(--wc),0.05);color:var(--fg);font-size:20px;line-height:1;display:flex;align-items:center;justify-content:center;transition:all 0.25s"
              hover="background:rgba(var(--wc),0.12);border-color:rgba(160,107,245,0.5)"
            >
              {open ? '\u2715' : '\u2630'}
            </HoverBox>
          </div>
        )}
      </div>

      {/* Mobile dropdown panel */}
      {isMobile && open && (
        <div style={sx('border-top:1px solid rgba(var(--wc),0.07);background:var(--nav-bg);backdrop-filter:blur(14px);padding:10px 18px 18px;display:flex;flex-direction:column;gap:2px;animation:fadeUp 0.28s cubic-bezier(0.22,1,0.36,1) both')}>
          {NAV.map(([k, label]) => (
            <HoverBox
              as="span"
              key={k}
              onClick={() => navTo(k)}
              base={`cursor:pointer;padding:14px 12px;border-radius:12px;font-size:17px;color:${page === k ? 'var(--fg-strong)' : 'var(--muted2)'};font-weight:${page === k ? 600 : 450};background:${page === k ? 'rgba(var(--wc),0.06)' : 'transparent'};transition:all 0.2s`}
              hover="background:rgba(var(--wc),0.08);color:var(--fg-strong)"
            >
              {label}
            </HoverBox>
          ))}
          <HoverBox
            as="button"
            onClick={() => navTo('register')}
            base="cursor:pointer;margin-top:10px;width:100%;border:none;border-radius:999px;padding:15px 24px;font-size:16px;font-weight:600;color:#ffffff;background:linear-gradient(96deg,#2bb8f5,#a06bf5,#5f8bff);box-shadow:0 10px 30px rgba(160,107,245,0.35);transition:transform 0.25s,box-shadow 0.25s"
            hover="transform:translateY(-2px);box-shadow:0 14px 40px rgba(160,107,245,0.5)"
          >
            Register your team \u2192
          </HoverBox>
        </div>
      )}

      <div style={sx('position:absolute;left:0;right:0;bottom:-1px;height:2px;background:linear-gradient(90deg,#2bb8f5,#a06bf5,#5f8bff);transform-origin:left;transform:scaleX(0);animation:growX linear both;animation-timeline:scroll()')} />
    </div>
  );
}

/* ============================ SECTION LABEL ============================ */
const Kicker = ({ children, color = '#6fccf7' }) => (
  <div style={sx(`font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.22em;color:${color};text-transform:uppercase`)}>{children}</div>
);

/* ============================ HOME ============================ */
function Home({ go, cd }) {
  const stack = useMediaQuery('(max-width: 760px)');
  return (
    <div>
      {/* HERO */}
      <div style={sx('position:relative;overflow:hidden;padding:170px 28px 84px;text-align:center')}>
        <div style={sx('position:absolute;inset:0;background-image:linear-gradient(rgba(var(--wc),0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(var(--wc),0.035) 1px,transparent 1px);background-size:56px 56px;-webkit-mask-image:radial-gradient(ellipse 80% 70% at 50% 0%,black,transparent);mask-image:radial-gradient(ellipse 80% 70% at 50% 0%,black,transparent);pointer-events:none')} />
        <div style={sx('position:absolute;top:-220px;left:50%;margin-left:-490px;width:980px;height:640px;background:radial-gradient(closest-side,rgba(160,107,245,0.26),transparent);pointer-events:none;animation:centerGlow 7s ease-in-out infinite')} />
        <div style={sx('position:absolute;top:120px;left:-160px;width:520px;height:520px;background:radial-gradient(closest-side,rgba(43,184,245,0.14),transparent);pointer-events:none;animation:orbDrift 11s ease-in-out infinite')} />
        <div style={sx('position:absolute;top:80px;right:-180px;width:560px;height:560px;background:radial-gradient(closest-side,rgba(95,139,255,0.14),transparent);pointer-events:none;animation:orbDriftB 13s ease-in-out infinite')} />

        <div style={sx('position:relative;max-width:1020px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:22px')}>
          <div style={sx('display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(var(--wc),0.14);background:rgba(var(--wc),0.04);border-radius:999px;padding:8px 18px;animation:fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both')}>
            <span style={sx('width:7px;height:7px;border-radius:50%;background:#2bb8f5;animation:pulseDot 2s ease-out infinite')} />
            <span style={sx("font-family:'JetBrains Mono',monospace;font-size:11.5px;letter-spacing:0.18em;color:var(--muted3);text-transform:uppercase")}>SOCISE-EEC presents · Everest Engineering College</span>
          </div>

          <h1 style={sx('margin:0;font-size:clamp(44px,10.5vw,138px);line-height:0.98;font-weight:700;letter-spacing:-0.035em;color:var(--fg-strong);animation:fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.1s both')}>
            Spark
            <span style={sx('background:linear-gradient(96deg,#2bb8f5 0%,#a06bf5 45%,#5f8bff 70%,#2bb8f5 100%);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:shimmer 5s linear infinite')}>EEC 1.0</span>
          </h1>

          <div style={sx('font-size:clamp(17px,2.1vw,22px);color:var(--fg);font-weight:500;animation:fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both')}>17th – 18th July 2026 · <span style={sx('color:#6fccf7')}>27 Hours of Pure Creation</span> · Sanepa-2, Lalitpur</div>

          <p style={sx('margin:0;max-width:620px;font-size:18px;line-height:1.65;color:var(--muted);animation:fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s both')}>EEC's first flagship hackathon. Innovate for impact — build, pitch, and ship a real solution in 27 continuous hours.</p>

          {/* COUNTDOWN */}
          {!(cd.live || cd.over) && (
            <div style={sx('display:flex;gap:14px;margin-top:14px;flex-wrap:wrap;justify-content:center;animation:fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s both')}>
              {[['Days', cd.days], ['Hours', cd.hours], ['Mins', cd.mins]].map(([label, val]) => (
                <HoverBox key={label} base="width:104px;background:rgba(var(--wc),0.04);border:1px solid rgba(var(--wc),0.1);border-radius:14px;padding:16px 0 12px;box-shadow:var(--card-shadow);transition:transform 0.32s var(--ease-out),border-color 0.3s,box-shadow 0.32s ease" hover="transform:translateY(-4px);border-color:rgba(160,107,245,0.45);box-shadow:var(--card-shadow-hover)">
                  <div style={sx("font-family:'JetBrains Mono',monospace;font-size:38px;font-weight:600;color:var(--fg-strong)")}>{val}</div>
                  <div style={sx("font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:0.2em;color:var(--muted);text-transform:uppercase;margin-top:2px")}>{label}</div>
                </HoverBox>
              ))}
              <HoverBox base="width:104px;background:rgba(43,184,245,0.08);border:1px solid rgba(43,184,245,0.35);border-radius:14px;padding:16px 0 12px;box-shadow:var(--card-shadow);transition:transform 0.32s var(--ease-out),border-color 0.3s,box-shadow 0.32s ease" hover="transform:translateY(-4px);border-color:rgba(43,184,245,0.6);box-shadow:var(--card-shadow-hover)">
                <div style={sx("font-family:'JetBrains Mono',monospace;font-size:38px;font-weight:600;color:#6fccf7;animation:blink 1s steps(1) infinite")}>{cd.secs}</div>
                <div style={sx("font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:0.2em;color:var(--muted);text-transform:uppercase;margin-top:2px")}>Secs</div>
              </HoverBox>
            </div>
          )}
          {(cd.live || cd.over) && (
            <div style={sx("font-family:'JetBrains Mono',monospace;font-size:15px;letter-spacing:0.24em;color:#6fccf7;text-transform:uppercase;margin-top:10px")}>
              {cd.over ? 'SparkEEC 1.0 has wrapped — see you at 2.0' : '\u25cf We are live — the 27-hour clock is running'}
            </div>
          )}

          <div style={sx('display:flex;gap:14px;margin-top:16px;flex-wrap:wrap;justify-content:center;animation:fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.5s both')}>
            <HoverBox as="button" onClick={() => go('register')} base="cursor:pointer;border:none;border-radius:999px;padding:16px 36px;font-size:16px;font-weight:600;color:#ffffff;background:linear-gradient(96deg,#2bb8f5,#a06bf5,#5f8bff);box-shadow:0 10px 34px rgba(160,107,245,0.35);transition:transform 0.25s,box-shadow 0.25s" hover="transform:translateY(-3px);box-shadow:0 16px 48px rgba(160,107,245,0.55)">Register your team →</HoverBox>
            <HoverBox as="button" onClick={() => go('tracks')} base="cursor:pointer;border:1px solid rgba(var(--wc),0.2);border-radius:999px;padding:16px 36px;font-size:16px;font-weight:500;color:var(--fg);background:rgba(var(--wc),0.04);transition:transform 0.25s,background 0.25s" hover="transform:translateY(-3px);background:rgba(var(--wc),0.09)">Explore the tracks</HoverBox>
            <HoverBox as="a" href={rulebookPdf} download="SparkEEC-1.0-Rulebook.pdf" base="cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;border:1px solid rgba(var(--wc),0.2);border-radius:999px;padding:16px 36px;font-size:16px;font-weight:500;color:var(--fg);background:rgba(var(--wc),0.04);transition:transform 0.25s,background 0.25s" hover="transform:translateY(-3px);background:rgba(var(--wc),0.09)">↓ Download the Rulebook</HoverBox>
          </div>
          <div style={sx("font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--muted);animation:fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.6s both")}>Entry fee NPR 25 · Teams of 2–4 · EEC students only</div>
        </div>
      </div>

      {/* STATS STRIP */}
      <div style={sx('border-top:1px solid rgba(var(--wc),0.07);border-bottom:1px solid rgba(var(--wc),0.07);background:rgba(var(--wc),0.02)')}>
        <div style={sx('max-width:1160px;margin:0 auto;padding:34px 28px;display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:24px;text-align:center')}>
          {STATS.map(([value, label]) => (
            <div key={label} style={sx('animation:fadeUp 0.8s ease both;animation-timeline:view();animation-range:entry 0% entry 40%')}>
              <div style={sx('font-size:40px;font-weight:700;background:linear-gradient(96deg,#2bb8f5,#a06bf5,#5f8bff);-webkit-background-clip:text;background-clip:text;color:transparent')}>{value}</div>
              <div style={sx("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.18em;color:var(--muted);text-transform:uppercase")}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <div style={sx(`max-width:1160px;margin:0 auto;padding:96px 28px;display:grid;grid-template-columns:${stack ? '1fr' : '1.25fr 1fr'};gap:${stack ? '36px' : '56px'};align-items:start`)}>
        <div style={sx('animation:fadeUp 0.9s ease both;animation-timeline:view();animation-range:entry 0% entry 30%')}>
          <Kicker>About the event</Kicker>
          <h2 style={sx('margin:14px 0 20px;font-size:clamp(30px,4vw,44px);font-weight:700;line-height:1.12;letter-spacing:-0.02em')}>The full innovation lifecycle, compressed into 27 hours</h2>
          <p style={sx('margin:0 0 16px;font-size:18px;line-height:1.7;color:var(--muted2)')}>Students from every program and batch of EEC come together to imagine, build, and pitch technology solutions to real problems — ideation to presentation, under real constraints of time, teamwork, and scope.</p>
          <p style={sx('margin:0;font-size:18px;line-height:1.7;color:var(--fg);font-weight:500')}>Build boldly. Build honestly. Innovate for impact. <span style={sx('color:var(--muted);font-weight:400')}>— The Organizing Committee</span></p>
        </div>
        <div style={sx('background:rgba(var(--wc),0.035);border:1px solid rgba(var(--wc),0.09);box-shadow:var(--card-shadow);border-radius:18px;padding:30px 30px 14px;animation:fadeUp 0.9s ease 0.1s both;animation-timeline:view();animation-range:entry 0% entry 30%')}>
          <div style={sx("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.2em;color:var(--muted);text-transform:uppercase;margin-bottom:18px")}>Quick facts</div>
          {FACTS.map(([k, v]) => (
            <div key={k} style={sx('display:grid;grid-template-columns:96px 1fr;gap:8px 16px;padding:0 0 16px;border-bottom:1px solid rgba(var(--wc),0.07);margin-bottom:16px')}>
              <div style={sx('font-size:13.5px;color:var(--muted)')}>{k}</div>
              <div style={sx('font-size:14.5px;color:var(--fg)')}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* THEME */}
      <div style={sx('border-top:1px solid rgba(var(--wc),0.07);background:rgba(var(--wc),0.015)')}>
        <div style={sx('max-width:1160px;margin:0 auto;padding:96px 28px;text-align:center')}>
          <div style={sx('animation:fadeUp 0.9s ease both;animation-timeline:view();animation-range:entry 0% entry 30%')}>
            <Kicker>Official theme</Kicker>
            <h2 style={sx('margin:16px auto 42px;max-width:860px;font-size:clamp(26px,3.4vw,38px);font-weight:700;line-height:1.25;letter-spacing:-0.015em')}>
              “Innovate for Impact: Harnessing <span style={sx('background:linear-gradient(96deg,#2bb8f5,#a06bf5);-webkit-background-clip:text;background-clip:text;color:transparent')}>Artificial Intelligence</span> and <span style={sx('background:linear-gradient(96deg,#a06bf5,#5f8bff);-webkit-background-clip:text;background-clip:text;color:transparent')}>Emerging Technologies</span> for Sustainable Development.”
            </h2>
          </div>
          <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:20px;text-align:left')}>
            {[
              ['01 · REAL PROBLEM', '#6fccf7', 'rgba(43,184,245,0.45)', 'A defined user who hurts today', 'Anchor your build in evidence — who hurts, how much, why now.'],
              ['02 · EMERGING TECH', '#c5a3fa', 'rgba(160,107,245,0.45)', 'AI, web, mobile, IoT, data, cloud', 'Use the technology meaningfully — not as a superficial wrapper.'],
              ['03 · SUSTAINABLE IMPACT', '#8fb0ff', 'rgba(95,139,255,0.45)', 'Advance the SDGs — Nepal first', 'Problems close to home are especially encouraged.'],
            ].map(([tag, tagColor, hoverBorder, title, body], i) => (
              <HoverBox key={i} base={`background:rgba(var(--wc),0.035);border:1px solid rgba(var(--wc),0.09);box-shadow:var(--card-shadow);border-radius:16px;padding:26px;box-shadow:var(--card-shadow);transition:transform 0.32s var(--ease-out),border-color 0.3s,box-shadow 0.32s ease;animation:fadeUp 0.8s ease ${0.1 * i}s both;animation-timeline:view();animation-range:entry 0% entry 30%`} hover={`transform:translateY(-4px);border-color:${hoverBorder};box-shadow:var(--card-shadow-hover)`}>
                <div style={sx(`font-family:'JetBrains Mono',monospace;font-size:12px;color:${tagColor};margin-bottom:10px`)}>{tag}</div>
                <div style={sx('font-size:17px;font-weight:600;margin-bottom:8px')}>{title}</div>
                <div style={sx('font-size:16px;line-height:1.65;color:var(--muted)')}>{body}</div>
              </HoverBox>
            ))}
          </div>
        </div>
      </div>

      {/* TRACKS TEASER */}
      <div style={sx('max-width:1160px;margin:0 auto;padding:96px 28px;text-align:center')}>
        <div style={sx('animation:fadeUp 0.9s ease both;animation-timeline:view();animation-range:entry 0% entry 30%')}>
          <Kicker>Problem tracks</Kicker>
          <h2 style={sx('margin:14px 0 32px;font-size:clamp(30px,4vw,44px);font-weight:700;letter-spacing:-0.02em')}>Seven tracks. Pick exactly one.</h2>
          <div style={sx('display:flex;flex-wrap:wrap;gap:12px;justify-content:center;max-width:860px;margin:0 auto 32px')}>
            {TRACK_DATA.map(([name]) => (
              <HoverBox as="span" key={name} onClick={() => go('tracks')} base="cursor:pointer;border:1px solid rgba(var(--wc),0.14);background:rgba(var(--wc),0.04);border-radius:999px;padding:11px 22px;font-size:14.5px;color:var(--fg);transition:all 0.25s" hover="border-color:#a06bf5;background:rgba(160,107,245,0.12);transform:translateY(-2px)">{name}</HoverBox>
            ))}
          </div>
          <HoverBox as="button" onClick={() => go('tracks')} base="cursor:pointer;border:1px solid rgba(var(--wc),0.2);border-radius:999px;padding:14px 32px;font-size:15px;font-weight:500;color:var(--fg);background:transparent;transition:background 0.25s" hover="background:rgba(var(--wc),0.07)">See focus areas &amp; SDG alignment →</HoverBox>
        </div>
      </div>

      {/* ORGANIZERS */}
      <div style={sx('border-top:1px solid rgba(var(--wc),0.07);background:rgba(var(--wc),0.015)')}>
        <div style={sx('max-width:1200px;margin:0 auto;padding:120px 28px')}>
          <div style={sx('text-align:center;margin-bottom:60px;animation:fadeUp 0.9s ease both;animation-timeline:view();animation-range:entry 0% entry 30%')}>
            <Kicker>Organizers &amp; collaborators</Kicker>
            <h2 style={sx('margin:18px 0 0;font-size:clamp(36px,5vw,56px);font-weight:700;letter-spacing:-0.02em')}>Built by the community, for the community</h2>
          </div>
          {/* Row 1 — Lead organizer, on its own row */}
          <div style={sx('max-width:520px;margin:0 auto')}>
            <div className="org-card" style={sx('animation:fadeUp 0.8s ease both;animation-timeline:view();animation-range:entry 0% entry 30%')}>
              <div className="org-logo">
                <img src={sociseLogo} alt="SOCISE-EEC logo" loading="lazy" decoding="async" />
              </div>
              <div style={sx("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.2em;color:#6fccf7;text-transform:uppercase;margin-bottom:12px")}>Organizer</div>
              <div style={sx('font-size:22px;font-weight:700;margin-bottom:10px;letter-spacing:-0.01em;color:var(--fg-strong)')}>SOCISE-EEC</div>
              <div style={sx('font-size:18px;line-height:1.65;color:var(--muted)')}>Society of Computer, IT and Software Engineering</div>
            </div>
          </div>

          {/* Row 2 — Collaborating partners */}
          <div style={sx('text-align:center;margin:52px 0 26px;animation:fadeUp 0.9s ease both;animation-timeline:view();animation-range:entry 0% entry 40%')}>
            <div style={sx("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.22em;color:var(--muted);text-transform:uppercase")}>In collaboration with</div>
          </div>
          <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:28px')}>
            {[
              ['#c5a3fa', 'AWS Student Builder Group – EEC', 'Cloud & builder community chapter', awsLogo],
              ['#8fb0ff', 'IEEE EEC Student Branch', 'IEEE student community at EEC', ieeeLogo],
              ['#2bb8f5', 'Hult Prize at EEC', 'Campus chapter of the Hult Prize social-entrepreneurship movement', hultLogo],
            ].map(([fg, name, desc, logo], i) => (
              <div key={i} className="org-card" style={sx(`animation:fadeUp 0.8s ease ${0.1 * i}s both;animation-timeline:view();animation-range:entry 0% entry 30%`)}>
                <div className="org-logo">
                  <img src={logo} alt={`${name} logo`} loading="lazy" decoding="async" />
                </div>
                <div style={sx(`font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.2em;color:${fg};text-transform:uppercase;margin-bottom:12px`)}>Collaborator</div>
                <div style={sx('font-size:22px;font-weight:700;margin-bottom:10px;letter-spacing:-0.01em;color:var(--fg-strong)')}>{name}</div>
                <div style={sx('font-size:18px;line-height:1.65;color:var(--muted)')}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ORGANIZING COMMITTEE */}
      <div style={sx('max-width:1200px;margin:0 auto;padding:120px 28px')}>
        <div style={sx('text-align:center;margin-bottom:52px;animation:fadeUp 0.9s ease both;animation-timeline:view();animation-range:entry 0% entry 30%')}>
          <Kicker>Organizing committee</Kicker>
          <h2 style={sx('margin:18px 0 0;font-size:clamp(36px,5vw,56px);font-weight:700;letter-spacing:-0.02em')}>The people making it happen</h2>
        </div>

        {/* ADVISOR + EVENT LEAD — featured (large) */}
        <div style={sx('max-width:720px;margin:0 auto 40px;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:28px')}>
          {[
            ['Anish Bhattarai', 'Advisor', '#6fccf7',
             'linear-gradient(160deg,rgba(43,184,245,0.1),rgba(160,107,245,0.09) 55%,rgba(95,139,255,0.1))', 'rgba(43,184,245,0.35)', '0s'],
            ['Sagar Bist', 'Event Lead', '#c5a3fa',
             'linear-gradient(160deg,rgba(95,139,255,0.1),rgba(160,107,245,0.09) 55%,rgba(43,184,245,0.1))', 'rgba(160,107,245,0.35)', '0.1s'],
          ].map(([name, role, fg, cardBg, cardBorder, delay]) => {
            const photo = MEMBER_PHOTOS[name];
            return (
              <div key={name} className="oc-card oc-card--feature" style={sx(`background:${cardBg};border:1px solid ${cardBorder};animation:fadeUp 0.8s ease ${delay} both;animation-timeline:view();animation-range:entry 0% entry 35%`)}>
                <div className="oc-role" style={sx(`font-size:17px;color:${fg}`)}>{role}</div>
                {photo
                  ? <img className="oc-photo" src={photo.src} alt={name} loading="lazy" decoding="async" style={sx(`object-position:${photo.pos}`)} />
                  : <div className="oc-fallback" style={sx('font-size:42px')}>{initials(name)}</div>}
                <div className="oc-name" style={sx('font-size:23px')}>{name}</div>
              </div>
            );
          })}
        </div>

        {/* COMMITTEE — smaller */}
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:22px')}>
          {TEAM.map(([name, role], i) => {
            const photo = MEMBER_PHOTOS[name];
            const fg = ['#6fccf7', '#c5a3fa', '#8fb0ff'][i % 3];
            return (
              <div key={name} className="oc-card" style={sx('animation:fadeUp 0.8s ease both;animation-timeline:view();animation-range:entry 0% entry 25%')}>
                <div className="oc-role" style={sx(`font-size:13.5px;color:${fg}`)}>{role}</div>
                {photo
                  ? <img className="oc-photo" src={photo.src} alt={name} loading="lazy" decoding="async" style={sx(`object-position:${photo.pos}`)} />
                  : <div className="oc-fallback" style={sx('font-size:30px')}>{initials(name)}</div>}
                <div className="oc-name" style={sx('font-size:17.5px')}>{name}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA BANNER */}
      <div style={sx('max-width:1160px;margin:0 auto;padding:96px 28px 96px')}>
        <div style={sx('position:relative;overflow:hidden;border-radius:22px;border:1px solid rgba(160,107,245,0.35);background:linear-gradient(140deg,rgba(43,184,245,0.12),rgba(160,107,245,0.1) 50%,rgba(95,139,255,0.12));padding:64px 32px;text-align:center;animation:fadeUp 0.9s ease both;animation-timeline:view();animation-range:entry 0% entry 30%')}>
          <div style={sx('position:absolute;top:-140px;left:50%;margin-left:-350px;width:700px;height:380px;background:radial-gradient(closest-side,rgba(160,107,245,0.3),transparent);pointer-events:none;animation:centerGlow 6s ease-in-out infinite')} />
          <h2 style={sx('position:relative;margin:0 0 14px;font-size:clamp(28px,4vw,42px);font-weight:700;letter-spacing:-0.02em')}>Ready to build for impact?</h2>
          <p style={sx('position:relative;margin:0 auto 30px;max-width:520px;font-size:18px;line-height:1.65;color:var(--muted2)')}>Grab your team of 2–4 and pick a track. Capacity is ~20 teams — register early.</p>
          <HoverBox as="button" onClick={() => go('register')} base="position:relative;cursor:pointer;border:none;border-radius:999px;padding:16px 38px;font-size:16px;font-weight:600;color:#ffffff;background:linear-gradient(96deg,#2bb8f5,#a06bf5,#5f8bff);box-shadow:0 10px 34px rgba(160,107,245,0.4);transition:transform 0.25s,box-shadow 0.25s" hover="transform:translateY(-3px);box-shadow:0 16px 48px rgba(160,107,245,0.6)">Register your team →</HoverBox>
        </div>
      </div>
    </div>
  );
}

/* ============================ TRACKS ============================ */
function Tracks() {
  const [open, setOpen] = useState(-1);
  return (
    <div style={sx('max-width:1160px;margin:0 auto;padding:150px 28px 96px;animation:fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both')}>
      <Kicker>Official problem tracks</Kicker>
      <h2 style={sx('margin:14px 0 16px;font-size:clamp(32px,4.5vw,50px);font-weight:700;letter-spacing:-0.02em')}>Seven tracks, one choice</h2>
      <p style={sx('margin:0 0 40px;max-width:720px;font-size:18px;line-height:1.7;color:var(--muted)')}>Pick one track at registration — you can revise it until ideation ends on Day 1 (12:00 noon). Tap a track to see its focus areas.</p>
      <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:18px')}>
        {TRACK_DATA.map(([title, focus, sdgs], i) => {
          const isOpen = open === i;
          return (
            <HoverBox key={title} onClick={() => setOpen(isOpen ? -1 : i)} base={`cursor:pointer;background:rgba(var(--wc),0.035);border:1px solid ${isOpen ? 'rgba(160,107,245,0.55)' : 'rgba(var(--wc),0.09)'};border-radius:16px;padding:26px 28px;box-shadow:var(--card-shadow);transition:transform 0.32s var(--ease-out),border-color 0.3s,box-shadow 0.32s ease;animation:fadeUp 0.8s ease both;animation-timeline:view();animation-range:entry 0% entry 25%`} hover="transform:translateY(-3px);border-color:rgba(160,107,245,0.5);box-shadow:var(--card-shadow-hover)">
              <div style={sx('display:flex;align-items:center;justify-content:space-between;gap:16px')}>
                <div style={sx('display:flex;align-items:baseline;gap:16px;min-width:0')}>
                  <span style={sx("font-family:'JetBrains Mono',monospace;font-size:13px;color:#6fccf7")}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={sx('font-size:19px;font-weight:600')}>{title}</span>
                </div>
                <span style={sx(`flex:none;width:30px;height:30px;border-radius:50%;border:1px solid rgba(var(--wc),0.18);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:15px;color:var(--muted);transition:transform 0.3s;transform:rotate(${isOpen ? '45deg' : '0deg'})`)}>+</span>
              </div>
              <div style={sx('display:flex;flex-wrap:wrap;gap:8px;margin-top:14px')}>
                {sdgs.map((g) => (
                  <span key={g} style={sx("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.08em;color:#8fb0ff;background:rgba(95,139,255,0.1);border:1px solid rgba(95,139,255,0.3);border-radius:6px;padding:4px 10px")}>{g}</span>
                ))}
              </div>
              <div style={sx(`display:grid;grid-template-rows:${isOpen ? '1fr' : '0fr'};transition:grid-template-rows 0.35s ease;overflow:hidden`)}>
                <div style={sx('min-height:0;overflow:hidden')}>
                  <div style={sx('margin-top:16px;border-top:1px solid rgba(var(--wc),0.08);padding-top:16px')}>
                    <div style={sx("font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:0.18em;color:var(--muted);text-transform:uppercase;margin-bottom:8px")}>Illustrative focus areas</div>
                    <div style={sx('font-size:16.5px;line-height:1.7;color:var(--muted2)')}>{focus}</div>
                  </div>
                </div>
              </div>
            </HoverBox>
          );
        })}
      </div>
    </div>
  );
}

/* ============================ SCHEDULE ============================ */
function Schedule() {
  const [day, setDay] = useState(1);
  const stack = useMediaQuery('(max-width: 600px)');
  const rows = day === 1 ? DAY1 : DAY2;
  const tabs = [1, 2];
  return (
    <div style={sx('max-width:960px;margin:0 auto;padding:150px 28px 96px;animation:fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both')}>
      <Kicker>Event schedule</Kicker>
      <h2 style={sx('margin:14px 0 16px;font-size:clamp(32px,4.5vw,50px);font-weight:700;letter-spacing:-0.02em')}>27 hours, minute by minute</h2>
      <p style={sx('margin:0 0 34px;max-width:720px;font-size:18px;line-height:1.7;color:var(--muted)')}>From the 09:00 launch on Day 1 to the 12:00 noon hard deadline on Day 2 — all times NPT. Every mentorship round is a mandatory code checkpoint.</p>
      <div style={sx('display:flex;gap:12px;margin-bottom:36px;flex-wrap:wrap')}>
        {tabs.map((d) => {
          const active = day === d;
          return (
            <button key={d} onClick={() => setDay(d)} style={sx(`cursor:pointer;border:1px solid ${active ? 'rgba(43,184,245,0.5)' : 'rgba(var(--wc),0.14)'};background:${active ? 'linear-gradient(96deg,rgba(43,184,245,0.25),rgba(160,107,245,0.25))' : 'rgba(var(--wc),0.04)'};color:${active ? 'var(--fg-strong)' : 'var(--muted)'};border-radius:999px;padding:13px 28px;font-size:15px;font-weight:600;transition:all 0.25s`)}>
              {d === 1 ? 'Day 1 · Fri 17 July' : 'Day 2 · Sat 18 July'}
            </button>
          );
        })}
      </div>
      <div>
        {rows.map(([time, activity, tags, big], i) => (
          <HoverBox key={i} base={`display:grid;grid-template-columns:${stack ? '1fr' : '150px 1fr'};gap:${stack ? '6px' : '24px'};padding:17px 4px;border-bottom:1px solid rgba(var(--wc),0.06);align-items:baseline;transition:background 0.2s;animation:fadeUp 0.55s ease both;animation-delay:${(Math.min(i, 12) * 0.04).toFixed(2)}s`} hover="background:rgba(var(--wc),0.025)">
            <div style={sx(`font-family:'JetBrains Mono',monospace;font-size:13.5px;color:${big ? '#6fccf7' : 'var(--muted)'};white-space:nowrap`)}>{time}</div>
            <div style={sx('display:flex;flex-wrap:wrap;align-items:center;gap:10px')}>
              <span style={sx(`font-size:16px;line-height:1.55;color:${big ? 'var(--fg-strong)' : 'var(--fg)'};font-weight:${big ? 700 : 400}`)}>{activity}</span>
              {tags.map(([label, kind], j) => {
                const tg = TAG[kind];
                return (
                  <span key={j} style={sx(`font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:0.06em;color:${tg.fg};background:${tg.bg};border:1px solid ${tg.bd};border-radius:6px;padding:4px 10px;white-space:nowrap`)}>{label}</span>
                );
              })}
            </div>
          </HoverBox>
        ))}
      </div>
      <div style={sx('margin-top:32px;background:rgba(43,184,245,0.06);border:1px solid rgba(43,184,245,0.25);border-radius:14px;padding:20px 24px;animation:fadeUp 0.8s ease both;animation-timeline:view();animation-range:entry 0% entry 40%')}>
        <div style={sx("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.18em;color:#6fccf7;text-transform:uppercase;margin-bottom:8px")}>Checkpoint rule</div>
        <div style={sx('font-size:15.5px;line-height:1.7;color:var(--muted2)')}>Push to your official repository before every mentorship round. First miss — warning; second — 5% deduction; third — integrity panel referral.</div>
      </div>
    </div>
  );
}

/* ============================ PRIZES & JUDGING ============================ */
function Prizes() {
  return (
    <div style={sx('max-width:1160px;margin:0 auto;padding:150px 28px 96px;animation:fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both')}>
      <div style={sx('text-align:center;margin-bottom:52px')}>
        <Kicker>Awards</Kicker>
        <h2 style={sx('margin:14px 0 12px;font-size:clamp(32px,4.5vw,50px);font-weight:700;letter-spacing:-0.02em')}>NPR 26,000 prize pool</h2>
        <p style={sx('margin:0 auto;max-width:640px;font-size:17.5px;line-height:1.7;color:var(--muted)')}>Winners are decided by aggregate three-panel scores — except People's Choice, voted openly by all EEC students and faculty.</p>
      </div>

      {/* CHAMPION */}
      <div style={sx('max-width:560px;margin:0 auto 20px')}>
        <HoverBox base="position:relative;background:linear-gradient(160deg,rgba(43,184,245,0.13),rgba(160,107,245,0.11) 55%,rgba(95,139,255,0.13));border:1px solid rgba(43,184,245,0.45);border-radius:18px;padding:40px 32px;text-align:center;display:flex;flex-direction:column;gap:8px;box-shadow:var(--card-shadow-hover);transition:transform 0.32s var(--ease-out),box-shadow 0.32s ease;animation:fadeUp 0.7s ease both" hover="transform:translateY(-6px);box-shadow:var(--card-shadow-hover)">
          <div style={sx("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.22em;color:#6fccf7;text-transform:uppercase")}>🏆 Champion</div>
          <div style={sx('font-size:52px;font-weight:700;background:linear-gradient(96deg,#2bb8f5,#a06bf5,#5f8bff,#2bb8f5);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:shimmer 5s linear infinite')}>NPR 10,000</div>
          <div style={sx('font-size:15.5px;line-height:1.6;color:var(--muted2)')}>Trophy · certificates · mentorship &amp; incubation support</div>
        </HoverBox>
      </div>

      {/* RUNNERS-UP */}
      <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:20px;align-items:stretch;margin-bottom:20px')}>
        <HoverBox base="background:rgba(43,184,245,0.08);border:1px solid rgba(43,184,245,0.3);border-radius:18px;padding:32px;text-align:center;display:flex;flex-direction:column;gap:8px;box-shadow:var(--card-shadow);transition:transform 0.32s var(--ease-out),border-color 0.3s,box-shadow 0.32s ease;animation:fadeUp 0.7s ease 0.1s both" hover="transform:translateY(-4px);border-color:rgba(43,184,245,0.55);box-shadow:var(--card-shadow-hover)">
          <div style={sx("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.2em;color:#6fccf7;text-transform:uppercase")}>1st Runner-up</div>
          <div style={sx('font-size:38px;font-weight:700')}>NPR 7,000</div>
          <div style={sx('font-size:15.5px;line-height:1.6;color:var(--muted)')}>Trophy · certificates · mentorship</div>
        </HoverBox>
        <HoverBox base="background:rgba(95,139,255,0.08);border:1px solid rgba(95,139,255,0.3);border-radius:18px;padding:32px;text-align:center;display:flex;flex-direction:column;gap:8px;box-shadow:var(--card-shadow);transition:transform 0.32s var(--ease-out),border-color 0.3s,box-shadow 0.32s ease;animation:fadeUp 0.7s ease 0.2s both" hover="transform:translateY(-4px);border-color:rgba(95,139,255,0.55);box-shadow:var(--card-shadow-hover)">
          <div style={sx("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.2em;color:#8fb0ff;text-transform:uppercase")}>2nd Runner-up</div>
          <div style={sx('font-size:38px;font-weight:700')}>NPR 5,000</div>
          <div style={sx('font-size:15.5px;line-height:1.6;color:var(--muted)')}>Trophy · certificates</div>
        </HoverBox>
      </div>

      {/* CATEGORY WINNERS */}
      <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:20px;margin-bottom:16px')}>
        {[
          ['rgba(160,107,245', 'Best AI Solution', 'Category trophy & certificates', '#c5a3fa', 'NPR 2,000', '0s'],
          ['rgba(43,184,245', 'Best Innovation', 'Category trophy & certificates', '#c5a3fa', 'NPR 2,000', '0.1s'],
          ['rgba(95,139,255', "People's Choice", 'Voted by all EEC students & faculty', '#8fb0ff', 'Goodies', '0.2s'],
        ].map(([rgb, title, desc, valColor, val, delay], i) => (
          <HoverBox key={i} base={`background:${rgb},0.08);border:1px solid ${rgb},0.3);border-radius:16px;padding:24px 28px;display:flex;justify-content:space-between;align-items:center;gap:14px;box-shadow:var(--card-shadow);transition:transform 0.32s var(--ease-out),border-color 0.3s,box-shadow 0.32s ease;animation:fadeUp 0.8s ease ${delay} both;animation-timeline:view();animation-range:entry 0% entry 40%`} hover={`transform:translateY(-3px);border-color:${rgb},0.55);box-shadow:var(--card-shadow-hover)`}>
            <div>
              <div style={sx('font-size:16px;font-weight:600')}>{title}</div>
              <div style={sx('font-size:13px;color:var(--muted);margin-top:4px')}>{desc}</div>
            </div>
            <div style={sx(`font-family:'JetBrains Mono',monospace;font-size:16px;color:${valColor};white-space:nowrap`)}>{val}</div>
          </HoverBox>
        ))}
      </div>
      <div style={sx('font-size:13px;color:var(--muted);text-align:center;margin-bottom:88px')}>Every participant who submits receives a certificate of participation.</div>

      {/* JUDGING */}
      <div style={sx('text-align:center;margin-bottom:48px;animation:fadeUp 0.9s ease both;animation-timeline:view();animation-range:entry 0% entry 30%')}>
        <Kicker>Judging</Kicker>
        <h2 style={sx('margin:14px 0 12px;font-size:clamp(28px,4vw,42px);font-weight:700;letter-spacing:-0.02em')}>Three panels, three perspectives</h2>
        <p style={sx('margin:0 auto;max-width:720px;font-size:17.5px;line-height:1.7;color:var(--muted)')}>A seven-member panel scores each team from three professional perspectives: technology, business, and investment.</p>
      </div>

      <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:20px;margin-bottom:36px')}>
        {PANELS.map((p) => (
          <HoverBox key={p.title} base={`background:rgba(var(--wc),0.035);border-top:3px solid ${p.accent};border-left:1px solid rgba(var(--wc),0.09);border-right:1px solid rgba(var(--wc),0.09);border-bottom:1px solid rgba(var(--wc),0.09);border-radius:16px;padding:28px;box-shadow:var(--card-shadow);transition:transform 0.32s var(--ease-out),box-shadow 0.32s ease;animation:fadeUp 0.8s ease both;animation-delay:${p.delay};animation-timeline:view();animation-range:entry 0% entry 25%`} hover="transform:translateY(-4px);box-shadow:var(--card-shadow-hover)">
            <div style={sx('display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px')}>
              <div style={sx('font-size:18px;font-weight:600')}>{p.title}</div>
              <div style={sx(`font-size:28px;font-weight:700;color:${p.fg}`)}>{p.weight}</div>
            </div>
            <div style={sx('font-size:15px;line-height:1.6;color:var(--muted);margin-bottom:20px;font-style:italic')}>{p.quote}</div>
            <div style={sx('display:flex;flex-direction:column;gap:12px')}>
              {p.criteria.map(([name, pct]) => (
                <div key={name}>
                  <div style={sx('display:flex;justify-content:space-between;font-size:13.5px;margin-bottom:5px')}>
                    <span style={sx('color:var(--fg)')}>{name}</span>
                    <span style={sx("font-family:'JetBrains Mono',monospace;color:var(--muted)")}>{pct}%</span>
                  </div>
                  <div style={sx('height:5px;border-radius:3px;background:rgba(var(--wc),0.07)')}>
                    <div style={sx(`width:${pct}%;height:100%;border-radius:3px;background:${p.bar};transform-origin:left;animation:fadeUp 0.9s ease both;animation-timeline:view();animation-range:entry 0% entry 60%`)} />
                  </div>
                </div>
              ))}
            </div>
          </HoverBox>
        ))}
      </div>

      <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:18px')}>
        <div style={sx('background:rgba(var(--wc),0.03);border:1px solid rgba(var(--wc),0.08);box-shadow:var(--card-shadow);border-radius:14px;padding:22px 26px;animation:fadeUp 0.8s ease both;animation-timeline:view();animation-range:entry 0% entry 40%')}>
          <div style={sx("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.18em;color:#6fccf7;text-transform:uppercase;margin-bottom:8px")}>Two-stage pitching</div>
          <div style={sx('font-size:15.5px;line-height:1.7;color:var(--muted2)')}>Booth demos shortlist the finalists; finalists give a 6-minute stage pitch + 4-minute Q&amp;A before the full panel.</div>
        </div>
        <div style={sx('background:rgba(var(--wc),0.03);border:1px solid rgba(var(--wc),0.08);box-shadow:var(--card-shadow);border-radius:14px;padding:22px 26px;animation:fadeUp 0.8s ease 0.1s both;animation-timeline:view();animation-range:entry 0% entry 40%')}>
          <div style={sx("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.18em;color:#c5a3fa;text-transform:uppercase;margin-bottom:8px")}>Business-perspective deck</div>
          <div style={sx('font-size:15.5px;line-height:1.7;color:var(--muted2)')}>Sell the venture, not just the code: problem, user &amp; market, demo, business model, SDG impact, roadmap, team.</div>
        </div>
      </div>
    </div>
  );
}

/* ============================ RULES & FAQ ============================ */
function Rules() {
  const [open, setOpen] = useState(-1);
  return (
    <div style={sx('max-width:1160px;margin:0 auto;padding:150px 28px 96px;animation:fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both')}>
      <div style={sx('display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap;margin-bottom:44px')}>
        <div style={sx('max-width:720px')}>
          <Kicker>Rules &amp; FAQ</Kicker>
          <h2 style={sx('margin:14px 0 14px;font-size:clamp(32px,4.5vw,50px);font-weight:700;letter-spacing:-0.02em')}>The rules that keep it fair</h2>
          <p style={sx('margin:0;font-size:18px;line-height:1.7;color:var(--muted)')}>Highlights from the Official Rulebook v1.0 — binding on everyone present. Registering constitutes acceptance.</p>
        </div>
        <HoverBox as="a" href={rulebookPdf} download="SparkEEC-1.0-Rulebook.pdf" base="flex:none;text-decoration:none;border:1px solid rgba(var(--wc),0.2);border-radius:999px;padding:14px 28px;font-size:14.5px;font-weight:500;color:var(--fg);background:rgba(var(--wc),0.04);transition:background 0.25s" hover="background:rgba(var(--wc),0.09)">↓ Download the full Rulebook</HoverBox>
      </div>

      <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,330px),1fr));gap:18px;margin-bottom:88px')}>
        {RULE_CARDS.map(([ref, title, body]) => (
          <HoverBox key={ref} base="background:rgba(var(--wc),0.035);border:1px solid rgba(var(--wc),0.09);box-shadow:var(--card-shadow);border-radius:16px;padding:26px 28px;box-shadow:var(--card-shadow);transition:transform 0.32s var(--ease-out),border-color 0.3s,box-shadow 0.32s ease;animation:fadeUp 0.8s ease both;animation-timeline:view();animation-range:entry 0% entry 25%" hover="transform:translateY(-3px);border-color:rgba(160,107,245,0.4);box-shadow:var(--card-shadow-hover)">
            <div style={sx("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.14em;color:#6fccf7;margin-bottom:10px")}>{ref}</div>
            <div style={sx('font-size:17px;font-weight:600;margin-bottom:8px')}>{title}</div>
            <div style={sx('font-size:16px;line-height:1.7;color:var(--muted)')}>{body}</div>
          </HoverBox>
        ))}
      </div>

      <div style={sx('max-width:820px;margin:0 auto')}>
        <div style={sx('text-align:center;margin-bottom:36px;animation:fadeUp 0.9s ease both;animation-timeline:view();animation-range:entry 0% entry 30%')}>
          <Kicker>FAQ</Kicker>
          <h2 style={sx('margin:14px 0 0;font-size:clamp(28px,4vw,40px);font-weight:700;letter-spacing:-0.02em')}>Frequently asked questions</h2>
        </div>
        <div style={sx('display:flex;flex-direction:column;gap:12px')}>
          {FAQ_DATA.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <HoverBox key={q} onClick={() => setOpen(isOpen ? -1 : i)} base={`cursor:pointer;background:rgba(var(--wc),0.035);border:1px solid ${isOpen ? 'rgba(160,107,245,0.55)' : 'rgba(var(--wc),0.09)'};border-radius:14px;padding:20px 26px;box-shadow:var(--card-shadow);transition:border-color 0.3s ease,box-shadow 0.32s ease;animation:fadeUp 0.8s ease both;animation-timeline:view();animation-range:entry 0% entry 30%`} hover="border-color:rgba(160,107,245,0.45);box-shadow:var(--card-shadow-hover)">
                <div style={sx('display:flex;justify-content:space-between;align-items:center;gap:16px')}>
                  <div style={sx('font-size:16px;font-weight:600')}>{q}</div>
                  <span style={sx(`flex:none;width:28px;height:28px;border-radius:50%;border:1px solid rgba(var(--wc),0.18);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:14px;color:var(--muted);transition:transform 0.3s;transform:rotate(${isOpen ? '45deg' : '0deg'})`)}>+</span>
                </div>
                <div style={sx(`display:grid;grid-template-rows:${isOpen ? '1fr' : '0fr'};transition:grid-template-rows 0.35s ease;overflow:hidden`)}>
                  <div style={sx('min-height:0;overflow:hidden')}>
                    <div style={sx('margin-top:12px;font-size:16.5px;line-height:1.7;color:var(--muted2)')}>{a}</div>
                  </div>
                </div>
              </HoverBox>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ============================ REGISTER ============================ */
function Register() {
  const url = (REGISTRATION_URL || '').trim();
  const stack = useMediaQuery('(max-width: 820px)');
  return (
    <div style={sx('max-width:1160px;margin:0 auto;padding:150px 28px 96px;animation:fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both')}>
      <div style={sx('text-align:center;margin-bottom:52px')}>
        <Kicker>Registration</Kicker>
        <h2 style={sx('margin:14px 0 12px;font-size:clamp(32px,4.5vw,50px);font-weight:700;letter-spacing:-0.02em')}>Claim your team's spot</h2>
        <p style={sx('margin:0 auto;max-width:640px;font-size:18px;line-height:1.7;color:var(--muted)')}>Capacity is ~20 teams / 80 participants. One form per team, submitted by the team leader.</p>
      </div>

      <div style={sx(`display:grid;grid-template-columns:${stack ? '1fr' : '1.3fr 1fr'};gap:24px;align-items:start`)}>
        <div style={sx('display:flex;flex-direction:column;gap:14px')}>
          {REG_STEPS.map(([title, body], i) => (
            <HoverBox key={i} base={`background:rgba(var(--wc),0.035);border:1px solid rgba(var(--wc),0.09);box-shadow:var(--card-shadow);border-radius:16px;padding:24px 28px;display:flex;gap:20px;align-items:flex-start;box-shadow:var(--card-shadow);transition:transform 0.32s var(--ease-out),border-color 0.3s,box-shadow 0.32s ease;animation:fadeUp 0.7s ease both;animation-delay:${(i * 0.1).toFixed(1)}s`} hover="transform:translateY(-3px);border-color:rgba(160,107,245,0.4);box-shadow:var(--card-shadow-hover)">
              <div style={sx("flex:none;width:40px;height:40px;border-radius:50%;background:linear-gradient(140deg,rgba(43,184,245,0.25),rgba(160,107,245,0.25));border:1px solid rgba(43,184,245,0.4);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:15px;font-weight:600;color:#6fccf7")}>{i + 1}</div>
              <div>
                <div style={sx('font-size:16.5px;font-weight:600;margin-bottom:6px')}>{title}</div>
                <div style={sx('font-size:16px;line-height:1.7;color:var(--muted)')}>{body}</div>
              </div>
            </HoverBox>
          ))}

          <div style={sx('background:rgba(var(--wc),0.03);border:1px solid rgba(var(--wc),0.08);box-shadow:var(--card-shadow);border-radius:16px;padding:24px 28px;animation:fadeUp 0.8s ease both;animation-timeline:view();animation-range:entry 0% entry 30%')}>
            <div style={sx("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.18em;color:var(--muted);text-transform:uppercase;margin-bottom:14px")}>Eligibility checklist</div>
            <div style={sx('display:flex;flex-direction:column;gap:10px;font-size:16px;line-height:1.6;color:var(--muted2)')}>
              {['Currently enrolled EEC student — any program or year', 'Valid EEC student ID at onboarding', 'Member of one team only — teams of 2, 3, or 4', 'Not an organizer, volunteer, mentor, or judge'].map((t) => (
                <div key={t} style={sx('display:flex;gap:12px')}><span style={sx('color:#6fccf7')}>✓</span><span>{t}</span></div>
              ))}
            </div>
            <div style={sx('margin-top:14px;font-size:15px;line-height:1.6;color:var(--muted)')}>Registering solo? You'll be matched into a team at the pre-event team-formation session.</div>
          </div>
        </div>

        <div style={sx(`${stack ? '' : 'position:sticky;top:92px;'}display:flex;flex-direction:column;gap:18px`)}>
          <div style={sx('background:linear-gradient(160deg,rgba(43,184,245,0.13),rgba(160,107,245,0.11) 55%,rgba(95,139,255,0.13));border:1px solid rgba(43,184,245,0.4);border-radius:18px;padding:34px 32px;text-align:center;box-shadow:var(--card-shadow);animation:fadeUp 0.7s ease 0.15s both')}>
            <div style={sx("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.2em;color:#6fccf7;text-transform:uppercase;margin-bottom:10px")}>Registration fee</div>
            <div style={sx('font-size:54px;font-weight:700;line-height:1')}><span style={sx('font-size:22px;font-weight:500;color:var(--muted2);vertical-align:super')}>NPR </span>25</div>
            <div style={sx('font-size:13.5px;color:var(--muted);margin-top:8px')}>per participant — deliberately nominal</div>
            <HoverBox as="a" href={url || '#'} base="display:block;margin-top:24px;text-decoration:none;border:none;border-radius:999px;padding:16px 20px;font-size:16px;font-weight:600;color:#ffffff;background:linear-gradient(96deg,#2bb8f5,#a06bf5,#5f8bff);box-shadow:0 10px 34px rgba(160,107,245,0.4);transition:transform 0.25s,box-shadow 0.25s" hover="transform:translateY(-3px);box-shadow:0 16px 48px rgba(160,107,245,0.6)">
              {REGISTRATION_OPEN ? 'Open the registration form →' : 'Registration opens soon'}
            </HoverBox>
            <div style={sx('font-size:12px;color:var(--muted);margin-top:12px')}>
              {REGISTRATION_OPEN ? (url ? 'Opens the official SOCISE-EEC registration form.' : 'Form link is announced via official SOCISE-EEC channels.') : 'Watch official SOCISE-EEC channels for the opening announcement.'}
            </div>
          </div>

          {REGISTRATION_OPEN && url && (
            <div style={sx('background:rgba(var(--wc),0.035);border:1px solid rgba(var(--wc),0.09);box-shadow:var(--card-shadow);border-radius:16px;padding:26px 28px;text-align:center;animation:fadeUp 0.7s ease 0.22s both')}>
              <div style={sx("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.18em;color:var(--muted);text-transform:uppercase;margin-bottom:16px")}>Scan to register</div>
              <a href={url} target="_blank" rel="noopener noreferrer" style={sx('display:inline-block;background:#ffffff;border-radius:14px;padding:16px;line-height:0;box-shadow:0 8px 28px rgba(0,0,0,0.18)')}>
                <img src={qrRegister} alt="QR code — SparkEEC 1.0 team registration form" width="180" height="180" style={sx('display:block;width:180px;height:180px;image-rendering:pixelated')} />
              </a>
              <div style={sx('font-size:15px;line-height:1.6;color:var(--muted);margin-top:16px')}>Point your phone camera at the code to open the team registration form.</div>
            </div>
          )}

          <div style={sx('background:rgba(var(--wc),0.035);border:1px solid rgba(var(--wc),0.09);box-shadow:var(--card-shadow);border-radius:16px;padding:26px 28px;animation:fadeUp 0.7s ease 0.3s both')}>
            <div style={sx("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.18em;color:var(--muted);text-transform:uppercase;margin-bottom:14px")}>Your fee gets you</div>
            <div style={sx('display:flex;flex-direction:column;gap:9px;font-size:16px;line-height:1.6;color:var(--muted2)')}>
              {['3 meals + tea, coffee & overnight snacks', 'Event kit: ID card, notebook, stickers & swag', 'Supervised overnight stay with rest areas', '5 mentorship rounds with faculty & experts', 'Certificates for all who submit'].map((t) => (
                <div key={t} style={sx('display:flex;gap:12px')}><span style={sx('color:#c5a3fa')}>→</span><span>{t}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================ FOOTER ============================ */
function Footer({ go }) {
  const links = [
    ['home', 'Home'], ['tracks', 'Tracks'], ['schedule', 'Schedule'],
    ['prizes', 'Prizes & Judging'], ['rules', 'Rules & FAQ'], ['register', 'Register'],
  ];
  return (
    <div style={sx('border-top:1px solid rgba(var(--wc),0.07);background:rgba(var(--wc),0.015)')}>
      <div style={sx('max-width:1160px;margin:0 auto;padding:56px 28px 40px')}>
        <div style={sx('display:flex;justify-content:space-between;gap:40px;flex-wrap:wrap')}>
          <div style={sx('max-width:360px')}>
            <div style={sx('display:flex;align-items:center;gap:10px;margin-bottom:12px')}>
              <LogoMark size={30} radius={8} />
              <span style={sx('font-size:20px;font-weight:700;letter-spacing:-0.02em;color:var(--fg-strong)')}>Spark<span style={sx('background:linear-gradient(96deg,#2bb8f5,#a06bf5,#5f8bff,#2bb8f5);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:shimmer 5s linear infinite')}>EEC</span></span>
              <span style={sx("font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--muted);border:1px solid rgba(var(--wc),0.14);border-radius:6px;padding:2px 6px")}>1.0</span>
            </div>
            <div style={sx('font-size:15.5px;line-height:1.7;color:var(--muted);margin-bottom:18px')}>A 27-hour internal hackathon at Everest Engineering College, Sanepa-2, Lalitpur — organized by SOCISE-EEC with AWS Student Builder Group &amp; IEEE EEC Student Branch.</div>
            <div style={sx('display:flex;align-items:center;gap:12px')}>
              <img src={everestLogo} alt="Everest Engineering College" width="44" height="44" loading="lazy" decoding="async" style={sx('flex:none;width:44px;height:44px;border-radius:10px;object-fit:contain;background:#ffffff;padding:3px')} />
              <div style={sx('font-size:12.5px;line-height:1.45;color:var(--muted)')}>Hosted at<br /><span style={sx('color:var(--fg);font-weight:600')}>Everest Engineering College</span></div>
            </div>
          </div>
          <div>
            <div style={sx("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.18em;color:var(--muted);text-transform:uppercase;margin-bottom:14px")}>Site</div>
            <div style={sx('display:flex;flex-direction:column;gap:9px;font-size:14px')}>
              {links.map(([k, label]) => (
                <HoverBox as="span" key={k} onClick={() => go(k)} base="cursor:pointer;color:var(--muted2);transition:color 0.2s" hover="color:var(--fg-strong)">{label}</HoverBox>
              ))}
            </div>
          </div>
          <div>
            <div style={sx("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.18em;color:var(--muted);text-transform:uppercase;margin-bottom:14px")}>Event</div>
            <div style={sx('display:flex;flex-direction:column;gap:9px;font-size:14px;color:var(--muted2)')}>
              <span>17th – 18th July 2026 · 09:00 NPT launch</span>
              <span>Hard deadline: Day 2, 12:00 noon</span>
              <span>GitHub org: SOCISE-SparkEEC</span>
            </div>
          </div>
        </div>
        <div style={sx("margin-top:44px;padding-top:24px;border-top:1px solid rgba(var(--wc),0.06);display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;font-family:'JetBrains Mono',monospace;font-size:11.5px;color:var(--muted)")}>
          <span>© 2026 SOCISE-EEC · Everest Engineering College</span>
        </div>
      </div>
    </div>
  );
}

/* ============================ APP ============================ */
export default function App() {
  const [page, setPage] = useState('home');
  const [theme, setTheme] = useState('dark');
  const cd = useCountdown(EVENT_START, EVENT_END);

  useEffect(() => {
    let saved = 'dark';
    try { saved = localStorage.getItem('sparkeec-theme') || 'dark'; } catch (e) {}
    document.documentElement.setAttribute('data-theme', saved);
    setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('sparkeec-theme', next); } catch (e) {}
    setTheme(next);
  };

  const go = (p) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  return (
    <div style={sx('min-height:100vh;background:var(--bg)')}>
      <Nav page={page} go={go} theme={theme} toggleTheme={toggleTheme} />
      {page === 'home' && <Home go={go} cd={cd} />}
      {page === 'tracks' && <Tracks />}
      {page === 'schedule' && <Schedule />}
      {page === 'prizes' && <Prizes />}
      {page === 'rules' && <Rules />}
      {page === 'register' && <Register />}
      <Footer go={go} />
    </div>
  );
}
