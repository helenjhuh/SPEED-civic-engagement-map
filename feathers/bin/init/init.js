const { host, port } = require('../../config/default.json');
const io = require('socket.io-client');
const Feathers = require('@feathersjs/feathers');
const authClient = require('@feathersjs/authentication-client');
const socketio = require('@feathersjs/socketio-client');
const backend = `http://${host}:${port}`;
const socket = io(backend);
const feathers = Feathers();
const meow = require('meow');

const cli = meow(`
  Usage
  $ woof init <adminemail> <adminpassword>

  Options
    --adminemail, -e The email for the admin account  
    --adminpassword, -p The password for the admin account 

  Examples
    $ woof init --adminemail someuser@gmail.com --adminpassword somesecretpassword 

`, {
  flags: {
    adminemail: { type: 'string', alias: 'e' },
    adminpassword: { type: 'string', alias: 'p' }
  }
});

const handleCLI = async (command, flags) => {
  try {

    const {adminemail = 'aweed1@swarthmore.edu', adminpassword = 'secret'} = flags;
    
    // Configure the feathers client
    feathers.configure(socketio(socket));

    feathers.configure(
      authClient({ storageKey: 'accessToken' })
    );

    const userService = feathers.service('users');

    const createAdminUser = async user => {
      try {
        const newUser = await userService.create(user);
        return { newUser };
      } catch(error) {
        return error;  
      }
    }

    const adminUser = await createAdminUser({
      first: 'Admin',
      last: 'User',
      college: 'none',
      permissions: ['Admin'],
      email: adminemail,
      password: adminpassword
    });

    console.log(`Created admin user. You can now log in with the credentials\ \n ${JSON.stringify(adminUser, null, 2)}`)

    process.exit();
  } catch(error) {
    throw new Error(error);
  }
};

handleCLI(cli.input, cli.flags);
