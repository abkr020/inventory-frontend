import { useState } from "react";
import "./Flow.css";
import "./Popup.css";

export default function Reactflow() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div>
      <button onClick={() => setShowPopup(true)}>Open Popup</button>

      {showPopup && (
        <div onClick={(e) => setShowPopup(false)} className="popup-overlay">
          <div onClick={(e) => e.stopPropagation()} className="popup">
            <div className="topbar">
              <div>Top Bar</div>
              <button
                className="close-btn"
                style={{ marginLeft: "auto" }}
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>

            <div className="content">
              <div className="sidebar">Sidebar</div>

              <div className="main">Main Container</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
