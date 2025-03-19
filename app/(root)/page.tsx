import ProductCarousel from '@/components/shared/product/product-carousel';
import ProductList from '@/components/shared/product/product-list';
import ViewAllProductButton from '@/components/view-all-products-button';
import { getLatestProducts } from '@/lib/actions/product.actions';
import { getFeaturedProducts } from '@/lib/actions/product.actions';
// export const metadata = {
//   title: 'Home',
// };

const HomePage = async () => {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();
  return (
    <>
      {featuredProducts.length > 0 && (
        <ProductCarousel data={featuredProducts} />
      )}
      <ProductList data={latestProducts} title="Newest Arrivals"></ProductList>
      <ViewAllProductButton />
    </>
  );
};

export default HomePage;
