import { ChartData } from "chart.js";
import {
  SeriesOrganizations,
  Serie,
  SeriesGrouped,
  TypeZonesSelection,
} from "../../types/SeriesGroup";
import { formatDate } from "../../utils/generalUse";

interface GetDataParceProps {
  typeSelection: TypeZonesSelection;
  organizationType?: any;
  groupData?: SeriesGrouped | SeriesOrganizations;
  isAdasa?: boolean;
  setFirstSeriesData: (data: Serie[] | undefined) => void;
  setSecondarySeriesData: (data: Serie[] | undefined) => void;
}

export const dataParce = (
  {
    typeSelection,
    organizationType,
    groupData,
    isAdasa,
    setFirstSeriesData,
    setSecondarySeriesData,
  }: GetDataParceProps,
) => {
  let auxSeriesFirstValue: any = [];
  let auxSeriesSecondValue: any = [];
  const getDataMapper = {
    [TypeZonesSelection["All selected"]]: () => {
      groupData = groupData as SeriesGrouped;

      if (isAdasa === undefined) return;
      auxSeriesFirstValue = isAdasa
        ? groupData?.organizations.adasa?.values["CHL-01"]
        : groupData?.organizations.gsinima?.values["CHL-01"];
      auxSeriesSecondValue = isAdasa
        ? groupData?.organizations.adasa?.values["CHL-01"]
        : groupData?.organizations.gsinima?.values["SPM-01"];
    },
    [TypeZonesSelection["No selected"]]: () => {
      console.log("No selected");
    },
    [TypeZonesSelection["Single zone"]]: () => {
      if (!organizationType) return;
      groupData = groupData as SeriesOrganizations;
      auxSeriesFirstValue = organizationType === "adasa"
        ? groupData?.adasa?.values["CHL-01"]
        : groupData?.gsinima?.values["CHL-01"];
      auxSeriesSecondValue = organizationType === "adasa"
        ? groupData?.adasa?.values["SPM-01"]
        : groupData?.gsinima?.values["SPM-01"];
    },
  };
  getDataMapper[typeSelection]();
  setFirstSeriesData(auxSeriesFirstValue);
  setSecondarySeriesData(auxSeriesSecondValue);
  return;
};
interface GetPlotDataParceProps {
  typeSelection: TypeZonesSelection;
  organizationType?: any;
  groupedData?: SeriesGrouped | SeriesOrganizations;
  // isAdasa?: boolean;
  setPlotData: (data:ChartData<'line'>) => void;
  // setSecondarySeriesData: (data: Serie[] | undefined) => void;
}
export const plotDataParce = (
  {
    typeSelection,
    organizationType,
    groupedData,
    //   isAdasa,
      setPlotData,
    //   setSecondarySeriesData,
  }: GetPlotDataParceProps,
) => {
  console.log("plotDataParce");
  console.log("plotDataParce -->", { groupedData });
  console.log("plotDataParce -->", { typeSelection });

  let labels: any = [];
  let plotData: any = {};

  const getPlotDataMapper = {
    [TypeZonesSelection["Single zone"]]: () => {
      groupedData = groupedData as SeriesOrganizations;
      const organization = organizationType === "adasa"
        ? groupedData?.adasa
        : groupedData?.gsinima;
      labels = organization?.values["CHL-01"]?.map((
        entry: Serie,
      ) => formatDate(entry.ingestion_time));
      plotData = {
        labels,
        datasets: [
          {
            label: "Value Over Time",
            data: organization?.values["CHL-01"]?.map(
              (entry) => entry.value,
            ) || [],
            fill: false,
            borderColor: "rgb(66, 203, 236)",
            tension: 0.1,
          },
          {
            label: "Value Over Time",
            data: organization?.values["SPM-01"]?.map(
              (entry) => entry.value,
            ) || [],
            fill: false,
            borderColor: "rgb(246, 246, 246)",
            tension: 0.1,
          },
        ],
      };
      console.log("No selected");
    },
    [TypeZonesSelection["All selected"]]: () => {
      console.log("plotDataParce --> all selected");
      groupedData = groupedData as SeriesGrouped;
      labels = groupedData?.organizations.adasa?.values["CHL-01"]?.map((
        entry: Serie,
      ) => formatDate(entry.ingestion_time));
      plotData = {
        labels,
        datasets: [
          {
            label: "Value Over Time",
            data: groupedData?.organizations.adasa?.values["CHL-01"]?.map(
              (entry) => entry.value,
            ) || [],
            fill: false,
            borderColor: "rgb(251, 115, 163)",
            tension: 0.1,
          },
          {
            label: "Value Over Time",
            data: groupedData?.organizations.adasa?.values["SPM-01"]?.map(
              (entry) => entry.value,
            ) || [],
            fill: false,
            borderColor: "rgb(246, 246, 246)",
            tension: 0.1,
          },
          {
            label: "Value Over Time",
            data: groupedData?.organizations.gsinima?.values["CHL-01"]?.map(
              (entry) => entry.value,
            ) || [],
            fill: false,
            borderColor: "rgb(66, 203, 236)",
            tension: 0.1,
          },
          {
            label: "Value Over Time",
            data: groupedData?.organizations.gsinima?.values["SPM-01"]?.map(
              (entry) => entry.value,
            ) || [],
            fill: false,
            borderColor: "rgb(248,14,98)",
            tension: 0.1,
          },
        ],
      };
      console.log("No selected");
    },
    [TypeZonesSelection["No selected"]]: () => {
      console.log("No selected");
    },
  };
  getPlotDataMapper[typeSelection]();
  console.log({ plotData });
  setPlotData(plotData)
};
