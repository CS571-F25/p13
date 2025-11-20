import React, { useState } from 'react'
import SiteNavbar from '../components/SiteNavbar'
import SearchBar from '../components/SearchBar'

export default function Home() {
  const [theme, setTheme] = useState('cozy coffee shop aesthetic')

  const handleSearch = () => {
    window.location.href = `#/demo?theme=${encodeURIComponent(theme)}`
  }

  return (
    <div>
      <SiteNavbar />
      <header className="bg-light py-5">
        <div className="container">
          <h1 className="display-4">Boardify</h1>
          <p className="lead">Create beautiful, shareable mood boards instantly using natural language prompts and curated images.</p>
          <p>Enter a theme, reorder images with drag-and-drop, apply simple AI prompts to refine results, and export a snapshot.</p>

          <SearchBar
            value={theme}
            onChange={setTheme}
            onSearch={handleSearch}
          />

        </div>
      </header>
    </div>
  )
}