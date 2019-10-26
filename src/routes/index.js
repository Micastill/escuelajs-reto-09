const express = require('express');
const path = require('path');
const ProductService = require('../services');
const receipt = '../assets/receipt.pdf'

const platziStore = (app) => {
  const router = express.Router();
  app.use('/api/', router);

  const productService = new ProductService();

  router.get('/', (req, res) => {
    res.send(`API v2`);
  });

  router.get('/receipts', (req, res, next) => {
    let file = path.join(__dirname, receipt);
    res.sendFile(file);
  });

  router.get('/products', async (req, res, next) => {
    try {
      const storeProducts = await productService.getProducts()
      res.status(200).json({data: storeProducts, message: 'Products'});
    } catch (error) {
      console.log(error);
      
    }
  
  });

  router.get('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    try {
      const storeProducts = await productService.getProduct(productId);
      res.status(200).json({data: storeProducts, message: 'Product details'});
      
    } catch (error) {
      console.log(error)
    }
    
  });

  router.put('/:productId', async (req, res, next) =>{
    const { productId } = req.params;
    const { body: data } = req;
    try {
      const storeProducts = await productService.updateProduct(productId, data);
      res.status(200).json({data: storeProducts, message: 'Product updated'})
    } catch (error) {
      console.log(error)
    }
  })

  router.delete('/:productId', async (req, res, next) =>{
    const { productId } = req.params;
    try {
      const storeProducts = await productService.deleteProduct(productId);
      res.status(200).json({data: storeProducts, message: 'Product deleted'})
    } catch (error) {
      console.log(error)
    }
  })

  router.post('/products', async (req, res, next) =>{
    const { body: data } = req
    try {
      const storeProducts = await productService.createOne(data);
      res.status(201).json({data: storeProducts, message: 'Product created'})
    } catch (error) {
      
    }
  })

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
}

module.exports = platziStore;