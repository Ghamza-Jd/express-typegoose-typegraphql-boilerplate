"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const database_1 = __importDefault(require("./database"));
server_1.default().then((app) => {
    database_1.default.connect();
    app.listen(3001, () => console.log('Server started at http://localhost:3001/graphql'));
});
//# sourceMappingURL=app.js.map