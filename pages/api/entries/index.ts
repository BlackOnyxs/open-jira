import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '../../../database/';
import { Entry, IEntry } from '../../../models';

type Data = 
    | { message: string }
    | IEntry[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {
        case 'GET':
            return getEntries( res );
        case 'POST':
            return createEntry( req, res );
        default:
            return res.status(404).json({ message: 'Endpoint no existe'});
    }

}

const getEntries = async( res: NextApiResponse<Data> ) => {
    await db.connect();
    const entries = await Entry.find().sort({ createdAt: 'ascending'});
    await db.disconnect();

    res.status(200).json(entries);
}

const createEntry = async( req: NextApiRequest, res: NextApiResponse ) => {
    
    const { description = '' } = req.body;

    const newEntry = new Entry({
        description,
        createdAt: Date.now(),
    });

    try {
        await db.connect();
        await newEntry.save();
        await db.disconnect();
        res.status(201).json(newEntry);
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(500).json({message: 'Algo salió mal, revisar la consola del servidor'});
    }
    
    
}