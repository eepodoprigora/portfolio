import classNames from "classnames";
import { DocumentProps, Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

function Document({ __NEXT_DATA__ }: DocumentProps) {
  const { bodyClass } = __NEXT_DATA__.props.pageProps;

  return (
    <Html
      lang={__NEXT_DATA__.locale}
      className={classNames("no-js", bodyClass)}>
      <Head></Head>

      <body className="body">
        <Script
          id="no-js"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.replace('no-js', 'js');",
          }}
        />
        <Script strategy="beforeInteractive" id="lock-scroll">
          document.documentElement.classList.add(&quot;no-scroll&quot;);
        </Script>
        <Main />
        <NextScript />
        <Analytics />
        <SpeedInsights />
      </body>
    </Html>
  );
}

export default Document;
