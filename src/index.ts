import { Constants } from "./constants";
import ArcTable from "./entity/ArcTable";
import Host from "./entity/Host";
import Switch from "./entity/Switch";
import { generateHex, print } from "./utils";

const switchDevice = new Switch({
  qtdPorts: 4,
  connections: [],
  send: () => {},
  table: new ArcTable({ data: [], load: () => [] }),
});

const hosts = Array.from(
  { length: switchDevice.qtdPorts },
  (x, idx) =>
    new Host({
      ip: `${Constants.startIp}.${idx + 1}`,
      mac: generateHex(16),
      connection: switchDevice,
      arcTable: new ArcTable({ data: [], load: () => [] }),
    })
);

print("INIT SYSTEM");

switchDevice.connections = hosts;

const message = {
  originIp: hosts[0].ip,
  originMac: hosts[0].mac,
  payload: "OI",
  destinationIp: `${Constants.startIp}.3`,
};

hosts[0].send(message);

print("SHOW TABLES");
hosts.forEach((host, idx) => {
  console.log({ device: `HOST ${idx + 1}`, table: host.table });
});
console.log({ device: "SWITCH", table: switchDevice.table?.data });
print("SYSTEM END");
