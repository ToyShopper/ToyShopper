import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import { Button, Checkbox, Form, Divider, Segment, Message, Icon, Grid, Container } from 'semantic-ui-react'
import {sendPasswordResetEmail } from '../store/orders';

class ForgotPassForm extends Component {

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
    </Segment>
    </Container>
    )
  }
}

const mapDispatch = dispatch => ({
    handleSubmit: (evt) => {
      evt.preventDefault();
      const email = evt.target.email.value;
      return dispatch(sendPasswordResetEmail({email}))
    }
})

export default connect(null, mapDispatch)(ForgotPassForm);
