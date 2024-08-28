import { OrderListWrapper } from './styled';
import OrderItem from '../OrderItem/OrderItem';

const OrderList = ({ data }) => {
  return (
    <OrderListWrapper>
      <h3 className="hidden">주문 상품 목록</h3>
      {data.map((item) => (
        <OrderItem data={item} key={item.product_id} />
      ))}
    </OrderListWrapper>
  );
};

export default OrderList;
