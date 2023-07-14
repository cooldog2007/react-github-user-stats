import React from "react";
import ReactDOM from "react-dom";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import doughnut2D from "fusioncharts/fusioncharts.charts";
import { useGlobalContext } from "../../context/context";

const Doughnut2d = () => {
  const { loading, starsPerLanguage } = useGlobalContext();
  ReactFC.fcRoot(FusionCharts, doughnut2D, CandyTheme);

  const chartConfigs = {
    type: "doughnut2d",
    width: "100%",
    height: "400",

    dataFormat: "json",
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Stars per language", //Set the chart caption
        theme: "candy",
      },
      // Chart Data - from step 2
      data: starsPerLanguage,
    },
  };
  return <>{!loading && starsPerLanguage && <ReactFC {...chartConfigs} />};</>;
};

export default Doughnut2d;
