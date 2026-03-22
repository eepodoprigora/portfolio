import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getCommonPageProps } from "@/application/get-common-page-props";

import { CommonPageProps } from "@/shared/model/types";
import AboutPageView, {
  AboutPageViewRawProps,
} from "@/pages-view/AboutPageView";
import {
  getDirectionCategories,
  getDirections,
} from "../server/directions/directions.repo";

const AboutPage = ({
  heroSectionData,
  introSectionData,
  directionsSectionData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <AboutPageView
      heroSectionData={heroSectionData}
      introSectionData={introSectionData}
      directionsSectionData={directionsSectionData}
    />
  );
};

export default AboutPage;

type PageProps = CommonPageProps & AboutPageViewRawProps;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const [commonPageProps, directions, categories] = await Promise.all([
    getCommonPageProps(),
    getDirections(),
    getDirectionCategories(),
  ]);

  const directionsWithCategories = directions.map((direction) => ({
    ...direction,
    categories: categories
      .filter((category) => category.directionId === direction.id)
      .sort((a, b) => a.order - b.order),
  }));

  return {
    props: {
      ...commonPageProps,
      bodyClass: "about-page",
      meta: {
        ...commonPageProps.meta,
        title: "About",
      },
      breadcrumbs: [],
      heroSectionData: {
        h1: "Evgenia Podoprigora",
        image: {
          vertical: { src: "/static/about/hero_mob.jpg" },
          horizontal: { src: "/static/about/hero.jpg" },
        },
        textBlock1: "// Креативный",
        textBlock2: "разработчик интерфейсов",
      },
      introSectionData: {
        header: "Введение",
        textBlock1:
          "        Меня зовут Евгения, я frontend-разработчик, который превращает идеи в цельные цифровые продукты с продуманной логикой и сильной визуальной подачей.",
        textBlock2:
          "От анимации и взаимодействия до архитектуры и реализации — создаю цельные современные интерфейсы, удобные в развитии.",
      },
      directionsSectionData: {
        header: "Что я делаю",
        directions: directionsWithCategories,
      },
    } satisfies PageProps,
    revalidate: 60,
  };
};
