// pages/_document.js
import Document, { Html, Head, Main, NextScript } from "next/document";
import { fetchCommonData } from "@/lib/fetchCommonData";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const commonData = await fetchCommonData();
    return { ...initialProps, commonData };
  }

  render() {
    const { commonData } = this.props;
    const favicon = commonData?.favicon?.fields?.file?.url;

    return (
      <Html lang="en">
        <Head>
          <link
            href="/fonts/georgia.woff"
            crossOrigin="anonymous"
            as="style"
            rel="stylesheet preload prefetch"
            type="text/css"
          />
          {favicon && <link rel="icon" href={favicon} />}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
