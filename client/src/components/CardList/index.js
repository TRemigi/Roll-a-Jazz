import React from 'react';

const CardList = ({ cards, name }) => {

    return (
        <div>
            <h3>{name}</h3>
            {cards &&
                cards.map(card => (
                    <div key = {card._id} className="card">
                        <p>{card.logoUrl}</p>
                        <p>{card.companyName}</p>
                        <p>{card.tagline}</p>
                        <p>{card.name}</p>
                        <p>{card.jobTitle}</p>
                        <p>{card.website}</p>
                        <p>{card.phone}</p>
                        <p>{card.email}</p>
                    </div>
            ))}
        </div>
    )
}

export default CardList;