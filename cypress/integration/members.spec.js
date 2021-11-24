/* eslint-disable jest/expect-expect */
describe('members page', () => {
  beforeEach(() => {
    cy.visit('/members')
  })

  it('should display the members page', () => {
    cy.get('[data-test=page-title]').should('have.text', 'Jäsenet')
  })

  it('should display the members', () => {
    cy.get('[data-test=member]').should('have.length', 5)
  })

  describe('should display the members with correct data', () => {
    it('should display member profile image', () => {
      cy.get('[data-test=member-image]').should('have.attr', 'src')
    })

    it('should display member name', () => {
      cy.get('[data-test=member]')
        .first()
        .find('[data-test=name]')
        .should('contain', 'phuoc nguyen')
    })

    it('should display member bio', () => {
      cy.get('[data-test=member]')
        .first()
        .find('[data-test=bio]')
        .should('contain', 'Front-end developer at City of Turku, Codepoint')
    })

    it('should display member description', () => {
      cy.get('[data-test=member]')
        .first()
        .find('[data-test=description]')
        .should('contain', 'Testi About me')
    })

    // should display member social links
    it('should display member socials links', () => {
      //socials should be an 3 children and children should have href attribute
      cy.get('[data-test=member]')
        .first()
        .find('[data-test=socials]')
        .children()
        .should('have.length', 3)
        .and('have.attr', 'href')
    })
  })
})
