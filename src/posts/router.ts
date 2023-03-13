import {Router} from "express";
import bodyParser from "body-parser";
import { PrismaClient } from '@prisma/client'
import * as QueryString from "querystring";
const prisma = new PrismaClient()

const router = Router();

interface Tag {}
interface Category {}
interface Area {
    id?: string
    name: string
}

interface MetaData {
    id?: string,
    created: "",
    visible: boolean,
    postId: string,
    description: string,
    area

}

interface Post {
    metadata: MetaData,
    uri: string,
    content: string,
    title: string,
    featuredImg: string
}

interface PostRequest extends Express.Request {
    body: Post
}

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.route("/").get(async (req, res) => {
    let datas = await prisma.post.findMany();
    res.status(200).send(datas);
})

router.route("/").post(async (req: PostRequest, res) => {
    let uri = req.body.title.toLowerCase().replace(" ", "_");

    let data = await prisma.post.create({
        data: {
            MetaData: {
                connectOrCreate: {
                    where: {
                        id: req.body.metadata.id
                    },
                    create: {
                        created: Date.parse(req.body.metadata.created).toString(),
                        description: req.body.metadata.description,
                        visible: req.body.metadata.visible,
                        Area: {
                            connectOrCreate: {
                                where: {
                                    id: req.body.metadata.area.id
                                },
                                create: {
                                    name: req.body.metadata.area.name
                                }
                            }
                        }
                    }
                }
            },
            uri: uri,
            content: "",
            title: "",
            featuredImg: ""
        },
        include: {
            MetaData: true,
        }
    });
    res.status(200).send(datas);
})

export default router;


