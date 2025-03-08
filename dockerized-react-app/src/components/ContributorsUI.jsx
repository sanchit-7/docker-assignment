import React from "react";
import "./Contributors.css";

function ContributorsUI({ contributors }) {
  // Random pastel colors generator
  const getRandomPastelColor = () => {
    const pastelColors = [
      "#FFB3B3",
      "#FFCC99",
      "#FFFF91",
      "#99FF99",
      "#99CCFF",
      "#FF99FF",
      "#FFCCFF",
      "#C2B4FF",
    ];
    const randomIndex = Math.floor(Math.random() * pastelColors.length);
    return pastelColors[randomIndex];
  };

  // Function to get the initials from the name
  const getInitials = (name) => {
    const nameParts = name.split(" ");
    const initials = nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
    return initials;
  };

  return (
    <div className="contributors-container">
      <div className="contributors-box">
        <h2 className="contributors-heading">Contributors</h2> {/* Heading */}
        <div className="contributors-list">
          {contributors.length > 0 ? (
            contributors.map((contributor, index) => (
              <div
                className="contributor-card"
                key={index}
                style={{ backgroundColor: getRandomPastelColor() }}
              >
                <div className="avatar">{getInitials(contributor.name)}</div>
                <div className="name">{contributor.name}</div>
                <div
                  className="chip"
                  style={{ backgroundColor: getRandomPastelColor() }}
                >
                  Contributor
                </div>
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContributorsUI;
