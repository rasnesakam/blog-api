import { Router } from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

interface Mail {
	origin: string,
	name: string,
	surname: string,
	title: string,
	message: string
}

interface MailRequest extends Express.Request {
	body: Mail
}

router.route("/").post(async (req: MailRequest, res) => {
	res.status(500).send({message: "Not implemented yet"});
});

router.route("/").get(async (req: MailRequest, res) => {
	res.status(500).send({message: "Not implemented yet"});
});

export default router