// ── Music Theory Data ────────────────────────────────────────────────
const TH = {
  N: ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
  scales: [
    ["Major (Ionian)",          [0,2,4,5,7,9,11],    "Western"],
    ["Natural Minor (Aeolian)", [0,2,3,5,7,8,10],    "Western"],
    ["Harmonic Minor",          [0,2,3,5,7,8,11],    "Western"],
    ["Melodic Minor",           [0,2,3,5,7,9,11],    "Western"],
    ["Dorian",                  [0,2,3,5,7,9,10],    "Modes"],
    ["Phrygian",                [0,1,3,5,7,8,10],    "Modes"],
    ["Lydian",                  [0,2,4,6,7,9,11],    "Modes"],
    ["Mixolydian",              [0,2,4,5,7,9,10],    "Modes"],
    ["Locrian",                 [0,1,3,5,6,8,10],    "Modes"],
    ["Major Pentatonic",        [0,2,4,7,9],          "Pentatonic/Blues"],
    ["Minor Pentatonic",        [0,3,5,7,10],         "Pentatonic/Blues"],
    ["Blues",                   [0,3,5,6,7,10],       "Pentatonic/Blues"],
    ["Chromatic",               [0,1,2,3,4,5,6,7,8,9,10,11], "Symmetric"],
    ["Whole Tone",              [0,2,4,6,8,10],       "Symmetric"],
    ["Diminished (WH)",         [0,2,3,5,6,8,9,11],  "Symmetric"],
    ["Diminished (HW)",         [0,1,3,4,6,7,9,10],  "Symmetric"],
    ["Augmented",               [0,3,4,7,8,11],       "Symmetric"],
    ["Hungarian Minor",         [0,2,3,6,7,8,11],    "World"],
    ["Phrygian Dominant",       [0,1,4,5,7,8,10],    "World"],
    ["Double Harmonic",         [0,1,4,5,7,8,11],    "World"],
    ["Yo",                      [0,2,5,7,9],          "Japanese"],
    ["In",                      [0,1,5,7,8],          "Japanese"],
    ["Hirajoshi",               [0,2,3,7,8],          "Japanese"],
    ["Iwato",                   [0,1,5,6,10],         "Japanese"],
    ["Kumoi",                   [0,2,3,7,9],          "Japanese"],
    ["Gong",                    [0,2,4,7,9],          "Chinese"],
    ["Shang",                   [0,2,5,7,10],         "Chinese"],
    ["Jue",                     [0,3,5,8,10],         "Chinese"],
    ["Zhi",                     [0,2,5,7,9],          "Chinese"],
    ["Yu",                      [0,3,5,7,10],         "Chinese"],
    ["Bilawal",                 [0,2,4,5,7,9,11],    "Indian"],
    ["Kafi",                    [0,2,3,5,7,9,10],    "Indian"],
    ["Asavari",                 [0,2,3,5,7,8,10],    "Indian"],
    ["Bhairav",                 [0,1,4,5,7,8,11],    "Indian"],
    ["Bhairavi",                [0,1,3,5,7,8,10],    "Indian"],
    ["Todi",                    [0,1,3,6,7,8,11],    "Indian"],
    ["Kalyan",                  [0,2,4,6,7,9,11],    "Indian"],
    ["Rast",                    [0,2,4,5,7,9,10],    "Arabic"],
    ["Bayati",                  [0,1,4,5,7,8,10],    "Arabic"],
    ["Hijaz",                   [0,1,4,5,7,8,11],    "Arabic"],
    ["Nahawand",                [0,2,3,5,7,8,10],    "Arabic"],
    ["Kurd",                    [0,1,3,5,7,8,10],    "Arabic"],
    ["Ajam",                    [0,2,4,5,7,9,11],    "Arabic"],
  ],
  chordTypes: [
    {name:"Major",      sym:"",      intervals:[0,4,7]},
    {name:"Minor",      sym:"m",     intervals:[0,3,7]},
    {name:"Diminished", sym:"dim",   intervals:[0,3,6]},
    {name:"Augmented",  sym:"aug",   intervals:[0,4,8]},
    {name:"Power",      sym:"5",     intervals:[0,7]},
    {name:"Sus2",       sym:"sus2",  intervals:[0,2,7]},
    {name:"Sus4",       sym:"sus4",  intervals:[0,5,7]},
    {name:"Major 7",    sym:"M7",    intervals:[0,4,7,11]},
    {name:"Minor 7",    sym:"m7",    intervals:[0,3,7,10]},
    {name:"Dominant 7", sym:"7",     intervals:[0,4,7,10]},
    {name:"Half-Dim 7", sym:"m7b5",  intervals:[0,3,6,10]},
    {name:"Dim 7",      sym:"dim7",  intervals:[0,3,6,9]},
    {name:"Add9",       sym:"add9",  intervals:[0,4,7,2]},  // 2 = 9th mod 12
    {name:"Major 6",    sym:"6",     intervals:[0,4,7,9]},
    {name:"Minor 6",    sym:"m6",    intervals:[0,3,7,9]},
  ],
  progressions: [
    {name:"I–V–vi–IV",    genre:"Pop",        desc:"Most common pop progression",  chords:[{s:0,q:""},{s:7,q:""},{s:9,q:"m"},{s:5,q:""}]},
    {name:"I–IV–V",       genre:"Blues/Rock",  desc:"Classic 3-chord",             chords:[{s:0,q:""},{s:5,q:""},{s:7,q:""}]},
    {name:"I–vi–IV–V",    genre:"50s/Doo-wop", desc:"50s / doo-wop progression",  chords:[{s:0,q:""},{s:9,q:"m"},{s:5,q:""},{s:7,q:""}]},
    {name:"ii–V–I",       genre:"Jazz",        desc:"Core jazz turnaround",        chords:[{s:2,q:"m7"},{s:7,q:"7"},{s:0,q:"M7"}]},
    {name:"vi–IV–I–V",    genre:"Pop/Rock",    desc:"Minor-feel variant",          chords:[{s:9,q:"m"},{s:5,q:""},{s:0,q:""},{s:7,q:""}]},
    {name:"I–IV–vi–V",    genre:"Pop",         desc:"Axis progression",            chords:[{s:0,q:""},{s:5,q:""},{s:9,q:"m"},{s:7,q:""}]},
    {name:"I–♭VII–IV",   genre:"Rock/Modal",  desc:"Mixolydian feel",             chords:[{s:0,q:""},{s:10,q:""},{s:5,q:""}]},
    {name:"i–VII–VI–VII", genre:"Rock",        desc:"Andalusian cadence",          chords:[{s:0,q:"m"},{s:10,q:""},{s:8,q:""},{s:10,q:""}]},
    {name:"I–V–IV",       genre:"Rock",        desc:"Classic rock turnaround",     chords:[{s:0,q:""},{s:7,q:""},{s:5,q:""}]},
    {name:"i–VI–III–VII", genre:"Minor pop",   desc:"Minor pop turnaround",        chords:[{s:0,q:"m"},{s:8,q:""},{s:3,q:""},{s:10,q:""}]},
    {name:"I–V–vi–iii–IV",genre:"Canon",       desc:"Pachelbel Canon base",        chords:[{s:0,q:""},{s:7,q:""},{s:9,q:"m"},{s:4,q:"m"},{s:5,q:""}]},
    {name:"ii–IV–I",      genre:"Soul/R&B",    desc:"Soulful resolution",          chords:[{s:2,q:"m"},{s:5,q:""},{s:0,q:""}]},
    {name:"I–IV–I–V",     genre:"Blues",       desc:"Simple blues loop",           chords:[{s:0,q:"7"},{s:5,q:"7"},{s:0,q:"7"},{s:7,q:"7"}]},
    {name:"I–iii–IV–V",   genre:"Pop/Country", desc:"Common country feel",         chords:[{s:0,q:""},{s:4,q:"m"},{s:5,q:""},{s:7,q:""}]},
  ],
  famous: [
    {song:"Let It Be",           artist:"Beatles",         key:"C",  chords:["C","G","Am","F"],                   prog:"I–V–vi–IV"},
    {song:"Don't Stop Believin'",artist:"Journey",         key:"E",  chords:["E","B","C#m","A"],                  prog:"I–V–vi–IV"},
    {song:"No Woman No Cry",     artist:"Bob Marley",      key:"C",  chords:["C","G","Am","F"],                   prog:"I–V–vi–IV"},
    {song:"With or Without You", artist:"U2",              key:"D",  chords:["D","A","Bm","G"],                   prog:"I–V–vi–IV"},
    {song:"La Bamba",            artist:"Ritchie Valens",  key:"C",  chords:["C","F","G"],                        prog:"I–IV–V"},
    {song:"Johnny B. Goode",     artist:"Chuck Berry",     key:"Bb", chords:["Bb","Eb","F"],                      prog:"I–IV–V"},
    {song:"All of Me (jazz)",    artist:"Gerald Marks",    key:"C",  chords:["C","A7","Dm","G7"],                 prog:"I–VI–ii–V"},
    {song:"Autumn Leaves",       artist:"Jazz Standard",   key:"G",  chords:["Am7","D7","GM7","CM7"],             prog:"ii–V–I–IV"},
    {song:"Hotel California",    artist:"Eagles",          key:"Bm", chords:["Bm","F#","A","E","G","D","Em","F#"],prog:"i–V–VII–IV–VI–III–VII–V"},
    {song:"Canon in D",          artist:"Pachelbel",       key:"D",  chords:["D","A","Bm","F#m","G","D","G","A"],prog:"I–V–vi–iii–IV–I–IV–V"},
    {song:"Blue Bossa",          artist:"K. Dorham",       key:"Cm", chords:["Cm","Fm","Dm7b5","G7"],             prog:"i–iv–ii°7–V7"},
    {song:"Stairway to Heaven",  artist:"Led Zeppelin",    key:"Am", chords:["Am","G","F","E"],                   prog:"i–VII–VI–V"},
    {song:"Earth Song",          artist:"Michael Jackson", key:"Cm", chords:["Cm","Ab","Eb","Bb"],                prog:"i–VI–III–VII"},
    {song:"Still D.R.E.",        artist:"Dr. Dre",         key:"D",  chords:["D","A"],                            prog:"I–V (loop)"},
  ],
  // Circle of Fifths (clockwise from C)
  cofPCs:   [0,7,2,9,4,11,6,1,8,3,10,5],
  cofMaj:   ['C','G','D','A','E','B','F#','Db','Ab','Eb','Bb','F'],
  cofMin:   ['Am','Em','Bm','F#m','C#m','G#m','Ebm','Bbm','Fm','Cm','Gm','Dm'],
  cofSig:   ['0','1♯','2♯','3♯','4♯','5♯','6♯','5♭','4♭','3♭','2♭','1♭'],
};

