import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Divider, Segment, Message, Container } from 'semantic-ui-react'
import { sendPasswordResetEmail } from '../store/orders';
import { ToastContainer } from 'react-toastr';

class ForgotPassForm extends Component {
  renderMessage(title, message) {
    return (
      <Message>
      <Message.Header>{title}</Message.Header>
      {message}
      </Message>)
  }

  render() {
    let container;
    return (
      <Container className="container">
        <h1>Request for Resetting Your Password</h1>
        <Divider />
        <Segment >
          <ToastContainer
            ref={ref => container = ref}
            className="toast-top-right" />
          <Form onSubmit={this.props.handleSubmit} name="forgotPassword">
            <Form.Field>
              <label htmlFor="email">Email Address</label>
              <input placeholder="Email Address" name="email" />
            </Form.Field>
            <br />
            <Button color="blue" type="submit">Reset Password</Button>
          </Form>
          <Divider />
          <Button
            className="primary"
            onClick={() =>
              container.success(this.renderMessage('Warning', 'We are cool'))
            }>Test
          </Button>
        </Segment>
      </Container>
    )
  }
}

const mapDispatch = dispatch => ({
  handleSubmit: (evt) => {
    evt.preventDefault();
    const email = evt.target.email.value;
    return dispatch(sendPasswordResetEmail({ email }))
  }
})

export default connect(null, mapDispatch)(ForgotPassForm);
