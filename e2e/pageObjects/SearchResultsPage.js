class SearchResultsPage {
  constructor() {
    // Element selectors
    this.searchInput = '[data-role="search-input"]';
    
  }

  /**
   * Perform product search
   * @param {string} searchTerm  //Text to search for
   * @returns {SearchResultsPage} //Instance of search results page
   */

  searchForProduct(searchTerm) {
    cy.get(this.searchInput)
      .should('be.visible')
      .type(`${searchTerm}{enter}`)
      .should('have.value', searchTerm);

    // Wait for search results to load
    cy.waitForProductsUpdate();

    
  }

  // Optional: Alternative implementation with search button click
  searchUsingButton(searchTerm) {
    cy.get(this.searchInput)
      .type(searchTerm)
      .get(this.searchButton)
      .click();
  
  }
  sortByHighestPrice() {
    cy.get('#heureka_desktopSorting--select--cloned').select('preis-absteigend'); // select decending order
  }

  verifySortedProducts() {
    
    cy.xpath('//*[@data-list-position="1"]').should('exist');
    cy.xpath('//*[@data-list-position="2"]').should('exist');
    cy.xpath('//*[@data-list-position="3"]').should('exist');
    cy.xpath('//*[@data-list-position="4"]').should('exist');
    cy.xpath('//*[@data-list-position="5"]').should('exist');
  }

  priceVerification() {
    cy.intercept('GET', '**/vendorlist/*.json').as('iabData');
    cy.get(`[data-filter-title="Preis"] > .pl_accordion__header`).should('be.visible').as('btn');
    cy.get('@btn').click();
  }

  validateTopPricesDescending(count = 5) {
    cy.get('[data-qa="product-tile"]').its('length').should('be.gte', count);
    cy.get('[data-qa="product-tile"]').then($items => {
      const prices = [];
      $items.slice(0, count).each((_, el) => {
        const text = Cypress.$(el).find('[data-qa="product-price"]').text().replace(/[^\d,]/g, '').replace(',', '.');
        prices.push(parseFloat(text));
      });

      const sorted = [...prices].sort((a, b) => b - a);
      expect(prices, 'Prices should be sorted descending').to.deep.equal(sorted);
    });
  }

  applyPriceFilter(min, max) {
    cy.get('input[data-ts-feature-ref="facetValue_retailprice_value"]')
    .eq(0) // First input element (index 0)
    .clear()
    .type('500') // Type in the first input field
    .should('have.value', min);

    cy.get('input[data-ts-feature-ref="facetValue_retailprice_value"]')
    .eq(1) // First input element (index 0)
    .clear()
    .type('1000') // Type in the first input field
    .should('have.value', max);


    cy.xpath(`//form[@id='find_filter_preis']//button[@type='submit'][normalize-space()='Auswahl ansehen']`).click();
    cy.wait(2000);
  }

  
  

  openProduct() {
    cy.get('[data-qa="ftfind-product-1"]').eq(0).click();
  }
}

export default SearchResultsPage;
