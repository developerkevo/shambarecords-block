// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import 'mocha';

import { Shambarecords, ShambarecordsController } from '../src';

describe('Shambarecords', () => {
  let adapter: MockControllerAdapter;
  let shambarecordsCtrl: ConvectorControllerClient<ShambarecordsController>;
  
  before(async () => {
    // Mocks the blockchain execution environment
    adapter = new MockControllerAdapter();
    shambarecordsCtrl = ClientFactory(ShambarecordsController, adapter);

    await adapter.init([
      {
        version: '*',
        controller: 'ShambarecordsController',
        name: join(__dirname, '..')
      }
    ]);

    adapter.addUser('Test');
  });
  
  it('should create a default model', async () => {
    const modelSample = new Shambarecords({
      id: uuid(),
      name: 'Test',
      created: Date.now(),
      modified: Date.now()
    });

    await shambarecordsCtrl.$withUser('Test').create(modelSample);
  
    const justSavedModel = await adapter.getById<Shambarecords>(modelSample.id);
  
    expect(justSavedModel.id).to.exist;
  });
});