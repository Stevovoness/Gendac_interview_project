+---------------------------------------------+
|       Gendac Product Management Page        |
+---------------------------------------------+

Description:
------------
A simple product management application allowing users to add, 
    delete, view, and update product details.

Features:
---------
- Add Product: 
  - Input product details (ie. name, category, and price).
  
- Delete Product: 
  - Remove a product using its ID.
  
- List of Products: 
  - Display and refresh the list of all products.
  
- Update Product: 
  - Modify details by specifying the product ID and desired changes.

- Dynamic UI: 
  - Interface elements adapt based on scroll position for enhanced user experience.

- Live search update:
  - The search result updates whilst you type the ID

Built With:
-----------

- Frontend: Vanilla JavaScript, HTML5, CSS3
- Backend: Node.js with the Express.js framework
- External API: https://gendacproficiencytest.azurewebsites.net/API/ProductsAPI/

Getting Started:
----------------
Prerequisites:
  * Node.js, Jest and supertest.
  * Active internet connection (for the external API).

---------------

Steps for setting up application:
* Navigate to the project folder in command prompt
* Start the server using 'node server.js'
* Access via http://localhost:3001 in a browser

Steps for setting up unit tests:
* Navigate to the directory where the project folder is in cmd
* Type "npm test" and run command

Code Overview:
--------------
- app.js           : Client-side operations.
- Gendac_HTML.html : Main HTML structure.
- server.js        : Server-side operations using Express.js.
- styles.css       : Styling for the web interface.

Notes:
------
- Project was due during Engineering test week so minimal time went into fine-tuning.
- The code was set up to be modular, with a seperate backend and front end.
- The server was set up to handle all API requests, while the front end just handls client interactions with the HTML page. 
- I have experienced an internal server error which causes the add product functionality to fail. When this happened a server restart fixed the issue.
- Due to the live updating of the search result in update product, whilst you are typing the ID of the product to update, the console logs an error due to the current ID number in the text box not existing in the database. This is not an issue for the functionality of the code, do not be concerned with the logs in the console. It is just to notify you why the table is not updating.
