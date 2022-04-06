import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import styled from 'styled-components';


// styled components
const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;


// interface
interface RouteParams {
  coinId: string
}
interface RouteState {
  name: string
}

function Coin() {
  const [loading, setLoading] = useState(true);

  const { coinId } = useParams<RouteParams>();

  const { state } = useLocation<RouteState>();


  return (
    <Container>
      <Header>
        {/* state가 있으면 name를 보여주고 아니면 로딩중 */}
        <Title>{state?.name || "로딩중..."}</Title>
      </Header>
      {loading ? (
        <Loader>로딩중...</Loader>
      ) : (
        null
      )}
    </Container>
  )
}

export default Coin