(() => {
  const state = { stage: "profile", opportunity: "community-access", builtForOpportunity: null, draftStale: false, version: 1, signed: false, signedAt: null, approvedPayload: null, answers: [] };
  const fields = ["applicantName", "email", "organization", "organizationType", "mission", "project", "amount", "location"];
  const requiredProfileFields = ["applicantName", "email", "organization", "project", "amount"];
  const opportunityTemplates = {
    "community-access": {
      title: "Community Access Funding",
      questions: [
        { id: "organization", prompt: "Applicant organization name", source: "organization", kind: "profile" },
        { id: "mission", prompt: "Briefly describe the Foundation mission or purpose", source: "mission", kind: "profile" },
        { id: "project", prompt: "Describe the proposed program and the need it addresses", source: "project", kind: "profile" },
        { id: "amount", prompt: "Amount requested", source: "amount", kind: "profile", format: "currency" },
        { id: "impact", prompt: "What outcomes are expected from this work?", kind: "generated" },
        { id: "measurement", prompt: "How will the Foundation measure whether the program worked?", kind: "missing" }
      ]
    },
    "digital-inclusion": {
      title: "Digital Inclusion Funding",
      questions: [
        { id: "organization", prompt: "Applicant organization name", source: "organization", kind: "profile" },
        { id: "location", prompt: "Primary community or location served", source: "location", kind: "profile" },
        { id: "project", prompt: "Describe the proposed digital inclusion program", source: "project", kind: "profile" },
        { id: "amount", prompt: "Amount requested", source: "amount", kind: "profile", format: "currency" },
        { id: "access", prompt: "How will the program reduce access barriers?", kind: "generated" },
        { id: "measurement", prompt: "What indicators will measure participation and access?", kind: "missing" }
      ]
    }
  };
  const byId = (id) => document.getElementById(id);
  const escapeHtml = (value) => String(value || "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
  function profile() { return Object.fromEntries(fields.map((id) => [id, byId(id)?.value.trim() || ""])); }
  function resetSignoffInputs() {
    if (byId("attestAccuracy")) byId("attestAccuracy").checked = false;
    if (byId("attestAuthority")) byId("attestAuthority").checked = false;
    if (byId("signatureName")) byId("signatureName").value = "";
  }
  function invalidateApproval({ clearSignoff = true } = {}) {
    state.signed = false;
    state.signedAt = null;
    state.approvedPayload = null;
    if (clearSignoff) resetSignoffInputs();
    if (byId("signoffReceipt")) byId("signoffReceipt").hidden = true;
    if (byId("exportButton")) byId("exportButton").disabled = true;
  }
  function markDraftStale() {
    if (!state.answers.length) return;
    state.draftStale = true;
    invalidateApproval();
    byId("versionChip").textContent = `Draft v${state.version} · rebuild required`;
    renderReview();
  }
  function completionPercent() { const values = profile(); return Math.round((requiredProfileFields.filter((field) => values[field]).length / requiredProfileFields.length) * 100); }
  function updateCompletion() { byId("completionValue").textContent = `${completionPercent()}%`; }
  function showStage(name) {
    state.stage = name;
    document.querySelectorAll("[data-panel]").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.panel === name));
    document.querySelectorAll("[data-stage]").forEach((button) => button.classList.toggle("is-active", button.dataset.stage === name));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: Math.max(0, document.querySelector(".grant-workspace").offsetTop - 90), behavior: reduceMotion ? "auto" : "smooth" });
  }
  function formatValue(question, value) {
    if (!value) return "";
    if (question.format === "currency") {
      const normalized = String(value).trim();
      if (!/^\$?\s*\d+(?:,\d{3})*(?:\.\d{1,2})?$/.test(normalized)) return "";
      const number = Number(normalized.replace(/[$,\s]/g, ""));
      const fractionDigits = normalized.includes(".") ? normalized.split(".")[1].length : 0;
      return Number.isFinite(number) ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: fractionDigits, maximumFractionDigits: 2 }).format(number) : "";
    }
    return value;
  }
  function profileIsValid() {
    const form = byId("profileForm");
    const p = profile();
    const amountInput = byId("amount");
    const amountValid = Boolean(formatValue({ format: "currency" }, p.amount));
    amountInput?.setCustomValidity(amountValid ? "" : "Enter a valid amount, for example 25000 or 25000.50.");
    return Boolean(form?.checkValidity()) && requiredProfileFields.every((field) => Boolean(p[field])) && amountValid;
  }
  function generatedDraft(question, p) {
    if (question.id === "impact" && p.project) return "This draft should be replaced with Foundation-approved, measurable outcome targets supported by program and budget records. URAI may help shape the narrative, but it must not invent participant counts, impact metrics, demographics, partnerships, or prior results.";
    if (question.id === "access" && p.project) return "This draft should explain the specific access barriers the approved program addresses, the accessibility methods it uses, and the population served using Foundation-confirmed facts rather than inferred demographics or unsupported impact claims.";
    return "";
  }
  function buildApplication() {
    if (!profileIsValid()) {
      byId("profileForm")?.reportValidity();
      showStage("profile");
      return;
    }
    const p = profile(); const template = opportunityTemplates[state.opportunity];
    state.version += state.answers.length ? 1 : 0; invalidateApproval();
    state.builtForOpportunity = state.opportunity; state.draftStale = false;
    state.answers = template.questions.map((question) => {
      const raw = question.source ? p[question.source] : "";
      if (question.kind === "profile") { const value = formatValue(question, raw); const verified = Boolean(value); return { ...question, value, sourceValue: value, status: verified ? "verified" : "missing", provenance: verified ? `Foundation profile · ${question.source}` : "Missing or invalid Foundation fact" }; }
      if (question.kind === "generated") { const draft = generatedDraft(question, p); return { ...question, value: draft, status: draft ? "generated" : "missing", provenance: draft ? "URAI-generated draft from approved program description; employee review required" : "Missing source information" }; }
      return { ...question, value: "", status: "missing", provenance: "Authorized employee review required" };
    });
    renderApplication(); renderReview(); byId("versionChip").textContent = `Draft v${state.version}`; showStage("application");
  }
  function answerBadge(answer) {
    if (answer.status !== "verified") return answer.status === "generated" ? "Generated draft" : "Needs employee";
    return answer.kind === "profile" && answer.value === answer.sourceValue ? "Foundation fact" : "Employee confirmed";
  }
  function renderApplication() {
    const container = byId("applicationFields");
    container.innerHTML = state.answers.map((answer, index) => `<article class="application-answer"><div class="answer-topline"><strong>${escapeHtml(answer.prompt)}</strong><span class="source-badge ${answer.status}">${answerBadge(answer)}</span></div><textarea data-answer-index="${index}" aria-label="${escapeHtml(answer.prompt)}">${escapeHtml(answer.value)}</textarea><p>${escapeHtml(answer.provenance)}</p></article>`).join("");
    container.querySelectorAll("textarea").forEach((textarea) => textarea.addEventListener("input", (event) => updateAnswer(Number(event.target.dataset.answerIndex), event.target.value)));
  }
  function updateAnswer(index, value, renderReviewAfter = true) {
    const answer = state.answers[index];
    const nextValue = value.trim();
    const changedApprovedDraft = nextValue !== answer.value && Boolean(state.signed || state.approvedPayload);
    if (changedApprovedDraft) {
      state.version += 1;
      byId("versionChip").textContent = `Draft v${state.version}`;
    }
    answer.value = nextValue;
    if (!answer.value) {
      answer.status = "missing";
      answer.provenance = answer.kind === "profile" ? "Missing Foundation fact" : "Authorized employee review required";
    } else if (answer.kind === "profile" && answer.value === answer.sourceValue) {
      answer.status = "verified";
      answer.provenance = `Foundation profile · ${answer.source}`;
    } else {
      answer.status = "generated";
      answer.provenance = "Employee-modified draft; explicit employee review required";
    }
    invalidateApproval();
    if (renderReviewAfter) renderReview(); else updateSignButton();
  }
  function confirmReviewedAnswer(index) {
    const answer = state.answers[index];
    const reviewedValue = answer ? formatValue(answer, answer.value.trim()) : "";
    if (!reviewedValue) return;
    answer.value = reviewedValue;
    answer.status = "verified";
    answer.provenance = "Employee reviewed and confirmed for this demonstration draft";
    invalidateApproval(); renderApplication(); renderReview();
  }
  function renderReview() {
    const generated = state.answers.filter((answer) => answer.status === "generated"); const missing = state.answers.filter((answer) => answer.status === "missing"); const verified = state.answers.filter((answer) => answer.status === "verified");
    byId("reviewSummary").innerHTML = `<div class="summary-card"><strong>${verified.length}</strong><span>Foundation or employee-confirmed answers</span></div><div class="summary-card"><strong>${generated.length}</strong><span>generated drafts to review</span></div><div class="summary-card"><strong>${missing.length}</strong><span>unresolved items blocking approval</span></div>`;
    const items = [...generated, ...missing];
    const staleNotice = state.draftStale ? `<div class="review-item missing"><strong>Rebuild required.</strong><p>The selected opportunity or profile changed after this draft was built. Rebuild before review or approval.</p></div>` : "";
    byId("reviewItems").innerHTML = staleNotice + (items.length ? items.map((answer) => { const index = state.answers.indexOf(answer); return `<article class="review-item ${answer.status}"><div class="answer-topline"><strong>${escapeHtml(answer.prompt)}</strong><span class="source-badge ${answer.status}">${answer.status === "generated" ? "Review draft" : "Required before approval"}</span></div><textarea data-review-index="${index}" aria-label="Review ${escapeHtml(answer.prompt)}">${escapeHtml(answer.value)}</textarea><p>${escapeHtml(answer.provenance)}</p><button type="button" data-confirm-review="${index}"${formatValue(answer, answer.value.trim()) ? "" : " disabled"}>Mark reviewed</button></article>`; }).join("") : `<div class="review-item"><strong>Everything is resolved.</strong><p>There are no generated or missing answers left in this demonstration application.</p></div>`);
    byId("reviewItems").querySelectorAll("textarea").forEach((textarea) => textarea.addEventListener("input", (event) => { const index = Number(event.target.dataset.reviewIndex); updateAnswer(index, event.target.value, false); const button = byId("reviewItems").querySelector(`[data-confirm-review="${index}"]`); if (button) button.disabled = !formatValue(state.answers[index], event.target.value.trim()); }));
    byId("reviewItems").querySelectorAll("[data-confirm-review]").forEach((button) => button.addEventListener("click", () => confirmReviewedAnswer(Number(button.dataset.confirmReview))));
    byId("toSignoff").disabled = state.draftStale || items.length > 0; updateSignButton();
  }
  function updateSignButton() { const fullyReviewed = !state.draftStale && state.builtForOpportunity === state.opportunity && state.answers.length > 0 && state.answers.every((answer) => answer.status === "verified" && answer.value.trim()); const checked = byId("attestAccuracy")?.checked && byId("attestAuthority")?.checked; const name = byId("signatureName")?.value.trim(); byId("signButton").disabled = !(fullyReviewed && checked && name); }
  function createExportPayload(signer, approvedAt) {
    return { schemaVersion: "foundation-staff-grant-desk-demo-v1", opportunity: opportunityTemplates[state.opportunity].title, applicationVersion: state.version, foundationProfile: profile(), answers: state.answers.map(({ id, prompt, value, status, provenance }) => ({ id, prompt, value, status, provenance })), approvedAt, approver: signer, disclosure: "Demonstration export only. No authenticated approval or external submission occurred." };
  }
  function signApplication() {
    if (state.draftStale || state.builtForOpportunity !== state.opportunity || state.answers.some((answer) => answer.status !== "verified" || !answer.value.trim())) return;
    const signer = byId("signatureName").value.trim(); state.signed = true; state.signedAt = new Date().toISOString(); state.approvedPayload = createExportPayload(signer, state.signedAt); const template = opportunityTemplates[state.opportunity]; const receipt = byId("signoffReceipt"); receipt.hidden = false;
    receipt.innerHTML = `<strong>Approved demonstration application</strong><p>${escapeHtml(template.title)} · Draft v${state.version}<br>Approved by ${escapeHtml(signer)} at ${escapeHtml(new Date(state.signedAt).toLocaleString())}.</p><p>This browser-only demonstration receipt is not production authentication, an electronic-signature service, or proof of external submission.</p>`; byId("exportButton").disabled = false;
  }
  function exportApplication() {
    if (!state.signed || !state.approvedPayload) return;
    const payload = state.approvedPayload;
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = `urai-foundation-grant-demo-v${state.version}.json`; anchor.click(); URL.revokeObjectURL(url);
  }
  function loadExample() {
    const example = { applicantName: "Foundation Grant Writer", email: "grants@example.org", organization: "URAI Foundation", organizationType: "Public-interest organization", mission: "Advance responsible, accessible, accountable technology and public-interest standards while preserving human dignity, agency, consent, and community participation.", project: "Demonstration community accessibility program requiring verified program scope, approved budget, measurable outcomes, and supporting records before any real funding application.", amount: "25000", location: "Demonstration location" };
    invalidateApproval(); Object.entries(example).forEach(([id, value]) => { if (byId(id)) byId(id).value = value; }); updateCompletion(); markDraftStale();
  }
  document.addEventListener("DOMContentLoaded", () => {
    updateCompletion();
    document.querySelectorAll("[data-stage]").forEach((button) => button.addEventListener("click", () => showStage(button.dataset.stage)));
    document.querySelectorAll("[data-next]").forEach((button) => button.addEventListener("click", () => showStage(button.dataset.next)));
    document.querySelectorAll("[data-back]").forEach((button) => button.addEventListener("click", () => showStage(button.dataset.back)));
    fields.forEach((id) => byId(id)?.addEventListener("input", () => { invalidateApproval(); updateCompletion(); markDraftStale(); }));
    byId("loadExample").addEventListener("click", loadExample);
    document.querySelectorAll("[data-opportunity]").forEach((card) => card.addEventListener("click", () => { invalidateApproval(); state.opportunity = card.dataset.opportunity; if (state.builtForOpportunity && state.builtForOpportunity !== state.opportunity) markDraftStale(); document.querySelectorAll("[data-opportunity]").forEach((item) => item.classList.toggle("is-selected", item === card)); }));
    byId("prefillButton").addEventListener("click", buildApplication); byId("toSignoff").addEventListener("click", () => showStage("signoff")); ["attestAccuracy", "attestAuthority", "signatureName"].forEach((id) => byId(id).addEventListener("input", () => { invalidateApproval({ clearSignoff: false }); updateSignButton(); })); byId("signButton").addEventListener("click", signApplication); byId("exportButton").addEventListener("click", exportApplication);
    if (state.answers.length) { renderApplication(); renderReview(); byId("versionChip").textContent = `Draft v${state.version}`; }
    document.querySelectorAll("[data-opportunity]").forEach((card) => card.classList.toggle("is-selected", card.dataset.opportunity === state.opportunity));
  });
})();
