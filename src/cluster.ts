import { createServer, IncomingMessage, ServerResponse } from "node:http";
import os from "os";
import cluster from "cluster";

import {
  getAllUsers,
  findUser,
  createUser,
  updateUser,
  deleteUser,
} from "./router";

import { METHODS, PATH, SERVER_MESSAGES, REG_EXPS } from "./constants";

export const server = createServer(
  async (request: IncomingMessage, response: ServerResponse) => {
    try {
      if (!request.url) {
        return;
      }

      if (request.url === PATH && request.method === METHODS.GET) {
        await getAllUsers(request, response);
      } else if (request.url.match(REG_EXPS.isUrlContainsUserId)) {
        const userId = request.url.split("/")[3];
        if (request.method === "GET") {
          await findUser(request, response, userId);
        } else if (request.method === "PUT") {
          await updateUser(request, response, userId);
        } else if (request.method === "DELETE") {
          await deleteUser(request, response, userId);
        }
      } else if (request.url === PATH && request.method === METHODS.POST) {
        await createUser(request, response);
      } else {
        response.writeHead(404, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: SERVER_MESSAGES.routeError }));
      }
    } catch (e) {
      console.log(e);
      response.writeHead(500, { "Content-Type": "application/json" });
      response.write(JSON.stringify({ message: SERVER_MESSAGES.serverError }));
      response.end();
    }
  }
);

const PORT = process.env.PORT || 4000;
const PID = process.pid;
const numberOfCPUs = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < numberOfCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  server.listen(PORT, () =>
    console.log(
      `${SERVER_MESSAGES.startServer} ${PORT},${SERVER_MESSAGES.processIdentifier} ${PID}`
    )
  );
}
