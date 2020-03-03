const assert = require('assert');
const app = require('../../src/app');

describe('\'pins\' service', () => {
  it('registered the service', () => {
    const service = app.service('pins');

    assert.ok(service, 'Registered the service');
  });
});
