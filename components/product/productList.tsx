import InContentImage from "components/image/inContentImage";
import { inject, observer } from "mobx-react";
import { useEffect } from "react";
import ProductViewModel from "src/viewModel/product/product.viewModel";

interface IProps {
  productViewModel?: ProductViewModel;
}

function ProductList({ productViewModel }: IProps) {
  useEffect(() => {
    productViewModel?.initialize();
  }, []);

  return (
    <section className="mb-20">
      {productViewModel?.list.map((product, index) => {
        return (
          <div key={`product_${index}`} className="px-4 w-full mt-4 relative">
            <InContentImage
              src={product.thumbImages[0]}
              alt={`${product.title}_image`}
              content={product.title}
            />
          </div>
        );
      })}
    </section>
  );
}

export default inject("productViewModel")(observer(ProductList));
