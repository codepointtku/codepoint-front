/* eslint-disable jest/expect-expect */
describe('Locales', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // language selector should be visible
  it('should be visible', () => {
    cy.get('[data-test=language-selector]').should('be.visible')
  })

  // should change the language to English
  it('should change the language to English', () => {
    cy.get('[data-test=language-selector]').trigger('mouseover')
    cy.get('[data-test=language-selector-option-en]').contains('English').click({force: true})
    cy.get('[data-test=page-title]').should('have.text', 'About us')
  })

  // should change the language to Finnish
  it('should change the language to Finnish', () => {
    cy.get('[data-test=language-selector]').trigger('mouseover')
    cy.get('[data-test=language-selector-option-fi]').contains('Suomi').click({force: true})
    cy.get('[data-test=page-title]').should('have.text', 'Meistä')
  })
})
