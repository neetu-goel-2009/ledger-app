
import "./tilelarge.scss";

// import { useNavigate } from "react-router-dom";

const TileLarge = (props: any) => {
  // const navigate = useNavigate();
  const data = props.data;
  return (
    <div className="tile-large">
      <div className="tile-head">{data.title}</div>
      <div className="tile-row-head">{data.tblHead.map((item: any) => (<div className="tile-column-head">{item}</div>))}</div>
      {data.tblData.map((item: any) => (<div className="tile-row">{item.map((child: any) => (<div className="tile-column">{child}</div>))}</div>))}
    </div>
  );
};

export default TileLarge;
