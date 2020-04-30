"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
class Database {
}
exports.default = Database;
Database.connect = () => {
    mongoose_1.default
        .connect(config_1.default.mongo.localUrl, {
        useCreateIndex: true,
        useNewUrlParser: true,
        keepAlive: true,
        useUnifiedTopology: true,
    })
        .then(() => {
        console.log('Mongodb connected...');
    });
};
//# sourceMappingURL=database.js.map