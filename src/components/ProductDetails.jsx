import React from 'react';

const ProductDetails = ({ products }) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">Products</h4>
      <ul className="list-disc list-inside">
        {products.map(product => (
          <li key={product.id}>
            {product.name} - Quantity: {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetails;
