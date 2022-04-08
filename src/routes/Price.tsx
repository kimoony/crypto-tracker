import React from 'react'
import { useQuery } from 'react-query';
import { fetchCoinToday } from '../api';


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
    <div>
      {isLoading ? (
        "Price 로딩중..."
      ) : (
        <>
          <div>
            <span>OPEN : </span>
            <span>{data?.map(o => o.open.toFixed(2))}</span>
          </div>
          <div>
            <span>HIGH : </span>
            <span>{data?.map(h => h.high.toFixed(2))}</span>
          </div>
          <div>
            <span>LOW : </span>
            <span>{data?.map(l => l.low.toFixed(2))}</span>
          </div>
          <div>
            <span>CLOSE : </span>
            <span>{data?.map(c => c.close.toFixed(2))}</span>
          </div>
        </>
      )}
    </div>
  )
}

export default Price