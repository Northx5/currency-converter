describe('Check if Currency Converter elements exist', () => {
  it('visits currency converter page and checks layout', () => {
    cy.visit('/converter');
    cy.get('[data-cy=amount-label]').should('exist');
    cy.get('[data-cy=amount-input]').should('exist');
    cy.get('[data-cy=base-currency]').should('exist');
    cy.get('[data-cy=convert-to-currency]').should('exist');
    cy.get('[data-cy=submit-button]').should('exist');
  });
});