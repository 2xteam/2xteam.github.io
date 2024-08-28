import { Link } from 'react-router-dom';

import { Product } from './styled';

const ProductsItem = ({ data }) => {
  const price = data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <Product>
      <Link to={`/products/${data.product_id}`}>
        <img src={`${data.image}`} alt="상품 이미지" />
        <ul>
          <li className="store-title">{data.store_name}</li>
          <li className="product-name">{data.product_name}</li>
          <li className="product-price">
            {price}
            <span>원</span>
          </li>
        </ul>
      </Link>
    </Product>
  );
};

export default ProductsItem;
