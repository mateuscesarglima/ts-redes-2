import { Constants } from "./constants";
import ArcTable from "./entity/ArcTable";
import Host from "./entity/Host";
import Switch from "./entity/Switch";
import { generateHex, print } from "./utils";

const switchDevice = new Switch({
  qtdPorts: 4,
  connections: [],
  send: () => {},
  arcTable: new ArcTable({ data: [], load: () => {} }),
});

// const targets = Array.from({ length: switchDevice.qtdPorts });

const hosts = Array.from(
  { length: switchDevice.qtdPorts },
  (x, idx) =>
    new Host({
      ip: `${Constants.startIp}.${idx + 1}`,
      mac: generateHex(16),
      connection: switchDevice,
      arcTable: new ArcTable({ data: [], load: () => {} }),
    })
);

print("INIT SYSTEM");

console.log({ step: "set switch connections" });
switchDevice.connections = hosts;

console.log({ step: "host sending a message" });
hosts[0].send(`${Constants.startIp}.3`, "oi");
console.log("--------------------------------------");
// console.log({ step: "host sending a 2nd message" });
// hosts[0].send(`${Constants.startIp}.3`, "tudo bem?");
