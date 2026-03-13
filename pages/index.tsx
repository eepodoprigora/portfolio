import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getCommonPageProps } from "@/application/get-common-page-props";

import IndexPageView, {
  IndexPageViewRawProps,
} from "@/pages-view/IndexPageView";
import { CommonPageProps } from "@/shared/model/types";
import { getProjects } from "../server/projects";

const IndexPage = ({
  h1,
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <IndexPageView h1={h1} projects={projects} />
    </>
  );
};

export default IndexPage;

type PageProps = CommonPageProps & IndexPageViewRawProps;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const commonPageProps = await getCommonPageProps();
  const projects = await getProjects();

  return {
    props: {
      ...commonPageProps,
      bodyClass: "index-page",
      meta: {
        ...commonPageProps.meta,
        title: "ВКИ",
      },
      breadcrumbs: [],
      h1: "",
      projects: projects,
    } satisfies PageProps,
    revalidate: 60,
  };
};
