import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Divider, Segment, Message, Container, Input } from 'semantic-ui-react'
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
              <Input placeholder="Email Address" name="email" iconPosition="left" icon="at" />
            </Form.Field>
            <br />
            <Button
            color="blue" type="submit" onClick={() =>
              container.success(this.renderMessage('Success', 'An email with instructions has been sent.'))
            }>Reset Password</Button>
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
    return dispatch(sendPasswordResetEmail({ email }))
  }
})

export default connect(null, mapDispatch)(ForgotPassForm);
