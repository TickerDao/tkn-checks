// Testing wagmi core https://wagmi.sh/core/getting-started

const { http, createConfig, readContract } = require('@wagmi/core');
const { mainnet, sepolia } = require('@wagmi/core/chains');

let contractAddress = '0x75C29179B30a24f2fD6cdA391d0bBdF7bd1d7cA5';
const tnsABI = [{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"string[]","name":"urls","type":"string[]"},{"internalType":"bytes","name":"callData","type":"bytes"},{"internalType":"bytes4","name":"callbackFunction","type":"bytes4"},{"internalType":"bytes","name":"extraData","type":"bytes"}],"name":"OffchainLookup","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes","name":"dnsname","type":"bytes"}],"name":"BasenameChanged","type":"event"},{"anonymous":false,"inputs":[],"name":"FieldsChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"string[]","name":"names","type":"string[]"},{"internalType":"uint64[]","name":"coinTypes","type":"uint64[]"}],"name":"addCoins","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string[]","name":"names","type":"string[]"}],"name":"addText","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"basename","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"fieldNames","outputs":[{"internalType":"string[]","name":"names","type":"string[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"tick","type":"string"}],"name":"lookup","outputs":[{"components":[{"internalType":"string","name":"k","type":"string"},{"internalType":"string","name":"v","type":"string"}],"internalType":"struct TNS.KV[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"response","type":"bytes"},{"internalType":"bytes","name":"wrappedData","type":"bytes"}],"name":"lookupCallback","outputs":[{"components":[{"internalType":"string","name":"k","type":"string"},{"internalType":"string","name":"v","type":"string"}],"internalType":"struct TNS.KV[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"node","type":"bytes32"}],"name":"makeCalls","outputs":[{"internalType":"bytes[]","name":"fs","type":"bytes[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"i","type":"uint256"}],"name":"removeFieldAt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"dnsname","type":"bytes"}],"name":"setBasename","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"x","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

test('Fetch L1Resolver resolved data', async () => {
    const tick = 'op';
    const data = await readContract(config, {
        address: contractAddress,
        abi: tnsABI,
        functionName: 'lookup',
        args: [tick]
    });
    let fields = data.reduce((obj, { k, v }) => ({ ...obj, [k]: v }), {});
    expect(fields).toBeDefined();
    expect(fields).toHaveProperty('name', 'Optimism');
  });

test('Fetch onchain metadata', async () => {
    const tick = 'rpl';
    const data = await readContract(config, {
        address: contractAddress,
        abi: tnsABI,
        functionName: 'lookup',
        args: [tick]
    });

    let fields = data.reduce((obj, { k, v }) => ({ ...obj, [k]: v }), {});
    expect(fields).toBeDefined();
    expect(fields).toHaveProperty('name', 'Rocket Pool');
    expect(fields).toHaveProperty('avatar', 'https://gateway.tkn.xyz/ipfs/bafybeie7wxtjqklcq63s5rowbcv75ut3rea6cijz2465p3uwdjikpchhji');
 });

 test('Fetch gateweay metadata', async () => {
    const tick = 'frame';
    const data = await readContract(config, {
        address: contractAddress,
        abi: tnsABI,
        functionName: 'lookup',
        args: [tick]
    });
    let fields = data.reduce((obj, { k, v }) => ({ ...obj, [k]: v }), {});
    expect(fields).toBeDefined();
    expect(fields).toHaveProperty('name', 'Frame Token');
  });


  test('Fetch gateway reverse resolution', async () => {
    const tick = '0xb3654dc3D10Ea7645f8319668E8F54d2574FBdC8.ftm';
    const data = await readContract(config, {
        address: contractAddress,
        abi: tnsABI,
        functionName: 'lookup',
        args: [tick]
    });
    let fields = data.reduce((obj, { k, v }) => ({ ...obj, [k]: v }), {});
    expect(fields).toBeDefined();
    expect(fields).toHaveProperty('name', 'Chainlink');
  });

  test('Fetch sidechain ticker', async () => {
    const tick = 'dai.ftm';
    const data = await readContract(config, {
        address: contractAddress,
        abi: tnsABI,
        functionName: 'lookup',
        args: [tick]
    });
    let fields = data.reduce((obj, { k, v }) => ({ ...obj, [k]: v }), {});
    expect(fields).toBeDefined();
    expect(fields).toHaveProperty('name', 'Dai');
  });

