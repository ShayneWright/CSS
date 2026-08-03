(() => {
  "use strict";

  const form = document.querySelector("#client-survey-form");
  const submitButton = document.querySelector("#submit-button");
  const statusMessage = document.querySelector("#form-status");
  const successSection = document.querySelector("#success-section");
  const reviewSection = document.querySelector("#review-section");
  const feedback = document.querySelector("#improvement-feedback");
  const count = document.querySelector("#character-count span");
  const requiredGroups = [...form.querySelectorAll("[data-required-group]")];
  let isSubmitting = false;
  let isSubmitted = false;

  function populateMetadata() {
    document.querySelector("#page-url").value = window.location.href;
    document.querySelector("#submission-timestamp").value = new Date().toISOString();
  }

  function updateCharacterCount() {
    count.textContent = feedback.value.length;
  }

  function clearGroupError(group) {
    group.classList.remove("has-error");
    group.removeAttribute("aria-invalid");
    const name = group.dataset.requiredGroup;
    group.querySelector(`#${name}-error`).textContent = "";
  }

  function validateForm() {
    const invalidGroups = [];
    requiredGroups.forEach((group) => {
      const name = group.dataset.requiredGroup;
      const isAnswered = Boolean(form.querySelector(`input[name="${name}"]:checked`));
      if (isAnswered) {
        clearGroupError(group);
      } else {
        group.classList.add("has-error");
        group.setAttribute("aria-invalid", "true");
        group.querySelector(`#${name}-error`).textContent = "Please select an answer before submitting.";
        invalidGroups.push(group);
      }
    });
    if (invalidGroups.length) {
      statusMessage.textContent = `Please answer ${invalidGroups.length === 1 ? "the required question" : `all ${invalidGroups.length} required questions`} marked below.`;
      invalidGroups[0].focus();
      invalidGroups[0].scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    statusMessage.textContent = "";
    return true;
  }

  function setLoading(loading) {
    submitButton.disabled = loading || isSubmitted;
    submitButton.textContent = loading ? "Submitting Feedback..." : "Submit My Feedback";
    form.setAttribute("aria-busy", String(loading));
  }

  function showSuccess() {
    isSubmitted = true;
    setLoading(false);
    statusMessage.textContent = "";
    form.closest(".survey-card").hidden = true;
    successSection.hidden = false;
    reviewSection.hidden = false;
    const heading = document.querySelector("#success-heading");
    successSection.scrollIntoView({ behavior: "smooth", block: "start" });
    heading.focus({ preventScroll: true });
  }

  function showSubmissionError() {
    statusMessage.textContent = "We could not submit your feedback. Please check your connection and try again.";
    statusMessage.focus();
  }

  async function submitSurvey(event) {
    event.preventDefault();
    if (isSubmitting || isSubmitted || !validateForm()) return;
    if (document.querySelector("#website").value) return;

    isSubmitting = true;
    populateMetadata();
    setLoading(true);
    statusMessage.textContent = "";
    try {
      const response = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Submission rejected");
      showSuccess();
    } catch (error) {
      showSubmissionError();
    } finally {
      isSubmitting = false;
      if (!isSubmitted) setLoading(false);
    }
  }

  populateMetadata();
  updateCharacterCount();
  feedback.addEventListener("input", updateCharacterCount);
  requiredGroups.forEach((group) => group.addEventListener("change", () => clearGroupError(group)));
  form.addEventListener("submit", submitSurvey);
})();
