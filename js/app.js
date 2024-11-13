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
    
        fetch(api_url + api_all)
            .then(response => response.json())
            .then(data => {
                console.log(data);
    
                data.forEach(product => {
                    
                    let tr = document.createElement('tr');
    
                    let tdId = document.createElement('td');
                    tdId.textContent = product.productId;
                    tr.appendChild(tdId);
    
                    let tdName = document.createElement('td');
                    tdName.textContent = product.productName;
                    tr.appendChild(tdName);
    
                    let tdPrice = document.createElement('td');
                    tdPrice.textContent = product.productPrice;
                    tr.appendChild(tdPrice);
    
                    
                    let tdActions = document.createElement('td');
    
                    
                    let buttonDelete = document.createElement('button');
                    buttonDelete.textContent = 'Eliminar';
                    buttonDelete.classList.add('btn', 'btn-danger', 'me-2');
                    buttonDelete.addEventListener('click', () =>{
                        console.log('Eliminando producto con ID:', product.productId);
                    deleteProduct(product.productId);
                    });
                    
                    
                    let buttonEdit = document.createElement('button');
                    buttonEdit.textContent = 'Editar';
                    buttonEdit.classList.add('btn', 'btn-primary');
                    buttonEdit.addEventListener('click', () => {
                        window.location.href = `editarForm.html?id=${product.productId}`;
                    });
                    
                    tdActions.appendChild(buttonDelete);
                    tdActions.appendChild(buttonEdit);
    
                    
                    tr.appendChild(tdActions);
    
                    
                    tableContainer.appendChild(tr);
                });
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error);
            });
    }
    
    
    function deleteProduct(productId) {
        
        console.log('Recibido productId en deleteProduct:', productId);

        const deleteUrl = api_url + api_deleteUrl.replace('{id}', productId);
        console.log('Usando URL para DELETE:', deleteUrl);

        fetch(deleteUrl, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(() => {
            console.log('Producto eliminado');
            getAll();
        })
        .catch(error => console.error('Error al eliminar el producto:', error));
    }
    


    function insertProduct() {
        const productName = document.getElementById('product_name').value;
        const productPrice = document.getElementById('product_price').value;

        const productData = {
            productName: productName,
            productPrice: productPrice
        };

        const insertUrl = api_url + api_insert;

        fetch(insertUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
        .then(response => {
            
            return response.text().then(text => {
                try {
                    return JSON.parse(text);
                } catch (e) {
                    return { message: text };
                }
            });
        })
        .then(data => {
            console.log('Producto insertado', data);
            getAll();
        })
        .catch(error => {
            console.error('Error al insertar el producto:', error);
        });
    }


document.getElementById('insert-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    insertProduct();
});

    window.onload = () => {
        getAll();
    };
    
    