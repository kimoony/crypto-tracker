import React from 'react'
import { useQuery } from 'react-query';
import { fetchCoinTickers } from '../api';
import styled from 'styled-components';

// styled-components
const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 0px;
  gap: 10px;
  border: 2px solid;
  border-color: ${props => props.theme.textColor};
  border-radius: 10px;
  padding: 20px;
`;

const Tab = styled.span`
  /* text-align: center; */
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 400;
  background-color: ${props => props.theme.bgColor};
  border-bottom: 2px solid;
  border-color: ${props => props.theme.accentColor};
  padding: 7px 0px;
  color: ${(props) => props.theme.textColor};
`;


// interface
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

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinTickers(coinId),
  );
  // console.log(data)

  const oneHour = data?.quotes.USD.percent_change_1h
  const sixHour = data?.quotes.USD.percent_change_6h
  const halfDay = data?.quotes.USD.percent_change_12h
  const oneDay = data?.quotes.USD.percent_change_24h
  const oneWeek = data?.quotes.USD.percent_change_7d
  const oneMonth = data?.quotes.USD.percent_change_30d
  const oneYear = data?.quotes.USD.percent_change_1y


  return (
    <Tabs>
      {isLoading ? (
        "Price 로딩중..."
      ) : (
        <>
          <Tab>
            <span>Percent change 1hour : </span>
            <span> {`${oneHour}%`}</span>
          </Tab>
          <Tab>
            <span>Percent change 6hour : </span>
            <span>{`${sixHour}%`}</span>
          </Tab>
          <Tab>
            <span>Percent change 12hour : </span>
            <span>{`${halfDay}%`}</span>
          </Tab>
          <Tab>
            <span>Percent change 1day : </span>
            <span>{`${oneDay}%`}</span>
          </Tab>
          <Tab>
            <span>Percent change 1week : </span>
            <span>{`${oneWeek}%`}</span>
          </Tab>
          <Tab>
            <span>Percent change 1month : </span>
            <span>{`${oneMonth}%`}</span>
          </Tab>
          <Tab>
            <span>Percent change 1year : </span>
            <span>{`${oneYear}%`}</span>
          </Tab>
        </>
      )}
    </Tabs>
  )
}

export default Price