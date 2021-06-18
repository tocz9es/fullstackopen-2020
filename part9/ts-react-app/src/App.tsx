import React from 'react'
import courseParts from './types';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  const totalParts = courseParts.reduce((acc, part) => acc + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total total={totalParts} />
    </div>
  );
};

export default App;