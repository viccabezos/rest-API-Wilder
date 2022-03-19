"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express") // ES5
const express_1 = __importDefault(require("express")); //ES6
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const wilder_1 = __importDefault(require("./routes/wilder"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3002;
const app = (0, express_1.default)();
mongoose_1.default
    .connect(`${process.env.MONGO_URI}`, {
    autoIndex: true,
})
    .then(() => console.log("BD connected"))
    .catch((err) => console.log(err));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use("/api/wilder", wilder_1.default);
app.use((req, res) => {
    res.status(404).send("Cette route n'existe pas");
});
app.listen(PORT, () => console.log(`Serveur sur port ${PORT}`));
