import axios, { AxiosRequestHeaders } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
    req.headers.authorization = `Bearer ${req.cookies.access_token}`;

    axios
        .get(`http://${process.env.baseUrl}/roles`, {
            headers: req.headers as AxiosRequestHeaders,
        })
        .then((response) => {
            res.send(response.data);
        })
        .catch((err) => {
            res.status(err.response.status);
            res.send(err.response.data);
        });

    // try {
    //     const response = await axios.get(`${process.env.baseUrl}/roles`, {
    //         headers: req.headers as AxiosRequestHeaders,
    //     });

    //     res.status(200).json(response.data);
    // } catch ({ response: { status, data } }) {
    //     res.status(status as number).json(data);
    // }
};
