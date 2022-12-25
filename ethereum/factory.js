import web3 from "./web3";
import campaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    campaignFactory.abi,
    '0x85f9e5d6648Df7b06a5c7c3AB3b1FbD26453a02D'
);

export default instance;