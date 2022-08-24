import IArcTable from "../interface/ArcTable";

export default class ArcTable implements IArcTable {
  public data: { port: number; mac: string }[];

  constructor({ data }: IArcTable) {
    this.data = data;
  }

  load(port: number, mac: string): { port: number; mac: string }[] {
    const findData = this.data.find((el) => el.mac === mac);

    if (!findData) this.data.push({ port, mac });

    return this.data;
  }
}
