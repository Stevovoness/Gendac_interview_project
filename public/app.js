document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById('productList');
    const loadProductsButton = document.getElementById('loadProducts');

    loadProductsButton.addEventListener('click', loadProducts);

    function loadProducts() {
        fetch('/api/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Clear previous data
                productList.innerHTML = '';

                // Populate the table with products
                data.forEach(product => {
                    const row = document.createElement('tr');
                    
                    const nameCell = document.createElement('td');
                    nameCell.textContent = product.Name;
                    row.appendChild(nameCell);

                    const idCell = document.createElement('td');
                    idCell.textContent = product.Id;
                    row.appendChild(idCell);

                    const categoryCell = document.createElement('td');
                    categoryCell.textContent = product.Category;
                    row.appendChild(categoryCell);

                    const priceCell = document.createElement('td');
                    priceCell.textContent = product.Price;
                    row.appendChild(priceCell);

                    productList.appendChild(row);
                });
            })
            .catch(error => {
                console.error("There was an error fetching the products:", error);
            });
    }
});

document.getElementById('deleteProduct').addEventListener('click', function() {
    const productId = document.getElementById('productId').value;

    // Perform validation if needed e.g. check if productId is a number
    if (!productId) {
        alert("Please enter a product ID!");
        return;
    }

    fetch(`/api/products/${productId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to delete product');
        }
    })
    .then(data => {
        alert('Product deleted successfully!');
    })
    .catch(error => {
        alert(error.message);
    });
});

document.getElementById('addProduct').addEventListener('click', function() {
    const name = document.getElementById('productName').value;
    const category = document.getElementById('productCategory').value;
    const price = document.getElementById('productPrice').value;

    // Add some basic validation here if needed
    if (!name || !category || !price) {
        alert("Please fill out all fields!");
        return;
    }

    const productData = {
        Name: name,
        Category: category,
        Price: price
    };

    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to add product');
        }
    })
    .then(data => {
        alert('Product added successfully!');
    })
    .catch(error => {
        alert(error.message);
    });
});

document.querySelectorAll('input[name="updateField"]').forEach(radio => {
    radio.addEventListener('change', async function() {
        const id = document.getElementById('updateId').value;
        if (!id) {
            alert('Please enter a Product ID first.');
            return;
        }

        try {
            const response = await fetch(`/api/products/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }
            const product = await response.json();

            document.getElementById('updateValue').value = product[radio.value];
            document.getElementById('updateValue').style.display = 'inline-block';
            document.getElementById('updateProduct').style.display = 'inline-block';
        } catch (error) {
            alert(error.message);
        }
    });
});

document.getElementById('updateId').addEventListener('input', async function() {
    const id = document.getElementById('updateId').value;

    if (id.trim() === "") {
        // Clear the search result table if the search box is empty
        document.getElementById('searchResultList').innerHTML = '';
        return;
    }

    try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }

        const product = await response.json();

        // Populate the search result table with the product
        const searchResultList = document.getElementById('searchResultList');
        searchResultList.innerHTML = ''; // Clear previous results

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.Name}</td>
            <td>${product.Id}</td>
            <td>${product.Category}</td>
            <td>${product.Price}</td>
        `;
        searchResultList.appendChild(tr);
    } catch (error) {
        console.error("Error fetching the product:", error);
    }
});
document.getElementById('updateProduct').addEventListener('click', async function() {
    const id = document.getElementById('updateId').value;
    const selectedField = document.querySelector('input[name="updateField"]:checked').value;
    const newValue = document.getElementById('updateValue').value;

    const response = await fetch(`/api/products/${id}`);
    const product = await response.json();
    product[selectedField] = newValue;  // Update the selected field with new value

    fetch(`/api/products/${id}`, 
    {
        method: 'PUT',
        headers: 
        {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    })
    .then(response => {
        if (response.ok) 
        {
            if (response.headers.get('content-type').includes('application/json')) 
            {
                return response.json().then(data => {
                    alert('Product updated successfully!');
                });
            } 
            else 
            {
                
                alert('Product updated successfully!');
            }
        } 
    })
    .then(data => {
        // After successfully updating the product, update the small table with the updated details
        const searchResultList = document.getElementById('searchResultList');
        searchResultList.innerHTML = ''; // Clear previous results

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${product.Name}</td>
            <td>${product.Id}</td>
            <td>${product.Category}</td>
            <td>${product.Price}</td>
        `;
        searchResultList.appendChild(tr);

        alert('Product updated successfully!');
    })
    .catch(error => {
        alert(error.message);
    });
});
document.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('h1, h2, input[type="text"], input[type="radio"], button, label');
    
    let scaleValue = 1 - window.scrollY / 1000;
    let opacityValue = 1 - window.scrollY / 1000;

    scaleValue = Math.max(scaleValue, 0);
    opacityValue = Math.max(opacityValue, 0);

    elements.forEach(el => {
        el.style.transform = `scale(${scaleValue})`;
        el.style.opacity = opacityValue;
    });
});