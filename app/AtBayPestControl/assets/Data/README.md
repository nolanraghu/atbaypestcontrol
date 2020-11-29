# Data
This directory contains the data that is used to populate the information in the app, such as product and bug information, details about who to contact when there are issues, etc. Here is some of the important information you need to know. 
## Data
This essentially creates singletons for all the data needed in the app
## DevTeamInfo
This is the details you get if you click "Contact Us"
## Storage
This creates the functions that are used to store the user information on the phone
## UsefulConstants
Holds the number of products, equipment, and infestations
## allEquipment
This contains the details for each of the pieces of equipment, as given by the client. Each is given a unique id, name, description, and price. This is the price the customer will have to pay if they need to repurchase a piece of equipment, and will also be added on to the upfront price of a plan if they need it. The image should be edited in images/index.ts
## allInfestations
This contains the details for each infestation, as given by the client. Each is given a unique id, name, description, products list, upfront and monthly price. The infestation at id 0 should be the prevention plan. The description should include a description of the bugs that are treated and important information, such as how to recognize if you have an infestation of that type, as the products will be shown and described separately. The image should be the image of the bug that the treatment treats, typically. The products list is an array of the ids of the products to be used to treat the infestation. 

***Important!!!*** The upfront price does not include the equipment price, as the customer may already have the equipment for a product in another infestation. The customer will be charged the upfront price + the price of any equipment they need at first. The following month and in the future, they will be charged the monthly price, which covers the products they will receive in the future. 

The main purpose of the upfront cost is to make sure the customer doesn't cancel right after they receive the product, in which case they may have only paid for a third of the price. You can probably offset this price (which could end up being quite high) by increasing the required infestation time, which would require them to have the infestation for some period of time before deleting it from their plan. Make sure if this does exist, that it is listed in the description of the infestation, otherwise there will be no way for the customer to know about it. The infestation's image should be edited in images/index.ts
## allProducts
This contains the details for the products, as given by the client. Each is given a unique id, name, description, equipment list, price, and timeline. The description should currently include basic application instructions, and the timeline, since that will not be listed anywhere else. The price is only used if the customer runs out and wants to order more before their normal receiving date, in which case they will be charged the price listed. The equipment list is an array of the id's of the equipment needed to use the product, which will be clearly listed for the user to see, so it does not need to be included in the description given here.
