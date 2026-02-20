import {Line, LineChart} from 'recharts';
import './Chart.css'

const Chart = ({Data}) => {
  return(
    <>
    <div className="chart">
    <h1 className="chart-title">Chart to show Interest earned over Time</h1><br/>
    <LineChart width={500} height={300} responsive data={Data}>
      <Line type="monotone" dataKey="investmentValue" stroke="#8884d8" />
    </LineChart>
    </div>
    </>
  );
};

export default Chart
