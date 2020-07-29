import React from 'react';

import useErrorHandler from '../../hooks/useErrorHandler';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, errorConfirmedHandler] = useErrorHandler(axios);

    return (
      <React.Fragment>
        <Modal
          visible={error !== null}
          onModalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  }
}

export default withErrorHandler;