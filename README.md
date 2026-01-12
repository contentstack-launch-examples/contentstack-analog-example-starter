# Analogjs

This project was generated with [Analog](https://analogjs.org), the fullstack meta-framework for Angular.

## Setup

Run `npm install` to install the application dependencies.

## Development

Run `npm start` for a dev server. Navigate to `http://localhost:5173/`. The application automatically reloads if you change any of the source files.

## Build

Run `npm run build` to build the client/server project. The client build artifacts are located in the `dist/analog/public` directory. The server for the API build artifacts are located in the `dist/analog/server` directory.

## Test

Run `npm run test` to run unit tests with [Vitest](https://vitest.dev).

## Environment Variables

### Deploy Hook URL

To use the Deploy Hook feature, set the `VITE_DEPLOY_HOOK_URL` environment variable:

**For Local Development:**
Create a `.env` file in the root directory:
```
VITE_DEPLOY_HOOK_URL=https://dev11-app.csnonprod.com/launch-api/manage/deploy/6964ba8d0a227c0fd07332f3
```

**For Contentstack Launch:**
1. Go to Launch > Environments > Settings > Environment Variables
2. Add a new environment variable:
   - Key: `VITE_DEPLOY_HOOK_URL`
   - Value: `https://dev11-app.csnonprod.com/launch-api/manage/deploy/6964ba8d0a227c0fd07332f3`

The Deploy Hook URL can be found in Launch > Environments > Settings > Deploy Hooks.

For more information, see the [Contentstack Deploy Hooks documentation](https://www.contentstack.com/docs/developers/launch/deploy-hooks).

## Community

- Visit and Star the [GitHub Repo](https://github.com/analogjs/analog)
- Join the [Discord](https://chat.analogjs.org)
- Follow us on [Twitter](https://twitter.com/analogjs)
- Become a [Sponsor](https://github.com/sponsors/brandonroberts)
