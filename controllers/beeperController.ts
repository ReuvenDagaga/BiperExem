import { Request, Response } from 'express';
import { Beeper } from '../models/typs.js'
import { addBeeper, getBeepers, getBeeperSingel } from '../services/beeperService.js';



export const addNewBeeper = async (req: Request, res: Response): Promise<void> => {
    try {
      const beeper: Beeper = req.body;

      if (!beeper) {
        res.status(400).json({ error: "Please enter name of Beeper" });
        return;
      }
      console.log(beeper);
      const beeperId: number = await addBeeper(beeper);
      console.log(beeperId);
      res.status(201).json({ beeperId } );
    } catch (error: any) {
      if (error.message === "Username already exists.") {
        res.status(409).json({ error: error.message });
      } else {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error." });
      }
    }
  };


  export const getAllBeepers = async (req: Request, res: Response): Promise<void> => {
    try {
      const beepers = await getBeepers();
      res.status(200).json(beepers);
    } catch (error: any) {
      // you can also check for unkown if it instance of Error.
      if (error.message === "Invalid username or password.") {
        res.status(401).json({ error: error.message });
      } else {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error." });
      }
    }
  };


  
  export const getBeeper = async (req: Request, res: Response): Promise<void> => {
    try {
    const beeperId: string = req.params.id;
    // const beeperId: number = req.params.userId;
    console.log(beeperId);
      if (!beeperId) {
        res.status(400).json({ error: "beeperId are required." });
        return;
      }
  
      const bepper = await getBeeperSingel(beeperId);
      res.status(200).json(bepper);
    } catch (error: any) {
      // you can also check for unkown if it instance of Error.
      if (error.message === "Invalid username or password.") {
        res.status(401).json({ error: error.message });
      } else {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error." });
      }
    }
  };
  
  

