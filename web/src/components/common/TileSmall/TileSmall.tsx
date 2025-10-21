import "./tilesmall.scss";

// import { useNavigate } from "react-router-dom";

const TileSmall = (props: any) => {
  // const navigate = useNavigate();
  // console.log({ props })
  return (
    <div className="tile-small">
      <div className="tile-head">{props.data.title}</div>
      <div className="tile-val">{props.data.val}</div>
    </div>
  );
};

export default TileSmall;
