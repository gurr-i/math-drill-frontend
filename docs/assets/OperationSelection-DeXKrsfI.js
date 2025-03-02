import{r,j as e,L as d}from"./index-B9V82R-J.js";import{u as a,a as l}from"./react-spring_web.modern-DKPqo0ql.js";function y(){const[t,n]=r.useState(!1);r.useEffect(()=>{n(!0)},[]);const s=a({opacity:t?1:0,transform:t?"translateY(0)":"translateY(20px)",config:{tension:120,friction:14}}),o=a({opacity:t?1:0,transform:t?"scale(1)":"scale(0.9)",config:{tension:150,friction:12},delay:200}),c=a({opacity:t?1:0,transform:t?"translateY(0)":"translateY(20px)",config:{tension:100,friction:16},delay:400}),m=[{category:"multiplication",type:"1by1",label:"1 × 1 Digit",range:"1-9"},{category:"multiplication",type:"1by2",label:"1 × 2 Digits",range:"10-99"},{category:"multiplication",type:"1by3",label:"1 × 3 Digits",range:"100-999"},{category:"multiplication",type:"2by2",label:"2 × 2 Digits",range:"10-99"},{category:"multiplication",type:"2by3",label:"2 × 3 Digits",range:"100-999"},{category:"division",type:"1by1",label:"1 ÷ 1 Digit",range:"1-9"},{category:"division",type:"1by2",label:"1 ÷ 2 Digits",range:"10-99"},{category:"division",type:"1by3",label:"1 ÷ 3 Digits",range:"100-999"},{category:"division",type:"2by2",label:"2 ÷ 2 Digits",range:"10-99"},{category:"division",type:"2by3",label:"2 ÷ 3 Digits",range:"100-999"}];return e.jsxDEV("div",{className:"min-vh-100 p-4 bg-gray-100 dark:bg-gray-900",children:e.jsxDEV(l.div,{style:s,className:"container text-center",children:[e.jsxDEV(l.h1,{style:o,className:"display-5 fw-bold text-primary mb-5",children:"Select Operation Type"},void 0,!1,{fileName:"F:/MathsDrill/math-drill-frontend/src/pages/OperationSelection.jsx",lineNumber:49,columnNumber:9},this),e.jsxDEV(l.div,{style:c,className:"row justify-content-center g-4",children:m.map(i=>e.jsxDEV("div",{className:"col-md-4 col-sm-6",children:e.jsxDEV(d,{to:`/drill/${i.category}/${i.type}`,className:"text-decoration-none",children:e.jsxDEV("div",{className:"card bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow",children:[e.jsxDEV("h3",{className:"h5 fw-semibold text-dark dark:text-white",children:i.label},void 0,!1,{fileName:"F:/MathsDrill/math-drill-frontend/src/pages/OperationSelection.jsx",lineNumber:58,columnNumber:19},this),e.jsxDEV("p",{className:"text-muted",children:["Range: ",i.range]},void 0,!0,{fileName:"F:/MathsDrill/math-drill-frontend/src/pages/OperationSelection.jsx",lineNumber:59,columnNumber:19},this)]},void 0,!0,{fileName:"F:/MathsDrill/math-drill-frontend/src/pages/OperationSelection.jsx",lineNumber:57,columnNumber:17},this)},void 0,!1,{fileName:"F:/MathsDrill/math-drill-frontend/src/pages/OperationSelection.jsx",lineNumber:56,columnNumber:15},this)},`${i.category}-${i.type}`,!1,{fileName:"F:/MathsDrill/math-drill-frontend/src/pages/OperationSelection.jsx",lineNumber:55,columnNumber:13},this))},void 0,!1,{fileName:"F:/MathsDrill/math-drill-frontend/src/pages/OperationSelection.jsx",lineNumber:53,columnNumber:9},this)]},void 0,!0,{fileName:"F:/MathsDrill/math-drill-frontend/src/pages/OperationSelection.jsx",lineNumber:48,columnNumber:7},this)},void 0,!1,{fileName:"F:/MathsDrill/math-drill-frontend/src/pages/OperationSelection.jsx",lineNumber:47,columnNumber:5},this)}export{y as default};
