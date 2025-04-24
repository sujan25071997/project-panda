"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import TransparentCard from "./TransparentCard";

const data = [
  { year: "1940", population: 3000 },
  { year: "1950", population: 2500 },
  { year: "1960", population: 1000 },
  { year: "1970", population: 1000 },
  { year: "1980", population: 1200 },
  { year: "1990", population: 1200 },
  { year: "2000", population: 1100 },
  { year: "2010", population: 1600 },
  { year: "2020", population: 1800 },
  { year: "2024", population: 1900 },
];

const PandaPopulationCard = () => {
  return (
    <TransparentCard className="max-w-md">
      <h2 className="text-white text-2xl font-bold mb-2">
        📈 Panda Population
      </h2>
      <p className="text-white/80 mb-4 text-sm">
        Conservation efforts are paying off! The number of wild pandas is slowly
        growing.
      </p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.1)"
            />
            <XAxis dataKey="year" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="population"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 4, fill: "#fff" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </TransparentCard>
  );
};

export default PandaPopulationCard;
