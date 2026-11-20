# Pattern: forms

How to build a form with the brand components (`.vn-field`, `.vn-select`, `.vn-check`, `.vn-btn`). Microcopy follows [voice-and-tone.md](../voice-and-tone.md).

## Structure

- One column, labels above fields, one idea per field. Container width up to the text measure (`--vn-layout-measure`, 640px).
- Every control has a visible `<label>`; the placeholder never replaces it.
- Group related radios and checkboxes in `fieldset.vn-fieldset` with a `legend`.
- Order: fields, then the actions. One signal button per view (the submit); a secondary action (Cancelar) uses `--secondary` or `--ghost`.
- Use the right input `type`, `autocomplete` and `inputmode` (email, tel, name, postal code) so browsers and keyboards help.

```html
<form novalidate>
  <div class="vn-field">
    <label class="vn-field__label" for="email">E-mail <span class="vn-field__required" aria-hidden="true">*</span></label>
    <span class="vn-field__hint" id="email-h">Respondo em até 1 dia útil.</span>
    <input class="vn-field__input" id="email" type="email" autocomplete="email" required
           aria-describedby="email-h">
  </div>
  <button class="vn-btn vn-btn--signal vn-btn--lg" type="submit">Enviar mensagem</button>
</form>
```

## Required and optional

Most forms ask only for what is needed, so mark the exception: label optional fields "(opcional)" / "(optional)". When required fields are the minority, mark them with `.vn-field__required` (a Sinal asterisk, `aria-hidden`) and set the `required` attribute. State the rule once above the form if both appear: "Campos com * são obrigatórios."

## Help text

- Put the hint between label and control (`.vn-field__hint`, caption size, `--vn-text-muted`) and link it with `aria-describedby`.
- Hints state a format or a consequence ("Respondo em até 1 dia útil."), not a restatement of the label.

## Validation

1. Validate on submit first, then on blur for fields already touched, then live while the user fixes an error. Never validate while the user is still typing for the first time.
2. Use `novalidate` and own the messages so they follow the voice guide; keep native constraint attributes (`required`, `type`, `pattern`) for semantics.
3. On a field error: set `aria-invalid="true"` on the control, add `.vn-field__error` after it, and append its id to `aria-describedby`. Remove both when fixed.
4. On submit with errors: show a summary `.vn-alert.vn-alert--error` (`role="alert"`) above the form with a link to each failing field, and move focus to the first invalid control (or to the summary). Do not clear what the user typed.
5. Never rely on color alone: the red border is paired with message text.

### Error messages

State what is wrong, then what to do; never blame the user.

| Case | PT | EN |
|---|---|---|
| Empty required | Preencha este campo. | Fill in this field. |
| Bad e-mail | O e-mail parece incompleto. Confira e tente de novo. | That email looks incomplete. Check it and try again. |
| Too short | Escreva pelo menos 20 caracteres. | Write at least 20 characters. |
| Server failure | Não foi possível enviar. Tente de novo em instantes. | Could not send. Try again in a moment. |

## Submit and result

- The submit button states the action ("Enviar mensagem", not "Enviar" alone or "OK").
- While sending: disable the button with `aria-disabled="true"`, change its label to "Enviando…", and keep the form visible.
- Success: replace the form with a `.vn-alert` (`role="status"`): "Mensagem enviada. Respondo em até 1 dia útil." or confirm with a toast when the user stays in context.
- Failure: keep values, show `.vn-alert--error`, re-enable the button.

## Accessibility checklist

- [ ] Every control has a programmatic label; groups have a `legend`.
- [ ] Error text is associated (`aria-describedby`) and announced (alert or focus move).
- [ ] Touch targets at least 44px; focus ring visible (2px, offset 2px).
- [ ] Works with keyboard only; tab order follows visual order.
- [ ] No time limits; no paste blocking; `autocomplete` set.
