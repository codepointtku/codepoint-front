/* eslint-disable jest/expect-expect */
describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // should navigate to home page when clicking the logo
  it('should navigate to the home page when clicking the logo', () => {
    cy.get('[data-test=logo]').click()
    cy.url().should('include', '/')
    cy.get('[data-test=page-title]').should('have.text', 'Meistä')
  })

  // create tests should be able to navigate to the home page, projects page, and members page
  // by data-test attributes
  it('should navigate to the home page', () => {
    cy.get('[data-test=home-link]').click()
    cy.url().should('include', '/')
    cy.get('[data-test=page-title]').should('have.text', 'Meistä')
  })

  it('should navigate to the projects page', () => {
    cy.get('[data-test=projects-link]').click()
    cy.url().should('include', '/projects')
    cy.get('[data-test=page-title]').should('have.text', 'Projektit')
  })

  it('should navigate to the members page', () => {
    cy.get('[data-test=members-link]').click()
    cy.url().should('include', '/members')
    cy.get('[data-test=page-title]').should('have.text', 'Jäsenet')
  })

  // create tests should be able to navigate to the home page, projects page, and members page
  // by their URL
  it('should navigate to the home page by the URL', () => {
    cy.visit('/')
    cy.url().should('include', '/')
  })

  it('should navigate to the projects page by the URL', () => {
    cy.visit('/projects')
    cy.url().should('include', '/projects')
  })

  it('should navigate to the members page by the URL', () => {
    cy.visit('/members')
    cy.url().should('include', '/members')
  })
})
