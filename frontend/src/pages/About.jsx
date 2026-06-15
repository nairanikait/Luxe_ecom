import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const NAV_H = 56

const About = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <Navbar />
      <main style={{ paddingTop: `${NAV_H}px` }}>
        
        {/* Hero */}
        <section style={{ position: 'relative', height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=1600&q=90&fit=crop')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.6) grayscale(100%)' }}></div>
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>ESTABLISHED 2016</p>
            <h1 style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Quiet Luxury,<br/>Refined for Everyone.</h1>
          </div>
        </section>

        {/* Story */}
        <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '100px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '12px' }}>OUR STORY</p>
            <h2 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '24px' }}>The Beauty of Less.</h2>
            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.8, marginBottom: '16px' }}>LUXE was born out of a desire to silence the noise. In a world of fast-paced trends and excess, we sought to create a sanctuary of essentialism. Every piece in our collection is a testament to the belief that luxury isn't about having more; it's about having better.</p>
            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.8 }}>We curate with a disciplined eye, focusing on superior materials, ethical craftsmanship, and silhouettes that transcend seasons. Our goal is to provide a wardrobe that serves as a canvas for your life, not a distraction from it.</p>
          </div>
          <div style={{ width: '100%', aspectRatio: '1/1', background: '#f3f4f6' }}>
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} alt="Texture" />
          </div>
        </section>

        {/* Ethos */}
        <section style={{ background: '#f9fafb', padding: '100px 32px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '12px' }}>OUR ETHOS</p>
              <h2 style={{ fontSize: '28px', fontWeight: 700, letterSpacing: '-0.01em' }}>Three Pillars of Integrity</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px' }}>
              {[
                { icon: '📐', title: 'Architectural Design', desc: 'We view clothing as structure. Our design process mimics architectural practices, ensuring every seam has a purpose and every fold enhances the form.' },
                { icon: '♺', title: 'Radical Sustainability', desc: 'Transparency is our foundation. From traceable supply chains to zero-plastic packaging, we respect the environment as much as our aesthetics.' },
                { icon: '⏳', title: 'Generational Quality', desc: 'We don\'t design for the next six months; we design for the next sixty years. Our pieces are crafted to age beautifully and endure a lifetime of wear.' },
              ].map(p => (
                <div key={p.title} style={{ background: '#fff', padding: '40px 32px', border: '1px solid #e5e7eb' }}>
                  <div style={{ fontSize: '20px', marginBottom: '24px' }}>{p.icon}</div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>{p.title}</h3>
                  <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conscious */}
        <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '100px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div style={{ width: '100%', aspectRatio: '4/5', background: '#f3f4f6' }}>
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} alt="Crafting" />
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '32px' }}>Conscious by Choice.</h2>
            
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '8px' }}>MATERIALS</p>
              <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.6 }}>We exclusively use GOTS-certified organic cotton, RWS wool, and recycled tech-fabrics that minimize carbon footprint.</p>
            </div>
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '8px' }}>PEOPLE</p>
              <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.6 }}>Our manufacturing partners are audited monthly to ensure living wages, safe conditions, and complete employee well-being.</p>
            </div>
            <div style={{ marginBottom: '40px' }}>
              <p style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '8px' }}>PROMISE</p>
              <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.6 }}>For every item purchased, we contribute 1% of revenue to environmental restoration projects globally.</p>
            </div>

            <button style={{ background: '#000', color: '#fff', padding: '12px 24px', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Read Our Impact Report</button>
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#1c1c1c', padding: '80px 32px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, letterSpacing: '-0.01em', marginBottom: '16px' }}>Join the Movement of Essentialism.</h2>
          <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '32px' }}>Sign up for exclusive early access to our seasonal collections and sustainability insights.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', maxWidth: '400px', margin: '0 auto' }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, padding: '14px 16px', fontSize: '13px', background: '#262626', border: '1px solid #404040', color: '#fff', outline: 'none', fontFamily: 'inherit' }} />
            <button style={{ background: '#fff', color: '#000', padding: '0 24px', fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Subscribe</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default About
