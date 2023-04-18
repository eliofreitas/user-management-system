describe('Login Functionality', () => {
  const EMAIL_INPUT_NAME = 'email'
  const PASSWORD_INPUT_NAME = 'password'
  const LOGIN_BUTTON_TEXT = 'Login'
  const LOGOUT_BUTTON = 'Logout'
  const HOME_URL = 'http://localhost:3000/'
  const AUTH_PAGE_URL = 'http://localhost:3000/auth'
  const REGISTER_PAGE_URL = 'http://localhost:3000/register'

  it('should display the correct page content', () => {
    cy.visit(AUTH_PAGE_URL)
    cy.get(`a[href="/register"]`)
    cy.get(`a[href="/auth"]`)
    cy.get('h1').should('contain', 'Login')
  })

  it('should allow user login with valid values', () => {
    cy.visit(AUTH_PAGE_URL)
    cy.get(`input[name="${EMAIL_INPUT_NAME}"]`).type('eve.holt@reqres.in')
    cy.get(`input[name="${PASSWORD_INPUT_NAME}"]`).type('pistol')
    cy.contains('button', LOGIN_BUTTON_TEXT).click()
    cy.url().should('eq', HOME_URL)
    cy.contains('button', LOGOUT_BUTTON).click()
    cy.url().should('eq', REGISTER_PAGE_URL)
  })

  it('should disable login button for invalid email', () => {
    cy.visit(AUTH_PAGE_URL)
    cy.get(`input[name="${EMAIL_INPUT_NAME}"]`).type('not@not')
    cy.get(`input[name="${PASSWORD_INPUT_NAME}"]`).type('pistol')
    cy.contains('button', LOGIN_BUTTON_TEXT).should('have.attr', 'disabled')
    cy.url().should('eq', AUTH_PAGE_URL)
  })

  it('should not allow login with non-existent values', () => {
    cy.visit(AUTH_PAGE_URL)
    cy.get(`input[name="${EMAIL_INPUT_NAME}"]`).type('eve.holt@reqres.inf')
    cy.get(`input[name="${PASSWORD_INPUT_NAME}"]`).type('gun')
    cy.contains('button', LOGIN_BUTTON_TEXT).click()
    cy.url().should('eq', AUTH_PAGE_URL)
  })

  it('should be able to navigate between register and login', () => {
    cy.visit(AUTH_PAGE_URL)
    cy.get(`a[href="/register"]`).click()
    cy.url().should('eq', REGISTER_PAGE_URL)
    cy.get(`a[href="/auth"]`).click()
    cy.url().should('eq', AUTH_PAGE_URL)
  })
  it('should not be able to navigate to home without login', () => {
    cy.visit(HOME_URL)
    cy.url().should('eq', REGISTER_PAGE_URL)
  })
  it('should not be able to navigate to register or login after login with valid values', () => {
    cy.visit(AUTH_PAGE_URL)
    cy.get(`input[name="${EMAIL_INPUT_NAME}"]`).type('eve.holt@reqres.in')
    cy.get(`input[name="${PASSWORD_INPUT_NAME}"]`).type('pistol')
    cy.contains('button', LOGIN_BUTTON_TEXT).click()
    cy.url().should('eq', HOME_URL)
    cy.visit(REGISTER_PAGE_URL)
    cy.url().should('eq', HOME_URL)
    cy.visit(AUTH_PAGE_URL)
    cy.url().should('eq', HOME_URL)
    cy.contains('button', LOGOUT_BUTTON).click()
    cy.url().should('eq', REGISTER_PAGE_URL)
  })
})
