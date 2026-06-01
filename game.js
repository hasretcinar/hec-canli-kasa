const START_CASH = 1000000;
const DEFAULT_DURATION = 45;
const letters = ["A", "B", "C", "D"];

const questions = [
  { category:"Isınma / Futbol", question:"Beşiktaş'ın klasik renkleri hangileridir?", options:["Sarı-kırmızı","Siyah-beyaz","Lacivert-beyaz","Yeşil-beyaz"], correct:1, type:"normal" },
  { category:"Dünya Kupası", question:"2026 Dünya Kupası'na ev sahipliği yapacak ülkeler hangi seçenekte doğru verilmiştir?", options:["Brezilya-Arjantin-Şili","Almanya-Fransa-İtalya","ABD-Kanada-Meksika","İspanya-Portekiz-Fas"], correct:2, type:"normal" },
  { category:"Görselli Soru", question:"Görseldeki yapı en çok hangi spor alanıyla ilişkilidir?", options:["Basketbol sahası","Futbol stadyumu","Tenis kortu","Voleybol salonu"], correct:1, type:"image", image:"assets/stadium.svg" },
  { category:"Dünya Kupası Formatı", question:"2026 Dünya Kupası kaç takımla oynanacaktır?", options:["32","40","48","64"], correct:2, type:"normal" },
  { category:"Sesli Soru", question:"Kısa sesli örneği dinle. Bu ses yayında en çok hangi kullanım için uygundur?", options:["Yarışma geçiş müziği","Cenaze marşı","Korku filmi sessizliği","Trafik anonsu"], correct:0, type:"audio", audio:"assets/pop-demo.wav" },
  { category:"Beşiktaş Tarihi", question:"Beşiktaş'ın namağlup lig şampiyonu olduğu sezon hangisidir?", options:["1989-90","1991-92","2002-03","2015-16"], correct:1, type:"normal" },
  { category:"Trol / Yayın Riski", question:"Canlı yayında yazılımcıların en karanlık cümlesi hangisidir?", options:["Bir şey deneyeceğim","Bende çalışıyor","Küçük bir güncelleme var","Ses geliyor mu?"], correct:1, type:"normal" },
  { category:"Görselli Futbol Verisi", question:"Görseldeki xG grafiği futbolda en genel olarak neyi ölçmeye çalışır?", options:["Taraftar sesini","Pozisyonların gol olma ihtimalini","Forma satışını","Hakemin koşu hızını"], correct:1, type:"image", image:"assets/xg.svg" },
  { category:"Zor Futbol", question:"Futbolda 'Panenka' terimi hangi vuruş tarzıyla ilişkilidir?", options:["Sert vole","Kalecinin üstünden yumuşak penaltı","Kornerden direkt gol","Topuk pası"], correct:1, type:"normal" },
  { category:"Final / Dünya Kupası", question:"2026 Dünya Kupası'nın toplam maç sayısı kaçtır?", options:["64","80","96","104"], correct:3, type:"normal" }
];

function byId(id){ return document.getElementById(id); }
function money(n){ return Math.round(Number(n)||0).toLocaleString("tr-TR") + " TL"; }
function qs(name){ return new URLSearchParams(location.search).get(name); }

function makeRoomCode(){
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for(let i=0;i<5;i++) code += chars[Math.floor(Math.random()*chars.length)];
  return code;
}

function roomRef(code){ return db.ref(`rooms/${String(code).toUpperCase()}`); }
function playersObj(state){ return state && state.players ? state.players : {}; }
function playersArray(state){ return Object.entries(playersObj(state)).map(([id,p]) => ({ id, ...p })); }

function currentQuestion(state){
  if(!state) return null;
  const i = Number(state.currentQuestionIndex || 0);
  return questions[i] ? { index:i, total:questions.length, ...questions[i] } : null;
}

function phaseText(phase){
  return { lobby:"Lobi", betting:"Para yatırma", revealed:"Cevap açıklandı", final:"Final" }[phase] || phase || "-";
}

function totalCash(state){
  return playersArray(state).reduce((s,p)=>s + Number(p.cash || 0), 0);
}

function ranking(state){
  return playersArray(state).sort((a,b)=>{
    if((b.cash||0)!==(a.cash||0)) return (b.cash||0)-(a.cash||0);
    if((b.correctCount||0)!==(a.correctCount||0)) return (b.correctCount||0)-(a.correctCount||0);
    return (a.burned||0)-(b.burned||0);
  });
}

function publicQuestionForRender(state){
  const q = currentQuestion(state);
  if(!q) return null;
  return q;
}

