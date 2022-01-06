pragma solidity >=0.4.17 <0.9.0;

import "./Marketplace.sol";

contract Purchase is Marketplace{
    function purchaseProduct(Product memory product) public override {
        validateProduct(product);
    }

    function validateProduct (Product memory product) private{
        require(product.id > 0);
        require(bytes(product.name).length > 0);
        require(product.owner != address(0x0) && product.owner != address(0));
        require(product.price > 0);
        require(product.purchased == false);
    }
}