// ── Theory Helpers ───────────────────────────────────────────────────
function thPianoSVG(scalePCs, rootPC, color) {
  const N = TH.N;
  const isBlack = [0,1,0,1,0,0,1,0,1,0,1,0];
  const wkNum   = [0,-1,1,-1,2,3,-1,4,-1,5,-1,6]; // white key index in octave
  const bkLeft  = [-1,14.5,-1,40.5,-1,-1,92.5,-1,118.5,-1,144.5,-1]; // px from octave start
  const WW=24, WH=72, WP=26, BW=15, BH=46, OCT=2;
  const totalW = OCT*7*WP;
  let wk='', bk='';
  for (let oct=0; oct<OCT; oct++) {
    const ox = oct*7*WP;
    for (let n=0; n<12; n++) {
      const pc=n, act=scalePCs.has(pc), root=(pc===rootPC);
      if (!isBlack[n]) {
        const x=ox+wkNum[n]*WP;
        const fill=root?color:act?color+'55':'#d0d0d0';
        const lc=act?'#fff':'#666';
        wk+=`<rect x="${x}" y="0" width="${WW}" height="${WH}" fill="${fill}" stroke="#666" stroke-width="1" rx="1"/>`;
        if (n===0) wk+=`<text x="${x+WW/2}" y="${WH-5}" text-anchor="middle" font-size="7" fill="${lc}">${N[0]}${oct+4}</text>`;
      } else {
        const x=(ox+bkLeft[n]).toFixed(1);
        const fill=root?color:act?color+'88':'#1a1a1a';
        bk+=`<rect x="${x}" y="0" width="${BW}" height="${BH}" fill="${fill}" stroke="#000" stroke-width="0.5" rx="1"/>`;
      }
    }
  }
  return `<svg width="${totalW}" height="${WH+2}" viewBox="0 0 ${totalW} ${WH+2}" style="display:block">${wk}${bk}</svg>`;
}

