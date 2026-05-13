import C from '../../tokens.js'
import { useMemo } from 'react'
import { Navbar } from '../../components/Navbar.jsx'
import { Footer } from '../../components/Footer.jsx'
import { Breadcrumb } from '../../components/Breadcrumb.jsx'

const SOURCE_STYLE = `/* Component rules; design tokens are in the following <style> block (tokenOverride). */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{font-family:'Gotham','Helvetica Neue',Arial,sans-serif;background:var(--page-bg);color:var(--text-navy);overflow-x:hidden;}
a{text-decoration:none;}
/* HERO — matches other product pages: C.bg band, C.head/C.body copy, C.surface stat cards */
.hero{background:var(--hero-bg);padding:120px 5vw 80px;position:relative;overflow:hidden;min-height:88vh;}
.hero-glow{position:absolute;pointer-events:none;border-radius:50%;}
.glow-tr{top:-140px;right:-100px;width:560px;height:560px;background:radial-gradient(circle,rgba(106,191,94,0.09) 0%,transparent 68%);}
.glow-bl{bottom:0;left:-80px;width:420px;height:420px;background:radial-gradient(circle,rgba(59,130,246,0.06) 0%,transparent 68%);}
.hero-top{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:minmax(0,1.32fr) minmax(0,0.82fr);gap:56px;align-items:center;padding-bottom:60px;}
.hero-top > div{min-width:0;}
.hero-pill{display:inline-flex;align-items:center;gap:7px;background:rgba(20,49,86,0.10);border:1px solid rgba(20,49,86,0.22);color:var(--navy);padding:5px 14px;border-radius:100px;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;margin-bottom:22px;}
.hero-title{font-family:'Akshar',sans-serif;font-size:46px;font-weight:900;color:var(--text-navy);line-height:1.08;margin-bottom:22px;text-wrap:balance;max-width:100%;}
.hero-title em{font-style:normal;color:var(--navy);}
.hero-sub{font-size:16px;color:var(--text-mid);font-weight:400;line-height:1.75;margin-bottom:36px;max-width:100%;}
.hero-actions{display:flex;gap:14px;flex-wrap:wrap;}
.btn-green{background:var(--green);color:var(--navy);border:none;border-radius:8px;padding:13px 26px;font-family:'Gotham','Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:700;cursor:pointer;transition:background .2s;display:inline-flex;align-items:center;gap:6px;}
.btn-green:hover{background:#7dcf71;}
.btn-outline{background:none;border:1px solid var(--bd-light);border-radius:8px;padding:13px 26px;color:var(--text-navy);font-family:'Gotham','Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:background .2s;display:inline-flex;align-items:center;gap:6px;}
.btn-outline:hover{background:#f5f8fb;}
.hero-stats{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.hstat{background:var(--white);border:1px solid var(--bd-light);border-radius:12px;padding:22px 20px;}
.hstat-num{font-family:'Akshar',sans-serif;font-size:28px;font-weight:900;line-height:1;margin-bottom:6px;}
.hero-stats .hstat:nth-child(odd) .hstat-num{color:var(--navy);}
.hero-stats .hstat:nth-child(even) .hstat-num{color:var(--green);}
.hstat-label{font-size:12.5px;color:var(--text-muted);line-height:1.45;font-weight:500;}
/* DIAGRAM STRIP */
.diag-strip{background:var(--white);border-top:1px solid var(--bd-light);padding:44px 5vw 48px;}
.diag-inner{max-width:1100px;margin:0 auto;}
.diag-eyebrow{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--text-muted);margin-bottom:32px;text-align:center;}
.diag-track{display:grid;align-items:center;}
.dnode{background:var(--white);border:1px solid var(--bd-light);border-radius:16px;padding:22px 18px;text-align:center;}
.dnode.sp{background:rgba(106,191,94,0.12);border-color:rgba(106,191,94,0.35);}
.dnode-icon{font-size:28px;margin-bottom:10px;display:block;}
.dnode-title{font-size:13px;font-weight:600;color:var(--text-navy);margin-bottom:4px;}
.dnode-sub{font-size:11px;color:var(--text-mid);line-height:1.4;}
.dpills{margin-top:12px;display:flex;flex-direction:column;gap:5px;}
.dpill{font-size:10px;background:var(--off-white);border:1px solid var(--bd-light);color:var(--text-mid);border-radius:6px;padding:4px 8px;animation:ppulse 3s ease-in-out infinite;}
.dpill:nth-child(2){animation-delay:.7s;}.dpill:nth-child(3){animation-delay:1.4s;}
@keyframes ppulse{0%,100%{background:rgba(255,255,255,0.06);border-color:rgba(255,255,255,0.1);}50%{background:rgba(106,191,94,0.14);border-color:rgba(106,191,94,0.3);color:var(--green);}}
.dconn{display:flex;flex-direction:column;align-items:center;gap:6px;padding:0 6px;}
.dconn-tag{font-size:10px;font-weight:600;color:var(--green);background:rgba(106,191,94,0.1);border:1px solid rgba(106,191,94,0.2);padding:3px 10px;border-radius:100px;white-space:nowrap;}
.dconn-line{width:100%;height:2px;background:linear-gradient(90deg,var(--bd-light),var(--green) 50%,var(--bd-light));position:relative;}
.dconn-line::after{content:'';position:absolute;right:-1px;top:-4px;border-left:8px solid var(--green);border-top:5px solid transparent;border-bottom:5px solid transparent;}
/* SECTIONS */
.section{padding:88px 5vw;}
.section.light{background:var(--white);}
/* How It Works — same as DeaLookupTool / other products: C.bg, 88px vertical padding */
.section.how-it{background:var(--how-bg);padding:88px 5vw;}
.section.dark{background:var(--navy);}
.section.alt{background:var(--alt-bg);padding:96px 5vw 100px;}
.section.alt .uc{background:var(--white);border:1px solid var(--bd-light);box-shadow:0 2px 12px rgba(20,49,86,0.06);}
.section.alt .uc:hover{background:var(--white);border-color:rgba(131,183,98,0.55);box-shadow:0 10px 32px rgba(20,49,86,0.12);}
.section.alt .uc h4{color:var(--text-navy);}
.section.alt .uc p{color:var(--text-mid);}
.section.alt .uc-res{color:var(--navy);font-weight:600;}
.section.alt .sec-desc{color:var(--text-muted);}
.sec-inner{max-width:1100px;margin:0 auto;}
.sec-tag{display:inline-block;background:rgba(106,191,94,0.10);border:1px solid rgba(106,191,94,0.22);color:var(--green-dk);padding:4px 12px;border-radius:100px;font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;margin-bottom:14px;}
.sec-tag.wt{background:rgba(106,191,94,0.12);color:var(--green);border-color:rgba(106,191,94,0.25);}
/* Navy pill — matches <Badge c={C.p}> on other product pages (Capabilities, How It Works) */
.sec-tag--p{background:rgba(20,49,86,0.10);border:1px solid rgba(20,49,86,0.22);color:var(--navy);}
.sec-title{font-family:'Akshar',sans-serif;font-size:34px;font-weight:800;color:var(--text-navy);line-height:1.15;margin-bottom:12px;}
.sec-title.wh{color:var(--white);}
.sec-desc{font-size:16px;color:var(--text-mid);font-weight:300;line-height:1.7;max-width:580px;}
.sec-desc.wh{color:var(--text-pale);}
.sec-head{margin-bottom:52px;}
/* FEATURE SPLIT */
.feat-split{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;margin-bottom:72px;}
.feat-split:last-child{margin-bottom:0;}
.feat-split.rev{direction:rtl;}
.feat-split.rev>*{direction:ltr;}
.fst-text h3{font-family:'Akshar',sans-serif;font-size:26px;font-weight:800;color:var(--text-navy);margin-bottom:12px;line-height:1.2;}
.fst-text p{font-size:15px;color:var(--text-mid);line-height:1.72;font-weight:300;margin-bottom:16px;}
.checklist{list-style:none;display:flex;flex-direction:column;gap:10px;}
.checklist li{display:flex;align-items:flex-start;gap:10px;font-size:14px;color:var(--text-navy);font-weight:400;}
.chk{width:20px;height:20px;border-radius:50%;background:var(--green-pale);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;}
.chk svg{width:11px;height:11px;}
/* MOCKUP */
.mockup{background:var(--navy);border-radius:18px;border:1px solid rgba(255,255,255,0.1);overflow:hidden;box-shadow:0 24px 56px rgba(13,31,60,.22);}
.mtbar{background:rgba(255,255,255,0.06);border-bottom:1px solid rgba(255,255,255,0.08);padding:10px 16px;display:flex;align-items:center;gap:6px;}
.dot{width:10px;height:10px;border-radius:50%;}
.dot.r{background:#ff5f57;}.dot.y{background:#febc2e;}.dot.g{background:#28c840;}
.mtab{margin-left:10px;font-size:11px;color:var(--text-muted);background:rgba(255,255,255,0.06);border-radius:4px;padding:3px 10px;}
.mbody{padding:20px;}
/* HOW IT WORKS */
.hiw{display:grid;grid-template-columns:repeat(4,1fr);gap:0;position:relative;}
.hiw::before{content:'';position:absolute;top:44px;left:12%;right:12%;height:2px;background:repeating-linear-gradient(90deg,var(--bd-light) 0,var(--bd-light) 6px,transparent 6px,transparent 14px);z-index:0;}
.hiw-step{display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 16px;position:relative;z-index:1;}
.hiw-circ{width:88px;height:88px;border-radius:50%;background:var(--white);border:2px solid var(--bd-light);display:flex;align-items:center;justify-content:center;margin-bottom:20px;position:relative;transition:border-color .3s,box-shadow .3s;}
.hiw-step:hover .hiw-circ{border-color:var(--green);box-shadow:0 0 0 6px var(--green-ring);}
.hiw-ico{width:60px;height:60px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:26px;}
.hiw-n{position:absolute;top:-6px;right:-6px;width:22px;height:22px;border-radius:50%;background:var(--navy);color:var(--green);font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid var(--bd-light);}
.hiw-step h4{font-size:14px;font-weight:600;color:var(--text-navy);margin-bottom:8px;}
.hiw-step p{font-size:13px;color:var(--text-mid);line-height:1.6;font-weight:300;}
/* USE CASES */
.uc-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
.uc{background:rgba(255,255,255,0.04);border:1px solid var(--bd-dark);border-radius:18px;padding:32px;display:grid;grid-template-columns:64px 1fr;gap:20px;align-items:start;transition:background .25s,border-color .25s;}
.uc:hover{background:rgba(255,255,255,0.07);border-color:rgba(106,191,94,0.25);}
.uc-iw{width:64px;height:64px;border-radius:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.uc h4{font-size:16px;font-weight:600;color:var(--white);margin-bottom:8px;line-height:1.3;}
.uc p{font-size:13.5px;color:var(--text-muted);line-height:1.65;font-weight:300;}
.uc-res{display:inline-flex;align-items:center;gap:6px;margin-top:14px;font-size:12px;font-weight:600;color:var(--green);}
/* COMPLIANCE */
.comp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
.comp-item{background:rgba(255,255,255,0.04);border:1px solid var(--bd-dark);border-radius:14px;padding:20px;display:flex;align-items:center;gap:14px;}
.comp-dot{width:10px;height:10px;border-radius:50%;background:var(--green);flex-shrink:0;}
.comp-item strong{display:block;font-size:13px;font-weight:600;color:var(--white);margin-bottom:2px;}
.comp-item span{font-size:12px;color:var(--text-muted);}
/* RELATED */
.rel-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
.rel{background:var(--white);border:1px solid var(--bd-light);border-radius:14px;padding:24px;display:flex;flex-direction:column;gap:10px;transition:transform .2s,box-shadow .2s;}
.rel:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(13,31,60,.08);}
.rel-ico{font-size:20px;}
.rel h4{font-size:14px;font-weight:600;color:var(--text-navy);}
.rel p{font-size:13px;color:var(--text-mid);line-height:1.55;flex:1;font-weight:300;}
.rel-lnk{font-size:12px;font-weight:700;color:var(--navy);display:inline-flex;align-items:center;gap:4px;}
/* CTA — same light band as other product pages (C.bg) */
.cta-band{background:var(--hero-bg);border-top:1px solid var(--bd-light);padding:80px 5vw;}
.cta-inner{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:1fr auto;gap:40px;align-items:center;}
.cta-inner h2{font-family:'Akshar',sans-serif;font-size:38px;font-weight:800;color:var(--text-navy);margin-bottom:12px;}
.cta-inner p{font-size:16px;color:var(--text-muted);font-weight:400;max-width:520px;}
.cta-btns{display:flex;flex-direction:column;gap:12px;flex-shrink:0;}
/* ANIMS */
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:.3;}}
@keyframes sin{from{opacity:0;transform:translateX(10px)}to{opacity:1;transform:none}}
@keyframes ppulse{0%,100%{opacity:.6;}50%{opacity:1;}}
.au{animation:fadeUp .5s ease both;}
.au1{animation-delay:.05s}.au2{animation-delay:.12s}.au3{animation-delay:.19s}.au4{animation-delay:.26s}`
const SOURCE_BODY = `<section class="hero">
  <div class="hero-glow glow-tr"></div><div class="hero-glow glow-bl"></div>
  <div class="hero-top">
    <div class="au au1">
      <div class="hero-pill">📊 Analytics Platform</div>
      <h1 class="hero-title">Pharmacy analytics built for <em>long-term care</em> — not retail</h1>
      <p class="hero-sub">Surface the metrics that actually drive LTC pharmacy performance: utilization by facility, medication adherence rates, cost per resident day, and compliance KPIs. Built on data models that make sense for how LTC pharmacy actually works.</p>
      <div class="hero-actions">
        <a href="/schedule-demo" class="btn-green">Schedule a Demo →</a>
        <a href="#how" class="btn-outline">See How It Works ↓</a>
      </div>
    </div>
    <div class="hero-stats au au2"><div class="hstat"><div class="hstat-num">50+</div><div class="hstat-label">Pre-built LTC-specific reports</div></div><div class="hstat"><div class="hstat-num">Daily</div><div class="hstat-label">Data refresh cadence</div></div><div class="hstat"><div class="hstat-num">Multi-facility</div><div class="hstat-label">Benchmarking views</div></div><div class="hstat"><div class="hstat-num">Custom</div><div class="hstat-label">KPI dashboard builder</div></div></div>
  </div></section><div class="diag-strip">
  <div class="diag-inner">
    <div class="diag-eyebrow">How your data becomes insight</div>
    <div class="diag-track" style="grid-template-columns:200px 1fr 200px 1fr 200px;"><div class="dnode"><span class="dnode-icon">💊</span><div class="dnode-title">Your Data Sources</div><div class="dnode-sub">Pharmacy system, billing, PCC feed, and facility data</div><div class="dpills"><div class="dpill">Dispense records</div><div class="dpill">Claims data</div><div class="dpill">Census & payor</div></div></div><div class="dconn"><div class="dconn-tag">ingested & normalized</div><div class="dconn-line"></div></div><div class="dnode sp"><span class="dnode-icon">⚡</span><div class="dnode-title">Skypond Analytics</div><div class="dnode-sub">LTC-specific data models, daily refresh</div></div><div class="dconn"><div class="dconn-tag">delivered as dashboards</div><div class="dconn-line"></div></div><div class="dnode"><span class="dnode-icon">📊</span><div class="dnode-title">Your Dashboards</div><div class="dnode-sub">Ops, clinical, finance, and exec views</div><div class="dpills"><div class="dpill">Facility performance</div><div class="dpill">Cost analytics</div><div class="dpill">Compliance KPIs</div></div></div></div>
  </div>
</div>
<section class="section light" id="features">
  <div class="sec-inner">
    <div class="sec-head">
      <div class="sec-tag sec-tag--p">Capabilities</div>
      <h2 class="sec-title">The metrics that matter in LTC pharmacy, surfaced automatically</h2>
      <p class="sec-desc">Most analytics tools were built for retail pharmacy. LTC Analytics was built for long-term care — with the data models and KPIs that reflect how your operation actually works.</p>
    </div>
    <div class="feat-split">
  <div class="fst-text"><h3>Facility-level performance benchmarking</h3><p>Break down utilization, adherence rates, and cost metrics facility by facility. Identify outliers, underperformers, and opportunities across your entire book of business — without pulling a dozen spreadsheets together.</p><ul class="checklist"><li><div class="chk"><svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#4a9e40" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Per-facility cost per resident day tracking</li><li><div class="chk"><svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#4a9e40" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Medication adherence rate by facility and unit</li><li><div class="chk"><svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#4a9e40" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Side-by-side facility benchmarking views</li><li><div class="chk"><svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#4a9e40" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Automatic flagging of cost or adherence outliers</li></ul></div>
  <div class="mockup"><div class="mtbar"><div class="dot r"></div><div class="dot y"></div><div class="dot g"></div><div class="mtab">Facility Performance — All Locations</div></div><div class="mbody">
<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
  <div style="font-size:12px;font-weight:600;color:var(--text-pale);text-transform:uppercase;letter-spacing:.06em;">Utilization by Facility · April 2026</div>
  <div style="font-size:11px;color:var(--text-muted);">Updated today</div>
</div>
<div style="display:flex;flex-direction:column;gap:8px;">
  <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:12px 14px;">
    <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span style="font-size:12px;color:var(--white);font-weight:500;">Sunrise SNF</span><span style="font-size:11px;color:var(--green);font-weight:600;">$42.18/resident/day</span></div>
    <div style="height:6px;background:rgba(255,255,255,0.06);border-radius:100px;overflow:hidden;"><div style="width:82%;height:100%;background:var(--green);border-radius:100px;"></div></div>
    <div style="font-size:10px;color:var(--text-muted);margin-top:4px;">142 residents · 96% adherence</div>
  </div>
  <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:12px 14px;">
    <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span style="font-size:12px;color:var(--white);font-weight:500;">Maplewood Care Center</span><span style="font-size:11px;color:#7eb8f7;font-weight:600;">$38.44/resident/day</span></div>
    <div style="height:6px;background:rgba(255,255,255,0.06);border-radius:100px;overflow:hidden;"><div style="width:74%;height:100%;background:#7eb8f7;border-radius:100px;"></div></div>
    <div style="font-size:10px;color:var(--text-muted);margin-top:4px;">87 residents · 91% adherence</div>
  </div>
  <div style="background:rgba(245,158,11,0.07);border:1px solid rgba(245,158,11,0.18);border-radius:10px;padding:12px 14px;">
    <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span style="font-size:12px;color:var(--white);font-weight:500;">Valley View SNF</span><span style="font-size:11px;color:#f5c96a;font-weight:600;">$61.09/resident/day ↑</span></div>
    <div style="height:6px;background:rgba(255,255,255,0.06);border-radius:100px;overflow:hidden;"><div style="width:91%;height:100%;background:#f5c96a;border-radius:100px;"></div></div>
    <div style="font-size:10px;color:#f5c96a;margin-top:4px;">⚠ Cost outlier — 203 residents · Review recommended</div>
  </div>
</div></div></div>
</div>
    <div class="feat-split rev">
  <div class="fst-text"><h3>Cost and margin analytics — by facility, drug, and month</h3><p>Monitor cost per resident day, cost per dispense, and facility-level margin. Surface high-cost outliers and identify formulary optimization opportunities that finance and ops can actually act on.</p><ul class="checklist"><li><div class="chk"><svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#4a9e40" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Cost per resident day tracked and trended over time</li><li><div class="chk"><svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#4a9e40" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Top cost drivers surfaced automatically each period</li><li><div class="chk"><svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#4a9e40" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Margin analytics by facility and portfolio</li><li><div class="chk"><svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#4a9e40" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Formulary optimization opportunity identification</li></ul></div>
  <div class="mockup"><div class="mtbar"><div class="dot r"></div><div class="dot y"></div><div class="dot g"></div><div class="mtab">Cost & Margin Dashboard</div></div><div class="mbody">
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">
  <div style="background:rgba(106,191,94,0.08);border:1px solid rgba(106,191,94,0.2);border-radius:12px;padding:16px;">
    <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">Avg Cost / Resident Day</div>
    <div style="font-family:'Fraunces',serif;font-size:28px;font-weight:900;color:var(--green);">$44.21</div>
    <div style="font-size:11px;color:var(--green);">↓ $2.14 vs last month</div>
  </div>
  <div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.2);border-radius:12px;padding:16px;">
    <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">Portfolio Margin</div>
    <div style="font-family:'Fraunces',serif;font-size:28px;font-weight:900;color:#7eb8f7;">18.4%</div>
    <div style="font-size:11px;color:#7eb8f7;">↑ 1.2% vs last quarter</div>
  </div>
</div>
<div style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:8px;">Top Cost Drivers This Month</div>
<div style="display:flex;flex-direction:column;gap:6px;">
  <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;background:rgba(255,255,255,0.04);border-radius:8px;padding:8px 12px;"><span style="color:var(--text-light);">Specialty injectables</span><span style="color:#f87171;font-weight:600;">+$8.42/res/day</span></div>
  <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;background:rgba(255,255,255,0.04);border-radius:8px;padding:8px 12px;"><span style="color:var(--text-light);">Wound care supplies</span><span style="color:#f5c96a;font-weight:600;">+$3.16/res/day</span></div>
  <div style="display:flex;align-items:center;justify-content:space-between;font-size:12px;background:rgba(255,255,255,0.04);border-radius:8px;padding:8px 12px;"><span style="color:var(--text-light);">Formulary conversions</span><span style="color:var(--green);font-weight:600;">-$1.88/res/day</span></div>
</div></div></div>
</div>
    <div class="feat-split">
  <div class="fst-text"><h3>Custom KPI dashboards — configured for each role</h3><p>Your VP of Operations, your clinical pharmacist, and your finance team all need different views of the same data. The dashboard builder lets each role configure exactly the metrics they own — without needing IT to build it.</p><p>Reports can be scheduled for automated delivery to facility partners, management, or compliance stakeholders.</p><ul class="checklist"><li><div class="chk"><svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#4a9e40" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Drag-and-drop dashboard builder — no IT required</li><li><div class="chk"><svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#4a9e40" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Role-specific views: ops, clinical, finance, exec</li><li><div class="chk"><svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#4a9e40" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Scheduled report delivery on any cadence</li><li><div class="chk"><svg viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#4a9e40" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>Export to PDF or Excel for stakeholder meetings</li></ul></div>
  <div class="mockup"><div class="mtbar"><div class="dot r"></div><div class="dot y"></div><div class="dot g"></div><div class="mtab">Custom KPI Dashboard Builder</div></div><div class="mbody">
<div style="font-size:12px;font-weight:600;color:var(--text-pale);text-transform:uppercase;letter-spacing:.06em;margin-bottom:14px;">Operations Director View</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
  <div style="background:rgba(255,255,255,0.04);border:1px solid var(--bd-dark);border-radius:12px;padding:14px;text-align:center;">
    <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">Active Facilities</div>
    <div style="font-family:'Fraunces',serif;font-size:28px;font-weight:900;color:var(--white);">24</div>
  </div>
  <div style="background:rgba(255,255,255,0.04);border:1px solid var(--bd-dark);border-radius:12px;padding:14px;text-align:center;">
    <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">Portfolio Adherence</div>
    <div style="font-family:'Fraunces',serif;font-size:28px;font-weight:900;color:var(--green);">93.4%</div>
  </div>
</div>
<div style="display:flex;flex-direction:column;gap:6px;">
  <div style="background:rgba(239,68,68,0.07);border:1px solid rgba(239,68,68,0.2);border-radius:8px;padding:10px 14px;display:flex;align-items:center;justify-content:space-between;">
    <div><div style="font-size:12px;color:#f87171;font-weight:600;">Facilities needing attention</div><div style="font-size:11px;color:var(--text-muted);">Cost outlier or adherence below 85%</div></div>
    <div style="font-family:'Fraunces',serif;font-size:20px;color:#f87171;font-weight:800;">3</div>
  </div>
  <div style="background:rgba(106,191,94,0.06);border:1px solid rgba(106,191,94,0.18);border-radius:8px;padding:10px 14px;display:flex;align-items:center;justify-content:space-between;">
    <div><div style="font-size:12px;color:var(--green);font-weight:600;">Top performing facilities</div><div style="font-size:11px;color:var(--text-muted);">On target cost and adherence</div></div>
    <div style="font-family:'Fraunces',serif;font-size:20px;color:var(--green);font-weight:800;">18</div>
  </div>
</div></div></div>
</div>
  </div>
</section><section class="section how-it" id="how">
  <div class="sec-inner">
    <div class="sec-head" style="text-align:center;">
      <div class="sec-tag sec-tag--p" style="margin:0 auto 14px;">How It Works</div>
      <h2 class="sec-title">From data connection to working dashboards</h2>
      <p class="sec-desc" style="margin:0 auto;">Most integrations are live within days. Pre-built reports are available on day one — no configuration required.</p>
    </div>
    <div class="hiw"><div class="hiw-step">
      <div class="hiw-circ"><div class="hiw-ico" style="background:rgba(106,191,94,0.12);">🔌</div><div class="hiw-n">01</div></div>
      <h4>Connect data sources</h4><p>We ingest data from your pharmacy system, billing platform, and facility feeds. Most integrations complete in days, not months.</p>
    </div><div class="hiw-step">
      <div class="hiw-circ"><div class="hiw-ico" style="background:rgba(59,130,246,0.12);">🔄</div><div class="hiw-n">02</div></div>
      <h4>Data normalized to LTC models</h4><p>Incoming data is cleaned, validated, and organized into LTC-specific data models with consistent metric definitions.</p>
    </div><div class="hiw-step">
      <div class="hiw-circ"><div class="hiw-ico" style="background:rgba(245,158,11,0.12);">📊</div><div class="hiw-n">03</div></div>
      <h4>50+ reports ready on day one</h4><p>Pre-built LTC pharmacy reports covering facility performance, drug utilization, and compliance KPIs are available immediately.</p>
    </div><div class="hiw-step">
      <div class="hiw-circ"><div class="hiw-ico" style="background:rgba(106,191,94,0.12);">🎛️</div><div class="hiw-n">04</div></div>
      <h4>Build and share custom views</h4><p>Use the dashboard builder to create custom views for each team and schedule automated delivery to stakeholders.</p>
    </div></div>
  </div>
</section><section class="section alt">
  <div class="sec-inner">
    <div class="sec-head">
      <div class="sec-tag">Who It's For</div>
      <h2 class="sec-title">Analytics that drive real LTC pharmacy decisions</h2>
      <p class="sec-desc">The best analytics are the ones that show up at exactly the right moment — before the meeting, before the review, before the problem becomes a crisis.</p>
    </div>
    <div class="uc-grid"><div class="uc">
      <div class="uc-iw" style="background:rgba(106,191,94,0.12);">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none"><rect x="3" y="3" width="24" height="24" rx="3" stroke="#6abf5e" stroke-width="1.8"/><path d="M8 20l5-7 4 4 4-8" stroke="#6abf5e" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <div><h4>Facility contract reviews</h4><p>Go into quarterly reviews with facility administrators armed with data — utilization trends, adherence rates, and cost benchmarks — not gut feel. Make the case for your value with numbers.</p><div class="uc-res">→ Data-backed contract conversations</div></div>
    </div><div class="uc">
      <div class="uc-iw" style="background:rgba(59,130,246,0.12);">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none"><circle cx="15" cy="15" r="10" stroke="#7eb8f7" stroke-width="1.8"/><path d="M15 9v6l4 4" stroke="#7eb8f7" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 15h2M19 15h2M15 9v2M15 19v2" stroke="#7eb8f7" stroke-width="1.3" stroke-linecap="round"/></svg>
      </div>
      <div><h4>Clinical program monitoring</h4><p>Track high-risk medication utilization, polypharmacy patterns, and adherence gaps to support clinical pharmacist interventions — before a resident event triggers a formal review.</p><div class="uc-res">→ Early identification of clinical risk</div></div>
    </div><div class="uc">
      <div class="uc-iw" style="background:rgba(245,158,11,0.12);">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none"><rect x="4" y="4" width="10" height="22" rx="2" stroke="#f5c96a" stroke-width="1.8"/><rect x="16" y="10" width="10" height="16" rx="2" stroke="#f5c96a" stroke-width="1.8"/><path d="M7 15h4M19 17h4" stroke="#f5c96a" stroke-width="1.5" stroke-linecap="round"/></svg>
      </div>
      <div><h4>Operations leadership visibility</h4><p>Give your VP of Operations a single view across all facilities and locations — cost, adherence, and outliers — without pulling a dozen spreadsheets together every week.</p><div class="uc-res">→ Portfolio visibility in one view</div></div>
    </div><div class="uc">
      <div class="uc-iw" style="background:rgba(168,85,247,0.12);">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none"><path d="M15 4l3 6h7l-5.5 4 2 7-6.5-4-6.5 4 2-7L5 10h7z" stroke="#c79cf7" stroke-width="1.8" stroke-linejoin="round"/></svg>
      </div>
      <div><h4>Business development</h4><p>Use facility-level benchmarking data to demonstrate value when pitching new facility accounts — or to renegotiate contracts where your performance clearly exceeds expectations.</p><div class="uc-res">→ Data that wins and retains facility contracts</div></div>
    </div></div>
  </div>
</section><section class="section dark" style="padding-top:0;">
  <div class="sec-inner">
    <div style="border-top:1px solid var(--bd-dark);padding-top:64px;">
      <div class="sec-head">
        <div class="sec-tag wt">Security &amp; Compliance</div>
        <h2 class="sec-title wh">Data you can trust. Security you can rely on.</h2>
        <p class="sec-desc wh">All pharmacy and patient data is handled under HIPAA Business Associate Agreement. Role-based access ensures the right people see the right data — nothing more.</p>
      </div>
      <div class="comp-grid"><div class="comp-item"><div class="comp-dot"></div><div><strong>HIPAA BAA Included</strong><span>Business Associate Agreement with every deployment</span></div></div><div class="comp-item"><div class="comp-dot"></div><div><strong>Role-Based Data Access</strong><span>Granular permissions on who sees which facilities</span></div></div><div class="comp-item"><div class="comp-dot"></div><div><strong>SOC 2 Type II</strong><span>Independently audited security controls</span></div></div><div class="comp-item"><div class="comp-dot"></div><div><strong>Encrypted Data Pipeline</strong><span>All data encrypted in transit and at rest</span></div></div><div class="comp-item"><div class="comp-dot"></div><div><strong>Audit-Ready Export</strong><span>All reports available for compliance or inspection use</span></div></div><div class="comp-item"><div class="comp-dot"></div><div><strong>No PHI Leaves Your Environment</strong><span>Patient data stays within your data perimeter</span></div></div></div>
    </div>
  </div>
</section><section class="section light">
  <div class="sec-inner">
    <div class="sec-head"><div class="sec-tag">Related Products</div><h2 class="sec-title">Works well with</h2></div>
    <div class="rel-grid"><div class="rel"><div class="rel-ico">🔗</div><h4>PointClickCare Feed</h4><p>Connect PCC census and payor data for a complete facility performance picture.</p><a href="/products/pointclickcare-feed" class="rel-lnk">Learn more →</a></div><div class="rel"><div class="rel-ico">📋</div><h4>DEA Compliance Reporting</h4><p>Add compliance reporting metrics alongside your operational analytics.</p><a href="/products/dea-compliance-reporting" class="rel-lnk">Learn more →</a></div><div class="rel"><div class="rel-ico">📦</div><h4>CS Inventory</h4><p>Pull CS dispensing data into analytics for a full controlled substance utilization view.</p><a href="/products/cs-inventory" class="rel-lnk">Learn more →</a></div></div>
  </div>
</section><section class="cta-band">
  <div class="cta-inner">
    <div><h2>See your data come to life</h2><p>We'll connect to your data and show you a working dashboard in your first demo — not a slide deck.</p></div>
    <div class="cta-btns">
      <a href="/schedule-demo" class="btn-green" style="justify-content:center;">Schedule a Demo →</a>
      <a href="/schedule-demo" class="btn-outline" style="justify-content:center;">Talk to Sales</a>
       
    </div>
  </div>
</section>`

