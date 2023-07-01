import { createServer, IncomingMessage, ServerResponse } from "node:http";

import { getAllUsers, findUser } from "./router";

import { METHODS, PATH, SERVER_MESSAGES, REG_EXPS } from "./constants";

const server = createServer(
  async (request: IncomingMessage, response: ServerResponse) => {
    try {
      if (!request.url) {
        return;
      }
      if (request.url === PATH && request.method === METHODS.GET) {
        await getAllUsers(request, response);
      } else if (
        request.url.match(REG_EXPS.isUrlContainsUserId) &&
        request.method === METHODS.GET
      ) {
        const userId = request.url.split("/")[3];
        if (!userId) {
          return;
        }
        await findUser(request, response, userId);
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

server.listen(PORT, () =>
  console.log(`${SERVER_MESSAGES.startServer} ${PORT}`)
);
