import React from "react";
import { Bus, TrainFront, UserCircle2, HelpCircle, List } from "lucide-react";

function Navbar({ toggleTheme, theme }) {
  return (
    <div className="navbar">
      {/* LEFT SECTION */}
      <div className="nav-left">
        <div className="logo">
          <Bus size={22} />
          <span>TransitX</span>
        </div>

        <div className="nav-tabs">
          <div className="tab active">
            <Bus size={18} />
            <span>Bus</span>
          </div>

          <div className="tab">
            <TrainFront size={18} />
            <span>Train</span>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="nav-right">
        <div className="nav-item">
          <List size={18} />
          <span>Routes</span>
        </div>

        <div className="nav-item">
          <HelpCircle size={18} />
          <span>Help</span>
        </div>

        <div className="nav-item">
          <UserCircle2 size={20} />
          <span>Account</span>
        </div>
      </div>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === "dark" ? "☀ Light" : "🌙 Dark"}
      </button>
    </div>
  );
}

export default Navbar;