const { assert } = require('chai');

const Buyer = artifacts.require('../build/contracts/Buyer.sol');
const Storage = artifacts.require('../build/contracts/Buyer.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('Buyer', ([deployer, seller, buyer]) => { 
    let storage;
    let buyerContract;

    before (async () => {
        storage = await Storage.deployed();
        buyerContract = await Buyer.deployed();
    });
    
    describe('deployment', async() => {
        it('deploys successfully', async () => {
            const storageAddress = await storage.address;
            const buyerAddress = await buyerContract.address;

            assert.notEqual(storageAddress, 0x0);
            assert.notEqual(buyerAddress, 0x0);
        })
    });
});