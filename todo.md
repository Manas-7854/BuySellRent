# Web pages:
 -  Login/Signup
 -  User dashboard - has a navbar to all the other pages and basic details of the user that can be edited
 -  Items page - has all the items that are being sold
 -  Item page - page for one single item with its information and an option to add it in the cart
 -  My cart page - so what happens here is all the items added in the cart should be shown with relevent description and price, a total price should also be shown, that is the sum of all the items in the cart, there should be an option to remove item from the cart, and there should be an option to buy all the items in the cart. upon placing the order the items get removed from the cart and now are shown to the users orders page (discussed below) and the same items are now shown on the sellers deliver page(discussed below). an otp is generated for each of the items, which is sent to the buyer and that otp is need by the seller to close the transaction in the delivery page
 - Order history -  all pending items along with their otp should be here, all the bough items and all the sold items should be here
 - Delivery page - for the seller all the items that need to be delivered should be shown here


# TODO :
    - implement delivery page and order completion
    - implement session/jwt (check if session is allowed)
    - hash the password and the otp before storing
    - generate a random otp everytime
    - make sure user cannot add item to cart added by that user
    - add the remove functionality from cart do this by changing post route for placing orders from /cart/post to /orders/post and the use the /cart/post to remove items from the cart
    - logout functionality
    - make user details editable
    - add vendor name to the items 

    - maybe make page to show items added by the user
    

 - implement google recaptcha
 - otp functionality
 - cas login
 - support functionality
 