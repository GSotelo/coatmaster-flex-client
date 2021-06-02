import { ResponsiveBar } from "@nivo/bar"
import { axisBottom, axisLeft, general, legends, theme } from "./props";

const Bar = ({ data, xtitle, ytitle, indexBy, keys, colors, translateX, itemWidth }) => (
  <ResponsiveBar
    {...general}
    colors={colors}
    axisBottom={{ ...axisBottom, legend: xtitle }}
    axisLeft={{ ...axisLeft, legend: ytitle }}
    data={data}
    indexBy={indexBy}
    keys={keys}
    legends={[{ ...legends, translateX, itemWidth }]}
    theme={theme}
  />
);

export default Bar;