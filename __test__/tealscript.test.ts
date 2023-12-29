import { describe, test, expect, beforeAll, beforeEach } from '@jest/globals';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { AirdropClient } from '../contracts/clients/AirdropClient';
import { equal } from 'assert';

const fixture = algorandFixture();

let appClient: AirdropClient;

describe('Tealscript', () => {
  beforeEach(fixture.beforeEach);

  beforeAll(async () => {
    await fixture.beforeEach();
    const { algod, testAccount } = fixture.context;

    appClient = new AirdropClient(
      {
        sender: testAccount,
        resolveBy: 'id',
        id: 0,
      },
      algod
    );

    await appClient.create.createApplication({ airdropValue: 1000 });
  });

  test('get Airdrop value', async () => {
    const airdropValue = await appClient.getAirdropValue({});
    expect(airdropValue.return?.valueOf()).toBe(BigInt(1000));
  });

  test('getAirdropSubscribers', async () => {
    try {
      const airdropSubscribers = await appClient.getAirdropSubscribers({});
      expect(airdropSubscribers.return).toEqual([]);
    } catch (error) {
      console.error(error);
    }
  });

  test('Subscribe to airdrop', async () => {
    const airdropSubscribersList = await appClient.subscribeToList({});
    console.log('airdrop subscibers list', airdropSubscribersList.return);
    expect(airdropSubscribersList.return?.valueOf()).toHaveLength(1);
  });
});
