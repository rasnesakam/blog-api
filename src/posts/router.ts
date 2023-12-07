import { Router} from "express";
import bodyParser from "body-parser";
import { PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const router = Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


interface PostRequest extends Express.Request {
    body: {
        featuredImg: string
        title: string
        content: string
        authorId: string
        metaData: {
            createdDate: Date
            visible: boolean
            description: string
            area: string
            categories: string[]
            tags: string[]
        }
    }
}

function normalizeStr(str: string): string{
    return str.toLowerCase().replace(" ","_")
}


router.route("/").get(async (req, res) => {
    let datas = await prisma.post.findMany();
    res.status(200).send(datas);
})

router.route("/").post(async (req: PostRequest, res) => {
    let uri = normalizeStr(req.body.title)

    let data = await prisma.post.create({
        data: {
            metaData: {
                created: new Date(),
                visible: req.body.metaData.visible,
                description: req.body.metaData.description,
                area: {name: req.body.metaData.area, normalizedName: normalizeStr(req.body.metaData.area)},
                tags: req.body.metaData.tags.map(item => ({name: item, normalizedName: normalizeStr(item)})),
                categories: req.body.metaData.categories.map(item => ({name: item, normalizedName: normalizeStr(item)}))
            },
            uri,
            content: req.body.content,
            title: req.body.title,
            featuredImg: req.body.featuredImg,
            authorId: req.body.authorId
        }
    });
    res.status(200).send(data);
});

router.route("/:id").delete(async (req, res) => {
    await prisma.post.delete({
        where: {
            id: req.params.id
        }
    })
});

export default router;


