import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const data = [
  { name: "August", Total: 323.20 },
  { name: "September", Total: 412.65},
  { name: "October", Total: 445.3 },
  { name: "November", Total: 441.23 },
];

const userSpending1 = [
  { name: "August", Total: 741.56 },
  { name: "September", Total: 456.23 },
  { name: "October", Total: 123.69 },
  { name: "November", Total: 541.25 },
];

const userSpending2 = [
  { name: "August", Total: 74.23 },
  { name: "September", Total: 412.36 },
  { name: "October", Total: 856.21 },
  { name: "November", Total: 12.36 },
];

const userSpending3 = [
  { name: "August", Total: 415.26 },
  { name: "September", Total: 412.23 },
  { name: "October", Total: 456.23 },
  { name: "November", Total: 412.36 },
];

const ProductChart = ({ aspect, title,id }) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart  
          width={730}
          height={250}
          data={id % 4 == 0 ? data : ((id % 4 == 1) ? 
          userSpending1 : ((id % 4 == 2) ? userSpending2 : ((id % 4 == 3) ? userSpending3 :data)))}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductChart;
