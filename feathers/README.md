# feathers-server

> The API server for the Civic Engagement project at Swarthmore College.

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Setup

1. Clone the repository onto your server.
2. Run the initialisation script in `bin/init/init.js`. You will need to supply `adminemail` and `adminpassword` arguments.

  ```
  node ./bin/init --adminemail somebody@example.org --adminpassword secretpassword
  ```

3. Head to your browser `http://localhost:3000` and login :)

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/feathers-server
    npm install
    ```

3. Start your app

    ```
    npm start
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