function renderHeader(state){
  const q = currentQuestion(state);
  const leader = ranking(state)[0];
  if(byId("hRoom")) byId("hRoom").textContent = state?.code || "-";
  if(byId("hPhase")) byId("hPhase").textContent = phaseText(state?.phase);
  if(byId("hRound")) byId("hRound").textContent = q ? `${q.index+1} / ${q.total}` : "-";
  if(byId("hTotal")) byId("hTotal").textContent = money(totalCash(state));
  if(byId("hLeader")) byId("hLeader").textContent = leader ? `${leader.name} (${money(leader.cash)})` : "-";
  renderTimer(state);
}

function remainingSeconds(state){
  if(!state || state.phase !== "betting" || !state.deadline) return null;
  return Math.max(0, Math.ceil((Number(state.deadline) - Date.now()) / 1000));
}

function renderTimer(state){
  const el = byId("timerText");
  if(!el) return;
  const rem = remainingSeconds(state);
  el.textContent = rem === null ? "-" : `${rem} sn`;
}

function renderQuestion(state, containerId="questionArea"){
  const area = byId(containerId);
  if(!area) return;

  if(!state || state.phase === "lobby"){
    area.innerHTML = `
      <div class="card waiting-card">
        <div class="badge">Lobi</div>
        <h2>Oyun başlatılması bekleniyor</h2>
        <p class="muted">Oyuncular odaya katılınca burada görünecek. Moderatör oyunu başlatınca ilk soru açılır.</p>
      </div>
    `;
    return;
  }

  if(state.phase === "final"){
    renderFinalBoard(state, containerId);
    return;
  }

  const q = publicQuestionForRender(state);
  if(!q){
    area.innerHTML = `<div class="card"><h2>Henüz soru yok.</h2><p class="muted">Moderatör oyunu başlatınca soru gelir.</p></div>`;
    return;
  }

  const showCorrect = state.phase === "revealed";
  let media = "";
  if(q.image) media += `<div class="media"><img src="${q.image}" alt="Görselli soru"></div>`;
  if(q.audio) media += `<div class="media"><p class="muted">Sesli soru</p><audio controls preload="auto" src="${q.audio}"></audio></div>`;
  if(q.video) media += `<div class="media"><video controls src="${q.video}"></video></div>`;

  const opts = q.options.map((opt,i)=>{
    const cls = showCorrect ? (i === q.correct ? " correct" : " wrong") : "";
    return `<div class="option${cls}"><span class="letter">${letters[i]}</span><strong>${opt}</strong></div>`;
  }).join("");

  area.innerHTML = `
    <div class="card question-card">
      <div class="badge">Soru ${q.index+1} / ${q.total}</div>
      <p class="muted" style="margin-top:10px">Kategori: ${q.category}</p>
      ${media}
      <h2>${q.question}</h2>
      <div class="options">${opts}</div>
    </div>
  `;
}

function medalFor(index){
  return index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "";
}

function renderPlayers(state, containerId="playersBox"){
  const box = byId(containerId);
  if(!box) return;
  const arr = ranking(state);
  box.innerHTML = arr.map((p,i)=>`
    <div class="player-row ${i===0 ? "leader" : ""} ${p.locked ? "locked" : ""}">
      <div class="rank">${medalFor(i) || (i+1)}</div>
      <div>
        <strong>${escapeHtml(p.name || "Oyuncu")}</strong>
        <div class="small">${p.eliminated ? "Elendi" : (p.locked ? "Kilitledi" : "Bekleniyor")} • ${p.correctCount || 0} doğru • ${money(p.burned || 0)} yandı</div>
      </div>
      <div class="money">${money(p.cash || 0)}</div>
    </div>
  `).join("") || `<p class="muted">Oyuncu bekleniyor...</p>`;
}


