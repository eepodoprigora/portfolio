import { IProjectDetailView } from "@/entities/project";
import DefaultLayout from "@/shared/ui/DefaultLayout";
import { Overview, Visual } from "./sections";
import { useRef } from "react";
import { useInView } from "motion/react";
import classNames from "classnames";
import { useScrollToTop } from "@/shared/lib/use-scroll-to-top";

export type RawProps = {
  h1: string;
  project: IProjectDetailView;
  viewProject: string;
};

const ProjectPageView = ({ h1, project, viewProject }: RawProps) => {
  const overviewRef = useRef<HTMLDivElement>(null);
  const scrollToTop = useScrollToTop();

  const isOverviewInView = useInView(overviewRef, {
    margin: "-100px 0px 0px 0px",
  });

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
          ref={overviewRef}
        />

        <Visual video={project.video} images={project.images} />

        <button
          type="button"
          onClick={() => scrollToTop()}
          className={classNames("project__to-top", {
            "project__to-top--visible": !isOverviewInView,
          })}>
          <span className="project__to-top-icon"></span>
        </button>
      </div>
    </DefaultLayout>
  );
};

export default ProjectPageView;
