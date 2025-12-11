import React, { useState } from 'react'
import SiteNavbar from '../components/SiteNavbar'
import SearchBar from '../components/SearchBar'
import { useI18n } from '../i18n.jsx'

export default function Home() {
  const [theme, setTheme] = useState('cozy coffee shop aesthetic')
  const { t } = useI18n()

  const handleSearch = () => {
    window.location.href = `#/demo?theme=${encodeURIComponent(theme)}`
  }

  return (
    <div>
      <SiteNavbar />
      <header className="hero">
        <div className="page-shell hero-inner">
          <div className="callout mb-3">{t.brandCallout}</div>
          <h1 className="display-5 mb-3">{t.heroTitle}</h1>

          <div className="helper-panel text-start">
            <h2 className="h5 mb-2">{t.quickGuide}</h2>
            <ul className="helper-steps">
              <li>{t.step1}</li>
              <li>{t.step2}</li>
              <li>{t.step3}</li>
              <li>{t.step4}</li>
            </ul>
          </div>

          <SearchBar
            value={theme}
            onChange={setTheme}
            onSearch={handleSearch}
          />

          <div className="section">
            <h2 className="h5 mb-3">Features</h2>
            <div className="feature-grid">
              <div className="feature-card">
                <h3 className="h5">{t.features.smart.title}</h3>
                <p className="mb-0 text-muted">{t.features.smart.desc}</p>
              </div>
              <div className="feature-card">
                <h3 className="h5">{t.features.layout.title}</h3>
                <p className="mb-0 text-muted">{t.features.layout.desc}</p>
              </div>
              <div className="feature-card">
                <h3 className="h5">{t.features.export.title}</h3>
                <p className="mb-0 text-muted">{t.features.export.desc}</p>
              </div>
              <div className="feature-card">
                <h3 className="h5">{t.features.demo.title}</h3>
                <p className="mb-0 text-muted">{t.features.demo.desc}</p>
              </div>
            </div>
          </div>

        </div>
      </header>
    </div>
  )
}
