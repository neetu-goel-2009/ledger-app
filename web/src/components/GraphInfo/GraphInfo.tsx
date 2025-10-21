import "./graphinfo.scss";

const GraphInfo = (props: any) => {

  // const data = props.data;

  return (
    <div className="graph-info">
      <div className="graph-info-heading">Contracts with Highest % of Nonstandard Clauses</div>
      <div className="graph-info-data">
        <ul>
          <li>Contract 1</li>
          <li>Contract 2</li>
          <li>Contract 3</li>
          <li>Contract 4</li>
          <li>Contract 5</li>
        </ul>
      </div>

    </div>
  );
};

export default GraphInfo;
