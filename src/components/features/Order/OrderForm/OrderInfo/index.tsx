import { Divider, Input } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { useGetPoint } from '@/api/hooks/useGetPoint';
import { useGetProductDetail } from '@/api/hooks/useGetProductDetail';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useOrderFormContext } from '@/hooks/useOrderFormContext';
import type { OrderHistory } from '@/types';

import { HeadingText } from '../Common/HeadingText';
import { LabelText } from '../Common/LabelText';
import { CashReceiptFields } from '../Fields/CashReceiptFields';

type Props = {
  orderHistory: OrderHistory;
};
export const OrderFormOrderInfo = ({ orderHistory }: Props) => {
  const { id, count } = orderHistory;
  const [usedPoint, setUsedPoint] = useState(0);
  const { register } = useOrderFormContext();

  const { data: point, isLoading, isError } = useGetPoint();
  const { data: detail } = useGetProductDetail({ productId: id.toString() });
  const totalPrice = detail.price * count;

  const pointChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const beUsedPoint = Number(e.target.value);
    if (0 <= beUsedPoint && beUsedPoint <= (point ?? 0) && beUsedPoint <= totalPrice)
      setUsedPoint(beUsedPoint);
  };

  return (
    <Wrapper>
      <Title>
        <HeadingText>결제 정보</HeadingText>
      </Title>
      <Divider color="#ededed" />
      <CashReceiptFields />
      <Divider color="#ededed" />
      <div>
        <div>{isLoading || isError ? 0 : point ?? 0 - usedPoint}</div>
        <Input
          {...register('usedPoint')}
          value={usedPoint}
          onChange={(e) => pointChange(e)}
          type="number"
          placeholder="사용할 포인트 입력"
        />
      </div>
      <ItemWrapper>
        <LabelText>최종 결제금액</LabelText>
        <HeadingText>{totalPrice - usedPoint}원</HeadingText>
      </ItemWrapper>
      <Divider color="#ededed" />
      <Spacing height={32} />
      <Button type="submit">{totalPrice}원 결제하기</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-left: 1px solid #ededed;
  border-right: 1px solid #ededed;
  padding: 16px;
`;

const Title = styled.h6`
  padding: 24px 0 20px;
`;

const ItemWrapper = styled.div`
  padding: 16px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
