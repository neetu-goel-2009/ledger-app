
import "./pagesubtitle.scss";

const PageTitle = (props: any) => {
  const data = props.data;

  return (
    <>
      <div className="page-heading-1">{data.heading1}</div>
      <div className="page-heading-2">{data.heading2}</div>
    </>
  );
};

export default PageTitle;
