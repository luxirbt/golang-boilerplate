import axios, { AxiosRequestHeaders } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    req.headers.authorization = `Bearer ${req.cookies.access_token}`;

    if (req.method === 'GET') {
        try {
            const response = await axios.get(`${process.env.baseUrl}/applications`, {
                headers: req.headers as AxiosRequestHeaders,
            });

            res.status(200).json(response.data);
        } catch ({ response: { status, data } }) {
            res.status(status as number).json(data);
        }
    }

    if (req.method === 'POST') {
        try {
            const response = await axios.post(`${process.env.baseUrl}/application`, req.body, {
                headers: req.headers as AxiosRequestHeaders,
            });

            res.status(200).json(response.data);
        } catch ({ response: { status, data } }) {
            res.status(status as number).json(data);
        }
    }
};
