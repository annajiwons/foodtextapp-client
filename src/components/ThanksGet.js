import React from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';

const CenterContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Title = styled.h1`
    color: #6885EB;
    font-family: "Roboto", sans-serif; 
    font-size: 78px;
    font-weight: bolder;
    line-height: 84px;
    text-align: center;
`;

const StyledForm = styled(Form)`
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 20px;
    margin-top: 15%;
    padding: 5%;
    width: 80%;
`;

const FeedBack = styled.div`
    color: #6885EB;
    font-family: monospace;
    font-size: 30px;
    font-weight: normal;
    text-align: center;
`;

// TODO: refactor with thanksgive to one component

const ThanksGet = () => {
    return (
        <CenterContainer>
            <StyledForm>
                <Title>
                    Thank you! ☺
                </Title>
                <br></br>
                <FeedBack>
                    We will let you know through text if there is a giveaway in your area.
                </FeedBack>
            </StyledForm>
        </CenterContainer>
    );
};

export default ThanksGet;