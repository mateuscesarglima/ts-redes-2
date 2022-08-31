export enum PacketHeaderEnum {
  ArpRequest = "ARP_REQUEST",
  ArpReply = "ARP_REPLY",
}

export default interface IPacket {
  originIp: string;
  destinationIp: string;
  originMac: string;
  destinationMac?: string;
  payload: any;
  header?: PacketHeaderEnum;

  generate?: (params: IPacket) => string;
}
