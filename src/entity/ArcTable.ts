import IArcTable, { TableData } from "../interface/ArcTable";

export default class ArcTable implements IArcTable {
  public data: TableData[];

  constructor({ data }: IArcTable) {
    this.data = data;
  }

  load(port: number, macOrIp: string, isSwitch = false): TableData[] {
    const key = isSwitch ? "ip" : "mac";

    const findData = this.data.find(
      (el) => el[isSwitch ? "mac" : "ip"] === macOrIp
    );

    if (!findData)
      this.data.push({
        port,
        [key]: macOrIp,
      });

    return this.data;
  }
}
