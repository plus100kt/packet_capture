import { EthernetPacket, IPv4, PcapPacket, PcapProtocolDecimal, PcapProtocolName } from '@plus100kt/pcap';

export interface MyPacket {
    id: number;
    src: string;
    dst: string;
    sport: number;
    dport: number;
    seqno: number;
    ackno: number;
    length: number;
    pcapProtocol: PcapProtocolName;
    portProtocol: string;
    data: Buffer;
    ttl: number;
    windowSize: number;
    checksum: number;
}

const ipv4toPacket = (ipv4Packet: IPv4): MyPacket => ({
    id: 3,
    src: ipv4Packet.saddr.addr.join('.'),
    dst: ipv4Packet.daddr.addr.join('.'),
    sport: ipv4Packet.payload.sport,
    dport: ipv4Packet.payload.dport,
    seqno: ipv4Packet.payload.seqno,
    ackno: ipv4Packet.payload.ackno,
    length: ipv4Packet.length,
    pcapProtocol: protocolDecimalToName[ipv4Packet.protocol],
    portProtocol: portToProtocol[ipv4Packet.payload.sport],
    data: ipv4Packet.payload.data,
    ttl: ipv4Packet.ttl,
    windowSize: ipv4Packet.payload.windowSize,
    checksum: ipv4Packet.payload.checksum,
});

export const toMyPacket = (pcapPacket: PcapPacket) => {
    if (pcapPacket.link_type === 'LINKTYPE_ETHERNET') {
        const ethernetPacket = pcapPacket.payload as EthernetPacket;
        return ipv4toPacket(ethernetPacket.payload);
    }

    if (pcapPacket.link_type == 'LINKTYPE_RAW') {
        const ipv4Packet = pcapPacket.payload as IPv4;
        return ipv4toPacket(ipv4Packet);
    }

    // 일어날리 없을것 같지만
    const ipv4Packet = pcapPacket.payload as IPv4;
    return ipv4toPacket(ipv4Packet);
};

const protocolDecimalToName: Record<PcapProtocolDecimal, PcapProtocolName> = {
    1: 'icmp',
    2: 'igmp',
    4: 'ipv4',
    6: 'tcp',
    17: 'udp',
    41: 'ipv6',
};

const portToProtocol: Record<string, string> = {
    20: 'FTP',
    21: 'FTP',
    22: 'SSH',
    23: 'Telnet',
    25: 'SMTP',
    53: 'DNS',
    67: 'DHCP',
    68: 'DHCP',
    69: 'TFTP',
    80: 'HTTP',
    110: 'POP',
    123: 'NTP',
    137: 'NetBIOS',
    138: 'NetBIOS',
    139: 'NetBIOS',
    143: 'IMAP',
    161: 'SNMP',
    162: 'SNMP',
    179: 'BGP',
    389: 'LDAP',
    443: 'HTTPS',
    636: 'LDAPS',
    989: 'FTP over TLS/SSL',
    990: 'FTP over TLS/SSL',
};
