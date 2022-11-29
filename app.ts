import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { readPackets } from './packet_capture/file';
import { packetCapture } from './packet_capture/packet_capture';

const app = express();

app.get('/packetCapture', (req: Request, res: Response) => {
    packetCapture();
    res.json();
});

app.get('getPacketFile', (req: Request, res: Response) => {
    const fileName = 'packet.json';
    const myPackets = readPackets(fileName);
    res.json(myPackets);
});

// // db 관련 설정
// dotenv.config();
// export const { PORT, MONGO_URI } = process.env;

// mongoose
//     .connect(MONGO_URI ?? '')
//     .then(() => console.log('Successfully connected to mongodb'))
//     .catch((e) => console.error(e));

// app.listen(PORT);
app.listen(8080);
