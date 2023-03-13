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
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.use(body_parser_1.default.urlencoded({ extended: true }));
router.use(body_parser_1.default.json());
router.route("/").get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let datas = yield prisma.post.findMany();
    res.status(200).send(datas);
}));
exports.default = router;
//# sourceMappingURL=router.js.map