function thCofSVG(selPC, color) {
  const {cofPCs,cofMaj,cofMin,cofSig}=TH;
  const CX=110,CY=110,R1=104,R2=67,R3=38;
  const rad=a=>(a-90)*Math.PI/180;
  const pt=(a,r)=>[(CX+r*Math.cos(rad(a))).toFixed(1),(CY+r*Math.sin(rad(a))).toFixed(1)].join(',');
  const sec=(ac,ro,ri,f)=>{const a1=ac-14.4,a2=ac+14.4;return`<path d="M${pt(a1,ro)} A${ro},${ro} 0 0,1 ${pt(a2,ro)} L${pt(a2,ri)} A${ri},${ri} 0 0,0 ${pt(a1,ri)} Z" fill="${f}" stroke="#111" stroke-width="1.5"/>`;};
  const tx=(a,r,s,sz,f,b)=>{const[x,y]=[CX+r*Math.cos(rad(a)),CY+r*Math.sin(rad(a))];return`<text x="${+x.toFixed(1)}" y="${+y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="${sz}" fill="${f}"${b?' font-weight="700"':''}>${s}</text>`;};
  let o=`<svg width="220" height="220" viewBox="0 0 220 220"><circle cx="${CX}" cy="${CY}" r="${R1+3}" fill="#0d0d0d"/>`;
  for(let i=0;i<12;i++){
    const ac=i*30,pc=cofPCs[i],sel=pc===selPC;
    o+=sec(ac,R1,R2+1,sel?color:'#252525');
    o+=sec(ac,R2-1,R3,sel?color+'44':'#1a1a1a');
    o+=tx(ac,(R1+R2)/2,cofMaj[i],sel?13:10,sel?'#fff':'#aaa',sel);
    o+=tx(ac,(R2+R3)/2,cofMin[i],sel?9:8,sel?'#ddd':'#555',false);
    o+=tx(ac,R3-11,cofSig[i],7,sel?'#fff':'#444',false);
  }
  o+=`<circle cx="${CX}" cy="${CY}" r="${R3-14}" fill="#0d0d0d"/>`;
  o+=`<text x="${CX}" y="${CY-5}" text-anchor="middle" font-size="8" fill="#444">Circle</text>`;
  o+=`<text x="${CX}" y="${CY+5}" text-anchor="middle" font-size="8" fill="#444">of 5ths</text>`;
  return o+`</svg>`;
}

