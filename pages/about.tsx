import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getCommonPageProps } from "@/application/get-common-page-props";

import { CommonPageProps } from "@/shared/model/types";
import AboutPageView, {
  AboutPageViewRawProps,
} from "@/pages-view/AboutPageView";

const AboutPage = ({ h1 }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <AboutPageView h1={h1} />
    </>
  );
};

export default AboutPage;

type PageProps = CommonPageProps & AboutPageViewRawProps;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const commonPageProps = await getCommonPageProps();
  return {
    props: {
      ...commonPageProps,
      bodyClass: "about-page",
      meta: {
        ...commonPageProps.meta,
        title: "About",
      },
      breadcrumbs: [],
      h1: "",
    } satisfies PageProps,
    revalidate: 60,
  };
};
