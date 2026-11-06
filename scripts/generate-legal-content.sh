#!/usr/bin/env bash
# scripts/generate-legal-content.sh
# Regenerate legal content (terms + privacy) for every locale.
set -euo pipefail

FRONTEND_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LEGAL_DIR="$FRONTEND_DIR/app/content/legal"

mkdir -p "$LEGAL_DIR"

echo "[info] Working in: $LEGAL_DIR"
echo

# ---------- Locales ----------
LOCALES=(en sw es fr ar ru)

# ---------- Metadata (assoc arrays) ----------
declare -A LOCALE_NAME=( [en]="English" [sw]="Kiswahili" [es]="Espanol" [fr]="Francais" [ar]="Arabic" [ru]="Russian" )
declare -A LOCALE_DIR=(  [en]="ltr" [sw]="ltr" [es]="ltr" [fr]="ltr" [ar]="rtl" [ru]="ltr" )

declare -A TERMS_TITLE=(
  [en]="Terms of Service"
  [sw]="Masharti ya Huduma"
  [es]="Terminos de Servicio"
  [fr]="Conditions d'Utilisation"
  [ar]="شروط الخدمة"
  [ru]="Условия обслуживания"
)
declare -A TERMS_DESC=(
  [en]="Terms of Service for Khalai Studio - governing your use of our website, products, and services."
  [sw]="Masharti ya Huduma ya Khalai Studio - yanayosimamia matumizi yako ya tovuti, bidhaa, na huduma zetu."
  [es]="Terminos de Servicio de Khalai Studio - que rigen el uso de nuestro sitio web, productos y servicios."
  [fr]="Conditions d'Utilisation de Khalai Studio - regissant votre utilisation de notre site web, produits et services."
  [ar]="شروط خدمة Khalai Studio - التي تحكم استخدامك لموقعنا الإلكتروني ومنتجاتنا وخدماتنا."
  [ru]="Условия обслуживания Khalai Studio - регулирующие использование вами нашего веб-сайта, продуктов и услуг."
)
declare -A TERMS_SLUG=( [en]="terms" [sw]="masharti" [es]="terminos" [fr]="conditions" [ar]="shurut" [ru]="usloviya" )

declare -A PRIVACY_TITLE=(
  [en]="Privacy Policy"
  [sw]="Sera ya Faragha"
  [es]="Politica de Privacidad"
  [fr]="Politique de Confidentialite"
  [ar]="سياسة الخصوصية"
  [ru]="Политика конфиденциальности"
)
declare -A PRIVACY_DESC=(
  [en]="Privacy Policy for Khalai Studio - explaining what personal data we collect, why we collect it, and your rights."
  [sw]="Sera ya Faragha ya Khalai Studio - inayoeleza data ya kibinafsi tunayokusanya, kwa nini tunaikusanya, na haki zako."
  [es]="Politica de Privacidad de Khalai Studio - que explica que datos personales recopilamos, por que los recopilamos y sus derechos."
  [fr]="Politique de Confidentialite de Khalai Studio - expliquant quelles donnees personnelles nous collectons, pourquoi nous les collectons et vos droits."
  [ar]="سياسة الخصوصية لـ Khalai Studio - توضح البيانات الشخصية التي نجمعها ولماذا نجمعها وحقوقك."
  [ru]="Политика конфиденциальности Khalai Studio - объясняющая, какие персональные данные мы собираем, почему мы их собираем и ваши права."
)
declare -A PRIVACY_SLUG=( [en]="privacy" [sw]="faragha" [es]="privacidad" [fr]="confidentialite" [ar]="khosusiya" [ru]="konfidentsialnost" )

LAST_UPDATED="2026-10-15"