function thGenChords(scaleIntervals, rootPC, filter, showInv) {
  const N=TH.N;
  const scalePCs=new Set(scaleIntervals.map(i=>(rootPC+i)%12));
  const byType={};
  for(const pc of [...scalePCs].sort((a,b)=>a-b)){
    for(const ct of TH.chordTypes){
      if(filter==='triad'&&ct.intervals.length>3)continue;
      if(filter==='7th'&&ct.intervals.length!==4)continue;
      const chordPCs=ct.intervals.map(i=>(pc+i)%12);
      if(!chordPCs.every(cp=>scalePCs.has(cp)))continue;
      const invCount=showInv?ct.intervals.length:1;
      if(!byType[ct.name])byType[ct.name]=[];
      for(let inv=0;inv<invCount;inv++){
        const sz=ct.intervals.length;
        const nns=ct.intervals.map((_,idx)=>N[chordPCs[(idx+inv)%sz]]);
        const slash=inv>0?'/'+N[chordPCs[inv%sz]]:'';
        byType[ct.name].push({
          name:N[pc]+ct.sym+slash,
          inv:['Root','1st','2nd','3rd'][inv],
          notes:nns.join(' '),
          rootPC:pc
        });
      }
    }
  }
  return byType;
}

// ── Note Search Helpers ───────────────────────────────────────────────
const NOTE_MAP=(()=>{const m={};
  [['C',0],['C#',1],['DB',1],['D',2],['D#',3],['EB',3],['E',4],['FB',4],
   ['F',5],['E#',5],['F#',6],['GB',6],['G',7],['G#',8],['AB',8],
   ['A',9],['A#',10],['BB',10],['B',11],['CB',11]].forEach(([n,v])=>m[n]=v);
  return m;
})();

