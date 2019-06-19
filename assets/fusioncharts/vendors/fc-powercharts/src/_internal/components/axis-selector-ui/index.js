import{ComponentInterface}from'../../../../../fc-core/src/component-interface';import{componentFactory,TRACKER_FILL}from'../../../../../fc-core/src/lib';import NumericAxis from'../../../../../fc-core/src/axis/numeric';import Map from'core-js/fn/map';import CheckBox from'../../../../../fc-core/src/toolbox/tools/checkbox';let swap=(c,a,b)=>{let d=[c,b.get(c)],e=[a,b.get(a)],f=Array.from(b.entries()),g=f.map(([b,f])=>b===c?e:b===a?d:[b,f]);return new Map(g)},factoryAxis=function(a){let b,c,d,e,f,g=a.config.axesConf,h=a.config.axisMapById,i=h&&Array.from(h.keys())||[],j=!0,k=a.getFromEnv('chart').getChildren('canvas')[0],l=k.getChildren('axisRefVisualCartesian')[0],m=()=>l.asyncDraw(),n=function(a){let b=i.indexOf(a);-1!==b&&i.splice(b,1)};componentFactory(a,NumericAxis,'yAxis',g.length,g),b=(a.getChildren('yAxis')||[]).slice(0),c=a.config.axisMapById=new Map,('l'===a.config.side?b.reverse():b).forEach(b=>{if(!(b.getState('removed')||0===b.config.showaxis)){let g=b.getId();f={},f.axis=b,e=h&&h.get(g),f.checkbox=e&&e.checkbox,c.set(g,f),0===b.config.showaxis?b.hide():b.show(),k.attachAxis(b,!0),j&&(a.config.besideCanvas=g),j=!1,axisCount||(d=b),b.setLinkedItem('canvas',k),l.setLinkedItem(b.getId(),b),l.addExtEventListener('visiblerangeset',m,b),axisCount++,n(g)}}),d&&k.setPrimaryAxis('yAxis',d),function(a,b){let c,d,e;for(e=a.length-1;-1<e;e--)c=a[e],d=b.get(c),d.checkbox&&d.checkbox.remove(),d.axis&&d.axis.remove(),b['delete'](c)}(i,h)},axisCount=0;class AxisSelectorUI extends ComponentInterface{constructor(){super(),this.registerFactory('axis',factoryAxis)}static resetAxisCount(){axisCount=0}configureAttributes(a={}){let b=this,c=b.config;c.axesConf=a.axesConf||[],c.checkboxesConf=a.checkboxesConf||[],c.side=a.side}placeAxis(a){let b,c=this,d=c.config,e=d.side,f=c.getAxesDetails(),g=c.getFromEnv('chartConfig').axesPadding,h=0,i=0,j={right:0,left:0};return f.forEach(c=>{let d=c.value||(c.value={}),f=c.axis;f.getState('removed')||0===f.config.showaxis||(b=f.placeAxis(.7*a),'r'===e?(a-=d.width=b.right,j.right+=b.right,h+=g):(a-=d.width=b.left,j.left+=b.left,i+=g))}),{dimension:j,rightPadding:h,leftPadding:i}}setAxisDimention(){let a=this,b=a.config,c=a.getAxesDetails(),d=a.getFromEnv('chart'),e=a.getFromEnv('chartConfig').axesPadding,f=d.getChildren('canvas')[0].config,g=f.canvasBorderWidth,h=f.canvasPaddingTop,i=f.canvasPaddingBottom,j=f.canvasLeft,k=f.canvasTop,l=f.canvasHeight,m=j+f.canvasWidth,n='r'===b.side,o='r'===b.side?j-g:m+g,p=0;c.forEach(a=>{let b=a.value||(a.value={}),c=a.axis;0===c.config.showaxis||c.getState('removed')||(b.x=n?m+g+p+e:j-g-p-e,b.y=k+h,b.height=l-h-i,b.opposite=o,p+=b.width+e,c.setAxisDimention({x:b.x,y:b.y,opposite:b.opposite,axisLength:b.height}))})}drawHotElements(){let a,b,c=this,d=c.config,e='r'===d.side,f=c.getFromEnv('chartConfig'),g=f.allowAxisShift,h=c.getFromEnv('chart'),i=c.getFromEnv('paper'),j=h.getChildContainer('trackerGroup'),l=d.axisMapById,m=c.getGraphicalElement('axisHotElement')||[],n=h.getChildren('canvas')[0],o=-1,p={cursor:'col-resize',stroke:TRACKER_FILL,fill:TRACKER_FILL,visibility:!0};for(g&&l.forEach((a,b)=>{let d,f=a.value;p.x=f.x+(e?0:-f.width),p.y=f.y,p.width=f.width,p.height=f.height,(d=m[++o])||(d=c.addGraphicalElement('axisHotElement',i.rect(j),!0),d.on('fc-click',c._resuffelAxis)),d.attr(p).data('axisDetails',{axisSelectorUI:c,canvas:n,axisId:b})}),a=o+1,b=m.length;a<b;a++)c.removeGraphicalElement(m[a])}drawCheckBoxes(){let a=this,b=a.config,c=a.getFromEnv('chartConfig'),d=c.allowSelection,e='r'===b.side,f=b.axisMapById;d?f.forEach((b,d)=>{let f=b.value,g=b.checkbox,h=b.axis,i=h.config,j=e?b.axis.getAxisConfig('axisNamePadding'):-f.width;g||(g=b.checkbox=new CheckBox,a.attachChild(g,'checkbox',!0),g.configure({isChecked:!0,text:'',stroke:c.checkBoxColor,symbolStroke:c.checkBoxColor,strokeWidth:1,symbolStrokeWidth:1,containerInfo:{id:'buttonGroup',label:'group',isParent:!0}}),g.addEventListener('fc-click',function(){let b=this,c=b.getFromEnv('chart');b.toggle(),a._dolegendInteraction.call(b,d,c),i.checkBoxChecked=!i.checkBoxChecked})),g.setDimension({x:f.x+j,y:f.y+f.height+4})}):f.forEach(a=>{a.checkbox&&a.checkbox.remove(),delete a.checkbox})}_createLayers(){let a=this,b=a.getFromEnv('chart'),c=b.getContainer('parentgroup');a.createContainer('axisBottomGroup',{name:'axis-bottom-group'},c),a.createContainer('axisTopGroup',{name:'axis-top-group'},c),a.createContainer('buttonGroup',{name:'buttons'},c)}createContainer(a,b,c){let d=this.getFromEnv('animationManager');return this.addChildContainer(a,d.setAnimation({container:c,attr:b,el:this.getChildContainer(a)||'group',component:this,label:'group'}))}draw(){this._createLayers(),this.drawHotElements(),this.drawCheckBoxes()}_resuffelAxis(){var a=this.data('axisDetails'),b=a.axisSelectorUI,c=b.config,d=a.canvas,e=a.axisId,f=b.getAxesDetails();c.besideCanvas!==e&&(f=b.config.axisMapById=swap(c.besideCanvas,e,f)),c.besideCanvas=e,d.setPrimaryAxis('yAxis',f.get(e).axis),b.setAxisDimention(),b.asyncDraw(),d.getChildren('axisRefVisualCartesian')[0].asyncDraw()}_dolegendInteraction(a,b){var c,d,e=this,f=[];for(c in b.iterateComponents(a=>{'dataset'===a.getType()&&f.push(a)}),f)f.hasOwnProperty(c)&&(d=f[c],d.getFromEnv('yAxis').getId()===a&&(!d.getState('visible')&&e.config.checked?(d.config.legendInteractivity=!0,d.show()):d.getState('visible')&&!e.config.checked&&(d.config.legendInteractivity=!0,d.hide())))}manipulateCheckBox(a){var b,c,d,e,f=this,g=a.data,h=g.dataset,j=h.getFromEnv('yAxis').getId(),k=h.getLinkedParent(),l=k.getChildren().dataset,m=g.state,n=!0,o=f.getAxesDetails();if(e=o.get(j))if('hide'===m){for(b=0,c=l.length;b<c;b++)d=l[b],d.getState('visible')&&(n=!1);n&&e.checkbox&&e.checkbox.uncheck()}else e.checkbox&&e.checkbox.check()}getAxesDetails(){return this.config.axisMapById}getType(){return'customAxisUI'}getName(){return'multiAxisSelectorUI'}getAxes(){return Array.from(this.config.axisMapById.values()).map(a=>a.axis)}}export default AxisSelectorUI;