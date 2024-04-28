describe('Navigation', () => {
  it('should navigate to the home page', () => {
    // // Start from the index page
    cy.visit('/');
    //
    // // Find a link with an href attribute containing "about" and click it
    // cy.get('a[href*="bookmarks"]').click();
    //
    // // The new url should include "/about"
    // cy.url().should('include', '/bookmarks');
    //
    // The new page should contain an h1 with "H1 Title"
    cy.get('h1').contains('H1 Title');
  });
});
