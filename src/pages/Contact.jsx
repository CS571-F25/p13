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
    <div>
      <SiteNavbar />
      <div className="page-shell section">
        <div className="contact-card">
          <h2 className="mb-2">{t.contact.title}</h2>
          <p className="text-muted mb-4">{t.contact.subtitle}</p>
          <div className="d-flex gap-3 flex-wrap mb-3">
            <span className="pill">support@boardify.app</span>
            <span className="pill">+82 10-0000-0000</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">{t.contact.name}</label>
              <input className="form-control" value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required />
            </div>
            <div className="mb-3">
              <label className="form-label">{t.contact.email}</label>
              <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div className="mb-3">
              <label className="form-label">{t.contact.message}</label>
              <textarea className="form-control" rows={6} value={message} onChange={e=>setMessage(e.target.value)} placeholder="Tell us about your project and needs" required />
            </div>
            <button className="btn btn-primary w-100" type="submit">{t.contact.send}</button>
          </form>
        </div>
      </div>
    </div>
  )
}
