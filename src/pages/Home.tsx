import { Hero } from '@components/Hero'
import { Section } from '@components/Section'
import { PortfolioCard } from '@components/PortfolioCard'
import { portfolio } from '@data/portfolio'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <>
      <Hero />
      <Section title="Featured Projects" subtitle="A selection from our portfolio">
        <div className="card-grid">
          {portfolio.slice(0,3).map(p => (
            <PortfolioCard key={p.id} item={p} />
          ))}
        </div>
        <div style={{ marginTop: 16 }}>
          <Link className="btn" to="/portfolio">See all projects</Link>
        </div>
      </Section>
      <Section title="Our Services" subtitle="End-to-end design tailored to you">
        <div className="card-grid">
          <div className="card"><div className="body"><span className="badge">Discovery</span><h3>Consultation</h3><p>We start with your story and vision to define goals and scope.</p></div></div>
          <div className="card"><div className="body"><span className="badge">Design</span><h3>Concept & Planning</h3><p>Layouts, moodboards, and material selections aligned to budget.</p></div></div>
          <div className="card"><div className="body"><span className="badge">Delivery</span><h3>Execution</h3><p>Procurement, vendor coordination, and on-site styling to perfection.</p></div></div>
        </div>
      </Section>
    </>
  )
}
