import { TypeZonesSelection } from "../../types/Organization";

interface GetDataParceProps {
  typeSelection: TypeZonesSelection;
  organizationType?: string;
}
export const dataParce = (
  { typeSelection, organizationType }: GetDataParceProps,
) => {
  console.log({ organizationType });
  const getDataMapper = {
    [TypeZonesSelection["All selected"]]: () => {
      console.log("All selected");
    },
    [TypeZonesSelection["No selected"]]: () => {
      console.log("No selected");
    },
    [TypeZonesSelection["Single zone"]]: () => {
      console.log("Single zone");
    },
  };
  return getDataMapper[typeSelection]();
};
