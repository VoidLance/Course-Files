import react from 'react';

const DisplayVariables = () => {
  // Define some variables
  let name = 'Dragon Quest';
  let score = 100;
  let isAwesome = true;
  let pros = ['Great Story', 'Engaging Gameplay', 'Beautiful Graphics', 'Memorable Characters', 'Epic Soundtrack'];
  // Define an object
  let review = {
    title: 'Dragon Quest Review',
    score: 100,
    isAwesome: true,
    pros: ['Great Story', 'Engaging Gameplay', 'Beautiful Graphics', 'Memorable Characters', 'Epic Soundtrack']
  }
  return (
    <div>
      <h1>Display Variables and Objects in JSX</h1>
      <h2>Variables:</h2>
      <p>Name: {name}</p>
      <p>Score: {score}</p>
      <p>Is Awesome: {isAwesome ? 'Yes' : 'No'}</p> <h3>Pros:</h3> <ul> {pros.map((pro, index) => ( <li key={index}>{pro}</li>
        ))}
      </ul>
      <h2>Object:</h2>
      <p>Title: {review.title}</p>
      <p>Score: {review.score}</p>
      <p>Is Awesome: {review.isAwesome ? 'Yes' : 'No'}</p>
      <h3>Pros:</h3>
      <ul>
        {review.pros.map((pro, index) => (
          <li key={index}>{pro}</li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayVariables;
