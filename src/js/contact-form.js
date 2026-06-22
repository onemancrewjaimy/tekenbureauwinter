/**
 * Contactformulier: honeypot-spambescherming + basisvalidatie.
 *
 * Er is (nog) geen backend gekoppeld. Bij een geldige inzending tonen we
 * een bevestiging in de UI. Voor een echte verzending: koppel hier een
 * eindpunt (bv. een eigen API-route, Netlify Forms of Formspree) en
 * vervang de gesimuleerde "fetch" door een echte aanroep.
 */
export function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const status = form.querySelector('[data-form-status]');
  const submitButton = form.querySelector('[type="submit"]');

  const setStatus = (message, state) => {
    if (!status) return;
    status.textContent = message;
    status.dataset.state = state;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const honeypot = form.querySelector('input[name="laat-dit-veld-leeg"]');
    if (honeypot && honeypot.value.trim() !== '') {
      // Waarschijnlijk een bot: doe alsof het gelukt is, verstuur niets.
      form.reset();
      setStatus('Bedankt voor je bericht. We nemen snel contact met je op.', 'success');
      return;
    }

    const name = form.querySelector('#naam');
    const email = form.querySelector('#email');
    const message = form.querySelector('#bericht');

    const fields = [name, email, message];
    const missing = fields.find((field) => !field || field.value.trim() === '');

    if (missing) {
      setStatus('Vul alle verplichte velden in voordat je verzendt.', 'error');
      missing.focus();
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      setStatus('Vul een geldig e-mailadres in.', 'error');
      email.focus();
      return;
    }

    if (submitButton) submitButton.disabled = true;
    setStatus('Bericht wordt verzonden…', null);

    // Gesimuleerde verzending — vervang door een echte API-aanroep.
    await new Promise((resolve) => setTimeout(resolve, 500));

    setStatus('Bedankt, ' + name.value.trim().split(' ')[0] + '! Je bericht is verzonden. We reageren binnen één werkdag.', 'success');
    form.reset();
    if (submitButton) submitButton.disabled = false;
  });
}
