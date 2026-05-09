import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getCommonPageProps } from "@/application/get-common-page-props";
import ErrorPageView, {
  ErrorPageViewRawProps,
} from "@/pages-view/ErrorPageView";
import { CommonPageProps } from "@/shared/model/types";

const NotFoundPage = ({
  errorNumber,
  title,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <ErrorPageView errorNumber={errorNumber} title={title} />;
};

export default NotFoundPage;

type PageProps = CommonPageProps & ErrorPageViewRawProps;

export const getStaticProps: GetStaticProps<PageProps> = async ({}) => {
  const commonPageProps = await getCommonPageProps();

  return {
    props: {
      ...commonPageProps,
      meta: {
        ...commonPageProps.meta,
        title: "Страница не найдена",
      },
      title: "Страница не найдена",
      breadcrumbs: [],
      bodyClass: "error-page",

      errorNumber: 404,
    } satisfies PageProps,
    revalidate: 120,
  };
};
