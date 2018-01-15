import React from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import { Button, Checkbox, Form, Divider, Segment, Message, Icon, Grid, Container } from 'semantic-ui-react'


const ForgotPassForm = () => {
  return (
    <Container>
      <h1>Forgot Password</h1>
    <Divider />
    <Segment >
    <Form onSubmit="" name="forgotPassword">
      <Form.Field>
        <label htmlFor="email">Email Address</label>
        <input placeholder="Email Address" name="email" />
      </Form.Field>
      </Form>
      <Button color="blue" type="submit">Reset Password</Button>
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

export default connect(null, null)(ForgotPassForm);
