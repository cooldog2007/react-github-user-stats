import React from "react";
import ReactDOM from "react-dom";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import bar3d from "fusioncharts/fusioncharts.charts";
import { useGlobalContext } from "../../context/context";

const Bar3D = () => {
  const { loading, forks } = useGlobalContext();
  ReactFC.fcRoot(FusionCharts, bar3d, FusionTheme);

  const chartConfigs = {
    type: "bar3d",
    width: "100%",
    height: "400",

    dataFormat: "json",
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Most forked", //Set the chart caption
        xAxisName: "Repos",
        xAxisNameFontColor: "var(--clr-grey-8)",
        xAxisNameFontBold: "1",
        yAxisNameFontColor: "var(--clr-grey-8)",
        yAxisName: "Forks",
        theme: "fusion", //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: forks,
    },
  };

  return <>{!loading && forks && <ReactFC {...chartConfigs} />}</>;
};

export default Bar3D;
