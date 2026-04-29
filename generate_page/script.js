const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');

DEVICES.forEach((d,i) => {
  const btn = document.createElement('button');
  btn.className='tab-btn'+(i===0?' active':'');
  btn.dataset.target=d.id;
  btn.style.setProperty('--c',d.color);
  btn.innerHTML=`<span class="tab-name">${d.name}</span><span class="tab-cat">${d.cat}</span>`;
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(d.id).classList.add('active');
    document.getElementById('search').dataset.device=d.id;
    // scroll active tab into view on mobile
    btn.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
    // scroll content to top
    document.getElementById('content').scrollTop=0;
  });
  sidebar.appendChild(btn);

  // Theory panel — completely custom rendering
  if(d.theory){
    const panel=document.createElement('div');
    panel.className='panel';
    panel.id=d.id;
    panel.style.setProperty('--c',d.color);
    content.appendChild(panel);
    initTheoryPanel(panel,d.color);
    return;
  }

  const cats={};
  d.shortcuts.forEach(s=>{(cats[s.cat]=cats[s.cat]||[]).push(s);});
  const rows=Object.entries(cats).map(([cat,items])=>
    `<tr class="cat-label"><td colspan="2">${cat}</td></tr>`+
    items.map(s=>{const star=(s.combo+s.action).includes('★');const fmtCombo=s.combo.replace(/★/g,'').replace(/\[([^\]]+)\]/g,'<kbd>$1</kbd>');return`<tr><td>${s.action.replace(/★/g,'')}${star?'<span class="star" title="Key shortcut">★</span>':''}</td><td>${fmtCombo}</td></tr>`;}).join('')
  ).join('');

  // Scale → Set reference for J-6
  let postTableHtml = '';
  if(d.scaleRef){
    const ALL12=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
    const srRows=d.scaleRef.map(r=>{
      const isAll=r.keys[0]==='all 12';
      const keySpans=isAll
        ?`<span style="color:var(--muted);font-size:10px">all 12</span>`
        :ALL12.map(k=>{
          const hit=r.keys.includes(k);
          return`<span style="display:inline-block;width:22px;text-align:center;margin:1px;padding:1px 0;border-radius:3px;font-size:10px;font-weight:${hit?700:400};color:${hit?'var(--c)':'#333'};background:${hit?'rgba(255,255,255,.06)':'transparent'}">${k}</span>`;
        }).join('');
      return`<tr>
        <td style="white-space:nowrap;font-size:11px;color:var(--text)">${r.scale}</td>
        <td style="white-space:nowrap"><kbd style="font-size:10px">${r.sets}</kbd></td>
        <td style="line-height:1.4">${keySpans}</td>
        <td style="font-size:11px;color:var(--muted)">${r.tip}</td>
      </tr>`;
    }).join('');
    postTableHtml+=`<h3 style="margin-top:24px">Scale → Chord Set Quick Reference</h3>
<p style="font-size:11px;color:var(--muted);margin-bottom:8px">Highlighted keys = diatonic buttons to press for that scale. Transpose with <kbd>[SHIFT]+[A (KEY)]</kbd> to play in any root.</p>
<div class="cs-wrap"><table class="cs-table" style="white-space:normal;min-width:auto;width:100%">
  <thead><tr>
    <th class="lft" style="min-width:140px">Scale</th>
    <th class="lft" style="min-width:80px">Set(s)</th>
    <th class="lft" style="min-width:280px">Valid keys to press</th>
    <th class="lft">Notes</th>
  </tr></thead>
  <tbody>${srRows}</tbody>
</table></div>`;
  }
  if(d.chordSets){
    const keys=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
    const keyMap={C:'C',Cs:'C#',D:'D',Ds:'D#',E:'E',F:'F',Fs:'F#',G:'G',Gs:'G#',A:'A',As:'A#',B:'B'};
    const header=`<th class="lft" style="min-width:28px">#</th><th class="lft">Genre</th><th class="lft">Scale / Mode</th>`+
      keys.map(k=>`<th>${k}</th>`).join('');
    const keyProps=['C','Cs','D','Ds','E','F','Fs','G','Gs','A','As','B'];
    const csRows=d.chordSets.map(cs=>{
      const stacks=['Oct Stack','4th Stack','5th Stack'];
      const isStack=stacks.includes(cs.g);
      const cells=keyProps.map(k=>{
        const c=cs.chords[k];
        return c?`<td class="cc">${c}</td>`:`<td class="ce">${isStack?'∥':'—'}</td>`;
      }).join('');
      return`<tr><td class="cn">${cs.n}</td><td class="cg">${cs.g}</td><td class="cm">${cs.m}</td>${cells}</tr>`;
    }).join('');
    postTableHtml=`<h3 style="margin-top:24px">All 64 Chord Sets — Key of C Reference</h3>
<p style="font-size:11px;color:var(--muted);margin-bottom:8px">Press key buttons in C to play listed chord. Transpose with <kbd>[SHIFT]+[A (KEY)]</kbd> to use in any key.</p>
<div class="cs-wrap"><table class="cs-table"><thead><tr>${header}</tr></thead><tbody>${csRows}</tbody></table></div>`;
  }

  // Knob Reference tables (Roland P-6)
  if(d.knobRef){
    const krColors={VOICE:"#1c3a28",GRANULAR:"#243318",FILTER:"#1e1e3a",MIXER:"#3a2010","DELAY":"#14243a","REVERB":"#2a1438"};
    function krSecHtml(sec){
      const trows=sec.rows.map(r=>`<tr>
        <td style="font-family:'SF Mono','Fira Code',monospace;font-size:10px;color:#7eb8f7;white-space:nowrap">${r.source}</td>
        <td style="font-family:'SF Mono','Fira Code',monospace;font-size:11px;color:var(--c);font-weight:700;white-space:nowrap">${r.code}</td>
        <td style="font-size:10px;color:var(--muted);white-space:nowrap">${r.range}</td>
        <td style="font-size:11px">${r.desc}</td>
      </tr>`).join('');
      return`<div style="margin-bottom:14px;border:1px solid var(--border);border-radius:var(--radius);overflow:hidden">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.7px;color:#ccc;padding:5px 10px;background:${krColors[sec.name]||'#252525'}">${sec.name} <span style="font-weight:400;opacity:.6;text-transform:none;letter-spacing:0;font-size:9px">${sec.access}</span></div>
        <div class="st-wrap" style="margin-bottom:0"><table class="st" style="min-width:300px"><thead><tr><th>Knob</th><th>Code</th><th>Range</th><th>Parameter</th></tr></thead><tbody>${trows}</tbody></table></div>
      </div>`;
    }
    const half=Math.ceil(d.knobRef.length/2);
    const col1=d.knobRef.slice(0,half).map(krSecHtml).join('');
    const col2=d.knobRef.slice(half).map(krSecHtml).join('');
    postTableHtml+=`<h3 style="margin-top:24px">Knob Parameter Reference</h3>
<p style="font-size:11px;color:var(--muted);margin-bottom:10px">Parameters accessible per editing section. VALUE rows = scroll value knob while in that section to cycle through params.</p>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:20px">
  <div>${col1}</div><div>${col2}</div>
</div>`;
  }

  // Sound Design recipes (MicroFreak)
  if(d.soundDesign){
    const cards=d.soundDesign.map(r=>`
<div class="pg-card" style="min-width:0">
  <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:4px">
    <span class="pg-name">${r.name}</span>
    <span style="font-size:9px;background:var(--c);color:#fff;border-radius:3px;padding:1px 5px;opacity:.85">${r.engine}</span>
  </div>
  <div class="pg-desc" style="margin-bottom:6px;font-style:italic">${r.goal}</div>
  <ol style="margin:0;padding-left:16px;font-size:10px;color:var(--muted);line-height:1.7">
    ${r.steps.map(s=>`<li>${s}</li>`).join('')}
  </ol>
  <div style="margin-top:6px;font-size:9px;color:var(--c);font-family:'SF Mono','Fira Code',monospace;opacity:.9">⬡ ${r.matrix}</div>
</div>`).join('');
    postTableHtml+=`<h3 style="margin-top:24px">Sound Design Recipes</h3>
<p style="font-size:11px;color:var(--muted);margin-bottom:10px">Engine starting points + Matrix routing for common sounds. All relative to C — transpose to taste.</p>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:10px;margin-bottom:20px">${cards}</div>`;
  }

  // Extra sections for SmplTrek
  let extraHtml = '';
  if(d.ledStatus){
    const ledRows = d.ledStatus.map(l=>
      `<tr><td>${l.state}</td><td><span class="dot" style="background:${l.color}"></span>${l.desc}</td></tr>`
    ).join('');
    extraHtml += `<h3>LED Pad Status</h3><table class="led-table">${ledRows}</table>`;
  }
  if(d.trackTypes){
    const ttItems = d.trackTypes.map(t=>`<li>${t}</li>`).join('');
    extraHtml += `<h3>Track Types</h3><ul class="tips" style="margin-bottom:18px">${ttItems}</ul>`;
  }

  // Woovebox hardware layout diagram
  if(d.id==='wooovebox'){
    const keys=[
      {n:1, tr:'Cd',  sub:''},
      {n:2, tr:'bS',  sub:''},
      {n:3, tr:'Ld',  sub:''},
      {n:4, tr:'Ar',  sub:'CdLo'},
      {n:5, tr:'Ki',  sub:''},
      {n:6, tr:'Sn',  sub:''},
      {n:7, tr:'hh',  sub:''},
      {n:8, tr:'Pc',  sub:''},
      {n:9, tr:'A1',  sub:''},
      {n:10,tr:'A2',  sub:''},
      {n:11,tr:'A3',  sub:''},
      {n:12,tr:'A4',  sub:'CdHi'},
      {n:13,tr:'A5',  sub:''},
      {n:14,tr:'A6',  sub:'SAMPLER'},
      {n:15,tr:'A7',  sub:'LIVE'},
      {n:16,tr:'A8',  sub:'SONG'},
    ];
    const btnHtml=keys.map(k=>`
      <div style="display:flex;flex-direction:column;align-items:center;gap:2px">
        <div style="font-size:9px;color:var(--muted);line-height:1">${k.n}</div>
        <div style="
          width:44px;height:44px;border-radius:6px;
          background:#1a1a1a;border:1px solid #3a3a3a;border-bottom:2px solid #111;
          box-shadow:0 2px 4px #000,inset 0 1px 0 rgba(255,255,255,.06);
          display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;
          cursor:default;
        ">
          <span style="font-size:11px;font-weight:700;color:#e0e0e0;font-family:'SF Mono','Fira Code',monospace">${k.tr}</span>
          ${k.sub?`<span style="font-size:8px;color:var(--c);font-family:'SF Mono','Fira Code',monospace;opacity:.85">${k.sub}</span>`:''}
        </div>
      </div>`).join('');
    extraHtml+=`
<h3 style="margin-top:18px">Sound Design</h3>
<ul class="tips" style="margin-bottom:18px">
  <li><b>FM basics:</b> Carrier = Osc1, Modulator = Osc2. Ratio between them defines timbre — octave ratios = harmonic, inharmonic ratios = metallic/atonal. Carrier waveform barely matters; <em>modulator frequency &amp; amplitude</em> drive everything.</li>
  <li><b>FM timbre movement:</b> Use <kbd>ALFO2</kbd> / <kbd>AEG2</kbd> on modulator amplitude — not PLFO — to evolve FM timbre over time. AEG falling envelope → plucky bass. ALFO2 slow sweep → evolving pad.</li>
  <li><b>Bell / FM lead:</b> FM1 alg + slight coarse detune on Osc2 → classic bell. Keep modulator level ≤ 63 to avoid pitch-reversal distortion.</li>
  <li><b>FM3 algorithm:</b> FM1 result × unmodulated Osc1 = FM + ring mod. Gnarly metallic/formant textures.</li>
  <li><b>Pitch-dependent LFO:</b> On Osc1/2 page, set playback style <kbd>14/A6</kbd> → dig.v (ROMpler mode). Each note pitch gets its own LFO speed → chord = multiple async LFOs → evolving texture. ★</li>
  <li><b>Drone / ambient texture:</b> Pick a dissonant chord (e.g. half-dim 9th = 5 notes) + dig.v mode → 5 independent LFO timings = rich organic chaos.</li>
  <li><b>Global reverb (dark ambient):</b> Song Global FX page → <kbd>13/A5</kbd> Reverb Feedback max + <kbd>14/A6</kbd> Reverb Time max.</li>
  <li><b>Sparkle delay:</b> Song Global FX page → <kbd>4/Ar</kbd> = SpKL (delay 2 sparkle algorithm). Subtle = airy shimmer. ★</li>
  <li><b>Lo-fi grit:</b> Lower sample rate on hh/ride presets → dragging chain / dusty rhythmic texture.</li>
  <li><b>Evolving patches:</b> Drone chord + pitch-dependent LFO + maxed reverb → set-and-forget ambient texture that never repeats exactly.</li>
  <li><b>Dissonance tip:</b> Detune Osc2 to inharmonic ratio → FM "ghost" partials. Combine with a long reverb tail for unsettling atmospheres.</li>
</ul>
<h3 style="margin-top:18px">Audio Buffers &amp; Fragment DJ FX</h3>
<ul class="tips" style="margin-bottom:18px">
  <li><b>Access DJ FX page:</b> On any Fr.xx in Song mode → hold <kbd>Value</kbd> + short-press <kbd>16/A8/Song</kbd>. Screen = "DJ 01". Repeat to exit. Hold <kbd>Write</kbd> while in DJ mode to see/toggle tracks as normal. ★</li>
  <li><b>Two buffers, each ~11.8s.</b> Buffer time does NOT count toward device sample storage. Buffers persist across multiple playbacks — survives temporarily switching songs as long as new song doesn't overwrite them.</li>
  <li><b>Auto skip-back:</b> If a buffer needed for playback no longer exists, device auto-jumps to where it was recorded. (Does not account for reverb/delay tails from preceding fragments.)</li>
  <li><b>0-length fragments:</b> DJ FX settings (including buffer recording) are fully ignored for fragments with 0 length — safe to use as structural dividers.</li>

  <li><b>Buffer record workflow:</b> DJ page → hold <kbd>13/b.LEn</kbd> + turn Value to set length (quarter notes) → hold <kbd>15/b.rEc</kbd> + turn Value to pick source (Sy-1/Sy-2 = synth, Mi-1/Mi-2 = full mix, Li-1/Li-2 = line in, oSy/oMi/oLi = overdub variants). Play → records for that duration then loops playback. ★</li>
  <li><b>Buffer playback workflow:</b> On any fragment DJ page → set <kbd>b.LEn</kbd> + hold <kbd>14/b.PLy</kbd> + turn Value: FWd1/FWd2 (forward), rvS1/rvS2 (reverse), pin1/pin2 (ping: fwd→rev→fwd), pon1/pon2 (pong: rev→fwd→rev), PrEP (silent prep — see below). ★</li>
  <li><b>Rules:</b> One buffer plays per fragment; one buffer records per fragment. Both can be different buffers (e.g. play buf1 while recording Mi-2). <kbd>b.LEn</kbd> controls both playback AND recording length in the same fragment.</li>
  <li><b>Stacking buffers:</b> Fr.A plays buf1 (short/glitchy) + records Mi-2 → Fr.B plays buf2 = captures the mangled mix including buf1 output. ★</li>
  <li><b>Overdub modes:</b> oSy1/oSy2/oMi1/oMi2/oLi1/oLi2 — layer new audio on top of existing buffer instead of overwriting.</li>

  <li><b>PrEP (silent pre-record):</b> Set Mi.St = Mi.En = -127 (buffer audio only) + b.PLy = PrEP + b.LEn + b.rEc → fragment records silently, purges reverb/delay buffers, kills decay/release tails → next fragment starts clean with the prepped buffer. Display shows 'P'. ★</li>

  <li><b>Mix Start/End (<kbd>1/Mi.St</kbd>, <kbd>2/Mi.En</kbd>):</b> -127 = buffer only · 0 = 50:50 · +127 = synth only. Automates crossfade between buffer and live synth audio over the fragment.</li>
  <li><b>Noise (<kbd>3/n.V.St</kbd>, <kbd>4/n.V.En</kbd>):</b> White noise volume at start/end — ramps over fragment. Combine with filter for risers.</li>
  <li><b>Gater (<kbd>5/Gatr</kbd>):</b> Rhythmic on/off gate. Positive values = Aud target (gates DJ FX audio; synth passes through unaltered). Negative values = FLt target (gates filtered audio; behavior depends on Fl.tG). Patterns identical to track gater.</li>
  <li><b>Filter target (<kbd>6/Fl.tG</kbd>):</b> MiX = entire mix · buFF = buffer only · Synt = synth only · noiS = noise only.</li>
  <li><b>Filter sweep (<kbd>7/FL.St</kbd>, <kbd>8/FL.En</kbd>):</b> -127 = LP closed · 0 = off · +127 = HP open. Set St low + En high = classic open-filter riser. ★</li>
  <li><b>Drone (<kbd>9/d.V.St</kbd>, <kbd>10/d.V.En</kbd>, <kbd>11/d.P.St</kbd>, <kbd>12/d.P.En</kbd>):</b> Sine wave tone, volume + pitch (MIDI semitones). Negative volume = stereo-width mode (inaudible in mono). Notes below #19 (~25Hz) high-pass filtered toward silence.</li>

  <li><b>LED display (lower 4 chars):</b> char 1 = buf playing (1/2/P/-) · chars 2–3 = active effects (d=drone, n=noise, F=filter) · char 4 = buf recording. '-' on char 1 = buffer inaudible (Mi.St/Mi.En both at +127 = synth only).</li>

  <li><b>Live glitch trick:</b> Set fr.1 to record buf1 at 16 steps → scroll quickly to fr.2 mid-record → buffer captures only the snippet → flip back/forth for evolving stutter/build. ★</li>
  <li><b>Line-in looper:</b> b.rEc = Li-1 → plays song → records external audio in real-time → next fragment plays + mangles it. Like a live looper inside your arrangement.</li>
  <li><b>Save buffer permanently:</b> Enter Sampler (hold <kbd>Value</kbd> + short-press <kbd>14/A6</kbd>) → context menu → <kbd>SKiP bacK</kbd> → dumps last 11.8s to sample slice. Counts toward device sample storage.</li>
  <li><b>Pre-render complex fragments:</b> Record a CPU-heavy fragment to a buffer → play back in subsequent fragments with patterns disabled → frees voices/DSP for new material. ★</li>
</ul>
<h3 style="margin-top:18px">Resampling</h3>
<ul class="tips" style="margin-bottom:18px">
  <li><b>Skip-back resample (★):</b> Play song → enter Sampler (hold <kbd>Value</kbd> + short-press <kbd>14/A6</kbd>) → context menu → <kbd>SKiP bacK</kbd> → captures last 11.8s of audio output before you entered. Trim &amp; slice as normal.</li>
  <li><b>Resample a specific mix/pattern:</b> Set your pattern length → press Play → let it loop → enter Sampler → SKiP bacK. You get the last 11.8s — enough for most patterns.</li>
  <li><b>Use on aux track (A1–A5):</b> After resampling, apply kit to an aux track: context menu → <kbd>SMPK Pach</kbd> → switch to target track → <kbd>Pste Pach</kbd>. Now sequence the resampled loop as a slice.</li>
  <li><b>Chop the resample:</b> Auto-slice by transients (context menu → Auto → hold <kbd>Write</kbd> + turn Value for count), or Even-slice for drum loops (Even → same). Hold slice → press Value → turn Value to trim St.C/St.F/En.C/En.F.</li>
  <li><b>Lo-fi resample:</b> On the track using the resampled kit, go to Osc page → hold <kbd>16/SM.Ho</kbd> + turn Value to lower sample rate (value 2 = 14.7kHz, value 4 = 8.8kHz). Reduces file-size feel and adds grit.</li>
  <li><b>Warp &amp; pitch-shift a slice:</b> Hold slice until blinking → press Value → cycle to <kbd>Warp</kbd> or <kbd>Pich</kbd> → turn Value to adjust. Warp = time-stretch without pitch change.</li>
  <li><b>Recover "lost" audio:</b> If you sliced too aggressively, context menu → <kbd>Init → MStr</kbd> collapses all slices back to the original full sample.</li>
  <li><b>Input sources:</b> In Sampler, turn Value to choose — <kbd>22.16 line</kbd> (synth/keyboard), <kbd>44.8 line</kbd> (drums/voice lo-fi), <kbd>Mic 24dB</kbd> (mic/vocal).</li>
</ul>
<h3 style="margin-top:18px">Hardware Layout</h3>
<div style="
  display:inline-block;background:#0a0a0a;border:1px solid #2a2a2a;
  border-radius:10px;padding:14px 16px 10px;margin-bottom:14px;
">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;gap:8px">
    <div style="
      padding:4px 10px;border-radius:4px;background:#1a1a1a;border:1px solid #3a3a3a;border-bottom:2px solid #111;
      font-size:10px;font-weight:700;color:#e0e0e0;font-family:'SF Mono','Fira Code',monospace;
      box-shadow:inset 0 1px 0 rgba(255,255,255,.06);
    ">WRITE</div>
    <div style="
      width:32px;height:32px;border-radius:50%;background:#1a1a1a;
      border:1px solid #3a3a3a;box-shadow:0 2px 4px #000,inset 0 1px 0 rgba(255,255,255,.06);
      display:flex;align-items:center;justify-content:center;
      font-size:8px;color:var(--c);font-family:'SF Mono','Fira Code',monospace;font-weight:700;
    ">VAL</div>
    <div style="
      padding:4px 10px;border-radius:4px;background:#1a1a1a;border:1px solid #3a3a3a;border-bottom:2px solid #111;
      font-size:10px;font-weight:700;color:#e0e0e0;font-family:'SF Mono','Fira Code',monospace;
      box-shadow:inset 0 1px 0 rgba(255,255,255,.06);
    ">PLAY</div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px">${btnHtml}</div>
</div>`;
  }

  const panel=document.createElement('div');
  panel.className='panel'+(i===0?' active':'');
  panel.id=d.id;
  panel.style.setProperty('--c',d.color);

  // Format workflow with subsections if they contain section headers (═══)
  const formatWorkflow=items=>{
    let html='';
    let currentSection=[];
    items.forEach(item=>{
      if(item.includes('═══')){
        if(currentSection.length>0){
          html+='<ol class="wf">'+currentSection.map(s=>`<li>${s}</li>`).join('')+'</ol>';
          currentSection=[];
        }
        const headerText=item.replace(/═══\s*/g,'').replace(/\s*═══/g,'').trim();
        html+=`<h4 style="margin-top:16px;margin-bottom:8px;font-size:12px;font-weight:600;color:var(--text)">${headerText}</h4>`;
      }else{
        currentSection.push(item);
      }
    });
    if(currentSection.length>0){
      html+='<ol class="wf">'+currentSection.map(s=>`<li>${s}</li>`).join('')+'</ol>';
    }
    return html;
  };

  panel.innerHTML=`
    <div class="ph"><div>
      <h2>${d.name}</h2>
      <span class="badge">${d.cat}</span><span class="usecase">${d.use}</span>
    </div></div>
    <p class="overview">${d.overview}</p>
    ${d.shortcuts.length>0?`<h3>Shortcuts &amp; Controls <span style="color:gold;font-size:11px">★ = most useful</span></h3>
    <div class="st-wrap"><table class="st"><thead><tr><th>Action</th><th>Combo / Control</th></tr></thead><tbody>${rows}</tbody></table></div>`:''}
    ${postTableHtml}
    <div class="grid2">
      <div><h3>${d.workflowTitle||'Song-Making Workflow'}</h3>${formatWorkflow(d.workflow)}</div>
      <div>
        ${d.tips.length>0?`<h3>Pro Tips</h3><ul class="tips">${d.tips.map(t=>`<li>${t}</li>`).join('')}</ul>`:''}
        ${extraHtml}
      </div>
    </div>`;
  content.appendChild(panel);
});

// Search — filter rows in active panel only
document.getElementById('search').addEventListener('input',function(){
  const q=this.value.toLowerCase();
  document.querySelectorAll('.panel.active .st tbody tr').forEach(row=>{
    if(row.classList.contains('cat-label'))return;
    row.classList.toggle('hidden',q!==''&&!row.textContent.toLowerCase().includes(q));
  });
  // Also hide category labels with no visible rows below them
  document.querySelectorAll('.panel.active .st tbody tr.cat-label').forEach(label=>{
    let next=label.nextElementSibling;
    let anyVisible=false;
    while(next && !next.classList.contains('cat-label')){
      if(!next.classList.contains('hidden')) anyVisible=true;
      next=next.nextElementSibling;
    }
    label.classList.toggle('hidden',!anyVisible&&q!=='');
  });
});

// ⌘K or Ctrl+K focuses search
document.addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();document.getElementById('search').focus();}
  if(e.key==='Escape') document.getElementById('search').value='';
});
