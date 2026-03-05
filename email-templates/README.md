# Templates email Auvielno

Ce dossier contient 4 templates HTML au style visuel du site Auvielno :

- `devis.html`
- `facturation.html`
- `contact.html`
- `prospection.html`

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

### `prospection.html`

- `{{company_name}}` - Nom de l'entreprise prospectée
- `{{contact_name}}` - Nom du contact (gérant, responsable)
- `{{business_activity}}` - **CRITIQUE** : Phrase de personnalisation ultra-ciblée sur l'activité

**Exemples optimisés pour {{business_activity}} :**

1. **Version projection mentale (recommandée) :**

   ```
   Un site bien référencé pourrait vous permettre d'apparaître lorsque quelqu'un recherche "plombier Cholet" ou "dépannage chauffage urgent".
   ```

2. **Version bénéfice concret :**

   ```
   Pour une entreprise comme la vôtre, un site web permettrait notamment de mettre en avant vos interventions d'urgence et de faciliter la prise de rendez-vous.
   ```

3. **Version observation + solution :**
   ```
   J'ai vu que vous proposez de la menuiserie sur mesure. Un site permettrait de présenter vos créations et rassurer les clients sur votre savoir-faire.
   ```

## Conseils

- Préférer des liens absolus (`https://...`) pour les boutons et images.
- Tester le rendu dans Gmail + Outlook avant mise en production.
- Garder un sujet email clair (ex. `Votre devis Auvielno - {{quote_number}}`).

### Conseils spécifiques pour `prospection.html`

**Personnalisation obligatoire :**

- Mentionner le **nom exact** de l'entreprise et de son activité
- Remplir **{{business_activity}}** avec une phrase ultra personnalisée (preuve de recherche manuelle)
- Exemple : "J'ai vu que vous proposez de la menuiserie sur mesure. Un site permettrait de présenter vos créations et rassurer les clients."

**Le secret de la conversion :** La variable `{{business_activity}}` fait TOUTE la différence. Elle doit être unique pour chaque envoi.

**Objet d'email suggéré :**

- ✅ `{{company_name}} : vos clients vous cherchent déjà sur Google`
- ✅ `Site web pour {{company_name}} : parlons-en ?`
- ✅ `{{company_name}} : 75% de vos clients sont sur Google`
- ❌ Éviter : "Site web pas cher", "Offre spéciale", mots marketing agressifs

**Bonnes pratiques :**

- Vérifier qu'ils n'ont **vraiment pas** de site existant
- Cibler des entreprises de qualité avec potentiel
- Envoyer en semaine (mardi-jeudi 9h-11h = meilleur taux d'ouverture)
- Limiter à 5-10 envois/jour pour garder un aspect personnalisé
- Faire un **vrai suivi téléphonique** 2-3 jours après
