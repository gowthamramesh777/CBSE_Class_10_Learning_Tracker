// CBSE Class 10 — Core Subjects + Chapters
// You can freely edit/extend this list, or import/export JSON via the UI.

const SYLLABUS = [
  {
    subject: "English — First Flight (Prose) + Poems + Footprints Without Feet",
    avgTime: 30,
    lessons: [
      // First Flight — Prose
      "First Flight — 1. A Letter to God",
      "First Flight — 2. Nelson Mandela: Long Walk to Freedom",
      "First Flight — 3. Two Stories about Flying (I. His First Flight, II. Black Aeroplane)",
      "First Flight — 4. From the Diary of Anne Frank",
      "First Flight — 5. The Hundred Dresses – I",
      "First Flight — 6. The Hundred Dresses – II",
      "First Flight — 7. Glimpses of India (A Baker from Goa / Coorg / Tea from Assam)",
      "First Flight — 8. Mijbil the Otter",
      "First Flight — 9. Madam Rides the Bus",
      "First Flight — 10. The Sermon at Benares",
      "First Flight — 11. The Proposal (Play)",

      // First Flight — Poems
      "Poem — Dust of Snow",
      "Poem — Fire and Ice",
      "Poem — A Tiger in the Zoo",
      "Poem — How to Tell Wild Animals",
      "Poem — The Ball Poem",
      "Poem — Amanda!",
      "Poem — Animals",
      "Poem — The Trees",
      "Poem — Fog",
      "Poem — The Tale of Custard the Dragon",
      "Poem — For Anne Gregory",

      // Footprints Without Feet — Supplementary Reader
      "Footprints — 1. A Triumph of Surgery",
      "Footprints — 2. The Thief’s Story",
      "Footprints — 3. The Midnight Visitor",
      "Footprints — 4. A Question of Trust",
      "Footprints — 5. Footprints Without Feet",
      "Footprints — 6. The Making of a Scientist",
      "Footprints — 7. The Necklace",
      "Footprints — 8. The Hack Driver",
      "Footprints — 9. Bholi",
      "Footprints — 10. The Book That Saved the Earth"
    ]
  },
  {
    subject: "Mathematics",
    avgTime: 40,
    lessons: [
      "1. Real Numbers",
      "2. Polynomials",
      "3. Pair of Linear Equations in Two Variables",
      "4. Quadratic Equations",
      "5. Arithmetic Progressions",
      "6. Triangles",
      "7. Coordinate Geometry",
      "8. Introduction to Trigonometry",
      "9. Applications of Trigonometry",
      "10. Circles",
      "11. Constructions",
      "12. Areas Related to Circles",
      "13. Surface Areas and Volumes",
      "14. Statistics",
      "15. Probability"
    ]
  },
  {
    subject: "Science",
    avgTime: 35,
    lessons: [
      "1. Chemical Reactions and Equations",
      "2. Acids, Bases and Salts",
      "3. Metals and Non-metals",
      "4. Carbon and its Compounds",
      "5. Periodic Classification of Elements",
      "6. Life Processes",
      "7. Control and Coordination",
      "8. How do Organisms Reproduce?",
      "9. Heredity and Evolution",
      "10. Light — Reflection and Refraction",
      "11. The Human Eye and the Colourful World",
      "12. Electricity",
      "13. Magnetic Effects of Electric Current",
      "14. Sources of Energy",
      "15. Our Environment",
      "16. Sustainable Management of Natural Resources"
    ]
  },
  {
    subject: "Social Science — History (India & the Contemporary World–II)",
    avgTime: 30,
    lessons: [
      "History — 1. The Rise of Nationalism in Europe",
      "History — 2. Nationalism in India",
      "History — 3. The Making of a Global World",
      "History — 4. The Age of Industrialisation",
      "History — 5. Print Culture and the Modern World"
    ]
  },
  {
    subject: "Social Science — Geography (Contemporary India–II)",
    avgTime: 30,
    lessons: [
      "Geography — 1. Resources and Development",
      "Geography — 2. Forest and Wildlife Resources",
      "Geography — 3. Water Resources",
      "Geography — 4. Agriculture",
      "Geography — 5. Minerals and Energy Resources",
      "Geography — 6. Manufacturing Industries",
      "Geography — 7. Life Lines of National Economy"
    ]
  },
  {
    subject: "Social Science — Political Science (Democratic Politics–II)",
    avgTime: 25,
    lessons: [
      "Political Science — 1. Power Sharing",
      "Political Science — 2. Federalism",
      "Political Science — 3. Democracy and Diversity",
      "Political Science — 4. Gender, Religion and Caste",
      "Political Science — 5. Popular Struggles and Movements",
      "Political Science — 6. Political Parties",
      "Political Science — 7. Outcomes of Democracy",
      "Political Science — 8. Challenges to Democracy"
    ]
  },
  {
    subject: "Social Science — Economics (Understanding Economic Development)",
    avgTime: 25,
    lessons: [
      "Economics — 1. Development",
      "Economics — 2. Sectors of the Indian Economy",
      "Economics — 3. Money and Credit",
      "Economics — 4. Globalisation and the Indian Economy",
      "Economics — 5. Consumer Rights"
    ]
  }
];

/* ---------- Storage Helpers ---------- */
const STORAGE_KEY = "cbse_class10_tracker_v1";

