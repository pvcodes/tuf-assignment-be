"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const db_1 = require("./config/db");
const schema_1 = require("./utils/schema");
const helper_1 = require("./utils/helper");
const app = (0, express_1.default)();
// import * as cors from "cors";
const cors_1 = __importDefault(require("cors"));
dotenv.config();
// Middleware for parsing request bodies
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/health-check", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ success: true, data: { running: "ok " } });
}));
app.post("/submit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req === null || req === void 0 ? void 0 : req.body; // { username, lang, sourceCode, stdInput }
    try {
        const as = yield schema_1.codeSubmissionSchema.validateAsync(payload);
    }
    catch (err) {
        console.log(123, "validaiton err");
        return res.status(400).json({ success: false, error: err.message });
    }
    try {
        const response = yield db_1.prisma.codeSubmission.create({
            data: Object.assign(Object.assign({}, payload), { id: (0, helper_1.generateIdentifer)() }),
        });
        if (response) {
            return res
                .status(200)
                .json({ success: true, data: { submissionId: response.id } });
        }
    }
    catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}));
app.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield db_1.prisma.codeSubmission.findMany();
        if (response) {
            return res.status(200).json({ success: true, data: { response } });
        }
    }
    catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
