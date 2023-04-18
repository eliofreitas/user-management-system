describe('Theme change Functionality', () => {
  const EMAIL_INPUT_NAME = 'email'
  const PASSWORD_INPUT_NAME = 'password'
  const LOGIN_BUTTON_TEXT = 'Login'
  const LOGOUT_BUTTON = 'Logout'
  const HOME_URL = 'http://localhost:3000/'
  const AUTH_PAGE_URL = 'http://localhost:3000/auth'
  const REGISTER_PAGE_URL = 'http://localhost:3000/register'
  const CREATE_NEW_USER = 'Create New User'

  it('should allow user login with valid values', () => {
    cy.visit(AUTH_PAGE_URL)
    cy.get(`input[name="${EMAIL_INPUT_NAME}"]`).type('eve.holt@reqres.in')
    cy.get(`input[name="${PASSWORD_INPUT_NAME}"]`).type('pistol')
    cy.contains('button', LOGIN_BUTTON_TEXT).click()
    cy.url().should('eq', HOME_URL)
    cy.contains('button', CREATE_NEW_USER).should(
      'have.css',
      'background-color',
      'rgb(85, 108, 214)'
    )
    cy.get('button[aria-label="Change Theme"]').click()
    cy.contains('button', CREATE_NEW_USER).should(
      'have.css',
      'background-color',
      'rgb(144, 202, 249)'
    )
    cy.get('button[aria-label="Change Theme"]').click()
    cy.contains('button', CREATE_NEW_USER).should(
      'have.css',
      'background-color',
      'rgb(85, 108, 214)'
    )
    cy.contains('button', LOGOUT_BUTTON).click()
    cy.url().should('eq', REGISTER_PAGE_URL)
  })
})
