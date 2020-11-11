/*
* K·Pay Integration Library - v1.3.3 - Copyright Kiezel 2019
* Last Modified: 2019-11-11
*
* BECAUSE THE LIBRARY IS LICENSED FREE OF CHARGE, THERE IS NO 
* WARRANTY FOR THE LIBRARY, TO THE EXTENT PERMITTED BY APPLICABLE 
* LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT 
* HOLDERS AND/OR OTHER PARTIES PROVIDE THE LIBRARY "AS IS" 
* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, 
* INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF 
* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE
* RISK AS TO THE QUALITY AND PERFORMANCE OF THE LIBRARY IS WITH YOU.
* SHOULD THE LIBRARY PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL 
* NECESSARY SERVICING, REPAIR OR CORRECTION.
* 
* IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN 
* WRITING WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MAY 
* MODIFY AND/OR REDISTRIBUTE THE LIBRARY AS PERMITTED ABOVE, BE 
* LIABLE TO YOU FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL, 
* INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR 
* INABILITY TO USE THE LIBRARY (INCLUDING BUT NOT LIMITED TO LOSS
* OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY 
* YOU OR THIRD PARTIES OR A FAILURE OF THE LIBRARY TO OPERATE WITH
* ANY OTHER SOFTWARE), EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN 
* ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
*/

/*****************************************************************************************/
/*                 GENERATED CODE BELOW THIS LINE - DO NOT MODIFY!                       */
/*****************************************************************************************/

