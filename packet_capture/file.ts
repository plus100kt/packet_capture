import fs from 'fs';
import { MyPacket } from './packet';

export const openFile = (fileName: string) => fs.openSync(fileName, 'w');

export const writePacket = (
    fileName: string,
    myPacket: MyPacket
) => {
    const fileString = fs.readFileSync(fileName, 'utf8');
    if (!fileString) {
        fs.writeFileSync(fileName, JSON.stringify([myPacket]));
    } else {
        const myPackets: MyPacket[] = JSON.parse(fileString);
        fs.writeFileSync(fileName, JSON.stringify(myPackets.concat(myPacket)));
    }
};

export const readPackets = (fileName: string): MyPacket[] => {
    const fileString = fs.readFileSync(fileName, 'utf8');
    return JSON.parse(fileString);
};
