import React, { useState } from 'react';
import Card from './components/Card';

const App = () => {
  const [cardData, setCardData] = useState([
    {
      title: "React Development",
      description: "Learn how to build web applications with React and Tailwind CSS.",
      buttonText: "Learn More",
      imageUrl: "https://fastly.picsum.photos/id/19/2500/1667.jpg?hmac=7epGozH4QjToGaBf_xb2HbFTXoV5o8n_cYzB7I4lt6g"
    },
    {
      title: "Tailwind CSS Mastery",
      description: "Master the art of rapid UI development with Tailwind CSS.",
      buttonText: "Explore",
      imageUrl: "https://picsum.photos/200/300"
    }
  ]);

  const [themeName, setThemeName] = useState("");
  const [newCard, setNewCard] = useState({
    title: "",
    description: "",
    buttonText: "",
    imageUrl: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prevCard) => ({
      ...prevCard,
      [name]: value
    }));
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    setCardData((prevCards) => [...prevCards, newCard]);
    setNewCard({ title: "", description: "", buttonText: "", imageUrl: "" }); // Reset form
  };

  return (
    <div className={`${themeName} mx-auto p-4`}>
      <button
        onClick={() => {
          if (themeName !== "dark") {
            setThemeName("dark");
          } else {
            setThemeName("");
          }
        }}
        className="bg-sky-500 hover:bg-sky-700"
      >
        Toggle Dark Mode
      </button>
      <br />
      <br />
      <form onSubmit={handleAddCard} className="mb-8">
        <input
          type="text"
          name="title"
          value={newCard.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="border p-2 m-2"
        />
        <input
          type="text"
          name="description"
          value={newCard.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="border p-2 m-2"
        />
        <input
          type="text"
          name="buttonText"
          value={newCard.buttonText}
          onChange={handleInputChange}
          placeholder="Button Text"
          className="border p-2 m-2"
        />
        <input
          type="text"
          name="imageUrl"
          value={newCard.imageUrl}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="border p-2 m-2"
        />
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white p-2">
          Add Card
        </button>
      </form>
      <h1 className="text-3xl font-bold text-center mb-8">My Card Application</h1>
      <div className="flex flex-wrap justify-center">
        {cardData.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default App;

