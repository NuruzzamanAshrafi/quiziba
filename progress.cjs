const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('dist/index.html','utf8');let code=fs.readFileSync('dist/app.js','utf8');
const elements=new Map();const element=()=>({innerHTML:'',textContent:'',value:'',classList:{add(){},remove(){},contains(){return true}},setAttribute(){},remove(){},focus(){},appendChild(){}});
const document={documentElement:{dataset:{}},body:element(),getElementById(id){if(!elements.has(id))elements.set(id,element());return elements.get(id)},querySelector(s){return this.getElementById(s)},createElement(){return element()}};
const ctx={document,localStorage:{getItem(){return null},setItem(){}},window:{matchMedia:()=>({matches:false}),scrollTo(){}},Date,console,crypto:require('node:crypto').webcrypto,confirm:()=>true,alert(){},setTimeout(){}};vm.createContext(ctx);vm.runInContext(fs.readFileSync('dist/word-smart.js','utf8'),ctx);vm.runInContext(code,ctx);
vm.runInContext(`
const a=seed.find(w=>w.id==='ws1-1');
if(statusOf(a)!=='new')throw Error('initial state');
recordReview(a,false);if(statusOf(a)!=='learning'||!due().some(w=>w.id===a.id))throw Error('failed first attempt must be Learning and due');
recordReview(a,true);recordReview(a,true);if(statusOf(a)!=='learning')throw Error('two recalls should remain Learning');recordReview(a,true);if(statusOf(a)!=='learned')throw Error('three recalls should be Learned');
recordReview(a,false);if(statusOf(a)!=='learning'||p(a).streak!==0)throw Error('mistake resets learning streak');
if(p(a).attempts!==5||p(a).correct!==3)throw Error('attempt counters');
for(const n of [50,100,200]){$('#collection').value='ws1';$('#quiz-level').value='all';$('#length').value=String(n);startQuiz();if(quiz.length!==n)throw Error('quiz length '+n);if(new Set(quiz.map(q=>q.w.id)).size!==n)throw Error('repeated question');}
const first=quiz[0];const right=first.options.findIndex(w=>w.id===first.w.id);answer(right);const count=p(first.w).attempts;resumeQuiz();if(p(first.w).attempts!==count||score!==1)throw Error('resume counts answer twice');nextQ();if(qi!==1||state.activeQuiz.qi!==1)throw Error('next/resume position');
const before=quiz.length;quizSetup();if(!$('#app').innerHTML.includes('Resume quiz'))throw Error('missing resume control');
if(bookWords.some(w=>!w.sourceIssue&&!w.example))throw Error('missing example');
if(bookWords.filter(w=>w.example).length!==1678)throw Error('example count');
if(pool('all').some(w=>w.sourceIssue))throw Error('malformed source included');
console.log('PASS: levels, streaks, due dates, counters, 50/100/200 quizzes, unique questions, resume without double-counting, all 1,678 examples');
`,ctx);
