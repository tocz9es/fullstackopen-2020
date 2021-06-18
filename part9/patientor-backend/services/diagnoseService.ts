import diagnoseData from '../data/diagnosis';

import { Diagnosis } from '../types';

const getEntries = (): Array<Diagnosis> => {
  return diagnoseData;
};

const addEntry = (): null => {
  return null;
};

export default {
  getEntries, addEntry
};
