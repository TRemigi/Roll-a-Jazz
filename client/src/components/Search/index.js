import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { QUERY_USER_CARDS } from "../../utils/queries";
import { Form, Button } from "react-bootstrap";
import ResultsModal from "../SearchResultsModal";
import QrButton from "../QrButton";

const Search = ({ addCollectedCard, collectedCards }) => {

    const [searchCards, { data }] = useLazyQuery(QUERY_USER_CARDS);
    const initialResults = data?.userCards || [];

    let filteredResults = [];
    
    const [finalResults, setFinalResults] = useState(filteredResults);
    
    const filterResults = () => {
        filteredResults = [];

        for (let i = 0; i < initialResults.length; i++) {

            let isNewCard = true;

            for (let j = 0; j < collectedCards.length; j++) {

                if (initialResults[i]._id === collectedCards[j]._id) {

                    isNewCard = false;
                    break;

                } else {

                    continue;

                }
            }

            if (isNewCard === false) {

                continue;

            } else {

                filteredResults.push(initialResults[i])

            };
        }

        setFinalResults(filteredResults);
    };
    
    useEffect(() => {
        filterResults();
    }, [data]);

    
    // use State to handle ResultsModal
    // set initial show state to false
    const [show, setShow] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        await searchCards({
            variables: { name: e.target.nameInput.value }
        });
        
        setShow(true);
    };

    const scanHandler = () => {
        
        return (
            alert("You'll be able to scan QR codes by clicking this button!")
            // <JakesAwesomeScannerComponent />
        )
    };


    return (
    <div className="col-12">
      <ResultsModal
        show={show}
        setShow={setShow}
        results={finalResults}
        addCollectedCard={addCollectedCard}
      />
      <Button type="submit" className="mb-2">
        Search
      </Button>
      <QrButton />
    </div>
  );
};

export default Search;
