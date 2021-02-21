// post category


function send() {
    var namee = document.getElementById('category').value;

    obj = {
        nom : namee
    }
    console.log(obj);

    axios.post('http://localhost:8080/category/add',obj)
      .then(function (response) {
        console.log(response);
        window.location.href='./index.html'
      })
      .catch(function (error) {
        console.log(error);
      });
    
   

}

// afficher les categories


function getCat() {
    var table = document.getElementById('catTable');
    var html = "";
    axios.get('http://localhost:8080/category')
.then(function (response) {
  for (let index = 0; index < response.data.length; index++) {
      html +=`
      <tr>
                <td>${response.data[index].nom}</td>
                <td><button class="btn btn-success" onclick="updateCat('${response.data[index]._id}')">Update</button>
                <button class="btn btn-danger" onclick="deleteCat('${response.data[index]._id}')">Delete</button></td>
            </tr>
      `
      
  }

  table.innerHTML = html
})
}

// delete category by id

function deleteCat(id) {
    axios.delete('http://localhost:8080/category/'+ id)
    .then(function (response) {
        console.log(response);
        window.location.href='./index.html'
        window.alert("Are you sure you want to deleted?");

      })
      .catch(function (error) {
        console.log(error);
      });
    
}



// update category

function updateCat(id) {

  var nameeupdate = document.getElementById('category').value;
  
      obj = {
          nom : nameeupdate
          
      }
      console.log(obj);
  
      axios.patch('http://localhost:8080/category/' +id ,obj)
        .then(function (response) {
          console.log(response);
          window.location.href='./index.html'
        })
        .catch(function (error) {
          console.log(error);
        });
  
 

}

// load subcategory

async function  loadsubCat() {
  var table2 = document.getElementById('subcatTable');
  var html = "";
  await axios.get('http://localhost:8080/sousCategory')
.then(function (res) {
  
for (let index = 0; index < res.data.length; index++) {
    html +=`
    <tr>
              <td>${res.data[index].nom}</td>
              <td><button class="btn btn-success" onclick="updatesubCat('${res.data[index]._id}')">Update</button>
              <button class="btn btn-danger" onclick="deletesubCat('${res.data[index]._id}')">Delete</button></td>
          </tr>
    `
    
  }

  table2.innerHTML = html
})
}

// get category


async function getsubCat() {
    var selectsubcat = document.getElementById('selectsubcat');
    var html = "";
   await axios.get('http://localhost:8080/category')
.then(function (response) {
 
  for (let index = 0; index < response.data.length; index++) {
      html +=`
      
                <option value="${response.data[index]._id}">${response.data[index].nom}</option>
            
      `

  }
  selectsubcat.innerHTML = html
}

)}

// onload les deux functions

function loadsub(){
  loadsubCat()
  getsubCat()
}

// post subcategory

function send1() {
    var subcategory = document.getElementById('subcategory').value;
    var categoryid = document.getElementById('selectsubcat').value;
    obj = {
        nom : subcategory,
        category : categoryid
    }
    console.log(obj);

    axios.post('http://localhost:8080/sousCategory/add',obj)
      .then(function (response) {
        console.log(response);
        window.location.href='./subcategory.html'
      })
      .catch(function (error) {
        console.log(error);
      });
    
   

}


// delete subcategory 

function deletesubCat(id) {
  axios.delete('http://localhost:8080/SousCategory/'+ id)
  .then(function (response) {
      console.log(response);
      window.location.href='./subcategory.html'
      window.alert("Are you sure you want to deleted?");

    })
    .catch(function (error) {
      console.log(error);
    });
  
}

// update subcategory

function updatesubCat(id) {
  var updatesubcategory = document.getElementById('subcategory').value;
  var updatecategoryid = document.getElementById('selectsubcat').value;
  obj = {
      nom : updatesubcategory,
     category : updatecategoryid
  }
  console.log(obj);

  axios.patch('http://localhost:8080/SousCategory/'+id ,obj)
    .then(function (response) {
      console.log(response);
      window.location.href='./subcategory.html'
    })
    .catch(function (error) {
      console.log(error);
    });
  
 

}

// load products


async function  loadproduct() {
  var products = document.getElementById('productstable');
  var html = "";
  await axios.get('http://localhost:8080/product')
.then(function (res) {
  
for (let index = 0; index < res.data.length; index++) {
    html +=`
    <tr>
              <td style="margin-right: 20px">${res.data[index].nom}</td>
              <td style="margin-right: 20px">${res.data[index].prix}</td>
              <td style="margin-right: 20px">${res.data[index].ingrediens}</td>
              <td style="margin-right: 20px">${res.data[index].codePromo}</td>
              <td><button class="btn btn-success" onclick="updateproduct('${res.data[index]._id}')">Update</button>
              <button class="btn btn-danger" onclick="deleteproduct('${res.data[index]._id}')">Delete</button></td>
          </tr>
    `
    
  }

  products.innerHTML = html
})
}



async function getselectsubcategory() {
  var selectdesubcategory = document.getElementById('selectdesubcategory');
  var html = "";
 await axios.get('http://localhost:8080/SousCategory')
.then(function (response) {

for (let index = 0; index < response.data.length; index++) {
    html +=`
    
              <option value="${response.data[index]._id}">${response.data[index].nom}</option>
          
    `

}
selectdesubcategory.innerHTML = html
}

)}

// update product

function updateproduct(id) {
  var productname = document.getElementById('productname').value;
  var productprice = document.getElementById('productprice').value;
  var ingrediens = document.getElementById('ingrediens').value;
  var codepromo = document.getElementById('codepromo').value;
  var selectdesubcategory = document.getElementById('selectdesubcategory').value;
  
  obj = {
      nom : productname,
      prix : productprice,
      ingrediens : ingrediens,
      codePromo : codepromo,
      sousCategory : selectdesubcategory

  }
  console.log(obj);

  axios.patch('http://localhost:8080/product/' +id ,obj)
    .then(function (response) {
      console.log(response);
      window.location.href='./product.html'
    })
    .catch(function (error) {
      console.log(error);
    });
  
 

}




function loadproducts(){
  loadproduct()
  getselectsubcategory()
  // selectextra()
}

// post produit

function sendproduit() {
  var productname = document.getElementById('productname').value;
  var productprice = document.getElementById('productprice').value;
  var ingrediens = document.getElementById('ingrediens').value;
  var codepromo = document.getElementById('codepromo').value;
  var selectdesubcategory = document.getElementById('selectdesubcategory').value;
  
  obj = {
      nom : productname,
      prix : productprice,
      ingrediens : ingrediens,
      codePromo : codepromo,
      sousCategory : selectdesubcategory

  }
  console.log(obj);

  axios.post('http://localhost:8080/product/add',obj)
    .then(function (response) {
      console.log(response);
      window.location.href='./product.html'
    })
    .catch(function (error) {
      console.log(error);
    });
  
 

}

// delete product

function deleteproduct(id) {
  axios.delete('http://localhost:8080/product/'+ id)
  .then(function (response) {
      console.log(response);
      window.location.href='./product.html'
     alert("Are you sure you want to deleted?");

    })
    .catch(function (error) {
      console.log(error);
    });
  
}




