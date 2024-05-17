import { useState } from "react";
import MainLayout from "../layout/MainLayout";
import ReactApexChart from "react-apexcharts";
import Card from "../components/Card";
function SubjectOperation() {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Income",
        type: "column",
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
      },
      {
        name: "Cashflow",
        type: "column",
        data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
      },
      {
        name: "Revenue",
        type: "line",
        data: [20, 29, 37, 36, 44, 45, 50, 58],
      },
    ],
    options: {
      // ...votre configuration d'options ici...
    },
  });

  return (
    <MainLayout>
      <div className="wrapper">
        <div className="wrapper__card">
          <Card color={"violet-color-container"} title="Nombre d'étudiants" />
          <Card color={"yellow-color-container"} title="Nombre des classes" />
          <Card color={"green-color-container"} title="Devoirs" />
          <Card color={"green-color-container"} title="Nombre des cours" />
        </div>
      </div>
      <div className="attendance">
        <div className="attendance__header">
          <h3>Participation des étudiants</h3>
        </div>
        <div className="attendance__body">
          <div className="attendance__body--container">
            <h3>7,585</h3>
            <p>Orders</p>
          </div>
          <div className="attendance__body--container">
            <h3>7,585</h3>
            <p>Orders</p>
          </div>
          <div className="attendance__body--container">
            <h3>7,585</h3>
            <p>Orders</p>
          </div>
          <div className="attendance__body--container">
            <h3>7,585</h3>
            <p>Orders</p>
          </div>
        </div>

        <div className="attendance--chart">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="line"
            height={350}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default SubjectOperation;
