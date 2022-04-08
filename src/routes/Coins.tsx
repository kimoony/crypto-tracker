import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';


// styled-components
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 10px;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${props => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color .2s ease-in;
  }
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.accentColor}
  }
`;

const Title = styled.h1`
font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

// interface
interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

function Coins() {
  // react query
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins)

  // 기존 방법
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch('https://api.coinpaprika.com/v1/coins');
  //     const data = await response.json()
  //     setCoins(data.slice(0, 100));
  //     setLoading(false);
  //   })()
  // }, [])

  return (
    <Container>
      <Helmet>
        <title>
          코인
        </title>
      </Helmet>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
        <Loader>로딩중...</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map(coin =>
            <Coin key={coin.id}>
              <Link to={{
                pathname: `/${coin.id}`,
                state: {
                  name: coin.name
                }
              }}>
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                  alt="symbol-image"
                />
                {coin.name} &rarr;
              </Link >
            </Coin>
          )}
        </CoinList>
      )}
    </Container>
  )
}

export default Coins