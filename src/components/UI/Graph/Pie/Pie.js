import { ResponsivePie } from '@nivo/pie'
import { general, legends, theme } from "./props";

const Pie = ({ data }) => (
    <ResponsivePie
        {...general}
        data={data}
        legends={legends}
        theme={ theme }
    />
);

export default Pie;