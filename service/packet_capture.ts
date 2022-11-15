import pcap from 'pcap'
import { Protocol } from '../interface/packet';
import { PcapPacket } from '../interface/pcap_packet';

export const packetCapture = (type: Protocol, filter?: {}) => {
  const tcp_tracker = new pcap.TCPTracker();
  const pcap_session = pcap.createSession('en0', { filter: "ip proto \\tcp" });

  tcp_tracker.on('session', (session: any) => {
    console.log("Start of session between " + session.src_name + " and " + session.dst_name);
    // console.log(session);
    session.on('end', (session: any) =>  {
        console.log("End of TCP session between " + session.src_name + " and " + session.dst_name);
    });
  });

  pcap_session.on('packet', (raw_packet) => {
      const packet: PcapPacket = pcap.decode.packet(raw_packet);
      console.log(packet);
      tcp_tracker.track_packet(packet);
  });
}