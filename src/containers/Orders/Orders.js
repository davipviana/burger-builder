import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import axiosInstance from '../../axiosInstance';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions';

const Orders = (props) => {
    const { fetchOrders, token, userId } = props;
    useEffect(() => {
        fetchOrders(token, userId);
    }, [fetchOrders, token, userId]);


    let orders = <Spinner />;

    if (!props.loading) {
        orders = props.orders.map(order => (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price} />
        ));
    }

    return (
        <div>
            {orders}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(actions.fetchOrdersInit(token, userId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axiosInstance));
