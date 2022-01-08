pragma solidity >=0.4.17 <0.9.0;
import "./Storage.sol";

contract Buyer {
    address storageAddress;

    constructor(address _storageAddress) public {
        storageAddress = _storageAddress;
    }
    function PurchaseProduct(address payable productOwner, uint arrayPosition) public payable {
        Storage storageInstance = Storage(storageAddress);
        uint price; uint quantity;

        (price, quantity) = storageInstance.getProductPriceAndQuantityByOwner(productOwner, arrayPosition);
        
        require(msg.value >= price);

        address payable seller = productOwner;
        seller.transfer(msg.value);
        storageInstance.transferProductOwnership(seller, arrayPosition, msg.sender);
    }
}