export default function LtcAnalytics() {
  const tokenOverride = useMemo(() => `
:root{
  --alt-bg:${C.alt};
  --navy:${C.p};
  --navy-mid:${C.pd};
  --navy-light:${C.p};
  --green:${C.green};
  --green-dark:${C.green};
  --green-dk:${C.green};
  --green-pale:rgba(131,183,98,0.15);
  --green-ring:${C.green}26;
  --white:${C.surface};
  --off-white:${C.bg};
  --hero-bg:${C.bg};
  --how-bg:${C.bg};
  --page-bg:${C.surface};
  --text-navy:${C.head};
  --text-mid:${C.body};
  --text-muted:${C.muted};
  --text-pale:rgba(255,255,255,0.72);
  --text-light:rgba(255,255,255,0.88);
  --bd-dark:rgba(255,255,255,0.10);
  --bd-mid:rgba(255,255,255,0.16);
  --bd-lite:rgba(255,255,255,0.24);
  --bd-light:${C.border};
}
`, [])

  return (
    <>
      <Navbar />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'LTC Analytics Dashboard', href: null }]} />
      <style>{SOURCE_STYLE}</style>
      <style>{tokenOverride}</style>
      <main dangerouslySetInnerHTML={{ __html: SOURCE_BODY }} />
      <Footer />
    </>
  )
}
