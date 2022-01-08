const { assert } = require('chai');

const Storage = artifacts.require('../build/contracts/Storage.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should();

contract('Storage', ([deployer, seller, buyer]) => { 
    let storage;
    before (async () => {
        storage = await Storage.deployed();
    })

    describe('deployment', async() => {
        it('deploys successfully', async () => {
            const address = await storage.address;
            assert.notEqual(address, 0x0);
        })
    });

    describe('validation', async() => {
        it("does not add a product with an invalid name", async() => {
            storage.addProduct('', web3.utils.toWei('1'), { from: seller }).should.be.rejected;
        })
        it("does not add a product with an invalid price", async() => {
            storage.addProduct('Macbook', web3.utils.toWei('0'), { from: seller }).should.be.rejected;
        })
        it("does not add a product with an invalid address", async() => {
            storage.addProduct('Macbook', web3.utils.toWei('1'), { from: 0 }).should.be.rejected;
            storage.addProduct('Macbook', web3.utils.toWei('1'), { from: 0x0 }).should.be.rejected;
        })
        it("does add a product when fields are valid", async() => {
            storage.addProduct('Macbook', web3.utils.toWei('1'), 1, { from: seller });
            const product = await storage.getProductByOwner(seller, 0);

            assert.equal(product.name, 'Macbook');
            assert.equal(product.price, web3.utils.toWei('1'));
            assert.equal(product.quantity, 1);
            assert.equal(product.owner, seller);
        })
    });

    describe ('get products', async() => {
        it('returns created product correctly', async() => {
            await storage.addProduct('iPhone', web3.utils.toWei('2'), 2, { from: seller });
            const product = await storage.getProductByOwner(seller, 1);

            assert.equal(product.name, 'iPhone');
            assert.equal(product.price, web3.utils.toWei('2'));
            assert.equal(product.quantity, 2);
            assert.equal(product.owner, seller);
        })
    })

})