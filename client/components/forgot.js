import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import { Button, Checkbox, Form, Divider, Segment, Message, Icon, Grid, Container } from 'semantic-ui-react'
import {sendPasswordResetEmail } from '../store/orders';
import { ToastContainer } from "react-toastr";

class ForgotPassForm extends Component {

  render() {
    let container;
    return (
      <Container className="container">
      <ToastContainer
    ref={ref => container = ref}
    className="toast-top-right"
  />
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
      <button
      className="primary"
      onClick={() =>
        container.success((<Message>{`hi! Now is ${new Date()} ///title\\\\\\` }</Message>),{
        })
      }
    >
      Hello
    </button>
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
