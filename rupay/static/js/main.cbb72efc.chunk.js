(this.webpackJsonprupay=this.webpackJsonprupay||[]).push([[0],{144:function(e,t,a){e.exports=a(279)},149:function(e,t,a){},151:function(e,t,a){},279:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(35),c=a.n(i),l=(a(149),a(15)),o=a(16),s=a(17),m=a(18),u=a(19),d=(a(150),a(151),a(285)),p=a(289),h=a(28),E=a(291),f=a(288),g=a(287),b=function(e){function t(e){return Object(l.a)(this,t),Object(s.a)(this,Object(m.a)(t).call(this,e))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(g.a.Group,{fluid:!0},r.a.createElement(g.a,{active:0==this.props.section,disabled:0!=this.props.section},r.a.createElement(h.a,{name:"cart",color:0==this.props.section?"blue":"grey"}),r.a.createElement(g.a.Content,null,r.a.createElement(g.a.Title,null,"Billing"),r.a.createElement(g.a.Description,null,"Enter billing information"))),r.a.createElement(g.a,{active:1==this.props.section,disabled:1!=this.props.section},r.a.createElement(h.a,{name:"money bill alternate outline",color:1==this.props.section?"blue":"grey"}),r.a.createElement(g.a.Content,null,r.a.createElement(g.a.Title,null,"Payment"),r.a.createElement(g.a.Description,null,"Make the payment"))))}}]),t}(r.a.Component),y=a(286),v=function(e){function t(e){return Object(l.a)(this,t),Object(s.a)(this,Object(m.a)(t).call(this,e))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return this.items=(this.props.items||[]).map((function(t,a){return r.a.createElement(y.a.Item,{key:t.id,onClick:function(t){return e.props.toggleItemSelection(a)},className:t.selected?"selectedItem":"unselectedItem"},r.a.createElement(y.a.Icon,{name:t.selected?"check circle outline":"circle outline",color:t.selected?"yellow":"grey",size:"large",verticalAlign:"middle"}),r.a.createElement(y.a.Icon,{name:t.icon,color:t.color,size:"large",verticalAlign:"middle"}),r.a.createElement(y.a.Content,{align:"left"},r.a.createElement(y.a.Header,{as:"a"},t.name),r.a.createElement(y.a.Description,{as:"a"},t.description)),r.a.createElement(y.a.Content,{align:"right",className:"listItemPrice"},t.amount," ",r.a.createElement("span",null,"\u20b9")))})),r.a.createElement(y.a,{divided:!0,relaxed:!0,selection:!0},this.items)}}]),t}(r.a.Component),k=a(273),j=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).getPaymentUrl=function(){return"upi://pay?pa=9422376826@paytm&pn=Alpesh%20Patil&tr=alpeshgit&tn=Pay%20to%20Alpesh&am="+a.props.amount+"&mam=null&cu=INR"},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(k,{value:this.getPaymentUrl()}),r.a.createElement("br",null),r.a.createElement(E.a,{raised:!0,className:"mfooter"},r.a.createElement(f.a,{animated:!0,onClick:function(){return e.props.backlink()}},r.a.createElement(f.a.Content,{visible:!0},"Back"),r.a.createElement(f.a.Content,{hidden:!0},r.a.createElement(h.a,{name:"arrow left"}))),r.a.createElement(f.a,{primary:!0,onClick:function(){return window.location.href=e.getPaymentUrl()}},"Pay Now")))}}]),t}(r.a.Component),O=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(s.a)(this,Object(m.a)(t).call(this,e))).getPaymentAmount=function(){return a.state.items.reduce((function(e,t){return t.selected?e+t.amount:e}),0)},a.toggleItemSelection=function(e){a.setState((function(t){return{items:t.items.map((function(t,a){return e===a?(t.selected=!t.selected,t):t}))}}))},a.togglePage=function(){a.setState({confirmed:!a.state.confirmed,section:(a.state.section+1)%2})},a.state={confirmed:!1,section:0,items:[{id:1,name:"Green Tea",icon:"coffee",color:"green",description:"Healthy Green Tea.",amount:20,selected:!1},{id:2,name:"Espresso",icon:"coffee",color:"black",description:"Dark Hot Coffee.",amount:30,selected:!1}]},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(b,{section:this.state.section}),r.a.createElement(d.a,null,r.a.createElement(p.a,{horizontal:!0},r.a.createElement(p.a.Label,null,r.a.createElement(h.a,{name:"inr",size:"big"})),r.a.createElement(p.a.Value,null,this.getPaymentAmount()+"/-")),this.state.confirmed?r.a.createElement(j,{amount:this.getPaymentAmount(),backlink:this.togglePage}):r.a.createElement("div",null,r.a.createElement(v,{amountTracker:this.updateAmount,items:this.state.items,toggleItemSelection:this.toggleItemSelection}),r.a.createElement(E.a,{raised:!0,className:"mfooter"},r.a.createElement(f.a,{primary:!0,animated:!0,disabled:this.getPaymentAmount()<=0,onClick:this.togglePage},r.a.createElement(f.a.Content,{visible:!0},"Continue"),r.a.createElement(f.a.Content,{hidden:!0},r.a.createElement(h.a,{name:"arrow right"})))))))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[144,1,2]]]);
//# sourceMappingURL=main.cbb72efc.chunk.js.map
