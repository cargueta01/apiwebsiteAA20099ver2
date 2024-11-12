

var fila="<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td></tr>";
	 var productos=null;
  function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "Electronicos":code="c1";break;
	    case "Joyería":code="c2";break;
		case "Caballeros":code="c3";break;
		case "women's Damas":code="c4";break;
	}
	return code;
}   
	  var orden=0;
	  
	  
	  function listarProductos(productos) {
		var precio = document.getElementById("price"); 
		precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
		var num = productos.length;
		var listado = document.getElementById("listado");
		var ids, titles, prices, descriptions, categories, fotos;
		var tbody = document.getElementById("tbody"), nfila = 0;
		tbody.innerHTML = "";
		var catcode;
		
		for (let i = 0; i < num; i++) tbody.innerHTML += fila;
		
		ids = document.getElementsByClassName("id");
		titles = document.getElementsByClassName("title");
		descriptions = document.getElementsByClassName("description");
		categories = document.getElementsByClassName("category");
		fotos = document.getElementsByClassName("foto");
		prices = document.getElementsByClassName("price");
	  
		listado.style.display = "block";
	  
		for (let nfila = 0; nfila < num; nfila++) {
		  ids[nfila].innerHTML = productos[nfila].id;
		  titles[nfila].innerHTML = productos[nfila].title;
		  descriptions[nfila].innerHTML = productos[nfila].description;
		  categories[nfila].innerHTML = productos[nfila].category;
		  catcode = codigoCat(productos[nfila].category);
		  let tr = categories[nfila].parentElement;
		  tr.setAttribute("class", catcode);
		  prices[nfila].innerHTML = "$" + productos[nfila].price;
		  fotos[nfila].innerHTML = `<img src="${productos[nfila].image}">`;
		  fotos[nfila].firstChild.setAttribute("onclick", "window.open('" + productos[nfila].image + "');");
	  
		  // Botón de eliminar
		  const eliminarBtn = document.createElement("button");
		  eliminarBtn.innerText = "Eliminar";
		  eliminarBtn.onclick = () => eliminarProducto(productos[nfila].id); // Usamos el id correcto
		  tr.appendChild(eliminarBtn);
		}
	  }
	  

function obtenerProductos() {
	fetch('https://api-generator.retool.com/AJyPgi/productos')
	  .then(res => res.json())
	  .then(data => {
		console.log("Productos cargados", data); // Confirmar recarga de productos
		productos = data;
		productos.forEach(function(producto) {
		  producto.price = parseFloat(producto.price).toFixed(2);
		});
		listarProductos(data);
	  })
	  .catch(error => console.error("Hubo un error al cargar los productos:", error));
  }

function agregarProducto() {
	const title = document.getElementById("title").value;
	const description = document.getElementById("description").value;
	const price = parseFloat(document.getElementById("price").value).toFixed(2);
	const category = document.getElementById("category").value;
	const image = document.getElementById("image").value;
  
	const nuevoProducto = { title, description, price, category, image };
  
	fetch('https://api-generator.retool.com/AJyPgi/productos', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(nuevoProducto)
	})
	.then(response => {
	  if (!response.ok) throw new Error("Error al agregar producto");
	  return response.json();
	})
	.then(() => obtenerProductos())  // Recargar el listado después de agregar
	.catch(error => console.error("Hubo un error:", error));
  }

function ordenarDesc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return -1;
if(a[p_key] < b[p_key]) return 1;
return 0;
   });
}

function eliminarProducto(id) {
	console.log("Eliminando producto con id:", id); // Verificar el ID
	fetch(`https://api-generator.retool.com/AJyPgi/productos/${id}`, {
	  method: 'DELETE'
	})
	.then(response => {
	  if (!response.ok) throw new Error("Error al eliminar producto");
	  console.log("Producto eliminado"); // Confirmar eliminación
	  obtenerProductos();  // Recargar el listado después de eliminar
	})
	.catch(error => console.error("Hubo un error:", error));
  }
  

function ordenarAsc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return 1;
if(a[p_key] < b[p_key]) return -1;
return 0;
   });
}