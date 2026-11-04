import { useEffect, useState } from 'react'
import { DEMO_URL } from './config'

const nav = ['Problem', 'Solution', 'How it works', 'Roles', 'Team']

function DemoLink({ className = '' }) {
  return <a className={`button ${className}`} href={DEMO_URL} target="_blank" rel="noopener noreferrer">Try the Demo<span aria-hidden="true">↗</span></a>
}

function Pin({ className = '' }) {
  return <svg className={className} viewBox="0 0 56 72" aria-hidden="true"><path d="M28 2C14.2 2 3 13.2 3 27c0 18.8 25 43 25 43s25-24.2 25-43C53 13.2 41.8 2 28 2Z" fill="currentColor"/><circle cx="28" cy="27" r="10" fill="white"/></svg>
}

function MapFragment() {
  return <div className="map-fragment" data-ui aria-label="Live operations map preview">
    <div className="map-lines"><i/><i/><i/><i/><i/></div>
    <div className="map-label station">PNP Station</div>
    <div className="map-label incident">Report received</div>
    <Pin className="map-pin station-pin"/><Pin className="map-pin incident-pin"/>
    <div className="map-status"><span>Active incident</span><strong>Resident report</strong></div>
  </div>
}

function PhoneDemo() {
  const [loaded, setLoaded] = useState(false)
  return <div className="phone-demo">
    <div className="phone-shell" aria-busy={!loaded}>
      <div className="phone-speaker" />
      {!loaded && <div className="phone-loading">Loading resident demo…</div>}
      <iframe src={DEMO_URL} title="COMPaSS resident demo" allow="geolocation; camera" loading="lazy" onLoad={() => setLoaded(true)} />
      <span className="side-button side-button-one"/><span className="side-button side-button-two"/><span className="side-button side-button-three"/>
    </div>
    <a className="full-screen" href={DEMO_URL} target="_blank" rel="noopener noreferrer">Open full screen <span aria-hidden="true">↗</span></a>
    <p className="demo-note">Resident experience only. Sample data.</p>
  </div>
}

function App() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const closeOnEscape = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])
  const closeMenu = () => setOpen(false)

  return <>
    <header className="nav-wrap">
      <a className="wordmark" href="#top" aria-label="COMPaSS home"><Pin/> <span>COMPaSS</span></a>
      <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Main navigation" onClick={(e) => e.target === e.currentTarget && closeMenu()}>
        {nav.map(item => <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} onClick={closeMenu}>{item}</a>)}
      </nav>
      <DemoLink className="nav-demo" />
      <button className="menu-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}><span/><span/></button>
    </header>

    <main id="top">
      <section className="hero section">
        <div className="hero-copy reveal">
          <p className="project-line">LUMENEERS · USTP Oroquieta</p>
          <h1>Clearer response, closer to home.</h1>
          <p>COMPaSS gives Oroquieta City’s PNP station one map for resident reports, patrol assignments, and field status.</p>
          <DemoLink />
          <p className="small-note">The demo shows the resident experience only.</p>
        </div>
        <div className="hero-stage reveal"><MapFragment/></div>
      </section>

      <section className="problem section" id="problem">
        <div><h2>When a report has no clear path, response slows down.</h2></div>
        <div className="problem-copy"><p>Reports now arrive by radio, calls, and walk-ins, then are recorded by hand. Officers are followed through Zoom, Zello, and personal phones—tools that become unreliable with weak signal.</p><p>Residents are left without a clear way to see what happened after they asked for help.</p></div>
      </section>

      <section className="solution section" id="solution">
        <div className="solution-heading"><h2>One shared operational picture.</h2><p>The Tactical Operations Center stays in control of dispatch, using COMPaSS to see reports, active officers, and risk areas in one live view.</p></div>
        <div className="operations-map" data-ui>
          <MapFragment/>
          <aside><span>TOC view</span><strong>Dispatch stays human</strong><p>TOC assigns incidents to patrol points. Radio remains a backup.</p></aside>
        </div>
      </section>

      <section className="live-demo section" id="live-demo">
        <div className="demo-copy"><h2>See reporting from a resident’s view.</h2><p>Open the mobile experience for a sample incident report, GPS location sharing, and status follow-up.</p><DemoLink/></div>
        <PhoneDemo/>
      </section>

      <section className="how section" id="how-it-works">
        <h2>How it works</h2>
        <ol>
          <li><span>Report</span><p>A resident sends an incident report through the mobile app with an automatic GPS location.</p></li>
          <li><span>TOC assigns</span><p>The TOC reviews the report on the live map and assigns it to a patrol point.</p></li>
          <li><span>Officer responds</span><p>The assigned officer receives the task, travels to the location, and updates their status.</p></li>
          <li><span>Resident follows</span><p>The resident can follow the report’s status from submission through response.</p></li>
        </ol>
      </section>

      <section className="features" id="features">
        <h2 className="sr-only">COMPaSS features</h2>
        {['GPS-backed reports, placed on the map.', 'TOC-controlled patrol assignments.', 'Officer status from the field.', 'Last known location when signal drops.', 'Resident report status follow-up.'].map((item, i) => <article key={item} className={i % 2 ? 'feature dark' : 'feature'}><Pin/><h3>{item}</h3><p>{i === 3 ? 'When a device loses signal, the map keeps its last known position and marks it out of date.' : i === 1 ? 'Nothing is assigned automatically. The TOC directs the response.' : 'Built around the information needed for a coordinated response.'}</p></article>)}
      </section>

      <section className="roles section" id="roles"><h2>Built for the people in the loop.</h2><div className="role-list"><article><h3>TOC</h3><p>Views the operational map, assesses reports, and directs patrol assignments.</p></article><article><h3>Officer</h3><p>Receives assignments on a phone and updates field status as the response unfolds.</p></article><article><h3>Resident</h3><p>Reports an incident with location and follows the progress of that report.</p></article></div></section>

      <section className="team section" id="team"><div><h2>Designed as a capstone for Oroquieta City.</h2><p>COMPaSS is a capstone project by LUMENEERS, Department of Information Technology, USTP Oroquieta.</p></div><Pin className="team-pin"/></section>

      <a className="final-cta" href={DEMO_URL} target="_blank" rel="noopener noreferrer"><span>Try the Demo</span><small>Resident experience only · Sample data</small><b aria-hidden="true">↗</b></a>
    </main>
    <footer><div className="footer-mark">COMPaSS</div><p>LUMENEERS · USTP Oroquieta · Department of Information Technology</p><p>Crime Operations Mapping and Patrol Support System</p></footer>
  </>
}

export default App
