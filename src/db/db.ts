import {DbType, ErrorsMessageType} from "./types";


export let db: DbType[] = [];

export const dbDeleteId = (id: number) => {
    const videos = db.filter(el => el.id !== id)
    db = [...videos];
}

export const errors: ErrorsMessageType = {errorsMessages: []}


