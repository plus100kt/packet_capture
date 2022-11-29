import { EthernetPacket, IPv4, PcapPacket } from '@plus100kt/pcap';
import mongoose from 'mongoose';
import { ipv4toPacket } from './packet';

export const packetSchema = new mongoose.Schema({
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

export const Packet = mongoose.model('Packet', packetSchema);

export const savePacket = (pcapPacket: PcapPacket) => {
    if (pcapPacket.link_type === 'LINKTYPE_ETHERNET') {
        const ethernetPacket = pcapPacket.payload as EthernetPacket;
        new Packet(ipv4toPacket(ethernetPacket.payload)).save;
    } else if (pcapPacket.link_type == 'LINKTYPE_RAW') {
        const ipv4Packet = pcapPacket.payload as IPv4;
        new Packet(ipv4toPacket(ipv4Packet)).save;
    } else {
        console.log('??');
    }
};
