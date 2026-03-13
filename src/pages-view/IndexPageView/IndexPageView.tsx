import { IProject } from "@/entities/project";
import { ProjectsSlider } from "@/widgets/ProjectsSlider";

export type RawProps = { h1: string; projects: IProject[] };

const IndexPageView = ({ h1, projects }: RawProps) => {
  console.log("work");
  return (
    <div className="index__content">
      <ProjectsSlider projects={projects} />
    </div>
  );
};

export default IndexPageView;
