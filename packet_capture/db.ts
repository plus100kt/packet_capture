import mongoose from 'mongoose';
import { MyPacket } from './packet';

const packetSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    src: { type: String, require: true },
    dst: { type: String, require: true },
    sport: { type: Number, require: true },
    dport: { type: Number, require: true },
    seqno: { type: Number, require: true },
    ackno: { type: Number, require: true },
    length: { type: Number, require: true },
    pcapProtocol: { type: String, require: true },
    portProtocol: { type: String, require: true },
    data: { type: Buffer, require: true },
    ttl: { type: Number, require: true },
    windowSize: { type: Number, require: true },
    checksum: { type: Number, require: true },
});

const Packet = mongoose.model('Packet', packetSchema);

export const savePacket = (myPacket: MyPacket) => new Packet(myPacket).save;
