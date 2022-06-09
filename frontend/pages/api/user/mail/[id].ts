import axios, { AxiosRequestHeaders } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    req.headers.authorization = `Bearer ${req.cookies.access_token}`;

    try {
        const response = await axios.post(`${process.env.baseUrl}/user/mail/${req.query.id}`, req.body, {
            headers: req.headers as AxiosRequestHeaders,
        });

        res.status(200).json(response.data);
    } catch ({ response: { status, data } }) {
        res.status(status as number).json(data);
    }
};
