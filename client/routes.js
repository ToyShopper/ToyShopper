import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, Router} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome,
  AllProducts, ProductsByCategory, ProductsBySearch,
  ProductDetail, AddProductForm, EditProductForm,
  Cart, Checkout,
  UserList, UserDetail,
  OrderDetail, AllOrders, MyOrders } from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/categories/:category" component={ProductsByCategory} />
            <Route exact path="/products/search/:keyword" component={ProductsBySearch} />
            <Route exact path="/products/add" component={AddProductForm} />
            <Route exact path="/products/:id/edit" component={EditProductForm} />
            <Route exact path="/products/:id" component={ProductDetail} />
            <Route exact path="/products" component={AllProducts} />


            <Route path="/users/:id" component={UserDetail} />
            <Route path ="/users" component={UserList} />

            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders/users/:id" component={MyOrders} />
            <Route path="/orders/:id" component={OrderDetail} />
            {isAdmin && <Route path="/orders/" component={AllOrders} />}
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={UserHome} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: (state.user.role && state.user.role === 'admin'),
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
