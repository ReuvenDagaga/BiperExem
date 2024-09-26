import { Beeper } from "../models/typs.js";
import { readFromJsonFile, writeToJsonFile} from "../DAL/dal.js";
import { Location, Status } from "../utils/utils.js";
import { v4 as uuidv4 } from "uuid";


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


  export const updateStatusS = async (beeperId: string): Promise<Beeper> => {
    const beepers: Beeper[] = await readFromJsonFile();
    const beeperFind: Beeper | undefined = beepers.find((u) => u.id === beeperId);
  
    if (!beeperFind) {
      throw new Error("Invalid beeper");
    }
    
    if (beeperFind.status === Status.manufactured) {
        beeperFind.status = Status.assembled;
        const index = beepers.findIndex((i) => i.id === beeperFind.id);
        beepers[index] = beeperFind;
        await writeToJsonFile(beepers);
        return beeperFind;
    }
    else if (beeperFind.status === Status.assembled) {
        beeperFind.status = Status.shipped;
        const index = beepers.findIndex((i) => i.id === beeperFind.id);
        beepers[index] = beeperFind;
        await writeToJsonFile(beepers);
        return beeperFind;
    }
    else if (beeperFind.status === Status.shipped) {
        beeperFind.status = Status.deployed;
        const beeperAftherBomb: Beeper = await startMission(beeperFind);
        const index = beepers.findIndex((i) => i.id === beeperAftherBomb.id);
        beepers[index] = beeperAftherBomb;
        await writeToJsonFile(beepers);
        return beeperAftherBomb;
    }
    return beeperFind
  };

  async function startMission(beeperFind: Beeper) : Promise<Beeper> {
    beeperFind.latitude = Location[1].latitude;
    beeperFind.longitude = Location[1].longitude;
    await timer();
    beeperFind.status = Status.detonated
    return beeperFind
  }


  function timer(){
    var sec = 10;
    var timer = setInterval(function(){
        sec--;
        if (sec < 0) {
            clearInterval(timer);
        }
    }, 1000);
}


export const deleteBeeperFromDB = async (beeperId: string): Promise<void> => {
    const beepers: Beeper[] = await readFromJsonFile();
    const beeperFind: Beeper | undefined = beepers.find((u) => u.id === beeperId);
  
    if (!beeperFind) {
      throw new Error("Invalid username or password.");
    }
  
    const index = beepers.findIndex((i) => i.id === beeperFind.id);
    beepers.splice(index, 1);
    await writeToJsonFile(beepers);
  };