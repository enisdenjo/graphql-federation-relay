import { buildSubgraphSchema } from "@apollo/subgraph";
import fs from "fs";
import { parse } from "graphql";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { decodeGlobalID } from "../util/id.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resolvers = {
  Query: {
    node: (_, { id }) => {
      const { type } = decodeGlobalID(id);
      return { __typename: type, id };
    },
    nodes: (_, { ids }) => {
      return ids.map((id) => {
        const { type } = decodeGlobalID(id);
        return { __typename: type, id };
      });
    },
    _entities: (_, { representations }) => {
      return representations.map((ref) => {
        // Since all our entities just need id, we can return the reference as is
        // The __typename is already included in the reference
        return ref;
      });
    },
  },
  Node: {
    __resolveType(obj) {
      return obj.__typename;
    },
  },
};

export const schema = buildSubgraphSchema([
  {
    typeDefs: parse(
      fs.readFileSync(join(__dirname, "schema.graphql"), "utf-8")
    ),
    resolvers,
  },
]);
