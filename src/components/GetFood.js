import React, {useState} from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';

const CenterContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const StyledForm = styled(Form)`
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 20px;
    padding: 5%;
    width: 100%;
`;

const StyledLabel = styled(Form.Label)`
    color: #6885EB; 
    font-family: monospace;
    font-size: 22px;
    font-weight: normal;
    margin-top: 3px;
`;

const Row = styled.div`
    width: 45%; 
`;

const TopCommand = styled.div`
    color: #B4CDA1; 
    font-family: "Roboto", sans-serif; 
    font-size: 20px;
    font-weight: bolder;
    letter-spacing: 1px;
    margin-bottom: 1%;
    margin-top: 2%;
    text-align: center;
    width: 80%;
`;

const Submit = styled.button`
    border: 0px;
    border-radius: 20px;
    display: inline-block;
    font-family: "Roboto", sans-serif; 
    font-size: 17px;
    font-weight: bold;
    letter-spacing: 1px;

    margin: 0 0 10px 0; 
    position: relative;
    top: 100%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, 0%);

    overflow: hidden;  
    padding: 20px 50px;

    background-color: #FAF8F8;
    box-shadow: 0px 4px 0px #FFE395;
    border-radius: 32px;
    color: #7987F5;
    filter: drop-shadow(5px 10px 4px rgba(104, 133, 235, 0.2));

    &:hover{
        background-color: #7987F5;
        color: #FAF8F8;
        transition: background 0.3s, color 0.25s;
    }

    &:focus{
        outline: none;
    }
`;

const Option = styled.option`
`

const Warn = styled(Form.Text)`
    color: #FF8B8B;
`

const GetFood = () => {
    const [name, setName] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [neighbourhood, setNeighbourhood] = useState("");
    const [itemType, setItemType] = useState("");

    const [isFormComplete, setFormComplete] = useState(false);
    const [triedSubmitting, setTriedSubmitting] = useState(false);

    const hasEmptyField = () => {
        return itemType === "" || itemType === "Select" || name === "" || phoneNumber === "" || neighbourhood === "";
    }

    const badPhoneNumber = () => {
        let numWithoutAreaCode = phoneNumber.substring(2);
        if (numWithoutAreaCode === "") {
            return true;
        }

        return phoneNumber === "" || phoneNumber.length !== 12 || isNaN(parseInt(numWithoutAreaCode));
    }

    const createGetFoodUser = async (event) => {
        if (hasEmptyField() || badPhoneNumber()) {
            event.preventDefault();
            event.stopPropagation();
            setFormComplete(false);
            setTriedSubmitting(true);
            return;
        }
        
        const apiUrl = process.env.REACT_APP_API_URL;

        const data = {
            name: name,
            item_type: itemType,
            city: neighbourhood, // TODO make neighbourhood
            phone: phoneNumber,
        }

        let formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        fetch(`${apiUrl}/getfood` , {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: formData
        });

        setFormComplete(true);
    }

    if (isFormComplete) {
        return <Redirect to={'/thanksGet'} />;
    }

    return (
        <CenterContainer>
            <TopCommand>
                Please enter your information below
            </TopCommand>
            <Row>
                <StyledForm> 
                    {triedSubmitting &&
                        <Warn>
                            One or more fields are empty.
                        </Warn>
                    }

                    <Form.Group controlId="form.name">
                        <StyledLabel>
                            Name
                        </StyledLabel>
                        <Form.Control onChange={e => setName(e.target.value)} value={name}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="form.itemType">
                        <StyledLabel>
                            Looking For...
                        </StyledLabel>
                        <Form.Control as='select' onChange={e => setItemType(e.target.value)} required value={itemType}>
                            <Option>Select</Option>
                            <Option>Ready/Hot Food</Option>
                            <Option>Storable Food</Option>
                            <Option>Clothing</Option>
                            <Option>Daily Use Items</Option>
                        </Form.Control>
                        {(itemType === "" || itemType === "Select") &&
                            <Warn>
                                Please select the type of item.
                            </Warn>
                        }
                        
                    </Form.Group>

                    
                    <Form.Group controlId="form.phoneNumber">
                        <StyledLabel>
                            Phone Number
                        </StyledLabel>
                        <Form.Control placeholder="+1xxxxxxxxxx" onChange={e => setphoneNumber(e.target.value)} value={phoneNumber}></Form.Control>
                        {badPhoneNumber() &&
                            <Warn>
                                Please enter +1 followed by a 10-digit phone number using only numbers.
                            </Warn>
                        }
                    </Form.Group>

                    <Form.Group controlId="form.neighbourhood">
                        <StyledLabel>
                            Neighbourhood
                        </StyledLabel>
                        <Form.Control as='select' onChange={e => setNeighbourhood(e.target.value)} required value={neighbourhood}>
                            <Option>Select</Option>
                            <Option>Cambie Village</Option>
                            <Option>Chinatown/Downtown EastSide</Option>
                            <Option>Downtown Vancouver</Option>
                            <Option>Grandview-Woodland</Option>
                            <Option>Granville Island</Option>
                            <Option>Kerrisdale</Option>
                            <Option>Kitsilano</Option>
                            <Option>Marpole</Option>
                            <Option>Mount Pleasant</Option>
                            <Option>South Granville</Option>
                            <Option>Strathcona</Option>
                            <Option>UBC</Option>
                            <Option>West End</Option>
                        </Form.Control>
                        {(itemType === "" || itemType === "Select") &&
                            <Warn>
                                Please select a location.
                            </Warn>
                        }
                    </Form.Group>

                    <Submit type="submit" onClick={createGetFoodUser}>
                        Submit
                    </Submit>
                </StyledForm>
            </Row>
        </CenterContainer>
    );
};

export default GetFood;