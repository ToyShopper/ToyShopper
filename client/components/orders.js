import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchOrders, fetchOrdersByStatus } from '../store/orders';
import { fetchStatuses } from '../store/statuses';
import { Item, Dropdown, Input } from 'semantic-ui-react';

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
        {order.user &&
        (<Item.Content>
          <Item.Header>User</Item.Header>
          <Item.Description>{order.user.fullName}</Item.Description>
        </Item.Content>)
        }
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
        <Dropdown text='Filter Orders' icon='filter' floating labeled button className='icon'>
          <Dropdown.Menu>
            <Dropdown.Header icon='tags' content='Categories' />
            <Dropdown.Menu scrolling>
              {statusArr.map(status => {
                return (
                  <Dropdown.Item key={status} text={status} onClick={onFilterClick}/>
                )
              })}
              <Dropdown.Item text="ALL" onClick={loadOrders} />
            </Dropdown.Menu>
          </Dropdown.Menu>
        </Dropdown>
        {orders.length > 0 &&

          <Item.Group divided>
            {orders.map(order => this.renderOrder(order))}
          </Item.Group>
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

export default connect(mapState, mapDispatch)(Orders)
