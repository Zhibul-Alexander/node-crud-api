import fs from "fs/promises";
import { IncomingMessage } from "node:http";

export const updateDataToDB = async (filename: string, content: any) => {
  try {
    await fs.writeFile(filename, JSON.stringify(content), "utf-8");
    console.log("Data written to file successfully.");
  } catch (e) {
    console.error("Error writing data to file:", e);
  }
};

export const getRequestBody = async (request: IncomingMessage) => {
  try {
    let body: string = "";
    await new Promise((resolve) => {
      request.on("data", (data) => {
        body += data.toString();
      });
      request.on("end", () => {
        resolve(body);
      });
    });
  } catch (e) {
    console.error(e);
  }
};
