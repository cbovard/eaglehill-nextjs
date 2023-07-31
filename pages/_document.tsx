import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <link
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
            rel="stylesheet"
          /> */}
        </Head>
        <body className="bg-gray-900 bg-wood-pattern bg-repeat">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
