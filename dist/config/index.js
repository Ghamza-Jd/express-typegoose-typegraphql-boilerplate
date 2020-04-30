"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv_1.default.config();
if (!envFound)
    throw new Error('Could not find .env file');
exports.default = {
    port: process.env.PORT,
    mongo: {
        localUrl: String(process.env.MONGO_LOCAL_URL),
        atlasUrl: `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`,
    },
};
//# sourceMappingURL=index.js.map