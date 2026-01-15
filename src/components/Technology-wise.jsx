import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const TechnologyPieChart = ({ apiResponse }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!apiResponse?.users?.length) return;

        const formatted = apiResponse.users.map(item => ({
            name: item.technology || "Unknown",
            y: Number(item.totalTrainees)
        }));

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
            text: "Trainees by Technology"
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

export default TechnologyPieChart;
