import BarGraph from "../common/BarGraph/BarGraph";
import "./bargraphcomponent.scss";

const BarGraphComponent = (props: any) => {
  const data = props.data;

  return (
    <div className="bar-graph-component">
      <div className="graph-heading">Document Types</div>
      <BarGraph data={data} width={300} height={300} color="red" />
    </div>
  );
};

export default BarGraphComponent;
