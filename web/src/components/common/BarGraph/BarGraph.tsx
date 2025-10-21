// import "./header.scss";
import { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import theme from '../../../styles/theme.json'

const BarGraph = (props: any) => {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={150} height={40} data={props.data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tickLine={false}
          style={{ color: 'red' }}
        />
        <YAxis tickLine={false} />
        <Bar dataKey="uv" fill={theme.colors.background1} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
