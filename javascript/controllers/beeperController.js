var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addBeeper, getBeepers, getBeeperSingel, updateStatusS, deleteBeeperFromDB, getBeepersByS } from '../services/beeperService.js';
export const addNewBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeper = req.body;
        if (!beeper) {
            res.status(400).json({ error: "Please enter name of Beeper" });
            return;
        }
        console.log(beeper);
        const beeperId = yield addBeeper(beeper);
        console.log(beeperId);
        res.status(201).json({ beeperId });
    }
    catch (error) {
        if (error.message === "Username already exists.") {
            res.status(409).json({ error: error.message });
        }
        else {
            console.error("Error registering user:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
export const getAllBeepers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield getBeepers();
        res.status(200).json(beepers);
    }
    catch (error) {
        // you can also check for unkown if it instance of Error.
        if (error.message === "Invalid username or password.") {
            res.status(401).json({ error: error.message });
        }
        else {
            console.error("Error during login:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
export const getBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        // const beeperId: number = req.params.userId;
        console.log(beeperId);
        if (!beeperId) {
            res.status(400).json({ error: "beeperId are required." });
            return;
        }
        const bepper = yield getBeeperSingel(beeperId);
        res.status(200).json(bepper);
    }
    catch (error) {
        // you can also check for unkown if it instance of Error.
        if (error.message === "Invalid username or password.") {
            res.status(401).json({ error: error.message });
        }
        else {
            console.error("Error during login:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
export const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        if (!beeperId) {
            res.status(400).json({ error: "beeperId are required." });
            return;
        }
        const book = yield updateStatusS(beeperId);
        res.status(201).json({ book });
    }
    catch (error) {
        if (error.message === "Username already exists.") {
            res.status(409).json({ error: error.message });
        }
        else {
            console.error("Error registering user:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
export const deleteBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        if (!beeperId) {
            res.status(400).json({ error: "bepperId are required." });
            return;
        }
        yield deleteBeeperFromDB(beeperId);
        res.status(200).json({ success: "Internal server success." });
    }
    catch (error) {
        if (error.message === "Username already exists.") {
            res.status(409).json({ error: error.message });
        }
        else {
            console.error("Error registering user:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
export const getBeepersByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bepperStatus = req.params.status;
        const beepers = yield getBeepersByS(bepperStatus);
        res.status(201).json({ beepers });
    }
    catch (error) {
        if (error.message === "Username already exists.") {
            res.status(409).json({ error: error.message });
        }
        else {
            console.error("Error registering user:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
