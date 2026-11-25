import {getLanguage,validateSnapshot,locateWorkspace} from "./workspace-adapter.js";
const $=id=>document.getElementById(id);
const words={
 es:{newLabel:"Nuevo Workspace",newDetail:"En construcción",baseLabel:"Workspace base",baseDetail:"Nueva ventana normal (base por validar)",existingLabel:"Workspace existente",existingDetail:"Listar, abrir o enfocar",refresh:"Actualizar lista",loading:"Consultando Vivaldi…",empty:"No hay Workspaces personalizados.",bridge:"Puente ONW no disponible o respuesta inválida. Consulta la guía.",focus:"Enfocar ventana",open:"Abrir en nueva ventana",unknown:"Estado no confirmado",working:"Operación en curso…",done:"Operación confirmada.",normal:"Ventana normal abierta; verifica el espacio base.",extra:"Se abrió una ventana adicional; no se cerrará automáticamente.",failed:"No se confirmó la operación.",pending:"No reintentes hasta comprobar las ventanas."},
 en:{newLabel:"New Workspace",newDetail:"Under construction",baseLabel:"Base Workspace",baseDetail:"New normal window (base not verified)",existingLabel:"Existing Workspace",existingDetail:"List, open or focus",refresh:"Refresh list",loading:"Reading Vivaldi…",empty:"No custom Workspaces.",bridge:"ONW bridge unavailable or invalid response. See guide.",focus:"Focus window",open:"Open in new window",unknown:"State unconfirmed",working:"Operation in progress…",done:"Operation confirmed.",normal:"Normal window opened; verify base workspace.",extra:"An additional window opened; it will not be closed automatically.",failed:"Operation not confirmed.",pending:"Check windows before retrying."}
};
let saved;try{saved=localStorage.getItem("onw-language");}catch(_){}
let lang=getLanguage(saved,navigator.language),source=null,data=null,error="",loading=false,busy=false,result=null;
const t=k=>words[lang][k]||k;
function render(){
 document.documentElement.lang=lang;$("language").value=lang;
 for(const id of ["newLabel","newDetail","baseLabel","baseDetail","existingLabel","existingDetail","refresh"])$(id).textContent=t(id);
 $("base").disabled=busy||!source;$("existing").disabled=busy||!source;$("refresh").disabled=busy||loading||!source;
 $("listStatus").textContent=loading?t("loading"):error?t("bridge")+" ("+error+")":data?.workspaces.length===0?t("empty"):"";
 $("items").replaceChildren();
 for(const w of data?.workspaces||[]){
   let plan;try{plan=locateWorkspace(data,w.id);}catch(_){}
   const b=document.createElement("button"),name=document.createElement("span"),detail=document.createElement("small");
   name.textContent=(w.emoji?w.emoji+" ":"")+w.name;detail.textContent=plan?t(plan.kind):t("unknown");
   b.append(name,detail);b.disabled=busy||loading||!plan||plan.kind==="open"&&(data.canSelect!==true||data.workspaces.filter(x=>x.name.trim()===w.name.trim()).length!==1);
   b.addEventListener("click",()=>act("OPEN",w.id));$("items").append(b);
 }
 $("status").textContent=busy?t("working"):result?.state==="done"?(result.kind==="normal-window"?t("normal"):t("done"))+(result.extraWindow?" "+t("extra"):""):result?.state==="error"?t("failed")+" ("+result.code+") "+(result.extraWindow?t("extra")+" ":"")+t("pending"):result?.state==="running"?t("pending"):"";
}
async function list(){
 if(loading||busy||!source)return;loading=true;error="";data=null;render();
 try{const r=await chrome.runtime.sendMessage({action:"LIST",source});if(!r?.ok)throw Error(r?.code||"NO_RESPONSE");data=validateSnapshot(r.data);}
 catch(e){error=e.message||"LIST_FAILED";}finally{loading=false;render();}
}
async function act(action,id){
 if(busy||!source)return;busy=true;result=null;render();
 try{const r=await chrome.runtime.sendMessage({action,source,id});result=r?.result||{state:"error",code:r?.code||"NO_RESPONSE"};}
 catch(e){result={state:"error",code:e.message||"NO_RESPONSE"};}finally{busy=false;render();}
}
$("language").addEventListener("change",e=>{lang=getLanguage(e.target.value);try{localStorage.setItem("onw-language",lang);}catch(_){}render();});
$("base").addEventListener("click",()=>act("BASE"));
$("existing").addEventListener("click",()=>{$("list").hidden=!$("list").hidden;$("existing").setAttribute("aria-expanded",String(!$("list").hidden));if(!$("list").hidden)list();});
$("refresh").addEventListener("click",list);
render();
(async()=>{try{const w=await chrome.windows.getCurrent();if(w.type==="normal"&&!w.incognito)source=w.id;const r=await chrome.runtime.sendMessage({action:"RESULT"});busy=!!r?.busy;result=r?.result||null;}catch(_){result={state:"error",code:"STARTUP_FAILED"};}render();})();