function loadData(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return structuredClone(SYLLABUS);
    const parsed = JSON.parse(raw);
    return parsed.map(s => ({
      subject: s.subject,
      avgTime: Number.isFinite(+s.avgTime) ? +s.avgTime : 30,
      lessons: (s.lessons || []).map(item => {
        if(typeof item === "string") return { title: item, done: false };
        return { title: item.title, done: !!item.done };
      })
    }));
  }catch(e){
    console.warn("Failed to parse saved data, using defaults", e);
    return structuredClone(SYLLABUS);
  }
}

function saveData(data){
  const normalized = data.map(s => ({
    subject: s.subject,
    avgTime: s.avgTime,
    lessons: s.lessons.map(l => ({ title: l.title ?? l, done: !!l.done }))
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
}

/* ---------- Render ---------- */
let DATA = normalize(loadData());

function normalize(arr){
  return arr.map(s => ({
    subject: s.subject,
    avgTime: s.avgTime ?? 30,
    lessons: s.lessons.map(l => (typeof l === "string" ? { title: l, done: false } : l))
  }));
}

const elProgressBody = document.getElementById("progressBody");
const elAccordion = document.getElementById("subjectsAccordion");
const kTotal = document.getElementById("kpiTotal");
const kCompleted = document.getElementById("kpiCompleted");
const kTime = document.getElementById("kpiTime");

function renderAll(){
  elProgressBody.innerHTML = "";
  let totalLessons = 0, totalCompleted = 0, totalTime = 0;

  DATA.forEach((s, idx) => {
    const total = s.lessons.length;
    const completed = s.lessons.filter(l => l.done).length;
    const remaining = total - completed;
    const timeNeeded = Math.max(0, remaining * (Number(s.avgTime) || 0));
    totalLessons += total; totalCompleted += completed; totalTime += timeNeeded;

    const progress = total ? Math.round((completed/total) * 100) : 0;
    const progressClass = progress >= 70 ? "progress-ok" : (progress >= 40 ? "" : "progress-warn");

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${escapeHtml(s.subject)}</strong></td>
      <td>${total}</td>
      <td>${completed}</td>
      <td>${remaining}</td>
      <td>
        <input class="avg-time-input" type="number" min="1" value="${s.avgTime}" data-index="${idx}" aria-label="Average minutes per lesson for ${escapeHtml(s.subject)}"/>
      </td>
      <td>${timeNeeded}</td>
      <td><span class="progress-pill ${progressClass}">${progress}%</span></td>
    `;
    elProgressBody.appendChild(row);
  });

  kTotal.textContent = totalLessons;
  kCompleted.textContent = totalCompleted;
  kTime.textContent = totalTime;

  // Accordion
  elAccordion.innerHTML = "";
  DATA.forEach((s, idx) => {
    const completed = s.lessons.filter(l => l.done).length;
    const total = s.lessons.length;
    const item = document.createElement("div");
    item.className = "acc-item";
    item.innerHTML = `
      <div class="acc-header" role="button" tabindex="0" data-acc="${idx}">
        <h3>${escapeHtml(s.subject)}</h3>
        <small>${completed}/${total} lessons</small>
      </div>
      <div class="acc-content" id="acc-${idx}">
        ${s.lessons.map((l, j) => `
          <div class="lesson">
            <label>
              <input type="checkbox" data-s="${idx}" data-l="${j}" ${l.done ? "checked": ""} />
              <span>${escapeHtml(l.title)}</span>
            </label>
            <span class="time-badge">${s.avgTime} mins</span>
          </div>
        `).join("")}
      </div>
    `;
    elAccordion.appendChild(item);
  });
}

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, s => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[s]));
}

/* ---------- Interactions ---------- */
document.addEventListener("change", (e) => {
  const t = e.target;
  if(t.matches("input[type=checkbox][data-s]")){
    const si = +t.getAttribute("data-s");
    const li = +t.getAttribute("data-l");
    DATA[si].lessons[li].done = t.checked;
    saveData(DATA);
    renderAll();
  }
  if(t.matches(".avg-time-input")){
    const si = +t.getAttribute("data-index");
    DATA[si].avgTime = Math.max(1, +t.value || 1);
    saveData(DATA);
    renderAll();
  }
});

document.addEventListener("click", (e) => {
  const head = e.target.closest(".acc-header");
  if(head){
    const idx = head.getAttribute("data-acc");
    const content = document.getElementById(`acc-${idx}`);
    content.classList.toggle("open");
  }
});

document.getElementById("resetData").addEventListener("click", () => {
  if(confirm("Reset to default CBSE Class 10 subjects and clear your progress?")){
    DATA = normalize(structuredClone(SYLLABUS));
    saveData(DATA);
    renderAll();
  }
});

document.getElementById("exportJson").addEventListener("click", () => {
  const blob = new Blob([localStorage.getItem(STORAGE_KEY) || JSON.stringify(SYLLABUS,null,2)], {type:"application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "cbse-class10-tracker.json";
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("importJson").addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if(!file) return;
  try{
    const txt = await file.text();
    const obj = JSON.parse(txt);
    DATA = normalize(obj);
    saveData(DATA);
    renderAll();
  }catch(err){
    alert("Invalid JSON file.");
  }finally{
    e.target.value = "";
  }
});

// Initial render
renderAll();
