import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head>
        <link rel='preconnect' href='<https://app.snipcart.com>' />
        <link rel='preconnect' href='<https://cdn.snipcart.com>' />
        <link
          rel='stylesheet'
          href='https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.css'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          async
          src='https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.js'
        ></script>
        <div
          hidden
          id='snipcart'
          data-api-key='MzQxOGE4NmYtNjMxMi00YWE0LTk0ZWEtODg2NDQwMjZiY2IyNjM4MDA1MjczMzAxNDM4MjA1'
          data-config-modal-style='side'
        ></div>
      </body>
    </Html>
  );
};

export default Document;
