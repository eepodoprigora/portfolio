import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getCommonPageProps } from "@/application/get-common-page-props";

import { CommonPageProps } from "@/shared/model/types";
import AboutPageView, {
  AboutPageViewRawProps,
} from "@/pages-view/AboutPageView";
import { getDirectionCategories, getDirections } from "../server/directions";
import { getContacts } from "../server/contacts";
import { tp } from "@/shared/lib/formatting";
import { AppLocale } from "@/shared/сonfig/const";

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

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  const [commonPageProps, directions, categories, contacts] = await Promise.all(
    [
      getCommonPageProps(locale as AppLocale),
      getDirections(locale as AppLocale),
      getDirectionCategories(locale as AppLocale),
      getContacts(locale as AppLocale),
    ],
  );

  const directionsWithCategories = directions.map((direction) => ({
    ...direction,
    categories: categories
      .filter((category) => category.directionId === direction.id)
      .sort((a, b) => a.order - b.order),
  }));

  const isEn = locale === "en";

  return {
    props: {
      ...commonPageProps,
      bodyClass: "about-page",
      meta: {
        ...commonPageProps.meta,
        title: isEn ? "Evgenia's Portfolio — About" : "Евгения — Обо мне",
      },
      breadcrumbs: [],
      heroSectionData: {
        h1: "Evgenia Podoprigora",
        image: {
          vertical: { src: "/static/about/hero_mob.jpg" },
          horizontal: { src: "/static/about/hero.jpg" },
        },
        textBlock: isEn ? "// FRONTEND DEVELOPER" : "// FRONTEND РАЗРАБОТЧИК",
      },
      introSectionData: {
        header: isEn ? "Introduction" : "Введение",
        textBlock1: tp(
          isEn
            ? "My name is Evgenia. For three years I've been building interfaces at Awwwards-winning studios — complex animations, solid architecture, high standards."
            : "Меня зовут Евгения. Три года я создаю интерфейсы в студиях с Awwwards — сложные анимации, продуманная архитектура, высокая планка.",
        ),
        textBlock2: tp(
          isEn
            ? "Next.js, React, TypeScript, Vanilla JS. Claude, ChatGPT, Cursor — part of my workflow every day."
            : "Next.js, React, TypeScript, Vanilla JS. Claude, ChatGPT, Cursor — часть моего рабочего процесса каждый день.",
        ),
      },
      directionsSectionData: {
        header: tp(isEn ? "What I do" : "Что я делаю"),
        directions: directionsWithCategories,
      },
      contactsSectionData: {
        header: isEn ? "Contacts" : "Контакты",
        cta: tp(
          isEn
            ? "Have an idea or project? Write to me"
            : "Есть идея или проект? Напишите мне",
        ),
        social: contacts,
        image: { src: "/static/about/about_bottom_new.jpg" },
        rights: tp(
          isEn
            ? "© 2026 Evgenia Podoprigora. All rights reserved."
            : "© 2026 Evgenia Podoprigora. Все права защищены.",
        ),
      },
    } satisfies PageProps,
    revalidate: 60,
  };
};
