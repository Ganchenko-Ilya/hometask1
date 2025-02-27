import express, {Request, Response} from 'express'
import {DbType, ErrorResType, ReqPostType} from "./db/types";
import {createNewDate, generateUniqueId} from "./utils/libFunc";
import {isCreateVideoRequestValid} from "./utils/validateFuncs";
import {db, dbDeleteId, errors} from "./db/db";


export const app = express();

app.use(express.json())


app.get('/videos', (req: Request, res: Response) => {
    res.status(200).send(db)

})
app.get('/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const video = db.find(el => el.id === id)
    if (video) {
        res.status(200).send(video)
    } else {
        res.status(404).end()
    }

})
app.delete('/videos/:id', (req: Request, res: Response) => {
    const id = +req.params.id

    const video = db.find(el => el.id === id);

    if (video) {
        dbDeleteId(id)
        res.status(204).end()
    } else {
        res.status(404).end()
    }

})


app.post('/videos', (req: Request<unknown, unknown, ReqPostType>, res: Response<DbType | ErrorResType>) => {
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
            createdAt: date.createdAtDate,
            publicationDate: date.publicationDate,
            availableResolutions
        }
        db.push(newVideos)
        res.status(201).send(newVideos)
    } else {
        res.status(400).send(errors)
        errors.errorsMessages = []
    }

})



