import React from 'react'
import { useQuery } from 'react-query';
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

interface IohlcvData {
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    // { refetchInterval: 10000, }
  );

  const ohlcvData = data?.map((data: IohlcvData) => ({
    x: data.time_close,
    y: [data.open.toFixed(2), data.high.toFixed(2), data.low.toFixed(2), data.close.toFixed(2)],
  }));



  return (
    <div>
      {isLoading ? (
        "차트 로딩중..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[{ data: ohlcvData }] as unknown as number[]}
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
            tooltip: {
              // y: {
              //   formatter: (value) => `$ ${value.toFixed(2)}`,
              // },
              marker: {
                show: false
              }
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#00B746',
                  downward: '#EF403C'
                },
                wick: {
                  useFillColor: true
                }
              }
            }
          }}
        />
      )}
    </div>
  )
}

export default Chart