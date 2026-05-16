import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getCommonPageProps } from "@/application/get-common-page-props";

import IndexPageView, {
  IndexPageViewRawProps,
} from "@/pages-view/IndexPageView";
import { CommonPageProps } from "@/shared/model/types";
import { getProjects } from "../server/projects";
import { AppLocale } from "@/shared/сonfig/const";

const IndexPage = ({
  h1,
  projectsSectionData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <IndexPageView h1={h1} projectsSectionData={projectsSectionData} />
    </>
  );
};

export default IndexPage;

type PageProps = CommonPageProps & IndexPageViewRawProps;

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  const [commonPageProps, projects] = await Promise.all([
    getCommonPageProps(locale as AppLocale),
    getProjects(locale as AppLocale),
  ]);

  return {
    props: {
      ...commonPageProps,
      bodyClass: "index-page",
      meta: {
        ...commonPageProps.meta,
        title: locale === "en" ? "Evgenia's Portfolio" : "Портфолио Евгении",
      },
      breadcrumbs: [],
      h1: locale === "en" ? "Evgenia's Portfolio" : "Портфолио Евгении",
      projectsSectionData: {
        projects,
        scrollBtn: locale === "en" ? "Scroll Down" : "Скролл вниз",
      },
    } satisfies PageProps,
    revalidate: 60,
  };
};
