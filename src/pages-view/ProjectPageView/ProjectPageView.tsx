import { IProjectDetailView } from "@/entities/project";
import DefaultLayout from "@/shared/ui/DefaultLayout";
import { Overview, Visual } from "./sections";

export type RawProps = {
  h1: string;
  project: IProjectDetailView;
  viewProject: string;
};

const ProjectPageView = ({ h1, project, viewProject }: RawProps) => {
  return (
    <DefaultLayout>
      <div className="project__content">
        <h1 className="visually-hidden">{h1}</h1>

        <Overview
          name={project.name}
          summary={project.summary}
          image={project.previewImg}
          sections={project.sectionsView}
          tags={project.tags}
          href={project.href}
          viewProject={viewProject}
        />
        <Visual video={project.video} images={project.images} />
      </div>
    </DefaultLayout>
  );
};

export default ProjectPageView;
