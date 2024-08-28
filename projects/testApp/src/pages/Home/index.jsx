import * as SharedUI from '@monorepo/shared-ui/dist/shared-ui';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

import { HomeWrapper } from './styled';
import MainBanner from '../../components/Banner/MainBanner';
import ProductsList from '../../components/Products/ProductsList/ProductsList';
import Loading from '../../components/common/Loading/Loading';
import { getProductsList } from '../../lib/api/axios-api';

const { JMProfiler } = SharedUI.default;

const HomePage = () => {
  const { ref, inView } = useInView();
  const { data, isLoading, isError, error, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery('products', ({ pageParam = 1 }) => getProductsList(pageParam), {
      getNextPageParam: (lastPage, allPage) => {
        const nextPage = allPage.length + 1;

        return lastPage.next ? nextPage : undefined;
      },
    });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <Loading />;
  if (isError) return <p>{error.response.data.detail}</p>;

  return (
    <HomeWrapper>
      <JMProfiler>
        <MainBanner />
        <ProductsList data={data} isLoading={isLoading} isError={isError} error={error} />
        {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>}
      </JMProfiler>
    </HomeWrapper>
  );
};

export default HomePage;
