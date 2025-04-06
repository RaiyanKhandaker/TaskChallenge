class ProductDetailPage {
  saveProductTitle() {
    cy.get('oc-placeholder-v1.pdp_short-info__main-name').as('saveProductTitle')
    .should('exist') // Ensure that the element exists
    .invoke('text')  // Get the text inside the element
    .then((productName) => {
      cy.log('Product Name: ', productName); // Log the product name to the Cypress console
    });
  }

  addToCart() {
    cy.get(`[data-qa="addToBasket"]`).click();
    cy.wait(2000);
    cy.xpath('//oc-button-v1[@class="or_js_addToBasketConfirmation__redirectToBasketButton or_addToBasketConfirmationSheet__actionButton"]').invoke('click');
  }

  
}

export default ProductDetailPage;
