import React from 'react'
import SiteNavbar from '../components/SiteNavbar'
import { useState } from 'react'
import { useI18n } from '../i18n.jsx'

export default function Contact(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const { t } = useI18n()

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(t.contact.alert)
    setName(''); setEmail(''); setMessage('')
  }

  return (
    <div className="contact-page">
      <SiteNavbar />
      <div className="page-shell section contact-section">
        <div className="contact-hero">
          <div className="contact-hero-text">
            <h1 className="display-6 fw-bold mb-2">{t.contact.title}</h1>
            <p className="text-muted mb-3 contact-hero-subtitle">{t.contact.subtitle}</p>
            <div className="contact-meta">
              <div className="meta-chip">
                <span className="dot dot-primary" />
                <div>
                  <div className="meta-label">Email</div>
                  <div className="meta-value">support@boardify.app</div>
                </div>
              </div>
              <div className="meta-chip">
                <span className="dot dot-accent" />
                <div>
                  <div className="meta-label">Call</div>
                  <div className="meta-value">+82 10-0000-0000</div>
                </div>
              </div>
              <div className="meta-chip">
                <span className="dot dot-muted" />
                <div>
                  <div className="meta-label">Response</div>
                  <div className="meta-value">Under 24 hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-grid">
          <div className="contact-card contact-form-card">
            <div className="contact-form-header">
              <div>
                <h2 className="h4 mb-1">Tell us about your project</h2>
                <p className="text-muted mb-0">Share the audience, style, and timing so we can guide you faster.</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="input-stack">
                <label className="form-label">{t.contact.name}</label>
                <input className="form-control" value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required />
              </div>
              <div className="input-stack">
                <label className="form-label">{t.contact.email}</label>
                <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required />
              </div>
              <div className="input-stack">
                <label className="form-label">{t.contact.message}</label>
                <textarea className="form-control" rows={6} value={message} onChange={e=>setMessage(e.target.value)} placeholder="Tell us about your project and needs" required />
              </div>
              <button className="btn btn-primary w-100" type="submit">{t.contact.send}</button>
              <p className="text-muted small mt-2 mb-0">We reply with next steps and example boards.</p>
            </form>
          </div>
          <div className="contact-side">
            <div className="contact-side-card card-ghost">
              <h2 className="h5 mb-1">What helps us move fast</h2>
              <p className="text-muted small mb-3">Drop a few notes so we can jump straight into design options.</p>
              <ul className="contact-tips">
                <li><span className="dot dot-primary" />Goal for your board or campaign.</li>
                <li><span className="dot dot-accent" />References, palette, or keywords.</li>
                <li><span className="dot dot-muted" />Deadline and export needs.</li>
              </ul>
              <div className="contact-side-pills">
                <span className="pill">support@boardify.app</span>
                <span className="pill">+82 10-0000-0000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
