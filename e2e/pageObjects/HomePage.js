// cypress/e2e/pageObjects/HomePage.js


class HomePage {
  acceptCookies() {
    cy.wait(1000); // Give the banner a moment to load
  
    cy.get('body').then(($body) => {
      if ($body.find('[data-qa="onetrust-accept-btn-handler"]').length > 0) {
        cy.get('[data-qa="onetrust-accept-btn-handler"]', { timeout: 10000 })
          .should('be.visible')
          .click();
      } else cy.get('#onetrust-accept-btn-handler').click;
    }
   );
  }

  search(term) {
    cy.xpath(`//*[@data-qa-id='search-field']`, { timeout: 10000 })
      .should('be.visible')
      .type(`${term}{enter}`);
  }
}

export default HomePage;
