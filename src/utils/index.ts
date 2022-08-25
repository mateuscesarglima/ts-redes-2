import IPackage from "../interface/Package";

export function generateHex(size: number): string {
  return Array.from({ length: size }, (x, idx) => {
    const char = Math.floor(Math.random() * 16).toString(16);

    return `${char}${char}${idx !== size - 1 ? ":" : ""}`;
  }).join("");
}

export const encodeMessage = (payload: any): string => {
  let encoded = Buffer.from(JSON.stringify(payload)).toString("base64");
  return encoded;
};
export const decodeMessage = (message: any): IPackage => {
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
    `
  |----------------------------------------------------|
  |                                                    |
  |                                                    |
  ${message}
  |                                                    |
  |                                                    |
  |----------------------------------------------------|
  `
  );
};
