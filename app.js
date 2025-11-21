document.getElementById('continueBtn').onclick = function() {
  document.getElementById('splash').style.display = 'none';
  showMoodPage();
};
let isEraser = false; //used in creative mode

function goBackToWelcome() {
  document.getElementById('mood').style.display = 'none';
  document.getElementById('splash').style.display = 'flex';
}

function goBackToMoodPage() {
  showMoodPage();
}

function setMoodOverlay(moodLabel) {
  const overlay = document.getElementById('moodOverlay');
  let color = '', animation = '';
  if (moodLabel === "Happy") {
    color = 'rgba(255,231,181,0.65)'; // warm, light yellow
    animation = '🩷';
  } else if (moodLabel === "Stressed") {
    color = 'rgba(180,212,255,0.60)'; // calming blue
    animation = 'pulse 5s infinite'; // slow pulse
  } else if (moodLabel === "Anxious") {
    color = 'rgba(178,216,200,0.55)'; // gentle muted green
    animation = 'fadein 6s infinite alternate'; // fading
  } else if (moodLabel === "Creative") {
    color = 'rgba(215,192,250,0.52)'; // dreamy violet
    animation = ''; // sparkles optional
  } else if (moodLabel === "Bored") {
    color = 'rgba(220,222,228,0.47)'; // neutral pale
    animation = 'slowmove 10s infinite'; // slow movement
  } else if (moodLabel === "Tired") {
    color = 'rgba(31,38,60,0.68)'; // dimmed navy
    animation = 'drift 10s infinite alternate'; // slow drift
  }
  overlay.style.background = color;
  overlay.style.animation = animation;
}

// Show mood selection page with back arrow at top left

function showMoodPage() {
  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😫", label: "Stressed"},
    { emoji: "😰", label: "Anxious"},
    { emoji: "🤔", label: "Creative" },
    { emoji: "🥱", label: "Bored" },
    { emoji: "🫠", label: "Tired" }
  ];
  const moodDiv = document.getElementById('mood');
  moodDiv.style.display = 'flex';
  moodDiv.innerHTML = `
  <span class="back-arrow" onclick="goBackToWelcome()">&#8592;</span>
    <h2>How are you feeling today?</h2>
    <div id="moodButtons"></div>
  `;
  const buttonsDiv = document.getElementById('moodButtons');
  moods.forEach(mood => {
    const btn = document.createElement('button');
    btn.innerHTML = `<span style="font-size:2.5em">${mood.emoji}</span><br>
      <span style="font-size:1em">${mood.label}</span>`;
    btn.style.borderRadius = '50%';
    btn.style.padding = '16px 30px';
    btn.style.background = '#fff';
    btn.style.color = '#333';
    btn.style.border = '2px solid #6a85b6';
    btn.style.cursor = 'pointer';
    btn.style.margin = '10px';
    btn.onclick = function() {
   showMoodResult(mood);
    };
    buttonsDiv.appendChild(btn);
  });
}

