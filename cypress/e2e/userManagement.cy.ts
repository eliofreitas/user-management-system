describe('user management functionality', () => {
  const EMAIL_INPUT_NAME = 'email'
  const FIRST_NAME_INPUT_NAME = 'first_name'
  const LAST_NAME_INPUT_NAME = 'last_name'
  const PASSWORD_INPUT_NAME = 'password'
  const LOGIN_BUTTON_TEXT = 'Login'
  const LOGOUT_BUTTON = 'Logout'
  const CREATE_NEW_USER = 'Create New User'
  const HOME_URL = 'http://localhost:3000/'
  const AUTH_PAGE_URL = 'http://localhost:3000/auth'
  const REGISTER_PAGE_URL = 'http://localhost:3000/register'
  const UPDATE_BUTTON = 'Update'
  const DELETE_BUTTON = 'Delete'
  const CREATE_BUTTON = 'Create'
  const CANCEL_BUTTON = 'Cancel'
  const NEXT_BUTTON = 'Next'
  const PREVIOUS_BUTTON = 'Previous'
  const TEST_USER_NAME = 'Eve Holt'
  const NEW_TEST_USER_NAME = 'test lasttest'
  const UPDATE_TEST_USER_NAME = 'Evet Holt'

  it('should display the correct page content', () => {
    cy.visit(AUTH_PAGE_URL)
    cy.get(`input[name="${EMAIL_INPUT_NAME}"]`).type('eve.holt@reqres.in')
    cy.get(`input[name="${PASSWORD_INPUT_NAME}"]`).type('pistol')
    cy.contains('button', LOGIN_BUTTON_TEXT).click()
    cy.url().should('eq', HOME_URL)
    cy.contains('button', LOGOUT_BUTTON)
    cy.contains('button', CREATE_NEW_USER)
    cy.contains('button', NEXT_BUTTON)
    cy.contains('button', PREVIOUS_BUTTON)
    cy.get(`a[href="/"]`)
    cy.get('h1').should('contain', 'Welcome on Board')
    cy.get('button').filter(`:contains("${UPDATE_BUTTON}")`).should('have.length', 6)
    cy.get('button').filter(`:contains("${DELETE_BUTTON}")`).should('have.length', 6)
    cy.contains('button', LOGOUT_BUTTON).click()
    cy.url().should('eq', REGISTER_PAGE_URL)
  })
  it('should be able to paginate', () => {
    cy.visit(AUTH_PAGE_URL)
    cy.get(`input[name="${EMAIL_INPUT_NAME}"]`).type('eve.holt@reqres.in')
    cy.get(`input[name="${PASSWORD_INPUT_NAME}"]`).type('pistol')
    cy.contains('button', LOGIN_BUTTON_TEXT).click()
    cy.url().should('eq', HOME_URL)
    //Logged
    cy.contains('button', PREVIOUS_BUTTON).should('have.attr', 'disabled')
    cy.contains(TEST_USER_NAME)
    cy.contains('button', NEXT_BUTTON).click()
    cy.contains(TEST_USER_NAME).should('not.exist')
    cy.contains('button', NEXT_BUTTON).should('have.attr', 'disabled')
    cy.contains('button', PREVIOUS_BUTTON).click()
    cy.contains(TEST_USER_NAME)
    cy.contains('button', PREVIOUS_BUTTON).should('have.attr', 'disabled')
    //Logout
    cy.contains('button', LOGOUT_BUTTON).click()
    cy.url().should('eq', REGISTER_PAGE_URL)
  })
  it('should be able to delete an user', () => {
    cy.visit(AUTH_PAGE_URL)
    cy.get(`input[name="${EMAIL_INPUT_NAME}"]`).type('eve.holt@reqres.in')
    cy.get(`input[name="${PASSWORD_INPUT_NAME}"]`).type('pistol')
    cy.contains('button', LOGIN_BUTTON_TEXT).click()
    cy.url().should('eq', HOME_URL)
    //Logged
    cy.contains(TEST_USER_NAME)
    cy.get('button')
      .filter(`:contains("${DELETE_BUTTON}")`)
      .should('have.length', 6)
      .eq(3) // select the fourth button (index 3)
      .click()
    cy.contains(TEST_USER_NAME).should('not.exist')
    //Logout
    cy.contains('button', LOGOUT_BUTTON).click()
    cy.url().should('eq', REGISTER_PAGE_URL)
  })
  it('should be able to update an user', () => {
    cy.visit(AUTH_PAGE_URL)
    cy.get(`input[name="${EMAIL_INPUT_NAME}"]`).type('eve.holt@reqres.in')
    cy.get(`input[name="${PASSWORD_INPUT_NAME}"]`).type('pistol')
    cy.contains('button', LOGIN_BUTTON_TEXT).click()
    cy.url().should('eq', HOME_URL)
    //Logged
    cy.contains(TEST_USER_NAME)
    cy.contains(UPDATE_TEST_USER_NAME).should('not.exist')
    cy.get('button')
      .filter(`:contains("${UPDATE_BUTTON}")`)
      .should('have.length', 6)
      .eq(3) // select the fourth button (index 3)
      .click()
    cy.get(`input[name="${FIRST_NAME_INPUT_NAME}"]`).type('t')
    cy.get('[role="dialog"]').within(() => {
      cy.contains('button', UPDATE_BUTTON).click()
    })
    cy.contains(TEST_USER_NAME).should('not.exist')
    cy.contains(UPDATE_TEST_USER_NAME)
    //Logout
    cy.contains('button', LOGOUT_BUTTON).click()
    cy.url().should('eq', REGISTER_PAGE_URL)
  })
  it('should be able to create an user', () => {
    cy.visit(AUTH_PAGE_URL)
    cy.get(`input[name="${EMAIL_INPUT_NAME}"]`).type('eve.holt@reqres.in')
    cy.get(`input[name="${PASSWORD_INPUT_NAME}"]`).type('pistol')
    cy.contains('button', LOGIN_BUTTON_TEXT).click()
    cy.url().should('eq', HOME_URL)
    //Logged
    cy.contains(NEW_TEST_USER_NAME).should('not.exist')
    cy.contains('button', CREATE_NEW_USER).click()
    cy.get(`input[name="${EMAIL_INPUT_NAME}"]`).type('test@test.com')
    cy.get(`input[name="${FIRST_NAME_INPUT_NAME}"]`).type('test')
    cy.get(`input[name="${LAST_NAME_INPUT_NAME}"]`).type('lasttest')
    cy.get('[role="dialog"]').within(() => {
      cy.contains('button', CREATE_BUTTON).click()
    })
    cy.contains('button', NEXT_BUTTON).click()
    cy.contains('button', NEXT_BUTTON).click()
    cy.contains(NEW_TEST_USER_NAME)
    //Logout
    cy.contains('button', LOGOUT_BUTTON).click()
    cy.url().should('eq', REGISTER_PAGE_URL)
  })
  it('should not be able to create an user with wrong values', () => {
    cy.visit(AUTH_PAGE_URL)
    cy.get(`input[name="${EMAIL_INPUT_NAME}"]`).type('eve.holt@reqres.in')
    cy.get(`input[name="${PASSWORD_INPUT_NAME}"]`).type('pistol')
    cy.contains('button', LOGIN_BUTTON_TEXT).click()
    cy.url().should('eq', HOME_URL)
    //Logged
    cy.contains(NEW_TEST_USER_NAME).should('not.exist')
    cy.contains('button', CREATE_NEW_USER).click()
    cy.get(`input[name="${EMAIL_INPUT_NAME}"]`).type('test@tes')
    cy.get(`input[name="${FIRST_NAME_INPUT_NAME}"]`).type('test')
    cy.get(`input[name="${LAST_NAME_INPUT_NAME}"]`).type('lasttest')
    cy.get('[role="dialog"]').within(() => {
      cy.contains('button', CREATE_BUTTON).should('have.attr', 'disabled')
    })
    cy.get('[role="dialog"]').within(() => {
      cy.contains('button', CANCEL_BUTTON).click()
    })
    cy.contains('button', NEXT_BUTTON).click()
    cy.contains('button', NEXT_BUTTON).should('have.attr', 'disabled')
    cy.contains(NEW_TEST_USER_NAME).should('not.exist')
    //Logout
    cy.contains('button', LOGOUT_BUTTON).click()
    cy.url().should('eq', REGISTER_PAGE_URL)
  })
  it('should not be able to create an user with an preexisting email', () => {
    cy.visit(AUTH_PAGE_URL)
    cy.get(`input[name="${EMAIL_INPUT_NAME}"]`).type('eve.holt@reqres.in')
    cy.get(`input[name="${PASSWORD_INPUT_NAME}"]`).type('pistol')
    cy.contains('button', LOGIN_BUTTON_TEXT).click()
    cy.url().should('eq', HOME_URL)
    //Logged
    cy.contains(TEST_USER_NAME)
    cy.contains('button', CREATE_NEW_USER).click()
    cy.get(`input[name="${EMAIL_INPUT_NAME}"]`).type('eve.holt@reqres.in')
    cy.get(`input[name="${FIRST_NAME_INPUT_NAME}"]`).type('test')
    cy.get(`input[name="${LAST_NAME_INPUT_NAME}"]`).type('lasttest')
    cy.get('[role="dialog"]').within(() => {
      cy.contains('button', CREATE_BUTTON).click()
    })
    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Email in use')
    })

    //Logout
    cy.contains('button', LOGOUT_BUTTON).click()
    cy.url().should('eq', REGISTER_PAGE_URL)
  })
  xit('should be able to delete all user', () => {
    /*
    this test may cause a timeout in the server
    cy.visit(AUTH_PAGE_URL)
    cy.get(`input[name="${EMAIL_INPUT_NAME}"]`).type('eve.holt@reqres.in')
    cy.get(`input[name="${PASSWORD_INPUT_NAME}"]`).type('pistol')
    cy.contains('button', LOGIN_BUTTON_TEXT).click()
    cy.url().should('eq', HOME_URL)
    //Logged
    cy.contains(TEST_USER_NAME)
    cy.get('button')
      .filter(`:contains("${DELETE_BUTTON}")`)
      .should('have.length', 6)
      .eq(0) // select the first button (index 0)
      .then(($button) => {
        for (let i = 0; i < 12; i++) {
          cy.wrap($button).click()
        }
      })
    cy.contains(TEST_USER_NAME).should('not.exist')
    cy.contains('No data')
    //Logout
    cy.contains('button', LOGOUT_BUTTON).click()
    cy.url().should('eq', REGISTER_PAGE_URL)
    */
  })
})
