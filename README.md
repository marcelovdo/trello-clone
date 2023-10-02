# Trello board clone

A small Trello clone built to study Web development.

## Stack

- *Server:* Node.js, Express, PostgreSQL
- *Client:* React

## Usage:

With Docker installed, just run:

```bash
docker compose up
```

It will run the database, server, client and tests.

The following should run only the containers necessary to access the App:

```bash
docker compose up client
```

And the following should run only the server and the server's test:

```bash
docker compose up test
```

