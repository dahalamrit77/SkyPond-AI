import C from '../tokens.js'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import {
  Mail, Globe, MapPin, Shield, Lock, Eye, Share2, Clock,
  Server, UserCheck, Cookie, Plane, Baby, RefreshCw,
} from 'lucide-react'
import { CONTACT_EMAIL } from '../config/constants.js'

const TEXT = C.body

const Badge = ({ c = C.p, children }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 13px',
    borderRadius: 99, border: `1px solid ${c}28`, background: `${c}18`, color: c,
    fontSize: 11.5, letterSpacing: '0.07em', textTransform: 'uppercase', fontWeight: 500,
    fontFamily: "'Akshar', sans-serif",
  }}>{children}</span>
)

const H = ({ size = 'h2', style = {}, color, children }) => {
  const s = { hero: 'clamp(2.4rem,5vw,3.8rem)', h2: 'clamp(1.5rem,2.4vw,2rem)', h3: '1.05rem' }
  const fw = size === 'h3' ? 600 : 700
  return (
    <h2 style={{
      fontSize: s[size], fontWeight: fw, color: color || C.head,
      letterSpacing: '-0.026em', lineHeight: 1.12,
      fontFamily: "'Akshar', sans-serif", ...style,
    }}>{children}</h2>
  )
}

const Body = ({ style = {}, children }) => (
  <p style={{
    fontSize: 15, color: TEXT, lineHeight: 1.75,
    fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight: 400, ...style,
  }}>{children}</p>
)

const SECTIONS = [
  { id: 'introduction', num: '1', title: 'Introduction', icon: <Shield size={18} /> },
  { id: 'collect', num: '2', title: 'Information We Collect', icon: <Eye size={18} /> },
  { id: 'use', num: '3', title: 'How We Use Your Information', icon: <UserCheck size={18} /> },
  { id: 'legal-basis', num: '4', title: 'Legal Basis for Processing', icon: <Lock size={18} /> },
  { id: 'sharing', num: '5', title: 'Data Sharing and Disclosure', icon: <Share2 size={18} /> },
  { id: 'retention', num: '6', title: 'Data Retention', icon: <Clock size={18} /> },
  { id: 'security', num: '7', title: 'Data Security', icon: <Server size={18} /> },
  { id: 'rights', num: '8', title: 'Your Rights', icon: <UserCheck size={18} /> },
  { id: 'cookies', num: '9', title: 'Cookies and Tracking', icon: <Cookie size={18} /> },
  { id: 'transfers', num: '10', title: 'International Data Transfers', icon: <Plane size={18} /> },
  { id: 'children', num: '11', title: "Children's Privacy", icon: <Baby size={18} /> },
  { id: 'updates', num: '12', title: 'Updates to This Policy', icon: <RefreshCw size={18} /> },
  { id: 'contact', num: '13', title: 'Contact Us', icon: <Mail size={18} /> },
]

