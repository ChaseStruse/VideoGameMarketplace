pragma solidity >=0.4.17 <0.9.0;

contract Storage {
    struct Product {
        uint id;
        string name;
        uint price;
        address owner;
        bool purchased;
    }
    mapping(uint => Product) public products;
    uint productCount;

    function addProduct(string memory name, uint price) public {
        Product memory productToAdd = Product(productCount + 1, name, price, msg.sender, false);
        validateProduct(productToAdd);
        productCount++;
        products[productCount] = productToAdd;
    }

    function validateProduct (Product memory product) private pure{
        require(product.id > 0);
        require(bytes(product.name).length > 0);
        require(product.owner != address(0x0) && product.owner != address(0));
        require(product.price > 0);
        require(product.purchased == false);
    }

}