const fetch = require('node-fetch');
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

//Adds the server to localhost:3001
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

app.get('/api/products', async (req, res) => {
   try 
	{
        	const response = await 		fetch('https://gendacproficiencytest.azurewebsites.net/API/ProductsAPI/');
        	const data = await response.json();
        	res.json(data);
    	} 
   catch (error) 
	{
    	console.error('Detailed error:', error); 
    	res.status(500).json({ error: 'Failed to fetch products' });
	}
	});
app.delete('/api/products/:id', async (req, res) => {
    try 
	{
        const { id } = req.params;
        const response = await 	fetch(`https://gendacproficiencytest.azurewebsites.net/API/ProductsAPI/${id}`, 
	    {
		    method: 'DELETE'
    	});

        if (response.status === 204) 
        {
            // No content, product deleted successfully
            res.json({ message: 'Product deleted successfully' });
        } 
        else if (response.ok) 
        {
            // Other success statuses (e.g., 200) with potential JSON response
            if (response.headers.has('content-type') && response.headers.get('content-type').includes('application/json')) 
            {
                const data = await response.json();
            } 
            else 
            {
                res.json({ message: 'Product deleted successfully' });
            }
        } 
        else 
        {
            const errorText = await response.text(); 
            throw new Error(errorText || 'Failed to delete product');
        }
	} 
    catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: "Failed to delete product" });
    }
    });
    app.post('/api/products', async (req, res) => {
        try {
            const productData = req.body;
    
            const response = await fetch('https://gendacproficiencytest.azurewebsites.net/API/ProductsAPI/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData)
            });
    
            // Check for a successful response
            if (response.ok) {
                res.json({ message: "Product added successfully!" });
            } else {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            res.status(500).json({ error: error.message });
        }
    });

app.get('/api/products/:id', async (req, res) => 
{
    try 
    {
        const { id } = req.params;
        const response = await fetch(`https://gendacproficiencytest.azurewebsites.net/API/ProductsAPI/${id}`);

        if (response.ok) 
        {
            const data = await response.json();
            res.json(data);
        } 
        else 
        {
            const errorData = await response.text();
            console.error('API Response Error when fetching single product:', errorData);
            throw new Error(errorData || 'Failed to fetch product details');
        }
    } 
    catch (error) 
    {
        console.error('Error fetching product details:', error);
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/products/:id', async (req, res) => 
{
    try 
    {
        const { id } = req.params;
        const updatedProductData = req.body;

        const response = await fetch(`https://gendacproficiencytest.azurewebsites.net/API/ProductsAPI/${id}`, {
            method: 'PUT',
            headers: 
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProductData)
        });
        
        if (response.ok) 
        {
            if (response.headers && response.headers.has('content-type') && response.headers.get('content-type').includes('application/json')) 
            {
                const data = await response.json();
                res.json(data);
            } 
            else 
            {
                // If there's no JSON content, you can send a simple success message
                res.json({ message: 'Product updated successfully' });
            }
        } 
        else 
        {
            const errorData = await response.text();
            console.error('API Response Error during PUT:', errorData);
		    console.log(response.status, await response.text());
            throw new Error(errorData || 'Failed to update product');
        }
    } 
    catch (error) 
    {
        console.error('Error updating product:', error);
        //res.status(500).json({ error: error.message });
    }
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Catch-all handler (Displays HTML if the app.js file wasnt found)
app.get('*', (req, res) => 
{
    res.sendFile(path.join(__dirname, 'public/Gendac_HTML.HTML'));
});
module.exports = app; 
