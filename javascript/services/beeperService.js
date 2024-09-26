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
import { Location, Status } from "../utils/utils.js";
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
export const updateStatusS = (beeperId) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const beeperFind = beepers.find((u) => u.id === beeperId);
    if (!beeperFind) {
        throw new Error("Invalid beeper");
    }
    if (beeperFind.status === Status.manufactured) {
        beeperFind.status = Status.assembled;
        const index = beepers.findIndex((i) => i.id === beeperFind.id);
        beepers[index] = beeperFind;
        yield writeToJsonFile(beepers);
        return beeperFind;
    }
    else if (beeperFind.status === Status.assembled) {
        beeperFind.status = Status.shipped;
        const index = beepers.findIndex((i) => i.id === beeperFind.id);
        beepers[index] = beeperFind;
        yield writeToJsonFile(beepers);
        return beeperFind;
    }
    else if (beeperFind.status === Status.shipped) {
        beeperFind.status = Status.deployed;
        const beeperAftherBomb = yield startMission(beeperFind);
        const index = beepers.findIndex((i) => i.id === beeperAftherBomb.id);
        beepers[index] = beeperAftherBomb;
        yield writeToJsonFile(beepers);
        return beeperAftherBomb;
    }
    return beeperFind;
});
function startMission(beeperFind) {
    return __awaiter(this, void 0, void 0, function* () {
        beeperFind.latitude = Location[1].latitude;
        beeperFind.longitude = Location[1].longitude;
        yield timer();
        beeperFind.status = Status.detonated;
        return beeperFind;
    });
}
function timer() {
    var sec = 10;
    var timer = setInterval(function () {
        sec--;
        if (sec < 0) {
            clearInterval(timer);
        }
    }, 1000);
}
export const deleteBeeperFromDB = (beeperId) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const beeperFind = beepers.find((u) => u.id === beeperId);
    if (!beeperFind) {
        throw new Error("Invalid username or password.");
    }
    const index = beepers.findIndex((i) => i.id === beeperFind.id);
    beepers.splice(index, 1);
    yield writeToJsonFile(beepers);
});