function Hero() {
  return (
    <section style={{
      minHeight: '56vh', display: 'flex', alignItems: 'center',
      padding: '120px 5vw 80px', position: 'relative', overflow: 'hidden',
      background: `linear-gradient(160deg,${C.dark} 0%,#0D2040 100%)`,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${C.p2}09 1px,transparent 1px),linear-gradient(90deg,${C.p2}09 1px,transparent 1px)`,
        backgroundSize: '52px 52px', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: -140, right: -60, width: 520, height: 520, borderRadius: '50%',
        background: `radial-gradient(circle,${C.p2}22 0%,transparent 68%)`, pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <div style={{ marginBottom: 20, animation: 'fadeUp 0.5s ease both' }}>
          <Badge c={C.green}>Legal</Badge>
        </div>
        <H size="hero" color="#fff" style={{ marginBottom: 18, animation: 'fadeUp 0.5s 0.08s ease both' }}>
          Privacy Policy
        </H>
        <Body style={{
          maxWidth: 580, margin: '0 auto', color: 'rgba(255,255,255,0.82)',
          animation: 'fadeUp 0.5s 0.14s ease both',
        }}>
          How SkyPond Tech collects, uses, stores, and protects your information when you use our website and services.
        </Body>
      </div>
    </section>
  )
}

function SummaryStrip() {
  const items = [
    { label: 'Effective Date', value: 'October 27, 2025' },
    { label: 'Company', value: 'SkyPond Tech Pvt. Ltd.' },
    { label: 'Website', value: 'skypondtech.com', href: 'https://skypondtech.com' },
  ]
  return (
    <section style={{ padding: '0 5vw', marginTop: -36, position: 'relative', zIndex: 2 }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 0,
        background: C.surface, borderRadius: 16, border: `1.5px solid ${C.border}`,
        boxShadow: '0 12px 40px rgba(20,49,86,0.08)', overflow: 'hidden',
      }}>
        {items.map((item, i) => (
          <div key={item.label} style={{
            padding: '22px 26px',
            borderRight: i < items.length - 1 ? `1px solid ${C.border}` : 'none',
          }}>
            <div style={{
              fontSize: 10.5, fontWeight: 700, color: C.muted, textTransform: 'uppercase',
              letterSpacing: '0.08em', marginBottom: 8, fontFamily: "'Akshar', sans-serif",
            }}>{item.label}</div>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" style={{
                color: C.p, fontSize: 15, fontWeight: 600, textDecoration: 'none',
                fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline' }}
                onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none' }}
              >{item.value}</a>
            ) : (
              <div style={{
                color: C.head, fontSize: 15, fontWeight: 600,
                fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
              }}>{item.value}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function CheckList({ items }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 16 }}>
      {items.map((item, i) => (
        <div key={item} style={{
          display: 'flex', gap: 12, alignItems: 'flex-start',
          padding: '11px 0',
          borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : 'none',
        }}>
          <span style={{
            color: C.green, fontWeight: 800, fontSize: 14, flexShrink: 0, marginTop: 2,
            fontFamily: "'Akshar', sans-serif",
          }}>✓</span>
          <span style={{
            color: TEXT, fontSize: 14.5, lineHeight: 1.55,
            fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif", fontWeight: 400,
          }}>{item}</span>
        </div>
      ))}
    </div>
  )
}

function Callout({ children, variant = 'info' }) {
  const bg = variant === 'alert' ? `${C.amber}10` : `${C.p}08`
  const border = variant === 'alert' ? `${C.amber}35` : `${C.p}25`
  const color = variant === 'alert' ? C.head : C.p
  return (
    <div style={{
      marginTop: 20, padding: '16px 18px', borderRadius: 12,
      background: bg, border: `1px solid ${border}`,
    }}>
      <div style={{
        fontSize: 14, color, fontWeight: 600, lineHeight: 1.65,
        fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
      }}>{children}</div>
    </div>
  )
}

function SubBlock({ title, children }) {
  return (
    <div style={{
      marginTop: 20, padding: '20px 22px', borderRadius: 12,
      background: C.alt, border: `1px solid ${C.border}`,
    }}>
      <div style={{
        fontSize: 13, fontWeight: 700, color: C.head, marginBottom: 10,
        fontFamily: "'Akshar', sans-serif", letterSpacing: '-0.01em',
      }}>{title}</div>
      {children}
    </div>
  )
}

function SectionCard({ id, num, title, icon, children }) {
  return (
    <article id={id} style={{
      scrollMarginTop: 96,
      padding: '32px 30px', borderRadius: 16,
      background: C.surface, border: `1.5px solid ${C.border}`,
      boxShadow: '0 2px 8px rgba(20,49,86,0.04)',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 11, flexShrink: 0,
          background: `${C.p}10`, border: `1.5px solid ${C.p}28`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.p,
        }}>{icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: C.p, textTransform: 'uppercase',
            letterSpacing: '0.08em', marginBottom: 6, fontFamily: "'Akshar', sans-serif",
          }}>Section {num}</div>
          <H size="h2" style={{ margin: 0, fontSize: 'clamp(1.2rem,2vw,1.45rem)' }}>{title}</H>
        </div>
      </div>
      <div>{children}</div>
    </article>
  )
}

function TableOfContents() {
  return (
    <nav aria-label="Privacy policy sections" style={{
      position: 'sticky', top: 88, alignSelf: 'start',
    }}>
      <div style={{
        padding: '22px 20px', borderRadius: 14,
        background: C.surface, border: `1.5px solid ${C.border}`,
      }}>
        <div style={{
          fontSize: 11, fontWeight: 700, color: C.muted, textTransform: 'uppercase',
          letterSpacing: '0.08em', marginBottom: 14, fontFamily: "'Akshar', sans-serif",
        }}>On this page</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} style={{
              display: 'block', padding: '8px 10px', borderRadius: 8,
              textDecoration: 'none', fontSize: 13, lineHeight: 1.4,
              fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
              fontWeight: 400, color: TEXT, background: 'transparent',
              borderLeft: '3px solid transparent', paddingLeft: 10,
              transition: 'background 0.15s, color 0.15s',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = C.alt
                e.currentTarget.style.color = C.head
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = TEXT
              }}
            >
              <span style={{ color: C.muted, fontWeight: 600, marginRight: 6 }}>{s.num}.</span>
              {s.title}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

function PolicySections() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      <SectionCard id="introduction" num="1" title="Introduction" icon={<Shield size={18} />}>
        <Body>
          SkyPond Tech Pvt. Ltd. (&ldquo;SkyPond Tech,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy and ensuring the security of your personal information.
        </Body>
        <Body style={{ marginTop: 14 }}>
          This Privacy Policy describes how we collect, use, store, and disclose information when you visit our website, use our IT consulting or healthcare technology services, or communicate with us through digital channels.
        </Body>
        <Callout>
          Our services are primarily intended for clients in the United States. We follow U.S. data protection principles, including HIPAA compliance where applicable.
        </Callout>
      </SectionCard>

      <SectionCard id="collect" num="2" title="Information We Collect" icon={<Eye size={18} />}>
        <Body>We may collect the following categories of information:</Body>
        <SubBlock title="a. Personal Information">
          <CheckList items={[
            'Full name',
            'Email address',
            'Phone number',
            'Company name and role/title',
            'Business address',
            'Any other details you voluntarily provide through forms or communications',
          ]} />
        </SubBlock>
        <SubBlock title="b. Automatically Collected Data">
          <Body style={{ marginBottom: 0 }}>When you visit our website, we automatically gather:</Body>
          <CheckList items={[
            'IP address, browser type, and device details',
            'Pages visited, time spent, and referring websites',
            'Analytical data via tools such as Google Analytics',
          ]} />
        </SubBlock>
        <SubBlock title="c. Sensitive Health Information (If Applicable)">
          <Body style={{ marginBottom: 0 }}>
            If you are a healthcare client or provide patient-related data as part of our services, all such data is handled in compliance with HIPAA and applicable U.S. data privacy laws.
          </Body>
        </SubBlock>
      </SectionCard>

      <SectionCard id="use" num="3" title="How We Use Your Information" icon={<UserCheck size={18} />}>
        <Body>We use your information for purposes such as:</Body>
        <CheckList items={[
          'Providing and maintaining our IT and analytics services',
          'Improving website performance and user experience',
          'Responding to your inquiries and providing customer support',
          'Sending service updates or marketing materials (only if you opt in)',
          'Meeting contractual, legal, and regulatory obligations',
        ]} />
        <Callout variant="alert">
          We will never sell or rent your personal information.
        </Callout>
      </SectionCard>

      <SectionCard id="legal-basis" num="4" title="Legal Basis for Processing" icon={<Lock size={18} />}>
        <Body>We process your information under one or more of the following legal bases:</Body>
        <CheckList items={[
          'Your consent',
          'Performance of a contract (e.g., providing consulting services)',
          'Legal obligations (e.g., HIPAA compliance)',
          'Legitimate business interests (e.g., service improvement, analytics)',
        ]} />
      </SectionCard>

      <SectionCard id="sharing" num="5" title="Data Sharing and Disclosure" icon={<Share2 size={18} />}>
        <Body>We may share information only with:</Body>
        <CheckList items={[
          'Trusted third-party service providers (e.g., cloud storage, analytics platforms)',
          'Regulatory authorities when required by law or court order',
          'Business partners or contractors under signed confidentiality and data protection agreements',
        ]} />
        <Callout>
          We do not disclose any Protected Health Information (PHI) except as permitted by HIPAA or with explicit authorization.
        </Callout>
      </SectionCard>

      <SectionCard id="retention" num="6" title="Data Retention" icon={<Clock size={18} />}>
        <Body>
          We retain personal data only as long as necessary for the purposes stated above, or as required by law.
        </Body>
        <Body style={{ marginTop: 14 }}>
          Healthcare-related or client data may be retained longer under contractual or regulatory obligations.
        </Body>
      </SectionCard>

      <SectionCard id="security" num="7" title="Data Security" icon={<Server size={18} />}>
        <Body>We implement strong administrative, technical, and physical safeguards to protect your data, including:</Body>
        <CheckList items={[
          'Data encryption during transmission and storage',
          'Restricted access based on user roles',
          'Secure servers located in compliant data centers',
          'Regular security audits and monitoring',
        ]} />
      </SectionCard>

      <SectionCard id="rights" num="8" title="Your Rights" icon={<UserCheck size={18} />}>
        <Body>Depending on your location, you may have the right to:</Body>
        <CheckList items={[
          'Access, correct, or delete your personal data',
          'Request a copy of your data',
          'Withdraw consent for communications',
          'Opt out of analytics or marketing',
        ]} />
        <Body style={{ marginTop: 16 }}>
          If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA).
        </Body>
        <Body style={{ marginTop: 14 }}>
          To exercise your rights, email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: C.p, fontWeight: 600, textDecoration: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline' }}
            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none' }}
          >{CONTACT_EMAIL}</a>.
        </Body>
      </SectionCard>

      <SectionCard id="cookies" num="9" title="Cookies and Tracking" icon={<Cookie size={18} />}>
        <Body>
          We use cookies and similar technologies to enhance user experience and analyze traffic. You can manage or disable cookies in your browser settings. Some site features may not function properly if cookies are disabled.
        </Body>
      </SectionCard>

      <SectionCard id="transfers" num="10" title="International Data Transfers" icon={<Plane size={18} />}>
        <Body>
          As SkyPond Tech Pvt. Ltd. operates globally, your information may be processed outside your country, including in the United States and Nepal. We ensure appropriate security measures and data transfer agreements are in place to protect your information.
        </Body>
      </SectionCard>

      <SectionCard id="children" num="11" title="Children's Privacy" icon={<Baby size={18} />}>
        <Body>
          Our website and services are not directed toward children under 13 years of age. We do not knowingly collect or store personal data from minors. If such data is identified, it will be deleted promptly.
        </Body>
      </SectionCard>

      <SectionCard id="updates" num="12" title="Updates to This Privacy Policy" icon={<RefreshCw size={18} />}>
        <Body>
          We may update this Privacy Policy periodically. The updated version will be posted on this page with a new &ldquo;Effective Date.&rdquo; We encourage you to review this page regularly for any changes.
        </Body>
      </SectionCard>

      <SectionCard id="contact" num="13" title="Contact Us" icon={<Mail size={18} />}>
        <Body>
          If you have any questions or concerns regarding this Privacy Policy or our data protection practices, please contact us:
        </Body>
        <div style={{
          marginTop: 24, padding: '28px 26px', borderRadius: 14,
          background: C.alt, border: `1.5px solid ${C.border}`,
        }}>
          <div style={{
            fontFamily: "'Akshar', sans-serif", fontSize: 18, fontWeight: 700,
            color: C.head, marginBottom: 20,
          }}>SkyPond Tech Pvt. Ltd.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: <MapPin size={17} />, text: 'Lafayette, Colorado, USA' },
              { icon: <MapPin size={17} />, text: 'Omaha, Nebraska, USA' },
              { icon: <MapPin size={17} />, text: 'Kathmandu, Nepal' },
            ].map((loc) => (
              <div key={loc.text} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                color: TEXT, fontSize: 15, fontWeight: 500,
                fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
              }}>
                <span style={{ color: C.p, flexShrink: 0 }}>{loc.icon}</span>
                {loc.text}
              </div>
            ))}
            <a href={`mailto:${CONTACT_EMAIL}`} style={{
              display: 'flex', alignItems: 'center', gap: 12, color: TEXT,
              fontSize: 15, textDecoration: 'none', fontWeight: 500,
              fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = C.p }}
              onMouseLeave={(e) => { e.currentTarget.style.color = TEXT }}
            >
              <Mail size={17} color={C.p} />
              {CONTACT_EMAIL}
            </a>
            <a href="https://skypondtech.com" target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: 12, color: TEXT,
              fontSize: 15, textDecoration: 'none', fontWeight: 500,
              fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.color = C.p }}
              onMouseLeave={(e) => { e.currentTarget.style.color = TEXT }}
            >
              <Globe size={17} color={C.p} />
              www.skypondtech.com
            </a>
          </div>
        </div>
      </SectionCard>
    </div>
  )
}

function PolicyBody() {
  return (
    <section style={{ padding: '56px 5vw 96px', background: C.alt }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Badge c={C.p}>Policy Overview</Badge>
          <H size="h2" style={{ marginTop: 14, marginBottom: 12 }}>Your Data, Our Commitment</H>
          <Body style={{ maxWidth: 560, margin: '0 auto', color: TEXT }}>
            Use the table of contents to jump to any section. All policy language below reflects our current practices as of the effective date.
          </Body>
        </div>

        <div className="privacy-toc-mobile" style={{
          display: 'none', marginBottom: 24, gap: 8, flexWrap: 'wrap',
        }}>
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} style={{
              padding: '8px 14px', borderRadius: 99, fontSize: 12.5, fontWeight: 500,
              textDecoration: 'none', color: C.p, background: C.surface,
              border: `1px solid ${C.border}`,
              fontFamily: "'Akshar', sans-serif",
            }}>{s.num}. {s.title}</a>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 240px) minmax(0, 1fr)',
          gap: 32,
          alignItems: 'start',
        }}>
          <div className="privacy-toc-desktop">
            <TableOfContents />
          </div>
          <PolicySections />
        </div>

        <p style={{
          marginTop: 40, textAlign: 'center', fontSize: 13, color: C.muted, lineHeight: 1.6,
          fontFamily: "'Gotham', 'Helvetica Neue', Arial, sans-serif",
        }}>
          
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .privacy-toc-desktop { display: none; }
          .privacy-toc-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  )
}

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SummaryStrip />
        <PolicyBody />
      </main>
      <Footer />
    </>
  )
}
