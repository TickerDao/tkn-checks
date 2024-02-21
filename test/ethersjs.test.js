// Compatibility tests for ethers.js: https://github.com/ethers-io/ethers.js
const { ethers } = require('ethers');

describe('Ethers.js Contract Interaction', () => {
  let provider, contract, fields;

  beforeAll(async () => {
    provider = new ethers.InfuraProvider(5)
    // provider = new ethers.providers.AlchemyProvider("goerli", "yourAlchemyApiKey");
    contract = new ethers.Contract('0x33410205355Fb4D05F9b6816a0d94642Ff0724dF', [
      'function lookup(string tick) external view returns (tuple(string, string)[] calls)',
    ], provider);
  });

  test('Fetch onchain addresses', async () => {
    const tick = 'wbtc';
    let fields = Object.fromEntries(await contract.lookup(ethers.ensNormalize(tick), {enableCcipRead: true}));
    expect(fields).toBeDefined();
    expect(fields).toHaveProperty('$eth', '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599');

    // fields = Object.fromEntries();
    
    // Assuming the structure of fields object is {key1: value1, key2: value2, ...}
    // expect(fields).toBeDefined();
    // expect(typeof fields).toBe('object');
    // expect(Object.keys(fields)).toContain('key1');
    // expect(fields.key1).toBeDefined();
    // expect(fields.key2).toBeDefined();
  });

  test('Fetch onchain metadata', async () => {
    const tick = 'rpl';
    const result = await contract.lookup(ethers.ensNormalize(tick), {enableCcipRead: true})
    let fields = Object.fromEntries(result);
    expect(fields).toBeDefined();
    expect(fields).toHaveProperty('name', 'Rocket Pool');

    // fields = Object.fromEntries();
    
    // Assuming the structure of fields object is {key1: value1, key2: value2, ...}
    // expect(fields).toBeDefined();
    // expect(typeof fields).toBe('object');
    // expect(Object.keys(fields)).toContain('key1');
    // expect(fields.key1).toBeDefined();
    // expect(fields.key2).toBeDefined();
  });

//   test('Fields object should handle empty results gracefully', async () => {
//     const tick = 'nonExistentTick';
//     fields = Object.fromEntries(await contract.lookup(ethers.utils.id(tick), {enableCcipRead: true}));
    
//     // Assuming an empty result would still return an object, but empty
//     expect(fields).toBeDefined();
//     expect(Object.keys(fields).length).toBe(0);
//   });

//   test('Fields object should correctly enable CCIP read', async () => {
//     const tick = 'ccipEnabledTick';
//     fields = Object.fromEntries(await contract.lookup(ethers.utils.id(tick), {enableCcipRead: true}));
    
//     // Assuming CCIP read would affect the structure or values within the fields object
//     // This is a placeholder test; specifics would depend on contract implementation
//     expect(fields).toBeDefined();
//     expect(fields.ccipReadEnabled).toBe(true);
//   });
});

describe('Ethers.js Contract Interaction on Sepolia Testnet', () => {
  let provider, contract, fields;

  beforeAll(async () => {
    provider = new ethers.InfuraProvider(11155111)

    contract = new ethers.Contract('0x83a133f0622cf2a68d7affabf862637b08d76ee1', [
      'function lookup(string tick) external view returns (tuple(string, string)[] calls)',
    ], provider);
  });

  test('Fetch onchain addresses', async () => {
    const tick = 'wbtc';
    let fields = Object.fromEntries(await contract.lookup(ethers.ensNormalize(tick), {enableCcipRead: true}));
    expect(fields).toBeDefined();
    expect(fields).toHaveProperty('.eth', '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599');

  });

  test('Fetch onchain metadata', async () => {
    const tick = 'rpl';
    const result = await contract.lookup(ethers.ensNormalize(tick), {enableCcipRead: true})
    let fields = Object.fromEntries(result);
    expect(fields).toBeDefined();
    expect(fields).toHaveProperty('name', 'Rocket Pool');
  });

});