import React, { Component } from 'react'
import { Button, Form, Divider, Segment, Message, Icon, Grid, Container } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {sendPasswordResetConfirmationEmail } from '../store/orders';

class ResetPassForm extends Component {

  render() {
    return (
      <Container>
      <h1>Reset Password</h1>
    <Divider />
    <Segment >
    <Form onSubmit={this.props.handleSubmit} name="resetPassword">
      <Form.Field>
        <label htmlFor="password">New Password</label>
        <input placeholder="New Password" name="password" />
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
    const password = evt.target.password.value;
    console.log('handle submit', password, ownProps.match.params.token)
    return dispatch(sendPasswordResetConfirmationEmail({password}, ownProps.match.params.token))
  }
})

export default connect(null, mapDispatch)(ResetPassForm);

//export default ResetPassForm;
