import React from 'react';
import { Spinner } from 'react-bootstrap';

const SpinnerComp = () => (
    <div className="show-running-spinner">
        <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
)

export default SpinnerComp;