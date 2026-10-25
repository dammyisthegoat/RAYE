(() => {
"use strict";
const STORAGE_KEY = "dayframe.data.v1";
const SCHEMA_VERSION = 1;
const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const DAY_SHORT = ["MON","TUE","WED","THU","FRI","SAT","SUN"];
const GOAL_SEEDS = [
 {id:"jamb",name:"JAMB preparation",icon:"◎",category:"Learning",description:"Build genuine exam readiness across Mathematics, Physics, Chemistry, and Use of English.",target:"320+ target score",status:"active"},
 {id:"music",name:"Music production",icon:"♫",category:"Creative",description:"Explore, compose, arrange, and finish music in BandLab across multiple sessions.",target:"Finish and export pieces",status:"active"},
 {id:"coding",name:"Coding practice",icon:"⌘",category:"Technical",description:"Understand web development by writing, debugging, and building real things.",target:"Build useful projects",status:"active"},
 {id:"form11",name:"FORM11 TECH STUDIOS",icon:"↗",category:"Business",description:"Turn strong portfolio work and targeted business development into paid delivery.",target:"Create real client opportunities",status:"active"},
 {id:"boxing",name:"Boxing YouTube",icon:"▷",category:"Creative",description:"Make cinematic, story-driven boxing videos from research through publishing.",target:"Publish accurate, compelling videos",status:"active"},
 {id:"guitar",name:"Guitar",icon:"♬",category:"Personal",description:"Build consistent guitar skills for church playing and lead-style ideas.",target:"One dedicated 30-minute lesson weekly",status:"active"},
 {id:"maintenance",name:"Personal maintenance",icon:"✳",category:"Personal",description:"Review the week, organize priorities, and protect reasonable recovery space.",target:"A realistic plan for next week",status:"active"}
];
const PROJECT_SEEDS = [
 {id:"jamb-maths",goalId:"jamb",name:"JAMB Mathematics",description:"Topic lessons, practice sets, mistakes, and revision.",status:"active"},
 {id:"jamb-physics",goalId:"jamb",name:"JAMB Physics",description:"Understand concepts and solve exam-style questions.",status:"active"},
 {id:"jamb-chem",goalId:"jamb",name:"JAMB Chemistry",description:"Build topic knowledge and review errors.",status:"active"},
 {id:"jamb-english",goalId:"jamb",name:"JAMB Use of English",description:"Comprehension, lexis, grammar, and practice.",status:"active"},
 {id:"bandlab-track",goalId:"music",name:"BandLab — current ideas",description:"Keep experiments and tracks moving across sessions.",status:"active"},
 {id:"web-practice",goalId:"coding",name:"Web development practice",description:"Responsive layouts, CSS, JavaScript, and debugging.",status:"active"},
 {id:"agency-pipeline",goalId:"form11",name:"FORM11 client pipeline",description:"Client-ready examples, targeted outreach, and delivery.",status:"active"},
 {id:"boxing-video",goalId:"boxing",name:"Current boxing video",description:"Move one story through the video production pipeline.",status:"active"},
 {id:"guitar-routine",goalId:"guitar",name:"Weekly guitar practice",description:"Technique, chord transitions, and musical application.",status:"active"},
 {id:"weekly-review",goalId:"maintenance",name:"Weekly review",description:"Review actual progress and make next week realistic.",status:"active"}
];
const ROTATION_SEEDS = [
 {day:0,mission:"Build your maths confidence",why:"Mathematics is a core JAMB subject. Regular topic practice helps expose gaps before they become exam-day surprises.",primaryGoal:"jamb",supportGoals:["music"],taskTitles:["Study one JAMB Mathematics topic","Solve a focused Mathematics question set","Explore or develop one BandLab idea"]},
 {day:1,mission:"Strengthen Physics understanding",why:"Physics improves through connecting concepts to worked examples and then solving questions independently.",primaryGoal:"jamb",supportGoals:["coding","form11"],taskTitles:["Learn or revise one Physics topic","Write one small coding exercise","Complete one useful FORM11 business action"]},
 {day:2,mission:"Make Chemistry more familiar",why:"Active recall and reviewing mistakes build durable Chemistry knowledge.",primaryGoal:"jamb",supportGoals:["music","guitar"],taskTitles:["Study one JAMB Chemistry topic","Develop a BandLab idea or sound","Complete the weekly guitar lesson"]},
 {day:3,mission:"Sharpen English and move a story forward",why:"English practice supports the full JAMB result, while a clear production step keeps your boxing video moving.",primaryGoal:"jamb",supportGoals:["boxing","form11"],taskTitles:["Practice one Use of English skill","Advance the current boxing video by one stage","Complete one targeted FORM11 action"]},
 {day:4,mission:"Turn maths knowledge into exam practice",why:"Practice reveals whether you can use a concept without relying on the lesson in front of you.",primaryGoal:"jamb",supportGoals:["coding","music"],taskTitles:["Solve JAMB Mathematics questions and review errors","Build or debug one web component","Arrange or review a BandLab project"]},
 {day:5,mission:"Move the boxing video toward publication",why:"Story, research, and editing progress best in clear stages; finishing one stage is meaningful progress.",primaryGoal:"boxing",supportGoals:["music","form11"],taskTitles:["Advance the boxing video production pipeline","Create or refine a BandLab track","Complete one FORM11 client-development action"]},
 {day:6,mission:"Review what you know and reset the week",why:"A short test and honest weekly review show what to repeat, what to improve, and what can wait.",primaryGoal:"jamb",supportGoals:["music","maintenance"],taskTitles:["Take a mixed JAMB revision set","Develop one BandLab idea","Review the week and adjust next week's plan"]}
];
const TASK_SEEDS = [
 ["Study one JAMB Mathematics topic","Choose one syllabus topic, learn the core idea, and explain it in your own words.","jamb","jamb-maths",0,4,"Complete a focused lesson and write a short explanation from memory."],
 ["Solve a focused Mathematics question set","Solve a small set of exam-style questions without looking at worked answers first. Record mistakes.","jamb","jamb-maths",0,3,"Attempt 10 questions and review every mistake."],
 ["Explore or develop one BandLab idea","Open a current idea or start a small sound experiment. Save the session so you can resume it.","music","bandlab-track",0,2,"Save one idea and add a note about the next step."],
 ["Learn or revise one Physics topic","Work through one concept, then solve questions that require applying it.","jamb","jamb-physics",1,4,"Explain the concept and solve 5 questions."],
 ["Write one small coding exercise","Write the code yourself. Test it, inspect what breaks, and explain why it works.","coding","web-practice",1,2,"Build and test one small component or exercise."],
 ["Complete one useful FORM11 business action","Choose a client-facing action: improve a demo only if needed, prepare an offer, research a fit, or send a tailored proposal.","form11","agency-pipeline",1,2,"Save a tangible business output or record a targeted opportunity."],
 ["Study one JAMB Chemistry topic","Learn the key ideas and test recall before checking notes.","jamb","jamb-chem",2,4,"Write a concise recall summary and answer 5 questions."],
 ["Develop a BandLab idea or sound","Experiment with one sound, rhythm, melody, or arrangement and save the result.","music","bandlab-track",2,2,"Save a musical idea and record what to try next."],
 ["Complete the weekly guitar lesson","Practice one technique or chord transition, then apply it to a song or musical phrase.","guitar","guitar-routine",2,2,"Complete one dedicated 30-minute lesson and note the focus."],
 ["Practice one Use of English skill","Choose comprehension, lexis, grammar, or another JAMB English area and practice deliberately.","jamb","jamb-english",3,4,"Complete a focused practice set and review mistakes."],
 ["Advance the current boxing video by one stage","Continue the current boxing-only video pipeline: research, angle, script, narration, footage, edit, review, or packaging.","boxing","boxing-video",3,3,"Save a concrete artifact or move the project to its next stage."],
 ["Complete one targeted FORM11 action","Choose one high-value client development or delivery task instead of endlessly redesigning the agency site.","form11","agency-pipeline",3,2,"Produce one client-ready asset, tailored proposal, or delivery milestone."],
 ["Solve JAMB Mathematics questions and review errors","Work from memory first, then classify mistakes as concept, method, or careless error.","jamb","jamb-maths",4,4,"Attempt 15 questions or a manageable set and record the main weak point."],
 ["Build or debug one web component","Work on one real component. Inspect the result at desktop and mobile widths.","coding","web-practice",4,2,"Make one component work and explain the fix in your own words."],
 ["Arrange or review a BandLab project","Listen through a saved project and improve one area such as arrangement, transitions, or balance.","music","bandlab-track",4,2,"Save a revision and note the next improvement."],
 ["Advance the boxing video production pipeline","Choose the next unfinished stage for the current boxing video and make a tangible contribution.","boxing","boxing-video",5,4,"Save one meaningful production milestone."],
 ["Create or refine a BandLab track","Build on an existing idea rather than starting over by default.","music","bandlab-track",5,2,"Save a new section, arrangement change, or exported draft."],
 ["Complete one FORM11 client-development action","Work on a relevant opportunity, proposal, service offer, or delivery process.","form11","agency-pipeline",5,2,"Record the concrete output and the next business action."],
 ["Take a mixed JAMB revision set","Test topics already studied across subjects, then identify one weakness to revisit.","jamb","jamb-maths",6,4,"Complete a mixed practice set and record score and weak topics."],
 ["Develop one BandLab idea","Give music its own meaningful session; experiment, arrange, or review an idea.","music","bandlab-track",6,2,"Save the session and define the next action."],
 ["Review the week and adjust next week's plan","Review completed, deferred, and partially completed work. Make the next plan manageable.","maintenance","weekly-review",6,3,"Record what worked, what was neglected, and one adjustment."]
];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const dateKey = d => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const todayDay = () => (new Date().getDay()+6)%7;
const weekStart = (date=new Date()) => {const d=new Date(date.getFullYear(),date.getMonth(),date.getDate());d.setDate(d.getDate()-((d.getDay()+6)%7));return d;};
const uid = prefix => `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`;
const esc = s => String(s ?? "").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmtDate = (d, opts={weekday:"long",month:"long",day:"numeric"}) => new Intl.DateTimeFormat(undefined,opts).format(d);
const validStatuses = ["planned","ready","in-progress","completed","deferred","skipped"];
let state, activeView="today", selectedDay=todayDay(), activeTaskId=null, showAllTasks=false, progressFilter="all", storageLoadError=false;
function starterData(){
 const goals=GOAL_SEEDS.map(g=>({...g,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}));
 const projects=PROJECT_SEEDS.map(p=>({...p,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}));
 const tasks=TASK_SEEDS.map((t,i)=>({id:`starter-${i+1}`,title:t[0],description:t[1],goalId:t[2],projectId:t[3],day:t[4],priority:t[5],status:"planned",criteria:t[6],deadline:"",dependencyId:"",notes:"",createdAt:new Date().toISOString(),completedAt:null,startedAt:null,deferredReason:"",isStarter:true}));
 return {schemaVersion:SCHEMA_VERSION,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),goals,projects,tasks,rotation:structuredClone(ROTATION_SEEDS),events:[],weeklyReviews:{},settings:{targetScore:320,weekStartsOn:"monday"},currentBoxingStage:"Topic selection"};
}
function normalizeData(raw){
 if(!raw||typeof raw!=="object"||!Array.isArray(raw.goals)||!Array.isArray(raw.projects)||!Array.isArray(raw.tasks)) throw new Error("This backup does not look like a DAYFRAME data file.");
 const goals=raw.goals.filter(x=>x&&typeof x.id==="string"&&typeof x.name==="string").map(g=>({...g,status:["active","paused","completed"].includes(g.status)?g.status:"active"}));
 const goalIds=new Set(goals.map(g=>g.id));
 const projects=raw.projects.filter(x=>x&&typeof x.id==="string"&&goalIds.has(x.goalId)).map(p=>({...p,status:["active","paused","completed"].includes(p.status)?p.status:"active"}));
 const projectIds=new Set(projects.map(p=>p.id));
 const seen=new Set();
 const tasks=raw.tasks.filter(x=>x&&typeof x.id==="string"&&typeof x.title==="string"&&!seen.has(x.id)&&seen.add(x.id)).map(t=>({...t,goalId:goalIds.has(t.goalId)?t.goalId:"",projectId:projectIds.has(t.projectId)?t.projectId:"",day:Number.isInteger(t.day)&&t.day>=0&&t.day<7?t.day:todayDay(),priority:Math.min(4,Math.max(1,Number(t.priority)||2)),status:validStatuses.includes(t.status)?t.status:"planned",notes:typeof t.notes==="string"?t.notes:"",criteria:typeof t.criteria==="string"?t.criteria:"",dependencyId:typeof t.dependencyId==="string"?t.dependencyId:""}));
 const taskIds=new Set(tasks.map(t=>t.id)); tasks.forEach(t=>{if(!taskIds.has(t.dependencyId)||t.dependencyId===t.id)t.dependencyId="";});
 const rotation=Array.isArray(raw.rotation)&&raw.rotation.length===7?raw.rotation.map((r,i)=>({...ROTATION_SEEDS[i],...r,day:i,mission:String(r.mission||ROTATION_SEEDS[i].mission),why:String(r.why||ROTATION_SEEDS[i].why),taskTitles:Array.isArray(r.taskTitles)?r.taskTitles.slice(0,6).map(String):ROTATION_SEEDS[i].taskTitles})):structuredClone(ROTATION_SEEDS);
 return {...raw,schemaVersion:SCHEMA_VERSION,goals,projects,tasks,rotation,events:Array.isArray(raw.events)?raw.events.slice(-3000):[],weeklyReviews:raw.weeklyReviews&&typeof raw.weeklyReviews==="object"?raw.weeklyReviews:{},settings:{targetScore:320,weekStartsOn:"monday",...(raw.settings||{})}};
}
function loadData(){
 try{const raw=localStorage.getItem(STORAGE_KEY);if(raw)return normalizeData(JSON.parse(raw));}
 catch(e){storageLoadError=true;console.error("DAYFRAME storage could not be loaded:",e);showToast("Saved data could not be read. It has not been cleared. Import a backup before making changes.", "error");}
 try{return starterData();}catch(e){return starterData();}
}
function persist(){
 if(storageLoadError){showToast("Saving is paused because existing saved data could not be read. Import a valid backup or explicitly reset data in Settings.","error");return false;}
 try{state.updatedAt=new Date().toISOString();localStorage.setItem(STORAGE_KEY,JSON.stringify(state));$("#storage-state").textContent="Your data stays on this device.";return true;}
 catch(e){$("#storage-state").textContent="Could not save — storage may be full.";showToast("Could not save your changes. Export a backup and check available browser storage.", "error");return false;}
}
function logEvent(type,task,detail=""){
 state.events.push({id:uid("event"),type,taskId:task?.id||null,title:task?.title||"",goalId:task?.goalId||"",projectId:task?.projectId||"",day:task?.day??selectedDay,detail,at:new Date().toISOString()});
 if(state.events.length>3000)state.events=state.events.slice(-3000);
}
function goal(id){return state.goals.find(g=>g.id===id);}
function project(id){return state.projects.find(p=>p.id===id);}
function task(id){return state.tasks.find(t=>t.id===id);}
function goalName(id){return goal(id)?.name||"Unassigned";}
function projectName(id){return project(id)?.name||"";}
function taskDone(t){return t.status==="completed";}
function taskOpen(t){return !["completed","skipped"].includes(t.status);}
function depsMet(t){return !t.dependencyId||taskDone(task(t.dependencyId)||{});}
function dueUrgency(t){if(!t.deadline||taskDone(t))return 0;const days=Math.ceil((new Date(t.deadline+"T23:59:59")-new Date())/86400000);return days<0?3:days===0?2:days<=2?1:0;}
function rankTask(t,day){
 let score=0;
 if(t.day===day)score+=35; else score-=Math.min(22,Math.abs(t.day-day)*4);
 score+=t.priority*5;
 score+=dueUrgency(t)*18;
 if(t.status==="in-progress")score+=22;
 if(t.status==="ready")score+=10;
 if(!depsMet(t))score-=100;
 if(t.status==="deferred")score-=4;
 if(t.status==="skipped"||t.status==="completed")score-=1000;
 if(t.day!==day&&t.day<day&&t.status==="planned")score-=9;
 return score;
}
function recommendation(day=todayDay()){
 const candidates=state.tasks.filter(t=>taskOpen(t)&&depsMet(t)&&goal(t.goalId)?.status!=="paused"&&project(t.projectId)?.status!=="paused");
 candidates.sort((a,b)=>rankTask(b,day)-rankTask(a,day)||a.createdAt?.localeCompare(b.createdAt||"")||a.title.localeCompare(b.title));
 return candidates[0]||null;
}
function taskReason(t,day=todayDay()){
 if(t.status==="in-progress")return "You already started this. Resume it before opening another loop.";
 if(dueUrgency(t)>=2)return "Its deadline is urgent, so it deserves attention before lower-priority work.";
 if(t.day===day)return "It belongs to today's planned rotation and supports the day's main mission.";
 if(t.day<day)return "This is unfinished earlier-week work worth reconsidering, without moving every missed task forward.";
 return "It is the highest-ranked ready action after today's priorities and dependencies.";
}
function dayTasks(day,{includeClosed=true}={}){
 return state.tasks.filter(t=>t.day===day&&(includeClosed||taskOpen(t))).sort((a,b)=>b.priority-a.priority||a.createdAt.localeCompare(b.createdAt));
}
function dayDonePct(day){const ts=dayTasks(day);return ts.length?Math.round(ts.filter(taskDone).length/ts.length*100):0;}
function dayMission(day){return state.rotation[day]||ROTATION_SEEDS[day];}
function startTask(id){
 const t=task(id);if(!t)return;
 if(!depsMet(t)){showToast("Finish its prerequisite before starting this task.","error");return;}
 if(t.status==="completed"||t.status==="skipped"){showToast("This task is already closed. Edit it if you need to reopen it.");return;}
 t.status="in-progress";t.startedAt=t.startedAt||new Date().toISOString();activeTaskId=t.id;logEvent("started",t);persist();render();
}
function completeTask(id){
 const t=task(id);if(!t)return;
 t.status="completed";t.completedAt=new Date().toISOString();activeTaskId=null;logEvent("completed",t);persist();render();showToast("Task completed. Your progress has been saved.","success");
}
function deferTask(id){
 const t=task(id);if(!t)return;
 const reason=prompt("Why are you deferring this task? (Optional — helps the next weekly review)","");if(reason===null)return;
 t.status="deferred";t.deferredReason=reason.trim();activeTaskId=null;logEvent("deferred",t,t.deferredReason);persist();render();showToast("Deferred — it remains in your history and can be resumed.");
}
function skipTask(id){
 const t=task(id);if(!t)return;
 const reason=prompt("Why are you skipping this task? (Optional)","");if(reason===null)return;
 t.status="skipped";t.deferredReason=reason.trim();activeTaskId=null;logEvent("skipped",t,t.deferredReason);persist();render();showToast("Task skipped and recorded.");
}
function resumeTask(id){const t=task(id);if(!t)return;t.status="in-progress";t.startedAt=t.startedAt||new Date().toISOString();activeTaskId=t.id;logEvent("resumed",t);persist();render();}
function addTask(data){
 const t={id:uid("task"),title:data.title.trim(),description:data.description.trim(),goalId:data.goalId,projectId:data.projectId,day:Number(data.day),priority:Number(data.priority),status:"planned",criteria:data.criteria.trim(),deadline:data.deadline,dependencyId:data.dependencyId,notes:"",createdAt:new Date().toISOString(),completedAt:null,startedAt:null,deferredReason:"",isStarter:false};
 if(t.dependencyId===t.id)throw new Error("A task cannot depend on itself.");
 state.tasks.push(t);logEvent("created",t);persist();render();showToast("Task created.");
}
function openTaskDialog(id=null,day=selectedDay){
 const dlg=$("#task-dialog"),t=id?task(id):null;
 $("#task-dialog-title").textContent=t?"Edit task":"Create a task";
 $("#task-id").value=t?.id||"";$("#task-title").value=t?.title||"";$("#task-description").value=t?.description||"";
 $("#task-criteria").value=t?.criteria||"";$("#task-day").value=String(t?.day??day);$("#task-priority").value=String(t?.priority??2);$("#task-deadline").value=t?.deadline||"";
 $("#task-goal").innerHTML=state.goals.map(g=>`<option value="${esc(g.id)}">${esc(g.name)}</option>`).join("");
 $("#task-project").innerHTML='<option value="">No project</option>'+state.projects.map(p=>`<option value="${esc(p.id)}">${esc(p.name)}</option>`).join("");
 $("#task-dependency").innerHTML='<option value="">No dependency</option>'+state.tasks.filter(x=>x.id!==t?.id&&!taskDone(x)&&x.status!=="skipped").map(x=>`<option value="${esc(x.id)}">${esc(x.title)}</option>`).join("");
 $("#task-goal").value=t?.goalId||state.rotation[day]?.primaryGoal||"jamb";syncProjectOptions(t?.projectId||"");$("#task-dependency").value=t?.dependencyId||"";
 dlg.showModal();$("#task-title").focus();
}
function syncProjectOptions(selected=""){
 const gid=$("#task-goal").value;const list=state.projects.filter(p=>p.goalId===gid);
 $("#task-project").innerHTML='<option value="">No project</option>'+list.map(p=>`<option value="${esc(p.id)}">${esc(p.name)}</option>`).join("");
 $("#task-project").value=list.some(p=>p.id===selected)?selected:"";
}
function openNote(id){const t=task(id);if(!t)return;$("#note-task-id").value=id;$("#note-text").value=t.notes||"";$("#note-dialog").showModal();}
function showToast(message,type=""){const el=document.createElement("div");el.className="toast "+type;el.textContent=message;$("#toast-region").append(el);setTimeout(()=>el.remove(),4200);}
function nav(view){activeView=view;render();$$("[data-nav]").forEach(b=>b.classList.toggle("active",b.dataset.nav===view));window.scrollTo({top:0,behavior:"smooth"});}
function header(title){$("#page-label").textContent=title.toUpperCase();$$("[data-nav]").forEach(b=>b.classList.toggle("active",b.dataset.nav===activeView));}
function intro(eyebrow,title,description,action=""){return `<div class="page-intro"><div><p class="eyebrow">${esc(eyebrow)}</p><h1>${title}</h1><p>${description}</p></div>${action?`<div class="intro-action">${action}</div>`:""}</div>`;}
function pill(text,cls=""){return `<span class="pill ${cls}">${esc(text)}</span>`;}
function taskRow(t,{current=false}={}){
 const closed=taskDone(t),dep=!depsMet(t),due=dueUrgency(t),statusText={"planned":"Planned","ready":"Ready","in-progress":"In progress","completed":"Completed","deferred":"Deferred","skipped":"Skipped"}[t.status]||t.status;
 return `<article class="task-row ${current?"current":""} ${closed?"done":""}" data-task-row="${esc(t.id)}">
 <button class="task-check" data-action="${closed?"reopen":"complete"}" data-id="${esc(t.id)}" aria-label="${closed?"Reopen":"Complete"} ${esc(t.title)}">${closed?"✓":"✓"}</button>
 <div class="task-main"><div class="task-title">${esc(t.title)}</div><div class="task-desc">${esc(t.description||"No instructions added yet.")}</div><div class="task-meta">${pill(goalName(t.goalId))}${pill(statusText,t.status==="completed"?"green":t.status==="in-progress"?"lime":t.status==="deferred"?"lav":"")}${t.deadline?pill(`Due ${t.deadline}`,due?"coral":""): ""}${dep?pill("Blocked by prerequisite","coral"):""}${t.notes?pill("Has notes","lav"):""}</div></div>
 <div class="task-actions">${!closed&&!dep?`<button class="tiny-action" data-action="${t.status==="in-progress"?"resume":"start"}" data-id="${esc(t.id)}">${t.status==="in-progress"?"Resume":"Start"}</button>`:""}<button class="tiny-action" data-action="edit" data-id="${esc(t.id)}">Edit</button><button class="tiny-action" data-action="note" data-id="${esc(t.id)}">Note</button></div></article>`;
}
function renderToday(){
 const d=todayDay(),mission=dayMission(d),ts=dayTasks(d),done=ts.filter(taskDone).length,rec=(activeTaskId&&task(activeTaskId)&&taskOpen(task(activeTaskId))?task(activeTaskId):null)||recommendation(d),next=rec?taskReason(rec,d):"Your planned tasks are complete. You can stop here or choose a useful task from another day.";
 const remaining=ts.filter(t=>taskOpen(t)).length,shown=showAllTasks?ts:ts.filter(t=>taskOpen(t));
 return `${intro("YOUR FRAME · "+fmtDate(new Date(),{month:"long",day:"numeric",year:"numeric"}),"Make the day count.","One clear mission. A realistic set of actions. Progress you can trust.",'<button class="button secondary" data-action="add-task">＋ Add task</button>')}
 <section class="mission-banner"><div class="mission-copy"><span class="mission-tag">TODAY'S MISSION</span><h2>${esc(mission.mission)}</h2><p>${esc(mission.why)}</p></div><div class="mission-progress"><div class="progress-head"><span>Mission progress</span><strong>${ts.length?Math.round(done/ts.length*100):0}%</strong></div><div class="progress-track"><div class="progress-fill" style="width:${ts.length?done/ts.length*100:0}%"></div></div><div class="progress-caption">${done} of ${ts.length} planned tasks complete · ${remaining} still open</div></div></section>
 <div class="today-grid"><div><div class="section-head"><h2>Next recommended action</h2><span>${rec?"Selected for you":"No task needed"}</span></div>
 ${rec?`<section class="task-detail"><div class="detail-top"><h3>${esc(rec.title)}</h3>${pill(rec.status==="in-progress"?"In progress":"Ready",rec.status==="in-progress"?"lime":"")}</div><p class="detail-body">${esc(rec.description||"No instructions added yet.")}</p><div class="task-meta">${pill(goalName(rec.goalId),"lime")}${projectName(rec.projectId)?pill(projectName(rec.projectId)):""}${rec.deadline?pill("Due "+rec.deadline,dueUrgency(rec)?"coral":""):""}</div><div class="criteria-box"><b>Completion criteria</b>${esc(rec.criteria||"Write a short note describing what done means.")}</div><p class="inline-note" style="margin:12px 0 0">${esc(taskReason(rec,d))}</p><div class="detail-buttons">${rec.status==="in-progress"?`<button class="button primary" data-action="complete" data-id="${esc(rec.id)}">✓ Mark complete</button>`:`<button class="button primary" data-action="start" data-id="${esc(rec.id)}">Start task →</button>`}<button class="button secondary" data-action="note" data-id="${esc(rec.id)}">Add a note</button><button class="button secondary" data-action="choose-another">Choose another</button><button class="button secondary" data-action="defer" data-id="${esc(rec.id)}">Defer</button></div></section>`:`<div class="empty-state"><strong>You've reached a natural stopping point.</strong>There are no ready tasks to recommend. Review the week or add a task only if it genuinely matters.</div>`}
 <div class="section-head"><h2>Today's plan</h2><button class="quiet-link" data-action="toggle-tasks">${showAllTasks?"Show open only":"Show all "+ts.length+" tasks"}</button></div>
 <div class="task-stack">${shown.length?shown.map(t=>taskRow(t,{current:t.id===rec?.id})).join(""):`<div class="empty-state"><strong>No tasks planned for today.</strong>Add a useful next action, or use the weekly plan to see what belongs here.</div>`}</div></div>
 <aside class="today-side"><section class="side-panel"><h3>Why this is the plan</h3><div class="why-list"><div class="why-item"><span class="why-icon">01</span><span><b style="color:#e0e6ed">Primary focus</b><br>${esc(goalName(mission.primaryGoal))} stays central in today's rotation.</span></div><div class="why-item"><span class="why-icon">02</span><span><b style="color:#e0e6ed">Keep momentum</b><br>Supporting work stays small enough to make progress without crowding the day.</span></div><div class="why-item"><span class="why-icon">03</span><span><b style="color:#e0e6ed">Real progress</b><br>Only tasks you explicitly complete count as completed.</span></div></div></section>
 <section class="side-panel"><div class="section-head"><h3>Today's focus</h3>${pill(DAY_SHORT[d],"lime")}</div><div class="why-list">${mission.supportGoals.map((gid,i)=>`<div class="why-item"><span class="why-icon">${i?"＋":"↗"}</span><span>${esc(goalName(gid))}<br><span style="color:#6f7c8e">${state.tasks.filter(t=>t.day===d&&t.goalId===gid&&taskOpen(t)).length} open task(s)</span></span></div>`).join("")}</div><button class="button secondary" style="width:100%;margin-top:15px" data-nav="week">View full week →</button></section>
 <section class="side-panel"><h3>Need a different task?</h3><p class="inline-note">Choosing another task does not erase the current task's notes or status. Pick another ready action from your plan.</p><button class="button secondary" style="width:100%;margin-top:12px" data-action="choose-another">Choose another task</button></section></aside></div>`;
}
function renderWeek(){
 const monday=weekStart(),dateForDay=d=>new Date(monday.getFullYear(),monday.getMonth(),monday.getDate()+d),mission=dayMission(selectedDay),ts=dayTasks(selectedDay);
 return `${intro("WEEKLY FRAME","A week with a shape.","Your default rotation keeps the important goals in view without assigning every goal to every day.",'<button class="button primary" data-action="add-task">＋ Add task</button>')}
 <div class="week-days">${DAYS.map((name,i)=>{const d=dateForDay(i),t=dayTasks(i),done=t.filter(taskDone).length;return `<button class="day-card ${selectedDay===i?"selected":""} ${todayDay()===i?"today":""}" data-action="select-day" data-day="${i}"><span class="day-name">${DAY_SHORT[i]} ${todayDay()===i?"· TODAY":""}</span><span class="day-num">${d.getDate()}</span><span class="day-summary">${done}/${t.length} tasks complete</span><span class="day-dot-row">${t.slice(0,5).map(x=>`<i class="day-dot ${taskDone(x)?"done":x.status==="in-progress"?"active":""}"></i>`).join("")}</span></button>`}).join("")}</div>
 <section class="week-detail"><div class="week-detail-head"><div><p class="eyebrow">${DAYS[selectedDay].toUpperCase()} · ${fmtDate(dateForDay(selectedDay),{month:"long",day:"numeric"})}</p><h2>${esc(mission.mission)}</h2><p>${esc(mission.why)}</p></div><button class="button secondary" data-action="add-task-day">＋ Task for this day</button></div>
 <div class="week-lanes"><div><div class="lane-title">Primary mission · ${esc(goalName(mission.primaryGoal))}</div><div class="task-stack">${ts.filter(t=>t.goalId===mission.primaryGoal).length?ts.filter(t=>t.goalId===mission.primaryGoal).map(t=>taskRow(t)).join(""):'<div class="empty-state">No primary tasks on this day yet.</div>'}</div></div><div><div class="lane-title">Supporting work</div><div class="task-stack">${ts.filter(t=>t.goalId!==mission.primaryGoal).length?ts.filter(t=>t.goalId!==mission.primaryGoal).map(t=>taskRow(t)).join(""):'<div class="empty-state">No supporting tasks planned. Keep the day manageable.</div>'}</div></div></div></section>
 <p class="inline-note" style="margin-top:14px">Missed work stays visible in its original context. Recommendations reconsider unfinished tasks; the app does not automatically duplicate or mark anything complete.</p>`;
}
function goalMetrics(g){const ts=state.tasks.filter(t=>t.goalId===g.id),done=ts.filter(taskDone).length,open=ts.filter(taskOpen).length;return {ts,done,open,pct:ts.length?Math.round(done/ts.length*100):0};}
function renderGoals(){
 return `${intro("LONG-TERM DIRECTION","Goals worth returning to.","Your goals are connected to projects and real actions. Progress reflects completed tasks, not how many tasks you created.",'<button class="button secondary" data-action="add-goal">＋ Add goal</button>')}
 <div class="goal-grid">${state.goals.map(g=>{const m=goalMetrics(g);return `<article class="goal-card"><div class="goal-card-top"><div class="goal-icon">${esc(g.icon||"◎")}</div><select class="status-select" data-goal-status="${esc(g.id)}" aria-label="Goal status">${["active","paused","completed"].map(s=>`<option ${g.status===s?"selected":""} value="${s}">${s[0].toUpperCase()+s.slice(1)}</option>`).join("")}</select></div><h3>${esc(g.name)}</h3><p>${esc(g.description||"No description yet.")}</p><div class="goal-footer"><span>${esc(g.category||"Goal")}</span><strong>${m.done} done · ${m.open} open</strong></div><div class="progress-track"><div class="progress-fill" style="width:${m.pct}%;background:${g.id==="maintenance"?"var(--lav)":"var(--lime)"}"></div></div><div class="goal-footer"><span>${m.pct}% of created tasks complete</span><span>${m.ts.length} tasks</span></div><div class="goal-actions"><button class="button secondary" data-action="goal-tasks" data-id="${esc(g.id)}">View tasks</button><button class="button secondary" data-action="edit-goal" data-id="${esc(g.id)}">Edit goal</button><button class="button secondary" data-action="add-project" data-id="${esc(g.id)}">＋ Project</button></div></article>`}).join("")}</div>`;
}
function renderProjects(){
 return `${intro("ACTIVE WORK","Projects in motion.","A project gives a goal somewhere concrete to go. Every project shows its open work and the next available action.",'<button class="button primary" data-action="add-project">＋ Add project</button>')}
 <div class="project-grid">${state.projects.map(p=>{const ts=state.tasks.filter(t=>t.projectId===p.id),done=ts.filter(taskDone).length,next=ts.filter(t=>taskOpen(t)&&depsMet(t)).sort((a,b)=>rankTask(b,todayDay())-rankTask(a,todayDay()))[0];return `<article class="project-card"><div class="project-card-top"><span class="pill">${esc(goalName(p.goalId))}</span><select class="status-select" data-project-status="${esc(p.id)}" aria-label="Project status">${["active","paused","completed"].map(s=>`<option ${p.status===s?"selected":""} value="${s}">${s[0].toUpperCase()+s.slice(1)}</option>`).join("")}</select></div><h3>${esc(p.name)}</h3><p>${esc(p.description||"No description yet.")}</p><div class="project-stats"><span><b>${done}</b> completed</span><span><b>${ts.filter(taskOpen).length}</b> open</span><span><b>${ts.length?Math.round(done/ts.length*100):0}%</b> progress</span></div><div class="project-next"><b>NEXT ACTION</b>${next?esc(next.title):"No ready task. Add one or check task dependencies."}</div><div class="goal-actions"><button class="button secondary" data-action="project-tasks" data-id="${esc(p.id)}">View tasks</button><button class="button secondary" data-action="edit-project" data-id="${esc(p.id)}">Edit project</button><button class="button secondary" data-action="add-task-project" data-id="${esc(p.id)}">＋ Task</button></div></article>`}).join("")}</div>`;
}
function weekEvents(){
 const start=weekStart();return state.events.filter(e=>{const d=new Date(e.at);return d>=start&&d<new Date(start.getFullYear(),start.getMonth(),start.getDate()+7);});
}
function renderProgress(){
 const now=new Date(),events=weekEvents(),completed=events.filter(e=>e.type==="completed"),deferred=events.filter(e=>e.type==="deferred"),started=events.filter(e=>["started","resumed"].includes(e.type)),weekTasks=state.tasks.filter(t=>t.completedAt&&new Date(t.completedAt)>=weekStart()),byGoal=state.goals.map(g=>({g,n:weekTasks.filter(t=>t.goalId===g.id).length})).filter(x=>x.n).sort((a,b)=>b.n-a.n);
 const reviews=Object.entries(state.weeklyReviews||{}).sort((a,b)=>b[0].localeCompare(a[0]));
 return `${intro("EVIDENCE, NOT HYPE","Your progress, honestly.","Completed work and saved activity tell the story. Planned tasks do not count as accomplishments.",'<button class="button secondary" data-action="weekly-review">Write weekly review</button>')}
 <div class="progress-hero"><div class="stat-card highlight"><div class="stat-label">Tasks completed this week</div><div class="stat-value">${weekTasks.length}</div><div class="stat-foot">Explicitly marked complete</div></div><div class="stat-card"><div class="stat-label">Tasks deferred this week</div><div class="stat-value">${new Set(deferred.map(e=>e.taskId).filter(Boolean)).size}</div><div class="stat-foot">Deferred work remains visible, not erased</div></div><div class="stat-card"><div class="stat-label">Work sessions started</div><div class="stat-value">${started.length}</div><div class="stat-foot">Started or resumed tasks recorded this week</div></div><div class="stat-card"><div class="stat-label">Completion rate · this week's tasks</div><div class="stat-value">${(()=>{const ts=state.tasks.filter(t=>t.day>=0&&t.day<7);return ts.length?Math.round(ts.filter(taskDone).length/ts.length*100):0})()}%</div><div class="stat-foot">Current task state, not a streak</div></div></div>
 <section class="side-panel" style="margin-bottom:18px"><div class="section-head"><h3>Completed work by goal</h3><span>This week</span></div>${byGoal.length?`<div class="why-list">${byGoal.map(x=>`<div><div class="progress-head"><span>${esc(x.g.name)}</span><strong>${x.n}</strong></div><div class="progress-track"><div class="progress-fill" style="width:${Math.min(100,x.n/Math.max(...byGoal.map(y=>y.n))*100)}%"></div></div></div>`).join("")}</div>`:'<div class="empty-state">No completed tasks recorded this week yet. Start small and record real outcomes.</div>'}</section>
 <section class="side-panel" style="margin-bottom:18px"><div class="section-head"><h3>Activity history</h3><div class="toolbar"><select id="progress-filter"><option value="all" ${progressFilter==="all"?"selected":""}>All activity</option><option value="completed" ${progressFilter==="completed"?"selected":""}>Completed</option><option value="deferred" ${progressFilter==="deferred"?"selected":""}>Deferred</option><option value="started" ${progressFilter==="started"?"selected":""}>Started / resumed</option></select></div></div><div class="history-list">${state.events.filter(e=>progressFilter==="all"||e.type===progressFilter||(progressFilter==="started"&&e.type==="resumed")).slice().reverse().slice(0,60).map(e=>`<div class="history-item"><div class="history-date">${esc(fmtDate(new Date(e.at),{month:"short",day:"numeric",year:"numeric"}))}<br>${esc(fmtDate(new Date(e.at),{hour:undefined,minute:undefined,weekday:undefined,month:undefined,day:undefined,year:undefined}))}</div><div class="history-main"><strong>${esc(e.title||e.type)}</strong><p>${esc(e.type)} · ${esc(goalName(e.goalId))}${e.detail?" · "+esc(e.detail):""}</p></div><span class="history-count">${e.type==="completed"?"✓ Done":e.type==="deferred"?"Deferred":e.type}</span></div>`).join("")||'<div class="empty-state">No matching activity yet.</div>'}</div></section>
 <section class="side-panel"><div class="section-head"><h3>Weekly reviews</h3><span>${reviews.length} saved</span></div>${reviews.length?`<div class="history-list">${reviews.map(([key,r])=>`<article class="history-item"><div class="history-date">${esc(key)}</div><div class="history-main"><strong>${esc(r.summary||"Weekly review")}</strong><p>Worked: ${esc(r.worked||"—")}<br>Neglected: ${esc(r.neglected||"—")}<br>Change: ${esc(r.change||"—")}</p></div><button class="tiny-action" data-action="edit-review" data-id="${esc(key)}">Edit</button></article>`).join("")}</div>`:"<div class='empty-state'>A review helps turn this week's evidence into a more realistic next plan.</div>"}</section>`;
}
function renderSettings(){
 return `${intro("YOUR SYSTEM","Keep DAYFRAME realistic.","Tune the weekly rotation, protect your data, and adjust the plan without introducing clock-time scheduling.")}
 <div class="settings-layout"><section class="settings-card"><h2>Weekly rotation</h2><p>Change each day's mission and why it matters. Tasks stay assigned to their days unless you edit them.</p><div class="rotation-list">${state.rotation.map((r,i)=>`<div class="rotation-row"><b>${DAYS[i]}</b><div><label>Mission<input type="text" maxlength="100" data-rotation-mission="${i}" value="${esc(r.mission)}"></label><label>Why<textarea rows="2" maxlength="350" data-rotation-why="${i}">${esc(r.why)}</textarea></label></div></div>`).join("")}</div><button class="button primary" style="margin-top:14px" data-action="save-rotation">Save weekly plan</button><button class="button secondary" style="margin-top:14px;margin-left:5px" data-action="reset-rotation">Restore defaults</button></section>
 <div style="display:grid;gap:14px;align-content:start"><section class="settings-card"><h2>Study target</h2><p>JAMB target score and a few preferences.</p><label>Target score<input id="target-score" type="number" min="1" max="400" value="${Number(state.settings.targetScore)||320}"></label><button class="button secondary" data-action="save-preferences">Save preferences</button></section>
 <section class="settings-card"><h2>Back up your data</h2><p>Export goals, projects, tasks, notes, weekly plan, and activity history as a JSON file. Keep a copy somewhere safe.</p><div class="settings-actions"><button class="button primary" data-action="export">↓ Export backup</button><button class="button secondary" data-action="import">↑ Import backup</button></div><p class="inline-note" style="margin-top:12px">Import validates the file before replacing current data. Export first if you want a rollback point.</p></section>
 <section class="settings-card"><h2>App information</h2><p>Local-first storage · No account · No paid services. Your data is stored in this browser and does not sync to other devices.</p><div class="settings-actions"><button class="button secondary" data-action="check-update">Check for app update</button><button class="button secondary" data-action="export">Export before changes</button></div><p class="inline-note" id="app-version" style="margin-top:12px">DAYFRAME data schema ${SCHEMA_VERSION}</p></section>
 <section class="settings-card danger-zone"><h2>Reset local data</h2><p>This permanently replaces DAYFRAME data in this browser with the starter plan. Export a backup first. This does not delete any exported files.</p><button class="button danger" data-action="reset-data">Reset DAYFRAME data…</button></section></div></div>`;
}
function render(){
 header(({today:"Today",week:"Week",goals:"Goals",projects:"Projects",progress:"Progress",settings:"Settings"})[activeView]||"Today");
 const view=$("#view");
 view.innerHTML=({today:renderToday,week:renderWeek,goals:renderGoals,projects:renderProjects,progress:renderProgress,settings:renderSettings})[activeView]();
 const mobile=document.querySelector(".mobile-nav");if(mobile)mobile.remove();
 const navEl=document.createElement("nav");navEl.className="mobile-nav";navEl.setAttribute("aria-label","Mobile navigation");
 [["today","◷","Today"],["week","▦","Week"],["goals","◎","Goals"],["projects","◇","Projects"],["progress","↗","Progress"],["settings","⚙","Settings"]].forEach(([id,icon,label])=>{const b=document.createElement("button");b.dataset.nav=id;b.className=activeView===id?"active":"";b.innerHTML=`<span>${icon}</span>${label}`;navEl.append(b);});
 document.body.append(navEl);
 $("#sidebar-week").textContent=`${state.tasks.filter(taskDone).length} tasks completed`;
}
function exportData(){
 const blob=new Blob([JSON.stringify({...state,exportedAt:new Date().toISOString(),app:"DAYFRAME"},null,2)],{type:"application/json"});
 const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=`dayframe-backup-${dateKey(new Date())}.json`;document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);showToast("Backup exported. Keep it somewhere safe.","success");
}
function importData(file){
 const reader=new FileReader();reader.onerror=()=>showToast("The selected file could not be read.","error");
 reader.onload=()=>{try{const parsed=JSON.parse(reader.result);const clean=normalizeData(parsed);if(!confirm("Import this DAYFRAME backup and replace the data currently stored in this browser? Export your current data first if you may need it."))return;state=clean;storageLoadError=false;activeTaskId=null;persist();render();showToast("Backup imported successfully.","success");}catch(e){showToast(`Import failed: ${e.message||"Invalid backup file"}`,"error");}};
 reader.readAsText(file);
}
function openGoalForm(id=null){
 const g=id?goal(id):null;const name=prompt("Goal name",g?.name||"");if(name===null)return;if(!name.trim()){showToast("A goal name is required.","error");return;}
 const description=prompt("What does this goal mean?",g?.description||"")??g?.description??"";
 if(g){g.name=name.trim();g.description=description;g.updatedAt=new Date().toISOString();}
 else state.goals.push({id:uid("goal"),name:name.trim(),description,icon:"◎",category:"Personal",status:"active",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
 persist();render();showToast(g?"Goal updated.":"Goal created.");
}
function openProjectForm(id=null,goalId=null){
 const p=id?project(id):null;const name=prompt("Project name",p?.name||"");if(name===null)return;if(!name.trim()){showToast("A project name is required.","error");return;}
 const selectedGoal=goalId||p?.goalId||state.goals[0]?.id;const desc=prompt("What will this project produce?",p?.description||"")??p?.description??"";
 if(p){p.name=name.trim();p.description=desc;p.updatedAt=new Date().toISOString();}
 else state.projects.push({id:uid("project"),goalId:selectedGoal,name:name.trim(),description:desc,status:"active",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
 persist();render();showToast(p?"Project updated.":"Project created.");
}
function weeklyReview(existingKey=null){
 const key=existingKey||dateKey(weekStart());const old=state.weeklyReviews[key]||{};
 const summary=prompt("Weekly headline — what best describes this week?",old.summary||"") ;if(summary===null)return;
 const worked=prompt("What worked or was accomplished?",old.worked||"") ;if(worked===null)return;
 const neglected=prompt("What was neglected or harder than expected?",old.neglected||"") ;if(neglected===null)return;
 const change=prompt("What is one adjustment for next week?",old.change||"") ;if(change===null)return;
 state.weeklyReviews[key]={summary,worked,neglected,change,updatedAt:new Date().toISOString()};logEvent("weekly-review",null,summary);persist();render();showToast("Weekly review saved.","success");
}
function chooseAnother(){
 const candidates=state.tasks.filter(t=>taskOpen(t)&&depsMet(t)&&goal(t.goalId)?.status!=="paused").sort((a,b)=>rankTask(b,todayDay())-rankTask(a,todayDay()));
 const list=candidates.slice(0,12);if(!list.length){showToast("There are no other ready tasks. Add one or review the week.");return;}
 const pick=prompt("Choose a task by number:\n"+list.map((t,i)=>`${i+1}. ${t.title} — ${DAYS[t.day]}`).join("\n"),"1");
 if(pick===null)return;const n=Number(pick);if(!Number.isInteger(n)||n<1||n>list.length){showToast("That selection was not in the list.","error");return;}
 activeTaskId=list[n-1].id;if(activeTaskId)startTask(activeTaskId);
}
function action(action,id,el){
 const t=task(id);
 switch(action){
 case "add-task":openTaskDialog(null,todayDay());break;
 case "add-task-day":openTaskDialog(null,selectedDay);break;
 case "add-task-project":openTaskDialog(null,selectedDay);if(id){const p=project(id);if(p){$("#task-goal").value=p.goalId;syncProjectOptions(id);}}break;
 case "start":case "resume":resumeTask(id);break;
 case "complete":completeTask(id);break;
 case "reopen":if(t){t.status="planned";t.completedAt=null;logEvent("reopened",t);persist();render();showToast("Task reopened.");}break;
 case "defer":deferTask(id);break;
 case "skip":skipTask(id);break;
 case "edit":openTaskDialog(id,t?.day??selectedDay);break;
 case "note":openNote(id);break;
 case "choose-another":chooseAnother();break;
 case "toggle-tasks":showAllTasks=!showAllTasks;render();break;
 case "select-day":selectedDay=Number(el.dataset.day);render();break;
 case "goal-tasks":activeView="projects";render();showToast("Choose a project or add a task for this goal.");break;
 case "project-tasks":activeView="week";selectedDay=todayDay();render();showToast("Tasks are listed by assigned day in Week. Use task filters or edit tasks to find this project.");break;
 case "add-goal":openGoalForm();break;
 case "edit-goal":openGoalForm(id);break;
 case "add-project":openProjectForm(null,id||null);break;
 case "edit-project":openProjectForm(id);break;
 case "export":exportData();break;
 case "import":$("#import-file").click();break;
 case "reset-rotation":if(confirm("Restore the default weekly missions? Your tasks and history will stay unchanged.")){state.rotation=structuredClone(ROTATION_SEEDS);persist();render();showToast("Default weekly missions restored.");}break;
 case "save-rotation":state.rotation=state.rotation.map((r,i)=>({...r,mission:$(`[data-rotation-mission="${i}"]`).value.trim()||ROTATION_SEEDS[i].mission,why:$(`[data-rotation-why="${i}"]`).value.trim()||ROTATION_SEEDS[i].why}));persist();render();showToast("Weekly plan saved.","success");break;
 case "save-preferences":state.settings.targetScore=Math.max(1,Math.min(400,Number($("#target-score").value)||320));persist();showToast("Preferences saved.","success");break;
 case "reset-data":if(confirm("Reset all DAYFRAME data in this browser? This cannot be undone unless you have a backup.")){if(confirm("Final confirmation: replace all goals, projects, tasks, reviews, and history with the starter plan?")){state=starterData();storageLoadError=false;activeTaskId=null;persist();activeView="today";render();showToast("Starter plan restored.");}}break;
 case "weekly-review":weeklyReview();break;
 case "edit-review":weeklyReview(id);break;
 case "check-update":if("serviceWorker"in navigator){navigator.serviceWorker.getRegistration().then(r=>r?r.update():showToast("Service worker is not registered yet. Open the published app over HTTPS.","error")).then(()=>showToast("Checked for an app update. Reload if prompted."));}else showToast("Service workers are not supported in this browser.","error");break;
 }
}
document.addEventListener("click",e=>{
 const navBtn=e.target.closest("[data-nav]");if(navBtn){e.preventDefault();nav(navBtn.dataset.nav);return;}
 const close=e.target.closest("[data-close-dialog]");if(close){close.closest("dialog")?.close();return;}
 const btn=e.target.closest("[data-action]");if(btn){action(btn.dataset.action,btn.dataset.id,btn);return;}
});
document.addEventListener("change",e=>{
 if(e.target.matches("#task-goal")){syncProjectOptions("");return;}
 const gs=e.target.closest("[data-goal-status]");if(gs){const g=goal(gs.dataset.goalStatus);if(g){g.status=gs.value;persist();render();}return;}
 const ps=e.target.closest("[data-project-status]");if(ps){const p=project(ps.dataset.projectStatus);if(p){p.status=ps.value;persist();render();}return;}
 if(e.target.matches("#progress-filter")){progressFilter=e.target.value;render();return;}
});
$("#task-form").addEventListener("submit",e=>{
 e.preventDefault();const id=$("#task-id").value;
 const data={title:$("#task-title").value,description:$("#task-description").value,goalId:$("#task-goal").value,projectId:$("#task-project").value,day:$("#task-day").value,priority:$("#task-priority").value,criteria:$("#task-criteria").value,deadline:$("#task-deadline").value,dependencyId:$("#task-dependency").value};
 try{
 if(id){const t=task(id);if(!t)return;Object.assign(t,{...data,title:data.title.trim(),day:Number(data.day),priority:Number(data.priority),updatedAt:new Date().toISOString()});if(t.dependencyId===t.id)throw new Error("A task cannot depend on itself.");logEvent("edited",t);persist();$("#task-dialog").close();render();showToast("Task updated.","success");}
 else {addTask(data);$("#task-dialog").close();}
 }catch(err){showToast(err.message||"Could not save task.","error");}
});
$("#note-form").addEventListener("submit",e=>{e.preventDefault();const t=task($("#note-task-id").value);if(t){t.notes=$("#note-text").value;logEvent("note-updated",t);persist();$("#note-dialog").close();render();showToast("Note saved.","success");}});
$("#quick-add").addEventListener("click",()=>openTaskDialog(null,todayDay()));
$("#import-file").addEventListener("change",e=>{const file=e.target.files?.[0];if(file)importData(file);e.target.value="";});
document.addEventListener("change",e=>{const m=e.target.closest("[data-rotation-mission]");const w=e.target.closest("[data-rotation-why]");if(m)state.rotation[Number(m.dataset.rotationMission)].mission=m.value;if(w)state.rotation[Number(w.dataset.rotationWhy)].why=w.value;});
window.addEventListener("beforeunload",()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch(_){}});
state=loadData();
if(!state.events.length&&state.tasks.length){state.events=[];logEvent("initialized",null,"Starter plan created");persist();}
render();
if("serviceWorker"in navigator&&/^https?:$/.test(location.protocol)){
 navigator.serviceWorker.register("./service-worker.js").then(reg=>{
   if(reg.waiting&&navigator.serviceWorker.controller){updateToast(reg.waiting);}
   reg.addEventListener("updatefound",()=>{const worker=reg.installing;if(!worker)return;worker.addEventListener("statechange",()=>{if(worker.state==="installed"&&navigator.serviceWorker.controller)updateToast(worker);});});
 }).catch(err=>console.warn("DAYFRAME offline support could not register:",err));
 navigator.serviceWorker.addEventListener("controllerchange",()=>{if(!sessionStorage.getItem("dayframe.reloadedForUpdate")){sessionStorage.setItem("dayframe.reloadedForUpdate","1");location.reload();}});
}
function updateToast(worker){const wrap=document.createElement("div");wrap.className="toast";wrap.innerHTML="A DAYFRAME update is ready. <button class='quiet-link' id='apply-update'>Refresh</button>";$("#toast-region").append(wrap);wrap.querySelector("#apply-update").addEventListener("click",()=>{sessionStorage.removeItem("dayframe.reloadedForUpdate");worker.postMessage("SKIP_WAITING");});}
})();