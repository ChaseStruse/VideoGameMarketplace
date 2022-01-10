const User = artifacts.require("User");
const Storage = artifacts.require('../build/contracts/Storage.sol')

module.exports = function(deployer) {
    deployer.deploy(User, '0x65E9a1d03B9D1Bb2f200A009832622E8F38426db');
};
