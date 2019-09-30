# Civic Engagement @ Swarthmore Repository Quickstart

The application is split up into two separate parts. There is a server, which acts as a RESTful API server, and a client. The source code for each is in the folder with the same name.

## Methodologies
* The server is a RESTful API server.
* The server should always respond with one of 3 standardized responses: Success, Failure, Error. The code that defines the shape of these requests are located in server/src/helpers/responses.js. Sending standardized responses allows the client to predictably handle any of the 3 response types.
* Express routes are split up into their functions within the server/src/routes/api folder. For example, authentication gets its own routes file, users get its own route file, as well as projects, pins, etc…
* A route file does not contain any logic to handle the request. This is the job of the controller. Controllers are located in server/src/controllers and follow the same splitting conventions as routes.
* Models are what define the collections within MongoDB (in a relational database like MySQL, a collection is called a table). Models are located in server/src/models
* The root controllers, routes, and models folder all contain an index.js file that imports all of the folder’s files (for example, importing the user routes, project routes, pin routes, etc..) and then exports them from that same file. This allows you to easily import files from other areas of the app, without having to reference the route/controller/model file directly. For example, const { authRoutes } = require(“./routes”) instead of const authRoutes = require(“./routes/api/auth.routes”)
* The Redux state within the client is immutable. This means that it cannot be changed directly. The accepted method to change the redux state is to create a new state within the reducer file, add the information needed, then return the  new object as the new state. This can be pretty confusing, but it’s for good use, and it may be easier to visualize this by looking at the code itself. The reducer functions are located in src/client/store/reducers
All of the Redux files live within src/client/store. This includes redux actions, types, and reducers.

## Running the project locally
* Clone the repository: `git clone https://github.swarthmore.edu/SPEED/civic-engagement-map.git`
* Checkout the refactor branch: `git checkout refactor`
* Install the dependencies using npm or yarn: `cd server && npm install && cd ../client && npm install` should do this in one step
* The server requires a `.env` to work. The `.env` file defines the environment that the server runs in. Copy `.example.env` into a new `.env` file within the server/ directory.
* Fill out `.env` with your environment stuff. 
* I’ve been using MongoDB atlas for the db host, and it’s been working great. Using a cloud based service like this is nice for development because it doesn’t require you to set up a DB server on your local machine. When the project goes into production, we will likely need to create a DB server just for this project.
* The mapbox token requires you to have a mapbox account
* The salt work factor is an integer describing how many iterations a salt goes through during the password generation phase (I think). Nearly every tutorial I’ve gone through online sets this to 11.
* The session secret is a random string of characters that is used to encrypt a user’s session.
* Set the app_port to 8000 as the client is configured to proxy requests to port 8000 automagically. If you want to set the app port to another number, you will also have to change the proxy setting to reflect this in client/package.json.
* Once the .env file is done, run npm start to start the server, or npm start:dev to run the server in dev mode.
* Dev mode will restart the server if there are any changes to the server src files.
* Once the server is running, you will need to start the client. This is as straightforward as issuing an npm start command while in the client directory.
* Once the client is started, you can access it via your web browser at http://localhost:3000

## Resources
### Server Resources
#### ExpressJS
ExpressJS is the web server that is used for the application's rest api.

https://expressjs.com/

#### Mongoose ODM
Mongoose ODM is a package that allows querying, updating, and modifying MongoDB entries much easier. It’s basically an abstraction above the query layer.

https://mongoosejs.com/docs/guide.html

#### Mapbox SDK
The Mapbox SDK package gives Express a way to query the MapBox API easily.

https://github.com/mapbox/mapbox-sdk-js#readme

#### PassportJS
PassportJS is used to handle all of the server's authentication requests. Ie. the controllers for logging a user in, signing a user up, and allowing different authorization to different user groups are all done through passport strategies.

http://www.passportjs.org/

### Client Resources
#### ReactJS

https://reactjs.org/docs/getting-started.html

https://www.codecademy.com/learn/react-101

#### Bootstrap 4
The project does use Bootstrap 4, but this documentation should mostly be a reference for what classes to apply to components, if you need to style them and the documentation in React-Bootstrap is not clear.

https://getbootstrap.com/docs/4.3/getting-started/introduction/

#### React-Bootstrap
This package includes Bootstrap wrapped components for use with React.

https://react-bootstrap.github.io/getting-started/introduction

#### React-Router

https://reacttraining.com/react-router/web/guides/quick-start

### Redux
Redux (along with the React-Redux package) is used to manage application-wide state. For example, if a user is logged in, all of the components should know that the user is logged in, which makes Redux a great solution because it can store that user’s information, tokens, etc. and service it throughout the application.

https://redux.js.org/introduction/getting-started

#### Fetch
I’ve been using Fetch for API calls to the server wherein the resulting component state from the fetched results does not need to be application-wide. An example of this would be getting all projects owned by an individual user within the My Projects component.

https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

#### React-Mapbox-GL
This is a component that all around makes using mapbox easier. The demos are particularly useful.

http://alex3165.github.io/react-mapbox-gl/

### General resources
The react addon for firefox makes inspecting components (and the state of) super easy. I believe there is also an addon for Chrome which does the same things

https://addons.mozilla.org/en-US/firefox/addon/react-devtools/
