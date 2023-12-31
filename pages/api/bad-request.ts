import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    ok: boolean;
    message: string | string[];
}

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    const { message = 'Bad request' } = req.query;
    
    res.status(200).json({
        ok: false,
        message
    });
}