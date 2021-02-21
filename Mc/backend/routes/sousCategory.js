const express = require('express')
let SousCategory = require('../models/sousCategory.model');
const router = express.Router();
// show all SousCategory 

router.get('/', (req,res) =>{
  SousCategory.find()
  .then((SousCategory) => res.json(SousCategory))
  .catch((err) => res.status(400).json("Error :" + err));
});
router.get('/:idCtg', (req,res) =>{

  SousCategory.find({category: `${req.params.idCtg}`})
  .then((SousCategory) => res.json(SousCategory))
  .catch((err) => res.status(400).json("Error :" + err));
});
// add SousCategory 
router.route("/add").post((req, res) => {
    const nom = req.body.nom;
    const category = req.body.category;
    const sousCategoryPush = new SousCategory({
      nom,
      category
    });
    sousCategoryPush
      .save()
      .then(() => res.json("Sous Category successfully added"))
      .catch((err) =>  res.status(400).json("Error :" + err));
  });

  //Deleting subcategory
router.delete('/:id' , async (req, res) => {
  try {
    await SousCategory.findById(req.params.id).remove()

     
      res.json({ message: 'Deleted Succesfully' })
  } catch (err) {
      res.status(500).json({ message: err.message })
      
  }


})

//updating subcategory
router.patch('/:id' , getsubcategory , async (req, res) => {
  if (req.body.nom != null) {
      res.subcategories.nom = req.body.nom
  }
  
 

  if (req.body.category != null) {
   res.subcategories.category = req.body.category
}

  try {
      const updatedsubcategory = await res.subcategories.save()
      res.json(updatedsubcategory)

  } catch (err) {
      res.status(400).json({ message: err.message })
      
  }

})

async function getsubcategory(req, res, next) {

  let subcategories

  try {
      subcategories = await SousCategory.findById(req.params.id)
      if (subcategories == null) {
          return res.status(404).json({ message: 'Cannot find category'})
      }
  } catch (err) {
      
      return res.status(500).json({ message: err.message })
  }

  res.subcategories = subcategories
  next()
}

module.exports = router;