// Mood result logic for Happy and other moods
function showMoodResult(mood) {
  setMoodOverlay(mood.label);
  if(mood.label === "Happy") {
    document.getElementById('mood').innerHTML = `
    <span class="back-arrow" onclick="goBackToMoodPage()">&#8592;</span>
    <h2>Happy Mood 😊</h2>
    <p>Write down three things you're grateful for today!</p>
    <textarea id="gratitudeInput" rows="6" style="width:80%;max-width:400px;display:block;margin:12px auto 8px auto;padding:8px;font-size:1.1em;"></textarea>
    <button onclick="saveGratitude()" style="margin-bottom:14px;">Save Gratitude Notes</button>
    <div id="gratitudeSaved" style="color:green;font-weight:bold;"></div>
    <h3>Want instant happiness? Check out YouTube now:</h3>
    <a href="https://www.youtube.com/" target="_blank" style="background:#ff0000;color:#fff;padding:10px 22px;border-radius:22px;text-decoration:none;display:inline-block;margin-bottom:18px;">Go to YouTube App</a>
    <br><button onclick="location.reload()">Go Back</button>  
    `;
  }
   else if (mood.label === "Stressed") {
    document.getElementById('mood').innerHTML = `
    <span class="back-arrow" onclick="goBackToMoodPage()">&#8592;</span>
    <h2>Stressed Mood 😣</h2>
      <p>Try this: Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds. Repeat for 30 seconds.</p>
      <div id="breathingGuide" style="margin:18px auto;">
        <div id="breathCircle" style="width:100px;height:100px;border-radius:50%;background:#bdd7fa;margin:auto;transition:all 1s;">
        <img src="breath.jpg" id="circleImg" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" alt="Circle Image"></div>
        <div id="breathText" style="text-align:center;margin-top:14px;font-size:1.2em;">Get Ready</div>
        <button id="startBreath" style="display:block;margin:16px auto;">Start Breathing</button>
      </div>
      <a href="https://www.youtube.com/" target="_blank" style="background:#ff0000;color:#fff;padding:10px 22px;border-radius:22px;text-decoration:none;display:inline-block;margin-bottom:18px;">Open Relaxing Music on YouTube</a>
      <br><button onclick="location.reload()">Go Back</button>
    `;
    document.getElementById('startBreath').onclick = startBreathing;
  } else if (mood.label === "Anxious") {
    document.getElementById('mood').innerHTML = `
    <span class="back-arrow" onclick="goBackToMoodPage()">&#8592;</span
    <h2>Anxious Mood 😰</h2>
      <p>Write down your worries and one positive thought.</p>
      <textarea id="worriesInput" rows="3" placeholder="What are you anxious about?" style="width:90%;max-width:400px;display:block;margin:12px auto 8px auto;padding:7px;font-size:1em;"></textarea>
      <textarea id="positiveInput" rows="2" placeholder="One positive thought..." style="width:90%;max-width:400px;display:block;margin:7px auto 8px auto;padding:7px;font-size:1em;"></textarea>
      <button onclick="saveAnxious()" style="margin-bottom:14px;">Save</button>
      <div id="anxiousSaved" style="color:green;font-weight:bold;"></div>
      <h3>Calm yourself with grounding:</h3>
      <button onclick="showGrounding()" style="display:block;margin:10px auto;">Start 5-4-3-2-1 Grounding</button>
      <div id="groundingSteps" style="font-style:italic;color:#295;"></div>
      <h3 style="margin-top:22px;">Explore more on YouTube:</h3>
      <a href="https://www.youtube.com/" target="_blank" style="background:#ff0000;color:#fff;padding:10px 22px;border-radius:22px;text-decoration:none;display:inline-block;margin-bottom:14px;">Go to YouTube App</a>
      <br><button onclick="location.reload()">Go Back</button>
    `;
  }
   else if (mood.label === "Creative") {
    document.getElementById('mood').innerHTML = `
    <span class="back-arrow" onclick="goBackToMoodPage()">&#8592;</span>
    <h2>Creative Mood 🤔</h2>
    <p>Feeling creative? Doodle, invent, or explore new ideas!</p>
    <div style="width:320px;margin:15px auto 10px auto;">
      <canvas id="drawCanvas" width="300" height="230" style="border:2px solid #aaa; border-radius:12px; background:#fff;box-shadow:0 0 8px #ddd;"></canvas>
      <div style="margin:8px 0; display:flex; align-items: center; justify-content: center; gap: 10px;">
      <button onclick="setEraser()"
      id="eraserBtn">Eraser</button>
        <label>Brush 
          <input type="color" id="colorPicker" value="#2e5ecf">
        </label>
        <label>Size 
          <input type="range" id="sizePicker" min="2" max="16" value="4">
        </label>
      </div>
    </div>
    <h3 style="margin-top:16px;">Need inspiration?</h3>
    <button onclick="showPrompt()" style="display:block;margin:7px auto 15px;">Generate Idea</button>
    <div id="creativePrompt" style="font-style:italic;color:#1e587c;margin-bottom:14px;"></div>
    <a href="https://www.youtube.com/" target="_blank" style="background:#ff0000;color:#fff;padding:10px 22px;border-radius:22px;text-decoration:none;display:inline-block;margin:13px 0;">Go to YouTube App</a>
    <br><button onclick="location.reload()">Go Back</button>
  `;
 setTimeout(setupCanvas, 50);
}

else if (mood.label === "Bored") {
  document.getElementById('mood').innerHTML = `
    <span class="back-arrow" onclick="goBackToMoodPage()">&#8592;</span>
    <h2>Bored Mood 🥱</h2>
    <p>Try a quick riddle or brain teaser to wake up your mind!</p>
    <div style="margin:12px 0;">
      <span id="riddleQ" style="font-weight:bold;"></span>
      <br>
      <input type="text" id="riddleGuess" placeholder="Your guess..." style="margin-bottom:6px;padding:7px;width:80%;max-width:220px;">
      <button onclick="checkRiddle()" style="margin-left:6px;">Check</button>
      <div id="riddleFeedback" style="margin:6px 0; color:#d98424; font-weight:bold;"></div>
      <button onclick="showRiddle()" style="margin-top:5px;">Next Riddle</button>
      <button onclick="revealAnswer()" style="margin-left:8px;text-decoration:underline;font-size:0.96em;">Show Answer</button>
      <span id="riddleAnswer" style="color:#1e587c; margin-left:10px;"> </span>
    </div>
    <hr style="margin:15px 0;">
    <div>
      <p><b>Mini Quiz:</b></p>
      <div id="quizBlock"></div>
    </div>
    <hr style="margin:15px 0;">
    <div>
      <p><b>List your dream travel places:</b></p>
      <textarea id="travelPlaces" rows="3" style="width:90%;max-width:400px;display:block;margin-bottom:10px;padding:7px;font-size:1em;" placeholder="E.g. Paris, Japan, Ladakh..."></textarea>
      <button onclick="saveTravel()" style="margin-bottom:10px;">Save Places</button>
      <div id="travelSaved" style="color:green;font-weight:bold;"></div>
    </div>
    <hr style="margin:16px 0;">
    <a href="https://www.youtube.com/" target="_blank" style="background:#ff0000;color:#fff;padding:10px 22px;border-radius:22px;text-decoration:none;display:inline-block;">Go to YouTube for Fun!</a>
    <br><button onclick="location.reload()" style="margin-top:16px;">Go Back</button>
  `;
  showRiddle();
  showQuiz();
}

else if (mood.label === "Tired") {
  document.getElementById('mood').innerHTML = `
    <span class="back-arrow" onclick="goBackToMoodPage()">&#8592;</span>
    <div id="tiredContent" style="position:relative;z-index:20;text-align:center;padding:32px 0 10px 0;">
      <span style="font-size:2.4em;">🌙</span>
      <h2 style="color:#e0dcf6;margin-bottom:4px;">Tired?</h2>
      <p style="color:#dbdef5;margin-top:6px;">
        Dimmed mode on. Take a 1-minute pause, rest your eyes, and recharge.<br>
        <span style="color:#b0d4ea;font-style:italic;">You can play a calming sound or spin for a gentle tip below.</span>
      </p>
      <div style="margin:14px 0 10px 0;">
        <button onclick="showTiredAudioBlock()" style="margin:0px 5px 7px 0;padding:8px 16px;background:#90b1f8;color:#222;border:none;border-radius:15px;box-shadow:0 2px 8px #2222;">🎧 Play Calming Soundscape</button>
        <button onclick="stopTiredAudio()" style="margin:0px 0px 7px 0;padding:8px 16px;background:#f2cee0;color:#222;border:none;border-radius:15px;">⏹ Stop Sound</button>
        <select id="audioSelect" style="margin-left:8px;padding:6px 8px;border-radius:8px;">
          <option value="rain1">Rain #1</option>
          <option value="rain2">Rain #2</option>
          <option value="rain3">Rain #3</option>
          <option value="lofi1">Lofi #1</option>
          <option value="lofi2">Lofi #2</option>
          <option value="lofi3">Lofi #3</option>
        </select>
      </div>
      <div id="tiredAudioBlock" style="display:none;margin-bottom:14px;">
        <audio id="tiredAudio" controls loop style="width:80%;max-width:270px;margin:8px auto 0 auto;display:block;">
          <source id="tiredAudioSrc" src="" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
        <div style="color:#d4eaff;font-style:italic;margin-top:4px;">Pause, stop, change track anytime</div>
      </div>
      <hr style="margin:24px auto 15px auto;border:0;height:1.5px;background:#2c334f;width:65%;">
      <button onclick="spinCarePrompt()" style="padding:8px 28px;background:#efe0cf;color:#332;border-radius:18px;margin-bottom:10px;">🌀 Spin for a Self-Care Tip</button>
      <div id="spinCareResult" style="color:#f3e1b7;margin:12px 0;font-size:1.09em;font-weight:bold;min-height:24px;"></div>
      <hr style="margin:24px auto 13px auto;border:0;height:1.5px;background:#363858;width:65%;">
      <a href="https://www.youtube.com" target="_blank" style="background:#1f2637;color:#e4daaf;padding:9px 22px;border-radius:18px;text-decoration:none;display:inline-block;margin-top:8px;">🌌 Sleepy Lofi Playlist on YouTube</a>
      <br>
      <button onclick="closeTiredMode()" style="background:#d4eaff;color:#2b2c36;margin-top:16px;padding:7px 22px;border:none;border-radius:14px;">Back to Main</button>
    </div>
  `;
  // Set up audio selection default
  document.getElementById('audioSelect').onchange = function() {
    setTiredAudio(this.value);
  };
}
}
// Gratitude notes "Save" logic
function saveGratitude() {
  let text = document.getElementById('gratitudeInput').value;
  if(text.trim().length > 0){
    localStorage.setItem('gratitudeNotes', text);
    document.getElementById('gratitudeSaved').innerText = "Saved!";
  } else {
    document.getElementById('gratitudeSaved').innerText = "Please write something before saving.";
  }
}

