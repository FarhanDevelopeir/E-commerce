import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const piedata = [
  { name: "Products", value: 800 },
  { name: "Orders", value: 300 },
  { name: "Group C", value: 300 },
  // { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Mar ",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "June",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "July",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "August",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Sept",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "October",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Nov",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Dec",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const AdminDashboard = () => {
  return (
    <div>
      <div>
        <div class="grid grid-cols-1 gap-3  p-3  overflow-hidden  sm:grid-cols-2 sm:gap-3 md:grid-cols-3 md:gap-4 xl:gap-5    text-black ">
          <div className="bg-white text-xs md:text-[18px]  sm:p-2 md:p-4  rounded-lg border-l-[3px] border-pink-700 hover:shadow-2xl hover:scale-[101%] col-span-3 sm:col-span-1 transition duration-300 ...">
            <div className="flex  justify-between items-center  p-1 ">
              <div className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class={`w-6 mr-2 h-6  `}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                  />
                </svg>
                <p className="text-center m-auto font-sans font-semibold">
                  Products
                </p>
              </div>
             
              <div>
              <p className="m-auto">90%</p>
              </div>
            </div>
            <h1 className="px-1 text-[22px] ">2000</h1>
            <div className="flex justify-between px-1">
              <p>500 from last month</p>
              <p className="flex">
                more{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className="bg-white text-xs  md:text-[18px] sm:p-2 md:p-4  border-l-[3px]  rounded-lg  hover:shadow-2xl hover:scale-[101%] transition duration-300 col-span-3 sm:col-span-1 border-pink-700   ...">
            <div className="flex  justify-between  p-1 ">
              <div className="flex justify-center items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6 mr-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>

               
                  <p className=" m-auto font-sans font-semibold">
                  Orders
                </p>
              </div>
              
              <div>
              <p className="m-auto ">35%</p>
              </div>
            </div>
            <h1 className="px-1">450</h1>
            <div className="flex justify-between px-1">
              <p>300 from last month</p>
              <p className="flex">
                more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className=" bg-white text-xs  md:text-[18px] sm:p-2 md:p-4  rounded-lg border-l-[3px] hover:shadow-2xl hover:scale-[101%] transition duration-300  col-span-3 md:col-span-1  border-pink-700   ...">
            <div className="flex justify-between items-center p-1">
              <div className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class={`w-6  h-6 mr-1 items-center `}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                  />
                </svg>
                <p className="text-center m-auto font-sans font-semibold ">
                  Sales
                </p>
              </div>
              <div>
              <p className="m-auto">20%</p>
              </div>
            
            </div>
            <h1 className="px-1">70</h1>
            <div className="flex justify-between px-1">
              <p>50 from last month</p>
              <p className="flex">
                more{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg border-l-[3px] lg:col-span-2  col-span-3  border-pink-700 hover:shadow-2xl hover:scale-[101%] transition duration-300 ...">
            <div className=" overflow-x-scroll">
              {/* <ResponsiveContainer width="100%" height="100%"> */}
                <LineChart
                  className="overflow-hidden"
                  width={880}
                  height={390}
                  data={data}
                  margin={{
                    top: 10,
                    // right: 30,
                    left: -10,
                    bottom: -20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              {/* </ResponsiveContainer> */}
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border-l-[3px] col-span-3 lg:col-span-1  border-pink-700 hover:shadow-2xl hover:scale-[101%] transition duration-300 ...">
            <div className='w-full overflow-x-scroll'>
              {/* <ResponsiveContainer width="100%" height="100%"> */}
                <PieChart height={400} width={400} className=" -ml-16 sm:m-auto lg:-ml-8 xl:m-auto" margin={{  top: -100 }}>
                  <Pie
                    data={piedata}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={130}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {piedata.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              {/* </ResponsiveContainer> */}
            </div>
            <div className="flex justify-around -mt-20">
              {piedata.map((item) => {
                return <div>{item.name}</div>;
              })}
            </div>
            <div className="flex justify-around">
              {COLORS.map((item) => {
                return (
                  <div
                    className="h-[30px] w-[30px]"
                    style={{ backgroundColor: `${item}` }}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
