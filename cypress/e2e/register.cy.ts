describe('Registration Functionality', () => {
  const PAGE_URL = 'http://localhost:3000/register'
  const EMAIL_INPUT_NAME = 'email'
  const PASSWORD_INPUT_NAME = 'password'
  const PASSWORD_CONFIRMATION_INPUT_NAME = 'passwordConfirmation'
  const REGISTER_BUTTON_TEXT = 'Register'
  const AUTH_PAGE_URL = 'http://localhost:3000/auth'

  it('should display the correct page content', () => {
    cy.visit(PAGE_URL)
    cy.get(`a[href="/register"]`)
    cy.get(`a[href="/auth"]`)
    cy.get('h1').should('contain', 'Register')
  })

  it('should allow user registration with valid values', () => {
    cy.visit(PAGE_URL)
    cy.get(`input[name="${EMAIL_INPUT_NAME}"]`).type('eve.holt@reqres.in')
    cy.get(`input[name="${PASSWORD_INPUT_NAME}"]`).type('pistol')
    cy.get(`input[name="${PASSWORD_CONFIRMATION_INPUT_NAME}"]`).type('pistol')
    cy.contains('button', REGISTER_BUTTON_TEXT).click()
    cy.url().should('eq', AUTH_PAGE_URL)
  })

  it('should disable registration button for invalid email', () => {
    cy.visit(PAGE_URL)
    cy.get(`input[name="${EMAIL_INPUT_NAME}"]`).type('not@not')
    cy.get(`input[name="${PASSWORD_INPUT_NAME}"]`).type('pistol')
    cy.get(`input[name="${PASSWORD_CONFIRMATION_INPUT_NAME}"]`).type('pistol')
    cy.contains('button', REGISTER_BUTTON_TEXT).should('have.attr', 'disabled')
    cy.url().should('eq', PAGE_URL)
  })

  it('should disable registration button for invalid passwords', () => {
    cy.visit(PAGE_URL)
    cy.get(`input[name="${EMAIL_INPUT_NAME}"]`).type('eve.holt@reqres.in')
    cy.get(`input[name="${PASSWORD_INPUT_NAME}"]`).type('pistfol')
    cy.get(`input[name="${PASSWORD_CONFIRMATION_INPUT_NAME}"]`).type('pistol')
    cy.contains('button', REGISTER_BUTTON_TEXT).should('have.attr', 'disabled')
    cy.url().should('eq', PAGE_URL)
  })

  it('should not allow user registration with non-existent values', () => {
    cy.visit(PAGE_URL)
    cy.get(`input[name="${EMAIL_INPUT_NAME}"]`).type('eve.holt@reqres.in')
    cy.get(`input[name="${PASSWORD_INPUT_NAME}"]`).type('gun')
    cy.get(`input[name="${PASSWORD_CONFIRMATION_INPUT_NAME}"]`).type('gun')
    cy.contains('button', REGISTER_BUTTON_TEXT).click()
    cy.url().should('eq', PAGE_URL)
  })
})
