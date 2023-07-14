import React from "react";
import ReactDOM from "react-dom";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import column3d from "fusioncharts/fusioncharts.charts";
import { useGlobalContext } from "../../context/context";

const Column3D = () => {
  const { loading, stars } = useGlobalContext();
  ReactFC.fcRoot(FusionCharts, column3d, FusionTheme);

  const chartConfigs = {
    type: "column3d",
    width: "100%",
    height: "400",

    dataFormat: "json",
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Most popular", //Set the chart caption
        xAxisName: "Repos",
        xAxisNameFontColor: "var(--clr-grey-7)",
        yAxisNameFontColor: "var(--clr-grey-8)",
        yAxisNameFontBold: "1",
        yAxisName: "Stars",
        theme: "fusion", //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: stars,
    },
  };

  return <>{!loading && stars && <ReactFC {...chartConfigs} />}</>;
};

export default Column3D;
