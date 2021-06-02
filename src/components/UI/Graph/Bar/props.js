export const axisBottom = {
  legendOffset: 20,
  legendPosition: "middle",
  tickPadding: 500
};

export const axisLeft = {
  legendOffset: -50,
  legendPosition: "middle",
  tickValues:5
};

export const general = {
  animate: true,
  borderRadius: 2,
  enableGridX: false,
  enableLabel: false,
  groupMode: "grouped",
  margin: {
    top: 50,
    right: 4,
    bottom: 30,
    left: 60
  },
  //padding: 0.4 // Normal -> 0.4
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
  itemsSpacing: 0,
 
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

