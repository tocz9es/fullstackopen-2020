import express from 'express';
import { getBmiValues, calculateBmi } from './bmiCalculator';
import { getExerciseValues, exerciseCalculator } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello FullStack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  try {
    const bmiValues = getBmiValues(['', '', String(height), String(weight)]);
    res.json({
      weight, height,
      bmi: calculateBmi(bmiValues)
    });
  } catch (e) {
    res.json({
      error: 'malformatted parameters'
    });
  }
});

app.post('/exercise', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daysData, level } = req.body;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const exerciseValues = getExerciseValues(['', '', level, ...daysData]);
    res.json(exerciseCalculator(exerciseValues));
  } catch (e) {
    res.json({
      error: 'malformatted parameters'
    });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});