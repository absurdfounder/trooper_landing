const Wu=()=>{};var oa={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oc={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const R=function(n,e){if(!n)throw an(e)},an=function(n){return new Error("Firebase Database ("+Oc.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dc=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Bu=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[t++];e[i++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[t++],a=n[t++],h=n[t++],u=((s&7)<<18|(o&63)<<12|(a&63)<<6|h&63)-65536;e[i++]=String.fromCharCode(55296+(u>>10)),e[i++]=String.fromCharCode(56320+(u&1023))}else{const o=n[t++],a=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return e.join("")},Er={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,h=a?n[s+1]:0,u=s+2<n.length,f=u?n[s+2]:0,T=o>>2,E=(o&3)<<4|h>>4;let C=(h&15)<<2|f>>6,k=f&63;u||(k=64,a||(C=64)),i.push(t[T],t[E],t[C],t[k])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Dc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Bu(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const o=t[n.charAt(s++)],h=s<n.length?t[n.charAt(s)]:0;++s;const f=s<n.length?t[n.charAt(s)]:64;++s;const E=s<n.length?t[n.charAt(s)]:64;if(++s,o==null||h==null||f==null||E==null)throw new ju;const C=o<<2|h>>4;if(i.push(C),f!==64){const k=h<<4&240|f>>2;if(i.push(k),E!==64){const b=f<<6&192|E;i.push(b)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class ju extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Lc=function(n){const e=Dc(n);return Er.encodeByteArray(e,!0)},bi=function(n){return Lc(n).replace(/\./g,"")},ki=function(n){try{return Er.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hu(n){return Mc(void 0,n)}function Mc(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!$u(t)||(n[t]=Mc(n[t],e[t]));return n}function $u(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gu(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qu=()=>Gu().__FIREBASE_DEFAULTS__,zu=()=>{if(typeof process>"u"||typeof oa>"u")return;const n=oa.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},Ku=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&ki(n[1]);return e&&JSON.parse(e)},Ir=()=>{try{return Wu()||qu()||zu()||Ku()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},xc=n=>{var e,t;return(t=(e=Ir())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},Yu=n=>{const e=xc(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},Fc=()=>{var n;return(n=Ir())==null?void 0:n.config},Uc=n=>{var e;return(e=Ir())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wr{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ju(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...n};return[bi(JSON.stringify(t)),bi(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function he(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Tr(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(he())}function Xu(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Qu(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Vc(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Zu(){const n=he();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function ed(){return Oc.NODE_ADMIN===!0}function td(){try{return typeof indexedDB=="object"}catch{return!1}}function nd(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var o;e(((o=s.error)==null?void 0:o.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const id="FirebaseError";class tt extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=id,Object.setPrototypeOf(this,tt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Yn.prototype.create)}}class Yn{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,o=this.errors[e],a=o?sd(o,i):"Error",h=`${this.serviceName}: ${a} (${s}).`;return new tt(s,h,i)}}function sd(n,e){return n.replace(rd,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const rd=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gn(n){return JSON.parse(n)}function te(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wc=function(n){let e={},t={},i={},s="";try{const o=n.split(".");e=Gn(ki(o[0])||""),t=Gn(ki(o[1])||""),s=o[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},od=function(n){const e=Wc(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},ad=function(n){const e=Wc(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function nn(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Qs(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ni(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function Ot(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const o=n[s],a=e[s];if(aa(o)&&aa(a)){if(!Ot(o,a))return!1}else if(o!==a)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function aa(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cn(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function Ln(n){const e={};return n.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[s,o]=i.split("=");e[decodeURIComponent(s)]=decodeURIComponent(o)}}),e}function Mn(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cd{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let E=0;E<16;E++)i[E]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let E=0;E<16;E++)i[E]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let E=16;E<80;E++){const C=i[E-3]^i[E-8]^i[E-14]^i[E-16];i[E]=(C<<1|C>>>31)&4294967295}let s=this.chain_[0],o=this.chain_[1],a=this.chain_[2],h=this.chain_[3],u=this.chain_[4],f,T;for(let E=0;E<80;E++){E<40?E<20?(f=h^o&(a^h),T=1518500249):(f=o^a^h,T=1859775393):E<60?(f=o&a|h&(o|a),T=2400959708):(f=o^a^h,T=3395469782);const C=(s<<5|s>>>27)+f+u+T+i[E]&4294967295;u=h,h=a,a=(o<<30|o>>>2)&4294967295,o=s,s=C}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+o&4294967295,this.chain_[2]=this.chain_[2]+a&4294967295,this.chain_[3]=this.chain_[3]+h&4294967295,this.chain_[4]=this.chain_[4]+u&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const o=this.buf_;let a=this.inbuf_;for(;s<t;){if(a===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(o[a]=e.charCodeAt(s),++a,++s,a===this.blockSize){this.compress_(o),a=0;break}}else for(;s<t;)if(o[a]=e[s],++a,++s,a===this.blockSize){this.compress_(o),a=0;break}}this.inbuf_=a,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let o=24;o>=0;o-=8)e[i]=this.chain_[s]>>o&255,++i;return e}}function ld(n,e){const t=new hd(n,e);return t.subscribe.bind(t)}class hd{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");ud(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=xs),s.error===void 0&&(s.error=xs),s.complete===void 0&&(s.complete=xs);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function ud(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function xs(){}function dd(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fd=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const o=s-55296;i++,R(i<n.length,"Surrogate pair missing trail surrogate.");const a=n.charCodeAt(i)-56320;s=65536+(o<<10)+a}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Ji=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ie(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Bc(n){return(await fetch(n,{credentials:"include"})).ok}class gt{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const St="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new wr;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(_d(e))try{this.getOrInitializeService({instanceIdentifier:St})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:s});i.resolve(o)}catch{}}}}clearInstance(e=St){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=St){return this.instances.has(e)}getOptions(e=St){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[o,a]of this.instancesDeferred.entries()){const h=this.normalizeInstanceIdentifier(o);i===h&&a.resolve(s)}return s}onInit(e,t){const i=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(i)??new Set;s.add(e),this.onInitCallbacks.set(i,s);const o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:gd(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=St){return this.component?this.component.multipleInstances?e:St:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function gd(n){return n===St?void 0:n}function _d(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class md{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new pd(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var W;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(W||(W={}));const yd={debug:W.DEBUG,verbose:W.VERBOSE,info:W.INFO,warn:W.WARN,error:W.ERROR,silent:W.SILENT},vd=W.INFO,Ed={[W.DEBUG]:"log",[W.VERBOSE]:"log",[W.INFO]:"info",[W.WARN]:"warn",[W.ERROR]:"error"},Id=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Ed[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Xi{constructor(e){this.name=e,this._logLevel=vd,this._logHandler=Id,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in W))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?yd[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,W.DEBUG,...e),this._logHandler(this,W.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,W.VERBOSE,...e),this._logHandler(this,W.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,W.INFO,...e),this._logHandler(this,W.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,W.WARN,...e),this._logHandler(this,W.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,W.ERROR,...e),this._logHandler(this,W.ERROR,...e)}}const wd=(n,e)=>e.some(t=>n instanceof t);let ca,la;function Td(){return ca||(ca=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Sd(){return la||(la=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const jc=new WeakMap,Zs=new WeakMap,Hc=new WeakMap,Fs=new WeakMap,Sr=new WeakMap;function Cd(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{t(dt(n.result)),s()},a=()=>{i(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&jc.set(t,n)}).catch(()=>{}),Sr.set(e,n),e}function Ad(n){if(Zs.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{t(),s()},a=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});Zs.set(n,e)}let er={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Zs.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Hc.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return dt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Rd(n){er=n(er)}function bd(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(Us(this),e,...t);return Hc.set(i,e.sort?e.sort():[e]),dt(i)}:Sd().includes(n)?function(...e){return n.apply(Us(this),e),dt(jc.get(this))}:function(...e){return dt(n.apply(Us(this),e))}}function kd(n){return typeof n=="function"?bd(n):(n instanceof IDBTransaction&&Ad(n),wd(n,Td())?new Proxy(n,er):n)}function dt(n){if(n instanceof IDBRequest)return Cd(n);if(Fs.has(n))return Fs.get(n);const e=kd(n);return e!==n&&(Fs.set(n,e),Sr.set(e,n)),e}const Us=n=>Sr.get(n);function Nd(n,e,{blocked:t,upgrade:i,blocking:s,terminated:o}={}){const a=indexedDB.open(n,e),h=dt(a);return i&&a.addEventListener("upgradeneeded",u=>{i(dt(a.result),u.oldVersion,u.newVersion,dt(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),h.then(u=>{o&&u.addEventListener("close",()=>o()),s&&u.addEventListener("versionchange",f=>s(f.oldVersion,f.newVersion,f))}).catch(()=>{}),h}const Pd=["get","getKey","getAll","getAllKeys","count"],Od=["put","add","delete","clear"],Vs=new Map;function ha(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Vs.get(e))return Vs.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=Od.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Pd.includes(t)))return;const o=async function(a,...h){const u=this.transaction(a,s?"readwrite":"readonly");let f=u.store;return i&&(f=f.index(h.shift())),(await Promise.all([f[t](...h),s&&u.done]))[0]};return Vs.set(e,o),o}Rd(n=>({...n,get:(e,t,i)=>ha(e,t)||n.get(e,t,i),has:(e,t)=>!!ha(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dd{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Ld(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function Ld(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const tr="@firebase/app",ua="0.14.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qe=new Xi("@firebase/app"),Md="@firebase/app-compat",xd="@firebase/analytics-compat",Fd="@firebase/analytics",Ud="@firebase/app-check-compat",Vd="@firebase/app-check",Wd="@firebase/auth",Bd="@firebase/auth-compat",jd="@firebase/database",Hd="@firebase/data-connect",$d="@firebase/database-compat",Gd="@firebase/functions",qd="@firebase/functions-compat",zd="@firebase/installations",Kd="@firebase/installations-compat",Yd="@firebase/messaging",Jd="@firebase/messaging-compat",Xd="@firebase/performance",Qd="@firebase/performance-compat",Zd="@firebase/remote-config",ef="@firebase/remote-config-compat",tf="@firebase/storage",nf="@firebase/storage-compat",sf="@firebase/firestore",rf="@firebase/ai",of="@firebase/firestore-compat",af="firebase",cf="12.14.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nr="[DEFAULT]",lf={[tr]:"fire-core",[Md]:"fire-core-compat",[Fd]:"fire-analytics",[xd]:"fire-analytics-compat",[Vd]:"fire-app-check",[Ud]:"fire-app-check-compat",[Wd]:"fire-auth",[Bd]:"fire-auth-compat",[jd]:"fire-rtdb",[Hd]:"fire-data-connect",[$d]:"fire-rtdb-compat",[Gd]:"fire-fn",[qd]:"fire-fn-compat",[zd]:"fire-iid",[Kd]:"fire-iid-compat",[Yd]:"fire-fcm",[Jd]:"fire-fcm-compat",[Xd]:"fire-perf",[Qd]:"fire-perf-compat",[Zd]:"fire-rc",[ef]:"fire-rc-compat",[tf]:"fire-gcs",[nf]:"fire-gcs-compat",[sf]:"fire-fst",[of]:"fire-fst-compat",[rf]:"fire-vertex","fire-js":"fire-js",[af]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pi=new Map,hf=new Map,ir=new Map;function da(n,e){try{n.container.addComponent(e)}catch(t){Qe.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Dt(n){const e=n.name;if(ir.has(e))return Qe.debug(`There were multiple attempts to register component ${e}.`),!1;ir.set(e,n);for(const t of Pi.values())da(t,n);for(const t of hf.values())da(t,n);return!0}function Cr(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ne(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ft=new Yn("app","Firebase",uf);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class df{constructor(e,t,i){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new gt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ft.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vt=cf;function ff(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i={name:nr,automaticDataCollectionEnabled:!0,...e},s=i.name;if(typeof s!="string"||!s)throw ft.create("bad-app-name",{appName:String(s)});if(t||(t=Fc()),!t)throw ft.create("no-options");const o=Pi.get(s);if(o){if(Ot(t,o.options)&&Ot(i,o.config))return o;throw ft.create("duplicate-app",{appName:s})}const a=new md(s);for(const u of ir.values())a.addComponent(u);const h=new df(t,i,a);return Pi.set(s,h),h}function $c(n=nr){const e=Pi.get(n);if(!e&&n===nr&&Fc())return ff();if(!e)throw ft.create("no-app",{appName:n});return e}function Ve(n,e,t){let i=lf[n]??n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const a=[`Unable to register library "${i}" with version "${e}":`];s&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Qe.warn(a.join(" "));return}Dt(new gt(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pf="firebase-heartbeat-database",gf=1,qn="firebase-heartbeat-store";let Ws=null;function Gc(){return Ws||(Ws=Nd(pf,gf,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(qn)}catch(t){console.warn(t)}}}}).catch(n=>{throw ft.create("idb-open",{originalErrorMessage:n.message})})),Ws}async function _f(n){try{const t=(await Gc()).transaction(qn),i=await t.objectStore(qn).get(qc(n));return await t.done,i}catch(e){if(e instanceof tt)Qe.warn(e.message);else{const t=ft.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Qe.warn(t.message)}}}async function fa(n,e){try{const i=(await Gc()).transaction(qn,"readwrite");await i.objectStore(qn).put(e,qc(n)),await i.done}catch(t){if(t instanceof tt)Qe.warn(t.message);else{const i=ft.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Qe.warn(i.message)}}}function qc(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mf=1024,yf=30;class vf{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new If(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=pa();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>yf){const a=wf(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(i){Qe.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=pa(),{heartbeatsToSend:i,unsentEntries:s}=Ef(this._heartbeatsCache.heartbeats),o=bi(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return Qe.warn(t),""}}}function pa(){return new Date().toISOString().substring(0,10)}function Ef(n,e=mf){const t=[];let i=n.slice();for(const s of n){const o=t.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),ga(t)>e){o.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),ga(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class If{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return td()?nd().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await _f(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return fa(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const i=await this.read();return fa(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function ga(n){return bi(JSON.stringify({version:2,heartbeats:n})).length}function wf(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tf(n){Dt(new gt("platform-logger",e=>new Dd(e),"PRIVATE")),Dt(new gt("heartbeat",e=>new vf(e),"PRIVATE")),Ve(tr,ua,n),Ve(tr,ua,"esm2020"),Ve("fire-js","")}Tf("");var Sf="firebase",Cf="12.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ve(Sf,Cf,"app");function zc(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Kc=zc,Yc=new Yn("auth","Firebase",zc());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oi=new Xi("@firebase/auth");function Af(n,...e){Oi.logLevel<=W.WARN&&Oi.warn(`Auth (${Vt}): ${n}`,...e)}function wi(n,...e){Oi.logLevel<=W.ERROR&&Oi.error(`Auth (${Vt}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function we(n,...e){throw Rr(n,...e)}function Ne(n,...e){return Rr(n,...e)}function Ar(n,e,t){const i={...Kc(),[e]:t};return new Yn("auth","Firebase",i).create(e,{appName:n.name})}function Ie(n){return Ar(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Jc(n,e,t){const i=t;if(!(e instanceof i))throw i.name!==e.constructor.name&&we(n,"argument-error"),Ar(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Rr(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return Yc.create(n,...e)}function N(n,e,...t){if(!n)throw Rr(e,...t)}function Ke(n){const e="INTERNAL ASSERTION FAILED: "+n;throw wi(e),new Error(e)}function Ze(n,e){n||Ke(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sr(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function Rf(){return _a()==="http:"||_a()==="https:"}function _a(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bf(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Rf()||Qu()||"connection"in navigator)?navigator.onLine:!0}function kf(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ze(t>e,"Short delay should be less than long delay!"),this.isMobile=Tr()||Vc()}get(){return bf()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function br(n,e){Ze(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xc{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ke("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ke("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ke("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nf={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pf=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Of=new Xn(3e4,6e4);function je(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Oe(n,e,t,i,s={}){return Qc(n,s,async()=>{let o={},a={};i&&(e==="GET"?a=i:o={body:JSON.stringify(i)});const h=cn({key:n.config.apiKey,...a}).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const f={method:e,headers:u,...o};return Xu()||(f.referrerPolicy="no-referrer"),n.emulatorConfig&&Jn(n.emulatorConfig.host)&&(f.credentials="include"),Xc.fetch()(await Zc(n,n.config.apiHost,t,h),f)})}async function Qc(n,e,t){n._canInitEmulator=!1;const i={...Nf,...e};try{const s=new Lf(n),o=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await o.json();if("needConfirmation"in a)throw mi(n,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{const h=o.ok?a.errorMessage:a.error.message,[u,f]=h.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw mi(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw mi(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw mi(n,"user-disabled",a);const T=i[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(f)throw Ar(n,T,f);we(n,T)}}catch(s){if(s instanceof tt)throw s;we(n,"network-request-failed",{message:String(s)})}}async function ln(n,e,t,i,s={}){const o=await Oe(n,e,t,i,s);return"mfaPendingCredential"in o&&we(n,"multi-factor-auth-required",{_serverResponse:o}),o}async function Zc(n,e,t,i){const s=`${e}${t}?${i}`,o=n,a=o.config.emulator?br(n.config,s):`${n.config.apiScheme}://${s}`;return Pf.includes(t)&&(await o._persistenceManagerAvailable,o._getPersistenceType()==="COOKIE")?o._getPersistence()._getFinalTarget(a).toString():a}function Df(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Lf{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(Ne(this.auth,"network-request-failed")),Of.get())})}}function mi(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=Ne(n,e,i);return s.customData._tokenResponse=t,s}function ma(n){return n!==void 0&&n.enterprise!==void 0}class Mf{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Df(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function xf(n,e){return Oe(n,"GET","/v2/recaptchaConfig",je(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ff(n,e){return Oe(n,"POST","/v1/accounts:delete",e)}async function Di(n,e){return Oe(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function el(n,e=!1){const t=ie(n),i=await t.getIdToken(e),s=kr(i);N(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const o=typeof s.firebase=="object"?s.firebase:void 0,a=o==null?void 0:o.sign_in_provider;return{claims:s,token:i,authTime:xn(Bs(s.auth_time)),issuedAtTime:xn(Bs(s.iat)),expirationTime:xn(Bs(s.exp)),signInProvider:a||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function Bs(n){return Number(n)*1e3}function kr(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return wi("JWT malformed, contained fewer than 3 sections"),null;try{const s=ki(t);return s?JSON.parse(s):(wi("Failed to decode base64 JWT payload"),null)}catch(s){return wi("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function ya(n){const e=kr(n);return N(e,"internal-error"),N(typeof e.exp<"u","internal-error"),N(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lt(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof tt&&Uf(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function Uf({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vf{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const i=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=xn(this.lastLoginAt),this.creationTime=xn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Li(n){var E;const e=n.auth,t=await n.getIdToken(),i=await Lt(n,Di(e,{idToken:t}));N(i==null?void 0:i.users.length,e,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const o=(E=s.providerUserInfo)!=null&&E.length?nl(s.providerUserInfo):[],a=Wf(n.providerData,o),h=n.isAnonymous,u=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),f=h?u:!1,T={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new rr(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(n,T)}async function tl(n){const e=ie(n);await Li(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Wf(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function nl(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bf(n,e){const t=await Qc(n,{},async()=>{const i=cn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:o}=n.config,a=await Zc(n,s,"/v1/token",`key=${o}`),h=await n._getAdditionalHeaders();h["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:h,body:i};return n.emulatorConfig&&Jn(n.emulatorConfig.host)&&(u.credentials="include"),Xc.fetch()(a,u)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function jf(n,e){return Oe(n,"POST","/v2/accounts:revokeToken",je(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){N(e.idToken,"internal-error"),N(typeof e.idToken<"u","internal-error"),N(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ya(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){N(e.length!==0,"internal-error");const t=ya(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(N(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:o}=await Bf(e,t);this.updateTokensAndExpiration(i,s,Number(o))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:o}=t,a=new Jt;return i&&(N(typeof i=="string","internal-error",{appName:e}),a.refreshToken=i),s&&(N(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),o&&(N(typeof o=="number","internal-error",{appName:e}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Jt,this.toJSON())}_performRefresh(){return Ke("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ut(n,e){N(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Re{constructor({uid:e,auth:t,stsTokenManager:i,...s}){this.providerId="firebase",this.proactiveRefresh=new Vf(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new rr(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Lt(this,this.stsTokenManager.getToken(this.auth,e));return N(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return el(this,e)}reload(){return tl(this)}_assign(e){this!==e&&(N(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Re({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){N(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await Li(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ne(this.auth.app))return Promise.reject(Ie(this.auth));const e=await this.getIdToken();return await Lt(this,Ff(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const i=t.displayName??void 0,s=t.email??void 0,o=t.phoneNumber??void 0,a=t.photoURL??void 0,h=t.tenantId??void 0,u=t._redirectEventId??void 0,f=t.createdAt??void 0,T=t.lastLoginAt??void 0,{uid:E,emailVerified:C,isAnonymous:k,providerData:b,stsTokenManager:D}=t;N(E&&D,e,"internal-error");const L=Jt.fromJSON(this.name,D);N(typeof E=="string",e,"internal-error"),ut(i,e.name),ut(s,e.name),N(typeof C=="boolean",e,"internal-error"),N(typeof k=="boolean",e,"internal-error"),ut(o,e.name),ut(a,e.name),ut(h,e.name),ut(u,e.name),ut(f,e.name),ut(T,e.name);const ue=new Re({uid:E,auth:e,email:s,emailVerified:C,displayName:i,isAnonymous:k,photoURL:a,phoneNumber:o,tenantId:h,stsTokenManager:L,createdAt:f,lastLoginAt:T});return b&&Array.isArray(b)&&(ue.providerData=b.map(pe=>({...pe}))),u&&(ue._redirectEventId=u),ue}static async _fromIdTokenResponse(e,t,i=!1){const s=new Jt;s.updateFromServerResponse(t);const o=new Re({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await Li(o),o}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];N(s.localId!==void 0,"internal-error");const o=s.providerUserInfo!==void 0?nl(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(o!=null&&o.length),h=new Jt;h.updateFromIdToken(i);const u=new Re({uid:s.localId,auth:e,stsTokenManager:h,isAnonymous:a}),f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new rr(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(o!=null&&o.length)};return Object.assign(u,f),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const va=new Map;function Ye(n){Ze(n instanceof Function,"Expected a class definition");let e=va.get(n);return e?(Ze(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,va.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class il{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}il.type="NONE";const or=il;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ti(n,e,t){return`firebase:${n}:${e}:${t}`}class Xt{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:o}=this.auth;this.fullUserKey=Ti(this.userKey,s.apiKey,o),this.fullPersistenceKey=Ti("persistence",s.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Di(this.auth,{idToken:e}).catch(()=>{});return t?Re._fromGetAccountInfoResponse(this.auth,t,e):null}return Re._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Xt(Ye(or),e,i);const s=(await Promise.all(t.map(async f=>{if(await f._isAvailable())return f}))).filter(f=>f);let o=s[0]||Ye(or);const a=Ti(i,e.config.apiKey,e.name);let h=null;for(const f of t)try{const T=await f._get(a);if(T){let E;if(typeof T=="string"){const C=await Di(e,{idToken:T}).catch(()=>{});if(!C)break;E=await Re._fromGetAccountInfoResponse(e,C,T)}else E=Re._fromJSON(e,T);f!==o&&(h=E),o=f;break}}catch{}const u=s.filter(f=>f._shouldAllowMigration);return!o._shouldAllowMigration||!u.length?new Xt(o,e,i):(o=u[0],h&&await o._set(a,h.toJSON()),await Promise.all(t.map(async f=>{if(f!==o)try{await f._remove(a)}catch{}})),new Xt(o,e,i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ea(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(al(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(sl(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ll(e))return"Blackberry";if(hl(e))return"Webos";if(rl(e))return"Safari";if((e.includes("chrome/")||ol(e))&&!e.includes("edge/"))return"Chrome";if(cl(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if((i==null?void 0:i.length)===2)return i[1]}return"Other"}function sl(n=he()){return/firefox\//i.test(n)}function rl(n=he()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ol(n=he()){return/crios\//i.test(n)}function al(n=he()){return/iemobile/i.test(n)}function cl(n=he()){return/android/i.test(n)}function ll(n=he()){return/blackberry/i.test(n)}function hl(n=he()){return/webos/i.test(n)}function Nr(n=he()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Hf(n=he()){var e;return Nr(n)&&!!((e=window.navigator)!=null&&e.standalone)}function $f(){return Zu()&&document.documentMode===10}function ul(n=he()){return Nr(n)||cl(n)||hl(n)||ll(n)||/windows phone/i.test(n)||al(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dl(n,e=[]){let t;switch(n){case"Browser":t=Ea(he());break;case"Worker":t=`${Ea(he())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Vt}/${i}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gf{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=o=>new Promise((a,h)=>{try{const u=e(o);a(u)}catch(u){h(u)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i==null?void 0:i.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qf(n,e={}){return Oe(n,"GET","/v2/passwordPolicy",je(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zf=6;class Kf{constructor(e){var i;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??zf,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((i=e.allowedNonAlphanumericCharacters)==null?void 0:i.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yf{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Ia(this),this.idTokenSubscription=new Ia(this),this.beforeStateQueue=new Gf(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Yc,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(o=>this._resolvePersistenceManagerAvailable=o)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ye(t)),this._initializationPromise=this.queue(async()=>{var i,s,o;if(!this._deleted&&(this.persistenceManager=await Xt.create(this,e),(i=this._resolvePersistenceManagerAvailable)==null||i.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((o=this.currentUser)==null?void 0:o.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Di(this,{idToken:e}),i=await Re._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var o;if(ne(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(h=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(h,h))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let i=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(o=this.redirectUser)==null?void 0:o._redirectEventId,h=i==null?void 0:i._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===h)&&(u!=null&&u.user)&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return N(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Li(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=kf()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ne(this.app))return Promise.reject(Ie(this));const t=e?ie(e):null;return t&&N(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&N(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ne(this.app)?Promise.reject(Ie(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ne(this.app)?Promise.reject(Ie(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ye(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await qf(this),t=new Kf(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Yn("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await jf(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ye(e)||this._popupRedirectResolver;N(t,this,"argument-error"),this.redirectPersistenceManager=await Xt.create(this,[Ye(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)==null?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const o=typeof t=="function"?t:t.next.bind(t);let a=!1;const h=this._isInitialized?Promise.resolve():this._initializationPromise;if(N(h,this,"internal-error"),h.then(()=>{a||o(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,i,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return N(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=dl(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const i=await this._getAppCheckToken();return i&&(e["X-Firebase-AppCheck"]=i),e}async _getAppCheckToken(){var t;if(ne(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&Af(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Se(n){return ie(n)}class Ia{constructor(e){this.auth=e,this.observer=null,this.addObserver=ld(t=>this.observer=t)}get next(){return N(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qi={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Jf(n){Qi=n}function fl(n){return Qi.loadJS(n)}function Xf(){return Qi.recaptchaEnterpriseScript}function Qf(){return Qi.gapiScript}function Zf(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class ep{constructor(){this.enterprise=new tp}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class tp{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const np="recaptcha-enterprise",pl="NO_RECAPTCHA";class ip{constructor(e){this.type=np,this.auth=Se(e)}async verify(e="verify",t=!1){async function i(o){if(!t){if(o.tenantId==null&&o._agentRecaptchaConfig!=null)return o._agentRecaptchaConfig.siteKey;if(o.tenantId!=null&&o._tenantRecaptchaConfigs[o.tenantId]!==void 0)return o._tenantRecaptchaConfigs[o.tenantId].siteKey}return new Promise(async(a,h)=>{xf(o,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)h(new Error("recaptcha Enterprise site key undefined"));else{const f=new Mf(u);return o.tenantId==null?o._agentRecaptchaConfig=f:o._tenantRecaptchaConfigs[o.tenantId]=f,a(f.siteKey)}}).catch(u=>{h(u)})})}function s(o,a,h){const u=window.grecaptcha;ma(u)?u.enterprise.ready(()=>{u.enterprise.execute(o,{action:e}).then(f=>{a(f)}).catch(()=>{a(pl)})}):h(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new ep().execute("siteKey",{action:"verify"}):new Promise((o,a)=>{i(this.auth).then(h=>{if(!t&&ma(window.grecaptcha))s(h,o,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let u=Xf();u.length!==0&&(u+=h),fl(u).then(()=>{s(h,o,a)}).catch(f=>{a(f)})}}).catch(h=>{a(h)})})}}async function wa(n,e,t,i=!1,s=!1){const o=new ip(n);let a;if(s)a=pl;else try{a=await o.verify(t)}catch{a=await o.verify(t,!0)}const h={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in h){const u=h.phoneEnrollmentInfo.phoneNumber,f=h.phoneEnrollmentInfo.recaptchaToken;Object.assign(h,{phoneEnrollmentInfo:{phoneNumber:u,recaptchaToken:f,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in h){const u=h.phoneSignInInfo.recaptchaToken;Object.assign(h,{phoneSignInInfo:{recaptchaToken:u,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return h}return i?Object.assign(h,{captchaResp:a}):Object.assign(h,{captchaResponse:a}),Object.assign(h,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(h,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),h}async function Mi(n,e,t,i,s){var o;if((o=n._getRecaptchaConfig())!=null&&o.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await wa(n,e,t,t==="getOobCode");return i(n,a)}else return i(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const h=await wa(n,e,t,t==="getOobCode");return i(n,h)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gl(n,e){const t=Cr(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),o=t.getOptions();if(Ot(o,e??{}))return s;we(s,"already-initialized")}return t.initialize({options:e})}function sp(n,e){const t=(e==null?void 0:e.persistence)||[],i=(Array.isArray(t)?t:[t]).map(Ye);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e==null?void 0:e.popupRedirectResolver)}function _l(n,e,t){const i=Se(n);N(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!!(t!=null&&t.disableWarnings),o=ml(e),{host:a,port:h}=rp(e),u=h===null?"":`:${h}`,f={url:`${o}//${a}${u}/`},T=Object.freeze({host:a,port:h,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){N(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),N(Ot(f,i.config.emulator)&&Ot(T,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=f,i.emulatorConfig=T,i.settings.appVerificationDisabledForTesting=!0,Jn(a)?Bc(`${o}//${a}${u}`):s||op()}function ml(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function rp(n){const e=ml(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const o=s[1];return{host:o,port:Ta(i.substr(o.length+1))}}else{const[o,a]=i.split(":");return{host:o,port:Ta(a)}}}function Ta(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function op(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zi{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ke("not implemented")}_getIdTokenResponse(e){return Ke("not implemented")}_linkToIdToken(e,t){return Ke("not implemented")}_getReauthenticationResolver(e){return Ke("not implemented")}}async function ap(n,e){return Oe(n,"POST","/v1/accounts:update",e)}async function cp(n,e){return Oe(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lp(n,e){return ln(n,"POST","/v1/accounts:signInWithPassword",je(n,e))}async function hp(n,e){return Oe(n,"POST","/v1/accounts:sendOobCode",je(n,e))}async function up(n,e){return hp(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dp(n,e){return ln(n,"POST","/v1/accounts:signInWithEmailLink",je(n,e))}async function fp(n,e){return ln(n,"POST","/v1/accounts:signInWithEmailLink",je(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn extends Zi{constructor(e,t,i,s=null){super("password",i),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new sn(e,t,"password")}static _fromEmailAndCode(e,t,i=null){return new sn(e,t,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Mi(e,t,"signInWithPassword",lp);case"emailLink":return dp(e,{email:this._email,oobCode:this._password});default:we(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const i={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Mi(e,i,"signUpPassword",cp);case"emailLink":return fp(e,{idToken:t,email:this._email,oobCode:this._password});default:we(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qt(n,e){return ln(n,"POST","/v1/accounts:signInWithIdp",je(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pp="http://localhost";class Be extends Zi{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Be(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):we("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s,...o}=t;if(!i||!s)return null;const a=new Be(i,s);return a.idToken=o.idToken||void 0,a.accessToken=o.accessToken||void 0,a.secret=o.secret,a.nonce=o.nonce,a.pendingToken=o.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Qt(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,Qt(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Qt(e,t)}buildRequest(){const e={requestUri:pp,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=cn(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gp(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function _p(n){const e=Ln(Mn(n)).link,t=e?Ln(Mn(e)).deep_link_id:null,i=Ln(Mn(n)).deep_link_id;return(i?Ln(Mn(i)).link:null)||i||t||e||n}class es{constructor(e){const t=Ln(Mn(e)),i=t.apiKey??null,s=t.oobCode??null,o=gp(t.mode??null);N(i&&s&&o,"argument-error"),this.apiKey=i,this.operation=o,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=_p(e);try{return new es(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(){this.providerId=Wt.PROVIDER_ID}static credential(e,t){return sn._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const i=es.parseLink(t);return N(i,"argument-error"),sn._fromEmailAndCode(e,i.code,i.tenantId)}}Wt.PROVIDER_ID="password";Wt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Wt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn extends ts{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class Fn extends hn{static credentialFromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;return N("providerId"in t&&"signInMethod"in t,"argument-error"),Be._fromParams(t)}credential(e){return this._credential({...e,nonce:e.rawNonce})}_credential(e){return N(e.idToken||e.accessToken,"argument-error"),Be._fromParams({...e,providerId:this.providerId,signInMethod:this.providerId})}static credentialFromResult(e){return Fn.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return Fn.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i,oauthTokenSecret:s,pendingToken:o,nonce:a,providerId:h}=e;if(!i&&!s&&!t&&!o||!h)return null;try{return new Fn(h)._credential({idToken:t,accessToken:i,nonce:a,pendingToken:o})}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He extends hn{constructor(){super("facebook.com")}static credential(e){return Be._fromParams({providerId:He.PROVIDER_ID,signInMethod:He.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return He.credentialFromTaggedObject(e)}static credentialFromError(e){return He.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return He.credential(e.oauthAccessToken)}catch{return null}}}He.FACEBOOK_SIGN_IN_METHOD="facebook.com";He.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e extends hn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Be._fromParams({providerId:$e.PROVIDER_ID,signInMethod:$e.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return $e.credentialFromTaggedObject(e)}static credentialFromError(e){return $e.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return $e.credential(t,i)}catch{return null}}}$e.GOOGLE_SIGN_IN_METHOD="google.com";$e.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge extends hn{constructor(){super("github.com")}static credential(e){return Be._fromParams({providerId:Ge.PROVIDER_ID,signInMethod:Ge.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Ge.credentialFromTaggedObject(e)}static credentialFromError(e){return Ge.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Ge.credential(e.oauthAccessToken)}catch{return null}}}Ge.GITHUB_SIGN_IN_METHOD="github.com";Ge.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe extends hn{constructor(){super("twitter.com")}static credential(e,t){return Be._fromParams({providerId:qe.PROVIDER_ID,signInMethod:qe.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return qe.credentialFromTaggedObject(e)}static credentialFromError(e){return qe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return qe.credential(t,i)}catch{return null}}}qe.TWITTER_SIGN_IN_METHOD="twitter.com";qe.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mp(n,e){return ln(n,"POST","/v1/accounts:signUp",je(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const o=await Re._fromIdTokenResponse(e,i,s),a=Sa(i);return new _t({user:o,providerId:a,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=Sa(i);return new _t({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function Sa(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xi extends tt{constructor(e,t,i,s){super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,xi.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new xi(e,t,i,s)}}function yl(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?xi._fromErrorAndOperation(n,o,e,i):o})}async function yp(n,e,t=!1){const i=await Lt(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return _t._forOperation(n,"link",i)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vl(n,e,t=!1){const{auth:i}=n;if(ne(i.app))return Promise.reject(Ie(i));const s="reauthenticate";try{const o=await Lt(n,yl(i,s,e,n),t);N(o.idToken,i,"internal-error");const a=kr(o.idToken);N(a,i,"internal-error");const{sub:h}=a;return N(n.uid===h,i,"user-mismatch"),_t._forOperation(n,s,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&we(i,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function El(n,e,t=!1){if(ne(n.app))return Promise.reject(Ie(n));const i="signIn",s=await yl(n,i,e),o=await _t._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(o.user),o}async function Il(n,e){return El(Se(n),e)}async function vp(n,e){return vl(ie(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ep(n,e){return ln(n,"POST","/v1/accounts:signInWithCustomToken",je(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ip(n,e){if(ne(n.app))return Promise.reject(Ie(n));const t=Se(n),i=await Ep(t,{token:e,returnSecureToken:!0}),s=await _t._fromIdTokenResponse(t,"signIn",i);return await t._updateCurrentUser(s.user),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wl(n){const e=Se(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function wp(n,e,t){const i=Se(n);await Mi(i,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",up)}async function Tp(n,e,t){if(ne(n.app))return Promise.reject(Ie(n));const i=Se(n),a=await Mi(i,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",mp).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&wl(n),u}),h=await _t._fromIdTokenResponse(i,"signIn",a);return await i._updateCurrentUser(h.user),h}function Sp(n,e,t){return ne(n.app)?Promise.reject(Ie(n)):Il(ie(n),Wt.credential(e,t)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&wl(n),i})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cp(n,e){return Oe(n,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ap(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const i=ie(n),o={idToken:await i.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},a=await Lt(i,Cp(i.auth,o));i.displayName=a.displayName||null,i.photoURL=a.photoUrl||null;const h=i.providerData.find(({providerId:u})=>u==="password");h&&(h.displayName=i.displayName,h.photoURL=i.photoURL),await i._updateTokensIfNecessary(a)}function Rp(n,e){const t=ie(n);return ne(t.auth.app)?Promise.reject(Ie(t.auth)):Tl(t,e,null)}function bp(n,e){return Tl(ie(n),null,e)}async function Tl(n,e,t){const{auth:i}=n,o={idToken:await n.getIdToken(),returnSecureToken:!0};e&&(o.email=e),t&&(o.password=t);const a=await Lt(n,ap(i,o));await n._updateTokensIfNecessary(a,!0)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kp(n,e){return ie(n).setPersistence(e)}function Sl(n,e,t,i){return ie(n).onIdTokenChanged(e,t,i)}function Cl(n,e,t){return ie(n).beforeAuthStateChanged(e,t)}function Np(n,e,t,i){return ie(n).onAuthStateChanged(e,t,i)}function Pp(n){return ie(n).signOut()}const Fi="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Al{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Fi,"1"),this.storage.removeItem(Fi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Op=1e3,Dp=10;class Rl extends Al{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ul(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,h,u)=>{this.notifyListeners(a,u)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(i);!t&&this.localCache[i]===a||this.notifyListeners(i,a)},o=this.storage.getItem(i);$f()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Dp):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},Op)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Rl.type="LOCAL";const bl=Rl;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kl extends Al{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}kl.type="SESSION";const Pr=kl;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lp(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new ns(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:o}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const h=Array.from(a).map(async f=>f(t.origin,o)),u=await Lp(h);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ns.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Or(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mp{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let o,a;return new Promise((h,u)=>{const f=Or("",20);s.port1.start();const T=setTimeout(()=>{u(new Error("unsupported_event"))},i);a={messageChannel:s,onMessage(E){const C=E;if(C.data.eventId===f)switch(C.data.status){case"ack":clearTimeout(T),o=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),h(C.data.response);break;default:clearTimeout(T),clearTimeout(o),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:f,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function We(){return window}function xp(n){We().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nl(){return typeof We().WorkerGlobalScope<"u"&&typeof We().importScripts=="function"}async function Fp(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Up(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function Vp(){return Nl()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pl="firebaseLocalStorageDb",Wp=1,Ui="firebaseLocalStorage",Ol="fbase_key";class Qn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function is(n,e){return n.transaction([Ui],e?"readwrite":"readonly").objectStore(Ui)}function Bp(){const n=indexedDB.deleteDatabase(Pl);return new Qn(n).toPromise()}function Dl(){const n=indexedDB.open(Pl,Wp);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(Ui,{keyPath:Ol})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(Ui)?e(i):(i.close(),await Bp(),e(await Dl()))})})}async function Ca(n,e,t){const i=is(n,!0).put({[Ol]:e,value:t});return new Qn(i).toPromise()}async function jp(n,e){const t=is(n,!1).get(e),i=await new Qn(t).toPromise();return i===void 0?null:i.value}function Aa(n,e){const t=is(n,!0).delete(e);return new Qn(t).toPromise()}const Hp=800,$p=3;class Ll{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=Dl(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>$p)throw i;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return Nl()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ns._getInstance(Vp()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,i;if(this.activeServiceWorker=await Fp(),!this.activeServiceWorker)return;this.sender=new Mp(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(i=e[0])!=null&&i.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Up()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await Ca(e,Fi,"1"),await Aa(e,Fi)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>Ca(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>jp(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Aa(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const o=is(s,!1).getAll();return new Qn(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:o}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(o)&&(this.notifyListeners(s,o),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Hp)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ll.type="LOCAL";const Ml=Ll;new Xn(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dr(n,e){return e?Ye(e):(N(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lr extends Zi{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Qt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Qt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Qt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Gp(n){return El(n.auth,new Lr(n),n.bypassAuthState)}function qp(n){const{auth:e,user:t}=n;return N(t,e,"internal-error"),vl(t,new Lr(n),n.bypassAuthState)}async function zp(n){const{auth:e,user:t}=n;return N(t,e,"internal-error"),yp(t,new Lr(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xl{constructor(e,t,i,s,o=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:o,error:a,type:h}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:i,tenantId:o||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(h)(u))}catch(f){this.reject(f)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Gp;case"linkViaPopup":case"linkViaRedirect":return zp;case"reauthViaPopup":case"reauthViaRedirect":return qp;default:we(this.auth,"internal-error")}}resolve(e){Ze(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ze(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kp=new Xn(2e3,1e4);async function Yp(n,e,t){if(ne(n.app))return Promise.reject(Ne(n,"operation-not-supported-in-this-environment"));const i=Se(n);Jc(n,e,ts);const s=Dr(i,t);return new Rt(i,"signInViaPopup",e,s).executeNotNull()}class Rt extends xl{constructor(e,t,i,s,o){super(e,t,s,o),this.provider=i,this.authWindow=null,this.pollId=null,Rt.currentPopupAction&&Rt.currentPopupAction.cancel(),Rt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return N(e,this.auth,"internal-error"),e}async onExecution(){Ze(this.filter.length===1,"Popup operations only handle one event");const e=Or();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Ne(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Ne(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Rt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if((i=(t=this.authWindow)==null?void 0:t.window)!=null&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Ne(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Kp.get())};e()}}Rt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jp="pendingRedirect",Si=new Map;class Xp extends xl{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=Si.get(this.auth._key());if(!e){try{const i=await Qp(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}Si.set(this.auth._key(),e)}return this.bypassAuthState||Si.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Qp(n,e){const t=Ul(e),i=Fl(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}async function Zp(n,e){return Fl(n)._set(Ul(e),"true")}function eg(n,e){Si.set(n._key(),e)}function Fl(n){return Ye(n._redirectPersistence)}function Ul(n){return Ti(Jp,n.config.apiKey,n.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tg(n,e,t){return ng(n,e,t)}async function ng(n,e,t){if(ne(n.app))return Promise.reject(Ie(n));const i=Se(n);Jc(n,e,ts),await i._initializationPromise;const s=Dr(i,t);return await Zp(s,i),s._openRedirect(i,e,"signInViaRedirect")}async function ig(n,e){return await Se(n)._initializationPromise,Vl(n,e,!1)}async function Vl(n,e,t=!1){if(ne(n.app))return Promise.reject(Ie(n));const i=Se(n),s=Dr(i,e),a=await new Xp(i,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await i._persistUserIfCurrent(a.user),await i._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sg=600*1e3;class rg{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!og(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!Wl(e)){const s=((i=e.error.code)==null?void 0:i.split("auth/")[1])||"internal-error";t.onError(Ne(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=sg&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ra(e))}saveEventToCache(e){this.cachedEventUids.add(Ra(e)),this.lastProcessedEventTime=Date.now()}}function Ra(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Wl({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function og(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Wl(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ag(n,e={}){return Oe(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cg=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,lg=/^https?/;async function hg(n){if(n.config.emulator)return;const{authorizedDomains:e}=await ag(n);for(const t of e)try{if(ug(t))return}catch{}we(n,"unauthorized-domain")}function ug(n){const e=sr(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===i}if(!lg.test(t))return!1;if(cg.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dg=new Xn(3e4,6e4);function ba(){const n=We().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function fg(n){return new Promise((e,t)=>{var s,o,a;function i(){ba(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ba(),t(Ne(n,"network-request-failed"))},timeout:dg.get()})}if((o=(s=We().gapi)==null?void 0:s.iframes)!=null&&o.Iframe)e(gapi.iframes.getContext());else if((a=We().gapi)!=null&&a.load)i();else{const h=Zf("iframefcb");return We()[h]=()=>{gapi.load?i():t(Ne(n,"network-request-failed"))},fl(`${Qf()}?onload=${h}`).catch(u=>t(u))}}).catch(e=>{throw Ci=null,e})}let Ci=null;function pg(n){return Ci=Ci||fg(n),Ci}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gg=new Xn(5e3,15e3),_g="__/auth/iframe",mg="emulator/auth/iframe",yg={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},vg=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Eg(n){const e=n.config;N(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?br(e,mg):`https://${n.config.authDomain}/${_g}`,i={apiKey:e.apiKey,appName:n.name,v:Vt},s=vg.get(n.config.apiHost);s&&(i.eid=s);const o=n._getFrameworks();return o.length&&(i.fw=o.join(",")),`${t}?${cn(i).slice(1)}`}async function Ig(n){const e=await pg(n),t=We().gapi;return N(t,n,"internal-error"),e.open({where:document.body,url:Eg(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:yg,dontclear:!0},i=>new Promise(async(s,o)=>{await i.restyle({setHideOnLeave:!1});const a=Ne(n,"network-request-failed"),h=We().setTimeout(()=>{o(a)},gg.get());function u(){We().clearTimeout(h),s(i)}i.ping(u).then(u,()=>{o(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wg={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Tg=500,Sg=600,Cg="_blank",Ag="http://localhost";class ka{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Rg(n,e,t,i=Tg,s=Sg){const o=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-i)/2,0).toString();let h="";const u={...wg,width:i.toString(),height:s.toString(),top:o,left:a},f=he().toLowerCase();t&&(h=ol(f)?Cg:t),sl(f)&&(e=e||Ag,u.scrollbars="yes");const T=Object.entries(u).reduce((C,[k,b])=>`${C}${k}=${b},`,"");if(Hf(f)&&h!=="_self")return bg(e||"",h),new ka(null);const E=window.open(e||"",h,T);N(E,n,"popup-blocked");try{E.focus()}catch{}return new ka(E)}function bg(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kg="__/auth/handler",Ng="emulator/auth/handler",Pg=encodeURIComponent("fac");async function Na(n,e,t,i,s,o){N(n.config.authDomain,n,"auth-domain-config-required"),N(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:Vt,eventId:s};if(e instanceof ts){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Qs(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[T,E]of Object.entries({}))a[T]=E}if(e instanceof hn){const T=e.getScopes().filter(E=>E!=="");T.length>0&&(a.scopes=T.join(","))}n.tenantId&&(a.tid=n.tenantId);const h=a;for(const T of Object.keys(h))h[T]===void 0&&delete h[T];const u=await n._getAppCheckToken(),f=u?`#${Pg}=${encodeURIComponent(u)}`:"";return`${Og(n)}?${cn(h).slice(1)}${f}`}function Og({config:n}){return n.emulator?br(n,Ng):`https://${n.authDomain}/${kg}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const js="webStorageSupport";class Dg{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Pr,this._completeRedirectFn=Vl,this._overrideRedirectResult=eg}async _openPopup(e,t,i,s){var a;Ze((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const o=await Na(e,t,i,sr(),s);return Rg(e,o,Or())}async _openRedirect(e,t,i,s){await this._originValidation(e);const o=await Na(e,t,i,sr(),s);return xp(o),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:o}=this.eventManagers[t];return s?Promise.resolve(s):(Ze(o,"If manager is not set, promise should be"),o)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await Ig(e),i=new rg(e);return t.register("authEvent",s=>(N(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(js,{type:js},s=>{var a;const o=(a=s==null?void 0:s[0])==null?void 0:a[js];o!==void 0&&t(!!o),we(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=hg(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ul()||rl()||Nr()}}const Bl=Dg;var Pa="@firebase/auth",Oa="1.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lg{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e((i==null?void 0:i.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){N(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mg(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function xg(n){Dt(new gt("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:a,authDomain:h}=i.options;N(a&&!a.includes(":"),"invalid-api-key",{appName:i.name});const u={apiKey:a,authDomain:h,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:dl(n)},f=new Yf(i,s,o,u);return sp(f,t),f},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),Dt(new gt("auth-internal",e=>{const t=Se(e.getProvider("auth").getImmediate());return(i=>new Lg(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ve(Pa,Oa,Mg(n)),Ve(Pa,Oa,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fg=300,Ug=Uc("authIdTokenMaxAge")||Fg;let Da=null;const Vg=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>Ug)return;const s=t==null?void 0:t.token;Da!==s&&(Da=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Wg(n=$c()){const e=Cr(n,"auth");if(e.isInitialized())return e.getImmediate();const t=gl(n,{popupRedirectResolver:Bl,persistence:[Ml,bl,Pr]}),i=Uc("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(i,location.origin);if(location.origin===o.origin){const a=Vg(o.toString());Cl(t,a,()=>a(t.currentUser)),Sl(t,h=>a(h))}}const s=xc("auth");return s&&_l(t,`http://${s}`),t}function Bg(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}Jf({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const o=Ne("internal-error");o.customData=s,t(o)},i.type="text/javascript",i.charset="UTF-8",Bg().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});xg("Browser");const ov=Object.freeze(Object.defineProperty({__proto__:null,ActionCodeURL:es,AuthCredential:Zi,EmailAuthCredential:sn,EmailAuthProvider:Wt,FacebookAuthProvider:He,GithubAuthProvider:Ge,GoogleAuthProvider:$e,OAuthCredential:Be,OAuthProvider:Fn,TwitterAuthProvider:qe,beforeAuthStateChanged:Cl,browserLocalPersistence:bl,browserPopupRedirectResolver:Bl,browserSessionPersistence:Pr,connectAuthEmulator:_l,createUserWithEmailAndPassword:Tp,getAuth:Wg,getIdTokenResult:el,getRedirectResult:ig,inMemoryPersistence:or,indexedDBLocalPersistence:Ml,initializeAuth:gl,onAuthStateChanged:Np,onIdTokenChanged:Sl,prodErrorMap:Kc,reauthenticateWithCredential:vp,reload:tl,sendPasswordResetEmail:wp,setPersistence:kp,signInWithCredential:Il,signInWithCustomToken:Ip,signInWithEmailAndPassword:Sp,signInWithPopup:Yp,signInWithRedirect:tg,signOut:Pp,updateEmail:Rp,updatePassword:bp,updateProfile:Ap},Symbol.toStringTag,{value:"Module"}));var La={};const Ma="@firebase/database",xa="1.1.3";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let jl="";function jg(n){jl=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hg{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),te(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Gn(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $g{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return nt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hl=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Hg(e)}}catch{}return new $g},bt=Hl("localStorage"),Gg=Hl("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zt=new Xi("@firebase/database"),qg=(function(){let n=1;return function(){return n++}})(),$l=function(n){const e=fd(n),t=new cd;t.update(e);const i=t.digest();return Er.encodeByteArray(i)},Zn=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Zn.apply(null,i):typeof i=="object"?e+=te(i):e+=i,e+=" "}return e};let Un=null,Fa=!0;const zg=function(n,e){R(!0,"Can't turn on custom loggers persistently."),Zt.logLevel=W.VERBOSE,Un=Zt.log.bind(Zt)},re=function(...n){if(Fa===!0&&(Fa=!1,Un===null&&Gg.get("logging_enabled")===!0&&zg()),Un){const e=Zn.apply(null,n);Un(e)}},ei=function(n){return function(...e){re(n,...e)}},ar=function(...n){const e="FIREBASE INTERNAL ERROR: "+Zn(...n);Zt.error(e)},et=function(...n){const e=`FIREBASE FATAL ERROR: ${Zn(...n)}`;throw Zt.error(e),new Error(e)},_e=function(...n){const e="FIREBASE WARNING: "+Zn(...n);Zt.warn(e)},Kg=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&_e("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Gl=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Yg=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},rn="[MIN_NAME]",Mt="[MAX_NAME]",un=function(n,e){if(n===e)return 0;if(n===rn||e===Mt)return-1;if(e===rn||n===Mt)return 1;{const t=Ua(n),i=Ua(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},Jg=function(n,e){return n===e?0:n<e?-1:1},Nn=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+te(e))},Mr=function(n){if(typeof n!="object"||n===null)return te(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=te(e[i]),t+=":",t+=Mr(n[e[i]]);return t+="}",t},ql=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function Te(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const zl=function(n){R(!Gl(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,o,a,h,u;n===0?(o=0,a=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(h=Math.min(Math.floor(Math.log(n)/Math.LN2),i),o=h+i,a=Math.round(n*Math.pow(2,t-h)-Math.pow(2,t))):(o=0,a=Math.round(n/Math.pow(2,1-i-t))));const f=[];for(u=t;u;u-=1)f.push(a%2?1:0),a=Math.floor(a/2);for(u=e;u;u-=1)f.push(o%2?1:0),o=Math.floor(o/2);f.push(s?1:0),f.reverse();const T=f.join("");let E="";for(u=0;u<64;u+=8){let C=parseInt(T.substr(u,8),2).toString(16);C.length===1&&(C="0"+C),E=E+C}return E.toLowerCase()},Xg=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Qg=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"},Zg=new RegExp("^-?(0*)\\d{1,10}$"),e_=-2147483648,t_=2147483647,Ua=function(n){if(Zg.test(n)){const e=Number(n);if(e>=e_&&e<=t_)return e}return null},ti=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw _e("Exception was thrown by user callback.",t),e},Math.floor(0))}},n_=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Vn=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i_{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,ne(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(i=>this.appCheck=i)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)==null||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){_e(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class s_{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(re("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',_e(e)}}class Ai{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Ai.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xr="5",Kl="v",Yl="s",Jl="r",Xl="f",Ql=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Zl="ls",eh="p",cr="ac",th="websocket",nh="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ih{constructor(e,t,i,s,o=!1,a="",h=!1,u=!1,f=null){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=o,this.persistenceKey=a,this.includeNamespaceInQueryParams=h,this.isUsingEmulator=u,this.emulatorOptions=f,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=bt.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&bt.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function r_(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function sh(n,e,t){R(typeof e=="string","typeof type must == string"),R(typeof t=="object","typeof params must == object");let i;if(e===th)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===nh)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);r_(n)&&(t.ns=n.namespace);const s=[];return Te(t,(o,a)=>{s.push(o+"="+a)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class o_{constructor(){this.counters_={}}incrementCounter(e,t=1){nt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Hu(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hs={},$s={};function Fr(n){const e=n.toString();return Hs[e]||(Hs[e]=new o_),Hs[e]}function a_(n,e){const t=n.toString();return $s[t]||($s[t]=e()),$s[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class c_{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&ti(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Va="start",l_="close",h_="pLPCommand",u_="pRTLPCB",rh="id",oh="pw",ah="ser",d_="cb",f_="seg",p_="ts",g_="d",__="dframe",ch=1870,lh=30,m_=ch-lh,y_=25e3,v_=3e4;class Kt{constructor(e,t,i,s,o,a,h){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=o,this.transportSessionId=a,this.lastSessionId=h,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ei(e),this.stats_=Fr(t),this.urlFn=u=>(this.appCheckToken&&(u[cr]=this.appCheckToken),sh(t,nh,u))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new c_(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(v_)),Yg(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Ur((...o)=>{const[a,h,u,f,T]=o;if(this.incrementIncomingBytes_(o),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,a===Va)this.id=h,this.password=u;else if(a===l_)h?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(h,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+a)},(...o)=>{const[a,h]=o;this.incrementIncomingBytes_(o),this.myPacketOrderer.handleResponse(a,h)},()=>{this.onClosed_()},this.urlFn);const i={};i[Va]="t",i[ah]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[d_]=this.scriptTagHolder.uniqueCallbackIdentifier),i[Kl]=xr,this.transportSessionId&&(i[Yl]=this.transportSessionId),this.lastSessionId&&(i[Zl]=this.lastSessionId),this.applicationId&&(i[eh]=this.applicationId),this.appCheckToken&&(i[cr]=this.appCheckToken),typeof location<"u"&&location.hostname&&Ql.test(location.hostname)&&(i[Jl]=Xl);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Kt.forceAllow_=!0}static forceDisallow(){Kt.forceDisallow_=!0}static isAvailable(){return Kt.forceAllow_?!0:!Kt.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Xg()&&!Qg()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=te(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=Lc(t),s=ql(i,m_);for(let o=0;o<s.length;o++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[o]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[__]="t",i[rh]=e,i[oh]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=te(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Ur{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=qg(),window[h_+this.uniqueCallbackIdentifier]=e,window[u_+this.uniqueCallbackIdentifier]=t,this.myIFrame=Ur.createIFrame_();let o="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(o='<script>document.domain="'+document.domain+'";<\/script>');const a="<html><body>"+o+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(a),this.myIFrame.doc.close()}catch(h){re("frame writing exception"),h.stack&&re(h.stack),re(h)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||re("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[rh]=this.myID,e[oh]=this.myPW,e[ah]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+lh+i.length<=ch;){const a=this.pendingSegs.shift();i=i+"&"+f_+s+"="+a.seg+"&"+p_+s+"="+a.ts+"&"+g_+s+"="+a.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(y_)),o=()=>{clearTimeout(s),i()};this.addTag(e,o)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{re("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E_=16384,I_=45e3;let Vi=null;typeof MozWebSocket<"u"?Vi=MozWebSocket:typeof WebSocket<"u"&&(Vi=WebSocket);class Ae{constructor(e,t,i,s,o,a,h){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=o,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ei(this.connId),this.stats_=Fr(t),this.connURL=Ae.connectionURL_(t,a,h,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,o){const a={};return a[Kl]=xr,typeof location<"u"&&location.hostname&&Ql.test(location.hostname)&&(a[Jl]=Xl),t&&(a[Yl]=t),i&&(a[Zl]=i),s&&(a[cr]=s),o&&(a[eh]=o),sh(e,th,a)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,bt.set("previous_websocket_failure",!0);try{let i;ed(),this.mySock=new Vi(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){Ae.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&Vi!==null&&!Ae.forceDisallow_}static previouslyFailed(){return bt.isInMemoryStorage||bt.get("previous_websocket_failure")===!0}markConnectionHealthy(){bt.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=Gn(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(R(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=te(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=ql(t,E_);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(I_))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Ae.responsesRequiredToBeHealthy=2;Ae.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn{static get ALL_TRANSPORTS(){return[Kt,Ae]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=Ae&&Ae.isAvailable();let i=t&&!Ae.previouslyFailed();if(e.webSocketOnly&&(t||_e("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[Ae];else{const s=this.transports_=[];for(const o of zn.ALL_TRANSPORTS)o&&o.isAvailable()&&s.push(o);zn.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}zn.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w_=6e4,T_=5e3,S_=10*1024,C_=100*1024,Gs="t",Wa="d",A_="s",Ba="r",R_="e",ja="o",Ha="a",$a="n",Ga="p",b_="h";class k_{constructor(e,t,i,s,o,a,h,u,f,T){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=o,this.onMessage_=a,this.onReady_=h,this.onDisconnect_=u,this.onKill_=f,this.lastSessionId=T,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ei("c:"+this.id+":"),this.transportManager_=new zn(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Vn(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>C_?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>S_?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Gs in e){const t=e[Gs];t===Ha?this.upgradeIfSecondaryHealthy_():t===Ba?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===ja&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Nn("t",e),i=Nn("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Ga,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Ha,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:$a,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Nn("t",e),i=Nn("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Nn(Gs,e);if(Wa in e){const i=e[Wa];if(t===b_){const s={...i};this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===$a){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===A_?this.onConnectionShutdown_(i):t===Ba?this.onReset_(i):t===R_?ar("Server Error: "+i):t===ja?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):ar("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),xr!==i&&_e("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),Vn(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(w_))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Vn(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(T_))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Ga,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(bt.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hh{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uh{constructor(e){this.allowedEvents_=e,this.listeners_={},R(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let o=0;o<s.length;o++)if(s[o].callback===t&&(!i||i===s[o].context)){s.splice(o,1);return}}validateEventType_(e){R(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wi extends uh{static getInstance(){return new Wi}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Tr()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return R(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qa=32,za=768;class z{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function j(){return new z("")}function x(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function mt(n){return n.pieces_.length-n.pieceNum_}function q(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new z(n.pieces_,e)}function dh(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function N_(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function fh(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function ph(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new z(e,0)}function ee(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof z)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new z(t,0)}function O(n){return n.pieceNum_>=n.pieces_.length}function Ee(n,e){const t=x(n),i=x(e);if(t===null)return e;if(t===i)return Ee(q(n),q(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function gh(n,e){if(mt(n)!==mt(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function be(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(mt(n)>mt(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class P_{constructor(e,t){this.errorPrefix_=t,this.parts_=fh(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Ji(this.parts_[i]);_h(this)}}function O_(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Ji(e),_h(n)}function D_(n){const e=n.parts_.pop();n.byteLength_-=Ji(e),n.parts_.length>0&&(n.byteLength_-=1)}function _h(n){if(n.byteLength_>za)throw new Error(n.errorPrefix_+"has a key path longer than "+za+" bytes ("+n.byteLength_+").");if(n.parts_.length>qa)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+qa+") or object contains a cycle "+Ct(n))}function Ct(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr extends uh{static getInstance(){return new Vr}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}getInitialEvent(e){return R(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pn=1e3,L_=300*1e3,Ka=30*1e3,M_=1.3,x_=3e4,F_="server_kill",Ya=3;class Xe extends hh{constructor(e,t,i,s,o,a,h,u){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=o,this.authTokenProvider_=a,this.appCheckTokenProvider_=h,this.authOverride_=u,this.id=Xe.nextPersistentConnectionId_++,this.log_=ei("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Pn,this.maxReconnectDelay_=L_,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,u)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Vr.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Wi.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,o={r:s,a:e,b:t};this.log_(te(o)),R(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(o),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new wr,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:a=>{const h=a.d;a.s==="ok"?t.resolve(h):t.reject(h)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const o=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(o),t.promise}listen(e,t,i,s){this.initConnection_();const o=e._queryIdentifier,a=e._path.toString();this.log_("Listen called for "+a+" "+o),this.listens.has(a)||this.listens.set(a,new Map),R(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),R(!this.listens.get(a).has(o),"listen() called twice for same path/queryId.");const h={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(a).set(o,h),this.connected_&&this.sendListen_(h)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const o={p:i},a="q";e.tag&&(o.q=t._queryObject,o.t=e.tag),o.h=e.hashFn(),this.sendRequest(a,o,h=>{const u=h.d,f=h.s;Xe.warnOnListenWarnings_(u,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",h),f!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(f,u))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&nt(e,"w")){const i=nn(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',o=t._path.toString();_e(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${o} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||ad(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Ka)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=od(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const o=s.s,a=s.d||"error";this.authToken_===e&&(o==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(o,a))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),R(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const o={p:e},a="n";s&&(o.q=i,o.t=s),this.sendRequest(a,o)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const o={p:t,d:i};this.log_("onDisconnect "+e,o),this.sendRequest(e,o,a=>{s&&setTimeout(()=>{s(a.s,a.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,o){this.initConnection_();const a={p:t,d:i};o!==void 0&&(a.h=o),this.outstandingPuts_.push({action:e,request:a,onComplete:s}),this.outstandingPutCount_++;const h=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(h):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,o=>{this.log_(t+" response",o),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(o.s,o.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const o=i.d;this.log_("reportStats","Error sending stats: "+o)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+te(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):ar("Unrecognized action received from server: "+te(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){R(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Pn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Pn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>x_&&(this.reconnectDelay_=Pn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*M_)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Xe.nextConnectionId_++,o=this.lastSessionId;let a=!1,h=null;const u=function(){h?h.close():(a=!0,i())},f=function(E){R(h,"sendRequest call when we're not connected not allowed."),h.sendRequest(E)};this.realtime_={close:u,sendRequest:f};const T=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[E,C]=await Promise.all([this.authTokenProvider_.getToken(T),this.appCheckTokenProvider_.getToken(T)]);a?re("getToken() completed but was canceled"):(re("getToken() completed. Creating connection."),this.authToken_=E&&E.accessToken,this.appCheckToken_=C&&C.token,h=new k_(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,k=>{_e(k+" ("+this.repoInfo_.toString()+")"),this.interrupt(F_)},o))}catch(E){this.log_("Failed to get token: "+E),a||(this.repoInfo_.nodeAdmin&&_e(E),u())}}}interrupt(e){re("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){re("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Qs(this.interruptReasons_)&&(this.reconnectDelay_=Pn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(o=>Mr(o)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new z(e).toString();let s;if(this.listens.has(i)){const o=this.listens.get(i);s=o.get(t),o.delete(t),o.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){re("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Ya&&(this.reconnectDelay_=Ka,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){re("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Ya&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+jl.replace(/\./g,"-")]=1,Tr()?e["framework.cordova"]=1:Vc()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Wi.getInstance().currentlyOnline();return Qs(this.interruptReasons_)&&e}}Xe.nextPersistentConnectionId_=0;Xe.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new F(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new F(rn,e),s=new F(rn,t);return this.compare(i,s)!==0}minPost(){return F.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yi;class mh extends ss{static get __EMPTY_NODE(){return yi}static set __EMPTY_NODE(e){yi=e}compare(e,t){return un(e.name,t.name)}isDefinedOn(e){throw an("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return F.MIN}maxPost(){return new F(Mt,yi)}makePost(e,t){return R(typeof e=="string","KeyIndex indexValue must always be a string."),new F(e,yi)}toString(){return".key"}}const en=new mh;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(e,t,i,s,o=null){this.isReverse_=s,this.resultGenerator_=o,this.nodeStack_=[];let a=1;for(;!e.isEmpty();)if(e=e,a=t?i(e.key,t):1,s&&(a*=-1),a<0)this.isReverse_?e=e.left:e=e.right;else if(a===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Z{constructor(e,t,i,s,o){this.key=e,this.value=t,this.color=i??Z.RED,this.left=s??fe.EMPTY_NODE,this.right=o??fe.EMPTY_NODE}copy(e,t,i,s,o){return new Z(e??this.key,t??this.value,i??this.color,s??this.left,o??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const o=i(e,s.key);return o<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):o===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return fe.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return fe.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Z.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Z.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Z.RED=!0;Z.BLACK=!1;class U_{copy(e,t,i,s,o){return this}insert(e,t,i){return new Z(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class fe{constructor(e,t=fe.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new fe(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,Z.BLACK,null,null))}remove(e){return new fe(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Z.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new vi(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new vi(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new vi(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new vi(this.root_,null,this.comparator_,!0,e)}}fe.EMPTY_NODE=new U_;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V_(n,e){return un(n.name,e.name)}function Wr(n,e){return un(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let lr;function W_(n){lr=n}const yh=function(n){return typeof n=="number"?"number:"+zl(n):"string:"+n},vh=function(n){if(n.isLeafNode()){const e=n.val();R(typeof e=="string"||typeof e=="number"||typeof e=="object"&&nt(e,".sv"),"Priority must be a string or number.")}else R(n===lr||n.isEmpty(),"priority of unexpected type.");R(n===lr||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ja;class Q{static set __childrenNodeConstructor(e){Ja=e}static get __childrenNodeConstructor(){return Ja}constructor(e,t=Q.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,R(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),vh(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Q(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Q.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return O(e)?this:x(e)===".priority"?this.priorityNode_:Q.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:Q.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=x(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(R(i!==".priority"||mt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,Q.__childrenNodeConstructor.EMPTY_NODE.updateChild(q(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+yh(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=zl(this.value_):e+=this.value_,this.lazyHash_=$l(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Q.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Q.__childrenNodeConstructor?-1:(R(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=Q.VALUE_TYPE_ORDER.indexOf(t),o=Q.VALUE_TYPE_ORDER.indexOf(i);return R(s>=0,"Unknown leaf type: "+t),R(o>=0,"Unknown leaf type: "+i),s===o?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:o-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}Q.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Eh,Ih;function B_(n){Eh=n}function j_(n){Ih=n}class H_ extends ss{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),o=i.compareTo(s);return o===0?un(e.name,t.name):o}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return F.MIN}maxPost(){return new F(Mt,new Q("[PRIORITY-POST]",Ih))}makePost(e,t){const i=Eh(e);return new F(t,new Q("[PRIORITY-POST]",i))}toString(){return".priority"}}const ae=new H_;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $_=Math.log(2);class G_{constructor(e){const t=o=>parseInt(Math.log(o)/$_,10),i=o=>parseInt(Array(o+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Bi=function(n,e,t,i){n.sort(e);const s=function(u,f){const T=f-u;let E,C;if(T===0)return null;if(T===1)return E=n[u],C=t?t(E):E,new Z(C,E.node,Z.BLACK,null,null);{const k=parseInt(T/2,10)+u,b=s(u,k),D=s(k+1,f);return E=n[k],C=t?t(E):E,new Z(C,E.node,Z.BLACK,b,D)}},o=function(u){let f=null,T=null,E=n.length;const C=function(b,D){const L=E-b,ue=E;E-=b;const pe=s(L+1,ue),me=n[L],it=t?t(me):me;k(new Z(it,me.node,D,null,pe))},k=function(b){f?(f.left=b,f=b):(T=b,f=b)};for(let b=0;b<u.count;++b){const D=u.nextBitIsOne(),L=Math.pow(2,u.count-(b+1));D?C(L,Z.BLACK):(C(L,Z.BLACK),C(L,Z.RED))}return T},a=new G_(n.length),h=o(a);return new fe(i||e,h)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qs;const zt={};class Je{static get Default(){return R(zt&&ae,"ChildrenNode.ts has not been loaded"),qs=qs||new Je({".priority":zt},{".priority":ae}),qs}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=nn(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof fe?t:null}hasIndex(e){return nt(this.indexSet_,e.toString())}addIndex(e,t){R(e!==en,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const o=t.getIterator(F.Wrap);let a=o.getNext();for(;a;)s=s||e.isDefinedOn(a.node),i.push(a),a=o.getNext();let h;s?h=Bi(i,e.getCompare()):h=zt;const u=e.toString(),f={...this.indexSet_};f[u]=e;const T={...this.indexes_};return T[u]=h,new Je(T,f)}addToIndexes(e,t){const i=Ni(this.indexes_,(s,o)=>{const a=nn(this.indexSet_,o);if(R(a,"Missing index implementation for "+o),s===zt)if(a.isDefinedOn(e.node)){const h=[],u=t.getIterator(F.Wrap);let f=u.getNext();for(;f;)f.name!==e.name&&h.push(f),f=u.getNext();return h.push(e),Bi(h,a.getCompare())}else return zt;else{const h=t.get(e.name);let u=s;return h&&(u=u.remove(new F(e.name,h))),u.insert(e,e.node)}});return new Je(i,this.indexSet_)}removeFromIndexes(e,t){const i=Ni(this.indexes_,s=>{if(s===zt)return s;{const o=t.get(e.name);return o?s.remove(new F(e.name,o)):s}});return new Je(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let On;class B{static get EMPTY_NODE(){return On||(On=new B(new fe(Wr),null,Je.Default))}constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&vh(this.priorityNode_),this.children_.isEmpty()&&R(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||On}updatePriority(e){return this.children_.isEmpty()?this:new B(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?On:t}}getChild(e){const t=x(e);return t===null?this:this.getImmediateChild(t).getChild(q(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(R(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new F(e,t);let s,o;t.isEmpty()?(s=this.children_.remove(e),o=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),o=this.indexMap_.addToIndexes(i,this.children_));const a=s.isEmpty()?On:this.priorityNode_;return new B(s,a,o)}}updateChild(e,t){const i=x(e);if(i===null)return t;{R(x(e)!==".priority"||mt(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(q(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,o=!0;if(this.forEachChild(ae,(a,h)=>{t[a]=h.val(e),i++,o&&B.INTEGER_REGEXP_.test(a)?s=Math.max(s,Number(a)):o=!1}),!e&&o&&s<2*i){const a=[];for(const h in t)a[h]=t[h];return a}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+yh(this.getPriority().val())+":"),this.forEachChild(ae,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":$l(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const o=s.getPredecessorKey(new F(e,t));return o?o.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new F(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new F(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,F.Wrap);let o=s.peek();for(;o!=null&&t.compare(o,e)<0;)s.getNext(),o=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,F.Wrap);let o=s.peek();for(;o!=null&&t.compare(o,e)>0;)s.getNext(),o=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===ni?-1:0}withIndex(e){if(e===en||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new B(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===en||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(ae),s=t.getIterator(ae);let o=i.getNext(),a=s.getNext();for(;o&&a;){if(o.name!==a.name||!o.node.equals(a.node))return!1;o=i.getNext(),a=s.getNext()}return o===null&&a===null}else return!1;else return!1}}resolveIndex_(e){return e===en?null:this.indexMap_.get(e.toString())}}B.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class q_ extends B{constructor(){super(new fe(Wr),B.EMPTY_NODE,Je.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return B.EMPTY_NODE}isEmpty(){return!1}}const ni=new q_;Object.defineProperties(F,{MIN:{value:new F(rn,B.EMPTY_NODE)},MAX:{value:new F(Mt,ni)}});mh.__EMPTY_NODE=B.EMPTY_NODE;Q.__childrenNodeConstructor=B;W_(ni);j_(ni);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const z_=!0;function oe(n,e=null){if(n===null)return B.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),R(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new Q(t,oe(e))}if(!(n instanceof Array)&&z_){const t=[];let i=!1;if(Te(n,(a,h)=>{if(a.substring(0,1)!=="."){const u=oe(h);u.isEmpty()||(i=i||!u.getPriority().isEmpty(),t.push(new F(a,u)))}}),t.length===0)return B.EMPTY_NODE;const o=Bi(t,V_,a=>a.name,Wr);if(i){const a=Bi(t,ae.getCompare());return new B(o,oe(e),new Je({".priority":a},{".priority":ae}))}else return new B(o,oe(e),Je.Default)}else{let t=B.EMPTY_NODE;return Te(n,(i,s)=>{if(nt(n,i)&&i.substring(0,1)!=="."){const o=oe(s);(o.isLeafNode()||!o.isEmpty())&&(t=t.updateImmediateChild(i,o))}}),t.updatePriority(oe(e))}}B_(oe);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K_ extends ss{constructor(e){super(),this.indexPath_=e,R(!O(e)&&x(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),o=i.compareTo(s);return o===0?un(e.name,t.name):o}makePost(e,t){const i=oe(e),s=B.EMPTY_NODE.updateChild(this.indexPath_,i);return new F(t,s)}maxPost(){const e=B.EMPTY_NODE.updateChild(this.indexPath_,ni);return new F(Mt,e)}toString(){return fh(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y_ extends ss{compare(e,t){const i=e.node.compareTo(t.node);return i===0?un(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return F.MIN}maxPost(){return F.MAX}makePost(e,t){const i=oe(e);return new F(t,i)}toString(){return".value"}}const J_=new Y_;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X_(n){return{type:"value",snapshotNode:n}}function Q_(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function Z_(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Xa(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function em(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=ae}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return R(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return R(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:rn}hasEnd(){return this.endSet_}getIndexEndValue(){return R(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return R(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Mt}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return R(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===ae}copy(){const e=new Br;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Qa(n){const e={};if(n.isDefault())return e;let t;if(n.index_===ae?t="$priority":n.index_===J_?t="$value":n.index_===en?t="$key":(R(n.index_ instanceof K_,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=te(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=te(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+te(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=te(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+te(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Za(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==ae&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji extends hh{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(R(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=ei("p:rest:"),this.listens_={}}listen(e,t,i,s){const o=e._path.toString();this.log_("Listen called for "+o+" "+e._queryIdentifier);const a=ji.getListenId_(e,i),h={};this.listens_[a]=h;const u=Qa(e._queryParams);this.restRequest_(o+".json",u,(f,T)=>{let E=T;if(f===404&&(E=null,f=null),f===null&&this.onDataUpdate_(o,E,!1,i),nn(this.listens_,a)===h){let C;f?f===401?C="permission_denied":C="rest_error:"+f:C="ok",s(C,null)}})}unlisten(e,t){const i=ji.getListenId_(e,t);delete this.listens_[i]}get(e){const t=Qa(e._queryParams),i=e._path.toString(),s=new wr;return this.restRequest_(i+".json",t,(o,a)=>{let h=a;o===404&&(h=null,o=null),o===null?(this.onDataUpdate_(i,h,!1,null),s.resolve(h)):s.reject(new Error(h))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,o])=>{s&&s.accessToken&&(t.auth=s.accessToken),o&&o.token&&(t.ac=o.token);const a=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+cn(t);this.log_("Sending REST request for "+a);const h=new XMLHttpRequest;h.onreadystatechange=()=>{if(i&&h.readyState===4){this.log_("REST Response for "+a+" received. status:",h.status,"response:",h.responseText);let u=null;if(h.status>=200&&h.status<300){try{u=Gn(h.responseText)}catch{_e("Failed to parse JSON response for "+a+": "+h.responseText)}i(null,u)}else h.status!==401&&h.status!==404&&_e("Got unsuccessful REST response for "+a+" Status: "+h.status),i(h.status);i=null}},h.open("GET",a,!0),h.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tm{constructor(){this.rootNode_=B.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hi(){return{value:null,children:new Map}}function wh(n,e,t){if(O(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=x(e);n.children.has(i)||n.children.set(i,Hi());const s=n.children.get(i);e=q(e),wh(s,e,t)}}function hr(n,e,t){n.value!==null?t(e,n.value):nm(n,(i,s)=>{const o=new z(e.toString()+"/"+i);hr(s,o,t)})}function nm(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class im{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t={...e};return this.last_&&Te(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ec=10*1e3,sm=30*1e3,rm=300*1e3;class om{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new im(e);const i=ec+(sm-ec)*Math.random();Vn(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;Te(e,(s,o)=>{o>0&&nt(this.statsToReport_,s)&&(t[s]=o,i=!0)}),i&&this.server_.reportStats(t),Vn(this.reportStats_.bind(this),Math.floor(Math.random()*2*rm))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Fe;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Fe||(Fe={}));function Th(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Sh(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Ch(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=Fe.ACK_USER_WRITE,this.source=Th()}operationForChild(e){if(O(this.path)){if(this.affectedTree.value!=null)return R(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new z(e));return new $i(j(),t,this.revert)}}else return R(x(this.path)===e,"operationForChild called for unrelated child."),new $i(q(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=Fe.OVERWRITE}operationForChild(e){return O(this.path)?new xt(this.source,j(),this.snap.getImmediateChild(e)):new xt(this.source,q(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=Fe.MERGE}operationForChild(e){if(O(this.path)){const t=this.children.subtree(new z(e));return t.isEmpty()?null:t.value?new xt(this.source,j(),t.value):new Kn(this.source,j(),t)}else return R(x(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Kn(this.source,q(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jr{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(O(e))return this.isFullyInitialized()&&!this.filtered_;const t=x(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}function am(n,e,t,i){const s=[],o=[];return e.forEach(a=>{a.type==="child_changed"&&n.index_.indexedValueChanged(a.oldSnap,a.snapshotNode)&&o.push(em(a.childName,a.snapshotNode))}),Dn(n,s,"child_removed",e,i,t),Dn(n,s,"child_added",e,i,t),Dn(n,s,"child_moved",o,i,t),Dn(n,s,"child_changed",e,i,t),Dn(n,s,"value",e,i,t),s}function Dn(n,e,t,i,s,o){const a=i.filter(h=>h.type===t);a.sort((h,u)=>lm(n,h,u)),a.forEach(h=>{const u=cm(n,h,o);s.forEach(f=>{f.respondsTo(h.type)&&e.push(f.createEvent(u,n.query_))})})}function cm(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function lm(n,e,t){if(e.childName==null||t.childName==null)throw an("Should only compare child_ events.");const i=new F(e.childName,e.snapshotNode),s=new F(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ah(n,e){return{eventCache:n,serverCache:e}}function Wn(n,e,t,i){return Ah(new jr(e,t,i),n.serverCache)}function Rh(n,e,t,i){return Ah(n.eventCache,new jr(e,t,i))}function ur(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Ft(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let zs;const hm=()=>(zs||(zs=new fe(Jg)),zs);class G{static fromObject(e){let t=new G(null);return Te(e,(i,s)=>{t=t.set(new z(i),s)}),t}constructor(e,t=hm()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:j(),value:this.value};if(O(e))return null;{const i=x(e),s=this.children.get(i);if(s!==null){const o=s.findRootMostMatchingPathAndValue(q(e),t);return o!=null?{path:ee(new z(i),o.path),value:o.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(O(e))return this;{const t=x(e),i=this.children.get(t);return i!==null?i.subtree(q(e)):new G(null)}}set(e,t){if(O(e))return new G(t,this.children);{const i=x(e),o=(this.children.get(i)||new G(null)).set(q(e),t),a=this.children.insert(i,o);return new G(this.value,a)}}remove(e){if(O(e))return this.children.isEmpty()?new G(null):new G(null,this.children);{const t=x(e),i=this.children.get(t);if(i){const s=i.remove(q(e));let o;return s.isEmpty()?o=this.children.remove(t):o=this.children.insert(t,s),this.value===null&&o.isEmpty()?new G(null):new G(this.value,o)}else return this}}get(e){if(O(e))return this.value;{const t=x(e),i=this.children.get(t);return i?i.get(q(e)):null}}setTree(e,t){if(O(e))return t;{const i=x(e),o=(this.children.get(i)||new G(null)).setTree(q(e),t);let a;return o.isEmpty()?a=this.children.remove(i):a=this.children.insert(i,o),new G(this.value,a)}}fold(e){return this.fold_(j(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,o)=>{i[s]=o.fold_(ee(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,j(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(O(e))return null;{const o=x(e),a=this.children.get(o);return a?a.findOnPath_(q(e),ee(t,o),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,j(),t)}foreachOnPath_(e,t,i){if(O(e))return this;{this.value&&i(t,this.value);const s=x(e),o=this.children.get(s);return o?o.foreachOnPath_(q(e),ee(t,s),i):new G(null)}}foreach(e){this.foreach_(j(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(ee(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(e){this.writeTree_=e}static empty(){return new Pe(new G(null))}}function Bn(n,e,t){if(O(e))return new Pe(new G(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let o=i.value;const a=Ee(s,e);return o=o.updateChild(a,t),new Pe(n.writeTree_.set(s,o))}else{const s=new G(t),o=n.writeTree_.setTree(e,s);return new Pe(o)}}}function tc(n,e,t){let i=n;return Te(t,(s,o)=>{i=Bn(i,ee(e,s),o)}),i}function nc(n,e){if(O(e))return Pe.empty();{const t=n.writeTree_.setTree(e,new G(null));return new Pe(t)}}function dr(n,e){return Bt(n,e)!=null}function Bt(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(Ee(t.path,e)):null}function ic(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(ae,(i,s)=>{e.push(new F(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new F(i,s.value))}),e}function pt(n,e){if(O(e))return n;{const t=Bt(n,e);return t!=null?new Pe(new G(t)):new Pe(n.writeTree_.subtree(e))}}function fr(n){return n.writeTree_.isEmpty()}function on(n,e){return bh(j(),n.writeTree_,e)}function bh(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,o)=>{s===".priority"?(R(o.value!==null,"Priority writes must always be leaf nodes"),i=o.value):t=bh(ee(n,s),o,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(ee(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kh(n,e){return Lh(e,n)}function um(n,e,t,i,s){R(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=Bn(n.visibleWrites,e,t)),n.lastWriteId=i}function dm(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function fm(n,e){const t=n.allWrites.findIndex(h=>h.writeId===e);R(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,o=!1,a=n.allWrites.length-1;for(;s&&a>=0;){const h=n.allWrites[a];h.visible&&(a>=t&&pm(h,i.path)?s=!1:be(i.path,h.path)&&(o=!0)),a--}if(s){if(o)return gm(n),!0;if(i.snap)n.visibleWrites=nc(n.visibleWrites,i.path);else{const h=i.children;Te(h,u=>{n.visibleWrites=nc(n.visibleWrites,ee(i.path,u))})}return!0}else return!1}function pm(n,e){if(n.snap)return be(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&be(ee(n.path,t),e))return!0;return!1}function gm(n){n.visibleWrites=Nh(n.allWrites,_m,j()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function _m(n){return n.visible}function Nh(n,e,t){let i=Pe.empty();for(let s=0;s<n.length;++s){const o=n[s];if(e(o)){const a=o.path;let h;if(o.snap)be(t,a)?(h=Ee(t,a),i=Bn(i,h,o.snap)):be(a,t)&&(h=Ee(a,t),i=Bn(i,j(),o.snap.getChild(h)));else if(o.children){if(be(t,a))h=Ee(t,a),i=tc(i,h,o.children);else if(be(a,t))if(h=Ee(a,t),O(h))i=tc(i,j(),o.children);else{const u=nn(o.children,x(h));if(u){const f=u.getChild(q(h));i=Bn(i,j(),f)}}}else throw an("WriteRecord should have .snap or .children")}}return i}function Ph(n,e,t,i,s){if(!i&&!s){const o=Bt(n.visibleWrites,e);if(o!=null)return o;{const a=pt(n.visibleWrites,e);if(fr(a))return t;if(t==null&&!dr(a,j()))return null;{const h=t||B.EMPTY_NODE;return on(a,h)}}}else{const o=pt(n.visibleWrites,e);if(!s&&fr(o))return t;if(!s&&t==null&&!dr(o,j()))return null;{const a=function(f){return(f.visible||s)&&(!i||!~i.indexOf(f.writeId))&&(be(f.path,e)||be(e,f.path))},h=Nh(n.allWrites,a,e),u=t||B.EMPTY_NODE;return on(h,u)}}}function mm(n,e,t){let i=B.EMPTY_NODE;const s=Bt(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(ae,(o,a)=>{i=i.updateImmediateChild(o,a)}),i;if(t){const o=pt(n.visibleWrites,e);return t.forEachChild(ae,(a,h)=>{const u=on(pt(o,new z(a)),h);i=i.updateImmediateChild(a,u)}),ic(o).forEach(a=>{i=i.updateImmediateChild(a.name,a.node)}),i}else{const o=pt(n.visibleWrites,e);return ic(o).forEach(a=>{i=i.updateImmediateChild(a.name,a.node)}),i}}function ym(n,e,t,i,s){R(i||s,"Either existingEventSnap or existingServerSnap must exist");const o=ee(e,t);if(dr(n.visibleWrites,o))return null;{const a=pt(n.visibleWrites,o);return fr(a)?s.getChild(t):on(a,s.getChild(t))}}function vm(n,e,t,i){const s=ee(e,t),o=Bt(n.visibleWrites,s);if(o!=null)return o;if(i.isCompleteForChild(t)){const a=pt(n.visibleWrites,s);return on(a,i.getNode().getImmediateChild(t))}else return null}function Em(n,e){return Bt(n.visibleWrites,e)}function Im(n,e,t,i,s,o,a){let h;const u=pt(n.visibleWrites,e),f=Bt(u,j());if(f!=null)h=f;else if(t!=null)h=on(u,t);else return[];if(h=h.withIndex(a),!h.isEmpty()&&!h.isLeafNode()){const T=[],E=a.getCompare(),C=o?h.getReverseIteratorFrom(i,a):h.getIteratorFrom(i,a);let k=C.getNext();for(;k&&T.length<s;)E(k,i)!==0&&T.push(k),k=C.getNext();return T}else return[]}function wm(){return{visibleWrites:Pe.empty(),allWrites:[],lastWriteId:-1}}function pr(n,e,t,i){return Ph(n.writeTree,n.treePath,e,t,i)}function Oh(n,e){return mm(n.writeTree,n.treePath,e)}function sc(n,e,t,i){return ym(n.writeTree,n.treePath,e,t,i)}function Gi(n,e){return Em(n.writeTree,ee(n.treePath,e))}function Tm(n,e,t,i,s,o){return Im(n.writeTree,n.treePath,e,t,i,s,o)}function Hr(n,e,t){return vm(n.writeTree,n.treePath,e,t)}function Dh(n,e){return Lh(ee(n.treePath,e),n.writeTree)}function Lh(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sm{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;R(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),R(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const o=s.type;if(t==="child_added"&&o==="child_removed")this.changeMap.set(i,Xa(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&o==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&o==="child_changed")this.changeMap.set(i,Z_(i,s.oldSnap));else if(t==="child_changed"&&o==="child_added")this.changeMap.set(i,Q_(i,e.snapshotNode));else if(t==="child_changed"&&o==="child_changed")this.changeMap.set(i,Xa(i,e.snapshotNode,s.oldSnap));else throw an("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cm{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const Mh=new Cm;class $r{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new jr(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Hr(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Ft(this.viewCache_),o=Tm(this.writes_,s,t,1,i,e);return o.length===0?null:o[0]}}function Am(n,e){R(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),R(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function Rm(n,e,t,i,s){const o=new Sm;let a,h;if(t.type===Fe.OVERWRITE){const f=t;f.source.fromUser?a=gr(n,e,f.path,f.snap,i,s,o):(R(f.source.fromServer,"Unknown source."),h=f.source.tagged||e.serverCache.isFiltered()&&!O(f.path),a=qi(n,e,f.path,f.snap,i,s,h,o))}else if(t.type===Fe.MERGE){const f=t;f.source.fromUser?a=km(n,e,f.path,f.children,i,s,o):(R(f.source.fromServer,"Unknown source."),h=f.source.tagged||e.serverCache.isFiltered(),a=_r(n,e,f.path,f.children,i,s,h,o))}else if(t.type===Fe.ACK_USER_WRITE){const f=t;f.revert?a=Om(n,e,f.path,i,s,o):a=Nm(n,e,f.path,f.affectedTree,i,s,o)}else if(t.type===Fe.LISTEN_COMPLETE)a=Pm(n,e,t.path,i,o);else throw an("Unknown operation type: "+t.type);const u=o.getChanges();return bm(e,a,u),{viewCache:a,changes:u}}function bm(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),o=ur(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(o)||!i.getNode().getPriority().equals(o.getPriority()))&&t.push(X_(ur(e)))}}function xh(n,e,t,i,s,o){const a=e.eventCache;if(Gi(i,t)!=null)return e;{let h,u;if(O(t))if(R(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const f=Ft(e),T=f instanceof B?f:B.EMPTY_NODE,E=Oh(i,T);h=n.filter.updateFullNode(e.eventCache.getNode(),E,o)}else{const f=pr(i,Ft(e));h=n.filter.updateFullNode(e.eventCache.getNode(),f,o)}else{const f=x(t);if(f===".priority"){R(mt(t)===1,"Can't have a priority with additional path components");const T=a.getNode();u=e.serverCache.getNode();const E=sc(i,t,T,u);E!=null?h=n.filter.updatePriority(T,E):h=a.getNode()}else{const T=q(t);let E;if(a.isCompleteForChild(f)){u=e.serverCache.getNode();const C=sc(i,t,a.getNode(),u);C!=null?E=a.getNode().getImmediateChild(f).updateChild(T,C):E=a.getNode().getImmediateChild(f)}else E=Hr(i,f,e.serverCache);E!=null?h=n.filter.updateChild(a.getNode(),f,E,T,s,o):h=a.getNode()}}return Wn(e,h,a.isFullyInitialized()||O(t),n.filter.filtersNodes())}}function qi(n,e,t,i,s,o,a,h){const u=e.serverCache;let f;const T=a?n.filter:n.filter.getIndexedFilter();if(O(t))f=T.updateFullNode(u.getNode(),i,null);else if(T.filtersNodes()&&!u.isFiltered()){const k=u.getNode().updateChild(t,i);f=T.updateFullNode(u.getNode(),k,null)}else{const k=x(t);if(!u.isCompleteForPath(t)&&mt(t)>1)return e;const b=q(t),L=u.getNode().getImmediateChild(k).updateChild(b,i);k===".priority"?f=T.updatePriority(u.getNode(),L):f=T.updateChild(u.getNode(),k,L,b,Mh,null)}const E=Rh(e,f,u.isFullyInitialized()||O(t),T.filtersNodes()),C=new $r(s,E,o);return xh(n,E,t,s,C,h)}function gr(n,e,t,i,s,o,a){const h=e.eventCache;let u,f;const T=new $r(s,e,o);if(O(t))f=n.filter.updateFullNode(e.eventCache.getNode(),i,a),u=Wn(e,f,!0,n.filter.filtersNodes());else{const E=x(t);if(E===".priority")f=n.filter.updatePriority(e.eventCache.getNode(),i),u=Wn(e,f,h.isFullyInitialized(),h.isFiltered());else{const C=q(t),k=h.getNode().getImmediateChild(E);let b;if(O(C))b=i;else{const D=T.getCompleteChild(E);D!=null?dh(C)===".priority"&&D.getChild(ph(C)).isEmpty()?b=D:b=D.updateChild(C,i):b=B.EMPTY_NODE}if(k.equals(b))u=e;else{const D=n.filter.updateChild(h.getNode(),E,b,C,T,a);u=Wn(e,D,h.isFullyInitialized(),n.filter.filtersNodes())}}}return u}function rc(n,e){return n.eventCache.isCompleteForChild(e)}function km(n,e,t,i,s,o,a){let h=e;return i.foreach((u,f)=>{const T=ee(t,u);rc(e,x(T))&&(h=gr(n,h,T,f,s,o,a))}),i.foreach((u,f)=>{const T=ee(t,u);rc(e,x(T))||(h=gr(n,h,T,f,s,o,a))}),h}function oc(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function _r(n,e,t,i,s,o,a,h){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let u=e,f;O(t)?f=i:f=new G(null).setTree(t,i);const T=e.serverCache.getNode();return f.children.inorderTraversal((E,C)=>{if(T.hasChild(E)){const k=e.serverCache.getNode().getImmediateChild(E),b=oc(n,k,C);u=qi(n,u,new z(E),b,s,o,a,h)}}),f.children.inorderTraversal((E,C)=>{const k=!e.serverCache.isCompleteForChild(E)&&C.value===null;if(!T.hasChild(E)&&!k){const b=e.serverCache.getNode().getImmediateChild(E),D=oc(n,b,C);u=qi(n,u,new z(E),D,s,o,a,h)}}),u}function Nm(n,e,t,i,s,o,a){if(Gi(s,t)!=null)return e;const h=e.serverCache.isFiltered(),u=e.serverCache;if(i.value!=null){if(O(t)&&u.isFullyInitialized()||u.isCompleteForPath(t))return qi(n,e,t,u.getNode().getChild(t),s,o,h,a);if(O(t)){let f=new G(null);return u.getNode().forEachChild(en,(T,E)=>{f=f.set(new z(T),E)}),_r(n,e,t,f,s,o,h,a)}else return e}else{let f=new G(null);return i.foreach((T,E)=>{const C=ee(t,T);u.isCompleteForPath(C)&&(f=f.set(T,u.getNode().getChild(C)))}),_r(n,e,t,f,s,o,h,a)}}function Pm(n,e,t,i,s){const o=e.serverCache,a=Rh(e,o.getNode(),o.isFullyInitialized()||O(t),o.isFiltered());return xh(n,a,t,i,Mh,s)}function Om(n,e,t,i,s,o){let a;if(Gi(i,t)!=null)return e;{const h=new $r(i,e,s),u=e.eventCache.getNode();let f;if(O(t)||x(t)===".priority"){let T;if(e.serverCache.isFullyInitialized())T=pr(i,Ft(e));else{const E=e.serverCache.getNode();R(E instanceof B,"serverChildren would be complete if leaf node"),T=Oh(i,E)}T=T,f=n.filter.updateFullNode(u,T,o)}else{const T=x(t);let E=Hr(i,T,e.serverCache);E==null&&e.serverCache.isCompleteForChild(T)&&(E=u.getImmediateChild(T)),E!=null?f=n.filter.updateChild(u,T,E,q(t),h,o):e.eventCache.getNode().hasChild(T)?f=n.filter.updateChild(u,T,B.EMPTY_NODE,q(t),h,o):f=u,f.isEmpty()&&e.serverCache.isFullyInitialized()&&(a=pr(i,Ft(e)),a.isLeafNode()&&(f=n.filter.updateFullNode(f,a,o)))}return a=e.serverCache.isFullyInitialized()||Gi(i,j())!=null,Wn(e,f,a,n.filter.filtersNodes())}}function Dm(n,e){const t=Ft(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!O(e)&&!t.getImmediateChild(x(e)).isEmpty())?t.getChild(e):null}function ac(n,e,t,i){e.type===Fe.MERGE&&e.source.queryId!==null&&(R(Ft(n.viewCache_),"We should always have a full cache before handling merges"),R(ur(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,o=Rm(n.processor_,s,e,t,i);return Am(n.processor_,o.viewCache),R(o.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=o.viewCache,Lm(n,o.changes,o.viewCache.eventCache.getNode())}function Lm(n,e,t,i){const s=n.eventRegistrations_;return am(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cc;function Mm(n){R(!cc,"__referenceConstructor has already been defined"),cc=n}function Gr(n,e,t,i){const s=e.source.queryId;if(s!==null){const o=n.views.get(s);return R(o!=null,"SyncTree gave us an op for an invalid query."),ac(o,e,t,i)}else{let o=[];for(const a of n.views.values())o=o.concat(ac(a,e,t,i));return o}}function qr(n,e){let t=null;for(const i of n.views.values())t=t||Dm(i,e);return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let lc;function xm(n){R(!lc,"__referenceConstructor has already been defined"),lc=n}class hc{constructor(e){this.listenProvider_=e,this.syncPointTree_=new G(null),this.pendingWriteTree_=wm(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Fm(n,e,t,i,s){return um(n.pendingWriteTree_,e,t,i,s),s?os(n,new xt(Th(),e,t)):[]}function Yt(n,e,t=!1){const i=dm(n.pendingWriteTree_,e);if(fm(n.pendingWriteTree_,e)){let o=new G(null);return i.snap!=null?o=o.set(j(),!0):Te(i.children,a=>{o=o.set(new z(a),!0)}),os(n,new $i(i.path,o,t))}else return[]}function rs(n,e,t){return os(n,new xt(Sh(),e,t))}function Um(n,e,t){const i=G.fromObject(t);return os(n,new Kn(Sh(),e,i))}function Vm(n,e,t,i){const s=Wh(n,i);if(s!=null){const o=Bh(s),a=o.path,h=o.queryId,u=Ee(a,e),f=new xt(Ch(h),u,t);return jh(n,a,f)}else return[]}function Wm(n,e,t,i){const s=Wh(n,i);if(s){const o=Bh(s),a=o.path,h=o.queryId,u=Ee(a,e),f=G.fromObject(t),T=new Kn(Ch(h),u,f);return jh(n,a,T)}else return[]}function Fh(n,e,t){const s=n.pendingWriteTree_,o=n.syncPointTree_.findOnPath(e,(a,h)=>{const u=Ee(a,e),f=qr(h,u);if(f)return f});return Ph(s,e,o,t,!0)}function os(n,e){return Uh(e,n.syncPointTree_,null,kh(n.pendingWriteTree_,j()))}function Uh(n,e,t,i){if(O(n.path))return Vh(n,e,t,i);{const s=e.get(j());t==null&&s!=null&&(t=qr(s,j()));let o=[];const a=x(n.path),h=n.operationForChild(a),u=e.children.get(a);if(u&&h){const f=t?t.getImmediateChild(a):null,T=Dh(i,a);o=o.concat(Uh(h,u,f,T))}return s&&(o=o.concat(Gr(s,n,i,t))),o}}function Vh(n,e,t,i){const s=e.get(j());t==null&&s!=null&&(t=qr(s,j()));let o=[];return e.children.inorderTraversal((a,h)=>{const u=t?t.getImmediateChild(a):null,f=Dh(i,a),T=n.operationForChild(a);T&&(o=o.concat(Vh(T,h,u,f)))}),s&&(o=o.concat(Gr(s,n,i,t))),o}function Wh(n,e){return n.tagToQueryMap.get(e)}function Bh(n){const e=n.indexOf("$");return R(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new z(n.substr(0,e))}}function jh(n,e,t){const i=n.syncPointTree_.get(e);R(i,"Missing sync point for query tag that we're tracking");const s=kh(n.pendingWriteTree_,e);return Gr(i,t,s,null)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zr{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new zr(t)}node(){return this.node_}}class Kr{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=ee(this.path_,e);return new Kr(this.syncTree_,t)}node(){return Fh(this.syncTree_,this.path_)}}const Bm=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},uc=function(n,e,t){if(!n||typeof n!="object")return n;if(R(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return jm(n[".sv"],e,t);if(typeof n[".sv"]=="object")return Hm(n[".sv"],e);R(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},jm=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:R(!1,"Unexpected server value: "+n)}},Hm=function(n,e,t){n.hasOwnProperty("increment")||R(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&R(!1,"Unexpected increment value: "+i);const s=e.node();if(R(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const a=s.getValue();return typeof a!="number"?i:a+i},$m=function(n,e,t,i){return Yr(e,new Kr(t,n),i)},Gm=function(n,e,t){return Yr(n,new zr(e),t)};function Yr(n,e,t){const i=n.getPriority().val(),s=uc(i,e.getImmediateChild(".priority"),t);let o;if(n.isLeafNode()){const a=n,h=uc(a.getValue(),e,t);return h!==a.getValue()||s!==a.getPriority().val()?new Q(h,oe(s)):n}else{const a=n;return o=a,s!==a.getPriority().val()&&(o=o.updatePriority(new Q(s))),a.forEachChild(ae,(h,u)=>{const f=Yr(u,e.getImmediateChild(h),t);f!==u&&(o=o.updateImmediateChild(h,f))}),o}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jr{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function Xr(n,e){let t=e instanceof z?e:new z(e),i=n,s=x(t);for(;s!==null;){const o=nn(i.node.children,s)||{children:{},childCount:0};i=new Jr(s,i,o),t=q(t),s=x(t)}return i}function dn(n){return n.node.value}function Hh(n,e){n.node.value=e,mr(n)}function $h(n){return n.node.childCount>0}function qm(n){return dn(n)===void 0&&!$h(n)}function as(n,e){Te(n.node.children,(t,i)=>{e(new Jr(t,n,i))})}function Gh(n,e,t,i){t&&e(n),as(n,s=>{Gh(s,e,!0)})}function zm(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function ii(n){return new z(n.parent===null?n.name:ii(n.parent)+"/"+n.name)}function mr(n){n.parent!==null&&Km(n.parent,n.name,n)}function Km(n,e,t){const i=qm(t),s=nt(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,mr(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,mr(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ym=/[\[\].#$\/\u0000-\u001F\u007F]/,Jm=/[\[\].#$\u0000-\u001F\u007F]/,Ks=10*1024*1024,qh=function(n){return typeof n=="string"&&n.length!==0&&!Ym.test(n)},Xm=function(n){return typeof n=="string"&&n.length!==0&&!Jm.test(n)},Qm=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),Xm(n)},zh=function(n,e,t){const i=t instanceof z?new P_(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+Ct(i));if(typeof e=="function")throw new Error(n+"contains a function "+Ct(i)+" with contents = "+e.toString());if(Gl(e))throw new Error(n+"contains "+e.toString()+" "+Ct(i));if(typeof e=="string"&&e.length>Ks/3&&Ji(e)>Ks)throw new Error(n+"contains a string greater than "+Ks+" utf8 bytes "+Ct(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,o=!1;if(Te(e,(a,h)=>{if(a===".value")s=!0;else if(a!==".priority"&&a!==".sv"&&(o=!0,!qh(a)))throw new Error(n+" contains an invalid key ("+a+") "+Ct(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);O_(i,a),zh(n,h,i),D_(i)}),s&&o)throw new Error(n+' contains ".value" child '+Ct(i)+" in addition to actual children.")}},Zm=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!qh(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!Qm(t))throw new Error(dd(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ey{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function ty(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],o=s.getPath();t!==null&&!gh(o,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:o}),t.events.push(s)}t&&n.eventLists_.push(t)}function jt(n,e,t){ty(n,t),ny(n,i=>be(i,e)||be(e,i))}function ny(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const o=s.path;e(o)?(iy(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function iy(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();Un&&re("event: "+t.toString()),ti(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sy="repo_interrupt",ry=25;class oy{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new ey,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Hi(),this.transactionQueueTree_=new Jr,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function ay(n,e,t){if(n.stats_=Fr(n.repoInfo_),n.forceRestClient_||n_())n.server_=new ji(n.repoInfo_,(i,s,o,a)=>{dc(n,i,s,o,a)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>fc(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{te(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new Xe(n.repoInfo_,e,(i,s,o,a)=>{dc(n,i,s,o,a)},i=>{fc(n,i)},i=>{ly(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=a_(n.repoInfo_,()=>new om(n.stats_,n.server_)),n.infoData_=new tm,n.infoSyncTree_=new hc({startListening:(i,s,o,a)=>{let h=[];const u=n.infoData_.getNode(i._path);return u.isEmpty()||(h=rs(n.infoSyncTree_,i._path,u),setTimeout(()=>{a("ok")},0)),h},stopListening:()=>{}}),Qr(n,"connected",!1),n.serverSyncTree_=new hc({startListening:(i,s,o,a)=>(n.server_.listen(i,o,s,(h,u)=>{const f=a(h,u);jt(n.eventQueue_,i._path,f)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function cy(n){const t=n.infoData_.getNode(new z(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Kh(n){return Bm({timestamp:cy(n)})}function dc(n,e,t,i,s){n.dataUpdateCount++;const o=new z(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let a=[];if(s)if(i){const u=Ni(t,f=>oe(f));a=Wm(n.serverSyncTree_,o,u,s)}else{const u=oe(t);a=Vm(n.serverSyncTree_,o,u,s)}else if(i){const u=Ni(t,f=>oe(f));a=Um(n.serverSyncTree_,o,u)}else{const u=oe(t);a=rs(n.serverSyncTree_,o,u)}let h=o;a.length>0&&(h=eo(n,o)),jt(n.eventQueue_,h,a)}function fc(n,e){Qr(n,"connected",e),e===!1&&uy(n)}function ly(n,e){Te(e,(t,i)=>{Qr(n,t,i)})}function Qr(n,e,t){const i=new z("/.info/"+e),s=oe(t);n.infoData_.updateSnapshot(i,s);const o=rs(n.infoSyncTree_,i,s);jt(n.eventQueue_,i,o)}function hy(n){return n.nextWriteId_++}function uy(n){Yh(n,"onDisconnectEvents");const e=Kh(n),t=Hi();hr(n.onDisconnect_,j(),(s,o)=>{const a=$m(s,o,n.serverSyncTree_,e);wh(t,s,a)});let i=[];hr(t,j(),(s,o)=>{i=i.concat(rs(n.serverSyncTree_,s,o));const a=gy(n,s);eo(n,a)}),n.onDisconnect_=Hi(),jt(n.eventQueue_,j(),i)}function dy(n){n.persistentConnection_&&n.persistentConnection_.interrupt(sy)}function Yh(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),re(t,...e)}function Jh(n,e,t){return Fh(n.serverSyncTree_,e,t)||B.EMPTY_NODE}function Zr(n,e=n.transactionQueueTree_){if(e||cs(n,e),dn(e)){const t=Qh(n,e);R(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&fy(n,ii(e),t)}else $h(e)&&as(e,t=>{Zr(n,t)})}function fy(n,e,t){const i=t.map(f=>f.currentWriteId),s=Jh(n,e,i);let o=s;const a=s.hash();for(let f=0;f<t.length;f++){const T=t[f];R(T.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),T.status=1,T.retryCount++;const E=Ee(e,T.path);o=o.updateChild(E,T.currentOutputSnapshotRaw)}const h=o.val(!0),u=e;n.server_.put(u.toString(),h,f=>{Yh(n,"transaction put response",{path:u.toString(),status:f});let T=[];if(f==="ok"){const E=[];for(let C=0;C<t.length;C++)t[C].status=2,T=T.concat(Yt(n.serverSyncTree_,t[C].currentWriteId)),t[C].onComplete&&E.push(()=>t[C].onComplete(null,!0,t[C].currentOutputSnapshotResolved)),t[C].unwatcher();cs(n,Xr(n.transactionQueueTree_,e)),Zr(n,n.transactionQueueTree_),jt(n.eventQueue_,e,T);for(let C=0;C<E.length;C++)ti(E[C])}else{if(f==="datastale")for(let E=0;E<t.length;E++)t[E].status===3?t[E].status=4:t[E].status=0;else{_e("transaction at "+u.toString()+" failed: "+f);for(let E=0;E<t.length;E++)t[E].status=4,t[E].abortReason=f}eo(n,e)}},a)}function eo(n,e){const t=Xh(n,e),i=ii(t),s=Qh(n,t);return py(n,s,i),i}function py(n,e,t){if(e.length===0)return;const i=[];let s=[];const a=e.filter(h=>h.status===0).map(h=>h.currentWriteId);for(let h=0;h<e.length;h++){const u=e[h],f=Ee(t,u.path);let T=!1,E;if(R(f!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),u.status===4)T=!0,E=u.abortReason,s=s.concat(Yt(n.serverSyncTree_,u.currentWriteId,!0));else if(u.status===0)if(u.retryCount>=ry)T=!0,E="maxretry",s=s.concat(Yt(n.serverSyncTree_,u.currentWriteId,!0));else{const C=Jh(n,u.path,a);u.currentInputSnapshot=C;const k=e[h].update(C.val());if(k!==void 0){zh("transaction failed: Data returned ",k,u.path);let b=oe(k);typeof k=="object"&&k!=null&&nt(k,".priority")||(b=b.updatePriority(C.getPriority()));const L=u.currentWriteId,ue=Kh(n),pe=Gm(b,C,ue);u.currentOutputSnapshotRaw=b,u.currentOutputSnapshotResolved=pe,u.currentWriteId=hy(n),a.splice(a.indexOf(L),1),s=s.concat(Fm(n.serverSyncTree_,u.path,pe,u.currentWriteId,u.applyLocally)),s=s.concat(Yt(n.serverSyncTree_,L,!0))}else T=!0,E="nodata",s=s.concat(Yt(n.serverSyncTree_,u.currentWriteId,!0))}jt(n.eventQueue_,t,s),s=[],T&&(e[h].status=2,(function(C){setTimeout(C,Math.floor(0))})(e[h].unwatcher),e[h].onComplete&&(E==="nodata"?i.push(()=>e[h].onComplete(null,!1,e[h].currentInputSnapshot)):i.push(()=>e[h].onComplete(new Error(E),!1,null))))}cs(n,n.transactionQueueTree_);for(let h=0;h<i.length;h++)ti(i[h]);Zr(n,n.transactionQueueTree_)}function Xh(n,e){let t,i=n.transactionQueueTree_;for(t=x(e);t!==null&&dn(i)===void 0;)i=Xr(i,t),e=q(e),t=x(e);return i}function Qh(n,e){const t=[];return Zh(n,e,t),t.sort((i,s)=>i.order-s.order),t}function Zh(n,e,t){const i=dn(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);as(e,s=>{Zh(n,s,t)})}function cs(n,e){const t=dn(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,Hh(e,t.length>0?t:void 0)}as(e,i=>{cs(n,i)})}function gy(n,e){const t=ii(Xh(n,e)),i=Xr(n.transactionQueueTree_,e);return zm(i,s=>{Ys(n,s)}),Ys(n,i),Gh(i,s=>{Ys(n,s)}),t}function Ys(n,e){const t=dn(e);if(t){const i=[];let s=[],o=-1;for(let a=0;a<t.length;a++)t[a].status===3||(t[a].status===1?(R(o===a-1,"All SENT items should be at beginning of queue."),o=a,t[a].status=3,t[a].abortReason="set"):(R(t[a].status===0,"Unexpected transaction status in abort"),t[a].unwatcher(),s=s.concat(Yt(n.serverSyncTree_,t[a].currentWriteId,!0)),t[a].onComplete&&i.push(t[a].onComplete.bind(null,new Error("set"),!1,null))));o===-1?Hh(e,void 0):t.length=o+1,jt(n.eventQueue_,ii(e),s);for(let a=0;a<i.length;a++)ti(i[a])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _y(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function my(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):_e(`Invalid query segment '${t}' in query '${n}'`)}return e}const pc=function(n,e){const t=yy(n),i=t.namespace;t.domain==="firebase.com"&&et(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&et("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Kg();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new ih(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new z(t.pathString)}},yy=function(n){let e="",t="",i="",s="",o="",a=!0,h="https",u=443;if(typeof n=="string"){let f=n.indexOf("//");f>=0&&(h=n.substring(0,f-1),n=n.substring(f+2));let T=n.indexOf("/");T===-1&&(T=n.length);let E=n.indexOf("?");E===-1&&(E=n.length),e=n.substring(0,Math.min(T,E)),T<E&&(s=_y(n.substring(T,E)));const C=my(n.substring(Math.min(n.length,E)));f=e.indexOf(":"),f>=0?(a=h==="https"||h==="wss",u=parseInt(e.substring(f+1),10)):f=e.length;const k=e.slice(0,f);if(k.toLowerCase()==="localhost")t="localhost";else if(k.split(".").length<=2)t=k;else{const b=e.indexOf(".");i=e.substring(0,b).toLowerCase(),t=e.substring(b+1),o=i}"ns"in C&&(o=C.ns)}return{host:e,port:u,domain:t,subdomain:i,secure:a,scheme:h,pathString:s,namespace:o}};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return O(this._path)?null:dh(this._path)}get ref(){return new fn(this._repo,this._path)}get _queryIdentifier(){const e=Za(this._queryParams),t=Mr(e);return t==="{}"?"default":t}get _queryObject(){return Za(this._queryParams)}isEqual(e){if(e=ie(e),!(e instanceof to))return!1;const t=this._repo===e._repo,i=gh(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+N_(this._path)}}class fn extends to{constructor(e,t){super(e,t,new Br,!1)}get parent(){const e=ph(this._path);return e===null?null:new fn(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}Mm(fn);xm(fn);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vy="FIREBASE_DATABASE_EMULATOR_HOST",yr={};let Ey=!1;function Iy(n,e,t,i){const s=e.lastIndexOf(":"),o=e.substring(0,s),a=Jn(o);n.repoInfo_=new ih(e,a,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0,t),i&&(n.authTokenProvider_=i)}function wy(n,e,t,i,s){let o=i||n.options.databaseURL;o===void 0&&(n.options.projectId||et("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),re("Using default host for project ",n.options.projectId),o=`${n.options.projectId}-default-rtdb.firebaseio.com`);let a=pc(o,s),h=a.repoInfo,u;typeof process<"u"&&La&&(u=La[vy]),u?(o=`http://${u}?ns=${h.namespace}`,a=pc(o,s),h=a.repoInfo):a.repoInfo.secure;const f=new s_(n.name,n.options,e);Zm("Invalid Firebase Database URL",a),O(a.path)||et("Database URL must point to the root of a Firebase Database (not including a child path).");const T=Sy(h,n,f,new i_(n,t));return new Cy(T,n)}function Ty(n,e){const t=yr[e];(!t||t[n.key]!==n)&&et(`Database ${e}(${n.repoInfo_}) has already been deleted.`),dy(n),delete t[n.key]}function Sy(n,e,t,i){let s=yr[e.name];s||(s={},yr[e.name]=s);let o=s[n.toURLString()];return o&&et("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),o=new oy(n,Ey,t,i),s[n.toURLString()]=o,o}class Cy{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(ay(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new fn(this._repo,j())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Ty(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&et("Cannot call "+e+" on a deleted database.")}}function av(n=$c(),e){const t=Cr(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=Yu("database");i&&Ay(t,...i)}return t}function Ay(n,e,t,i={}){n=ie(n),n._checkNotDeleted("useEmulator");const s=`${e}:${t}`,o=n._repoInternal;if(n._instanceStarted){if(s===n._repoInternal.repoInfo_.host&&Ot(i,o.repoInfo_.emulatorOptions))return;et("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let a;if(o.repoInfo_.nodeAdmin)i.mockUserToken&&et('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),a=new Ai(Ai.OWNER);else if(i.mockUserToken){const h=typeof i.mockUserToken=="string"?i.mockUserToken:Ju(i.mockUserToken,n.app.options.projectId);a=new Ai(h)}Jn(e)&&Bc(e),Iy(o,s,i,a)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ry(n){jg(Vt),Dt(new gt("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),o=e.getProvider("app-check-internal");return wy(i,s,o,t)},"PUBLIC").setMultipleInstances(!0)),Ve(Ma,xa,n),Ve(Ma,xa,"esm2020")}Xe.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Xe.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Ry();var gc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var no;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(y,p){function _(){}_.prototype=p.prototype,y.F=p.prototype,y.prototype=new _,y.prototype.constructor=y,y.D=function(v,m,w){for(var g=Array(arguments.length-2),de=2;de<arguments.length;de++)g[de-2]=arguments[de];return p.prototype[m].apply(v,g)}}function t(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(i,t),i.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(y,p,_){_||(_=0);const v=Array(16);if(typeof p=="string")for(var m=0;m<16;++m)v[m]=p.charCodeAt(_++)|p.charCodeAt(_++)<<8|p.charCodeAt(_++)<<16|p.charCodeAt(_++)<<24;else for(m=0;m<16;++m)v[m]=p[_++]|p[_++]<<8|p[_++]<<16|p[_++]<<24;p=y.g[0],_=y.g[1],m=y.g[2];let w=y.g[3],g;g=p+(w^_&(m^w))+v[0]+3614090360&4294967295,p=_+(g<<7&4294967295|g>>>25),g=w+(m^p&(_^m))+v[1]+3905402710&4294967295,w=p+(g<<12&4294967295|g>>>20),g=m+(_^w&(p^_))+v[2]+606105819&4294967295,m=w+(g<<17&4294967295|g>>>15),g=_+(p^m&(w^p))+v[3]+3250441966&4294967295,_=m+(g<<22&4294967295|g>>>10),g=p+(w^_&(m^w))+v[4]+4118548399&4294967295,p=_+(g<<7&4294967295|g>>>25),g=w+(m^p&(_^m))+v[5]+1200080426&4294967295,w=p+(g<<12&4294967295|g>>>20),g=m+(_^w&(p^_))+v[6]+2821735955&4294967295,m=w+(g<<17&4294967295|g>>>15),g=_+(p^m&(w^p))+v[7]+4249261313&4294967295,_=m+(g<<22&4294967295|g>>>10),g=p+(w^_&(m^w))+v[8]+1770035416&4294967295,p=_+(g<<7&4294967295|g>>>25),g=w+(m^p&(_^m))+v[9]+2336552879&4294967295,w=p+(g<<12&4294967295|g>>>20),g=m+(_^w&(p^_))+v[10]+4294925233&4294967295,m=w+(g<<17&4294967295|g>>>15),g=_+(p^m&(w^p))+v[11]+2304563134&4294967295,_=m+(g<<22&4294967295|g>>>10),g=p+(w^_&(m^w))+v[12]+1804603682&4294967295,p=_+(g<<7&4294967295|g>>>25),g=w+(m^p&(_^m))+v[13]+4254626195&4294967295,w=p+(g<<12&4294967295|g>>>20),g=m+(_^w&(p^_))+v[14]+2792965006&4294967295,m=w+(g<<17&4294967295|g>>>15),g=_+(p^m&(w^p))+v[15]+1236535329&4294967295,_=m+(g<<22&4294967295|g>>>10),g=p+(m^w&(_^m))+v[1]+4129170786&4294967295,p=_+(g<<5&4294967295|g>>>27),g=w+(_^m&(p^_))+v[6]+3225465664&4294967295,w=p+(g<<9&4294967295|g>>>23),g=m+(p^_&(w^p))+v[11]+643717713&4294967295,m=w+(g<<14&4294967295|g>>>18),g=_+(w^p&(m^w))+v[0]+3921069994&4294967295,_=m+(g<<20&4294967295|g>>>12),g=p+(m^w&(_^m))+v[5]+3593408605&4294967295,p=_+(g<<5&4294967295|g>>>27),g=w+(_^m&(p^_))+v[10]+38016083&4294967295,w=p+(g<<9&4294967295|g>>>23),g=m+(p^_&(w^p))+v[15]+3634488961&4294967295,m=w+(g<<14&4294967295|g>>>18),g=_+(w^p&(m^w))+v[4]+3889429448&4294967295,_=m+(g<<20&4294967295|g>>>12),g=p+(m^w&(_^m))+v[9]+568446438&4294967295,p=_+(g<<5&4294967295|g>>>27),g=w+(_^m&(p^_))+v[14]+3275163606&4294967295,w=p+(g<<9&4294967295|g>>>23),g=m+(p^_&(w^p))+v[3]+4107603335&4294967295,m=w+(g<<14&4294967295|g>>>18),g=_+(w^p&(m^w))+v[8]+1163531501&4294967295,_=m+(g<<20&4294967295|g>>>12),g=p+(m^w&(_^m))+v[13]+2850285829&4294967295,p=_+(g<<5&4294967295|g>>>27),g=w+(_^m&(p^_))+v[2]+4243563512&4294967295,w=p+(g<<9&4294967295|g>>>23),g=m+(p^_&(w^p))+v[7]+1735328473&4294967295,m=w+(g<<14&4294967295|g>>>18),g=_+(w^p&(m^w))+v[12]+2368359562&4294967295,_=m+(g<<20&4294967295|g>>>12),g=p+(_^m^w)+v[5]+4294588738&4294967295,p=_+(g<<4&4294967295|g>>>28),g=w+(p^_^m)+v[8]+2272392833&4294967295,w=p+(g<<11&4294967295|g>>>21),g=m+(w^p^_)+v[11]+1839030562&4294967295,m=w+(g<<16&4294967295|g>>>16),g=_+(m^w^p)+v[14]+4259657740&4294967295,_=m+(g<<23&4294967295|g>>>9),g=p+(_^m^w)+v[1]+2763975236&4294967295,p=_+(g<<4&4294967295|g>>>28),g=w+(p^_^m)+v[4]+1272893353&4294967295,w=p+(g<<11&4294967295|g>>>21),g=m+(w^p^_)+v[7]+4139469664&4294967295,m=w+(g<<16&4294967295|g>>>16),g=_+(m^w^p)+v[10]+3200236656&4294967295,_=m+(g<<23&4294967295|g>>>9),g=p+(_^m^w)+v[13]+681279174&4294967295,p=_+(g<<4&4294967295|g>>>28),g=w+(p^_^m)+v[0]+3936430074&4294967295,w=p+(g<<11&4294967295|g>>>21),g=m+(w^p^_)+v[3]+3572445317&4294967295,m=w+(g<<16&4294967295|g>>>16),g=_+(m^w^p)+v[6]+76029189&4294967295,_=m+(g<<23&4294967295|g>>>9),g=p+(_^m^w)+v[9]+3654602809&4294967295,p=_+(g<<4&4294967295|g>>>28),g=w+(p^_^m)+v[12]+3873151461&4294967295,w=p+(g<<11&4294967295|g>>>21),g=m+(w^p^_)+v[15]+530742520&4294967295,m=w+(g<<16&4294967295|g>>>16),g=_+(m^w^p)+v[2]+3299628645&4294967295,_=m+(g<<23&4294967295|g>>>9),g=p+(m^(_|~w))+v[0]+4096336452&4294967295,p=_+(g<<6&4294967295|g>>>26),g=w+(_^(p|~m))+v[7]+1126891415&4294967295,w=p+(g<<10&4294967295|g>>>22),g=m+(p^(w|~_))+v[14]+2878612391&4294967295,m=w+(g<<15&4294967295|g>>>17),g=_+(w^(m|~p))+v[5]+4237533241&4294967295,_=m+(g<<21&4294967295|g>>>11),g=p+(m^(_|~w))+v[12]+1700485571&4294967295,p=_+(g<<6&4294967295|g>>>26),g=w+(_^(p|~m))+v[3]+2399980690&4294967295,w=p+(g<<10&4294967295|g>>>22),g=m+(p^(w|~_))+v[10]+4293915773&4294967295,m=w+(g<<15&4294967295|g>>>17),g=_+(w^(m|~p))+v[1]+2240044497&4294967295,_=m+(g<<21&4294967295|g>>>11),g=p+(m^(_|~w))+v[8]+1873313359&4294967295,p=_+(g<<6&4294967295|g>>>26),g=w+(_^(p|~m))+v[15]+4264355552&4294967295,w=p+(g<<10&4294967295|g>>>22),g=m+(p^(w|~_))+v[6]+2734768916&4294967295,m=w+(g<<15&4294967295|g>>>17),g=_+(w^(m|~p))+v[13]+1309151649&4294967295,_=m+(g<<21&4294967295|g>>>11),g=p+(m^(_|~w))+v[4]+4149444226&4294967295,p=_+(g<<6&4294967295|g>>>26),g=w+(_^(p|~m))+v[11]+3174756917&4294967295,w=p+(g<<10&4294967295|g>>>22),g=m+(p^(w|~_))+v[2]+718787259&4294967295,m=w+(g<<15&4294967295|g>>>17),g=_+(w^(m|~p))+v[9]+3951481745&4294967295,y.g[0]=y.g[0]+p&4294967295,y.g[1]=y.g[1]+(m+(g<<21&4294967295|g>>>11))&4294967295,y.g[2]=y.g[2]+m&4294967295,y.g[3]=y.g[3]+w&4294967295}i.prototype.v=function(y,p){p===void 0&&(p=y.length);const _=p-this.blockSize,v=this.C;let m=this.h,w=0;for(;w<p;){if(m==0)for(;w<=_;)s(this,y,w),w+=this.blockSize;if(typeof y=="string"){for(;w<p;)if(v[m++]=y.charCodeAt(w++),m==this.blockSize){s(this,v),m=0;break}}else for(;w<p;)if(v[m++]=y[w++],m==this.blockSize){s(this,v),m=0;break}}this.h=m,this.o+=p},i.prototype.A=function(){var y=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);y[0]=128;for(var p=1;p<y.length-8;++p)y[p]=0;p=this.o*8;for(var _=y.length-8;_<y.length;++_)y[_]=p&255,p/=256;for(this.v(y),y=Array(16),p=0,_=0;_<4;++_)for(let v=0;v<32;v+=8)y[p++]=this.g[_]>>>v&255;return y};function o(y,p){var _=h;return Object.prototype.hasOwnProperty.call(_,y)?_[y]:_[y]=p(y)}function a(y,p){this.h=p;const _=[];let v=!0;for(let m=y.length-1;m>=0;m--){const w=y[m]|0;v&&w==p||(_[m]=w,v=!1)}this.g=_}var h={};function u(y){return-128<=y&&y<128?o(y,function(p){return new a([p|0],p<0?-1:0)}):new a([y|0],y<0?-1:0)}function f(y){if(isNaN(y)||!isFinite(y))return E;if(y<0)return L(f(-y));const p=[];let _=1;for(let v=0;y>=_;v++)p[v]=y/_|0,_*=4294967296;return new a(p,0)}function T(y,p){if(y.length==0)throw Error("number format error: empty string");if(p=p||10,p<2||36<p)throw Error("radix out of range: "+p);if(y.charAt(0)=="-")return L(T(y.substring(1),p));if(y.indexOf("-")>=0)throw Error('number format error: interior "-" character');const _=f(Math.pow(p,8));let v=E;for(let w=0;w<y.length;w+=8){var m=Math.min(8,y.length-w);const g=parseInt(y.substring(w,w+m),p);m<8?(m=f(Math.pow(p,m)),v=v.j(m).add(f(g))):(v=v.j(_),v=v.add(f(g)))}return v}var E=u(0),C=u(1),k=u(16777216);n=a.prototype,n.m=function(){if(D(this))return-L(this).m();let y=0,p=1;for(let _=0;_<this.g.length;_++){const v=this.i(_);y+=(v>=0?v:4294967296+v)*p,p*=4294967296}return y},n.toString=function(y){if(y=y||10,y<2||36<y)throw Error("radix out of range: "+y);if(b(this))return"0";if(D(this))return"-"+L(this).toString(y);const p=f(Math.pow(y,6));var _=this;let v="";for(;;){const m=it(_,p).g;_=ue(_,m.j(p));let w=((_.g.length>0?_.g[0]:_.h)>>>0).toString(y);if(_=m,b(_))return w+v;for(;w.length<6;)w="0"+w;v=w+v}},n.i=function(y){return y<0?0:y<this.g.length?this.g[y]:this.h};function b(y){if(y.h!=0)return!1;for(let p=0;p<y.g.length;p++)if(y.g[p]!=0)return!1;return!0}function D(y){return y.h==-1}n.l=function(y){return y=ue(this,y),D(y)?-1:b(y)?0:1};function L(y){const p=y.g.length,_=[];for(let v=0;v<p;v++)_[v]=~y.g[v];return new a(_,~y.h).add(C)}n.abs=function(){return D(this)?L(this):this},n.add=function(y){const p=Math.max(this.g.length,y.g.length),_=[];let v=0;for(let m=0;m<=p;m++){let w=v+(this.i(m)&65535)+(y.i(m)&65535),g=(w>>>16)+(this.i(m)>>>16)+(y.i(m)>>>16);v=g>>>16,w&=65535,g&=65535,_[m]=g<<16|w}return new a(_,_[_.length-1]&-2147483648?-1:0)};function ue(y,p){return y.add(L(p))}n.j=function(y){if(b(this)||b(y))return E;if(D(this))return D(y)?L(this).j(L(y)):L(L(this).j(y));if(D(y))return L(this.j(L(y)));if(this.l(k)<0&&y.l(k)<0)return f(this.m()*y.m());const p=this.g.length+y.g.length,_=[];for(var v=0;v<2*p;v++)_[v]=0;for(v=0;v<this.g.length;v++)for(let m=0;m<y.g.length;m++){const w=this.i(v)>>>16,g=this.i(v)&65535,de=y.i(m)>>>16,vt=y.i(m)&65535;_[2*v+2*m]+=g*vt,pe(_,2*v+2*m),_[2*v+2*m+1]+=w*vt,pe(_,2*v+2*m+1),_[2*v+2*m+1]+=g*de,pe(_,2*v+2*m+1),_[2*v+2*m+2]+=w*de,pe(_,2*v+2*m+2)}for(y=0;y<p;y++)_[y]=_[2*y+1]<<16|_[2*y];for(y=p;y<2*p;y++)_[y]=0;return new a(_,0)};function pe(y,p){for(;(y[p]&65535)!=y[p];)y[p+1]+=y[p]>>>16,y[p]&=65535,p++}function me(y,p){this.g=y,this.h=p}function it(y,p){if(b(p))throw Error("division by zero");if(b(y))return new me(E,E);if(D(y))return p=it(L(y),p),new me(L(p.g),L(p.h));if(D(p))return p=it(y,L(p)),new me(L(p.g),p.h);if(y.g.length>30){if(D(y)||D(p))throw Error("slowDivide_ only works with positive integers.");for(var _=C,v=p;v.l(y)<=0;)_=st(_),v=st(v);var m=ye(_,1),w=ye(v,1);for(v=ye(v,2),_=ye(_,2);!b(v);){var g=w.add(v);g.l(y)<=0&&(m=m.add(_),w=g),v=ye(v,1),_=ye(_,1)}return p=ue(y,m.j(p)),new me(m,p)}for(m=E;y.l(p)>=0;){for(_=Math.max(1,Math.floor(y.m()/p.m())),v=Math.ceil(Math.log(_)/Math.LN2),v=v<=48?1:Math.pow(2,v-48),w=f(_),g=w.j(p);D(g)||g.l(y)>0;)_-=v,w=f(_),g=w.j(p);b(w)&&(w=C),m=m.add(w),y=ue(y,g)}return new me(m,y)}n.B=function(y){return it(this,y).h},n.and=function(y){const p=Math.max(this.g.length,y.g.length),_=[];for(let v=0;v<p;v++)_[v]=this.i(v)&y.i(v);return new a(_,this.h&y.h)},n.or=function(y){const p=Math.max(this.g.length,y.g.length),_=[];for(let v=0;v<p;v++)_[v]=this.i(v)|y.i(v);return new a(_,this.h|y.h)},n.xor=function(y){const p=Math.max(this.g.length,y.g.length),_=[];for(let v=0;v<p;v++)_[v]=this.i(v)^y.i(v);return new a(_,this.h^y.h)};function st(y){const p=y.g.length+1,_=[];for(let v=0;v<p;v++)_[v]=y.i(v)<<1|y.i(v-1)>>>31;return new a(_,y.h)}function ye(y,p){const _=p>>5;p%=32;const v=y.g.length-_,m=[];for(let w=0;w<v;w++)m[w]=p>0?y.i(w+_)>>>p|y.i(w+_+1)<<32-p:y.i(w+_);return new a(m,y.h)}i.prototype.digest=i.prototype.A,i.prototype.reset=i.prototype.u,i.prototype.update=i.prototype.v,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=T,no=a}).apply(typeof gc<"u"?gc:typeof self<"u"?self:typeof window<"u"?window:{});var Ei=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var n,e=Object.defineProperty;function t(r){r=[typeof globalThis=="object"&&globalThis,r,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ei=="object"&&Ei];for(var c=0;c<r.length;++c){var l=r[c];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var i=t(this);function s(r,c){if(c)e:{var l=i;r=r.split(".");for(var d=0;d<r.length-1;d++){var I=r[d];if(!(I in l))break e;l=l[I]}r=r[r.length-1],d=l[r],c=c(d),c!=d&&c!=null&&e(l,r,{configurable:!0,writable:!0,value:c})}}s("Symbol.dispose",function(r){return r||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(r){return r||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(r){return r||function(c){var l=[],d;for(d in c)Object.prototype.hasOwnProperty.call(c,d)&&l.push([d,c[d]]);return l}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function h(r){var c=typeof r;return c=="object"&&r!=null||c=="function"}function u(r,c,l){return r.call.apply(r.bind,arguments)}function f(r,c,l){return f=u,f.apply(null,arguments)}function T(r,c){var l=Array.prototype.slice.call(arguments,1);return function(){var d=l.slice();return d.push.apply(d,arguments),r.apply(this,d)}}function E(r,c){function l(){}l.prototype=c.prototype,r.Z=c.prototype,r.prototype=new l,r.prototype.constructor=r,r.Ob=function(d,I,S){for(var A=Array(arguments.length-2),P=2;P<arguments.length;P++)A[P-2]=arguments[P];return c.prototype[I].apply(d,A)}}var C=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?r=>r&&AsyncContext.Snapshot.wrap(r):r=>r;function k(r){const c=r.length;if(c>0){const l=Array(c);for(let d=0;d<c;d++)l[d]=r[d];return l}return[]}function b(r,c){for(let d=1;d<arguments.length;d++){const I=arguments[d];var l=typeof I;if(l=l!="object"?l:I?Array.isArray(I)?"array":l:"null",l=="array"||l=="object"&&typeof I.length=="number"){l=r.length||0;const S=I.length||0;r.length=l+S;for(let A=0;A<S;A++)r[l+A]=I[A]}else r.push(I)}}class D{constructor(c,l){this.i=c,this.j=l,this.h=0,this.g=null}get(){let c;return this.h>0?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function L(r){a.setTimeout(()=>{throw r},0)}function ue(){var r=y;let c=null;return r.g&&(c=r.g,r.g=r.g.next,r.g||(r.h=null),c.next=null),c}class pe{constructor(){this.h=this.g=null}add(c,l){const d=me.get();d.set(c,l),this.h?this.h.next=d:this.g=d,this.h=d}}var me=new D(()=>new it,r=>r.reset());class it{constructor(){this.next=this.g=this.h=null}set(c,l){this.h=c,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let st,ye=!1,y=new pe,p=()=>{const r=Promise.resolve(void 0);st=()=>{r.then(_)}};function _(){for(var r;r=ue();){try{r.h.call(r.g)}catch(l){L(l)}var c=me;c.j(r),c.h<100&&(c.h++,r.next=c.g,c.g=r)}ye=!1}function v(){this.u=this.u,this.C=this.C}v.prototype.u=!1,v.prototype.dispose=function(){this.u||(this.u=!0,this.N())},v.prototype[Symbol.dispose]=function(){this.dispose()},v.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function m(r,c){this.type=r,this.g=this.target=c,this.defaultPrevented=!1}m.prototype.h=function(){this.defaultPrevented=!0};var w=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var r=!1,c=Object.defineProperty({},"passive",{get:function(){r=!0}});try{const l=()=>{};a.addEventListener("test",l,c),a.removeEventListener("test",l,c)}catch{}return r})();function g(r){return/^[\s\xa0]*$/.test(r)}function de(r,c){m.call(this,r?r.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,r&&this.init(r,c)}E(de,m),de.prototype.init=function(r,c){const l=this.type=r.type,d=r.changedTouches&&r.changedTouches.length?r.changedTouches[0]:null;this.target=r.target||r.srcElement,this.g=c,c=r.relatedTarget,c||(l=="mouseover"?c=r.fromElement:l=="mouseout"&&(c=r.toElement)),this.relatedTarget=c,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0),this.button=r.button,this.key=r.key||"",this.ctrlKey=r.ctrlKey,this.altKey=r.altKey,this.shiftKey=r.shiftKey,this.metaKey=r.metaKey,this.pointerId=r.pointerId||0,this.pointerType=r.pointerType,this.state=r.state,this.i=r,r.defaultPrevented&&de.Z.h.call(this)},de.prototype.h=function(){de.Z.h.call(this);const r=this.i;r.preventDefault?r.preventDefault():r.returnValue=!1};var vt="closure_listenable_"+(Math.random()*1e6|0),ou=0;function au(r,c,l,d,I){this.listener=r,this.proxy=null,this.src=c,this.type=l,this.capture=!!d,this.ha=I,this.key=++ou,this.da=this.fa=!1}function ri(r){r.da=!0,r.listener=null,r.proxy=null,r.src=null,r.ha=null}function oi(r,c,l){for(const d in r)c.call(l,r[d],d,r)}function cu(r,c){for(const l in r)c.call(void 0,r[l],l,r)}function oo(r){const c={};for(const l in r)c[l]=r[l];return c}const ao="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function co(r,c){let l,d;for(let I=1;I<arguments.length;I++){d=arguments[I];for(l in d)r[l]=d[l];for(let S=0;S<ao.length;S++)l=ao[S],Object.prototype.hasOwnProperty.call(d,l)&&(r[l]=d[l])}}function ai(r){this.src=r,this.g={},this.h=0}ai.prototype.add=function(r,c,l,d,I){const S=r.toString();r=this.g[S],r||(r=this.g[S]=[],this.h++);const A=us(r,c,d,I);return A>-1?(c=r[A],l||(c.fa=!1)):(c=new au(c,this.src,S,!!d,I),c.fa=l,r.push(c)),c};function hs(r,c){const l=c.type;if(l in r.g){var d=r.g[l],I=Array.prototype.indexOf.call(d,c,void 0),S;(S=I>=0)&&Array.prototype.splice.call(d,I,1),S&&(ri(c),r.g[l].length==0&&(delete r.g[l],r.h--))}}function us(r,c,l,d){for(let I=0;I<r.length;++I){const S=r[I];if(!S.da&&S.listener==c&&S.capture==!!l&&S.ha==d)return I}return-1}var ds="closure_lm_"+(Math.random()*1e6|0),fs={};function lo(r,c,l,d,I){if(Array.isArray(c)){for(let S=0;S<c.length;S++)lo(r,c[S],l,d,I);return null}return l=fo(l),r&&r[vt]?r.J(c,l,h(d)?!!d.capture:!1,I):lu(r,c,l,!1,d,I)}function lu(r,c,l,d,I,S){if(!c)throw Error("Invalid event type");const A=h(I)?!!I.capture:!!I;let P=gs(r);if(P||(r[ds]=P=new ai(r)),l=P.add(c,l,d,A,S),l.proxy)return l;if(d=hu(),l.proxy=d,d.src=r,d.listener=l,r.addEventListener)w||(I=A),I===void 0&&(I=!1),r.addEventListener(c.toString(),d,I);else if(r.attachEvent)r.attachEvent(uo(c.toString()),d);else if(r.addListener&&r.removeListener)r.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return l}function hu(){function r(l){return c.call(r.src,r.listener,l)}const c=uu;return r}function ho(r,c,l,d,I){if(Array.isArray(c))for(var S=0;S<c.length;S++)ho(r,c[S],l,d,I);else d=h(d)?!!d.capture:!!d,l=fo(l),r&&r[vt]?(r=r.i,S=String(c).toString(),S in r.g&&(c=r.g[S],l=us(c,l,d,I),l>-1&&(ri(c[l]),Array.prototype.splice.call(c,l,1),c.length==0&&(delete r.g[S],r.h--)))):r&&(r=gs(r))&&(c=r.g[c.toString()],r=-1,c&&(r=us(c,l,d,I)),(l=r>-1?c[r]:null)&&ps(l))}function ps(r){if(typeof r!="number"&&r&&!r.da){var c=r.src;if(c&&c[vt])hs(c.i,r);else{var l=r.type,d=r.proxy;c.removeEventListener?c.removeEventListener(l,d,r.capture):c.detachEvent?c.detachEvent(uo(l),d):c.addListener&&c.removeListener&&c.removeListener(d),(l=gs(c))?(hs(l,r),l.h==0&&(l.src=null,c[ds]=null)):ri(r)}}}function uo(r){return r in fs?fs[r]:fs[r]="on"+r}function uu(r,c){if(r.da)r=!0;else{c=new de(c,this);const l=r.listener,d=r.ha||r.src;r.fa&&ps(r),r=l.call(d,c)}return r}function gs(r){return r=r[ds],r instanceof ai?r:null}var _s="__closure_events_fn_"+(Math.random()*1e9>>>0);function fo(r){return typeof r=="function"?r:(r[_s]||(r[_s]=function(c){return r.handleEvent(c)}),r[_s])}function se(){v.call(this),this.i=new ai(this),this.M=this,this.G=null}E(se,v),se.prototype[vt]=!0,se.prototype.removeEventListener=function(r,c,l,d){ho(this,r,c,l,d)};function ce(r,c){var l,d=r.G;if(d)for(l=[];d;d=d.G)l.push(d);if(r=r.M,d=c.type||c,typeof c=="string")c=new m(c,r);else if(c instanceof m)c.target=c.target||r;else{var I=c;c=new m(d,r),co(c,I)}I=!0;let S,A;if(l)for(A=l.length-1;A>=0;A--)S=c.g=l[A],I=ci(S,d,!0,c)&&I;if(S=c.g=r,I=ci(S,d,!0,c)&&I,I=ci(S,d,!1,c)&&I,l)for(A=0;A<l.length;A++)S=c.g=l[A],I=ci(S,d,!1,c)&&I}se.prototype.N=function(){if(se.Z.N.call(this),this.i){var r=this.i;for(const c in r.g){const l=r.g[c];for(let d=0;d<l.length;d++)ri(l[d]);delete r.g[c],r.h--}}this.G=null},se.prototype.J=function(r,c,l,d){return this.i.add(String(r),c,!1,l,d)},se.prototype.K=function(r,c,l,d){return this.i.add(String(r),c,!0,l,d)};function ci(r,c,l,d){if(c=r.i.g[String(c)],!c)return!0;c=c.concat();let I=!0;for(let S=0;S<c.length;++S){const A=c[S];if(A&&!A.da&&A.capture==l){const P=A.listener,J=A.ha||A.src;A.fa&&hs(r.i,A),I=P.call(J,d)!==!1&&I}}return I&&!d.defaultPrevented}function du(r,c){if(typeof r!="function")if(r&&typeof r.handleEvent=="function")r=f(r.handleEvent,r);else throw Error("Invalid listener argument");return Number(c)>2147483647?-1:a.setTimeout(r,c||0)}function po(r){r.g=du(()=>{r.g=null,r.i&&(r.i=!1,po(r))},r.l);const c=r.h;r.h=null,r.m.apply(null,c)}class fu extends v{constructor(c,l){super(),this.m=c,this.l=l,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:po(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function pn(r){v.call(this),this.h=r,this.g={}}E(pn,v);var go=[];function _o(r){oi(r.g,function(c,l){this.g.hasOwnProperty(l)&&ps(c)},r),r.g={}}pn.prototype.N=function(){pn.Z.N.call(this),_o(this)},pn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ms=a.JSON.stringify,pu=a.JSON.parse,gu=class{stringify(r){return a.JSON.stringify(r,void 0)}parse(r){return a.JSON.parse(r,void 0)}};function mo(){}function _u(){}var gn={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ys(){m.call(this,"d")}E(ys,m);function vs(){m.call(this,"c")}E(vs,m);var Ht={},yo=null;function Es(){return yo=yo||new se}Ht.Ia="serverreachability";function vo(r){m.call(this,Ht.Ia,r)}E(vo,m);function _n(r){const c=Es();ce(c,new vo(c))}Ht.STAT_EVENT="statevent";function Eo(r,c){m.call(this,Ht.STAT_EVENT,r),this.stat=c}E(Eo,m);function le(r){const c=Es();ce(c,new Eo(c,r))}Ht.Ja="timingevent";function Io(r,c){m.call(this,Ht.Ja,r),this.size=c}E(Io,m);function mn(r,c){if(typeof r!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){r()},c)}function yn(){this.g=!0}yn.prototype.ua=function(){this.g=!1};function mu(r,c,l,d,I,S){r.info(function(){if(r.g)if(S){var A="",P=S.split("&");for(let H=0;H<P.length;H++){var J=P[H].split("=");if(J.length>1){const X=J[0];J=J[1];const Le=X.split("_");A=Le.length>=2&&Le[1]=="type"?A+(X+"="+J+"&"):A+(X+"=redacted&")}}}else A=null;else A=S;return"XMLHTTP REQ ("+d+") [attempt "+I+"]: "+c+`
`+l+`
`+A})}function yu(r,c,l,d,I,S,A){r.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+I+"]: "+c+`
`+l+`
`+S+" "+A})}function $t(r,c,l,d){r.info(function(){return"XMLHTTP TEXT ("+c+"): "+Eu(r,l)+(d?" "+d:"")})}function vu(r,c){r.info(function(){return"TIMEOUT: "+c})}yn.prototype.info=function(){};function Eu(r,c){if(!r.g)return c;if(!c)return null;try{const S=JSON.parse(c);if(S){for(r=0;r<S.length;r++)if(Array.isArray(S[r])){var l=S[r];if(!(l.length<2)){var d=l[1];if(Array.isArray(d)&&!(d.length<1)){var I=d[0];if(I!="noop"&&I!="stop"&&I!="close")for(let A=1;A<d.length;A++)d[A]=""}}}}return ms(S)}catch{return c}}var Is={NO_ERROR:0,TIMEOUT:8},Iu={},wo;function ws(){}E(ws,mo),ws.prototype.g=function(){return new XMLHttpRequest},wo=new ws;function vn(r){return encodeURIComponent(String(r))}function wu(r){var c=1;r=r.split(":");const l=[];for(;c>0&&r.length;)l.push(r.shift()),c--;return r.length&&l.push(r.join(":")),l}function rt(r,c,l,d){this.j=r,this.i=c,this.l=l,this.S=d||1,this.V=new pn(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new To}function To(){this.i=null,this.g="",this.h=!1}var So={},Ts={};function Ss(r,c,l){r.M=1,r.A=hi(De(c)),r.u=l,r.R=!0,Co(r,null)}function Co(r,c){r.F=Date.now(),li(r),r.B=De(r.A);var l=r.B,d=r.S;Array.isArray(d)||(d=[String(d)]),Uo(l.i,"t",d),r.C=0,l=r.j.L,r.h=new To,r.g=na(r.j,l?c:null,!r.u),r.P>0&&(r.O=new fu(f(r.Y,r,r.g),r.P)),c=r.V,l=r.g,d=r.ba;var I="readystatechange";Array.isArray(I)||(I&&(go[0]=I.toString()),I=go);for(let S=0;S<I.length;S++){const A=lo(l,I[S],d||c.handleEvent,!1,c.h||c);if(!A)break;c.g[A.key]=A}c=r.J?oo(r.J):{},r.u?(r.v||(r.v="POST"),c["Content-Type"]="application/x-www-form-urlencoded",r.g.ea(r.B,r.v,r.u,c)):(r.v="GET",r.g.ea(r.B,r.v,null,c)),_n(),mu(r.i,r.v,r.B,r.l,r.S,r.u)}rt.prototype.ba=function(r){r=r.target;const c=this.O;c&&ct(r)==3?c.j():this.Y(r)},rt.prototype.Y=function(r){try{if(r==this.g)e:{const P=ct(this.g),J=this.g.ya(),H=this.g.ca();if(!(P<3)&&(P!=3||this.g&&(this.h.h||this.g.la()||Go(this.g)))){this.K||P!=4||J==7||(J==8||H<=0?_n(3):_n(2)),Cs(this);var c=this.g.ca();this.X=c;var l=Tu(this);if(this.o=c==200,yu(this.i,this.v,this.B,this.l,this.S,P,c),this.o){if(this.U&&!this.L){t:{if(this.g){var d,I=this.g;if((d=I.g?I.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!g(d)){var S=d;break t}}S=null}if(r=S)$t(this.i,this.l,r,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,As(this,r);else{this.o=!1,this.m=3,le(12),Et(this),En(this);break e}}if(this.R){r=!0;let X;for(;!this.K&&this.C<l.length;)if(X=Su(this,l),X==Ts){P==4&&(this.m=4,le(14),r=!1),$t(this.i,this.l,null,"[Incomplete Response]");break}else if(X==So){this.m=4,le(15),$t(this.i,this.l,l,"[Invalid Chunk]"),r=!1;break}else $t(this.i,this.l,X,null),As(this,X);if(Ao(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),P!=4||l.length!=0||this.h.h||(this.m=1,le(16),r=!1),this.o=this.o&&r,!r)$t(this.i,this.l,l,"[Invalid Chunked Response]"),Et(this),En(this);else if(l.length>0&&!this.W){this.W=!0;var A=this.j;A.g==this&&A.aa&&!A.P&&(A.j.info("Great, no buffering proxy detected. Bytes received: "+l.length),Ls(A),A.P=!0,le(11))}}else $t(this.i,this.l,l,null),As(this,l);P==4&&Et(this),this.o&&!this.K&&(P==4?Qo(this.j,this):(this.o=!1,li(this)))}else Uu(this.g),c==400&&l.indexOf("Unknown SID")>0?(this.m=3,le(12)):(this.m=0,le(13)),Et(this),En(this)}}}catch{}finally{}};function Tu(r){if(!Ao(r))return r.g.la();const c=Go(r.g);if(c==="")return"";let l="";const d=c.length,I=ct(r.g)==4;if(!r.h.i){if(typeof TextDecoder>"u")return Et(r),En(r),"";r.h.i=new a.TextDecoder}for(let S=0;S<d;S++)r.h.h=!0,l+=r.h.i.decode(c[S],{stream:!(I&&S==d-1)});return c.length=0,r.h.g+=l,r.C=0,r.h.g}function Ao(r){return r.g?r.v=="GET"&&r.M!=2&&r.j.Aa:!1}function Su(r,c){var l=r.C,d=c.indexOf(`
`,l);return d==-1?Ts:(l=Number(c.substring(l,d)),isNaN(l)?So:(d+=1,d+l>c.length?Ts:(c=c.slice(d,d+l),r.C=d+l,c)))}rt.prototype.cancel=function(){this.K=!0,Et(this)};function li(r){r.T=Date.now()+r.H,Ro(r,r.H)}function Ro(r,c){if(r.D!=null)throw Error("WatchDog timer not null");r.D=mn(f(r.aa,r),c)}function Cs(r){r.D&&(a.clearTimeout(r.D),r.D=null)}rt.prototype.aa=function(){this.D=null;const r=Date.now();r-this.T>=0?(vu(this.i,this.B),this.M!=2&&(_n(),le(17)),Et(this),this.m=2,En(this)):Ro(this,this.T-r)};function En(r){r.j.I==0||r.K||Qo(r.j,r)}function Et(r){Cs(r);var c=r.O;c&&typeof c.dispose=="function"&&c.dispose(),r.O=null,_o(r.V),r.g&&(c=r.g,r.g=null,c.abort(),c.dispose())}function As(r,c){try{var l=r.j;if(l.I!=0&&(l.g==r||Rs(l.h,r))){if(!r.L&&Rs(l.h,r)&&l.I==3){try{var d=l.Ba.g.parse(c)}catch{d=null}if(Array.isArray(d)&&d.length==3){var I=d;if(I[0]==0){e:if(!l.v){if(l.g)if(l.g.F+3e3<r.F)gi(l),fi(l);else break e;Ds(l),le(18)}}else l.xa=I[1],0<l.xa-l.K&&I[2]<37500&&l.F&&l.A==0&&!l.C&&(l.C=mn(f(l.Va,l),6e3));No(l.h)<=1&&l.ta&&(l.ta=void 0)}else wt(l,11)}else if((r.L||l.g==r)&&gi(l),!g(c))for(I=l.Ba.g.parse(c),c=0;c<I.length;c++){let H=I[c];const X=H[0];if(!(X<=l.K))if(l.K=X,H=H[1],l.I==2)if(H[0]=="c"){l.M=H[1],l.ba=H[2];const Le=H[3];Le!=null&&(l.ka=Le,l.j.info("VER="+l.ka));const Tt=H[4];Tt!=null&&(l.za=Tt,l.j.info("SVER="+l.za));const lt=H[5];lt!=null&&typeof lt=="number"&&lt>0&&(d=1.5*lt,l.O=d,l.j.info("backChannelRequestTimeoutMs_="+d)),d=l;const ht=r.g;if(ht){const _i=ht.g?ht.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(_i){var S=d.h;S.g||_i.indexOf("spdy")==-1&&_i.indexOf("quic")==-1&&_i.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(bs(S,S.h),S.h=null))}if(d.G){const Ms=ht.g?ht.g.getResponseHeader("X-HTTP-Session-Id"):null;Ms&&(d.wa=Ms,$(d.J,d.G,Ms))}}l.I=3,l.l&&l.l.ra(),l.aa&&(l.T=Date.now()-r.F,l.j.info("Handshake RTT: "+l.T+"ms")),d=l;var A=r;if(d.na=ta(d,d.L?d.ba:null,d.W),A.L){Po(d.h,A);var P=A,J=d.O;J&&(P.H=J),P.D&&(Cs(P),li(P)),d.g=A}else Jo(d);l.i.length>0&&pi(l)}else H[0]!="stop"&&H[0]!="close"||wt(l,7);else l.I==3&&(H[0]=="stop"||H[0]=="close"?H[0]=="stop"?wt(l,7):Os(l):H[0]!="noop"&&l.l&&l.l.qa(H),l.A=0)}}_n(4)}catch{}}var Cu=class{constructor(r,c){this.g=r,this.map=c}};function bo(r){this.l=r||10,a.PerformanceNavigationTiming?(r=a.performance.getEntriesByType("navigation"),r=r.length>0&&(r[0].nextHopProtocol=="hq"||r[0].nextHopProtocol=="h2")):r=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=r?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function ko(r){return r.h?!0:r.g?r.g.size>=r.j:!1}function No(r){return r.h?1:r.g?r.g.size:0}function Rs(r,c){return r.h?r.h==c:r.g?r.g.has(c):!1}function bs(r,c){r.g?r.g.add(c):r.h=c}function Po(r,c){r.h&&r.h==c?r.h=null:r.g&&r.g.has(c)&&r.g.delete(c)}bo.prototype.cancel=function(){if(this.i=Oo(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const r of this.g.values())r.cancel();this.g.clear()}};function Oo(r){if(r.h!=null)return r.i.concat(r.h.G);if(r.g!=null&&r.g.size!==0){let c=r.i;for(const l of r.g.values())c=c.concat(l.G);return c}return k(r.i)}var Do=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Au(r,c){if(r){r=r.split("&");for(let l=0;l<r.length;l++){const d=r[l].indexOf("=");let I,S=null;d>=0?(I=r[l].substring(0,d),S=r[l].substring(d+1)):I=r[l],c(I,S?decodeURIComponent(S.replace(/\+/g," ")):"")}}}function ot(r){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let c;r instanceof ot?(this.l=r.l,In(this,r.j),this.o=r.o,this.g=r.g,wn(this,r.u),this.h=r.h,ks(this,Vo(r.i)),this.m=r.m):r&&(c=String(r).match(Do))?(this.l=!1,In(this,c[1]||"",!0),this.o=Tn(c[2]||""),this.g=Tn(c[3]||"",!0),wn(this,c[4]),this.h=Tn(c[5]||"",!0),ks(this,c[6]||"",!0),this.m=Tn(c[7]||"")):(this.l=!1,this.i=new Cn(null,this.l))}ot.prototype.toString=function(){const r=[];var c=this.j;c&&r.push(Sn(c,Lo,!0),":");var l=this.g;return(l||c=="file")&&(r.push("//"),(c=this.o)&&r.push(Sn(c,Lo,!0),"@"),r.push(vn(l).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.u,l!=null&&r.push(":",String(l))),(l=this.h)&&(this.g&&l.charAt(0)!="/"&&r.push("/"),r.push(Sn(l,l.charAt(0)=="/"?ku:bu,!0))),(l=this.i.toString())&&r.push("?",l),(l=this.m)&&r.push("#",Sn(l,Pu)),r.join("")},ot.prototype.resolve=function(r){const c=De(this);let l=!!r.j;l?In(c,r.j):l=!!r.o,l?c.o=r.o:l=!!r.g,l?c.g=r.g:l=r.u!=null;var d=r.h;if(l)wn(c,r.u);else if(l=!!r.h){if(d.charAt(0)!="/")if(this.g&&!this.h)d="/"+d;else{var I=c.h.lastIndexOf("/");I!=-1&&(d=c.h.slice(0,I+1)+d)}if(I=d,I==".."||I==".")d="";else if(I.indexOf("./")!=-1||I.indexOf("/.")!=-1){d=I.lastIndexOf("/",0)==0,I=I.split("/");const S=[];for(let A=0;A<I.length;){const P=I[A++];P=="."?d&&A==I.length&&S.push(""):P==".."?((S.length>1||S.length==1&&S[0]!="")&&S.pop(),d&&A==I.length&&S.push("")):(S.push(P),d=!0)}d=S.join("/")}else d=I}return l?c.h=d:l=r.i.toString()!=="",l?ks(c,Vo(r.i)):l=!!r.m,l&&(c.m=r.m),c};function De(r){return new ot(r)}function In(r,c,l){r.j=l?Tn(c,!0):c,r.j&&(r.j=r.j.replace(/:$/,""))}function wn(r,c){if(c){if(c=Number(c),isNaN(c)||c<0)throw Error("Bad port number "+c);r.u=c}else r.u=null}function ks(r,c,l){c instanceof Cn?(r.i=c,Ou(r.i,r.l)):(l||(c=Sn(c,Nu)),r.i=new Cn(c,r.l))}function $(r,c,l){r.i.set(c,l)}function hi(r){return $(r,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),r}function Tn(r,c){return r?c?decodeURI(r.replace(/%25/g,"%2525")):decodeURIComponent(r):""}function Sn(r,c,l){return typeof r=="string"?(r=encodeURI(r).replace(c,Ru),l&&(r=r.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),r):null}function Ru(r){return r=r.charCodeAt(0),"%"+(r>>4&15).toString(16)+(r&15).toString(16)}var Lo=/[#\/\?@]/g,bu=/[#\?:]/g,ku=/[#\?]/g,Nu=/[#\?@]/g,Pu=/#/g;function Cn(r,c){this.h=this.g=null,this.i=r||null,this.j=!!c}function It(r){r.g||(r.g=new Map,r.h=0,r.i&&Au(r.i,function(c,l){r.add(decodeURIComponent(c.replace(/\+/g," ")),l)}))}n=Cn.prototype,n.add=function(r,c){It(this),this.i=null,r=Gt(this,r);let l=this.g.get(r);return l||this.g.set(r,l=[]),l.push(c),this.h+=1,this};function Mo(r,c){It(r),c=Gt(r,c),r.g.has(c)&&(r.i=null,r.h-=r.g.get(c).length,r.g.delete(c))}function xo(r,c){return It(r),c=Gt(r,c),r.g.has(c)}n.forEach=function(r,c){It(this),this.g.forEach(function(l,d){l.forEach(function(I){r.call(c,I,d,this)},this)},this)};function Fo(r,c){It(r);let l=[];if(typeof c=="string")xo(r,c)&&(l=l.concat(r.g.get(Gt(r,c))));else for(r=Array.from(r.g.values()),c=0;c<r.length;c++)l=l.concat(r[c]);return l}n.set=function(r,c){return It(this),this.i=null,r=Gt(this,r),xo(this,r)&&(this.h-=this.g.get(r).length),this.g.set(r,[c]),this.h+=1,this},n.get=function(r,c){return r?(r=Fo(this,r),r.length>0?String(r[0]):c):c};function Uo(r,c,l){Mo(r,c),l.length>0&&(r.i=null,r.g.set(Gt(r,c),k(l)),r.h+=l.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const r=[],c=Array.from(this.g.keys());for(let d=0;d<c.length;d++){var l=c[d];const I=vn(l);l=Fo(this,l);for(let S=0;S<l.length;S++){let A=I;l[S]!==""&&(A+="="+vn(l[S])),r.push(A)}}return this.i=r.join("&")};function Vo(r){const c=new Cn;return c.i=r.i,r.g&&(c.g=new Map(r.g),c.h=r.h),c}function Gt(r,c){return c=String(c),r.j&&(c=c.toLowerCase()),c}function Ou(r,c){c&&!r.j&&(It(r),r.i=null,r.g.forEach(function(l,d){const I=d.toLowerCase();d!=I&&(Mo(this,d),Uo(this,I,l))},r)),r.j=c}function Du(r,c){const l=new yn;if(a.Image){const d=new Image;d.onload=T(at,l,"TestLoadImage: loaded",!0,c,d),d.onerror=T(at,l,"TestLoadImage: error",!1,c,d),d.onabort=T(at,l,"TestLoadImage: abort",!1,c,d),d.ontimeout=T(at,l,"TestLoadImage: timeout",!1,c,d),a.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=r}else c(!1)}function Lu(r,c){const l=new yn,d=new AbortController,I=setTimeout(()=>{d.abort(),at(l,"TestPingServer: timeout",!1,c)},1e4);fetch(r,{signal:d.signal}).then(S=>{clearTimeout(I),S.ok?at(l,"TestPingServer: ok",!0,c):at(l,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(I),at(l,"TestPingServer: error",!1,c)})}function at(r,c,l,d,I){try{I&&(I.onload=null,I.onerror=null,I.onabort=null,I.ontimeout=null),d(l)}catch{}}function Mu(){this.g=new gu}function Ns(r){this.i=r.Sb||null,this.h=r.ab||!1}E(Ns,mo),Ns.prototype.g=function(){return new ui(this.i,this.h)};function ui(r,c){se.call(this),this.H=r,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}E(ui,se),n=ui.prototype,n.open=function(r,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=r,this.D=c,this.readyState=1,Rn(this)},n.send=function(r){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const c={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};r&&(c.body=r),(this.H||a).fetch(new Request(this.D,c)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,An(this)),this.readyState=0},n.Pa=function(r){if(this.g&&(this.l=r,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=r.headers,this.readyState=2,Rn(this)),this.g&&(this.readyState=3,Rn(this),this.g)))if(this.responseType==="arraybuffer")r.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in r){if(this.j=r.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Wo(this)}else r.text().then(this.Oa.bind(this),this.ga.bind(this))};function Wo(r){r.j.read().then(r.Ma.bind(r)).catch(r.ga.bind(r))}n.Ma=function(r){if(this.g){if(this.o&&r.value)this.response.push(r.value);else if(!this.o){var c=r.value?r.value:new Uint8Array(0);(c=this.B.decode(c,{stream:!r.done}))&&(this.response=this.responseText+=c)}r.done?An(this):Rn(this),this.readyState==3&&Wo(this)}},n.Oa=function(r){this.g&&(this.response=this.responseText=r,An(this))},n.Na=function(r){this.g&&(this.response=r,An(this))},n.ga=function(){this.g&&An(this)};function An(r){r.readyState=4,r.l=null,r.j=null,r.B=null,Rn(r)}n.setRequestHeader=function(r,c){this.A.append(r,c)},n.getResponseHeader=function(r){return this.h&&this.h.get(r.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const r=[],c=this.h.entries();for(var l=c.next();!l.done;)l=l.value,r.push(l[0]+": "+l[1]),l=c.next();return r.join(`\r
`)};function Rn(r){r.onreadystatechange&&r.onreadystatechange.call(r)}Object.defineProperty(ui.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(r){this.m=r?"include":"same-origin"}});function Bo(r){let c="";return oi(r,function(l,d){c+=d,c+=":",c+=l,c+=`\r
`}),c}function Ps(r,c,l){e:{for(d in l){var d=!1;break e}d=!0}d||(l=Bo(l),typeof r=="string"?l!=null&&vn(l):$(r,c,l))}function K(r){se.call(this),this.headers=new Map,this.L=r||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}E(K,se);var xu=/^https?$/i,Fu=["POST","PUT"];n=K.prototype,n.Fa=function(r){this.H=r},n.ea=function(r,c,l,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+r);c=c?c.toUpperCase():"GET",this.D=r,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():wo.g(),this.g.onreadystatechange=C(f(this.Ca,this));try{this.B=!0,this.g.open(c,String(r),!0),this.B=!1}catch(S){jo(this,S);return}if(r=l||"",l=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var I in d)l.set(I,d[I]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const S of d.keys())l.set(S,d.get(S));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(l.keys()).find(S=>S.toLowerCase()=="content-type"),I=a.FormData&&r instanceof a.FormData,!(Array.prototype.indexOf.call(Fu,c,void 0)>=0)||d||I||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,A]of l)this.g.setRequestHeader(S,A);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(r),this.v=!1}catch(S){jo(this,S)}};function jo(r,c){r.h=!1,r.g&&(r.j=!0,r.g.abort(),r.j=!1),r.l=c,r.o=5,Ho(r),di(r)}function Ho(r){r.A||(r.A=!0,ce(r,"complete"),ce(r,"error"))}n.abort=function(r){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=r||7,ce(this,"complete"),ce(this,"abort"),di(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),di(this,!0)),K.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?$o(this):this.Xa())},n.Xa=function(){$o(this)};function $o(r){if(r.h&&typeof o<"u"){if(r.v&&ct(r)==4)setTimeout(r.Ca.bind(r),0);else if(ce(r,"readystatechange"),ct(r)==4){r.h=!1;try{const S=r.ca();e:switch(S){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var l;if(!(l=c)){var d;if(d=S===0){let A=String(r.D).match(Do)[1]||null;!A&&a.self&&a.self.location&&(A=a.self.location.protocol.slice(0,-1)),d=!xu.test(A?A.toLowerCase():"")}l=d}if(l)ce(r,"complete"),ce(r,"success");else{r.o=6;try{var I=ct(r)>2?r.g.statusText:""}catch{I=""}r.l=I+" ["+r.ca()+"]",Ho(r)}}finally{di(r)}}}}function di(r,c){if(r.g){r.m&&(clearTimeout(r.m),r.m=null);const l=r.g;r.g=null,c||ce(r,"ready");try{l.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function ct(r){return r.g?r.g.readyState:0}n.ca=function(){try{return ct(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(r){if(this.g){var c=this.g.responseText;return r&&c.indexOf(r)==0&&(c=c.substring(r.length)),pu(c)}};function Go(r){try{if(!r.g)return null;if("response"in r.g)return r.g.response;switch(r.F){case"":case"text":return r.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in r.g)return r.g.mozResponseArrayBuffer}return null}catch{return null}}function Uu(r){const c={};r=(r.g&&ct(r)>=2&&r.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<r.length;d++){if(g(r[d]))continue;var l=wu(r[d]);const I=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const S=c[I]||[];c[I]=S,S.push(l)}cu(c,function(d){return d.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function bn(r,c,l){return l&&l.internalChannelParams&&l.internalChannelParams[r]||c}function qo(r){this.za=0,this.i=[],this.j=new yn,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=bn("failFast",!1,r),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=bn("baseRetryDelayMs",5e3,r),this.Za=bn("retryDelaySeedMs",1e4,r),this.Ta=bn("forwardChannelMaxRetries",2,r),this.va=bn("forwardChannelRequestTimeoutMs",2e4,r),this.ma=r&&r.xmlHttpFactory||void 0,this.Ua=r&&r.Rb||void 0,this.Aa=r&&r.useFetchStreams||!1,this.O=void 0,this.L=r&&r.supportsCrossDomainXhr||!1,this.M="",this.h=new bo(r&&r.concurrentRequestLimit),this.Ba=new Mu,this.S=r&&r.fastHandshake||!1,this.R=r&&r.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=r&&r.Pb||!1,r&&r.ua&&this.j.ua(),r&&r.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&r&&r.detectBufferingProxy||!1,this.ia=void 0,r&&r.longPollingTimeout&&r.longPollingTimeout>0&&(this.ia=r.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=qo.prototype,n.ka=8,n.I=1,n.connect=function(r,c,l,d){le(0),this.W=r,this.H=c||{},l&&d!==void 0&&(this.H.OSID=l,this.H.OAID=d),this.F=this.X,this.J=ta(this,null,this.W),pi(this)};function Os(r){if(zo(r),r.I==3){var c=r.V++,l=De(r.J);if($(l,"SID",r.M),$(l,"RID",c),$(l,"TYPE","terminate"),kn(r,l),c=new rt(r,r.j,c),c.M=2,c.A=hi(De(l)),l=!1,a.navigator&&a.navigator.sendBeacon)try{l=a.navigator.sendBeacon(c.A.toString(),"")}catch{}!l&&a.Image&&(new Image().src=c.A,l=!0),l||(c.g=na(c.j,null),c.g.ea(c.A)),c.F=Date.now(),li(c)}ea(r)}function fi(r){r.g&&(Ls(r),r.g.cancel(),r.g=null)}function zo(r){fi(r),r.v&&(a.clearTimeout(r.v),r.v=null),gi(r),r.h.cancel(),r.m&&(typeof r.m=="number"&&a.clearTimeout(r.m),r.m=null)}function pi(r){if(!ko(r.h)&&!r.m){r.m=!0;var c=r.Ea;st||p(),ye||(st(),ye=!0),y.add(c,r),r.D=0}}function Vu(r,c){return No(r.h)>=r.h.j-(r.m?1:0)?!1:r.m?(r.i=c.G.concat(r.i),!0):r.I==1||r.I==2||r.D>=(r.Sa?0:r.Ta)?!1:(r.m=mn(f(r.Ea,r,c),Zo(r,r.D)),r.D++,!0)}n.Ea=function(r){if(this.m)if(this.m=null,this.I==1){if(!r){this.V=Math.floor(Math.random()*1e5),r=this.V++;const I=new rt(this,this.j,r);let S=this.o;if(this.U&&(S?(S=oo(S),co(S,this.U)):S=this.U),this.u!==null||this.R||(I.J=S,S=null),this.S)e:{for(var c=0,l=0;l<this.i.length;l++){t:{var d=this.i[l];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break t}d=void 0}if(d===void 0)break;if(c+=d,c>4096){c=l;break e}if(c===4096||l===this.i.length-1){c=l+1;break e}}c=1e3}else c=1e3;c=Yo(this,I,c),l=De(this.J),$(l,"RID",r),$(l,"CVER",22),this.G&&$(l,"X-HTTP-Session-Id",this.G),kn(this,l),S&&(this.R?c="headers="+vn(Bo(S))+"&"+c:this.u&&Ps(l,this.u,S)),bs(this.h,I),this.Ra&&$(l,"TYPE","init"),this.S?($(l,"$req",c),$(l,"SID","null"),I.U=!0,Ss(I,l,null)):Ss(I,l,c),this.I=2}}else this.I==3&&(r?Ko(this,r):this.i.length==0||ko(this.h)||Ko(this))};function Ko(r,c){var l;c?l=c.l:l=r.V++;const d=De(r.J);$(d,"SID",r.M),$(d,"RID",l),$(d,"AID",r.K),kn(r,d),r.u&&r.o&&Ps(d,r.u,r.o),l=new rt(r,r.j,l,r.D+1),r.u===null&&(l.J=r.o),c&&(r.i=c.G.concat(r.i)),c=Yo(r,l,1e3),l.H=Math.round(r.va*.5)+Math.round(r.va*.5*Math.random()),bs(r.h,l),Ss(l,d,c)}function kn(r,c){r.H&&oi(r.H,function(l,d){$(c,d,l)}),r.l&&oi({},function(l,d){$(c,d,l)})}function Yo(r,c,l){l=Math.min(r.i.length,l);const d=r.l?f(r.l.Ka,r.l,r):null;e:{var I=r.i;let P=-1;for(;;){const J=["count="+l];P==-1?l>0?(P=I[0].g,J.push("ofs="+P)):P=0:J.push("ofs="+P);let H=!0;for(let X=0;X<l;X++){var S=I[X].g;const Le=I[X].map;if(S-=P,S<0)P=Math.max(0,I[X].g-100),H=!1;else try{S="req"+S+"_"||"";try{var A=Le instanceof Map?Le:Object.entries(Le);for(const[Tt,lt]of A){let ht=lt;h(lt)&&(ht=ms(lt)),J.push(S+Tt+"="+encodeURIComponent(ht))}}catch(Tt){throw J.push(S+"type="+encodeURIComponent("_badmap")),Tt}}catch{d&&d(Le)}}if(H){A=J.join("&");break e}}A=void 0}return r=r.i.splice(0,l),c.G=r,A}function Jo(r){if(!r.g&&!r.v){r.Y=1;var c=r.Da;st||p(),ye||(st(),ye=!0),y.add(c,r),r.A=0}}function Ds(r){return r.g||r.v||r.A>=3?!1:(r.Y++,r.v=mn(f(r.Da,r),Zo(r,r.A)),r.A++,!0)}n.Da=function(){if(this.v=null,Xo(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var r=4*this.T;this.j.info("BP detection timer enabled: "+r),this.B=mn(f(this.Wa,this),r)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,le(10),fi(this),Xo(this))};function Ls(r){r.B!=null&&(a.clearTimeout(r.B),r.B=null)}function Xo(r){r.g=new rt(r,r.j,"rpc",r.Y),r.u===null&&(r.g.J=r.o),r.g.P=0;var c=De(r.na);$(c,"RID","rpc"),$(c,"SID",r.M),$(c,"AID",r.K),$(c,"CI",r.F?"0":"1"),!r.F&&r.ia&&$(c,"TO",r.ia),$(c,"TYPE","xmlhttp"),kn(r,c),r.u&&r.o&&Ps(c,r.u,r.o),r.O&&(r.g.H=r.O);var l=r.g;r=r.ba,l.M=1,l.A=hi(De(c)),l.u=null,l.R=!0,Co(l,r)}n.Va=function(){this.C!=null&&(this.C=null,fi(this),Ds(this),le(19))};function gi(r){r.C!=null&&(a.clearTimeout(r.C),r.C=null)}function Qo(r,c){var l=null;if(r.g==c){gi(r),Ls(r),r.g=null;var d=2}else if(Rs(r.h,c))l=c.G,Po(r.h,c),d=1;else return;if(r.I!=0){if(c.o)if(d==1){l=c.u?c.u.length:0,c=Date.now()-c.F;var I=r.D;d=Es(),ce(d,new Io(d,l)),pi(r)}else Jo(r);else if(I=c.m,I==3||I==0&&c.X>0||!(d==1&&Vu(r,c)||d==2&&Ds(r)))switch(l&&l.length>0&&(c=r.h,c.i=c.i.concat(l)),I){case 1:wt(r,5);break;case 4:wt(r,10);break;case 3:wt(r,6);break;default:wt(r,2)}}}function Zo(r,c){let l=r.Qa+Math.floor(Math.random()*r.Za);return r.isActive()||(l*=2),l*c}function wt(r,c){if(r.j.info("Error code "+c),c==2){var l=f(r.bb,r),d=r.Ua;const I=!d;d=new ot(d||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||In(d,"https"),hi(d),I?Du(d.toString(),l):Lu(d.toString(),l)}else le(2);r.I=0,r.l&&r.l.pa(c),ea(r),zo(r)}n.bb=function(r){r?(this.j.info("Successfully pinged google.com"),le(2)):(this.j.info("Failed to ping google.com"),le(1))};function ea(r){if(r.I=0,r.ja=[],r.l){const c=Oo(r.h);(c.length!=0||r.i.length!=0)&&(b(r.ja,c),b(r.ja,r.i),r.h.i.length=0,k(r.i),r.i.length=0),r.l.oa()}}function ta(r,c,l){var d=l instanceof ot?De(l):new ot(l);if(d.g!="")c&&(d.g=c+"."+d.g),wn(d,d.u);else{var I=a.location;d=I.protocol,c=c?c+"."+I.hostname:I.hostname,I=+I.port;const S=new ot(null);d&&In(S,d),c&&(S.g=c),I&&wn(S,I),l&&(S.h=l),d=S}return l=r.G,c=r.wa,l&&c&&$(d,l,c),$(d,"VER",r.ka),kn(r,d),d}function na(r,c,l){if(c&&!r.L)throw Error("Can't create secondary domain capable XhrIo object.");return c=r.Aa&&!r.ma?new K(new Ns({ab:l})):new K(r.ma),c.Fa(r.L),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function ia(){}n=ia.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function ve(r,c){se.call(this),this.g=new qo(c),this.l=r,this.h=c&&c.messageUrlParams||null,r=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(r?r["X-Client-Protocol"]="webchannel":r={"X-Client-Protocol":"webchannel"}),this.g.o=r,r=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(r?r["X-WebChannel-Content-Type"]=c.messageContentType:r={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.sa&&(r?r["X-WebChannel-Client-Profile"]=c.sa:r={"X-WebChannel-Client-Profile":c.sa}),this.g.U=r,(r=c&&c.Qb)&&!g(r)&&(this.g.u=r),this.A=c&&c.supportsCrossDomainXhr||!1,this.v=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!g(c)&&(this.g.G=c,r=this.h,r!==null&&c in r&&(r=this.h,c in r&&delete r[c])),this.j=new qt(this)}E(ve,se),ve.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},ve.prototype.close=function(){Os(this.g)},ve.prototype.o=function(r){var c=this.g;if(typeof r=="string"){var l={};l.__data__=r,r=l}else this.v&&(l={},l.__data__=ms(r),r=l);c.i.push(new Cu(c.Ya++,r)),c.I==3&&pi(c)},ve.prototype.N=function(){this.g.l=null,delete this.j,Os(this.g),delete this.g,ve.Z.N.call(this)};function sa(r){ys.call(this),r.__headers__&&(this.headers=r.__headers__,this.statusCode=r.__status__,delete r.__headers__,delete r.__status__);var c=r.__sm__;if(c){e:{for(const l in c){r=l;break e}r=void 0}(this.i=r)&&(r=this.i,c=c!==null&&r in c?c[r]:void 0),this.data=c}else this.data=r}E(sa,ys);function ra(){vs.call(this),this.status=1}E(ra,vs);function qt(r){this.g=r}E(qt,ia),qt.prototype.ra=function(){ce(this.g,"a")},qt.prototype.qa=function(r){ce(this.g,new sa(r))},qt.prototype.pa=function(r){ce(this.g,new ra)},qt.prototype.oa=function(){ce(this.g,"b")},ve.prototype.send=ve.prototype.o,ve.prototype.open=ve.prototype.m,ve.prototype.close=ve.prototype.close,Is.NO_ERROR=0,Is.TIMEOUT=8,Is.HTTP_ERROR=6,Iu.COMPLETE="complete",_u.EventType=gn,gn.OPEN="a",gn.CLOSE="b",gn.ERROR="c",gn.MESSAGE="d",se.prototype.listen=se.prototype.J,K.prototype.listenOnce=K.prototype.K,K.prototype.getLastError=K.prototype.Ha,K.prototype.getLastErrorCode=K.prototype.ya,K.prototype.getStatus=K.prototype.ca,K.prototype.getResponseJson=K.prototype.La,K.prototype.getResponseText=K.prototype.la,K.prototype.send=K.prototype.ea,K.prototype.setWithCredentials=K.prototype.Fa}).apply(typeof Ei<"u"?Ei:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ge.UNAUTHENTICATED=new ge(null),ge.GOOGLE_CREDENTIALS=new ge("google-credentials-uid"),ge.FIRST_PARTY=new ge("first-party-uid"),ge.MOCK_USER=new ge("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ls="12.14.0";function by(n){ls=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zi=new Xi("@firebase/firestore");function ke(n,...e){if(zi.logLevel<=W.DEBUG){const t=e.map(tu);zi.debug(`Firestore (${ls}): ${n}`,...t)}}function eu(n,...e){if(zi.logLevel<=W.ERROR){const t=e.map(tu);zi.error(`Firestore (${ls}): ${n}`,...t)}}function tu(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ki(n,e,t){let i="Unexpected state";typeof e=="string"?i=e:t=e,nu(n,i,t)}function nu(n,e,t){let i=`FIRESTORE (${ls}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{i+=" CONTEXT: "+JSON.stringify(t)}catch{i+=" CONTEXT: "+t}throw eu(i),new Error(i)}function jn(n,e,t,i){let s="Unexpected state";typeof t=="string"?s=t:i=t,n||nu(e,s,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const U={CANCELLED:"cancelled",INVALID_ARGUMENT:"invalid-argument",FAILED_PRECONDITION:"failed-precondition"};class V extends tt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ky{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Ny{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(ge.UNAUTHENTICATED)))}shutdown(){}}class Py{constructor(e){this.t=e,this.currentUser=ge.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){jn(this.o===void 0,42304);let i=this.i;const s=u=>this.i!==i?(i=this.i,t(u)):Promise.resolve();let o=new Hn;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Hn,e.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const u=o;e.enqueueRetryable((async()=>{await u.promise,await s(this.currentUser)}))},h=u=>{ke("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((u=>h(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?h(u):(ke("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Hn)}}),0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((i=>this.i!==e?(ke("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(jn(typeof i.accessToken=="string",31837,{l:i}),new ky(i.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return jn(e===null||typeof e=="string",2055,{h:e}),new ge(e)}}class Oy{constructor(e,t,i){this.P=e,this.T=t,this.I=i,this.type="FirstParty",this.user=ge.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class Dy{constructor(e,t,i){this.P=e,this.T=t,this.I=i}getToken(){return Promise.resolve(new Oy(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(ge.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class _c{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Ly{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ne(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){jn(this.o===void 0,3512);const i=o=>{o.error!=null&&ke("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,ke("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable((()=>i(o)))};const s=o=>{ke("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((o=>s(o))),setTimeout((()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):ke("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new _c(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(jn(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new _c(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function My(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let i=0;i<n;i++)t[i]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xy{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let i="";for(;i.length<20;){const s=My(40);for(let o=0;o<s.length;++o)i.length<20&&s[o]<t&&(i+=e.charAt(s[o]%62))}return i}}function yt(n,e){return n<e?-1:n>e?1:0}function Fy(n,e){const t=Math.min(n.length,e.length);for(let i=0;i<t;i++){const s=n.charAt(i),o=e.charAt(i);if(s!==o)return Js(s)===Js(o)?yt(s,o):Js(s)?1:-1}return yt(n.length,e.length)}const Uy=55296,Vy=57343;function Js(n){const e=n.charCodeAt(0);return e>=Uy&&e<=Vy}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mc="__name__";class Me{constructor(e,t,i){t===void 0?t=0:t>e.length&&Ki(637,{offset:t,range:e.length}),i===void 0?i=e.length-t:i>e.length-t&&Ki(1746,{length:i,range:e.length-t}),this.segments=e,this.offset=t,this.len=i}get length(){return this.len}isEqual(e){return Me.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Me?e.forEach((i=>{t.push(i)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,i=this.limit();t<i;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const i=Math.min(e.length,t.length);for(let s=0;s<i;s++){const o=Me.compareSegments(e.get(s),t.get(s));if(o!==0)return o}return yt(e.length,t.length)}static compareSegments(e,t){const i=Me.isNumericId(e),s=Me.isNumericId(t);return i&&!s?-1:!i&&s?1:i&&s?Me.extractNumericId(e).compare(Me.extractNumericId(t)):Fy(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return no.fromString(e.substring(4,e.length-2))}}class Ce extends Me{construct(e,t,i){return new Ce(e,t,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const i of e){if(i.indexOf("//")>=0)throw new V(U.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);t.push(...i.split("/").filter((s=>s.length>0)))}return new Ce(t)}static emptyPath(){return new Ce([])}}const Wy=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class At extends Me{construct(e,t,i){return new At(e,t,i)}static isValidIdentifier(e){return Wy.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),At.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===mc}static keyField(){return new At([mc])}static fromServerFormat(e){const t=[];let i="",s=0;const o=()=>{if(i.length===0)throw new V(U.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(i),i=""};let a=!1;for(;s<e.length;){const h=e[s];if(h==="\\"){if(s+1===e.length)throw new V(U.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new V(U.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=u,s+=2}else h==="`"?(a=!a,s++):h!=="."||a?(i+=h,s++):(o(),s++)}if(o(),a)throw new V(U.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new At(t)}static emptyPath(){return new At([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(e){this.path=e}static fromPath(e){return new kt(Ce.fromString(e))}static fromName(e){return new kt(Ce.fromString(e).popFirst(5))}static empty(){return new kt(Ce.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Ce.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return Ce.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new kt(new Ce(e.slice()))}}function By(n,e,t,i){if(e===!0&&i===!0)throw new V(U.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function jy(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y(n,e){const t={typeString:n};return e&&(t.value=e),t}function si(n,e){if(!jy(n))throw new V(U.INVALID_ARGUMENT,"JSON must be an object");let t;for(const i in e)if(e[i]){const s=e[i].typeString,o="value"in e[i]?{value:e[i].value}:void 0;if(!(i in n)){t=`JSON missing required field: '${i}'`;break}const a=n[i];if(s&&typeof a!==s){t=`JSON field '${i}' must be a ${s}.`;break}if(o!==void 0&&a!==o.value){t=`Expected '${i}' field to equal '${o.value}'`;break}}if(t)throw new V(U.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yc=-62135596800,vc=1e6;class xe{static now(){return xe.fromMillis(Date.now())}static fromDate(e){return xe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),i=Math.floor((e-1e3*t)*vc);return new xe(t,i)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new V(U.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new V(U.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<yc)throw new V(U.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new V(U.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/vc}_compareTo(e){return this.seconds===e.seconds?yt(this.nanoseconds,e.nanoseconds):yt(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:xe._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(si(e,xe._jsonSchema))return new xe(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-yc;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}xe._jsonSchemaVersion="firestore/timestamp/1.0",xe._jsonSchema={type:Y("string",xe._jsonSchemaVersion),seconds:Y("number"),nanoseconds:Y("number")};function Hy(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $y extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new $y("Invalid base64 string: "+o):o}})(e);return new Ut(t)}static fromUint8Array(e){const t=(function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o})(e);return new Ut(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const i=new Uint8Array(t.length);for(let s=0;s<t.length;s++)i[s]=t.charCodeAt(s);return i})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return yt(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ut.EMPTY_BYTE_STRING=new Ut("");const Ec="(default)";class Yi{constructor(e,t){this.projectId=e,this.database=t||Ec}static empty(){return new Yi("","")}get isDefaultDatabase(){return this.database===Ec}isEqual(e){return e instanceof Yi&&e.projectId===this.projectId&&e.database===this.database}}function Gy(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new V(U.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Yi(n.options.projectId,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qy{constructor(e,t=null,i=[],s=[],o=null,a="F",h=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=i,this.filters=s,this.limit=o,this.limitType=a,this.startAt=h,this.endAt=u,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function zy(n){return new qy(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ic,M;(M=Ic||(Ic={}))[M.OK=0]="OK",M[M.CANCELLED=1]="CANCELLED",M[M.UNKNOWN=2]="UNKNOWN",M[M.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",M[M.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",M[M.NOT_FOUND=5]="NOT_FOUND",M[M.ALREADY_EXISTS=6]="ALREADY_EXISTS",M[M.PERMISSION_DENIED=7]="PERMISSION_DENIED",M[M.UNAUTHENTICATED=16]="UNAUTHENTICATED",M[M.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",M[M.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",M[M.ABORTED=10]="ABORTED",M[M.OUT_OF_RANGE=11]="OUT_OF_RANGE",M[M.UNIMPLEMENTED=12]="UNIMPLEMENTED",M[M.INTERNAL=13]="INTERNAL",M[M.UNAVAILABLE=14]="UNAVAILABLE",M[M.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new no([4294967295,4294967295],0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ky=41943040;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yy=1048576;function Xs(){return typeof document<"u"?document:null}class Jy{constructor(e,t,i=1e3,s=1.5,o=6e4){this.Di=e,this.timerId=t,this.E_=i,this.R_=s,this.A_=o,this.V_=0,this.d_=null,this.m_=Date.now(),this.reset()}reset(){this.V_=0}f_(){this.V_=this.A_}g_(e){this.cancel();const t=Math.floor(this.V_+this.p_()),i=Math.max(0,Date.now()-this.m_),s=Math.max(0,t-i);s>0&&ke("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${i} ms ago)`),this.d_=this.Di.enqueueAfterDelay(this.timerId,s,(()=>(this.m_=Date.now(),e()))),this.V_*=this.R_,this.V_<this.E_&&(this.V_=this.E_),this.V_>this.A_&&(this.V_=this.A_)}y_(){this.d_!==null&&(this.d_.skipDelay(),this.d_=null)}cancel(){this.d_!==null&&(this.d_.cancel(),this.d_=null)}p_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class io{constructor(e,t,i,s,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=i,this.op=s,this.removalCallback=o,this.deferred=new Hn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,i,s,o){const a=Date.now()+i,h=new io(e,t,a,s,o);return h.start(i),h}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(U.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var wc,Tc;(Tc=wc||(wc={})).Na="default",Tc.Cache="cache";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xy(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qy="ComponentProvider",Sc=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zy="firestore.googleapis.com",Cc=!0;class Ac{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new V(U.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Zy,this.ssl=Cc}else this.host=e.host,this.ssl=e.ssl??Cc;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Ky;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Yy)throw new V(U.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}By("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Xy(e.experimentalLongPollingOptions??{}),(function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new V(U.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new V(U.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new V(U.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(i,s){return i.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ev{constructor(e,t,i,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=i,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ac({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(U.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new V(U.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ac(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(i){if(!i)return new Ny;switch(i.type){case"firstParty":return new Dy(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new V(U.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const i=Sc.get(t);i&&(ke(Qy,"Removing Datastore"),Sc.delete(t),i.terminate())})(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class so{constructor(e,t,i){this.converter=t,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new so(this.firestore,e,this._query)}}class Ue{constructor(e,t,i){this.converter=t,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ro(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ue(this.firestore,e,this._key)}toJSON(){return{type:Ue._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,i){if(si(t,Ue._jsonSchema))return new Ue(e,i||null,new kt(Ce.fromString(t.referencePath)))}}Ue._jsonSchemaVersion="firestore/documentReference/1.0",Ue._jsonSchema={type:Y("string",Ue._jsonSchemaVersion),referencePath:Y("string")};class ro extends so{constructor(e,t,i){super(e,t,zy(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ue(this.firestore,null,new kt(e))}withConverter(e){return new ro(this.firestore,e,this._path)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rc="AsyncQueue";class bc{constructor(e=Promise.resolve()){this.nc=[],this.rc=!1,this.sc=[],this.oc=null,this._c=!1,this.ac=!1,this.uc=[],this.F_=new Jy(this,"async_queue_retry"),this.cc=()=>{const i=Xs();i&&ke(Rc,"Visibility state changed to "+i.visibilityState),this.F_.y_()},this.lc=e;const t=Xs();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.cc)}get isShuttingDown(){return this.rc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.hc(),this.Pc(e)}enterRestrictedMode(e){if(!this.rc){this.rc=!0,this.ac=e||!1;const t=Xs();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.cc)}}enqueue(e){if(this.hc(),this.rc)return new Promise((()=>{}));const t=new Hn;return this.Pc((()=>this.rc&&this.ac?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.nc.push(e),this.Tc())))}async Tc(){if(this.nc.length!==0){try{await this.nc[0](),this.nc.shift(),this.F_.reset()}catch(e){if(!Hy(e))throw e;ke(Rc,"Operation failed with retryable error: "+e)}this.nc.length>0&&this.F_.g_((()=>this.Tc()))}}Pc(e){const t=this.lc.then((()=>(this._c=!0,e().catch((i=>{throw this.oc=i,this._c=!1,eu("INTERNAL UNHANDLED ERROR: ",kc(i)),i})).then((i=>(this._c=!1,i))))));return this.lc=t,t}enqueueAfterDelay(e,t,i){this.hc(),this.uc.indexOf(e)>-1&&(t=0);const s=io.createAndSchedule(this,e,t,i,(o=>this.Ic(o)));return this.sc.push(s),s}hc(){this.oc&&Ki(47125,{Ec:kc(this.oc)})}verifyOperationInProgress(){}async Rc(){let e;do e=this.lc,await e;while(e!==this.lc)}Ac(e){for(const t of this.sc)if(t.timerId===e)return!0;return!1}Vc(e){return this.Rc().then((()=>{this.sc.sort(((t,i)=>t.targetTimeMs-i.targetTimeMs));for(const t of this.sc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Rc()}))}dc(e){this.uc.push(e)}Ic(e){const t=this.sc.indexOf(e);this.sc.splice(t,1)}}function kc(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class tv extends ev{constructor(e,t,i,s){super(e,t,i,s),this.type="firestore",this._queue=new bc,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new bc(e),this._firestoreClient=void 0,await e}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ze(Ut.fromBase64String(e))}catch(t){throw new V(U.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ze(Ut.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:ze._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(si(e,ze._jsonSchema))return ze.fromBase64String(e.bytes)}}ze._jsonSchemaVersion="firestore/bytes/1.0",ze._jsonSchema={type:Y("string",ze._jsonSchemaVersion),bytes:Y("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iu{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new V(U.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new At(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new V(U.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new V(U.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return yt(this._lat,e._lat)||yt(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Nt._jsonSchemaVersion}}static fromJSON(e){if(si(e,Nt._jsonSchema))return new Nt(e.latitude,e.longitude)}}Nt._jsonSchemaVersion="firestore/geoPoint/1.0",Nt._jsonSchema={type:Y("string",Nt._jsonSchemaVersion),latitude:Y("number"),longitude:Y("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(i,s){if(i.length!==s.length)return!1;for(let o=0;o<i.length;++o)if(i[o]!==s[o])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Pt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(si(e,Pt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Pt(e.vectorValues);throw new V(U.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Pt._jsonSchemaVersion="firestore/vectorValue/1.0",Pt._jsonSchema={type:Y("string",Pt._jsonSchemaVersion),vectorValues:Y("object")};function su(n,e,t){if((e=ie(e))instanceof iu)return e._internalPath;if(typeof e=="string")return iv(n,e);throw vr("Field path arguments must be of type string or ",n)}const nv=new RegExp("[~\\*/\\[\\]]");function iv(n,e,t){if(e.search(nv)>=0)throw vr(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n);try{return new iu(...e.split("."))._internalPath}catch{throw vr(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n)}}function vr(n,e,t,i,s){let o=`Function ${e}() called with invalid data`;o+=". ";let a="";return new V(U.INVALID_ARGUMENT,o+n+a)}const Nc="@firebase/firestore",Pc="4.15.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(e,t,i,s,o){this._firestore=e,this._userDataWriter=t,this._key=i,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new Ue(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new sv(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(su("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class sv extends ru{data(){return super.data()}}class Ii{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class tn extends ru{constructor(e,t,i,s,o,a){super(e,t,i,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=o}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Ri(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const i=this._document.data.field(su("DocumentSnapshot.get",e));if(i!==null)return this._userDataWriter.convertValue(i,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new V(U.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=tn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}tn._jsonSchemaVersion="firestore/documentSnapshot/1.0",tn._jsonSchema={type:Y("string",tn._jsonSchemaVersion),bundleSource:Y("string","DocumentSnapshot"),bundleName:Y("string"),bundle:Y("string")};class Ri extends tn{data(e={}){return super.data(e)}}class $n{constructor(e,t,i,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Ii(s.hasPendingWrites,s.fromCache),this.query=i}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((i=>{e.call(t,new Ri(this._firestore,this._userDataWriter,i.key,i,new Ii(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new V(U.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((h=>{const u=new Ri(s._firestore,s._userDataWriter,h.doc.key,h.doc,new Ii(s._snapshot.mutatedKeys.has(h.doc.key),s._snapshot.fromCache),s.query.converter);return h.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((h=>o||h.type!==3)).map((h=>{const u=new Ri(s._firestore,s._userDataWriter,h.doc.key,h.doc,new Ii(s._snapshot.mutatedKeys.has(h.doc.key),s._snapshot.fromCache),s.query.converter);let f=-1,T=-1;return h.type!==0&&(f=a.indexOf(h.doc.key),a=a.delete(h.doc.key)),h.type!==1&&(a=a.add(h.doc),T=a.indexOf(h.doc.key)),{type:rv(h.type),doc:u,oldIndex:f,newIndex:T}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new V(U.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=$n._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=xy.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],i=[],s=[];return this.docs.forEach((o=>{o._document!==null&&(t.push(o._document),i.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),s.push(o.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function rv(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Ki(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */$n._jsonSchemaVersion="firestore/querySnapshot/1.0",$n._jsonSchema={type:Y("string",$n._jsonSchemaVersion),bundleSource:Y("string","QuerySnapshot"),bundleName:Y("string"),bundle:Y("string")};(function(e,t=!0){by(Vt),Dt(new gt("firestore",((i,{instanceIdentifier:s,options:o})=>{const a=i.getProvider("app").getImmediate(),h=new tv(new Py(i.getProvider("auth-internal")),new Ly(a,i.getProvider("app-check-internal")),Gy(a,s),a);return o={useFetchStreams:t,...o},h._setSettings(o),h}),"PUBLIC").setMultipleInstances(!0)),Ve(Nc,Pc,e),Ve(Nc,Pc,"esm2020")})();export{Wt as E,$e as G,Fn as O,gl as a,Ml as b,av as c,_l as d,Ay as e,bl as f,Wg as g,Ip as h,ff as i,Rp as j,Ap as k,wp as l,Pp as m,ig as n,Np as o,tg as p,Yp as q,vp as r,kp as s,Sp as t,bp as u,Tp as v,ov as w};
