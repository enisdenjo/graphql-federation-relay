import Fastify from "fastify";
import mercurius from "mercurius";
import { schema } from "./schema.mjs";

import { NODE_RESOLVER_PORT } from "./config.mjs";

const app = Fastify();

app.register(mercurius, {
  schema,
  federationMetadata: true, // Enables Federation support
  graphiql: true,
});

export const startServer = async () => {
  try {
    await app.listen({ port: NODE_RESOLVER_PORT });
    console.log(
      `🚀 Node Resolver Service running at http://localhost:${NODE_RESOLVER_PORT}/graphql`
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Only start the server if this file is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}

export { app };
