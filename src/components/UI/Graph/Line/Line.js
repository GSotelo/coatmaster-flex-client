import { ResponsiveLine } from '@nivo/line'
import { axisBottom, axisLeft, general, legends, theme } from "./props";

const Line = ({ data, xtitle, ytitle, enableArea, itemsSpacing, translateX, colors }) => (
  <ResponsiveLine
    {...general}
    colors={colors}
    axisLeft={{ ...axisLeft, legend: ytitle }}
    axisBottom={{ ...axisBottom, legend: xtitle }}
    data={data}
    legends={[{ ...legends, itemsSpacing, translateX }]}
    theme={theme}
    enableArea={enableArea}
    areaOpacity={0.15}
  />
);

export default Line;