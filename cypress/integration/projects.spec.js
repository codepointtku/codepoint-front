/* eslint-disable jest/expect-expect */
describe('projects page', () => {
  beforeEach(() => {
    cy.visit('/projects')
  })

  it('should display the projects page', () => {
    cy.get('[data-test=page-title]').should('have.text', 'Projektit')
  })

  it('should display the projects', () => {
    cy.get('[data-test=project]').should('have.length', 3)
  })

  it('should display the projects with the correct data', () => {
    cy.get('[data-test=project]')
      .first()
      .find('[data-test=title]')
      .should('contain', 'Testi Title1')
    cy.get('[data-test=project]')
      .first()
      .find('[data-test=description]')
      .should('contain', 'Testi Description')
    cy.get('[data-test=project]')
      .first()
      .should('have.attr', 'href')
      .should('contain', 'http://www.example.com')
  })
})
