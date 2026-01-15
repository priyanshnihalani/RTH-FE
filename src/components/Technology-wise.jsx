import React, { useEffect, useState, useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const TechnologyPieChart = ({ apiResponse }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let formatted = [];

    if (apiResponse?.users?.length) {
      formatted = apiResponse.users.map(item => ({
        name: item.technology || "Unknown",
        y: Number(item.totalTrainees)
      }));
    }

    // Always update, even if empty
    setData(formatted);
  }, [apiResponse]);

  const config = useMemo(() => ({
    chart: { type: "pie" },
    credits: { enabled: false },
    title: { text: "Trainees by Technology" },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.y}"
        }
      }
    },
    series: [
      {
        name: "Trainees",
        data,
        colors: ["#f97316", "#fb923c", "#fdba74", "#fed7aa"]
      }
    ]
  }), [data]);

  return <HighchartsReact highcharts={Highcharts} options={config} />;
};

export default TechnologyPieChart;