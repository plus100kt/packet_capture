import pcap, { PacketWithHeader, PcapPacket } from '@plus100kt/pcap';
import { savePacket } from './db';
import { openFile, writePacket } from './file';
import { toMyPacket } from './packet';

export const packetCapture = () => {
    const pcap_session = pcap.createSession('en0', {
        filter: 'ip proto \\tcp',
    });

    // 파일 저장시
    const fileName = 'packet.json';
    openFile(fileName);

    pcap_session.on('packet', (raw_packet: PacketWithHeader) => {
        const pcapPacket: PcapPacket = pcap.decode.packet(raw_packet);
        const myPacket = toMyPacket(pcapPacket, raw_packet);

        // // db 저장시
        // savePacket(myPacket)
        writePacket(fileName, myPacket);
    });
};
