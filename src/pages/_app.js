import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import { AppContextProvider } from "@/context/AppContextProvider";
import { getPagesData } from "@/lib/api";
import "@/styles/globals.css";
import "react-tooltip/dist/react-tooltip.css";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "@/components/common/ScrollButton";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function App({ Component, pageProps, commonData }) {
  const favicon = commonData?.favicon?.fields?.file?.url;
  return (
    <>
      <Helmet>{favicon && <link rel="icon" href={favicon} />}</Helmet>
      <ThemeProvider attribute="class">
        <AppContextProvider>
          <Navbar commonData={commonData} />
          <Component {...pageProps} />
          <Footer commonData={commonData} />
          <ScrollToTop />
        </AppContextProvider>
      </ThemeProvider>
      <Analytics />
      <SpeedInsights/>
    </>
  );
}

App.getInitialProps = async () => {
  const commonData = await getPagesData("common");
  return {
    commonData: commonData?.items[0]?.fields || null,
  };
};
