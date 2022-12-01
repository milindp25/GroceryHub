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
  { name: "August", Total: 8200 },
  { name: "September", Total: 7400 },
  { name: "October", Total: 9800 },
  { name: "November", Total: 5200 },
];

const userSpending1 = [
  { name: "August", Total: 1000 },
  { name: "September", Total: 450 },
  { name: "October", Total: 250 },
  { name: "November", Total: 400 },
];

const userSpending2 = [
  { name: "August", Total: 126.23 },
  { name: "September", Total: 600 },
  { name: "October", Total: 250 },
  { name: "November", Total: 450 },
];

const userSpending3 = [
  { name: "August", Total: 456 },
  { name: "September", Total: 125.63 },
  { name: "October", Total: 225.36 },
  { name: "November", Total: 378.63 },
];

const Chart = ({ aspect, title,element,id }) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart  
          width={730}
          height={250}
          data={element == "Revenue" ? data : ((element == "User" && id  =="Mili") ? 
          userSpending1 : ((element == "User" && id =="milp") ? userSpending2 : ((element == "User" && id =="Enola") ? userSpending3 :data)))}
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

export default Chart;
