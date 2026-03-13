import type { AppProps } from "next/app";
import { ReactNode } from "react";
import "@/application/css/app.scss";

import { AnimatePresence } from "motion/react";
import { CommonPageProps } from "@/shared/model/types";
import { usePageTransitionStore } from "@/shared/model/page-transition";
import { usePrevious } from "@/shared/lib/use-previous";

const AnimatedPage = ({
  pageProps,
  children,
}: {
  pageProps: CommonPageProps;
  children: ReactNode;
}) => {
  const prevBodyClass = usePrevious(pageProps.bodyClass);
  const mode = usePageTransitionStore((state) => state.mode);

  return (
    <AnimatePresence
      mode={mode}
      onExitComplete={() => {
        if (prevBodyClass) {
          document.documentElement.classList.remove(
            ...prevBodyClass.split(" "),
          );
        }

        if (pageProps.bodyClass) {
          document.documentElement.classList.add(
            ...pageProps.bodyClass.split(" "),
          );
        }

        window.scrollTo({ top: 0, behavior: "auto" });
        document.dispatchEvent(new Event("new-page-ready"));
      }}>
      {children}
    </AnimatePresence>
  );
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <main className="main">
        <AnimatedPage pageProps={pageProps}>
          <Component {...pageProps} />
        </AnimatedPage>
      </main>
    </>
  );
};

export default App;
