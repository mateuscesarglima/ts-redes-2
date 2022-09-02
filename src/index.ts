import Switch from "./entity/Switch";
import Host from "./entity/Host";
import { print } from "./utils";
import { Constants } from "./constants";

print("INIT SYSTEM");
const switchDevice = new Switch();

const h1 = new Host(`${Constants.startIp}.1`);
const h2 = new Host(`${Constants.startIp}.2`);
const h3 = new Host(`${Constants.startIp}.3`);

//
switchDevice.addLink(h1.port, 1);
switchDevice.addLink(h2.port, 4);
switchDevice.addLink(h3.port, 3);

console.log({ target: "SWITCH", switchDevice, ports: switchDevice.ports });
//

h1.addLink(switchDevice.ports[0]);
h2.addLink(switchDevice.ports[3]);
h3.addLink(switchDevice.ports[2]);

//

h1.send("OI", `${Constants.startIp}.3`);
