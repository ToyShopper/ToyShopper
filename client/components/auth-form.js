import React from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import { Button, Checkbox, Form, Divider, Segment, Message, Icon, Grid } from 'semantic-ui-react'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <Grid textAlign='center'
      style={{ height: '100%' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
      <Segment.Group compact>
      <Segment compact stacked className="authForm">
      <Form onSubmit={handleSubmit} name={name}>
        <Form.Field>
          <label htmlFor="email">Email Address</label>
          <input placeholder="Email Address" name="email" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input placeholder="Password" name="password" type="password"/>
        </Form.Field>
        <Form.Field>
          <Checkbox label="I agree to the Terms and Conditions" />
        </Form.Field>
        <Button color="blue" type="submit">{displayName}</Button>
        {error && error.response &&
        <div>
        <Message negative>
          <Message.Header>{error.response.data}</Message.Header>
        </Message>
        </div>}
      </Form>
      <Divider></Divider>
        <Link to="/auth/google" traget="_self">
          <Button color='google plus'>
          <Icon name='google plus' /> Login with Google
          </Button>
        </Link>
      </Segment>
      </Segment.Group>
      </Grid.Column>

      </Grid>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
