"use strict";(self.webpackChunkwidget_client=self.webpackChunkwidget_client||[]).push([[969],{6969:function(e,n,t){t.r(n),t.d(n,{default:function(){return b}});var a=t(2791),r=t(4378),o=t(4165),s=t(5861),i=t(7689),c=t(5705),l=t(6727),d=t(5565),u=t(2119),p=t(9610),h=l.Ry().shape({phone:l.Z_().required("Phone is required").matches(/^\d{10}$/,"Please enter a valid phone number")}),m=function(){var e=(0,i.TH)(),n=(0,i.s0)(),t=function(){var t=(0,s.Z)((0,o.Z)().mark((function t(a,r){var s,i,c;return(0,o.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(s=r.setSubmitting)(!0),t.prev=2,t.next=5,d.Z.post(u.Z.GET_OTP,{name:e.state.name,phoneNumber:"+91".concat(a.phone)});case 5:c=t.sent,200===(null===(i=c.data)||void 0===i?void 0:i.statusCode)&&n("".concat(p.Bp.BASE_PATH,"/").concat(p.Bp.PAGES.OTP),{state:{phone:a.phone,name:e.state.name}}),s(!1),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(2),s(!1);case 13:case"end":return t.stop()}}),t,null,[[2,10]])})));return function(e,n){return t.apply(this,arguments)}}(),r=(0,c.TA)({initialValues:{phone:""},validationSchema:h,onSubmit:t});return(0,a.useEffect)((function(){var t;null!==(t=e.state)&&void 0!==t&&t.name||n("/".concat(p.Bp.BASE,"/").concat(p.Bp.PAGES.WELCOME))})),{formik:r}},x=t(184),b=function(){var e=m().formik,n=e.values,t=e.errors,a=e.touched,o=e.handleChange,s=e.handleBlur,i=e.handleSubmit,c=e.isSubmitting;return(0,x.jsxs)("div",{className:"container py-10 px-10 mt-20 mx-0 flex min-w-full flex-col items-center",children:[(0,x.jsx)("div",{className:"",children:(0,x.jsx)("img",{src:r.Z,alt:"Phone-icon"})}),(0,x.jsxs)("div",{className:"text-center",children:[(0,x.jsx)("h1",{className:"font-['body'] font-medium leading-8 text-2xl",children:"Let's get started"}),(0,x.jsx)("p",{className:"font-['body'] text-indigo-900 font-normal text-base space-y-1 leading-6 tracking-wider",children:"Enter your phone number to login to have a quick call"})]}),(0,x.jsxs)("div",{className:"mt-12 font-['body'] text-indigo-900",children:[(0,x.jsx)("h4",{className:"font-medium text-base",children:"Phone number"}),(0,x.jsx)("input",{name:"phone",className:"item-center rounded-lg w-[286px] h-[50px] p-3.5 border border-blue-300 font-['body'] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",type:"number",placeholder:"Enter your number",value:null===n||void 0===n?void 0:n.phone,onChange:o,onBlur:s}),a.phone&&t.phone&&(0,x.jsx)("p",{className:"text-[red]",children:t.phone})]}),(0,x.jsxs)("div",{className:"relative flex py-5 items-center",children:[(0,x.jsx)("div",{className:"flex-grow border-t border-gray-400"}),(0,x.jsx)("div",{className:"flex-grow border-t border-gray-400"})]}),(0,x.jsx)("button",{type:"button",disabled:c,onClick:i,className:"w-[286px] h-[50px] rounded-lg bg-sky-600 text-gray-50 font-['body']",children:"Get OTP"})]})}}}]);
//# sourceMappingURL=969.bf399ace.chunk.js.map