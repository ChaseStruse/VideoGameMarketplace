pragma solidity >=0.4.17 <0.9.0;
pragma experimental ABIEncoderV2;

contract Storage {
    struct Product {
        string name;
        uint price;
        uint quantity;
        address owner;
        bool purchased;
    }
    mapping(address => Product[]) public products;
    Product[] public allProducts;

    function addProduct(string memory name, uint price, uint quantity) public {
        address owner = msg.sender;
        Product memory productToAdd = Product(name, price, quantity, owner, false);
        validateProduct(productToAdd);
        allProducts.push(productToAdd);
        products[owner].push(productToAdd);
    }

    function getProductByOwner(address productOwner, uint arrayPosition) public view returns(Product memory){
        return products[productOwner][arrayPosition];
    }
    function getProductPriceAndQuantityByOwner(address productOwner, uint arrayPosition) public view returns(uint, uint){
        Product memory product = products[productOwner][arrayPosition];
        return (product.price, product.quantity);
    }

    function transferProductOwnership(address originalOwner, uint arrayPosition, address newOwner) public view{
        Product memory product = products[originalOwner][arrayPosition];

        product.owner = newOwner;
        product.purchased = true;
        product.quantity = 0;
    }

    function validateProduct (Product memory product) private pure{
        require(bytes(product.name).length > 0);
        require(product.owner != address(0x0) && product.owner != address(0));
        require(product.price > 0);
        require(product.quantity > 0);
        require(product.purchased == false);
    }

}