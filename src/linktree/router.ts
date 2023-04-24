import {Router} from "express";
import bodyParser from "body-parser";
import { PrismaClient } from '@prisma/client'
import * as QueryString from "querystring";
const prisma = new PrismaClient()

const router = Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

interface Link {
    id?: string,
    linkName: string,
    href: string
}

interface LinkRequest extends Express.Request{
    body: Link[]
}

router.route("/").post(async (req: LinkRequest, res) => {
    let result = await prisma.linkTree.createMany({
        data: req.body,
        skipDuplicates: true
    });
    return res.status(201).send({message: `created ${result.count} of entries`});
});

router.route("/").get(async (req, res) => {
    let datas = await prisma.linkTree.findMany()
    if (datas.length > 0)
        return res.status(200).send(datas);
    return res.status(404).send({message:"No data found."});
})