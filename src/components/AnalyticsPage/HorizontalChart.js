import { Fragment } from "react"
import classes from '../../css/pages/AnalyticsPage.module.css';
import { Bar } from 'react-chartjs-2';
import { useState } from "react";
import { useEffect } from "react";
import ShoplyAxios from "../../apis/ShoplyAxios";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


var options = {
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        xAxes: [{
            gridLines: {
                display: false
            }
        }],
        yAxes: [{
            gridLines: {
                display: false
            }
        }]
    }
}


function HorizontalChart(props) {

    const [year, setYear] = useState('2022')
    const [labels, setLabels] = useState([])
    const [earningsData, setEarningsData] = useState([])


    function getEarnings() {
        if (props.username) {
            ShoplyAxios.get('/sales/analytics/earnings/' + props.username + '?year=' + year)
                .then(res => {
                    setLabels(res.data.labels)
                    setEarningsData(res.data.data)
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }

    useEffect(() => getEarnings(), [props.username, year])

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Earnings',
                data: earningsData,
                borderColor: 'Black',
                backgroundColor: 'Green',
            },
        ]
    }

    let totalEarnings = 0
    if (earningsData.length !== 0) {
        totalEarnings = earningsData.reduce((accumulator, currentValue) => accumulator + currentValue)
    }

    return <Fragment>
        <div className={classes.horChart}>
            <select className={classes.select} defaultValue='2022' onChange={(e) => setYear(e.target.value)}>
                <option>2022</option>
                <option>2023</option>
            </select>
            <p className={classes.totalEarnings}>Total Earnings: ${totalEarnings.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>

            <Bar data={data} options={options}></Bar>
        </div>
    </Fragment>


}

export default HorizontalChart;