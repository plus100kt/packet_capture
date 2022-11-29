import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { packetCapture } from './packet_capture/packet_capture';

dotenv.config();
const app = express();
const { PORT, MONGO_URI } = process.env;

app.get('/getPacket', (req: Request, res: Response) => {
    packetCapture();
    res.json();
});

mongoose
    .connect(MONGO_URI ?? '')
    .then(() => console.log('Successfully connected to mongodb'))
    .catch((e) => console.error(e));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

app.listen(8080);