// Breathing/exercise timer/visual for Stressed mood
function startBreathing() {
  const breathText = document.getElementById('breathText');
  const breathCircle = document.getElementById('breathCircle');
  const circleImg = breathCircle.querySelector('#circleImg');
  const breathPhases = [
    {text:"Inhale", duration:4000, size:150},
    {text:"Hold", duration:4000, size:150},
    {text:"Exhale", duration:4000, size:100}
  ];
  let totalDuration = 30000; // 30 seconds
  let elapsed = 0;
  let phaseIndex = 0;

  breathText.innerText = "Inhale";
  breathCircle.style.width = "150px";
  breathCircle.style.height = "150px";
  document.getElementById('startBreath').style.display = 'none';

  function nextPhase() {
    if(elapsed >= totalDuration) {
      breathText.innerText = "Well done!";
      breathCircle.style.width = "100px";
      breathCircle.style.height = "100px";
      return;
    }
    let phase = breathPhases[phaseIndex % breathPhases.length];
    breathText.innerText = phase.text;
    breathCircle.style.width = phase.size + "px";
    breathCircle.style.height = phase.size + "px";
    setTimeout(() => {
      elapsed += phase.duration;
      phaseIndex++;
      nextPhase();
    }, phase.duration);
  }

  nextPhase();
}

