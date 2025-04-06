import CartPage from '../pageObjects/CartPage';
import HomePage from '../pageObjects/HomePage';
// import CartPage from '../pageObjects/CartPage';
import ProductDetailPage from '../pageObjects/ProductPage';
import SearchResultsPage from '../pageObjects/SearchResultsPage';

const homePage = new HomePage();
const searchResultsPage = new SearchResultsPage();
const productDetailPage = new ProductDetailPage();
const cartPage = new CartPage();

describe('Otto.de POM Trampoline Flow', () => {
  it('should complete the trampoline shopping flow correctly', () => {
    cy.visit('https://www.otto.de/');
    cy.wait(2000);

    homePage.acceptCookies();
    cy.wait(2000);

    homePage.search('trampolin');
    cy.wait(2000);

    searchResultsPage.sortByHighestPrice();
    cy.wait(2000);

    searchResultsPage.verifySortedProducts();
    cy.wait(2000);

    searchResultsPage.priceVerification();
    cy.wait(2000);

    searchResultsPage.applyPriceFilter(500, 1000);
    cy.wait(2000);

    searchResultsPage.openProduct(1);
    cy.wait(2000);

    productDetailPage.saveProductTitle();
    cy.wait(2000);

    const productName = productDetailPage.saveProductTitle();
    cy.wait(2000);

    productDetailPage.addToCart();
    cy.wait(2000);

    cartPage.verifyProductInCart(productName);
    

  });
});
