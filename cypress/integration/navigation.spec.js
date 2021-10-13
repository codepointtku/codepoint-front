describe('Navigation', () => {
  it('should navigate to the projects page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // The page should contain an h1 with "Meistä"
    cy.get('h1').contains('Meistä')
  })


  it('should navigate to the projects page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Click on first element containing 'Projektit'
    cy.contains('Projektit').click()

    // The url should include "/projects"
    cy.url().should('include', '/projects')

    // The page should contain an h1 with "Projektit"
    cy.get('h1').contains('Projektit')

  })
  
  it('should navigate to the members page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Click on first element containing 'Jäsenet'
    cy.contains('Jäsenet').click()

    // The url should include "/members"
    cy.url().should('include', '/members')

    // The page should contain an h1 with "Jäsenet"
    cy.get('h1').contains('Jäsenet')
  })
})