import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Image, Divider} from 'semantic-ui-react'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props

  return (
    <div>
      <h1>Welcome, {email}</h1>
      <Divider clearing />
      <Image src="/logo.png" />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
