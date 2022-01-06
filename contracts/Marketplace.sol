pragma solidity >=0.4.17 <0.9.0;

contract Marketplace {

    struct Product {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
    }

    function purchaseProduct(Product memory product) public {
        
    }
}