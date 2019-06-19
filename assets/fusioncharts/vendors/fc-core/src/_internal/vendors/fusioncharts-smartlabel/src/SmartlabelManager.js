import lib from'./lib';import ContainerManager from'./container-manager';var slLib=lib.init(window),doc=slLib.win.document,M=slLib.win.Math,max=M.max,round=M.round,BLANK='',htmlSplCharSpace={" ":'&nbsp;'},documentSupport=slLib.getDocumentSupport(),SVG_BBOX_CORRECTION=documentSupport.isWebKit?0:4.5;function SmartLabelManager(a,b,c){var d,e,f,g=!1,h=window.document.createElement('canvas');for(e in c=c||{},c.maxCacheLimit=isFinite(f=c.maxCacheLimit)?f:slLib.maxDefaultCacheLimit,'string'==typeof a&&(a=doc.getElementById(a)),d=slLib.createContainer(a),d.innerHTML=slLib.testStrAvg,!documentSupport.isHeadLess&&(documentSupport.isIE||d.offsetHeight||d.offsetWidth)||(g=!0),d.innerHTML='',slLib.parentContainerStyle)d.style[e]=slLib.parentContainerStyle[e];this.parentContainer=d,this.ctx=h&&h.getContext&&h.getContext('2d'),this._containerManager=new ContainerManager(d,g,10),this._showNoEllipses=!b,this._init=!0,this.style={},this.oldStyle={},this.options=c,this.setStyle()}SmartLabelManager.textToLines=function(a){return a=a||{},a.text?'string'!=typeof a.text&&(a.text=a.text.toString()):a.text='',a.lines=a.text.split(/\n|<br\s*?\/?>/ig),a},SmartLabelManager.prototype._calCharDimWithCache=function(a='',b,c){if(!this._init)return!1;var d,e,f,g,h,i,j,k,l,m=this.options.maxCacheLimit,n=this.style||{};return(i=this._advancedCache=this._advancedCache||(this._advancedCache={}),j=this._advancedCacheKey||(this._advancedCacheKey=[]),k=a+n.fontSize+n.fontFamily+n.fontWeight+n.fontStyle,l=a+'init'+n.fontSize+n.fontFamily+n.fontWeight+n.fontStyle,!this.ctx&&htmlSplCharSpace[a]&&(a=htmlSplCharSpace[a]),b?void 0===(h=i[l])&&(e=this._getDimention(a.repeat?a.repeat(c):Array(c+1).join(a)).width,f=this._getDimention(a).width,h=i[l]=(e-c*f)/(c+1),j.push(l),j.length>m&&delete i[j.shift()]):h=0,g=i[k])?{width:g.width,height:g.height}:(d=this._getDimention(a),d.width+=h,i[k]={width:d.width,height:d.height},j.push(k),j.length>m&&delete i[j.shift()],d)},SmartLabelManager.prototype._getDimention=function(a){return this.requireDiv||!this.ctx?slLib._getDimentionUsingDiv(a,this):slLib._getDimentionUsingCanvas(a,this)},SmartLabelManager.prototype._getWidthFn=function(){var a=this,b=a._containerObj,c=b.svgText;return c?function(a){var b,d;return c.textContent=a,b=c.getBBox(),d=b.width-SVG_BBOX_CORRECTION,1>d&&(d=b.width),d}:function(b){return a.requireDiv||!a.ctx?slLib._getDimentionUsingDiv(b,a).width:slLib._getDimentionUsingCanvas(b,a).width}},SmartLabelManager.prototype._isSameStyle=function(){var a=this,b=a.oldStyle||{},c=a.style;return c.fontSize===b.fontSize&&c.fontFamily===b.fontFamily&&c.fontStyle===b.fontStyle&&c.fontWeight===b.fontWeight&&c.fontVariant===b.fontVariant},SmartLabelManager.prototype._setStyleOfCanvas=function(){if(!this._isSameStyle()){var a,b,c=this,d=c.style,e=c.ctx,f=d.fontStyle,g=d.fontVariant,h=d.fontWeight,i=d.fontSize,j=d.fontFamily;i+=-1===i.indexOf('px')?'px':'',a=f+' '+g+' '+h+' '+i+' '+j,c.ctx.font=a,b=this._containerObj=this._containerManager.get(d),this._containerObj?(this._container=b.node,this._context=b.context,this._cache=b.charCache,this._lineHeight=b.lineHeight,this._styleNotSet=!1):this._styleNotSet=!0,b.ellipsesWidth=c._calCharDimWithCache('...',!1).width,b.dotWidth=c._calCharDimWithCache('.',!1).width,b.lineHeight=this._lineHeight=b.lineHeight||slLib._getCleanHeight(d.lineHeight),this.oldStyle=d}},SmartLabelManager.prototype._setStyleOfDiv=function(){var a,b=this.style;this._containerObj=a=this._containerManager.get(b),a.node||this._containerManager._makeDivNode(this._containerObj),this._containerObj?(this._container=a.node,this._context=a.context,this._cache=a.charCache,this._lineHeight=a.lineHeight,this._styleNotSet=!1):this._styleNotSet=!0},SmartLabelManager.prototype._updateStyle=function(){return this.requireDiv||!this.ctx?this._setStyleOfDiv():this._setStyleOfCanvas()},SmartLabelManager.prototype.setStyle=function(a){this.style=slLib.parseStyle(a),slLib.setLineHeight(this.style)},SmartLabelManager.prototype.useEllipsesOnOverflow=function(a){return this._init?(this._showNoEllipses=!a,this):this},SmartLabelManager.prototype.getSmartText=function(a,b,c,d){if(!this._init)return!1;void 0===a||null===a?a='':'string'!=typeof a&&(a=a.toString());var e,f,g,h,j,k,l,m,n,o,p,q,r,s,t,u,v,w,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P=!1,Q=0,R=-1,S=-1,T=-1,U=0,V=0,W=[],X=0,Y=this._showNoEllipses?'':'...',Z=this.ctx,$=[],_=-1,aa=-1,ba=-1,ca=function(a){a=a.replace(/^\s\s*/,'');for(var b=/\s/,c=a.length;b.test(a.charAt(c-=1)););return a.slice(0,c+1)},da={text:a,maxWidth:b,maxHeight:c,width:null,height:null,oriTextWidth:null,oriTextHeight:null,oriText:a,isTruncated:!1};if(P=slLib.xmlTagRegEx.test(a),N=slLib._hasOnlyBRTag(a),this.requireDiv=P&&!N,this._updateStyle(),H=this._lineHeight,I=this._context,J=this._container,K=this._containerObj,L=K.ellipsesWidth,M=K.dotWidth,k=a.replace(slLib.spanAdditionRegx,'$2'),q=this._getWidthFn(),1>=H-c&&0<=H-c&&(c*=1.2),Z||J){if(!documentSupport.isBrowserLess){if(P?N?(a=a.replace(slLib.brRegex,'<br />'),O=slLib._getDimentionOfMultiLineText(a,this),da.oriTextWidth=l=O.width,da.oriTextHeight=m=O.height):(J.innerHTML=a,da.oriTextWidth=l=J.offsetWidth,da.oriTextHeight=m=J.offsetHeight):(h=a=a.replace(slLib.ltgtRegex,function(a){return'&lt;'===a?'<':'>'}),t=this.getOriSize(h,!0,{hasHTMLTag:P,hasOnlyBrTag:N,cleanText:!0}),da.oriTextWidth=l=t.width,da.oriTextHeight=m=t.height),m<=c&&l<=b)return da.width=da.oriTextWidth=l,da.height=da.oriTextHeight=m,da;if(H>c)return da.text='',da.width=da.oriTextWidth=0,da.height=da.oriTextHeight=0,da}if(a=ca(a).replace(/(\s+)/g,' '),j=this._showNoEllipses?b:b-L,!P||N){if(W=slLib._getTextArray(a),e=W.length,f='',g=[],p=W[0],this._cache[p]?z=this._cache[p].width:(z=q(p),this._cache[p]={width:z}),j>z&&!N)g=a.substr(0,slLib.getNearestBreakIndex(a,j,this)).split('');else{if(z>b)return da.text='',da.width=da.oriTextWidth=da.height=da.oriTextHeight=0,da;Y&&(j=b-2*M,j>z?Y='..':(j=b-M,j>z?Y='.':(j=0,Y='')))}if(X=g.length,U=q(g.join('')),V=this._lineHeight,d){for(;X<e;X+=1){if(p=g[X]=W[X],'<br />'===g[X]){V+=this._lineHeight,T=X,Q=max(Q,U),U=0,f=null;continue}if(this._cache[p]?z=this._cache[p].width:((!t||!(z=t.detailObj[p]))&&(z=q(p)),this._cache[p]={width:z}),U+=z,U>j&&(f||(f=g.slice(0,-1).join('')),U>b))return da.text=ca(f)+Y,da.tooltext=da.oriText,da.width=max(Q,U),da.height=V,da}return da.text=g.join(''),da.width=max(Q,U),da.height=V,da}for(;X<e;X+=1){if(p=g[X]=W[X],' '!==p||I||(p=this.ctx?' ':'&nbsp;'),'<br />'===g[X])if(Q=max(Q,U),V+=this._lineHeight,V<=c){T=X,U=0,f=null;continue}else if(V>c)return f=g.slice(0,-1).join(''),da.text=ca(f)+Y,da.tooltext=k,da.width=Q,da.height=V-this._lineHeight,da;if(this._cache[p]?z=this._cache[p].width:((!t||!(z=t.detailObj[p]))&&(z=q(p)),this._cache[p]={width:z}),U+=z,U>j&&(f||(f=g.slice(0,-1).join('')),U>b)){if('<br />'===W[X+1])continue;if(S=slLib._findLastIndex(W.slice(0,g.length),' '),R=slLib._findLastIndex(W.slice(0,g.length),'-'),S>T?(U=q(g.slice(T+1,S).join('')),g.splice(S,1,'<br />'),T=S,n=S+1):R>T?(R===g.length-1?(U=q(g.slice(T+1,S).join('')),g.splice(R,1,'<br />-')):(U=q(g.slice(T+1,S).join('')),g.splice(R,1,'-<br />')),T=R,n=R+1):(g.splice(g.length-1,1,'<br />'+W[X]),ba=g.length-2,U=q(g.slice(T+1,ba+1).join('')),T=ba,n=X),V+=this._lineHeight,V>c)return da.text=ca(f)+Y,da.tooltext=da.oriText,da.width=b,da.height=V-this._lineHeight,da;Q=max(Q,U),f=null,N?U=slLib._getDimentionOfMultiLineText(g.slice(T+1).join(''),this).width:(o=slLib.getNearestBreakIndex(a.substr(n),j,this),U=q(a.substr(n,o||1)),g.length<n+o&&(g=g.concat(a.substr(g.length,n+o-g.length).split('')),X=g.length-1))}}return Q=max(Q,U),da.text=g.join(''),da.width=Q,da.height=V,da}for(k=a.replace(slLib.spanAdditionRegx,'$2'),a=a.replace(slLib.spanAdditionRegx,slLib.spanAdditionReplacer),a=a.replace(/(<br\s*\/*\>)/g,'<span class="'+[slLib.classNameWithTag,' ',slLib.classNameWithTagBR].join('')+'">$1</span>'),J.innerHTML=a,u=J[documentSupport.childRetriverFn](documentSupport.childRetriverString),(v=0,w=u.length);v<w;v+=1)A=u[v],(documentSupport.noClassTesting||slLib.classNameReg.test(A.className))&&(B=A.innerHTML,''!==B&&(' '===B?aa=$.length:'-'===B&&(_=$.length),$.push({spaceIdx:aa,dashIdx:_,elem:A}),W.push(B)));if(X=0,e=$.length,z=e&&$[0].elem.offsetWidth,z>b||!e)return da.text='',da.width=da.oriTextWidth=da.height=da.oriTextHeight=0,da;if(z>j&&!this._showNoEllipses&&(j=b-2*M,j>z?Y='..':(j=b-M,j>z?Y='.':(j=0,Y=''))),r=$[0].elem.offsetLeft,s=$[0].elem.offsetTop,d)for(;X<e;X+=1)A=$[X].elem,C=A.offsetLeft-r+A.offsetWidth,C>j&&(!G&&(G=X),J.offsetWidth>b&&(F=X,X=e));else for(;X<e;X+=1)A=$[X].elem,D=A.offsetHeight+(A.offsetTop-s),C=A.offsetLeft-r+A.offsetWidth,E=null,C>j?(!G&&(G=X),C>b&&(S=$[X].spaceIdx,R=$[X].dashIdx,S>T?($[S].elem.innerHTML='<br/>',T=S):R>T?($[R].elem.innerHTML=R===X?'<br/>-':'-<br/>',T=R):A.parentNode.insertBefore(E=doc.createElement('br'),A),A.offsetHeight+A.offsetTop>c?(E?E.parentNode.removeChild(E):T==R?$[R].elem.innerHTML='-':$[S].elem.innerHTML=' ',F=X,X=e):G=null)):D>c&&(F=X,X=e);if(F<e){for(da.isTruncated=!0,G=G?G:F,X=e-1;X>=G;X-=1)A=$[X].elem,A.parentNode.removeChild(A);for(;0<=X;X-=1)A=$[X].elem,slLib.classNameBrReg.test(A.className)?A.parentNode.removeChild(A):X=0}return da.text=J.innerHTML.replace(slLib.spanRemovalRegx,'$1').replace(/\&amp\;/g,'&'),da.isTruncated&&(da.text+=Y,da.tooltext=k),(da.height=J.offsetHeight,da.width=J.offsetWidth,da)}return da.error=new Error('Body Tag Missing!'),da},SmartLabelManager.prototype.getOriSize=function(a='',b=!0,c={}){if(!this._init)return!1;var d,e,f,g,h,j,k=0,m=0,n={},o=c.hasHTMLTag,p=c.hasOnlyBrTag;if('undefined'==typeof o&&(o=slLib.xmlTagRegEx.test(a)),'undefined'==typeof p&&(p=slLib._hasOnlyBRTag(a)),this.requireDiv=o&&!p,c.cleanText||(a=a.replace(slLib.ltgtRegex,function(a){return'&lt;'===a?'<':'>'})),this._updateStyle(),j=this._container,p)return slLib._getDimentionOfMultiLineText(a,this);if(!b)return this._calCharDimWithCache(a);if(o)return j.innerHTML=a,{width:j.offsetWidth,height:j.offsetHeight};for(d=a.split(''),g=0,h=d.length;g<h;g++)e=d[g],f=this._calCharDimWithCache(e,!1,d.length),m=max(m,f.height),k+=f.width,n[e]=f.width;return{width:round(k),height:m,detailObj:n}},SmartLabelManager.prototype.dispose=function(){return this._init?(this._containerManager&&this._containerManager.dispose&&this._containerManager.dispose(),delete this._container,delete this._context,delete this._cache,delete this._containerManager,delete this._containerObj,delete this.id,delete this.style,delete this.parentContainer,delete this._showNoEllipses,this):this};export default SmartLabelManager;