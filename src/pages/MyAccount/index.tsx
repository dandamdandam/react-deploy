import styled from '@emotion/styled';

import { useGetPoint } from '@/api/hooks/useGetPoint';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import { useAuth } from '@/provider/Auth';
import { RouterPath } from '@/routes/path';
import { authSessionStorage } from '@/utils/storage';

import WishCardList from './WishCardList';

export const MyAccountPage = () => {
  const authInfo = useAuth();
  const { data, isError, isLoading } = useGetPoint();

  const handleLogout = () => {
    authSessionStorage.set(undefined);

    const redirectURL = `${window.location.origin}${RouterPath.home}`;
    window.location.replace(redirectURL);
  };

  return (
    <Wrapper>
      {authInfo?.email}님 안녕하세요! <Spacing height={30} />
      <SmallFont>
        잔여 포인트: {isLoading ? '로딩 중...' : isError ? '오류가 발생했습니다.' : data}p
      </SmallFont>
      <Spacing height={30} />
      <Button
        size="small"
        theme="darkGray"
        onClick={handleLogout}
        style={{
          maxWidth: '200px',
        }}
      >
        로그아웃
      </Button>
      <Spacing height={64} />
      <WishCardList />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 80px 0 120px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 36px;
`;
const SmallFont = styled.div`
  font-size: 16px;
`;
