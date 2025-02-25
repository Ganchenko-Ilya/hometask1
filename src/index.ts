import express, {Request, Response} from 'express'

const app = express();
const port = process.env.PORT || 3003;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello world!!!!!')
})

app.get('/games', (req: Request, res: Response) => {

    res.send({"1": "123123"})
})