// Save notes for Anxious mood
function saveAnxious() {
  let worries = document.getElementById('worriesInput').value.trim();
  let positive = document.getElementById('positiveInput').value.trim();
  if(worries.length > 0 && positive.length > 0) {
    localStorage.setItem('anxiousWorries', worries);
    localStorage.setItem('anxiousPositive', positive);
    document.getElementById('anxiousSaved').innerText = "Saved!";
  } else {
    document.getElementById('anxiousSaved').innerText = "Please fill both fields.";
  }
}

// Animated 5-4-3-2-1 grounding
function showGrounding() {
  const steps = [
    "👀 Name <b>5 things</b> you see around you.",
    "🖐 Touch <b>4 things</b> you can feel.",
    "👂 Notice <b>3 things</b> you hear right now.",
    "👃 Find <b>2 things</b> you can smell.",
    "👅 Focus on <b>1 thing</b> you can taste."
  ];
  let i = 0;
  const groundingEl = document.getElementById('groundingSteps');
  groundingEl.innerHTML = "Ready? Let's start!";
  function nextStep() {
    if (i < steps.length) {
      groundingEl.innerHTML = steps[i];
      i++;
      setTimeout(nextStep, 7500);
    } else {
      groundingEl.innerHTML = "Well done! You are back in the moment.";
    }
  }
  setTimeout(nextStep, 1200);
}

