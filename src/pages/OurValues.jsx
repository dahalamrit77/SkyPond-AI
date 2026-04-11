import { useState } from 'react'
import C from '../tokens.js'
import { Navbar } from '../components/Navbar.jsx'
import { Footer } from '../components/Footer.jsx'
import { Link } from 'react-router-dom'
import { TrendingUp, Users, Lightbulb, Star, Target, Link as LinkIcon } from 'lucide-react'

function Hero() {
  return (
    <section
      style={{
        width: '100%',
        background: `linear-gradient(160deg,${C.dark} 0%, #0D2040 100%)`,
        padding: '120px 5vw 80px',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ animation: 'fadeUp 0.6s ease both', marginBottom: 14 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 12px',
              borderRadius: 99,
              background: `${C.p2}18`,
              color: C.p2,
              border: `1px solid ${C.p2}30`,
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            🤝 Our Values
          </span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            fontFamily: "'DM Sans',system-ui,sans-serif",
            marginBottom: 18,
            animation: 'fadeUp 0.7s 0.1s ease both',
          }}
        >
          Built on Principles That Drive Everything We Do
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
            color: 'rgba(255,255,255,0.72)',
            maxWidth: 580,
            margin: '0 auto',
            lineHeight: 1.7,
            animation: 'fadeUp 0.7s 0.2s ease both',
          }}
        >
          We are more than a technology company. Our values define how we work, who we work with, and the impact we aim to create.
        </p>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section style={{ width: '100%', background: C.bg, padding: '80px 5vw' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 64,
            alignItems: 'start',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: C.p2,
                marginBottom: 8,
              }}
            >
       
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                fontWeight: 800,
                color: C.head,
                marginBottom: 24,
                letterSpacing: '-0.02em',
                fontFamily: "'DM Sans',system-ui,sans-serif",
              }}
            >
              About Us
            </h2>
            <div style={{ width: 48, height: 4, background: C.p2, borderRadius: 2, marginBottom: 28 }} />

            {[
              `At SkyPond Tech, we are dedicated to empowering organizations with innovative technology solutions that fuel growth, enhance efficiency, and unlock actionable insights.`,
              `Our expertise spans across Microsoft Cloud services — including Azure and Power Platform — as well as Data Analytics and Long-Term Care solutions, allowing us to deliver tailored strategies that streamline operations and support smarter decision-making.`,
              `What sets us apart is our commitment to building long-term partnerships. We work hand in hand with our clients to truly understand their unique challenges and goals, ensuring that every solution we provide is not only technically sound but also aligned with their vision for success.`,
            ].map((t, i) => (
              <p
                key={i}
                style={{
                  fontSize: 'clamp(0.93rem, 1.3vw, 1rem)',
                  color: C.body,
                  lineHeight: 1.78,
                  marginBottom: i === 2 ? 0 : 16,
                }}
              >
                {t}
              </p>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              {
                icon: '◎',
                iconStyle: { color: C.p2, fontSize: 18 },
                title: 'Vision',
                body:
                  'To be a beacon of innovation, transforming the way organizations operate by harnessing the power of technology. We envision a future where our solutions not only make businesses more efficient and successful but also inspire positive change and growth in the communities we serve.',
              },
              {
                icon: <TrendingUp size={16} color={C.p2} />,
                title: 'Future Growth',
                body:
                  "We aim to expand our technological capabilities by integrating artificial intelligence and machine learning into our solutions, enhancing our clients' ability to make data-driven decisions. Additionally, we plan to broaden our market reach by forming strategic partnerships and entering new industries, ensuring we remain at the forefront of innovation and continue to deliver exceptional value.",
              },
            ].map((c) => (
              <div
                key={c.title}
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 16,
                  padding: '28px 28px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: `${C.p2}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {c.iconStyle ? <span style={c.iconStyle}>{c.icon}</span> : c.icon}
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: C.head, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
                    {c.title}
                  </div>
                </div>
                <div style={{ fontSize: '0.92rem', color: C.body, lineHeight: 1.72 }}>{c.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function IdentityCards() {
  const [hovered, setHovered] = useState(null)
  const cards = [
    {
      title: 'Who We Are',
      body:
        "We are a privately owned and operated IT-managed service provider. We help clients create long-term value for all stakeholders across the nation. With over 15 years of combined long-term care pharmacy experience, 20 plus years of Azure Cloud and Microsoft 365 suite experience, and 15 plus years of data analytics experience, we are uniquely positioned to help our clients stay ahead in today's fast-changing world.",
    },
    {
      title: 'Our Mission',
      body:
        'At SkyPond Tech, our mission is to empower organizations with innovative technology solutions that drive growth, efficiency, and insight. We specialize in delivering tailored services in Long-Term Care Pharmacy, Microsoft Power Platform, and Data Analytics to enhance decision-making, streamline operations, and create value for our clients. Our commitment is to provide exceptional support, cutting-edge tools, and a partnership that prioritizes your success.',
    },
    {
      title: 'What We Do',
      body:
        "We offer a comprehensive range of technology consulting services designed to address the specific needs and challenges of business, primarily in the long-term and financial industries. From IT strategy to planning to implementation and support, we provide end-to-end solutions that enable our clients to stay ahead of the curve and succeed in today's fast-paced digital world.",
    },
  ]

  return (
    <section
      style={{
        width: '100%',
        background: `linear-gradient(180deg,${C.dark} 0%, ${C.pd} 100%)`,
        padding: '80px 5vw',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: C.p2,
            textAlign: 'center',
          }}
        >
        
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 28,
            marginTop: 48,
          }}
        >
          {cards.map((c, i) => (
            <div
              key={c.title}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: `1px solid ${hovered === i ? `${C.p2}70` : 'rgba(255,255,255,0.14)'}`,
                borderTop: `3px solid ${C.p2}`,
                borderRadius: 20,
                padding: '36px 28px',
                boxShadow: hovered === i ? `0 18px 50px ${C.p2}1A` : `0 10px 28px rgba(0,0,0,0.18)`,
                transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.2s',
                backdropFilter: 'blur(10px)',
                textAlign: 'center',
              }}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: 14, fontFamily: "'DM Sans',system-ui,sans-serif", letterSpacing: '-0.01em' }}>
                {c.title}
              </h3>
              <div style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.80)', lineHeight: 1.78, textAlign: 'left' }}>
                {c.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ValuesGrid() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const values = [
    { name: 'Innovation', desc: 'We embrace new ideas and technologies to provide the best solutions for our clients.', icon: <Lightbulb size={20} color={C.p2} />, bg: `${C.p2}18` },
    { name: 'Integrity', desc: 'We believe in being honest and transparent in all our interactions.', icon: <Users size={20} color={C.accent} />, bg: `${C.accent}18` },
    { name: 'Excellence', desc: 'We strive to do our best in everything we do, from our services to our support.', icon: <Star size={20} color={C.violet} />, bg: `${C.violet}30` },
    { name: 'Human Centered Tech', desc: 'Every solution we create is built to empower users, simplify experiences, and enhance human potential.', icon: <Users size={20} color={C.green} />, bg: `${C.green}18` },
    { name: 'Customer Focus', desc: "We listen to our clients' needs and work hard to exceed their expectations.", icon: <Target size={20} color={C.amber} />, bg: `${C.amber}18` },
    { name: 'Collaboration', desc: 'We value teamwork and believe that working together leads to the best results.', icon: <LinkIcon size={20} color={C.red} />, bg: `${C.red}18` },
  ]

  return (
    <section style={{ width: '100%', background: C.alt, padding: '80px 5vw' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', color: C.accent, textAlign: 'center' }}>
          OUR VALUES
        </div>
        <h2
          style={{
            textAlign: 'center',
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
            fontWeight: 800,
            color: C.head,
            marginBottom: 12,
            letterSpacing: '-0.02em',
            fontFamily: "'DM Sans',system-ui,sans-serif",
          }}
        >
          The Principles Behind Everything We Do
        </h2>
        <div style={{ fontSize: '1rem', color: C.muted, textAlign: 'center', maxWidth: 520, margin: '0 auto 56px', lineHeight: 1.7 }}>
          These six values are not slogans. They are the decisions we make every day.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
          {values.map((v, i) => {
            const hovered = hoveredIndex === i
            return (
              <div
                key={v.name}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  background: C.surface,
                  border: `1px solid ${hovered ? C.p2 : C.border}`,
                  borderRadius: 16,
                  padding: '28px 24px',
                  boxShadow: hovered ? '0 8px 32px rgba(28,48,83,0.13)' : 'none',
                  transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
                  transition: 'all 0.2s',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    marginBottom: 16,
                    background: v.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {v.icon}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: C.head, marginBottom: 8, fontFamily: "'DM Sans',system-ui,sans-serif" }}>
                  {v.name}
                </h3>
                <div style={{ fontSize: '0.92rem', color: C.body, lineHeight: 1.7 }}>{v.desc}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section style={{ width: '100%', background: C.dark, padding: '72px 5vw' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
        <h2
          style={{
            fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
            fontWeight: 800,
            color: '#fff',
            marginBottom: 16,
            letterSpacing: '-0.02em',
            fontFamily: "'DM Sans',system-ui,sans-serif",
          }}
        >
          Ready to Work With a Team That Lives These Values?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.68)', marginBottom: 32, lineHeight: 1.7, fontSize: '1rem' }}>
          Every engagement starts with a conversation. Let&apos;s talk about your goals.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/schedule-demo"
            style={{
              background: C.p2,
              color: C.p,
              fontWeight: 700,
              padding: '13px 28px',
              borderRadius: 10,
              textDecoration: 'none',
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none'
            }}
          >
            Schedule a Free Call →
          </Link>
          <Link
            to="/services"
            style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(255,255,255,0.3)',
              fontWeight: 700,
              padding: '13px 28px',
              borderRadius: 10,
              textDecoration: 'none',
              fontSize: '0.95rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
            }}
          >
            View Our Services →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function OurValues() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <IdentityCards />
        <ValuesGrid />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
