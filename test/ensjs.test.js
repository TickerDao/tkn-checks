// Testing ENS.js V3: https://github.com/ensdomains/ensjs-v3
const { http } = require('viem');
const { mainnet } = require('viem/chains');
const { createEnsPublicClient } = require('@ensdomains/ensjs');

// Define reusable fields in a configuration object
const recordConfig = {
  name: (token) => `${token}.tkn.eth`,
  coins: ['ETH', 'SOL', 'OP', 'ARB1', 'AVAXC', 'BNB', 'CRO', 'FTM', 'GNO', 'MATIC', 'NEAR', 'TRX', 'ZIL', 'BASE'],
  texts: [
    'name', 'description', 'avatar', 'url', 'notice', 'decimals', 'com.twitter', 'com.github', 'com.discord',
    'version', 'symbol', 'tokenSupply', 'circulatingSupply', 'chainID', 'coinType', 'forum', 'governance',
    'snapshot', 'abi', 'git', 'governanceContract', 'canonicalDexPool'
  ],
  contentHash: true
};

describe('ENS.js Library Tests', () => {
  let client;

  beforeAll(() => {
    // Initialize ENS public client before all tests
    client = createEnsPublicClient({ chain: mainnet, transport: http() });
  });

  test('ENS Public Client is created', () => {
    expect(client).toBeDefined();
  });

  test('Retrieve token records', async () => {
    const token = 'wbtc';
    const records = await client.getRecords({
      name: recordConfig.name(token),
      coins: recordConfig.coins,
      texts: recordConfig.texts,
      contentHash: recordConfig.contentHash
    });

    // Check if records object is defined
    expect(records).toBeDefined();

    // Adjusted expectations based on the provided output structure
    expect(records.texts).toContainEqual(expect.objectContaining({ key: 'name', value: 'Wrapped Bitcoin' }));
    expect(records.texts).toContainEqual(expect.objectContaining({ key: 'description', value: 'Wrapped bitcoin token with BTC held in reserve' }));
    expect(records.coins.length).toBeGreaterThan(0); // Check if coins array is not empty
    expect(records.contentHash).toBeNull(); // Adjusted based on the provided output
  });



  test('Retrieve records from names in a hybrid resolver', async () => {
    const token = 'op'; // Chainlink reverse resolver
    const records = await client.getRecords({
      name: recordConfig.name(token),
      coins: recordConfig.coins,
      texts: recordConfig.texts,
      contentHash: recordConfig.contentHash
    });

    // Check if records object is defined
    expect(records).toBeDefined();

    // Adjusted expectations based on the provided output structure
    expect(records.texts).toContainEqual(expect.objectContaining({ key: 'name', value: 'Optimism' }));
    expect(records.coins.length).toBeGreaterThan(0); // Check if coins array is not empty
    expect(records.contentHash).toBeNull(); // Adjusted based on the provided output
  });

  test('Retrieve dweb contenthash from a name and verify decoded value', async () => {
    const token = 'tkn'; // Chainlink reverse resolver
    const records = await client.getRecords({
      name: recordConfig.name(token),
      coins: recordConfig.coins,
      texts: recordConfig.texts,
      contentHash: recordConfig.contentHash
    });

    // Check if records object is defined
    expect(records).toBeDefined();

    // Adjusted expectations based on the provided output structure
    expect(records.coins.length).toBeGreaterThan(0); // Check if coins array is not empty
    // Verify if contentHash.decoded matches the expected IPFS hash
    expect(records.contentHash.decoded).toEqual('bafybeibeyaoc7y4nvoleq5x3mo3o4a4jazhvrogu236indpzhqkzbaxowu');
  });

  test('Retrieve reverse resolved address', async () => {
    const token = '0xb3654dc3D10Ea7645f8319668E8F54d2574FBdC8.ftm'; // Chainlink reverse resolver
    const records = await client.getRecords({
      name: recordConfig.name(token),
      coins: recordConfig.coins,
      texts: recordConfig.texts,
      contentHash: recordConfig.contentHash
    });

    // Check if records object is defined
    expect(records).toBeDefined();

    // Adjusted expectations based on the provided output structure
    expect(records.texts).toContainEqual(expect.objectContaining({ key: 'name', value: 'Chainlink' }));
    expect(records.texts).toContainEqual(expect.objectContaining({ key: 'description', value: 'A data oracle protocol' }));
    expect(records.coins.length).toBeGreaterThan(0); // Check if coins array is not empty
    expect(records.contentHash).toBeNull(); // Adjusted based on the provided output
  });

  test('Retrieve reverse resolved address', async () => {
    const token = 'dai.ftm'; // Chainlink reverse resolver
    const records = await client.getRecords({
      name: recordConfig.name(token),
      coins: recordConfig.coins,
      texts: recordConfig.texts,
      contentHash: recordConfig.contentHash
    });

    // Check if records object is defined
    expect(records).toBeDefined();

    // Adjusted expectations based on the provided output structure
    expect(records.texts).toContainEqual(expect.objectContaining({ key: 'name', value: 'Dai' }));
    expect(records.texts).toContainEqual(expect.objectContaining({ key: 'description', value: 'Collateral backed USD stablecoin by MakerDao' }));
    expect(records.coins.length).toBeGreaterThan(0); // Check if coins array is not empty
    expect(records.contentHash).toBeNull(); // Adjusted based on the provided output
  });
});