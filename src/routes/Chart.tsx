import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { fetchCoinHistory } from '../api';
import ReactApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

type ChartProps = {
  coinId: string;
};

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

function Chart() {
  const isDark = useRecoilValue(isDarkAtom);
  const { coinId } = useParams<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId!)
  );

  const ohlcDataList = data?.map((item) => ({
    x: item.time_open,
    y: [
      item.open.toFixed(5),
      item.high.toFixed(5),
      item.low.toFixed(5),
      item.close.toFixed(5),
    ],
  }));

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ReactApexChart
          type='candlestick'
          series={[{ data: ohlcDataList }] as unknown as number[]}
          options={{
            theme: {
              mode: isDark ? 'dark' : 'light',
            },
            chart: {
              type: 'candlestick',
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            stroke: {
              curve: 'smooth',
            },
            xaxis: {
              type: 'datetime',
            },
            yaxis: {
              show: false,
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
