import Head from 'next/head';
import styles from '../../styles/SingleProduct.module.css';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Image from 'next/image';

const singleproduct = ({ product }) => {
  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <div className={styles.single_container}>
        <div className={styles.left_section}>
          <Image
            width={300}
            height={700}
            src={product.image.url}
            className={styles.left_img}
            alt={product.name}
          />
        </div>
        <div className={styles.right_section}>
          <h3 className={styles.title}>{product.name}</h3>
          <p className={styles.price}>${product.price}</p>
          {/* <div
            className={styles.para}
            dangerouslySetInnerHTML={{ __html: product.description.html }}
          ></div> */}
          <button className='btn'>Add to cart 🛒</button>
        </div>
      </div>
    </>
  );
};

export default singleproduct;

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: 'https://api-us-east-1.hygraph.com/v2/cl8uyz3s365rq01t8em876c5y/master',
    cache: new InMemoryCache(),
  });
  const data = await client.query({
    query: gql`
      query ProductsQuery {
        products {
          id
          name
          slug
          price
          image {
            url
          }
        }
      }
    `,
  });

  const paths = data.data.products.map((singleProduct) => {
    return {
      params: {
        productslug: singleProduct.slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const client = new ApolloClient({
    uri: 'https://api-us-east-1.hygraph.com/v2/cl8uyz3s365rq01t8em876c5y/master',
    cache: new InMemoryCache(),
  });

  const data = await client.query({
    query: gql`
      query MyQuery($slug: String) {
        product(where: { slug: $slug }) {
          id
          name
          price
          slug
          image {
            url
          }
        }
      }
    `,
    variables: {
      slug: params.productslug,
    },
  });

  const product = data.data.product;
  return {
    props: {
      product,
    },
  };
}
