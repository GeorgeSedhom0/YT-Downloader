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
const getVideos_1 = __importDefault(require("./getVideos"));
const download_1 = __importDefault(require("./download"));
fs_1.default.existsSync("audios") ? null : fs_1.default.mkdirSync("audios");
const urls = [
    "https://www.youtube.com/watch?v=VLMo0rthnoo&list=PLogBXxHVJONBiVt5ZZ231QaoN4XSimF6P",
];
const downloadAll = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield (0, getVideos_1.default)(url);
        for (const video of videos) {
            const result = yield (0, download_1.default)(video.url, video.title);
            console.log(result);
        }
    }
    catch (err) {
        console.log("download failed", err);
    }
});
urls.forEach((url) => downloadAll(url));
