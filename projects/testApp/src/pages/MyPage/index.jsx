import { useQuery } from 'react-query';

import MyPageWrapper from './styled';
import MyOrderList from '../../components/MyOrder/MyOrderList/MyOrderList';
import Loading from '../../components/common/Loading/Loading';
import { getMyOrder } from '../../lib/api/axios-api';

const MyPage = () => {
  const { data, isLoading, isError } = useQuery(['order'], getMyOrder);

  console.log(data);

  if (isLoading) return <Loading />;
  if (isError) return <p>에러 발생.</p>;

  return (
    <MyPageWrapper>
      <h2>주문 목록</h2>
      <MyOrderList data={data?.results} />
    </MyPageWrapper>
  );
};

export default MyPage;
