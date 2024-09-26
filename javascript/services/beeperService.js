var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readFromJsonFile, writeToJsonFile } from "../DAL/dal.js";
import { Status } from "../utils/utils.js";
import { v4 as uuidv4 } from "uuid";
export const addBeeper = (beeper) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const currentTime = Date.now();
    const newBepper = {
        id: uuidv4(),
        name: beeper.name,
        status: Status.manufactured,
        created_at: new Date(currentTime)
    };
    beepers.push(newBepper);
    yield writeToJsonFile(beepers);
    return newBepper.id;
});
export const getBeepers = () => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    if (!beepers) {
        throw new Error("Username already exists.");
    }
    if (beepers) {
        return beepers;
    }
});
export const getBeeperSingel = (beeperId) => __awaiter(void 0, void 0, void 0, function* () {
    const beppers = yield readFromJsonFile();
    const beeper = beppers.find((b) => b.id === beeperId);
    if (!beeper) {
        throw new Error("beeper not exists.");
    }
    if (beeper) {
        return beeper;
    }
});
