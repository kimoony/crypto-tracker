import React from 'react'
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';



// interface
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000, }
  );

  return (
    <div>
      {isLoading ? (
        "차트 로딩중..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map(price => price.close) as number[],
            },
          ]}
          options={{
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            theme: {
              mode: 'dark'
            },
            stroke: {
              curve: "smooth",
              width: 5,
            },
            grid: {
              show: false
            },
            yaxis: {
              show: false
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map(date => date.time_close) as string[],
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#0f59f9"],
                stops: [0, 100]
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
              marker: {
                show: false
              }
            }
          }}
        />
      )}
    </div>
  )
}

export default Chart