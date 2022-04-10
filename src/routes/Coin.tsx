import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import { useLocation, useParams, Switch, Route, Link, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import Chart from './Chart';
import Price from './Price';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../atom';


// styled components
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;


const GoBack = styled.span`
  height: 10vh;
  display: flex;
  align-items: center;
  margin-bottom: -15px;
  font-size: 18px;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.accentColor};
    font-weight: 500;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 10vh;
  padding: 0px 7.5px;
`;

const Toggle = styled.button`
  font-size: 30px;
  border: none;
  background-color: ${props => props.theme.bgColor};
  cursor: pointer;
  width: 100%;
  height: 10vh;
  text-align: right;
  &:hover {
    font-size: 40px;
  }
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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.bgColor};
  color: ${props => props.theme.textColor};
  border: 2px solid;
  border-color: ${props => props.theme.textColor};
  padding: 10px 20px;
  border-radius: 10px;
  margin-top: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${props => props.theme.bgColor};
  border: 2px solid;
  border-color: ${props => props.theme.textColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;





// interface
interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;

}
interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    }
  };
}

interface ICoinProps {

}


function Coin({ }: ICoinProps) {
  // recoil
  const isDark = useRecoilValue(isDarkAtom)
  // value를 설정하는 function
  const setDarkAtom = useSetRecoilState(isDarkAtom)
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev)

  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  // isLoading과 data가 두 개를 갖게 되기 때문에
  // Object의 property를 가져오고 syntax를 이용해 이름을 바꿔줌
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    // key 값은 고유해야하기 때문에 [] 안에 첫번째 key가 카테고리 역할을 하고 두번째가 고유의 역할을 한다.
    ["info", coinId],
    // argument가 필요하기 때문에 익명의 함수로 fetcher 함수 불러와 return
    () => fetchCoinInfo(coinId)
  )
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    // key 값은 고유해야하기 때문에 [] 안에 첫번째 key가 카테고리 역할을 하고 두번째가 고유의 역할을 한다.
    ["tickers", coinId],
    // argument가 필요하기 때문에 익명의 함수로 fetcher 함수 불러와 return
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  )

  // 로딩을 하나로 묶어줌
  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "로딩중..." : infoData?.name}
        </title>
      </Helmet>
      <BtnWrapper>
        <Link to="/">
          <GoBack>← Back</GoBack>
        </Link>
        <Toggle onClick={toggleDarkAtom}>
          <span>{isDark ? "☀️" : "🌙"}</span>
        </Toggle>
      </BtnWrapper>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "로딩중..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>로딩중...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>
                Chart
              </Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>
                Price
              </Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  )
}

export default Coin