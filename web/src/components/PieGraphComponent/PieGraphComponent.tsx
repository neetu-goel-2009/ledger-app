import PieGraph from "../common/PieGraph/PieGraph";
import GraphInfo from '../GraphInfo/GraphInfo';
import "./piegraphcomponent.scss";

const PieGraphComponent = (props: any) => {

  const data = props.data;

  return (
    <div className="pie-graph-component">
      <div className="graph-heading">Risk Summary</div>
      <div className="graph-outer">
        <PieGraph data={data} width={300} height={300} color="red" />
        {data.map((item: any) => (<div className="graph-legend"><div className="legend-color" style={{ backgroundColor: item.color }}></div>{item.name}</div>))}
      </div>
      <div className="graph-info-outer"><GraphInfo /></div>
    </div>
  );
};

export default PieGraphComponent;
