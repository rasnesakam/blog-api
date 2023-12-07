import { Router} from "express";
import bodyParser from "body-parser";
import { PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

const router = Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

interface AuthorSignupRequest extends Express.Request{
    body: {
        name: string
        middleName?: string
        surname: string
        registerToken: string
        email: string
    }
}

router.route("/signup").post((req: AuthorSignupRequest,res) => {

})