import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchOrders, fetchOrdersByStatus, fetchOrdersByUser } from '../store/orders';
import { fetchStatuses } from '../store/statuses';
import { Item, Dropdown, Segment } from 'semantic-ui-react';

/* -----------------    COMPONENT     ------------------ */

class Orders extends Component {

  componentDidMount() {
    this.props.loadOrders();
    this.props.loadStatuses();
  }

  renderOrder(order) {
    return (
      <Item key={order.id} as={Link} to={'/orders/' + order.id}>
        <Item.Content>
          <Item.Header>Order #{order.id}</Item.Header>
          <Item.Meta>Ordered on {new Date(order.orderedAt).toTimeString()}</Item.Meta>
          <Item.Description>Order Status: {order.status}</Item.Description>
          <Item.Description>Order Total: $ {Number(order.total).toFixed(2)}</Item.Description>
        </Item.Content>
        <Item.Content>
          <Item.Header>User</Item.Header>
          <Item.Description>
            {order.user ? order.user.fullName : ''}
          </Item.Description>
          < Item.Meta >{order.email}</Item.Meta>
        </Item.Content>
      </Item>
    )
  }

  render() {
    const { orders, statuses, onFilterClick, loadOrders } = this.props;
    let statusArr = statuses.map(statusObj => {
      return statusObj['DISTINCT']
    });

    return (
      <div>
        <h1>Orders</h1>
        <Dropdown text='Filter Orders' icon='filter' floating labeled button className='icon'>
          <Dropdown.Menu>
            <Dropdown.Header icon='tags' content='Categories' />
            <Dropdown.Menu scrolling>
              {statusArr.map(status => {
                return (
                  <Dropdown.Item key={status} text={status} onClick={onFilterClick} />
                )
              })}
              <Dropdown.Item text="ALL" onClick={loadOrders} />
            </Dropdown.Menu>
          </Dropdown.Menu>
        </Dropdown>
        {orders.length > 0 &&
          <Segment raised>
            <Item.Group divided>
              {orders.map(order => this.renderOrder(order))}
            </Item.Group>
          </Segment>
        }
      </div>
    )
  }
}

const mapState = ({ orders, statuses }) => ({ orders, statuses });

const mapDispatch = dispatch => ({
  loadOrders: () => dispatch(fetchOrders()),
  loadStatuses: () => dispatch(fetchStatuses()),
  onFilterClick: (event, data) => dispatch(fetchOrdersByStatus(data.text))
})

const mapUserDispatch = (dispatch, ownProps) => ({
  loadOrders: () => dispatch(fetchOrdersByUser(ownProps.match.params.id)),
  loadStatuses: () => dispatch(fetchStatuses()),
  onFilterClick: (event, data) => dispatch(fetchOrdersByStatus(data.text))
})

export const AllOrders = connect(mapState, mapDispatch)(Orders)
export const UserOrders = connect(mapState, mapUserDispatch)(Orders)

