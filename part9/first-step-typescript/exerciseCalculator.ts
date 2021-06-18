interface ExerciseValues {
  daysData: Array<number>;
  level: number;
}

interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number
}

export const getExerciseValues = (args: Array<string>): ExerciseValues => {
  const inputs = args.slice(2);
  if (inputs.length < 3) throw new Error('parameters missing');
  inputs.forEach(input => {
    if (isNaN(Number(input))) throw new Error('malformatted parameters');
  });

  const level = Number(inputs[0]);
  const daysData = inputs.slice(1).map(day => Number(day));

  return { daysData, level };
};

export const exerciseCalculator = (exerciseValues: ExerciseValues): ExerciseResults => {
  const periodLength: number = exerciseValues.daysData.length;
  const trainingDays: number = exerciseValues.daysData.filter(day => day > 0).length;
  const average: number = exerciseValues.daysData.reduce((sums, day) => sums + day, 0) / periodLength;
  const success: boolean = average >= exerciseValues.level;
  const rating: 1 | 2 | 3 = average > exerciseValues.level + 5 ? 3 : success ? 2 : 1;
  const ratingDescription: 'fair' | 'good' | 'awesome' | 'null' = rating === 1 ? 'fair' : rating === 2 ? 'good' : rating === 3 ? 'awesome' : 'null';
  return {
    periodLength, trainingDays, success, rating, ratingDescription, target: exerciseValues.level, average
  };
};