// Drawing canvas logic
function setupCanvas() {
  const canvas = document.getElementById('drawCanvas');
  if (!canvas) return; // Only run if can6vas exists
  const ctx = canvas.getContext('2d');
  let drawing = false;
  let brushColor = document.getElementById('colorPicker').value;
  let brushSize = parseInt(document.getElementById('sizePicker').value, 10);

  document.getElementById('colorPicker').oninput = (e) => { brushColor = e.target.value; if(isEraser) setEraser(); };
  document.getElementById('sizePicker').oninput = (e) => { brushSize = parseInt(e.target.value, 10); };

  canvas.onmousedown = (e) => { drawing = true; draw(e); };
  canvas.onmouseup = () => { drawing = false; ctx.beginPath(); };
  canvas.onmouseleave = () => { drawing = false; ctx.beginPath(); };
  canvas.onmousemove = draw;

  function draw(e) {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isEraser  ? '#fff' : brushColor;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  }
}

// Toggle eraser
function setEraser() {
  isEraser = !isEraser;
  document.getElementById('eraserBtn').style.background = isEraser ? '#eee' : '';
}

// Idea generator
function showPrompt() {
  const prompts = [
    "Describe a morning only using color words.",
    "Invent a new animal and write or draw its story.",
    "Draw or describe an object in your room from memory.",
    "Write a haiku about your favorite place.",
    "Imagine your pet can talk—what do they say today?",
    "Design a superhero with a silly, surprising power.",
    "Draw your dream dessert.",
    "Pretend you're on another planet—what do you see?",
    "List 2-3 new hobbies you want to try next month.",
    "Make a mini comic in 3 panels."
  ];
  const prompt = prompts[Math.floor(Math.random() * prompts.length)];
  document.getElementById('creativePrompt').innerText = prompt;
}

// Fun riddles
const riddles = [
  { q: "What has keys but can’t open locks?", a: "A piano." },
  { q: "What gets wetter the more it dries?", a: "A towel." },
  { q: "I speak without a mouth and hear without ears. What am I?", a: "An echo." },
  { q: "What can travel around the world while staying in a corner?", a: "A stamp." },
  { q: "What goes up but never comes down?", a: "Your age." }
];
let lastRiddleIndex = -1;

function showRiddle() {
  let idx;
  do {
    idx = Math.floor(Math.random() * riddles.length);
  } while (idx === lastRiddleIndex && riddles.length > 1);
  lastRiddleIndex = idx;
  document.getElementById('riddleQ').innerText = riddles[idx].q;
  document.getElementById('riddleAnswer').innerText = "";
  document.getElementById('riddleAnswer').setAttribute('data-ans', riddles[idx].a);
  document.getElementById('riddleGuess').value = "";
  document.getElementById('riddleFeedback').innerText = "";
}

function checkRiddle() {
  const guess = (document.getElementById('riddleGuess').value || "").trim().toLowerCase();
  const realAns = (document.getElementById('riddleAnswer').getAttribute('data-ans') || "").trim().toLowerCase();
  let match = false;
  // Accepts a full, partial, or keyword match (e.g. "piano" for "A piano.")
  if (!guess) {
    document.getElementById('riddleFeedback').innerText = "Type your guess first!";
    return;
  }
  // Remove punctuation for flexible matching
  const ansSimple = realAns.replace(/[^a-zA-Z ]/g, '');
  if (ansSimple.includes(guess)) match = true;
  if (!match && guess.length >= 3) {
    // e.g. user types "echo" for "An echo"
    match = ansSimple.split(' ').includes(guess);
  }
  document.getElementById('riddleFeedback').innerText = match ? "Correct! 🎉" : "Nice try! Try again or reveal the answer.";
}

