import { Router } from "express";
import productManager from "../utils/productManager.js";
import checkProduct from "../middlewares/checkProduct.middleware.js";

const router = Router();

router.get('/', async(req, res) =>{
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts(limit);
        
        res.status(200).json({ status: "success", products});
    } 
    catch (err) {
        console.error("error al obtener los productos", err)
        res.status(500).json({status: "Error", msg: "Internal Server Error"});
    }
});

router.get('/:pid', async(req, res) =>{
    try {
        const id = Number(req.params.pid);
        const product = await productManager.getProductById(id);

        if(!product) return res.status(404).json({ status: "Error", msg: "Product Not Found"});
        res.status(200).json({ status: "success", product });
    } catch (err) {
        console.error("error al obtener los productos", err)
        res.status(500).json({status: "Error", msg: "Internal Server Error"});
    }
});

router.post('/', checkProduct, async(req, res) =>{
    try {
        const body = req.body;
        const product = await productManager.addProduct(body);

        res.status(201).json({ status: "success", product });
    } catch (err) {
        console.error("error al obtener los productos", err)
        res.status(500).json({status: "Error", msg: "Internal Server Error"});
    }
});

router.put('/:pid', async(req, res) =>{
    try {
        const id = Number(req.params.pid);
        const body = req.body;
        const product = await productManager.updateProducts(id, body);

        if(!product) return res.status(404).json({ status: "Error", msg: "Product Not Found"});
        res.status(200).json({ status: "success", product });
    } catch (err) {
        console.error("error al obtener los productos", err)
        res.status(500).json({status: "Error", msg: "Internal Server Error"});
    }
});

router.delete('/:pid', async(req, res) =>{
    try {
        const id = Number(req.params.pid);
        const product = await productManager.deleteProducts(id);

        if(!product) return res.status(404).json({ status: "Error", msg: "Product Not Found"});
        res.status(200).json({ status: "success", msg: `The product with id: (${id}) was deleted` });
    } catch (err) {
        console.error("error al obtener los productos", err)
        res.status(500).json({status: "Error", msg: "Internal Server Error"});
    }
});

export default router;