import React from 'react';
import { CoursePart } from '../types';

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.type) {
    case 'normal':
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>{part.description}</p>
        </div>
      )
    case 'groupProject':
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      )
    case 'submission':
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>{part.description}</p>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </div>
      )
    case 'special':
      return (
        <div>
          <h3>{part.name} {part.exerciseCount}</h3>
          <p>{part.description}</p>
          <p>required skills: {part.requirements.toString()}</p>
        </div>
      )
    default:
      return null;
  }
}

export default Part;