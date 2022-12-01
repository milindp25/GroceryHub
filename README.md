
                                        Grocery Hub

This is a Grocery Shopping website designed to provide the users with almost ease while shopping for their daily need



## Authors

- BEMBALAGI ABHISHEK
- MANDA SAI SUMEETH REDDY
- PRABHAKAR MILIND
- VUPPULA CHALAPATHY CHANDRA KISHORE


This project is designed by using React.js for the client side and using Express.js for the API which in turn calls the MYSQL and MongoDB where all the data is stored.

On this website, there are 3 pages, one for the user where-in he can view and order groceries, and one page for the admin, who can add/edit/delete users, and products and mark a product for delivery when the order is ready. The last webpage is for the delivery executives who can select the order to be delivered, on choosing the order, the delivery location along with the directions is displayed on google maps.
## Features Implemented

### User End
- Users can Register, Login and Edit the profile
- User can enter their address with the auto-fill option or can click on detect my location button to fetch their current address
- User can view the most liked products and is provided with suggestions based on the products they liked and products bought by them
- User can provide and view all products reviews
- Passwords set by the user are hashed and stored in the database, improving the security
- Auto Complete feature provided for product and location search
- The user has the option to choose whether he wants the order to be delivered or for store pickup
- User choices are stored and processed to show product suggestions

### Admin End 
- Only admin users can access the contents on this webpage
- Admin can create new users, edit users, and can delete users.
- Admin can add new products, edit and delete existing products
- Admin can view all orders and the products in each order and can delete any ordered products which will automatically trigger a refund to the customer.
- Inventory Maintainance can be done by the admin and products which are low on stock will be displayed to the admin
- Admin is shown with statistics such as the number of new users, number of orders, total earnings, and daily revenue and also shows by what amount the daily target is missing.
- Admin is presented with graphs to display total sales in the last 4 months, each user's sales in the last 4 months, each product's sales in the last 4 months
- Admin can mark an order as ready for delivery when all the products are packed and ready for delivery 
- Admin can mark an order as ready for pickup when all the products are packed and ready for pickup
- Admin can mark an order as picked up when the user picks up the order 

### Delivery Partner End
- Only the delivery Partner can access this webpage
- Delivery partners can view the orders which are marked as ready for delivery and are sorted based on the distance from their present location.
- When the package is collected from the store, the delivery partner can mark the package as out for delivery.
- On doing the above step, the delivery partner is shown the delivery location with the directions to the location on google maps.

### Deployment on the cloud
- The entire application is deployed on the google cloud platform using Nginx and dockers
- Once the files are dockerized, they are pushed onto google cloud using cloud SDK.
- Once the files are uploaded onto the cloud, a new service is created for each of the images and the images are deployed on google cloud.
- Once deployed, on opening the link, the web app is displayed
- MYSQL database is deployed on google cloud as well.
- MongoDB is deployed on AWS using MongoDB-Atlas
## Deployment

This project is already deployed on the cloud and can be accessed by using the below URL's

- User webpage : https://groceryhub-lt3xlxgsla-uc.a.run.app/
- Admin webpage :https://groceryadmin-m4wcydigzq-uc.a.run.app/
- Delivery Partner webpage : https://grocerydelivery-3cu6n5fvfa-uc.a.run.app/




## Folder-Structure

- Groceryhub -- This contains the user-side webpage code
- Admin -- This contains the admin side webpage code
- Grocerydelivery -- This contains the delivery partner side webpage code
- API -- This contains the API code , which is used to store/fetch data from the database