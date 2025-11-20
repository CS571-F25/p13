import React from 'react'
import SiteNavbar from '../components/SiteNavbar'
import { useState } from 'react'

export default function Contact(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thanks for contacting Boardify — this is a demo form.')
    setName(''); setEmail(''); setMessage('')
  }

  return (
    <div>
      <SiteNavbar />
      <div className="container py-4">
        <h2>Contact Us</h2>
        <p>If you have questions or want to collaborate, send a message below.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input className="form-control" value={name} onChange={e=>setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input className="form-control" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea className="form-control" rows={6} value={message} onChange={e=>setMessage(e.target.value)} />
          </div>
          <button className="btn btn-primary" type="submit">Send</button>
        </form>
      </div>
    </div>
  )
}
