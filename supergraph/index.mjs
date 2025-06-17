import { parse } from "graphql";
import {
  composeServices,
  compositionHasErrors,
} from "@theguild/federation-composition";
import { readFileSync, writeFileSync } from "fs";
import { BUSINESS_SERVICE_PORT } from "../services/business/config.mjs";
import {
  getStitchedSchemaFromManagedFederation,
  getStitchedSchemaFromSupergraphSdl,
} from "@graphql-tools/federation";
import { printSchemaWithDirectives } from "@graphql-tools/utils";

// Configuration for each service
const SERVICES = [
  {
    name: "business-service",
    schemaPath: "./services/business/schema.graphql",
    port: BUSINESS_SERVICE_PORT,
  },
];

// Create service configurations for composition
const serviceConfigs = SERVICES.map(({ name, schemaPath, port }) => ({
  name,
  typeDefs: parse(readFileSync(schemaPath, "utf-8")),
  url: `http://localhost:${port}/graphql`,
}));

const result = composeServices(serviceConfigs);

const schema = getStitchedSchemaFromSupergraphSdl({
  ...result,
  globalObjectIdentification: true,
});

if (compositionHasErrors(result)) {
  console.error(result.errors);
} else {
  writeFileSync("./supergraph.graphql", result.supergraphSdl);
  console.log("Supergraph SDL has been saved to supergraph.graphql");
  writeFileSync("./schema.graphql", printSchemaWithDirectives(schema));
  console.log("Gateway schema SDL has been saved to schema.graphql");
}
