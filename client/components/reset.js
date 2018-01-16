import React, { Component } from 'react'
import { Button, Form, Divider, Segment, Message, Icon, Input, Container, Label } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {sendPasswordResetConfirmationEmail } from '../store/orders';
import { ToastContainer } from 'react-toastr/lib/components/ToastContainer';

class ResetPassForm extends Component {

  renderMessage(title, message) {
    return (
      <Message>
        <Message.Header>{title}</Message.Header>
        {message}
      </Message>
    )
  }

  render() {
    let container;
    return (
    <Container>
      <h1>Reset Password</h1>
    <Divider />
    <Segment color="grey">
    <ToastContainer
      ref={ref => container = ref}
      className="toast-top-right" />
    <Form onSubmit={this.props.handleSubmit} name="resetPassword">
      <Form.Field>
        <Input placeholder="New Password" name="password" iconPosition="left" icon="lock"/>
      </Form.Field>
      <br/>
      <Form.Field>
        <Input placeholder="Confirm Password" name="confirmPassword" iconPosition="left" icon="lock"/>
      </Form.Field>
      <br/>
      <Button color="blue" type="submit">Reset Password</Button>
      </Form>
    </Segment>
    </Container>
    )
  }
}

const mapDispatch = (dispatch, ownProps) => ({
  handleSubmit: (evt) => {
    evt.preventDefault();
    if (evt.target.password.value === evt.target.confirmPassword.value) {
      const password = evt.target.password.value;
      return dispatch(sendPasswordResetConfirmationEmail({password}, ownProps.match.params.token))
    }
    else {

    }
  }
})

export default connect(null, mapDispatch)(ResetPassForm);

//export default ResetPassForm;
