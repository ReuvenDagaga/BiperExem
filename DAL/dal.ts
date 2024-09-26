import  jsonfile from 'jsonfile';
import { Beeper } from '../models/typs.js';



const DB_PATH = process.env.DB_PATH || './DB/beeperDB.json';


// export const writeToJsonFile = async (beeper: Beeper): Promise<void> => {
//   const beepers: Beeper[] = await jsonfile.readFile(DB_PATH);
//   beepers.push(beeper);
//   await jsonfile.writeFile(DB_PATH, beepers);
// };

export const writeToJsonFile = async (beepers: Beeper[]): Promise<void> => {
  await jsonfile.writeFile(DB_PATH, beepers);
};

export const readFromJsonFile = async (): Promise<Beeper[]> => {
  const beepers: Beeper[] = await jsonfile.readFile(DB_PATH);
  return beepers;
};

