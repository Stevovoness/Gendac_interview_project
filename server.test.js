const request = require('supertest');
const app = require('./server.js'); 

global.fetch = jest.fn(); 

describe('DELETE /api/products/:id endpoint', () => {

    beforeEach(() => {
        fetch.mockClear();
    });

    it('should delete product data', async () => {
        const mockResponse = {
            message: "Product deleted successfully"
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
        });

        const res = await request(app).delete('/api/products/667');

        expect(fetch).toHaveBeenCalledWith('https://gendacproficiencytest.azurewebsites.net/API/ProductsAPI/667', { method: 'DELETE' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(mockResponse);
    });
});

describe('UPDATE /api/products/:id endpoint', () => {
    it('should update product data', async () => {
        const productId = '667';
        const mockUpdatedProduct = {
            id: productId,
            name: 'Updated Product Name',
            // ... other product properties ...
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockUpdatedProduct
        });

        const res = await request(app)
            .put(`/api/products/${productId}`)
            .send(mockUpdatedProduct);

        expect(fetch).toHaveBeenCalledWith(
            `https://gendacproficiencytest.azurewebsites.net/API/ProductsAPI/${productId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mockUpdatedProduct)
            }
        );
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(mockUpdatedProduct);
    });
});

describe('ADD /api/products endpoint', () => {
    it('should add product data', async () => {
        const mockNewProduct = {
            name: 'New Product',
            // ... other product properties ...
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ message: "Product added successfully!" })
        });

        const res = await request(app)
            .post('/api/products')
            .send(mockNewProduct);

        expect(fetch).toHaveBeenCalledWith(
            'https://gendacproficiencytest.azurewebsites.net/API/ProductsAPI/',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mockNewProduct)
            }
        );
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Product added successfully!" });
    });
});

describe('DISPLAY /api/products endpoint', () => {
    it('should fetch and display all products', async () => {
        const mockProducts = [
            { id: '1', name: 'Product 1' },
            { id: '2', name: 'Product 2' },
            // ... more products ...
        ];

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockProducts
        });

        const res = await request(app).get('/api/products');

        expect(fetch).toHaveBeenCalledWith('https://gendacproficiencytest.azurewebsites.net/API/ProductsAPI/');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(mockProducts);
    });
});