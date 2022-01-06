const { assert } = require('chai');

const Purchase = artifacts.require('../build/contracts/Purchase.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('Purchase', ([deployer, seller, buyer]) => { 
    let purchase;
    before (async () => {
        purchase = await Purchase.deployed();
    })

    describe('deployment', async() => {
        it('deploys successfully', async () => {
            const address = await purchase.address;
            assert.notEqual(address, 0x0);
        })
    });
})