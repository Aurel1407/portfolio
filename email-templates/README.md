# Templates email Auvielno

Ce dossier contient 3 templates HTML au style visuel du site Auvielno :

- `devis.html`
- `facturation.html`
- `contact.html`

## Utilisation

1. Choisir le template adapté.
2. Remplacer les variables `{{...}}` par vos données.
3. Envoyer le HTML généré via votre service mail (Formspree, Resend, Mailgun, backend Node/PHP, etc.).

## Variables principales

### `devis.html`

- `{{client_name}}`
- `{{quote_number}}`
- `{{quote_date}}`
- `{{service_name}}`
- `{{quote_amount}}`
- `{{quote_details}}`
- `{{quote_valid_until}}`
- `{{quote_link}}`

### `facturation.html`

- `{{client_name}}`
- `{{invoice_number}}`
- `{{invoice_date}}`
- `{{due_date}}`
- `{{invoice_total}}`
- `{{invoice_description}}`
- `{{payment_method}}`
- `{{payment_reference}}`
- `{{invoice_link}}`
- `{{siret_number}}`

### `contact.html`

- `{{sender_name}}`
- `{{sender_email}}`
- `{{sender_phone}}`
- `{{contact_subject}}`
- `{{contact_message}}`
- `{{received_at}}`
- `{{source_url}}`

## Conseils

- Préférer des liens absolus (`https://...`) pour les boutons et images.
- Tester le rendu dans Gmail + Outlook avant mise en production.
- Garder un sujet email clair (ex. `Votre devis Auvielno - {{quote_number}}`).
