"use strict";(self.webpackChunkdocs_site=self.webpackChunkdocs_site||[]).push([[687],{734:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>d,frontMatter:()=>i,metadata:()=>p,toc:()=>s});var t=r(1085),o=r(2247);const i={title:"@nx-dotnet/core:openapi-codegen"},c="@nx-dotnet/core",p={id:"core/executors/openapi-codegen",title:"@nx-dotnet/core:openapi-codegen",description:"OpenapiCodegen executor",source:"@site/../../docs/core/executors/openapi-codegen.md",sourceDirName:"core/executors",slug:"/core/executors/openapi-codegen",permalink:"/core/executors/openapi-codegen",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"@nx-dotnet/core:openapi-codegen"},sidebar:"tutorialSidebar",previous:{title:"@nx-dotnet/core:format",permalink:"/core/executors/format"},next:{title:"@nx-dotnet/core:publish",permalink:"/core/executors/publish"}},a={},s=[{value:"OpenapiCodegen executor",id:"openapicodegen-executor",level:2},{value:"Options",id:"options",level:2},{value:'<span class="required">openapiJsonPath</span>',id:"openapijsonpath",level:3},{value:'<span class="required">outputProject</span>',id:"outputproject",level:3},{value:"openApiGeneratorArgs",id:"openapigeneratorargs",level:3},{value:"openApiGeneratorTemplate",id:"openapigeneratortemplate",level:3},{value:"useOpenApiGenerator",id:"useopenapigenerator",level:3}];function l(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...(0,o.RP)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.h1,{id:"nx-dotnetcore",children:["@nx-dotnet/core",":openapi-codegen"]}),"\n",(0,t.jsx)(n.h2,{id:"openapicodegen-executor",children:"OpenapiCodegen executor"}),"\n",(0,t.jsxs)(n.p,{children:["Invokes ",(0,t.jsx)(n.code,{children:"nx g @nx-dotnet/core:swagger-typescript"})," with the proper parameters to update a codegen based library"]}),"\n",(0,t.jsx)(n.h2,{id:"options",children:"Options"}),"\n",(0,t.jsx)(n.h3,{id:"openapijsonpath",children:(0,t.jsx)("span",{className:"required",children:"openapiJsonPath"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"(string): Path to OpenAPI spec file"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"outputproject",children:(0,t.jsx)("span",{className:"required",children:"outputProject"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"(string): Which project should hold the generated code?"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"openapigeneratorargs",children:"openApiGeneratorArgs"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"(array): Additional arguments to pass to the OpenAPI generator"}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["Default: ",(0,t.jsx)(n.code,{children:'["--global-property=models,apis"]'})]}),"\n",(0,t.jsx)(n.h3,{id:"openapigeneratortemplate",children:"openApiGeneratorTemplate"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"(string): The template to use for the OpenAPI generator"}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["Default: ",(0,t.jsx)(n.code,{children:'"typescript-fetch"'})]}),"\n",(0,t.jsx)(n.h3,{id:"useopenapigenerator",children:"useOpenApiGenerator"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"(boolean): Use the OpenAPI generator to generate the code"}),"\n"]})]})}function d(e={}){const{wrapper:n}={...(0,o.RP)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},2247:(e,n,r)=>{r.d(n,{RP:()=>s});var t=r(4041);function o(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function i(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function c(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?i(Object(r),!0).forEach((function(n){o(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function p(e,n){if(null==e)return{};var r,t,o=function(e,n){if(null==e)return{};var r,t,o={},i=Object.keys(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||(o[r]=e[r]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)r=i[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var a=t.createContext({}),s=function(e){var n=t.useContext(a),r=n;return e&&(r="function"==typeof e?e(n):c(c({},n),e)),r},l={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},d=t.forwardRef((function(e,n){var r=e.components,o=e.mdxType,i=e.originalType,a=e.parentName,d=p(e,["components","mdxType","originalType","parentName"]),u=s(r),h=o,x=u["".concat(a,".").concat(h)]||u[h]||l[h]||i;return r?t.createElement(x,c(c({ref:n},d),{},{components:r})):t.createElement(x,c({ref:n},d))}));d.displayName="MDXCreateElement"}}]);