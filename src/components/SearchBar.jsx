import React from "react";

export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="row mt-4 align-items-center">
      <div className="col-10 col-md-10">
        <input
          className="form-control"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter a theme…"
        />
      </div>

      <div className="col-2 col-md-2">
        <button className="btn btn-primary w-100" onClick={onSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
