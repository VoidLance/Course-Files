import './App.css';
import React from 'react';
import ProfileCard from './ProfileCard';
import './index.css';

const App = () => {
  const profiles = [
    {
      image: "https://picsum.photos/200/300",
      name: "Alistair Sweeting",
      title: "Full Stack Developer",
      bio: "Passionate about creating user-friendly web applications.",
      skills: ["JavaScript", "React", "Node.js"],
    },
    {
      image: "https://picsum.photos/201/301",
      name: "Rose Mikaelson",
      title: "UI/UX Designer",
      bio: "Loves designing intuitive user interfaces.",
      skills: ["Figma", "Adobe XD", "Sketch"],
    },
    {
      image: "https://picsum.photos/202/302",
      name: "Derek Hale",
      title: "Backend Developer",
      bio: "Enjoys building robust server-side applications.",
      skills: ["Python", "Django", "REST APIs"],
    }
  ];

  return (
    <div className="app">
      <h1>Team Profiles</h1>
      {profiles.map((profile, index) => (
        <ProfileCard
          key={index}
          name={profile.name}
          title={profile.title}
          imageUrl={profile.image}
          bio={profile.bio}
          skills={profile.skills}
        />
      ))}
    </div>
  );
};

export default App;
