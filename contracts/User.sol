pragma solidity >=0.4.17 <0.9.0;
pragma experimental ABIEncoderV2;

import "./Storage.sol";

contract User {

    address storageAddress;

    constructor(address addr) public {
        storageAddress = addr;
    }

    function PurchaseProduct(address payable productOwner, uint arrayPosition) public payable {
        Storage storageInstance = Storage(storageAddress);
        uint price; uint quantity;
        (price, quantity) = storageInstance.getProductPriceAndQuantityByOwner(productOwner, arrayPosition);

        require(price <= msg.value);
        require(quantity > 0);

        storageInstance.transferProductOwnership(productOwner, arrayPosition, msg.sender);
        productOwner.transfer(msg.value);
    }
    
}