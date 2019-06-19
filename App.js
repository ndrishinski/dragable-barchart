import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import FusionCharts from "react-native-fusioncharts";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "dragcolumn2d",
      width: "700",
      height: "400",
      dataformat: "json",
      dataSource: {
        chart: {
        caption: "Inventory status - Bakersfield Central",
        subCaption: "Top 5 Food items",
        xAxisName: "Food Item",
        yAxisName: "No. of Units",
        theme: "fusion"
    },
    categories: [
        {
            category: [
                {
                    label: "Poultry"
                },
                {
                    label: "Rice"
                },
                {
                    label: "Peanut Butter"
                },
                {
                    label: "Salmon"
                },
                {
                    label: "Cereal"
                }
            ]
        }
    ],
    dataset: [
        {
            seriesname: "Available Stock",
            allowDrag: "0",
            data: [
                {
                    value: "6000"
                },
                {
                    value: "9500"
                },
                {
                    value: "11900"
                },
                {
                    value: "8000"
                },
                {
                    value: "9700"
                }
            ]
        },
        {
            seriesname: "Estimated Demand",
            dashed: "1",
            data: [
                {
                    value: "19000"
                },
                {
                    value: "16500"
                },
                {
                    value: "14300"
                },
                {
                    value: "10000"
                },
                {
                    value: "9800"
                }
            ]
        }
    ]
}
      }
//  this.state = {
//       type: "column2d",
//       width: "700",
//       height: "400",
//       dataFormat: "json",
//       dataSource: {
//         chart: {
//           caption: "Countries With Most Oil Reserves [2017-18]",
//           subCaption: "In MMbbl = One Million barrels",
//           xAxisName: "Country",
//           yAxisName: "Reserves (MMbbl)",
//           numberSuffix: "K",
//           theme: "fusion",
//         },
//         data: [
//           {
//             allowDrag: "0"
//           },
//           {
//             label: "Venezuela",
//             value: "290",
//           },
//           {
//             label: "Saudi",
//             value: "260",
//           },
//           {
//             label: "Canada",
//             value: "180",
//           },
//           {
//             label: "Iran",
//             value: "140",
//           },
//           {
//             label: "Russia",
//             value: "115",
//           },
//           {
//             label: "UAE",
//             value: "100",
//           },
//           {
//             label: "US",
//             value: "30",
//           },
//           {
//             label: "China",
//             value: "30",
//           }
//         ]
//       }
//     };

    // this.state = {
    //   type: "column2d",
    //   width: "700",
    //   height: "400",
    //   dataFormat: "json",
    //   dataSource: {
    //     chart: {
    //       caption: "Countries With Most Oil Reserves [2017-18]",
    //       subCaption: "In MMbbl = One Million barrels",
    //       xAxisName: "Country",
    //       yAxisName: "Reserves (MMbbl)",
    //       numberSuffix: "K",
    //       theme: "fusion",
    //     },
    //     data: [
    //       {
    //         allowDrag: "0"
    //       },
    //       {
    //         label: "Venezuela",
    //         value: "290",
    //       },
    //       {
    //         label: "Saudi",
    //         value: "260",
    //       },
    //       {
    //         label: "Canada",
    //         value: "180",
    //       },
    //       {
    //         label: "Iran",
    //         value: "140",
    //       },
    //       {
    //         label: "Russia",
    //         value: "115",
    //       },
    //       {
    //         label: "UAE",
    //         value: "100",
    //       },
    //       {
    //         label: "US",
    //         value: "30",
    //       },
    //       {
    //         label: "China",
    //         value: "30",
    //       }
    //     ]
    //   }
    // };
    this.libraryPath = Platform.select({
      // Specify fusioncharts.html file location
      android: {
        uri: "file:///android_asset/fusioncharts.html"
      },
      ios: require("./assets/fusioncharts.html")
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>A Column 2D Chart</Text>
        <View style={styles.chartContainer}>
          <FusionCharts
            type={this.state.type}
            width={this.state.width}
            height={this.state.height}
            dataFormat={this.state.dataFormat}
            dataSource={this.state.dataSource}
            libraryPath={this.libraryPath} // set the libraryPath property
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  header: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 10
  },
  chartContainer: {
    height: 400,
    borderColor: "#000",
    borderWidth: 1
  }
});
