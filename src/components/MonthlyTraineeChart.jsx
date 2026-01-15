import React, { useEffect, useState, useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const MonthlyTraineeChart = ({ apiResponse }) => {
  const [data, setData] = useState(new Array(12).fill(0));

  const year = apiResponse?.users?.[0]?.year || "";

  useEffect(() => {
    const monthData = new Array(12).fill(0);

    if (apiResponse?.users?.length) {
      apiResponse.users.forEach(item => {
        const monthIndex = Number(item.month) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          monthData[monthIndex] = Number(item.totalTrainees);
        }
      });
    }

    setData(monthData);
  }, [apiResponse]);

  const config = useMemo(() => ({
    chart: { type: "column" },
    credits: { enabled: false },
    title: { text: `Trainees Per Month - ${year || "N/A"}` },
    xAxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ],
      title: { text: "Months" }
    },
    yAxis: {
      min: 0,
      title: { text: "Total Trainees" }
    },
    plotOptions: {
      column: {
        borderRadius: 6,
        pointPadding: 0.1,
        groupPadding: 0.2
      }
    },
    series: [
      {
        name: "Trainees",
        data,
        color: "#f97316"
      }
    ]
  }), [data, year]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={config}
    />
  );
};

export default MonthlyTraineeChart;
