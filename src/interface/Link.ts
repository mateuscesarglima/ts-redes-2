import INode from "./Node";

interface ILink {
  port1: INode["connection"];
  port2: INode["connection"];

  add: (port1: INode["connection"], port2: INode["connection"]) => void;

  send: (device: INode["connection"], packet: string) => void;
}

export default ILink;
