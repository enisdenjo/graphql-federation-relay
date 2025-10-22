import { defineConfig, type GatewayPlugin } from "@graphql-hive/gateway";
import { executorFromSchema } from "@graphql-tools/executor";

// @ts-expect-error no typedefs
import { schema } from "./services/node/schema.mjs";

export const gatewayConfig = defineConfig({
  supergraph: "./supergraph.graphql",
  plugins: () => {
    let nodeExecSet = false;
    return [
      {
        onSubgraphExecute({ setExecutor, subgraphName }) {
          if (subgraphName !== "node-resolver-service") return;
          if (nodeExecSet) return; // set executor will be reused, needs to run only once
          nodeExecSet = true;
          setExecutor(executorFromSchema(schema));
        },
      } as GatewayPlugin,
    ];
  },
});
