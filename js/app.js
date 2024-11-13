    function getParams() {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        var params = {};
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
    }

        //const params = getParams();
        // console.log(params);
        // let arrayUrls = [];
        // for (key in params){
        //     console.log(key,params[key]);
        //     arrayUrls.push(params[key]);
        // }
        // let api_url = arrayUrls[0];
        // let api_all = arrayUrls[1];
        // let api_insert = arrayUrls[2];
        // let api_edit = arrayUrls[3];
        // let api_deleteUrl = arrayUrls[4];

        const params = getParams();
        const api_url = params.url;
        const api_all = params.all;
        const api_insert = params.insertar;
        const api_edit = params.editar;
        const api_deleteUrl = params.eliminar;
        

    //  console.log('Para buscarlos todos uso: ' + api_url + api_all);
     
    //  console.log('para eliminar' + api_url + api_deleteUrl);
    function getAll() {
        const tableContainer = document.querySelector('.tableContainer');
        tableContainer.innerHTML = '';
    
        fetch(api_url + api_all) // Asegúrate de que api_url y api_all estén correctamente configurados
            .then(response => response.json())
            .then(data => {
                console.log(data); // Verifica si los datos llegan correctamente desde la API
    
                // Si la API devuelve datos correctamente, crea las filas de la tabla
                data.forEach(product => {
                    let tr = document.createElement('tr'); // Crear una nueva fila para cada producto
    
                    // Crear y añadir las celdas con la información del producto
                    let tdId = document.createElement('td');
                    tdId.textContent = product.productId; // Suponiendo que la respuesta tiene un campo `id`
                    tr.appendChild(tdId);
    
                    let tdName = document.createElement('td');
                    tdName.textContent = product.productName; // Suponiendo que la respuesta tiene un campo `name`
                    tr.appendChild(tdName);
    
                    let tdPrice = document.createElement('td');
                    tdPrice.textContent = product.productPrice; // Suponiendo que la respuesta tiene un campo `price`
                    tr.appendChild(tdPrice);
    
                    // Crear una celda para los botones de acción (Editar y Eliminar)
                    let tdActions = document.createElement('td');
    
                    // Botón para eliminar el producto
                    let buttonDelete = document.createElement('button');
                    buttonDelete.textContent = 'Eliminar';
                    buttonDelete.classList.add('btn', 'btn-danger', 'me-2');
                    buttonDelete.addEventListener('click', () => deleteProduct(product.id)); // Evento para eliminar
    
                    // Botón para editar el producto
                    let buttonEdit = document.createElement('button');
                    buttonEdit.textContent = 'Editar';
                    buttonEdit.classList.add('btn', 'btn-primary');
                    buttonEdit.addEventListener('click', () => editProduct(product.id)); // Evento para editar
    
                    // Añadir los botones a la celda de acciones
                    tdActions.appendChild(buttonDelete);
                    tdActions.appendChild(buttonEdit);
    
                    // Añadir la celda de acciones a la fila
                    tr.appendChild(tdActions);
    
                    // Añadir la fila completa a la tabla
                    tableContainer.appendChild(tr);
                });
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error); // Mensaje en caso de error
            });
    }
    
    // Función para eliminar un producto
    function deleteProduct(productId) {
        // Asegúrate de que api_url y api_deleteUrl estén correctamente configurados
        fetch(api_url + api_deleteUrl.replace('{id}', productId), {
            method: 'DELETE' // Método DELETE para eliminar el producto
        })
        .then(response => response.json())
        .then(() => {
            console.log('Producto eliminado');
            getAll(); // Recargar la tabla después de eliminar el producto
        })
        .catch(error => console.error('Error al eliminar el producto:', error));
    }
    
    // Función para editar un producto (puedes agregar la lógica de edición según lo necesites)
    function editProduct(productId) {
        // Aquí puedes agregar la lógica para redirigir a un formulario de edición, por ejemplo
        console.log('Editar producto con ID:', productId);
    }
    
    // Cargar los productos cuando la página se carga
    window.onload = () => {
        getAll(); // Llamada inicial a la función para cargar los productos
    };
    