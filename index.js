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
const ytdl_core_1 = __importDefault(require("ytdl-core"));
const fs_1 = __importDefault(require("fs"));
const index_1 = __importDefault(require("./node_modules/youtube-playlist/index"));
console.log(index_1.default);
const download = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videoName = (yield ytdl_core_1.default.getBasicInfo(url)).videoDetails.title;
        const vid = videoName.replace(/[^a-z0-9]/gi, "_");
        console.log(vid);
        (0, ytdl_core_1.default)(url, { filter: "audioonly" }).pipe(fs_1.default.createWriteStream(`vids/${vid}.mp4`));
    }
    catch (err) {
        console.log(err);
    }
});
download("https://www.youtube.com/watch?v=Tbb-uPCU8zg&list=RDTbb-uPCU8zg&start_radio=1");
