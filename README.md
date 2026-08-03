# My IT Support USA Client Satisfaction Survey

## Project overview

This is a lightweight, accessible client satisfaction survey for My IT Support USA. It is built with plain HTML, CSS, and JavaScript and can be hosted directly on GitHub Pages without dependencies or a build process. The six-question survey gathers service satisfaction, responsiveness, business confidence, improvement feedback, recommendation likelihood, and most-valued service attribute.

## Files

- `index.html` contains metadata, the survey form, accessible controls, hidden Formspree fields, success content, review invitation, and footer.
- `styles.css` provides the responsive branded layout, selectable cards, focus/error states, and reduced-motion support.
- `script.js` manages metadata, the character counter, six-section progress indicator, validation, spam protection, asynchronous submission, and success/error states.

## Formspree configuration

The production endpoint is `https://formspree.io/f/mvzeelvj`. It is configured in the `action` attribute of `#client-survey-form` in `index.html`. The `submitSurvey` function in `script.js` sends `FormData` to that action using `fetch()` and requests a JSON response.

If the Formspree form changes, replace the URL in the form's `action` attribute. No JavaScript change is necessary because the script reads `form.action` at submission time. Verify the new Formspree form is activated and its notification settings are correct.

## Google review configuration

The review button in the hidden `#review-section` in `index.html` links to `https://g.page/r/CQuyCfl7Ayj5EAI/review`. Replace that link's `href` if the Google Business Profile review URL changes.

### Review invitation rule

The same optional, honest Google review invitation is displayed to **every respondent after every successful submission**. It is not controlled, personalized, hidden, or redirected based on any survey response, including satisfaction, recommendation score, or most-valued service attribute.

## Local testing

Serve the files over HTTP from the project directory:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Using a local server better represents GitHub Pages and avoids browser restrictions that can affect requests from local files.

## GitHub Pages deployment

1. Create or open the GitHub repository.
2. Add `index.html`, `styles.css`, `script.js`, and `README.md` at the repository root.
3. Commit the files and push them to GitHub.
4. Open the repository **Settings**.
5. Select **Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select the branch containing the survey (commonly `main`).
8. Select the `/ (root)` folder.
9. Click **Save**.
10. When deployment completes, open the generated GitHub Pages URL.
11. Submit a test response and complete the verification below.

## Formspree testing

1. Complete all required questions using clearly labeled test data.
2. Submit the survey once.
3. Confirm the on-page thank-you message appears.
4. Confirm the response and all expected fields appear in the Formspree dashboard.
5. Confirm the notification email arrives if email notifications are enabled.
6. Confirm the optional Google review button appears after success for different answer combinations.
7. Open the review link only to verify its destination; do not post a real Google review while testing.

To test failure handling without sending data, use browser developer tools to switch the network offline before submitting. Confirm answers remain populated and retry becomes available after restoring the network.

## Manual testing checklist

- [ ] Desktop layout is readable at 1024px and 1440px.
- [ ] Mobile layout works at 320px, 375px, and tablet width without horizontal scrolling.
- [ ] Every control and link is usable by keyboard with a visible focus indicator.
- [ ] Each unanswered required question receives an inline error and focus moves to the first one.
- [ ] Name and company remain optional.
- [ ] Improvement feedback counts characters up to 1000.
- [ ] Recommendation values 0–10 work with mouse, touch, keyboard, and a screen reader.
- [ ] A successful request hides the form and shows both success and review cards.
- [ ] A failed request retains every answer and allows a retry.
- [ ] Repeated clicks while submitting do not create duplicate requests.
- [ ] The review button opens the correct Google destination in a new tab.
- [ ] Formspree captures all visible and hidden response fields.
- [ ] The browser console has no errors during validation and successful submission.
- [ ] The footer website link opens the correct company site in the same tab.
- [ ] Page title, description, Open Graph metadata, viewport, and `noindex, nofollow` are present.

## Notes and limitations

- Successful end-to-end submission requires network access and an active Formspree form. Formspree controls rate limits, spam filtering, notification delivery, and any account-level requirements.
- The honeypot provides lightweight spam deterrence; no CAPTCHA is included.
- The site does not store responses locally. Submitted data is handled by Formspree.
- The public Formspree endpoint and Google review URL are configuration values, not secret credentials.
