import IPacket from "../interface/Packet";

export enum Colors {
  Reset = "\x1b[0m",
  Bright = "\x1b[1m",
  Dim = "\x1b[2m",
  Underscore = "\x1b[4m",
  Blink = "\x1b[5m",
  Reverse = "\x1b[7m",
  Hidden = "\x1b[8m",

  FgBlack = "\x1b[30m",
  FgRed = "\x1b[31m",
  FgGreen = "\x1b[32m",
  FgYellow = "\x1b[33m",
  FgBlue = "\x1b[34m",
  FgMagenta = "\x1b[35m",
  FgCyan = "\x1b[36m",
  FgWhite = "\x1b[37m",

  BgBlack = "\x1b[40m",
  BgRed = "\x1b[41m",
  BgGreen = "\x1b[42m",
  BgYellow = "\x1b[43m",
  BgBlue = "\x1b[44m",
  BgMagenta = "\x1b[45m",
  BgCyan = "\x1b[46m",
  BgWhite = "\x1b[47m",
}

export function generateHex(): string {
  const size = 16;
  return Array.from({ length: size }, (x, idx) => {
    const char = Math.floor(Math.random() * 16).toString(16);

    return `${char}${char}${idx !== size - 1 ? ":" : ""}`;
  }).join("");
}

export const encodeMessage = (payload: any): string => {
  let encoded = Buffer.from(JSON.stringify(payload)).toString("base64");
  return encoded;
};
export const decodeMessage = (message: any): IPacket => {
  JSON.parse(
    Buffer.from(decodeURIComponent(message), "base64").toString("utf-8")
  );

  let decoded = JSON.parse(
    Buffer.from(decodeURIComponent(message), "base64").toString("utf-8")
  );
  return decoded;
};

export const print = (message: string): void => {
  console.log(
    Colors.BgYellow,
    `
  ______________________________________________________
  |                                                    |
  |                                                    |
  ${message}
  |                                                    |
  |                                                    |
  ______________________________________________________
  `,
    Colors.Reset
  );
};
