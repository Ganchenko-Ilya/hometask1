import express, {Request, Response} from 'express'
import {DbType, ErrorResType, ReqPostType} from "./db/types";
import {createNewDate, generateUniqueId} from "./utils/libFunc";
import {isCreateVideoRequestValid} from "./utils/validateFuncs";
import {errors} from "./db/db";


export const app = express();

app.use(express.json())


app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello world!!!!!')

})


app.post('/hometask_01/api/videos', (req: Request<unknown, unknown, ReqPostType>, res: Response<DbType | ErrorResType>) => {
    const {author, title, availableResolutions} = req.body

    const isRequestBodyValidate = isCreateVideoRequestValid(title, author, availableResolutions)

    if (isRequestBodyValidate) {
        const date = createNewDate();

        const newVideos: DbType = {
            id: generateUniqueId(),
            title,
            author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: date,
            publicationDate: date,
            availableResolutions
        }
        res.status(201).send(newVideos)
    } else {
        res.status(400).send(errors.errorsMessages)
        errors.errorsMessages = []
    }

})



