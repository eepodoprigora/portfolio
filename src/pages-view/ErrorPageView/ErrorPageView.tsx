export type RawProps = {
  errorNumber: number;
  title: string;
};

const ErrorPageView = ({ errorNumber, title }: RawProps) => {
  return (
    <div className="">
      {errorNumber} {title}
    </div>
  );
};

export default ErrorPageView;
