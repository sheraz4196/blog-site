// pages/_app.js
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import { AppContextProvider } from "@/context/AppContextProvider";
import "@/styles/globals.css";
import "react-tooltip/dist/react-tooltip.css";
import { ThemeProvider } from "next-themes";
import ScrollToTop from "@/components/common/ScrollButton";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CommonDataProvider, useCommonData } from "@/context/commonDataContext";

function App({ Component, pageProps }) {
  const commonData = useCommonData();

  return (
    <ThemeProvider attribute="class">
      <AppContextProvider>
        <CommonDataProvider>
          <Navbar commonData={commonData} />
          <Component {...pageProps} />
          <Footer commonData={commonData} />
          <ScrollToTop />
        </CommonDataProvider>
      </AppContextProvider>
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}

export default App;
