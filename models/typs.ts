import { Status } from "../utils/utils"

export interface Beeper {
    id?: string,
    name: string,
    status?: Status,
    created_at?: Date,
    detonated_at?: Date,
    latitude?: number // גובה
    longitude?: number, // רוחב 
}

