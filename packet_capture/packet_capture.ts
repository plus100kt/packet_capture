import pcap, { PcapPacket } from '@plus100kt/pcap';
import { savePacket } from './db';

export const packetCapture = () => {
    const pcap_session = pcap.createSession('en0', {
        filter: 'ip proto \\tcp',
    });

    pcap_session.on('packet', (raw_packet) => {
        const packet: PcapPacket = pcap.decode.packet(raw_packet);
        savePacket(packet);
    });
};
