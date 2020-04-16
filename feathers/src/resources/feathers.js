import io from 'socket.io-client';
import Feathers from '@feathersjs/feathers';
import authClient from '@feathersjs/authentication-client';
import socketio from '@feathersjs/socketio-client';

const backend = 'http://civicengagement.aws-dev.swarthmore.edu:8080';
const socket = io(backend);
const feathers = Feathers();

feathers.configure(socketio(socket));

feathers.configure(
    authClient({
        storage: window.localStorage,
        storageKey: 'accessToken'
    })
);

const services = {
    users: feathers.service('users'),
    roles: feathers.service('roles'),
    projects: feathers.service('projects'),
    pins: feathers.service('pins'),
    photos: feathers.service('photos'),
    mapbox: feathers.service('mapbox'),
    addresses: feathers.service('addresses')
};

export { feathers as default, socket, services };
