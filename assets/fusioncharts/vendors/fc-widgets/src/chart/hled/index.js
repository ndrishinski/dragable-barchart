import Vled from'../vled';class Hled extends Vled{static getName(){return'Hled'}constructor(){super(),this.defaultSeriesType='led',this.defaultPlotShadow=1,this.realtimeEnabled=!0,this.chartleftmargin=15,this.chartrightmargin=15,this.charttopmargin=10,this.chartbottommargin=10,this.showTooltip=0,this.connectTickMarks=0,this.isHorizontal=!0,this.isAxisOpposite=!1}__setDefaultConfig(){super.__setDefaultConfig(),this.config.friendlyName='Vertical LED Gauge'}getName(){return'Hled'}}export default Hled;