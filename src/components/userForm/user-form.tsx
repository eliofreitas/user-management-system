import { Box, Button } from '@mui/material'
import { Formik, Form, Field } from 'formik'
import { MockUser } from '@/lib/db'
import { TextField } from 'formik-mui'

export interface UserFormProps {
  onSubmit?: (values: Partial<MockUser>) => void
  submitLabel: string
  confirmPassword?: boolean
}
const UserForm = ({
  onSubmit,
  submitLabel = 'Submit',
  confirmPassword = false
}: UserFormProps): JSX.Element => {
  const submitHandler = (values: Partial<MockUser>): void => {
    onSubmit?.(values)
  }
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        passwordConfirmation: ''
      }}
      validate={(values): Partial<MockUser> => {
        const errors: Partial<MockUser> = {}
        if (!values.email) {
          errors.email = 'Required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address'
        }
        if (!values.password) {
          errors.password = 'Required'
        } else if (values.password !== values.passwordConfirmation && confirmPassword) {
          errors.password = 'Passwords do not match.'
        }
        if (!values.passwordConfirmation && confirmPassword) {
          errors.passwordConfirmation = 'Required'
        }
        return errors
      }}
      onSubmit={(values, { setSubmitting }): void => {
        submitHandler(values)
        setSubmitting(false)
      }}
    >
      {({ submitForm, isSubmitting, touched, errors, isValid, dirty }): JSX.Element => {
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
            {confirmPassword && (
              <Box margin={1}>
                <Field
                  component={TextField}
                  type="password"
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
