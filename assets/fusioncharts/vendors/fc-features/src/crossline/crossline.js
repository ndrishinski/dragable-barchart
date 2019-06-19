import{ComponentInterface}from'../../../fc-core/src/component-interface';import{toRaphaelColor,pluck,pluckNumber}from'../../../fc-core/src/lib';import{addDep}from'../../../fc-core/src/dependency-manager';import crosslineAnimation from'./crossline.animation';let M='M',L='L',DEFAULTCOLOR='#EEEEEE',DEFAULTALPHA=50,BAND='band';class CrossLine extends ComponentInterface{constructor(){super(),addDep({name:'crosslineAnimation',type:'animationRule',extension:crosslineAnimation})}getName(){return'crossline'}getType(){return'crossline'}show(a={}){let b=this,c=!!a.onTop,d=a.type,e=b.config.prevRenderedOnTop;c===e||b.hide(),b[d]||(d=BAND),b[d](a),b.config.prevRenderedOnTop=c}band(a={}){let b,c,d=this,e=a.managerId,f=a.x1,g=a.y1,h=a.x2,i=a.y2,j=a.thickness,k=!!a.onTop,l=pluck(a.fillcolor,DEFAULTCOLOR),m=pluckNumber(a.alpha,DEFAULTALPHA),n=toRaphaelColor({color:l,alpha:m}),o=d.getLinkedParent().getLinkedParent(),p=o.getEffectiveDimensions(),q=[p.left,p.top,p.width,p.height].toString(),r=d.getLinkedParent().getChildContainer('crosslineBottom'),s=d.getLinkedParent().getChildContainer('crosslineTop');c=k?s:r,b=d.getGraphicalElement('crosslineBand'+e),b?a.animDuration?b.animate({path:[M,f,g,L,h,i]},a.animDuration,'ease-in'):b.attr({path:[M,f,g,L,h,i],"clip-rect":q}):d.addGraphicalElement('crosslineBand'+e,d.getFromEnv('paper').path({path:[M,f,g,L,h,i],"clip-rect":q,stroke:n,fill:n,"stroke-width":j,"stroke-linecap":'butt'},c))}hide(){let a=this.getGraphicalElement(),b=Object.keys(a);for(let c=b.length-1;-1<c;c--)a[b[c]].stop(void 0,!0,!0),a[b[c]].remove(),delete a[b[c]]}}export default CrossLine;