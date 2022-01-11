const { assert } = require('chai');

const User = artifacts.require('../build/contracts/User.sol');
const Storage = artifacts.require('../build/contracts/Storage.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('User', ([deployer, seller, buyer]) => { 
    let storage;
    let user;
    let product;

    before (async () => {
        storage = await Storage.deployed();
        user = await User.deployed();
        storage.addProduct('Macbook Pro', web3.utils.toWei('1'), 1, { from: seller });
        product = await storage.getProductByOwner(seller, 2);
    });
    
    describe('deployment', async() => {
        it('deploys successfully', async () => {
            const userAddress = await user.address;
            assert.notEqual(userAddress, 0x0);
        })
    });

    describe('purchasing', async() => {
        it('transfers ownership', async() => {
            user.PurchaseProduct(seller, 2, { from: buyer, value: web3.utils.toWei('1', 'Ether') });
            const updatedProduct = await storage.getProductByOwner(buyer, 2);
            assert.equal(updatedProduct.owner = buyer);
        })
    })
});