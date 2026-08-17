(() => {
  const storageKey = "urai-foundation-grant-concierge-demo-v1";
  const state = {
    stage: "profile",
    opportunity: "community-access",
    version: 1,
    signed: false,
    signedAt: null,
    answers: []
  };

  const fields = ["applicantName", "email", "organization", "organizationType", "mission", "project", "amount", "location"];
  const requiredProfileFields = ["applicantName", "email", "organization", "project", "amount"];

  const opportunityTemplates = {
    "community-access": {
      title: "Community Access Grant",
      questions: [
        { id: "organization", prompt: "Applicant organization or project name", source: "organization", kind: "profile" },
        { id: "mission", prompt: "Briefly describe your mission or purpose", source: "mission", kind: "profile" },
        { id: "project", prompt: "Describe the proposed project and the need it addresses", source: "project", kind: "profile" },
        { id: "amount", prompt: "Amount requested", source: "amount", kind: "profile", format: "currency" },
        { id: "impact", prompt: "What outcomes do you expect from this work?", kind: "generated" },
        { id: "measurement", prompt: "How will you measure whether the project worked?", kind: "missing" }
      ]
    },
    "digital-inclusion": {
      title: "Digital Inclusion Grant",
      questions: [
        { id: "organization", prompt: "Applicant organization or project name", source: "organization", kind: "profile" },
        { id: "location", prompt: "Primary community or location served", source: "location", kind: "profile" },
        { id: "project", prompt: "Describe the proposed digital inclusion project", source: "project", kind: "profile" },
        { id: "amount", prompt: "Amount requested", source: "amount", kind: "profile", format: "currency" },
        { id: "access", prompt: "How will the project reduce access barriers?", kind: "generated" },
        { id: "measurement", prompt: "What indicators will you use to measure participation and access?", kind: "missing" }
      ]
    }
  };

  const byId = (id) => document.getElementById(id);
  const escapeHtml = (value) => String(value || "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));

  function profile() {
    return Object.fromEntries(fields.map((id) => [id, byId(id)?.value.trim() || ""]));
  }

  function saveLocal() {
    const payload = { profile: profile(), opportunity: state.opportunity, version: state.version, answers: state.answers };
    localStorage.setItem(storageKey, JSON.stringify(payload));
  }

  function loadLocal() {
    try {
      const payload = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (!payload) return;
      fields.forEach((id) => { if (byId(id) && payload.profile?.[id]) byId(id).value = payload.profile[id]; });
      if (payload.opportunity && opportunityTemplates[payload.opportunity]) state.opportunity = payload.opportunity;
      if (Array.isArray(payload.answers)) state.answers = payload.answers;
      if (Number.isInteger(payload.version)) state.version = payload.version;
    } catch (_) {
      localStorage.removeItem(storageKey);
    }
  }

  function completionPercent() {
    const values = profile();
    const completed = requiredProfileFields.filter((field) => values[field]).length;
    return Math.round((completed / requiredProfileFields.length) * 100);
  }

  function updateCompletion() {
    byId("completionValue").textContent = `${completionPercent()}%`;
  }

  function showStage(name) {
    state.stage = name;
    document.querySelectorAll("[data-panel]").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.panel === name));
    document.querySelectorAll("[data-stage]").forEach((button) => button.classList.toggle("is-active", button.dataset.stage === name));
    const target = document.querySelector(`[data-panel="${name}"]`);
    target?.querySelector("h2")?.focus?.();
    window.scrollTo({ top: Math.max(0, document.querySelector(".grant-workspace").offsetTop - 90), behavior: "smooth" });
  }

  function formatValue(question, value) {
    if (!value) return "";
    if (question.format === "currency") {
      const number = Number(String(value).replace(/[^0-9.]/g, ""));
      return Number.isFinite(number) ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(number) : value;
    }
    return value;
  }

  function generatedDraft(question, p) {
    if (question.id === "impact") {
      if (!p.project) return "";
      return `This project is intended to expand meaningful access and participation for the people it serves. The applicant expects the work described in the project narrative to produce practical, observable improvements in access, engagement, and community benefit. Before submission, the applicant should replace this draft with specific outcome targets and quantities supported by its own records.`;
    }
    if (question.id === "access") {
      if (!p.project) return "";
      return `The proposed work is designed to reduce barriers by making the program or resource easier to reach, understand, and use. The final answer should identify the specific barriers addressed, the accessibility methods used, and the population served using applicant-confirmed facts rather than inferred demographics.`;
    }
    return "";
  }

  function buildApplication() {
    const p = profile();
    const template = opportunityTemplates[state.opportunity];
    state.version += state.answers.length ? 1 : 0;
    state.signed = false;
    state.signedAt = null;
    state.answers = template.questions.map((question) => {
      const raw = question.source ? p[question.source] : "";
      if (question.kind === "profile") {
        return { ...question, value: formatValue(question, raw), status: raw ? "verified" : "missing", provenance: raw ? `Applicant profile · ${question.source}` : "Missing applicant fact" };
      }
      if (question.kind === "generated") {
        const draft = generatedDraft(question, p);
        return { ...question, value: draft, status: draft ? "generated" : "missing", provenance: draft ? "URAI-generated draft from applicant project description" : "Missing source information" };
      }
      return { ...question, value: "", status: "missing", provenance: "Applicant review required" };
    });
    renderApplication();
    renderReview();
    byId("versionChip").textContent = `Draft v${state.version}`;
    saveLocal();
    showStage("application");
  }

  function renderApplication() {
    const container = byId("applicationFields");
    container.innerHTML = state.answers.map((answer, index) => `
      <article class="application-answer">
        <div class="answer-topline"><strong>${escapeHtml(answer.prompt)}</strong><span class="source-badge ${answer.status}">${answer.status === "verified" ? "Profile fact" : answer.status === "generated" ? "Generated draft" : "Needs you"}</span></div>
        <textarea data-answer-index="${index}" aria-label="${escapeHtml(answer.prompt)}">${escapeHtml(answer.value)}</textarea>
        <p>${escapeHtml(answer.provenance)}</p>
      </article>`).join("");
    container.querySelectorAll("textarea").forEach((textarea) => textarea.addEventListener("input", (event) => updateAnswer(Number(event.target.dataset.answerIndex), event.target.value)));
  }

  function updateAnswer(index, value) {
    const answer = state.answers[index];
    answer.value = value.trim();
    if (!answer.value) answer.status = "missing";
    else if (answer.kind === "generated" && answer.status !== "verified") answer.status = "generated";
    else if (answer.kind === "missing") answer.status = "verified";
    state.signed = false;
    byId("signoffReceipt").hidden = true;
    byId("exportButton").disabled = true;
    saveLocal();
    renderReview();
  }

  function renderReview() {
    const generated = state.answers.filter((answer) => answer.status === "generated");
    const missing = state.answers.filter((answer) => answer.status === "missing");
    const verified = state.answers.filter((answer) => answer.status === "verified");
    byId("reviewSummary").innerHTML = `
      <div class="summary-card"><strong>${verified.length}</strong><span>profile or applicant-confirmed answers</span></div>
      <div class="summary-card"><strong>${generated.length}</strong><span>generated drafts to review</span></div>
      <div class="summary-card"><strong>${missing.length}</strong><span>unresolved items blocking sign-off</span></div>`;
    const items = [...generated, ...missing];
    byId("reviewItems").innerHTML = items.length ? items.map((answer) => {
      const index = state.answers.indexOf(answer);
      return `<article class="review-item ${answer.status}"><div class="answer-topline"><strong>${escapeHtml(answer.prompt)}</strong><span class="source-badge ${answer.status}">${answer.status === "generated" ? "Review generated draft" : "Required before sign-off"}</span></div><textarea data-review-index="${index}" aria-label="Review ${escapeHtml(answer.prompt)}">${escapeHtml(answer.value)}</textarea><p>${escapeHtml(answer.provenance)}</p></article>`;
    }).join("") : `<div class="review-item"><strong>Everything is resolved.</strong><p>There are no generated or missing answers left in this demonstration application.</p></div>`;
    byId("reviewItems").querySelectorAll("textarea").forEach((textarea) => textarea.addEventListener("input", (event) => {
      updateAnswer(Number(event.target.dataset.reviewIndex), event.target.value);
      renderApplication();
    }));
    byId("toSignoff").disabled = missing.length > 0;
    updateSignButton();
  }

  function updateSignButton() {
    const noMissing = state.answers.length > 0 && !state.answers.some((answer) => answer.status === "missing" || !answer.value.trim());
    const checked = byId("attestAccuracy")?.checked && byId("attestAuthority")?.checked;
    const name = byId("signatureName")?.value.trim();
    byId("signButton").disabled = !(noMissing && checked && name);
  }

  function signApplication() {
    const signer = byId("signatureName").value.trim();
    state.signed = true;
    state.signedAt = new Date().toISOString();
    const template = opportunityTemplates[state.opportunity];
    const receipt = byId("signoffReceipt");
    receipt.hidden = false;
    receipt.innerHTML = `<strong>Signed demonstration application</strong><p>${escapeHtml(template.title)} · Draft v${state.version}<br>Signed by ${escapeHtml(signer)} at ${escapeHtml(new Date(state.signedAt).toLocaleString())}.</p><p>This browser-only demonstration receipt is not an electronic-signature service or proof of external submission.</p>`;
    byId("exportButton").disabled = false;
    saveLocal();
  }

  function exportApplication() {
    if (!state.signed) return;
    const payload = {
      schemaVersion: "grant-concierge-demo-v1",
      opportunity: opportunityTemplates[state.opportunity].title,
      applicationVersion: state.version,
      profile: profile(),
      answers: state.answers.map(({ id, prompt, value, status, provenance }) => ({ id, prompt, value, status, provenance })),
      signedAt: state.signedAt,
      signer: byId("signatureName").value.trim(),
      disclosure: "Demonstration export only. No external submission occurred."
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `urai-grant-application-demo-v${state.version}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function loadExample() {
    const example = {
      applicantName: "Jordan Rivera",
      email: "jordan@example.org",
      organization: "Open Door Community Project",
      organizationType: "Community group",
      mission: "Help neighbors access inclusive community resources, practical support, and learning opportunities.",
      project: "Create an accessible neighborhood resource series with captioned workshops, transportation support, assistive communication options, and take-home guides.",
      amount: "25000",
      location: "Example City, TX"
    };
    Object.entries(example).forEach(([id, value]) => { if (byId(id)) byId(id).value = value; });
    updateCompletion();
    saveLocal();
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadLocal();
    updateCompletion();
    document.querySelectorAll("[data-stage]").forEach((button) => button.addEventListener("click", () => showStage(button.dataset.stage)));
    document.querySelectorAll("[data-next]").forEach((button) => button.addEventListener("click", () => showStage(button.dataset.next)));
    document.querySelectorAll("[data-back]").forEach((button) => button.addEventListener("click", () => showStage(button.dataset.back)));
    fields.forEach((id) => byId(id)?.addEventListener("input", () => { updateCompletion(); saveLocal(); }));
    byId("loadExample").addEventListener("click", loadExample);
    document.querySelectorAll("[data-opportunity]").forEach((card) => card.addEventListener("click", () => {
      state.opportunity = card.dataset.opportunity;
      document.querySelectorAll("[data-opportunity]").forEach((item) => item.classList.toggle("is-selected", item === card));
      saveLocal();
    }));
    byId("prefillButton").addEventListener("click", buildApplication);
    byId("toSignoff").addEventListener("click", () => showStage("signoff"));
    ["attestAccuracy", "attestAuthority", "signatureName"].forEach((id) => byId(id).addEventListener("input", updateSignButton));
    byId("signButton").addEventListener("click", signApplication);
    byId("exportButton").addEventListener("click", exportApplication);
    if (state.answers.length) {
      renderApplication();
      renderReview();
      byId("versionChip").textContent = `Draft v${state.version}`;
    }
    document.querySelectorAll("[data-opportunity]").forEach((card) => card.classList.toggle("is-selected", card.dataset.opportunity === state.opportunity));
  });
})();