function revealAnswer() {
  const ans = document.getElementById('riddleAnswer').getAttribute('data-ans') || "";
  if(ans) document.getElementById('riddleAnswer').innerText = ans;
}

// Mini quiz
function showQuiz() {
  const quizQ = [
    { q: "What is the capital of France?", a: "Paris", options: ["Berlin", "Paris", "London", "Rome"] },
    { q: "Which planet is known as the Red Planet?", a: "Mars", options: ["Earth", "Mars", "Jupiter", "Venus"] }
  ];
  let idx = Math.floor(Math.random() * quizQ.length);
  let block = `<div style="margin-bottom:5px;font-weight:bold;">${quizQ[idx].q}</div>`;
  quizQ[idx].options.forEach(opt => {
    block += `<label style="margin-right:12px;">
      <input type="radio" name="quizOpt" value="${opt}" onclick="checkQuizAnswer('${quizQ[idx].a}','${opt}')"> ${opt}
    </label>`;
  });
  block += `<div id="quizMsg" style="margin-top:4px;font-weight:bold;"></div>`;
  document.getElementById('quizBlock').innerHTML = block;
}

function checkQuizAnswer(correct, selected) {
  document.getElementById('quizMsg').innerText = (correct===selected) ? "Correct! 🎉" : "Oops, try again!";
}

// Travel places save
function saveTravel() {
  const text = document.getElementById('travelPlaces').value;
  if(text.trim().length > 0){
    localStorage.setItem('dreamPlaces', text);
    document.getElementById('travelSaved').innerText = "Saved!";
  } else {
    document.getElementById('travelSaved').innerText = "Please write something before saving.";
  }
}

function showTiredAudioBlock() {
  document.getElementById('tiredAudioBlock').style.display = "block";
  // Set and play initial sound based on select
  const sel = document.getElementById('audioSelect').value;
  setTiredAudio(sel);
}

function setTiredAudio(type) {
  let src = "";
  if (type === 'rain1')
    src = "sleepy-rain-116521.mp3"; // Rain: Pixabay
  else if (type === 'rain2')
    src = "rain-by-prabajithk-119000.mp3"; // Rain: Pixabay
  else if (type === 'rain3')
    src = "ambient-forest-rain-375365.mp3"; // Rain: Pixabay
  else if (type === 'lofi1')
    src = "morning-relaxing-144011.mp3"; // Lofi: Pixabay
  else if (type === 'lofi2')
    src = "please-calm-my-mind-125566.mp3"; // Lofi: Pixabay
  else if (type === 'lofi3')
    src = "relaxing-piano-music-262898.mp3"; // Lofi: Pixabay
  document.getElementById('tiredAudioSrc').src = src;
  const audio = document.getElementById('tiredAudio');
  audio.load();
  audio.play().catch(()=>{});
}

function stopTiredAudio() {
  const audio = document.getElementById('tiredAudio');
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
}

const carePrompts = [
  "Blink slowly 10 times—let your eyes relax.",
  "Take three deep breaths in and out.",
  "Shrug your shoulders high, then lower them and sigh.",
  "Yawn and stretch your arms overhead.",
  "Sip some water. Hydration helps fatigue!",
  "Gently massage your temples for half a minute.",
  "Stand up and shake out your hands and feet.",
  "Look away from screens for 30 seconds.",
  "Rub your hands together for warmth.",
  "Smile softly—make resting pleasant!"
];

function spinCarePrompt() {
  const idx = Math.floor(Math.random() * carePrompts.length);
  document.getElementById('spinCareResult').innerText = carePrompts[idx];
}

function goBackToWelcome() {
  document.getElementById('splash').style.display = 'block';
  document.getElementById('buttonsPage').style.display = 'none';
}

function goBackToMoodPage() {
  showMoodPage();
}


