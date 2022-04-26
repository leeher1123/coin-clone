import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { fetchPriceHistory } from '../api';
import { slideInDown } from 'react-animations';

type PriceProps = {
  coinId: string;
};

interface IPrice {
  price_usd: string;
  percent_change_1h: string;
  percent_change_24h: string;
  percent_change_7d: string;
}

const slideAnimation = keyframes`${slideInDown}`;

function Price() {
  const { coinId } = useParams<PriceProps>();
  const { isLoading, data } = useQuery<IPrice>(['price', coinId], () =>
    fetchPriceHistory(coinId!)
  );

  return (
    <>
      {isLoading ? (
        'Loading price...'
      ) : (
        <Container>
          <PriceList>
            <PriceItem>
              <h4>price</h4>
              <span>$ {Number(data?.price_usd).toFixed(3)}</span>
            </PriceItem>
            <PriceItem>
              <h4>Change rate (last 1 hours)</h4>
              <span>{Number(data?.percent_change_1h).toFixed(2)} %</span>
            </PriceItem>
            <PriceItem>
              <h4>Change rate (last 24 hours)</h4>
              <span>{Number(data?.percent_change_24h).toFixed(2)} %</span>
            </PriceItem>
            <PriceItem>
              <h4>Change rate (last 7 days)</h4>
              <span>{Number(data?.percent_change_7d).toFixed(2)} %</span>
            </PriceItem>
          </PriceList>
        </Container>
      )}
    </>
  );
}

const Container = styled.div``;

const PriceList = styled.ul``;

const PriceItem = styled.li`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  font-weight: bold;
  font-size: 13px;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  animation: 1s ${slideAnimation};
  h4 {
    color: #111;
  }
  span {
    color: #8c7ae6;
  }
`;

export default Price;
