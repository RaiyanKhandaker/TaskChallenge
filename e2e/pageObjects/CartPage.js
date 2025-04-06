class CartPage {
  

    verifyProductInCart() {
        // Verify if the product name is present and visible in the cart
        cy.get('[data-qa="articleName"]').should('be.visible');  // Ensure that the element with the product name exists and is visible
        
      }
  
}


export default CartPage;