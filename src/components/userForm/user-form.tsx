import { Box, Button } from '@mui/material'
import { Formik, Form, Field } from 'formik'
import { MockUser, MockUserCredentials } from '@/lib/db'
import { TextField } from 'formik-mui'
import { switcher } from 'rambdax'

export type FormType = 'Login' | 'Register' | 'Creation' | 'Update'

export interface UserFormProps {
  onSubmit?: (values: Partial<MockUserCredentials>) => void
  submitLabel: string
  type: FormType
  initialUser?: MockUser
  confirmPassword?: boolean
}

const UserForm = ({
  onSubmit,
  type,
  submitLabel = 'Submit',
  initialUser
}: UserFormProps): JSX.Element => {
  const submitHandler = (values: Partial<MockUserCredentials>): void => {
    onSubmit?.(values)
  }

  const initialValues = (
    type: FormType,
    initial?: MockUser
  ): Partial<MockUserCredentials> | Partial<MockUser> =>
    switcher<Partial<MockUserCredentials> | Partial<MockUser>>(type)
      .is('Creation', {
        email: '',
        first_name: '',
        last_name: '',
        avatar: ''
      })
      .is((v: FormType) => v === 'Login' || v === 'Register', {
        email: '',
        password: '',
        passwordConfirmation: ''
      })
      .is('Update', {
        email: initial?.email,
        first_name: initial?.first_name,
        last_name: initial?.last_name
      })
      .default({
        email: '',
        password: '',
        passwordConfirmation: ''
      })
  const init = initialValues(type, initialUser)
  const showNames = type === 'Creation' || type === 'Update'
  const showPassword = type === 'Login' || type === 'Register'
  const showConfirmationPassword = type === 'Register'
  return (
    <Formik
      initialValues={init}
      enableReinitialize
      validate={(values): Partial<MockUserCredentials> => {
        const errors: Partial<MockUserCredentials> = {}
        if (!values.email) {
          errors.email = 'Required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address'
        }
        if (!values.password && showPassword) {
          errors.password = 'Required'
        } else if (values.password !== values.passwordConfirmation && showConfirmationPassword) {
          errors.password = 'Passwords do not match.'
        }
        if (!values.passwordConfirmation && showConfirmationPassword) {
          errors.passwordConfirmation = 'Required'
        }
        return errors
      }}
      onSubmit={(values, { setSubmitting }): void => {
        submitHandler(values)
        setSubmitting(false)
      }}
    >
      {({
        submitForm,
        isSubmitting,
        touched,
        errors,
        isValid,
        dirty,
        initialValues
      }): JSX.Element => {
        return (
          <Form>
            <Box margin={1}>
              <Field
                component={TextField}
                name="email"
                type="email"
                label="Email"
                required
                error={touched['email'] && !!errors['email']}
                helperText={touched['email'] && errors['email']}
              />
            </Box>
            {showPassword && (
              <Box margin={1}>
                <Field
                  component={TextField}
                  type="password"
                  label="Password"
                  name="password"
                  error={touched['password'] && !!errors['password']}
                  helperText={touched['password'] && errors['password']}
                />
              </Box>
            )}
            {showNames && (
              <>
                <Box margin={1}>
                  <Field component={TextField} type="text" label="First Name" name="first_name" />
                </Box>
                <Box margin={1}>
                  <Field component={TextField} type="text" label="Last Name" name="last_name" />
                </Box>
              </>
            )}
            {showConfirmationPassword && (
              <Box margin={1}>
                <Field
                  component={TextField}
                  type="text"
                  label="Confirm Password"
                  name="passwordConfirmation"
                  error={touched['passwordConfirmation'] && !!errors['passwordConfirmation']}
                  helperText={touched['passwordConfirmation'] && errors['passwordConfirmation']}
                />
              </Box>
            )}
            <div>
              <Button
                sx={{ margin: 1 }}
                variant="contained"
                color="primary"
                disabled={isSubmitting || !isValid || !dirty}
                onClick={submitForm}
              >
                {submitLabel}
              </Button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default UserForm
