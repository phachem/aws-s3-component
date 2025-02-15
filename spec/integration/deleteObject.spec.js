/* eslint-disable global-require,func-names */

const fs = require('fs');
const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;

const readFile = require('../../lib/actions/deleteObject');

describe('Delete file', function () {
  this.timeout(50000);
  let configuration;
  let emitter;
  let msg;

  before(async () => {
    if (fs.existsSync('.env')) {
      require('dotenv').config();
    }

    configuration = {
      accessKeyId: process.env.ACCESS_KEY_ID,
      accessKeySecret: process.env.ACCESS_KEY_SECRET,
      bucketName: 'lloyds-dev',
    };
  });

  beforeEach(() => {
    emitter = {
      emit: sinon.spy(),
    };

    msg = { body: { filename: 'AT0000856323' } };
  });

  it('deleting', async () => {
    await readFile.process.call(emitter, msg, configuration, {});
    const result = emitter.emit.getCall(0).args[1];
    expect(result.body.filename).to.eql(msg.body.filename);
  });
});
