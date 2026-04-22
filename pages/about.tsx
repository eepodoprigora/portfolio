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
        textBlock1: "// Креативный",
        textBlock2: "разработчик интерфейсов",
      },
      introSectionData: {
        header: "Введение",
        textBlock1: tp(
          "        Меня зовут Евгения, я frontend-разработчик, который превращает идеи в цельные цифровые продукты с продуманной логикой и сильной визуальной подачей.",
        ),
        textBlock2: tp(
          "От анимации и взаимодействия до архитектуры и реализации — создаю цельные современные интерфейсы, удобные в развитии.",
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
