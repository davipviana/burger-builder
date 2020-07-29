import React, { useState } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';

import * as actions from '../../../store/actions';
import { checkFormItemValidity } from '../../../shared/utils';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

import styles from './ContactData.module.css';

const ContactData = (props) => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        },
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: props.ingredients,
            price: props.price,
            orderData: formData,
            userId: props.userId
        };

        props.orderBurger(order, props.token);
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = { ...orderForm };
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkFormItemValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let isValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            isValid = updatedOrderForm[inputIdentifier].valid && isValid;
        }

        setOrderForm(updatedOrderForm);
        setFormIsValid(isValid);
    }

    const formElements = [];
    for (let key in orderForm) {
        formElements.push({
            id: key,
            config: orderForm[key]
        });
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElements.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    onChange={(event) => inputChangedHandler(event, formElement.id)} />
            ))}
            <Button type="Success" disabled={!formIsValid}>ORDER</Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />
    }

    return (
        <div className={styles.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        orderBurger: (order, token) => dispatch(actions.purchaseBurgerInit(order, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
