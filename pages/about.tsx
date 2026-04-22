import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getCommonPageProps } from "@/application/get-common-page-props";

import { CommonPageProps } from "@/shared/model/types";
import AboutPageView, {
  AboutPageViewRawProps,
} from "@/pages-view/AboutPageView";
import { getDirectionCategories, getDirections } from "../server/directions";
import { getContacts } from "../server/contacts";
import { tp } from "@/shared/lib/formatting";

const AboutPage = ({
  heroSectionData,
  introSectionData,
  directionsSectionData,
  contactsSectionData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <AboutPageView
      heroSectionData={heroSectionData}
      introSectionData={introSectionData}
      directionsSectionData={directionsSectionData}
      contactsSectionData={contactsSectionData}
    />
  );
};

export default AboutPage;

type PageProps = CommonPageProps & AboutPageViewRawProps;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const [commonPageProps, directions, categories, contacts] = await Promise.all(
    [
      getCommonPageProps(),
      getDirections(),
      getDirectionCategories(),
      getContacts(),
    ],
  );

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
        title: "Evgenia's P About",
      },
      breadcrumbs: [],
      heroSectionData: {
        h1: "Evgenia Podoprigora",
        image: {
          vertical: { src: "/static/about/hero_mob.jpg" },
          horizontal: { src: "/static/about/hero.jpg" },
        },
        textBlock: "// FRONTEND РАЗРАБОТЧИК",
      },
      introSectionData: {
        header: "Введение",
        textBlock1: tp(
          " Меня зовут Евгения. Три года я создаю интерфейсы в студиях с Awwwards — сложные анимации, продуманная архитектура, высокая планка.",
        ),
        textBlock2: tp(
          "Next.js, React, TypeScript, Vanilla JS. Claude, ChatGPT, Cursor — часть моего рабочего процесса каждый день.",
        ),
      },
      directionsSectionData: {
        header: tp("Что я делаю"),
        directions: directionsWithCategories,
      },
      contactsSectionData: {
        header: "Контакты",
        cta: tp("Есть идея или проект? Напишите мне"),
        social: contacts,
        image: { src: "/static/about/about_bottom_new.jpg" },
        rights: tp("© 2026 Evgenia Podoprigora. Все права защищены."),
      },
    } satisfies PageProps,
    revalidate: 60,
  };
};
