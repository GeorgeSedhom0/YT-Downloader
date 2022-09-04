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
const getVideos_1 = __importDefault(require("./getVideos"));
fs_1.default.existsSync("audios") ? null : fs_1.default.mkdirSync("audios");
const urls = [
    "https://www.youtube.com/watch?v=qRaysF60hOc&list=PL9SbZPwhBPI3zM8vDi0XtI4gizNxgn1qQ",
];
const download = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield (0, getVideos_1.default)(url);
        videos.forEach((video) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`Downloading ${video.title}...`);
            (0, ytdl_core_1.default)(video.url, { filter: "audioonly" }).pipe(fs_1.default.createWriteStream(`audios/${video.title}.mp3`));
            console.log(`Done`);
        }));
    }
    catch (err) {
        console.log("download failed", err);
    }
});
urls.forEach((url) => download(url));
