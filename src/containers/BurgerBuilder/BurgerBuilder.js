import React, { Component } from 'react';

import Wrapper from '../../hoc/Wrapper';

class BurgerBuilder extends Component {
    render() {
        return (
            <Wrapper>
                <div>Burger</div>
                <div>Build Controls</div>
            </Wrapper>
        );
    };
}

export default BurgerBuilder;