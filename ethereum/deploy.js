const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const campiledFactory = require('./build/CampaignFactory.json');

const MNEMONIC_KEY = 'buyer whisper baby anxiety glue cactus gas calm treat appear want vintage';
const INFURA_URL = 'https://goerli.infura.io/v3/7468745d5c7a47a7b3ecc624c823520b';

const provider = new HDWalletProvider(
  MNEMONIC_KEY,
  INFURA_URL
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  const result = await new web3.eth.Contract(campiledFactory.abi)
    .deploy({ data: campiledFactory.evm.bytecode.object})
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address); // 0xd5c38eB1C304967985d0170aFf507735C3AE7D54
  provider.engine.stop();
};
deploy();
