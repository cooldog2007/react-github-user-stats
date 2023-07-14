import React from "react";
import ReactDOM from "react-dom";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import Pie3D from "fusioncharts/fusioncharts.charts";
import { useGlobalContext } from "../../context/context";
import { memo } from "react";
import loadingImg from "../../images/preloader.gif";
const Pie3DComponent = memo(({ login }) => {
  const { loading, languages } = useGlobalContext();
  ReactFC.fcRoot(FusionCharts, Pie3D, FusionTheme);

  const chartConfigs = {
    type: "pie3d",
    width: "100%",
    height: "400",

    dataFormat: "json",
    dataSource: {
      // Chart Configuration
      chart: {
        caption: "Languages", //Set the chart caption

        theme: "fusion", //Set the theme for your chart
      },
      // Chart Data - from step 2
      data: languages,
    },
  };

  return <>{!loading && languages && <ReactFC {...chartConfigs} />}</>;
});

export default Pie3DComponent;
