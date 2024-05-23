import { Router } from "express";
import { getCarts, getCartById, addProductToCart, createCarts } from "../utils/cartManager.js";
import productManager from "../utils/productManager.js";

const router = Router();

router.post('/', async(req, res) =>{
    try {
        const cart = await createCarts()
    
        res.status(201).json({ status: "success", cart });
    } catch (err) {
        console.error("Error creating cart", err)
        res.status(500).json({status: "Error", msg: "Internal Server Error"});
    }
});

router.get('/', async(req, res)=>{
    try {
        const carts = await getCarts();

        res.status(200).json({ status: "success", carts });
    } catch (err) {
        console.error("Error getting carts", err)
        res.status(500).json({status: "Error", msg: "Internal Server Error"});
    }
});

router.get('/:cid', async(req, res)=>{
    try {
        const id = Number(req.params.cid);
        const cart = await getCartById(id);
        if(!cart) return res.status(404).json({ status: "Error", msg: "Cart Not Found"});

        res.status(200).json({ status: "success", cart });
    } catch (err) {
        console.error("Error getting carts", err)
        res.status(500).json({status: "Error", msg: "Internal Server Error"});
    }
});

router.post('/:cid/product/:pid', async(req, res) =>{
    try {
        const { cid, pid } = req.params;

        const product = await productManager.getProductById(Number(pid));
        if(!product) return res.status(404).json({ status: "Error", msg: "Product Not Found"});

        const cart = await addProductToCart(Number(cid), Number(pid));
        if(!cart) return res.status(404).json({ status: "Error", msg: "Cart Not Found"});
    
        res.status(201).json({ status: "success", cart });
    } catch (err) {
        console.error("Error creating cart", err)
        res.status(500).json({status: "Error", msg: "Internal Server Error"});
    }
});

export default router;