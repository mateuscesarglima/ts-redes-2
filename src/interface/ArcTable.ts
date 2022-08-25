export default interface IArcTable {
  data: { port: number; mac: string }[];

  load: (port: number, mac: string) => void;
}
