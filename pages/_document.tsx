import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body className="bg-gray-900 bg-wood-pattern bg-repeat antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
