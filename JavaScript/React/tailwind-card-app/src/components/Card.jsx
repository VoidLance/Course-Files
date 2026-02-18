import React from 'react';

const Card = ({ title, description, buttonText, imageUrl }) => {
  return (
    <div className="bg-white dark:bg-slate-700 hover:shadow-lg hover:shadow-cyan-300 max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img className="w-full" src={imageUrl} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-black dark:text-cyan-300">{title}</div>
        <p className="text-gray-700 dark:text-cyan-300 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-black dark:text-white font-bold py-2 px-4 rounded">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
