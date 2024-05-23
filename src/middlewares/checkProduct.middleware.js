import { request, response } from "express";
import productManager from "../utils/productManager.js";

const checkProduct = async(req = request, res = response, next) =>{
    try {
        const { 
            title, 
            description, 
            price, 
            code, 
            stock, 
            category 
        } = req.body;
        
        const newProduct = {
            title,
            description,
            price,
            code,
            stock,
            category
        };

        const products = await productManager.getProducts();
        
        //Verifica que esten todos los campos.
        const checkData = Object.values(newProduct).some(value =>
            value === undefined || 
            value === null || 
            value === '' ||
            (typeof value === 'number' && isNaN(value))
        );
        if(checkData) return res.status(400).json({ status: "Error", msg: "All fields are required."});

        //Verifica si se repite algun codigo
        const productRepeat = products.find(prod => prod.code === code);
        if(productRepeat) return res.status(400).json({ status: "Error", msg: `There is already a product with that code. (code: ${code}).`});

        next();
    } catch (err) {
        console.error("error al obtener los productos", err)
        res.status(500).json({status: "Error", msg: "Internal Server Error"});
    }
}

export default checkProduct;