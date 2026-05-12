import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import ProjectPageView, {
  ProjectPageViewRawProps,
} from "@/pages-view/ProjectPageView";
import { getCommonPageProps } from "@/application/get-common-page-props";
import { CommonPageProps } from "@/shared/model/types";
import { getProjects, getProjectDetail } from "../../server/projects";
import { tp } from "@/shared/lib/formatting";
import { AppLocale } from "@/shared/сonfig/const";

const ProjectPage = ({
  h1,
  project,
  viewProject,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ProjectPageView h1={h1} project={project} viewProject={viewProject} />
  );
};

export default ProjectPage;

type PageProps = CommonPageProps & ProjectPageViewRawProps;

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const projects = await getProjects();

  const paths = (locales ?? ["ru"]).flatMap((locale) =>
    projects.map((project) => ({
      params: { projectSlug: project.id },
      locale,
    })),
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({
  params,
  locale,
}) => {
  const projectSlug =
    typeof params?.projectSlug === "string" ? params.projectSlug : "";

  const isEn = locale === "en";

  const [commonPageProps, project] = await Promise.all([
    getCommonPageProps(locale as AppLocale),
    getProjectDetail(projectSlug, locale as AppLocale),
  ]);

  if (!project) {
    return { notFound: true };
  }

  return {
    props: {
      ...commonPageProps,
      bodyClass: "project-page",
      meta: {
        ...commonPageProps.meta,
        title: project.name,
        description: project.summary,
      },
      breadcrumbs: [],
      h1: project.name,
      viewProject: tp(isEn ? "View project" : "Смотреть проект"),
      project,
    },
  };
};
