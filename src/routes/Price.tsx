import React from 'react'
import { useQuery } from 'react-query';
import { fetchCoinToday } from '../api';
import styled from 'styled-components';

// styled-components
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
  border: 2px solid;
  border-color: ${props => props.theme.textColor};
  border-radius: 10px;
  padding: 10px;
`;

const Tab = styled.span`
  text-align: center;
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
interface ICoinToday {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<ICoinToday[]>(
    ["today", coinId],
    () => fetchCoinToday(coinId),
  );

  return (
    <Tabs>
      {isLoading ? (
        "Price 로딩중..."
      ) : (
        <>
          <Tab>
            <span>OPEN : </span>
            <span>{data?.map(o => o.open.toFixed(2))}</span>
          </Tab>
          <Tab>
            <span>HIGH : </span>
            <span>{data?.map(h => h.high.toFixed(2))}</span>
          </Tab>
          <Tab>
            <span>LOW : </span>
            <span>{data?.map(l => l.low.toFixed(2))}</span>
          </Tab>
          <Tab>
            <span>CLOSE : </span>
            <span>{data?.map(c => c.close.toFixed(2))}</span>
          </Tab>
        </>
      )}
    </Tabs>
  )
}

export default Price