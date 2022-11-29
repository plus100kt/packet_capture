import pcap, { EthernetPacket, PcapPacket, TCPSessionType } from '@plus100kt/pcap'
import { savePacket } from './model/packet';

export const packetCapture = () => {
  const pcap_session = pcap.createSession('en0', { filter: "ip proto \\tcp" });

  pcap_session.on('packet', (raw_packet) => {
      const allPacket: PcapPacket = pcap.decode.packet(raw_packet);
      const ethernetPacket = allPacket.payload as EthernetPacket
      // // db에 패킷 저장
      // savePacket(ethernetPacket.payload);
  });
}