var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jsonfile from 'jsonfile';
const DB_PATH = process.env.DB_PATH || './DB/beeperDB.json';
// export const writeToJsonFile = async (beeper: Beeper): Promise<void> => {
//   const beepers: Beeper[] = await jsonfile.readFile(DB_PATH);
//   beepers.push(beeper);
//   await jsonfile.writeFile(DB_PATH, beepers);
// };
export const writeToJsonFile = (beepers) => __awaiter(void 0, void 0, void 0, function* () {
    yield jsonfile.writeFile(DB_PATH, beepers);
});
export const readFromJsonFile = () => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield jsonfile.readFile(DB_PATH);
    return beepers;
});
