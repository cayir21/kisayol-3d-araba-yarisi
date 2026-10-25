const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const elements = new Map(), listeners = {}, buffers = new Map();
let activeBuffer, draws = [], uniforms = {};
const gl = new Proxy({
 createShader:()=>({}), getShaderParameter:()=>true, createProgram:()=>({}),
 getUniformLocation:(_,n)=>n,getAttribLocation:(_,n)=>n,
 createBuffer:()=>({}),bindBuffer:(_,b)=>activeBuffer=b,
 bufferData:(_,v)=>buffers.set(activeBuffer,Array.from(v)),
 uniform3fv:(n,v)=>uniforms[n]=v,uniform1f:(n,v)=>uniforms[n]=v,
 clear:()=>draws=[],drawArrays:()=>draws.push(buffers.get(activeBuffer)),
}, {get:(o,k)=>k in o?o[k]:(...args)=>{}});
function element(id){if(!elements.has(id))elements.set(id,{innerHTML:'',textContent:'',style:{},hidden:false,width:1280,height:800,classList:{add(){},remove(){}},setAttribute(){},getContext:()=>gl});return elements.get(id);}
const ctx = {console, Math, JSON,Float32Array, Set, Map, innerWidth:1280,innerHeight:800,devicePixelRatio:1, requestAnimationFrame:()=>{},addEventListener:(n,cb)=>listeners[n]=cb,localStorage:{getItem:()=>null,setItem(){}},document:{getElementById:element,body:element('body'),addEventListener(){},documentElement:{}},window:{}};
ctx.window=ctx;
const src=fs.readFileSync('game.js','utf8').replace('function frame(t){','window.__test={route,nearest,car:()=>car,keys:()=>keys,state:()=>state,place:(s,offset=0)=>{let p=route(s);car.x=p.x-p.tz*offset;car.z=p.z+p.tx*offset;car.angle=Math.atan2(p.tz,p.tx);previousS=wrap(s);}, progress:()=>progress};function frame(t){');
vm.runInNewContext(src,ctx);
const read=()=>JSON.parse(ctx.render_game_to_text());
const key=(code,down=true)=>listeners[down?'keydown':'keyup']({code,repeat:false,preventDefault(){}});
const step=ms=>ctx.advanceTime(ms);
const start=()=>{element('start').onclick();step(3100);assert.equal(read().mode,'racing');};
assert.equal(read().mode,'menu');
start();assert.equal(read().completedLaps,0);
key('KeyW');step(2000);key('KeyW',false);assert(read().player.speedMps>20,'W accelerates');assert(read().player.x>-25,'forward movement');
key('KeyD');step(300);key('KeyD',false);assert(read().player.heading>0,'D turns right');
key('KeyA');step(800);key('KeyA',false);assert(read().player.heading<0,'A turns left');
key('KeyS');step(3000);key('KeyS',false);assert(read().player.speedMps<0,'S brakes then reverses');
key('KeyP');let before=read();step(5000);assert.equal(read().totalSeconds,before.totalSeconds);assert.equal(read().player.x,before.player.x);key('KeyP');assert.equal(read().mode,'racing');
start();key('ArrowDown');step(4000);key('ArrowDown',false);assert(read().progressMeters<0);assert.equal(read().completedLaps,0,'reverse line crossing never counts');
key('ArrowUp');step(5000);key('ArrowUp',false);assert.equal(read().completedLaps,0,'repeated start crossing never counts');
start();ctx.__test.place(70,10);key('ArrowUp');step(4000);key('ArrowUp',false);assert(read().player.offroad);assert(read().player.speedMps<=10,'grass slows car');assert(ctx.__test.nearest(read().player.x,read().player.z).dist<=11.251,'barrier retains car');
// Drive the real physics around the circuit using only keyboard input and a lookahead controller.
start();let frames=0,maxOffset=0;let raceSnapshots=[];
while(read().mode==='racing'&&frames<18000){let s=read(),c=s.player,n=ctx.__test.nearest(c.x,c.z),p=ctx.__test.route(n.s+8+Math.abs(c.speedMps)*.22),desired=Math.atan2(p.z-c.z,p.x-c.x),e=desired-c.heading;while(e>Math.PI)e-=2*Math.PI;while(e<-Math.PI)e+=2*Math.PI;
 for(let code of ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'])key(code,false);
 let forward=ctx.__test.route(n.s+15),bend=Math.abs(forward.tx-ctx.__test.route(n.s).tx)+Math.abs(forward.tz-ctx.__test.route(n.s).tz),target=bend>.1?27:36;
 if(c.speedMps<target)key('ArrowUp');else if(c.speedMps>target+1)key('ArrowDown');
 if(e>.028)key('ArrowRight');else if(e<-.028)key('ArrowLeft');
 step(1000/60);maxOffset=Math.max(maxOffset,n.dist);frames++;
 if(frames===240||frames===600)raceSnapshots.push({state:read(),uniforms:JSON.parse(JSON.stringify(uniforms)),draws:draws.map(x=>x)});
}
assert.equal(read().mode,'finished','three laps finish under real keyboard physics');assert.equal(read().completedLaps,3);assert.equal(read().lapTimes.length,3);assert(read().lapTimes.every(t=>t>10));assert(Math.abs(read().lapTimes.reduce((a,b)=>a+b,0)-read().totalSeconds)<.005);assert.equal(element('results').hidden,false);
const final=read();step(5000);assert.equal(read().totalSeconds,final.totalSeconds,'finish freezes time');assert.equal(read().completedLaps,3);element('restart').onclick();assert.equal(read().mode,'countdown');assert.equal(read().totalSeconds,0);assert.equal(read().completedLaps,0);assert.equal(element('results').hidden,true);
// Window losing focus pauses the race and clears held controls.
step(3100);key('KeyW');listeners.blur();assert.equal(read().mode,'paused');assert.equal(ctx.__test.keys().size,0);
fs.mkdirSync('output',{recursive:true});if(process.env.RENDER_PREVIEW)fs.writeFileSync('output/geometry.json',JSON.stringify(raceSnapshots[0]));fs.writeFileSync('output/test-results.json',JSON.stringify({passed:true,frames,maxOffset,final,checks:['WASD acceleration / steering / reverse','Pause and resume freeze time and position','Reverse start crossing rejected','Repeated line crossings rejected','Grass slows and barriers retain car','Three laps driven using real key events','All lap times sum to total','Results shown and restart resets state','Focus loss clears keys and pauses']},null,2));
console.log(JSON.stringify({passed:true,frames,seconds:final.totalSeconds,laps:final.lapTimes,maxOffset},null,2));
