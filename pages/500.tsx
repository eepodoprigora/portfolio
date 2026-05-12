import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getCommonPageProps } from "@/application/get-common-page-props";
import ErrorPageView, {
  ErrorPageViewRawProps,
} from "@/pages-view/ErrorPageView";
import { CommonPageProps } from "@/shared/model/types";

const ServerErrorPage = ({
  errorNumber,
  title,
  btnText,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ErrorPageView errorNumber={errorNumber} title={title} btnText={btnText} />
  );
};

export default ServerErrorPage;

type PageProps = CommonPageProps & ErrorPageViewRawProps;

export const getStaticProps: GetStaticProps<PageProps> = async ({ locale }) => {
  const commonPageProps = await getCommonPageProps(locale as "ru" | "en");
  const isEn = locale === "en";

  return {
    props: {
      ...commonPageProps,
      meta: {
        ...commonPageProps.meta,
        title: isEn ? "Server error" : "Ошибка сервера",
      },
      title: isEn ? "Something went wrong" : "Что-то пошло не так",
      breadcrumbs: [],
      bodyClass: "error-page",
      errorNumber: 500,
      btnText: isEn ? "Home" : "На главную",
    } satisfies PageProps,
  };
};
