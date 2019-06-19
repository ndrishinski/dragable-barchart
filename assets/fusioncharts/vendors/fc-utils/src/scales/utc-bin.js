import{utcMillisecond,utcSecond,utcMinute,utcHour,utcDay,utcWeek,utcMonth,utcYear}from'../time-intervals/utc';import{copyScale}from'../../../fc-core/src/axis/scales/continuous';import ScaleCalendarBin from'./calendar-bin';class ScaleUtcBin extends ScaleCalendarBin{constructor(){super(utcYear,utcMonth,utcWeek,utcDay,utcHour,utcMinute,utcSecond,utcMillisecond),this.formatters={millisecond:{major:this._localeConverter.utcFormatter('%I:%M:%S.%L %p'),minor:this._localeConverter.utcFormatter('%L ms'),context:this._localeConverter.utcFormatter('%b %d, %Y, %I:%M:%S.%L %p')},second:{major:this._localeConverter.utcFormatter('%I:%M:%S %p'),minor:this._localeConverter.utcFormatter('%S s'),context:this._localeConverter.utcFormatter('%b %d, %Y, %I:%M:%S %p')},minute:{major:this._localeConverter.utcFormatter('%I:%M %p'),minor:this._localeConverter.utcFormatter('%M m'),context:this._localeConverter.utcFormatter('%b %d, %Y, %I:%M %p')},hour:{major:this._localeConverter.utcFormatter('%I %p'),minor:this._localeConverter.utcFormatter('%I %p'),context:this._localeConverter.utcFormatter('%b %d, %Y, %I %p')},day:{major:this._localeConverter.utcFormatter('%b %d'),minor:this._localeConverter.utcFormatter('%d'),context:this._localeConverter.utcFormatter('%b %d, %Y')},month:{major:this._localeConverter.utcFormatter('%b'),minor:this._localeConverter.utcFormatter('%b'),context:this._localeConverter.utcFormatter('%b %Y')},year:{major:this._localeConverter.utcFormatter('%Y'),context:this._localeConverter.utcFormatter('%Y')}},this.setDomain([[Date.UTC(2e3,0,1),Date.UTC(2e3,0,2)]])}getType(){return'UTC'}tickFormat(a){return a?b=>this._localeConverter.utcFormatter(a).format(b):(a,b,c)=>this._timeFormat[b]?this._localeConverter.utcFormatter(this._timeFormat[b]).format(a):this.formatters[b][c].format(a)}copy(){return copyScale(this,new ScaleUtcBin)}}export default ScaleUtcBin;