# ---------- JSON escape ----------
json_escape() { printf '%s' "$1" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g'; }

# ---------- Write a single doc ----------
write_doc() {
  local doc="$1" lang="$2" body_file="$3"
  local base="$doc"
  [[ "$lang" != "en" ]] && base="${doc}.${lang}"

  local mdx="$LEGAL_DIR/${base}.mdx"
  local meta="$LEGAL_DIR/${base}.meta.json"

  cp "$body_file" "$mdx"

  local title desc slug
  if [[ "$doc" == "terms" ]]; then
    title="${TERMS_TITLE[$lang]}"; desc="${TERMS_DESC[$lang]}"; slug="${TERMS_SLUG[$lang]}"
  else
    title="${PRIVACY_TITLE[$lang]}"; desc="${PRIVACY_DESC[$lang]}"; slug="${PRIVACY_SLUG[$lang]}"
  fi

  cat > "$meta" <<JSON
{
  "title": "$(json_escape "$title")",
  "description": "$(json_escape "$desc")",
  "lastUpdated": "$LAST_UPDATED",
  "language": "$lang",
  "langName": "$(json_escape "${LOCALE_NAME[$lang]}")",
  "slug": "$slug",
  "direction": "${LOCALE_DIR[$lang]}",
  "doc": "$doc"
}
JSON
  echo "  [ok] ${base}.mdx + ${base}.meta.json"
}

# ---------- Temp dir ----------
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# ---------- English source bodies ----------
cat > "$TMP/terms.en.md" <<'EN'
# Terms of Service

**Last updated: 15 October 2026**

These Terms of Service ("Terms") govern your use of Khalai Studio's website, products, and services. By continuing to use this site, you agree to these Terms.

## 1. Who we are

Khalai Studio ("Khalai", "we", "us") is a design and software studio based in Nairobi, Kenya. We build websites, online shops, custom software, and provide related consulting services. Our contact details:

- Email: hello@khalai.studio
- Location: Nairobi, Kenya

## 2. What we do

We provide:

- **Custom software development**: full-stack web and mobile applications built to your specification.
- **Websites and online shops**: hand-coded, from the first pixel.
- **Brand and design**: logos, identity systems, and UI/UX design.
- **Consulting and outsourcing**: we take on projects from teams outside Kenya and deliver work under our own standards.

The specific scope, deliverables, timelines, and fees for any project are agreed in a separate written proposal or statement of work. Where a signed proposal conflicts with these Terms, the proposal controls.

## 3. Who can work with us

You must be at least 18 years old to engage our services. If you are agreeing on behalf of a company, you confirm that you have authority to bind that company. We may decline any project that conflicts with law or our internal standards.

## 4. Fees, payment, and taxes

- **Payment schedule**: Unless otherwise agreed in writing, we take 40% to commence work and 60% on delivery. Larger projects are split into milestones.
- **Currency**: Prices are quoted in Kenyan Shillings (KES) for local clients and in US Dollars (USD) for international clients, unless stated otherwise.
- **Taxes**: Fees exclude applicable taxes. You are responsible for any VAT, withholding tax, or similar charges in your jurisdiction.
- **Late payment**: Undisputed invoices unpaid after 30 days may incur interest at 1.5% per month, or the maximum permitted by law. We may pause work on overdue accounts.
- **Refunds**: Payments for completed milestones are non-refundable. If we cancel a project for our own reasons, we refund the unused portion.

## 5. Intellectual property

- **Your content**: You retain all rights to the content, data, and materials you provide to us.
- **Our pre-existing work**: We retain ownership of our own frameworks, tools, code libraries, and know-how. These remain ours even after we deliver your project.
- **Deliverables**: Once you have paid in full, you own the custom code, designs, and assets we created specifically for your project. You may use, modify, and deploy them as you wish.
- **Portfolio rights**: Unless you ask us in writing not to, we may show your completed project in our portfolio and reference your brand.

## 6. Client responsibilities

To deliver successfully, we need you to:

- Provide clear, accurate requirements.
- Respond to requests for feedback within a reasonable time.
- Give us access to any tools, accounts, or materials we need.
- Ensure the content you provide does not infringe anyone else's rights.
- Use our deliverables for lawful purposes only.

Delays caused by you may extend the project timeline proportionally.

## 7. Confidentiality

Each of us may receive confidential information from the other. We both agree to protect it, use it only for the project, and not disclose it except where required by law. We are happy to sign an NDA before discussing a project.

## 8. Data protection

We handle personal data in accordance with the **Kenya Data Protection Act, 2019** and, where applicable, the **General Data Protection Regulation (GDPR)**. Our full privacy practices are in our Privacy Policy.

## 9. Third-party services

Our work may rely on third-party tools and services: cloud hosting, payment processors, email delivery, and open-source libraries. We are not responsible for the availability, performance, or terms of those services. You may need to accept their terms separately.

## 10. Warranties and disclaimers

We provide our services with reasonable skill and care. Beyond that, our website and services are provided **"as is"** and **"as available"**, without warranties of any kind, express or implied, including fitness for a particular purpose or non-infringement.

We do not promise that software will be free of bugs, that third-party APIs will never change, or that the site will always be available.

## 11. Limitation of liability

To the fullest extent permitted by Kenyan law, Khalai's total liability arising from any project is limited to the fees you paid for that project. We are not liable for indirect, incidental, or consequential damages, including lost profits or lost data.

Nothing in these Terms limits liability that cannot be limited by law.

## 12. Termination

You may end a project at any time by written notice. We may end it if payments are overdue, if you breach these Terms, or if we are required to by law. On termination, you pay for work completed up to that date. Sections that should survive termination - intellectual property, confidentiality, limitation of liability - continue to apply.

## 13. Governing law

These Terms are governed by the laws of **Kenya**. Any dispute will be resolved in the courts of **Nairobi, Kenya**, unless we agree in writing to another forum. For international clients, we may agree to arbitration under the **Nairobi Centre for International Arbitration (NCIA)** rules.

## 14. Changes to these Terms

We may update these Terms from time to time. Material changes will be marked with a new "last updated" date. Continuing to use the site after changes take effect means you accept the revised Terms.

## 15. Contact

Questions about these Terms? Write to us:

- **Email**: hello@khalai.studio
- **Location**: Nairobi, Kenya
EN

cat > "$TMP/privacy.en.md" <<'EN'
# Privacy Policy

**Last updated: 15 October 2026**

Khalai Studio ("Khalai", "we", "us") respects your privacy. This policy explains what personal data we collect, why we collect it, and what rights you have. It is written to comply with the **Kenya Data Protection Act, 2019** (KDPA) and, for visitors from the European Union, the **General Data Protection Regulation** (GDPR).

## 1. Who we are (Data Controller)

For the purposes of the KDPA, Khalai Studio is the **data controller**. Our contact details:

- Email: privacy@khalai.studio
- Location: Nairobi, Kenya

## 2. What personal data we collect

We only collect what we need. Depending on how you use our site, we may collect:

- **Contact form data**: your name, email address, company name (optional), phone number (optional), project description, and the time you submitted.
- **Newsletter data**: your email address, subscription status, and confirmation timestamps.
- **Account data**: if you create an account, your name, email, phone number (optional), age, bio (optional), and a hashed password.
- **Project data**: any information you share with us during a project - documents, code, business details.
- **Technical data**: IP address, browser type, and session activity, collected for security and basic site functionality. We do not use third-party tracking or advertising cookies.

We do not knowingly collect data from anyone under 18.

## 3. Why we collect it (Lawful basis)

Under the KDPA, we rely on one or more of these lawful bases:

| Purpose | Legal basis |
|---|---|
| Responding to your contact enquiry | Your consent (when you submit the form) |
| Delivering a project you hired us for | Performance of a contract |
| Sending you newsletters | Your consent (double opt-in) |
| Keeping the site secure and working | Our legitimate interest |
| Complying with tax and legal obligations | Legal obligation |

Where we rely on consent, you can withdraw it at any time. Withdrawing consent does not affect the lawfulness of processing done before you withdrew.

## 4. How we use your data

We use personal data to:

- Respond to your enquiries and provide project quotes.
- Deliver, support, and improve our services.
- Send newsletters you have opted into.
- Keep records required by law (invoices, tax).
- Detect and prevent fraud or abuse.

We do **not** sell your data. We do **not** share it for advertising.

## 5. Who we share it with

We share data only where necessary and only with parties who protect it:

- **Hosting providers**: our site and database are hosted on secure cloud infrastructure.
- **Email delivery**: we use transactional email providers (e.g. Resend) to send confirmations and notifications.
- **Payment processors**: to take payment for services.
- **Professional advisors**: accountants, lawyers, where required.
- **Authorities**: when required by law or to protect our rights.

Each processor is contractually bound to use your data only for the agreed purpose.

## 6. Cross-border data transfers

Khalai Studio is based in Kenya. Some of our service providers store or process data outside Kenya. Under the KDPA, we ensure that any transfer outside Kenya has adequate safeguards: either a legal instrument with the recipient, an adequacy decision from the Data Commissioner, or your explicit consent.

If you are in the EU/EEA, we ensure transfers comply with GDPR requirements (Standard Contractual Clauses or equivalent).

## 7. How long we keep it

We keep personal data only as long as we need it:

- **Contact enquiries**: up to 24 months after the last contact, unless you become a client.
- **Client project data**: for the duration of the project plus 7 years (for tax and legal records).
- **Newsletter subscriptions**: until you unsubscribe, plus a short period to honour the request.
- **Account data**: until you delete your account, plus a short retention window for backups.

When data is no longer needed, we securely delete or anonymise it.

## 8. Your rights

Under the KDPA and, where applicable, GDPR, you have the right to:

- **Access** the personal data we hold about you.
- **Correct** inaccurate or incomplete data.
- **Delete** data we no longer need.
- **Restrict** or **object** to processing.
- **Port** your data to another service (where technically possible).
- **Withdraw consent** at any time.
- **Complain** to the Office of the Data Protection Commissioner (ODPC) in Kenya, or your local supervisory authority if you are in the EU/EEA.

To exercise any of these rights, email **privacy@khalai.studio**. We will respond within 30 days. We may ask you to verify your identity first.

## 9. Security

We protect personal data with:

- Encrypted transmission (HTTPS/TLS).
- Hashed passwords (bcrypt).
- Access controls and least-privilege permissions.
- Regular software updates and vulnerability checks.
- Contractual safeguards with processors.

No system is perfectly secure. If a breach affects your rights, we will notify the ODPC and affected individuals as required by law.

## 10. Cookies and local storage

We use only essential cookies and local storage for:

- Keeping you signed in.
- Remembering your theme preference.
- Preventing form abuse (rate limiting).

We do not use third-party analytics or advertising trackers. If this changes, we will update this policy and ask for your consent.

## 11. Children

Our services are not directed at children under 18. We do not knowingly collect their data. If you believe we have, contact us and we will delete it.

## 12. Changes to this policy

We may update this policy. Material changes will be marked with a new "last updated" date. Continuing to use the site means you accept the revised policy.

## 13. Contact

Questions about this policy or your data? Write to us:

- **Email**: privacy@khalai.studio
- **Location**: Nairobi, Kenya
- **Data Protection Officer**: If we are required to appoint one under the KDPA, their contact details will appear here.

## 14. Complaints

If you are not satisfied with our response, you can complain to:

- **Office of the Data Protection Commissioner (ODPC)**, Kenya - https://www.odpc.go.ke
- Your local data protection authority, if you are outside Kenya.
EN

# ---------- Generate ----------
echo "[step] Writing English docs"
write_doc "terms"   "en" "$TMP/terms.en.md"
write_doc "privacy" "en" "$TMP/privacy.en.md"

# For the other locales we currently copy the English body.
# Swap this loop with a translation API call when ready.
for lang in sw es fr ar ru; do
  cp "$TMP/terms.en.md"   "$TMP/terms.$lang.md"
  cp "$TMP/privacy.en.md" "$TMP/privacy.$lang.md"
done

for lang in sw es fr ar ru; do
  echo "[step] Writing $lang (${LOCALE_NAME[$lang]})"
  write_doc "terms"   "$lang" "$TMP/terms.$lang.md"
  write_doc "privacy" "$lang" "$TMP/privacy.$lang.md"
done

# ---------- Build index ----------
echo
echo "[step] Building index.meta.json"
python3 - "$LEGAL_DIR" <<'PY'
import json, os, sys
legal_dir = sys.argv[1]
out = os.path.join(legal_dir, "index.meta.json")
index = {}
for f in sorted(os.listdir(legal_dir)):
    if not f.endswith(".meta.json") or f == "index.meta.json":
        continue
    with open(os.path.join(legal_dir, f)) as fh:
        data = json.load(fh)
    key = f"{data['doc']}.{data['language']}"
    base = f[:-len(".meta.json")]
    index[key] = {**data, "file": base}
with open(out, "w") as fh:
    json.dump(index, fh, indent=2, ensure_ascii=False)
    fh.write("\n")
print(f"  wrote {len(index)} entries")
PY

echo
echo "[done] Files in $LEGAL_DIR:"
ls -1 "$LEGAL_DIR" | sed 's/^/   /'