function parseInputNotes(str){
  const pcs=new Set();
  str.toUpperCase().split(/[\s,;\/|]+/).filter(Boolean).forEach(t=>{
    if(NOTE_MAP[t]!==undefined) pcs.add(NOTE_MAP[t]);
  });
  return pcs;
}

function findScalesContaining(inputPCs){
  if(!inputPCs.size) return [];
  const results=[];
  for(let root=0;root<12;root++){
    for(let si=0;si<TH.scales.length;si++){
      const [name,intervals]=TH.scales[si];
      const scalePCs=new Set(intervals.map(i=>(root+i)%12));
      if([...inputPCs].every(pc=>scalePCs.has(pc))){
        results.push({name,root,rootName:TH.N[root],scalePCs,
          exact:inputPCs.size===scalePCs.size,size:scalePCs.size});
      }
    }
  }
  // sort: exact first, then by scale size asc, then name
  results.sort((a,b)=>(b.exact-a.exact)||(a.size-b.size)||a.rootName.localeCompare(b.rootName)||a.name.localeCompare(b.name));
  return results;
}

// ── Theory Panel Init ─────────────────────────────────────────────────
function initTheoryPanel(panel, color) {
  let thRoot=0, thScaleIdx=0, thFilter='all', thInv=false;

  function render(){
    const sd=TH.scales[thScaleIdx];
    const scaleName=sd[0], intervals=sd[1];
    const scalePCs=new Set(intervals.map(i=>(thRoot+i)%12));

    // root buttons
    panel.querySelectorAll('.th-rb').forEach((b,i)=>b.classList.toggle('on',i===thRoot));

    // piano
    panel.querySelector('#th-piano').innerHTML=thPianoSVG(scalePCs,thRoot,color);

    // note pills
    panel.querySelector('#th-notes').innerHTML=
      TH.N.map((n,i)=>`<span class="th-pill${i===thRoot?' rt':scalePCs.has(i)?' sc':''}">${n}</span>`).join('')+
      `<span style="font-size:10px;color:var(--muted);margin-left:8px">${scaleName} — ${intervals.length} notes: ${intervals.map(i=>(thRoot+i)%12).map(pc=>TH.N[pc]).join(' ')}</span>`;

    // chords table
    const byType=thGenChords(intervals,thRoot,thFilter,thInv);
    const typeOrder=['Major','Minor','Diminished','Augmented','Power','Sus2','Sus4','Major 7','Minor 7','Dominant 7','Half-Dim 7','Dim 7','Add9','Major 6','Minor 6'];
    let rows='';
    for(const t of typeOrder){
      if(!byType[t])continue;
      rows+=`<tr class="th-hdr"><td colspan="3">${t}</td></tr>`;
      rows+=byType[t].map(c=>`<tr><td><span class="ch-n">${c.name}</span></td><td style="color:var(--muted);font-size:10px">${c.inv}</td><td style="font-family:'SF Mono','Fira Code',monospace;font-size:10px">${c.notes}</td></tr>`).join('');
    }
    if(!rows) rows='<tr><td colspan="3" style="color:var(--muted);padding:12px 6px">No chords fit this scale with current filter</td></tr>';
    panel.querySelector('#th-chords-tbl').innerHTML=rows;

    // CoF
    panel.querySelector('#th-cof').innerHTML=thCofSVG(thRoot,color);

    // progressions
    panel.querySelector('#th-progs').innerHTML=TH.progressions.map(p=>{
      const chords=p.chords.map(c=>TH.N[(thRoot+c.s+120)%12]+c.q).join(' – ');
      return`<div class="pg-card" style="--c:${color}"><div class="pg-name">${p.name}</div><div class="pg-chords">${chords}</div><div class="pg-meta">${p.genre}</div><div class="pg-desc">${p.desc}</div></div>`;
    }).join('');
  }

  // Skeleton HTML
  panel.innerHTML=`
  <div class="ph"><div>
    <h2>Music Theory</h2>
    <span class="badge" style="--c:${color}">Reference</span>
    <span class="usecase">Scales · Chords · Circle of Fifths · Progressions — all computed from selected root &amp; scale</span>
  </div></div>

  <div class="th-ctrl" style="--c:${color}">
    <span class="th-lbl">Root</span>
    ${TH.N.map((n,i)=>`<button class="th-rb" data-i="${i}">${n}</button>`).join('')}
    <span class="th-lbl" style="margin-left:10px">Scale</span>
    <select id="th-sc" class="th-sel">
      ${TH.scales.map((s,i)=>`<optgroup label="${s[2]}" style="display:none"></optgroup>`).join('')}
      ${(()=>{let last='',o='';TH.scales.forEach((s,i)=>{if(s[2]!==last){o+=`<optgroup label="${s[2]}">`;last=s[2];}o+=`<option value="${i}">${s[0]}</option>`;});return o;})()}
    </select>
    <span class="th-lbl" style="margin-left:10px">Chords</span>
    <select id="th-cf" class="th-sel">
      <option value="all">All types</option>
      <option value="triad">Triads only</option>
      <option value="7th">7th chords</option>
    </select>
    <label style="font-size:11px;color:var(--muted);margin-left:8px;cursor:pointer">
      <input type="checkbox" id="th-inv" style="margin-right:4px">Inversions
    </label>
  </div>

  <div class="th-piano-outer"><div id="th-piano"></div></div>
  <div class="th-np" id="th-notes"></div>

  <div class="th-card" style="margin-bottom:18px">
    <h4>Find Scales by Notes</h4>
    <input id="th-ns" class="ns-input" type="text" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="Type notes separated by spaces — e.g.  C D E F G A B  or  C Db Eb F G Ab Bb">
    <div id="th-ns-tags" style="min-height:22px;margin-bottom:8px"></div>
    <div id="th-ns-results" style="color:var(--muted);font-size:11px">Enter notes above to find matching scales</div>
  </div>

  <div class="th-g2">
    <div>
      <div class="th-card">
        <h4>Chords in Scale</h4>
        <table class="cht"><thead><tr><th>Chord</th><th>Position</th><th>Notes</th></tr></thead>
        <tbody id="th-chords-tbl"></tbody></table>
      </div>
    </div>
    <div>
      <div class="th-card" style="text-align:center">
        <h4>Circle of Fifths</h4>
        <div id="th-cof"></div>
      </div>
    </div>
  </div>

  <h3>Common Progressions <span style="font-size:10px;color:var(--muted);text-transform:none;letter-spacing:0">computed for selected root</span></h3>
  <div class="pg-grid" id="th-progs"></div>

  <h3>Famous Chord Progressions</h3>
  <table class="fm-tbl">
    <thead><tr><th>Song</th><th>Artist</th><th>Key</th><th>Pattern</th><th>Chords</th></tr></thead>
    <tbody>${TH.famous.map(f=>`<tr>
      <td style="font-weight:600">${f.song}</td>
      <td style="color:var(--muted)">${f.artist}</td>
      <td><kbd style="font-size:10px">${f.key}</kbd></td>
      <td style="color:var(--muted);font-size:10px">${f.prog}</td>
      <td class="fm-prog">${f.chords.join(' – ')}</td>
    </tr>`).join('')}</tbody>
  </table>`;

  // Events
  panel.querySelectorAll('.th-rb').forEach((b,i)=>b.addEventListener('click',()=>{thRoot=i;render();}));
  panel.querySelector('#th-sc').addEventListener('change',e=>{thScaleIdx=+e.target.value;render();});
  panel.querySelector('#th-cf').addEventListener('change',e=>{thFilter=e.target.value;render();});
  panel.querySelector('#th-inv').addEventListener('change',e=>{thInv=e.target.checked;render();});

  // CoF click to select root
  panel.querySelector('#th-cof').addEventListener('click',e=>{
    const svg=e.currentTarget.querySelector('svg');
    if(!svg)return;
    const rect=svg.getBoundingClientRect();
    const mx=e.clientX-rect.left-110, my=e.clientY-rect.top-110;
    if(mx*mx+my*my<38*38||mx*mx+my*my>104*104)return;
    const angleRaw=Math.atan2(my,mx)*180/Math.PI+90;
    const angle=(angleRaw+360)%360;
    const idx=Math.round(angle/30)%12;
    thRoot=TH.cofPCs[idx];
    render();
  });

  // Note search
  panel.querySelector('#th-ns').addEventListener('input',e=>{
    const inputPCs=parseInputNotes(e.target.value);
    const tagsEl=panel.querySelector('#th-ns-tags');
    const resEl=panel.querySelector('#th-ns-results');

    // show parsed note tags
    tagsEl.innerHTML=inputPCs.size
      ? [...inputPCs].sort((a,b)=>a-b).map(pc=>`<span class="ns-tag active" style="--c:${color}">${TH.N[pc]}</span>`).join('')
      : '';

    if(!inputPCs.size){
      resEl.innerHTML='<span style="color:var(--muted)">Enter notes above to find matching scales</span>';
      return;
    }

    const matches=findScalesContaining(inputPCs);
    if(!matches.length){
      resEl.innerHTML='<span style="color:var(--muted)">No scales contain all these notes</span>';
      return;
    }

    const rows=matches.map(m=>{
      const noteStr=[...m.scalePCs].sort((a,b)=>a-b).map(pc=>{
        const hi=inputPCs.has(pc);
        return hi?`<span style="color:${color}">${TH.N[pc]}</span>`:TH.N[pc];
      }).join(' ');
      const badge=m.exact
        ?`<span class="ns-badge exact">exact</span>`
        :`<span class="ns-badge">${m.size} notes</span>`;
      return`<div class="ns-row${m.exact?' exact':''}">
        <span class="ns-name">${m.rootName} ${m.name}</span>
        <span class="ns-notes">${noteStr}</span>${badge}
      </div>`;
    }).join('');

    resEl.innerHTML=`<div style="margin-top:2px;max-height:260px;overflow-y:auto">${rows}</div>`;
  });

  render();
}

