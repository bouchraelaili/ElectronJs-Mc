const express = require('express')
let Product = require('../models/product.model');
const router = express.Router();

// show all Product 
router.get('/', (req,res) =>{
  Product.find()
  .then((Product) => res.json(Product))
  .catch((err) => res.status(400).json("Error :" + err));
});

// add Product 
router.get('/showAll', (req,res) =>{
    res.send('hi this is when we show all product ')
});
router.get('/:idSousCtg', (req,res) =>{

  Product.find({sousCategory: `${req.params.idSousCtg}`})
  .then(Product =>{ 
    res.json(Product)

  })
  .catch((err) => res.status(400).json("Error :" + err));
});

router.route("/add").post((req, res) => {
    const nom = req.body.nom;
    const prix = req.body.prix;
    const ingrediens = req.body.ingrediens;
    const codePromo = req.body.codePromo;
    const img = req.body.img;
    const sousCategory = req.body.sousCategory;
    const category = req.body.category
    const productPush = new Product({  
      nom,
      prix,
      ingrediens,
      codePromo,
      img,
      sousCategory,
      category 
    });
    productPush
      .save()
      .then(() => res.json("Product successfully added"))
      .catch((err) =>  res.status(400).json("Error :" + err));
  });



  //Deleting subcategory
router.delete('/:id' , async (req, res) => {
  try {
    await Product.findById(req.params.id).remove()

     
      res.json({ message: 'Deleted Succesfully' })
  } catch (err) {
      res.status(500).json({ message: err.message })
      
  }


})

//updating product
router.patch('/:id' , getproduit , async (req, res) => {
  if (req.body.nom != null) {
      res.produits.nom = req.body.nom
  }
  
  if (req.body.prix != null) {
      res.produits.prix = req.body.prix
  }

  if (req.body.ingrediens != null) {
   res.produits.ingrediens = req.body.ingrediens
}

  if (req.body.codePromo != null) {
   res.produits.codePromo = req.body.codePromo
}

if (req.body.sousCategory != null) {
   res.produits.sousCategory = req.body.sousCategory
}

  try {
      const updatedproduit = await res.produits.save()
      res.json(updatedproduit)

  } catch (err) {
      res.status(400).json({ message: err.message })
      
  }

})

async function getproduit(req, res, next) {

  let produits

  try {
   produits = await Product.findById(req.params.id)
      if (produits == null) {
          return res.status(404).json({ message: 'Cannot find category'})
      }
  } catch (err) {
      
      return res.status(500).json({ message: err.message })
  }

  res.produits = produits
  next()
}

module.exports = router;