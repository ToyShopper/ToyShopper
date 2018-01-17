import React from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import { Button, Checkbox, Form, Divider, Segment, Message, Icon, Grid, Input } from 'semantic-ui-react'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <h1>Please {displayName}</h1>
      <Divider clearing />
      <Grid
      textAlign="center"
      style={{ height: '100%' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
      <Segment.Group compact>
      <Segment compact className="authForm">
      <Form onSubmit={handleSubmit} name={name}>
      <Form.Group>
        <Form.Field>
          <Input placeholder="Email Address" name="email" icon="at" iconPosition="left"/>
        </Form.Field>
        <Form.Field>
          <Input icon="lock" iconPosition="left" placeholder="Password" name="password" type="password"/>
        </Form.Field>
        </Form.Group>
        { (name === 'signup') &&
        <Form.Group>

          <Form.Field>
            <Input placeholder="First Name" name="firstName" icon="user" iconPosition="left"/>
          </Form.Field>
          <Form.Field>
          <Input placeholder="Last Name" name="lastName" icon="user" iconPosition="left"/>
        </Form.Field>
        </Form.Group>
        }
        <Checkbox label="I agree to the Terms and Conditions" />
        <Button color="blue" type="submit">{displayName}</Button>
        {error && error.response &&
        <div>
        <Message negative>
          <Message.Header>{error.response.data}</Message.Header>
        </Message>
        </div>}
      </Form>
      <Divider />
        <Link to="/auth/google" target="_self">
          <Button color="google plus">
          <Icon name="google plus" /> Login with Google
          </Button>
        </Link>
        <Link to="/forgot">
          <Button color="blue">
          <Icon name="key" />Forgot Password?
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
      let userInfo = {
        email: evt.target.email.value,
        password: evt.target.password.value
      }
      dispatch(auth(userInfo, formName))
    }
  }
}
const mapSignupDispatch = dispatch => {
  return {
    handleSubmit (evt) {
      evt.preventDefault();
      const userInfo = {
        firstName: evt.target.firstName.value,
        lastName: evt.target.lastName.value,
        email: evt.target.email.value,
        password: evt.target.password.value,
        role: 'user'
      }
      const formName = evt.target.name;
      dispatch(auth(userInfo, formName));
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapSignupDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
