import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import ProjectPageView, {
  ProjectPageViewRawProps,
} from "@/pages-view/ProjectPageView";
import { getCommonPageProps } from "@/application/get-common-page-props";
import { CommonPageProps } from "@/shared/model/types";
import { getProjects, getProjectDetail } from "../../server/projects";
import { tp } from "@/shared/lib/formatting";

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

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getProjects();

  return {
    paths: projects.map((project) => ({
      params: {
        projectSlug: project.id,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const projectSlug =
    typeof params?.projectSlug === "string" ? params.projectSlug : "";

  const [commonPageProps, project] = await Promise.all([
    getCommonPageProps(),
    getProjectDetail(projectSlug),
  ]);

  if (!project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...commonPageProps,
      bodyClass: "project-page",
      meta: {
        ...commonPageProps.meta,
        title: `${project.name}`,
        description: project.summary,
      },
      breadcrumbs: [],
      h1: project.name,
      viewProject: tp("Смотреть проект"),
      project,
    },
  };
};
