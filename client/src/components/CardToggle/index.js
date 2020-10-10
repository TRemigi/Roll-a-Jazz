import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faClone } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';

const CardToggle = ({ viewSelected, setViewSelected }) => {

    const handleToggle = () => {
        setViewSelected(!viewSelected)
    };

    return (
        <div variant="secondary" size="sm" onClick={handleToggle} className=" car-view" border={false}>
            {viewSelected ? 
            (<FontAwesomeIcon icon={faThLarge} size="lg" border={false}/>) :
            (<FontAwesomeIcon icon={faClone}  size="lg" border={false}/>)}
        </div>
    )
};

export default CardToggle;