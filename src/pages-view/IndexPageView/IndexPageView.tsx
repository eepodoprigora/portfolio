import DefaultLayout from "@/shared/ui/DefaultLayout";
import {
  ProjectsSlider,
  ProjectsSliderRawProps,
} from "@/widgets/ProjectsSlider";

export type RawProps = {
  h1: string;
  projectsSectionData: ProjectsSliderRawProps;
};

const IndexPageView = ({ h1, projectsSectionData }: RawProps) => {
  return (
    <DefaultLayout>
      <div className="index__content">
        <h1 className="visually-hidden">{h1}</h1>
        <ProjectsSlider {...projectsSectionData} />
      </div>
    </DefaultLayout>
  );
};

export default IndexPageView;