function renderFinalBoard(state, containerId="questionArea"){
  const area = byId(containerId);
  if(!area) return;
  const arr = ranking(state);

  area.innerHTML = `
    <div class="card question-card final-board">
      <div class="badge">Final Sıralaması</div>
      <h1>Canlı Kasa Kazananı</h1>
      ${arr[0] ? `<h2 class="final-winner">🥇 ${escapeHtml(arr[0].name)} — ${money(arr[0].cash || 0)}</h2>` : ""}
      <div class="final-list">
        ${arr.map((p,i)=>`
          <div class="final-row ${i===0 ? "champion" : ""}">
            <div class="final-medal">${medalFor(i) || (i+1)}</div>
            <div>
              <strong>${escapeHtml(p.name || "Oyuncu")}</strong>
              <div class="small">${p.correctCount || 0} doğru • ${money(p.burned || 0)} yandı • ${p.eliminated ? "Elendi" : "Oyunu tamamladı"}</div>
            </div>
            <div class="money">${money(p.cash || 0)}</div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function renderResults(state, containerId="resultsBox"){
  const box = byId(containerId);
  if(!box) return;
  if(!state || !state.lastResults || state.phase !== "revealed"){
    box.innerHTML = "";
    return;
  }
  const r = state.lastResults;
  box.innerHTML = `
    <div class="card">
      <h3>Doğru Cevap: ${letters[r.correct]}) ${escapeHtml(r.correctText)}</h3>
      <div class="log">
        ${Object.values(r.results || {}).map(x=>`
          <div class="log-row">
            <strong>${escapeHtml(x.name)}</strong> → Kalan:
            <span class="kept">${money(x.kept)}</span>,
            Yanan:
            <span class="burned">${money(x.burned)}</span>
            ${x.autoLocked ? " • Süre bittiği için otomatik kilitlendi" : ""}
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function escapeHtml(str){
  return String(str || "").replace(/[&<>"']/g, m => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[m]));
}

function toggleFullscreen(){
  if(!document.fullscreenElement){
    document.documentElement.requestFullscreen().catch(()=>alert("Tam ekran izni verilmedi."));
  }else{
    document.exitFullscreen();
  }
}
document.addEventListener("keydown", (e)=>{
  const tag = document.activeElement ? document.activeElement.tagName : "";
  if(tag === "INPUT" || tag === "TEXTAREA") return;
  if(e.key && e.key.toLowerCase() === "f") toggleFullscreen();
});

function makeRoomLinks(code){
  const origin = location.origin + location.pathname.replace(/[^/]*$/, "");
  return {
    player: `${origin}player.html?room=${encodeURIComponent(code)}`,
    display: `${origin}display.html?room=${encodeURIComponent(code)}`,
    moderator: `${origin}moderator.html?room=${encodeURIComponent(code)}`
  };
}

function copyText(text){
  navigator.clipboard?.writeText(text).then(()=>alert("Kopyalandı."));
}

// Firebase helpers
async function createRoom(duration=DEFAULT_DURATION){
  let code;
  let exists = true;
  while(exists){
    code = makeRoomCode();
    const snap = await roomRef(code).get();
    exists = snap.exists();
  }
  const room = {
    code,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    phase: "lobby",
    currentQuestionIndex: 0,
    duration: Number(duration) || DEFAULT_DURATION,
    deadline: null,
    started: false,
    players: {},
    lastResults: null
  };
  await roomRef(code).set(room);
  return code;
}

async function joinPlayer(code, name){
  const cleanCode = String(code || "").toUpperCase().trim();
  const cleanName = String(name || "").trim().slice(0,24);
  if(!cleanCode || !cleanName) throw new Error("Oda kodu ve isim gerekli.");
  const ref = roomRef(cleanCode);
  const snap = await ref.get();
  if(!snap.exists()) throw new Error("Oda bulunamadı.");

  const playerId = localStorage.getItem(`playerId_${cleanCode}`) || db.ref().push().key;
  const playerPath = ref.child(`players/${playerId}`);

  await playerPath.update({
    name: cleanName,
    cash: START_CASH,
    burned: 0,
    correctCount: 0,
    locked: false,
    allocation: null,
    autoLocked: false,
    eliminated: false,
    joinedAt: firebase.database.ServerValue.TIMESTAMP,
    lastSeen: firebase.database.ServerValue.TIMESTAMP
  });
  localStorage.setItem(`playerId_${cleanCode}`, playerId);
  return playerId;
}

async function startGame(code, duration=DEFAULT_DURATION){
  const ref = roomRef(code);
  const snap = await ref.get();
  if(!snap.exists()) throw new Error("Oda yok.");
  const state = snap.val();
  const updates = {};
  updates.phase = "betting";
  updates.started = true;
  updates.currentQuestionIndex = 0;
  updates.duration = Number(duration) || DEFAULT_DURATION;
  updates.deadline = Date.now() + (Number(duration) || DEFAULT_DURATION) * 1000;
  updates.lastResults = null;

  const players = playersObj(state);
  Object.keys(players).forEach(id=>{
    updates[`players/${id}/cash`] = START_CASH;
    updates[`players/${id}/burned`] = 0;
    updates[`players/${id}/correctCount`] = 0;
    updates[`players/${id}/locked`] = FalseSafe(false);
    updates[`players/${id}/allocation`] = null;
    updates[`players/${id}/autoLocked`] = false;
    updates[`players/${id}/eliminated`] = false;
  });
  await ref.update(updates);
}

function FalseSafe(v){ return v; }

async function lockPlayerBet(code, playerId, allocation){
  const ref = roomRef(code);
  const snap = await ref.get();
  if(!snap.exists()) throw new Error("Oda yok.");
  const state = snap.val();
  if(state.phase !== "betting") throw new Error("Şu an para yatırma açık değil.");
  const player = state.players && state.players[playerId];
  if(!player) throw new Error("Oyuncu bulunamadı.");
  if(player.locked) throw new Error("Bu soru için zaten kilitledin.");
  if(player.eliminated || Number(player.cash || 0) <= 0) throw new Error("Elenmiş oyuncu para yatıramaz.");

  const arr = (Array.isArray(allocation) ? allocation : [0,0,0,0]).slice(0,4).map(x=>Math.max(0, Math.floor(Number(x)||0)));
  while(arr.length < 4) arr.push(0);
  const total = arr.reduce((a,b)=>a+b,0);
  if(total !== Number(player.cash || 0)) throw new Error(`Toplam yatırılan para kasana eşit olmalı. Kasa: ${money(player.cash)}, yatırılan: ${money(total)}`);

  await ref.child(`players/${playerId}`).update({
    allocation: arr,
    locked: true,
    autoLocked: false
  });
}

async function revealAnswer(code){
  const ref = roomRef(code);
  const snap = await ref.get();
  if(!snap.exists()) throw new Error("Oda yok.");
  const state = snap.val();
  if(state.phase !== "betting") return;

  const q = questions[state.currentQuestionIndex || 0];
  if(!q) return;

  const updates = {};
  const results = {};
  const players = playersObj(state);

  Object.entries(players).forEach(([id,p])=>{
    const cash = Number(p.cash || 0);
    if(p.eliminated || cash <= 0){
      results[id] = { name:p.name, kept:0, burned:0, allocation:[0,0,0,0], autoLocked:false, eliminated:true };
      return;
    }

    let allocation = Array.isArray(p.allocation) ? p.allocation.slice(0,4).map(x=>Number(x)||0) : [0,0,0,0];
    while(allocation.length < 4) allocation.push(0);

    const total = allocation.reduce((a,b)=>a+b,0);
    let autoLocked = false;
    if(!p.locked || total !== cash){
      allocation = [0,0,0,0];
      autoLocked = true;
    }

    const kept = Math.max(0, Number(allocation[q.correct]) || 0);
    const burned = Math.max(0, cash - kept);
    const newCash = kept;
    const eliminated = newCash <= 0;

    updates[`players/${id}/cash`] = newCash;
    updates[`players/${id}/burned`] = Number(p.burned || 0) + burned;
    updates[`players/${id}/correctCount`] = Number(p.correctCount || 0) + (kept > 0 ? 1 : 0);
    updates[`players/${id}/eliminated`] = eliminated;
    updates[`players/${id}/autoLocked`] = autoLocked;

    results[id] = {
      name: p.name,
      kept,
      burned,
      allocation,
      autoLocked,
      eliminated
    };
  });

  updates.phase = "revealed";
  updates.deadline = null;
  updates.lastResults = {
    questionIndex: state.currentQuestionIndex || 0,
    correct: q.correct,
    correctText: q.options[q.correct],
    results
  };

  await ref.update(updates);
}

async function nextQuestion(code){
  const ref = roomRef(code);
  const snap = await ref.get();
  if(!snap.exists()) throw new Error("Oda yok.");
  const state = snap.val();
  if(state.phase !== "revealed") throw new Error("Önce cevap açıklanmalı.");

  const nextIndex = Number(state.currentQuestionIndex || 0) + 1;
  const players = playersObj(state);
  const allOut = Object.values(players).every(p => p.eliminated || Number(p.cash || 0) <= 0);

  const updates = { lastResults:null };

  if(nextIndex >= questions.length || allOut){
    updates.phase = "final";
    updates.started = false;
    updates.deadline = null;
  }else{
    updates.phase = "betting";
    updates.currentQuestionIndex = nextIndex;
    updates.deadline = Date.now() + Number(state.duration || DEFAULT_DURATION) * 1000;

    Object.keys(players).forEach(id=>{
      updates[`players/${id}/locked`] = false;
      updates[`players/${id}/allocation`] = null;
      updates[`players/${id}/autoLocked`] = false;
    });
  }

  await ref.update(updates);
}

async function resetRoom(code){
  const ref = roomRef(code);
  const snap = await ref.get();
  if(!snap.exists()) return;
  const state = snap.val();
  const updates = {
    phase: "lobby",
    started: false,
    currentQuestionIndex: 0,
    deadline: null,
    lastResults: null
  };
  Object.keys(playersObj(state)).forEach(id=>{
    updates[`players/${id}/cash`] = START_CASH;
    updates[`players/${id}/burned`] = 0;
    updates[`players/${id}/correctCount`] = 0;
    updates[`players/${id}/locked`] = false;
    updates[`players/${id}/allocation`] = null;
    updates[`players/${id}/autoLocked`] = false;
    updates[`players/${id}/eliminated`] = false;
  });
  await ref.update(updates);
}

// Local client timer tick
function startLocalTick(callback){
  setInterval(callback, 1000);
}
