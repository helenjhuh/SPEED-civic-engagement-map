const assert = require('assert');
const app = require('../../src/app');

describe('\'mapbox\' service', () => {
  it('registered the service', () => {
    const service = app.service('mapbox');

    assert.ok(service, 'Registered the service');
  });
});
