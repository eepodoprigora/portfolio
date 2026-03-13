import Link from "@/shared/ui/Link";

export type RawProps = { h1: string };

const AboutPageView = ({ h1 }: RawProps) => {
  return (
    <div className="">
      About
      <Link
        href="/
      ">
        Home
      </Link>
    </div>
  );
};

export default AboutPageView;
