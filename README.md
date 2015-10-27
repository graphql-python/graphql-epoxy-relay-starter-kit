# Graphql-Epoxy & Relay Starter Kit

This is a fork of the Relay Starter Kit, repurposed to let you get started using 
[`graphql-epoxy`](https://github.com/graphql-python/graphql-epoxy) with `relay`.

This kit includes an app server, a python GraphQL server, and a transpiler that you can use to get started building an app with Relay. 
For a walkthrough, see the [Relay tutorial](https://facebook.github.io/relay/docs/tutorial.html).

## Installation

```
npm install
npm run install-python-deps
```

## Running

Start a local server:

```
npm start
```

## Developing

Any changes you make to files in the `js/` directory will cause the server to
automatically rebuild the app and refresh your browser.

If at any time you make changes to `server/schema.py`, restart the server.

## License

Relay Starter Kit is [BSD licensed](./LICENSE). We also provide an additional [patent grant](./PATENTS).
