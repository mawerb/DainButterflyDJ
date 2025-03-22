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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
// Function to make the API call
var generateSong = function (Prompt, Genre, Title) { return __awaiter(void 0, void 0, void 0, function () {
    var data, response, _a, code, responseData, taskId, durationSong, audioUrl, imageUrl, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                data = {
                    prompt: "".concat(Prompt),
                    style: "".concat(Genre),
                    title: "".concat(Title),
                    customMode: true,
                    instrumental: false,
                    model: "V3_5",
                    callBackUrl: "https://api.example.com/callback",
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                // Log the data being sent to the API for debugging
                console.log("Data being sent to the API:", data);
                return [4 /*yield*/, axios_1.default.post("https://apibox.erweima.ai/api/v1/generate", data, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': "Bearer ".concat(process.env.SONG_API_KEY),
                        },
                    })];
            case 2:
                response = _b.sent();
                // Check if the response is successful (status code 200)
                if (response.status === 200) {
                    console.log("API Response:", response.data); // Log the full response for debugging
                    _a = response.data, code = _a.code, responseData = _a.data;
                    if (code === 200 && responseData && responseData.data) {
                        taskId = responseData.data[0].task_id;
                        durationSong = responseData.data[0].duration;
                        audioUrl = responseData.data[0].source_audio_url;
                        imageUrl = responseData.data[0].image;
                        return [2 /*return*/, {
                                text: "".concat(Genre, " song about ").concat(Prompt, " that is ").concat(durationSong, " seconds long."),
                                data: {
                                    duration: durationSong,
                                    audio: audioUrl,
                                },
                                imageUrl: imageUrl,
                            }];
                    }
                    else {
                        throw new Error("Invalid data structure received.");
                    }
                }
                else {
                    throw new Error("API returned an error: ".concat(response.status, " ").concat(response.statusText));
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                console.error("Error while generating the song:", error_1);
                return [2 /*return*/, {
                        text: "Failed to generate song.",
                        data: null,
                        imageUrl: null,
                    }];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Example usage for testing
var testGenerateSong = function () { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, generateSong("lebron james rnb", "rnb", "My King")];
            case 1:
                result = _a.sent();
                if (result.data) {
                    console.log("Song generated successfully:", result);
                }
                else {
                    console.log("Failed to generate song:", result.text);
                }
                return [2 /*return*/];
        }
    });
}); };
// Call the test function
testGenerateSong();
