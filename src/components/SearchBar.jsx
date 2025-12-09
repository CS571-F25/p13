import React from "react";

export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="row mt-4 align-items-center g-2 search-bar">
      <div className="col-12 col-md-9 col-lg-9">
        <input
          className="form-control"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter a theme"
          aria-label="Theme to search"
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          type="text"
        />
      </div>

      <div className="col-12 col-md-3 col-lg-3">
        <button className="btn btn-primary w-100" onClick={onSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
