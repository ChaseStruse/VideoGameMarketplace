const { assert } = require('chai');

const User = artifacts.require('../build/contracts/User.sol');
const Storage = artifacts.require('../build/contracts/Storage.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('User', ([deployer, seller, buyer]) => { 
    let storage;
    let user;

    before (async () => {
        storage = await Storage.deployed();
        user = await User.deployed();
    });
    
    describe('deployment', async() => {
        it('deploys successfully', async () => {
            const userAddress = await user.address;
            assert.notEqual(userAddress, 0x0);
        })
    });
});