import React from "react";

function Hero({ from, setFrom, to, setTo, selectedType, setSelectedType, handleSearch }) {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Happy travels!</h1>
        
        <div className="search-box">
          <input
            type="text"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />

          <input
            type="text"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">All Modes</option>
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
          </select>

          <button onClick={handleSearch} className="search-main-btn">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;