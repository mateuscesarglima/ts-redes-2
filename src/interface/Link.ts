import INode from "./Node";

interface ILink extends INode {
  port1: INode["connection"];
  port2: INode["connection"];
}

export default ILink;
