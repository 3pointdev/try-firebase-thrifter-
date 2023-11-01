import { Head, Html, Main, NextScript } from "next/document";

export default function RootLayout(props: {}) {
  return (
    <Html>
      <Head title="Thrifter">
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>
      <body>
        <Main {...props} />
        <NextScript />
      </body>
    </Html>
  );
}
