export const general = {
  borderColor: "#fff",
  borderWidth: 1,
  colors: [
    "rgba(0,82,147,0.8)",
    "#86a315",
    "#e37222",
    "#8996a0",
    "#6f1c75"
  ],
  enableRadialLabels: false,
  margin: {
    top: 16,
    right: 115,
    bottom: 0,
    left: 0
  },
  sliceLabelsRadiusOffset:0.75,
  sliceLabel: "value",
  sliceLabelsSkipAngle: 5,
  sliceLabelsTextColor: "#fff",
};

export const theme = {
  textColor: "#8996A0",
  fontSize: 14,
  tooltip: {
    container: {
      background: '#333',
      color: "#fff"
    }
  }
};

export const legends = [
  {
    anchor: 'right',
    direction: 'column',
    effects: [
      {
        on: 'hover',
        style: {
          itemTextColor: "#0071be"
        }
      }
    ],
    itemDirection: 'left-to-right',
    itemHeight: 18,
    itemOpacity: 1,
    itemsSpacing: 6,
    itemWidth: 210,
    symbolShape: 'square',
    symbolSize: 12,
    translateX: 200,
    translateY: -13,
  }
];