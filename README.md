# Federated GraphQL Newsfeed with Relay

![Image](https://github.com/user-attachments/assets/dc381167-562d-43d6-be99-273bf77c4a53)

This project extends the original [Relay Newsfeed example](https://github.com/relayjs/relay-examples/tree/main/newsfeed) to demonstrate a federated GraphQL architecture using Node resolver pattern. It showcases how to implement Global Object Identification in a federated GraphQL setup while maintaining the powerful features of Relay.

## Architecture Overview

The application implements a federated GraphQL architecture with:

- A main business service handling core domain logic (easily extensible to multiple business services)
- A dedicated Node resolver service implementing the [Global Object Identification Specification](https://graphql.org/learn/global-object-identification/)
- A GraphQL Hive Gateway that composes the federated schema
- A Relay-powered React frontend
- An image processing service for asset optimization (used in the app to showcase fragment arguments)

## Development Setup

This is a development-focused example project demonstrating the integration of Relay with GraphQL Federation. To get started:

1. Clone the repository
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development environment:
   ```sh
   npm run dev
   ```

This will concurrently start all necessary services:

- 👉 **Frontend: [http://localhost:3000](http://localhost:3000)**
- GraphQL Hive Gateway: [http://localhost:4000](http://localhost:4000)
- Business Service: [http://localhost:8081](http://localhost:8081)
- Image Processing Service: [http://localhost:3003](http://localhost:3003)

## Available Development Commands

- `npm run dev` - Starts all services concurrently
- `npm run watch-webpack` - Runs webpack dev server for frontend
- `npm run watch-relay` - Watches for changes and regenerates Relay artifacts
- `npm run watch-hive-gateway` - Runs the federation gateway
- `npm run watch-supergraph` - Watches and rebuilds the supergraph schema
- `npm run watch-business` - Runs the business service with hot reload
- `npm run watch-image-server` - Runs the image processing service
- `npm run relay` - One-time generation of Relay artifacts
- `npm run build` - Build the application
- `npm run tsc` - Type checking
- `npm run prettier` - Code formatting
- `npm run lint` - Code linting

## Project Structure

- `/src` - React frontend application
  - `/components` - React components
  - `/relay` - Relay configuration and environment
- `/services` - GraphQL Federation services
  - `/business` - Main business logic service (template for additional business services)
  - `/node` - Node resolver implementation
- `/supergraph` - Federation composition logic
- `webpack.config.js` - Webpack configuration with dev server proxies
- `relay.config.json` - Relay compiler configuration
- `tsconfig.json` - TypeScript configuration
- `babel.config.json` - Babel configuration for React and Relay

## Global Object Identification

This example implements the [Global Object Identification Specification](https://graphql.org/learn/global-object-identification/) in a federated architecture. The Node resolver service provides a unified way to resolve any object by its global ID, while the business services maintain the actual data.

Key implementation details:

- Global IDs are base64 encoded strings combining type and local ID
- The Node interface is implemented across federated services
- The Node resolver service provides centralized object resolution
- Multiple business services can implement their own types while maintaining global identification

### Adding New Business Services

The architecture is designed to be extensible. To add a new business service:

1. Copy the template from `/services/business`
2. Define your service-specific schema extending the Node interface
3. Implement resolvers for your types
4. Add the service to the `SERVICES` array in `/supergraph/index.mjs`
5. Update the gateway configuration if needed

The Node resolver pattern shines in this setup as it provides a unified way to resolve objects across all business services while maintaining clean separation of concerns.

In this example, `node` field is queried for fetching comments on each story (`StoryCommentsSection` component). Additionally it is also used when hovering over user avatars (`PosterDetailsHovercardContents` component)

## Additional Resources

- [Relay Documentation](https://relay.dev)
- [GraphQL Federation](https://www.apollographql.com/docs/federation/)
- [Global Object Identification in GraphQL](https://graphql.org/learn/global-object-identification/)
- [GraphQL Hive](https://the-guild.dev/graphql/hive)
