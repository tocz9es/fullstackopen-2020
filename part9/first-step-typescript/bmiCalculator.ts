interface BmiValues {
  height: number;
  weight: number;
}

export const getBmiValues = (args: string[]): BmiValues => {
  if (args.length !== 4 || isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error('this command contains height and weight values');
  }
  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
};

export const calculateBmi = (bmiValues: BmiValues): string => {
  const Bmi: number = bmiValues.weight / bmiValues.height / bmiValues.height * 10000;
  if (Bmi < 18.5) {
    return 'Underweight';
  } else if (Bmi > 18.5 && Bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (Bmi > 25) {
    return 'Overweight';
  } else {
    return 'Error';
  }
};
