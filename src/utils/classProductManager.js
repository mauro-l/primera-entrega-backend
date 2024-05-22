class ProductManager {

    constructor (){
        this.products = [];
    }

    addProduct(product){

        const { title, description, price, thumbnail, code, stock } = product;

        const newProduct = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        const productRepeat = this.products.find (prod => prod.code === code);
        if(productRepeat) throw new Error("There is already a product with that code.")
        if(Object.values(newProduct).includes(undefined)) throw new Error("All fields are required.")
        
        this.products.push(newProduct);
    }

    getProduct(){
        console.log(this.products)
    }

    getProductById(id){
        const product = this.products.find(prod => prod.id === id);
        if(!product) throw new Error("Not found");

        console.log(product);
    }

    updateProduct(id){
        
    }
    
    deleteProduct(id){
        this.getProductById(id)
        console.log("removing product...");
        const products = this.products.filter(prod => prod.id !== id);
        console.log(products);
    }
}
class ProductManager {

    constructor (){
        this.products = [];
    }

    addProduct(product){

        const { title, description, price, thumbnail, code, stock } = product;

        const newProduct = {
            id: this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        const productRepeat = this.products.find (prod => prod.code === code);
        if(productRepeat) throw new Error("There is already a product with that code.")
        if(Object.values(newProduct).includes(undefined)) throw new Error("All fields are required.")
        
        this.products.push(newProduct);
    }

    getProduct(){
        console.log(this.products)
    }

    getProductById(id){
        const product = this.products.find(prod => prod.id === id);
        if(!product) throw new Error("Not found");

        console.log(product);
    }

    updateProduct(id){
        
    }
    
    deleteProduct(id){
        this.getProductById(id)
        console.log("removing product...");
        const products = this.products.filter(prod => prod.id !== id);
        console.log(products);
    }
}
