import { Fragment, useEffect } from "react"
import classes from '../../css/pages/AnalyticsPage.module.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState } from "react";
import ShoplyAxios from "../../apis/ShoplyAxios";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart(props) {

    const [labels, setLabels] = useState([]);
    const [genderData, setGenderData] = useState([]);


    function getGenderAnalytics() {

        if (props.username) {
            ShoplyAxios.get('/sales/analytics/customerAnalytics/' + props.username)
                .then(res => {
                    setLabels(res.data.labels)
                    setGenderData(res.data.data)
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }

    useEffect(() => getGenderAnalytics(), [props.username])

    const data = {
        labels: labels,
        datasets: [
            {
                data: genderData,
                backgroundColor: ['Green', 'aqua', 'purple'],
            },
        ]
    }
    var options = {
        plugins: {
            legend: {
                display: true
            },

        }
    }

    let pieShow = <p className={classes.message}>No customers</p>

    if (genderData[0] > 0 || genderData[1] > 0) {
        console.log(genderData)
        pieShow = <div className={classes.pieChart}>
            <Doughnut options={options} data={data} />
        </div>

    }

    return <Fragment>
        {pieShow}
    </Fragment>


}

export default PieChart;