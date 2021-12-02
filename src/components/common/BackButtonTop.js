import React from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { AiFillBackward } from "react-icons/ai";

const BackButtonTop = () => {
    let history = useHistory();


    return(
    <div className="back-button-top-page">
        <Button variant="info" onClick={history.goBack}>
            <AiFillBackward /> Go Back
        </Button>
    </div>
)}

export default BackButtonTop;