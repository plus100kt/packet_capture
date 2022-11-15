export interface PcapPacket {
    link_type: LinkType,
    pcap_header: PcapHeader,
    payload: EthernetPacket
    emitter: undefined
  }

type LinkType = 'LINKTYPE_NULL' | 'LINKTYPE_ETHERNET' | 'LINKTYPE_IEEE802_11_RADIO' | 'LINKTYPE_RAW' | 'LINKTYPE_LINUX_SLL';

interface PcapHeader {
    tv_sec: Number,
    tv_usec: Number,
    caplen: Number,
    len: Number
  }

interface EthernetPacket {
    emitter: any, // undefined 
    dhost: EthernetAddr;
    shost: EthernetAddr;
    ethertype: any, // undefined
    vlan: any, // null
    payload: IPv4 
  };

  interface EthernetAddr {
    addr: any[]; //
  }

  interface IPv4 {
    emitter: any, // undefined
    version: 4,
    headerLength: 20,
    diffserv: 2,
    length: 557,
    identification: 0,
    flags: any[], // IPFlags[]
    fragmentOffset: 0,
    ttl: 64,
    protocol: 6,
    headerChecksum: 53755,
    saddr: any[], // IPv4Addr[]
    daddr: any[],
    protocolName: any, // undefined
    payload: any[] // TCP[]
  }