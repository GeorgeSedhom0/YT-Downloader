"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const download = (url, title) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Downloading ${title}...`);
    const download = new Promise((resolve, reject) => {
        (0, ytdl_core_1.default)(url, { filter: "audioonly" })
            .pipe(fs_1.default.createWriteStream(`audios/${title}.mp3`))
            .on("finish", () => {
            resolve(`Downloaded ${title}`);
        })
            .on("error", () => {
            reject(`Could Not Download ${title}`);
        });
    });
    return yield download;
});
exports.default = download;
