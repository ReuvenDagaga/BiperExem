import { Beeper } from "../models/typs.js";
import { readFromJsonFile, writeToJsonFile} from "../DAL/dal.js";
import { Status } from "../utils/utils.js";
import { v4 as uuidv4 } from "uuid";
import { parse } from "path";


export const addBeeper = async (beeper: Beeper): Promise<any> => {
    const beepers: Beeper[] = await readFromJsonFile(); 
    
    const currentTime = Date.now()
    
    const newBepper: Beeper = {
        id: uuidv4(),
        name: beeper.name,
        status: Status.manufactured,
        created_at: new Date(currentTime)
    };
    beepers.push(newBepper);
    
    await writeToJsonFile(beepers);
    
    return newBepper.id;
};

export const getBeepers = async (): Promise<Beeper[] | undefined> => {
    const beepers: Beeper[] = await readFromJsonFile();  
    if (!beepers) {
      throw new Error("Username already exists.");
    }
    if (beepers) {
      return beepers;
    }
  };


  
export const getBeeperSingel = async (beeperId: string): Promise<Beeper | undefined> => {
    const beppers: Beeper[] = await readFromJsonFile();
    const beeper = beppers.find((b) => b.id === beeperId);
    
    
    
    if (!beeper) {
      throw new Error("beeper not exists.");
    }
    if (beeper) {
      return beeper;
    }
  };
