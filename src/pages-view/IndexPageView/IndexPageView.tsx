import { IProject } from "@/entities/project";
import DefaultLayout from "@/shared/ui/DefaultLayout";
import { ProjectsSlider } from "@/widgets/ProjectsSlider";

export type RawProps = { h1: string; projects: IProject[] };

const IndexPageView = ({ h1, projects }: RawProps) => {
  return (
    <DefaultLayout>
      <div className="index__content">
        <h1 className="visually-hidden">{h1}</h1>
        <ProjectsSlider projects={projects} />
      </div>
    </DefaultLayout>
  );
};

export default IndexPageView;
