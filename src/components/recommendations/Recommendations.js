import React from 'react';
import styled from 'styled-components'
import {Card} from "components";

const Container = styled.div`

`
const Recommendation = styled.div`
  flex: 2
`


const Recommendations = ({user}) => {
    return (
        <Container>
            <Recommendation>
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />
                <Card type="sm" />

            </Recommendation>
        </Container>
    );
};

export default Recommendations;
