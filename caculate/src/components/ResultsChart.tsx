import {
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  Line,
  Area,
} from "recharts";
import { calculateChartResults } from "../util/investment";

export function ResultsChart({ resultsData }) {
  const chartData = calculateChartResults(resultsData);
  return (
    <section id="results-chart">
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#FFF" strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            label={{ value: "Year", position: "insideBottomRight", offset: -5 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="totalAmountInvested"
            barSize={20}
            fill="#8884d8"
            name="Total Amount Invested"
          />
          <Line
            type="monotone"
            dataKey="investmentValue"
            stroke="#00bcd4"
            name="Investment Value"
          />
          <Area
            type="monotone"
            dataKey="totalInterest"
            fill="#82ca9d"
            stroke="#2e7d32"
            name="Total Interest"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </section>
  );
}
