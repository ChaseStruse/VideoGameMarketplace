const Storage = artifacts.require("Storage");
const User = artifacts.require("User");

module.exports = function(deployer) {
  deployer.deploy(Storage);
  deployer.deploy(User);
};
