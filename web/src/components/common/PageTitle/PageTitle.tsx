
import "./pagetitle.scss";

const PageTitle = (props: any) => {
  const data = props.data;

  return (
    <div className="page-title">
      {data.title}
    </div>
  );
};

export default PageTitle;