//import { localStorage } from "local-storage"
var localStorageModule = require('local-storage').localStorage;    //because normal import currently doesn't work on Android
import { device } from "peer";
import * as messaging from 'messaging';
import { outbox } from "file-transfer";
import * as cbor from 'cbor';
import * as kcm from '../../../common/kpay/kpay_common.js';
import { me } from "companion";
import * as appClusterStorage from "app-cluster-storage";
var n="fb1.3.3",e=3e3,t=5e3,u=25e3,o=1e4,a=864e5,s=null,f=null,m=null,p=null,g=null,x=null,T="kpay_nextRecheckTimeLocalstorageKey",v="kpay__lastStatusResultLocalstorageKey",y="kpay_flagsLocalstorageKey",k="kpay_appIdLocalstorageKey",h="kpay_randLocalstorageKey",_="kpay_accountTokenLocalstorageKey",S=null,w=null,I=null,N=null,R=!1,D=!1,b=0,C=0,U=0,M=!1,K=!1,L=0,J=null,O=null,P=function(){},z=pn,A=appClusterStorage.get("globalapp");export function initialize(){messaging.peerSocket.addEventListener("open",W),messaging.peerSocket.addEventListener("message",j),messaging.peerSocket.addEventListener("error",Q),messaging.peerSocket.addEventListener("closed",V),setTimeout(en,6e4)}export function setEventHandler(n){P=n}export function setAccountTokenGenerator(n){z=n}export function startPurchase(){F(kcm.purchaseMessageFilename,{purchase:"start"})}export function cancelPurchase(){F(kcm.purchaseMessageFilename,{purchase:"cancel"})}function F(n,e,t,u){var o=function(){t&&t()},a=function(n){u&&u()};if((null==I||B())&&outbox.enqueue(n,cbor.encode(e)).then(o).catch(a),null==I||E())try{0===messaging.peerSocket.readyState?(messaging.peerSocket.send(e),o()):a("PeerSocket closed")}catch(n){a(n)}}function B(){return!E()}function E(){return 0==(64&I)}function W(){null!==Tn()&&"licensed"!==Tn().status&&gn()}function j(n){var e=n.data;if(kcm.isKPayMessage(e))if(q(e)){if(R&&S===e.appId&&w===e.random&&I===e.flags){var o=(new Date).getTime();if(M&&!K&&o-U<u)return;if(o-C<t)return}S=e.appId,w=e.random,I=e.flags,null!==Tn()&&"unlicensed"!==Tn().status&&gn(),X(),f&&(clearTimeout(f),f=null),f=setTimeout($,15e3)}else G(e)&&(R=!1,gn(),s&&(clearTimeout(s),s=null),f&&(clearTimeout(f),f=null),M&&mn())}function q(n){return kcm.isKPayMessage(n)&&0===n.type}function G(n){return kcm.isKPayMessage(n)&&3===n.type}function H(n){return{isKpayMsg:!0,type:1,serverResponse:n}}function Q(n){}function V(n){}function X(){R=!0;var t=(new Date).getTime(),u=z(),o=yn(),a="https://api.kiezelpay.com/api/v1/status?";a+="appid="+encodeURIComponent(S),a+="&rand="+encodeURIComponent(w),a+="&accounttoken="+encodeURIComponent(u),a+="&platform="+encodeURIComponent(o),a+="&flags="+encodeURIComponent(I),a+="&nocache="+encodeURIComponent(t),a+="&libv="+encodeURIComponent(n),b=t,fetch(a).then(function(n){return n.json()}).then(function(n){D=!1,C=(new Date).getTime(),n&&n.hasOwnProperty("status")&&Y(n)}).catch(function(n){C=(new Date).getTime(),D||!R||null!==Tn()&&"licensed"===Tn().status||(s&&(clearTimeout(s),s=null),s=setTimeout(X,e)),D=!1})}function Y(n){"unlicensed"===n.status&&(L=Number(n.paymentCode)),null!==Tn()&&Tn().status===n.status&&("unlicensed"!==Tn().status||Tn().purchaseStatus===n.purchaseStatus&&Tn().paymentCode===n.paymentCode&&Tn().checksum===n.checksum)||F(kcm.statusMessageFilename,H(n),function(){if("licensed"===n.status)Z(7,null,!1);else if("trial"===n.status){var e=Math.round((new Date).getTime()/1e3)+Number(n.trialDurationInSeconds),t=new Date;t.setTime(1e3*e),Z(3,t,!1)}else if("unlicensed"===n.status){var u=Number(n.paymentCode),o=null==Tn()||u!==Tn().paymentCode;"waitForUser"==n.purchaseStatus?Z(5,u,o):"inProgress"==n.purchaseStatus&&Z(6,u,o)}xn(n)},function(){}),"licensed"===n.status||"trial"===n.status?("licensed"===n.status?nn(n):ln(),R=!1,f&&(clearTimeout(f),f=null),mn()):(ln(),K||M?K&&(s&&(clearTimeout(s),s=null),s=setTimeout(X,e)):cn())}function Z(n,e,t){if(O!==n||t){O=n;try{P(n,e)}catch(n){}}}function $(){var n=(new Date).getTime();R&&(M&&!K&&n-U>=u||(!M||K)&&n-C>=15e3)&&(null===Tn()||"licensed"!==Tn().status&&"trial"!==Tn().status)&&(s&&(clearTimeout(s),s=null),s=setTimeout(X,0)),f&&(clearTimeout(f),f=null),f=setTimeout($,15e3)}function nn(n){n&&"licensed"===n.status&&tn(86400*n.validityPeriodInDays*1e3,!1)}function en(){var n=kn(T,null);null!==n&&tn(n-(new Date).getTime(),!0)}function tn(n,e){e||(hn(y,I),hn(k,S),hn(h,w)),n<0?on():un(n)}function un(n){ln();var e=new Date,t=n/1e3;e.setSeconds(e.getSeconds()+t),hn(T,e.getTime()),m&&(clearTimeout(m),m=null),m=setTimeout(on,n)}function ln(){m&&(clearTimeout(m),m=null),_n(T)}function on(){I=kn(y,I),S=kn(k,S),w=kn(h,w),un(a),R||(D=!0,X())}function cn(){if(!K&&!M&&null===J){var e=z(),t=yn(),o={type:"register",purchaseCode:L,data:{appid:S,accounttoken:e,platform:t,flags:I,random:w,libv:n}},a="wss://socket.kiezelpay.com";g&&(clearTimeout(g),g=null),g=setTimeout(function(){M||(K=!0,X(),rn())},3e3);try{(J=new WebSocket(a)).onopen=function(n){M=!0,K=!1,sn(J,o)},J.onmessage=function(n){if(M){U=(new Date).getTime();var e=JSON.parse(n.data);if(e&&"registerReponse"==e.type&&e.keepAliveTimeout)u=e.keepAliveTimeout,p&&(clearTimeout(p),p=null),p=setTimeout(function(){an(J)},u);else if(e&&"statusUpdate"==e.type){if(!e.data||!e.data.hasOwnProperty("status"))return;Y(e.data)}}else try{J.close()}catch(n){}},J.onerror=function(n){M=!1,K=!0;try{J.close()}catch(n){}J=null,rn(),X()},J.onclose=function(n){if(M){if(M=!1,null!==J)try{J.close()}catch(n){}J=null,K=!0,rn(),X()}}}catch(n){}}}function an(n){K||(sn(n,{type:"keepAlive"}),null!==p&&(clearTimeout(p),p=null),p=setTimeout(function(){an(n)},u))}function rn(){x&&(clearTimeout(x),x=null),x=setTimeout(function(){K=!1},o)}function sn(n,e){try{if(1===n.readyState){var t=JSON.stringify(e);n.send(t)}else fn()}catch(n){fn()}}function fn(){M=!1,K=!0;try{J.close()}catch(n){}J=null,rn(),X()}function mn(){if(null!==g&&(clearTimeout(g),g=null),null!==p&&(clearTimeout(p),p=null),M=!1,null!==J)try{J.close()}catch(n){}J=null,R=!1}function dn(n){for(var e=[],i=0;i<n.length;i+=2)e.push(parseInt(n.substr(i,2),16));return e}function pn(){var n=null;return me.permissions.granted("access_app_cluster_storage")&&null!==A&&(n=A.getItem(_)),null!==n&&void 0!==n&&"undefined"!==n||(null!==(n=localStorageModule.getItem(_))&&void 0!==n&&"undefined"!==n||(n=vn(),hn(_,n)),me.permissions.granted("access_app_cluster_storage")&&null!==A&&A.setItem(_,n)),n}function gn(){N=null,_n(v)}function xn(n){N=n,hn(v,JSON.stringify(N))}function Tn(){if(null===N){var n=localStorageModule.getItem(v);null!==n&&void 0!==n&&"undefined"!==n&&(N=JSON.parse(n))}return N}function vn(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){var r=16*Math.random()|0;return("x"==c?r:3&r|8).toString(16)})}function yn(){return device.modelName.toLowerCase()}function kn(n,e){var t=localStorageModule.getItem(n);if(null!==t&&void 0!==t&&"undefined"!==t&&!isNaN(t)){var u=Number(t);if(!isNaN(u))return u}return e}function hn(n,e){null!==e&&void 0!==e&&localStorageModule.setItem(n,e.toString())}function _n(n){localStorageModule.removeItem(n)}