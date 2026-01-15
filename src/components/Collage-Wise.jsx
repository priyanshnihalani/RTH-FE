import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const CollegePieChart = ({ apiResponse }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let formatted = []
        if (apiResponse?.users?.length) {
            formatted = apiResponse?.users.map(item => ({
                name: item.college?.trim() || "Not Provided",
                y: Number(item.totalTrainees)
            }));
        }
        setData(formatted);
    }, [apiResponse]);

    const config = {
        chart: {
            type: "pie"
        },
        credits: {
            enabled: false
        },
        title: {
            text: "Trainees by College"
        },
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
                data: data,
                colors: ["#f97316", "#fb923c", "#fdba74", "#fed7aa"]
            }
        ]
    };

    return <HighchartsReact highcharts={Highcharts} options={config} />;
};

export default CollegePieChart;
