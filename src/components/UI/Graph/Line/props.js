const CustomSymbol = ({ size, borderWidth, borderColor }) => (
  <g>
    <circle
      fill="#fff"
      r={size / 2}
      strokeWidth={borderWidth}
      stroke={borderColor}
    />
  </g>
);

export const axisLeft = {
  legendOffset: -43,
  legendPosition: 'middle',
};

export const axisBottom = {
  legendOffset: 20,
  legendPosition: 'middle',
  tickPadding: 500,
  format: "%x",
};

export const general = {
  curve: "catmullRom",
  enableCrosshair: false,
  enablePoints: true,
  margin: {
    top: 50,
    right: 4,
    bottom: 30,
    left: 60
  },
  pointBorderColor: { from: 'color', modifiers: [] },
  pointBorderWidth: 2,
  pointSize: 0, // Normal -> 6
  pointSymbol: CustomSymbol,

  xFormat: "time:%Y/%m/%d %H:%M",
  xScale: {
    format: '%Y-%m-%dT%H:%M:%S.%LZ',
    type: 'time',
    useUTC: false
  },

  yScale: {
    type: 'linear',
    stacked: false,
  },
  useMesh: true
};

export const legends =
{
  anchor: 'top',
  direction: 'row',
  effects: [
    {
      on: 'hover',
      style: {
        itemTextColor: "#0071be"
      }
    }
  ],
  itemDirection: 'left-to-right',
  itemHeight: 0,
  itemOpacity: 0.9,
  itemsSpacing: 80,
  itemWidth: 0,
  justify: false,
  translateX: 0,
  translateY: -30,
  symbolShape: 'square',
  symbolSize: 12,
};

export const theme = {
  axis: {
    legend: {
      text: {
        fontSize: 16,
        fontWeight: "bold"
      },
    },
  },
  fontSize: 13,
  textColor: "#777777",
  tooltip: {
    container: {
      background: "#333",
      color: "#fff"
    }
  }
};