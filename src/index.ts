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
switchDevice.addLink(h1, 1);
switchDevice.addLink(h2, 2);
switchDevice.addLink(h3, 3);

console.log({ target: "SWITCH", hostLink: switchDevice.link });
//

h1.addLink(switchDevice);
h2.addLink(switchDevice);
h3.addLink(switchDevice);

console.log({ target: "HOST", hostLink: h1.link });
//

h1.send("OI", `${Constants.startIp}.3`);
