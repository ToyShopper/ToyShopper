import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import { Button, Checkbox, Form, Divider, Segment, Message, Icon, Grid, Container } from 'semantic-ui-react'
import {sendPasswordResetEmail } from '../store/orders';



class ForgotPassForm extends Component {

  createMail(user) {
    return (
      <div>
        <h1>Password Reset Confirmation</h1>
        <p>You have requested a password change. Please click this link to change your password: <a href="localhost:8080/reset" /></p>
      </div>
    )
  }
  render() {
    return (
      <Container>
      <h1>Forgot Password</h1>
    <Divider />
    <Segment >
    <Form onSubmit={this.props.handleSubmit} name="forgotPassword">
      <Form.Field>
        <label htmlFor="email">Email Address</label>
        <input placeholder="Email Address" name="email" />
      </Form.Field>
      <br/>
      <Button color="blue" type="submit">Reset Password</Button>
      </Form>
      {/* {error && error.response &&
      <div>
      <Message negative>
        <Message.Header>{error.response.data}</Message.Header>
      </Message>
      </div>} */}

    </Segment>
    </Container>
    )
  }
}

const mapDispatch = dispatch => ({
    handleSubmit: (evt) => {
      evt.preventDefault();
      console.log('hits submit')
      const email = evt.target.email.value;
      console.log(email)
      return dispatch(sendPasswordResetEmail({email}))
    }
})

export default connect(null, mapDispatch)(ForgotPassForm);
