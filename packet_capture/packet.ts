import { IPv4, PcapProtocolDecimal, PcapProtocolName } from '@plus100kt/pcap';

interface Packet {
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

export const ipv4toPacket = (pcapPacket: IPv4): Packet => ({
    id: 3,
    src: pcapPacket.saddr.join('.'),
    dst: pcapPacket.daddr.join('.'),
    sport: pcapPacket.payload.sport,
    dport: pcapPacket.payload.dport,
    seqno: pcapPacket.payload.seqno,
    ackno: pcapPacket.payload.ackno,
    length: pcapPacket.length,
    pcapProtocol: protocolDecimalToName[pcapPacket.protocol],
    portProtocol: portToProtocol[pcapPacket.payload.sport],
    data: pcapPacket.payload.data,
    ttl: pcapPacket.ttl,
    windowSize: pcapPacket.payload.windowSize,
    checksum: pcapPacket.payload.checksum,
});

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
