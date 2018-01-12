import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'
import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from 'semantic-ui-react'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const { children, handleClick, isLoggedIn } = props

  return (
    <div>
      <Menu as="nav" fixed="top" size="large" inverted>
        <Container>
          <Menu.Item as={Link} to="/home" header>Toy Shopper</Menu.Item>
          <Menu.Item as={Link} to="/home">Home</Menu.Item>
          <Menu.Item as={Link} to="/products">Products</Menu.Item>
          <Menu.Item as={Link} to="/cart">Cart</Menu.Item>
          <Menu.Item as={Link} to="/users">Users</Menu.Item>
          {
            isLoggedIn
              ? <div className="right menu">
                {/* The navbar will show these links after you log in */}
                <Menu.Item as="a" href="#" onClick={handleClick}>Logout</Menu.Item>
              </div>
              : <div className="right menu">
                {/* The navbar will show these links before you log in */}
                <Menu.Item as={Link} to="/login">Login</Menu.Item>
                <Menu.Item as={Link} to="/signup">Sign Up</Menu.Item>
              </div>
          }
        </Container>
      </Menu>
      <Container style={{ marginTop: '7em' }}>
        {children}
      </Container>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
