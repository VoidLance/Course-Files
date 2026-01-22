import React from 'react';

const ProfileCard = ({ name, title, imageUrl, bio, skills }) => {
  return (
    <div className="profile-card gallery">
      <img src={imageUrl} alt={`${name}'s profile`} className="profile-image" />
      <h2 className="profile-name">{name}</h2>
      <p className="profile-title">{title}</p>
      <h2 className="bio-heading">Bio</h2>
      <p className="profile-bio">This is a short bio about {name}. {bio}</p>
      <div className="skills-section">
        <h3 className="skills-heading">Skills</h3>
        <ul className="skills-list">
          {skills && skills.length > 0 ? (
            skills.map((skill, index) => (
              <li key={index} className="skill-item">{skill}</li>
            ))
          ) : (
            <li className="skill-item">No skills listed.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfileCard;
