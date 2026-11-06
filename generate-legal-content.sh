#!/bin/bash
# generate-legal-content.sh
# Run from: /home/wils/apps/docker-app/frontend/app/content/legal

set -e

LEGAL_DIR="/home/wils/apps/docker-app/frontend/app/content/legal"
mkdir -p "$LEGAL_DIR"
cd "$LEGAL_DIR"

#!/bin/bash

# generate-translations.sh
# This script generates translated versions of terms.mdx and privacy.mdx
# For production use, integrate with a translation API (DeepL, Google Translate, etc.)

cd /home/wils/apps/docker-app/frontend/app/content/legal

# Language mapping: code -> name
declare -A LANGUAGES=(
    ["sw"]="Kiswahili"
    ["es"]="Español"
    ["fr"]="Français"
    ["ar"]="العربية"
    ["ru"]="Русский"
)

# Direction for RTL languages
declare -A DIRECTIONS=(
    ["ar"]="rtl"
)

echo "🌍 Generating translated legal content files..."
echo "================================================"

# Function to create terms translation
generate_terms() {
    local lang=$1
    local lang_name=${LANGUAGES[$lang]}
    local dir=${DIRECTIONS[$lang]:-"ltr"}
    
    echo "📄 Generating terms.$lang.mdx ($lang_name)..."
    
    case $lang in
        sw)
            cat > "terms.sw.mdx" << 'ENDOFFILE'
---
title: "Masharti ya Huduma"
description: "Masharti ya Huduma ya Khalai Studio - yanayosimamia matumizi yako ya tovuti, bidhaa, na huduma zetu."
lastUpdated: "2026-10-15"
language: "sw"
slug: "masharti"
direction: "ltr"
---

# Masharti ya Huduma

**Ilisasishwa mwisho: 15 Oktoba 2026**

Masharti haya ya Huduma ("Masharti") yanasimamia matumizi yako ya tovuti, bidhaa, na huduma za Khalai Studio. Kwa kuendelea kutumia tovuti hii, unakubali Masharti haya.

## 1. Sisi ni nani

Khalai Studio ("Khalai", "sisi", "yetu") ni studio ya kubuni na programu yenye makao yake Nairobi, Kenya. Tunajenga tovuti, maduka ya mtandaoni, programu maalum, na kutoa huduma za ushauri zinazohusiana. Maelezo yetu ya mawasiliano:

- Barua pepe: hello@khalai.studio
- Mahali: Nairobi, Kenya

## 2. Tunachofanya

Tunatoa:

- **Uundaji wa programu maalum**: programu kamili za wavuti na simu zilizojengwa kwa maelezo yako.
- **Tovuti na maduka ya mtandaoni**: zilizoandikwa kwa mkono, kutoka pikseli ya kwanza.
- **Chapa na ubunifu**: nembo, mifumo ya utambulisho, na ubunifu wa UI/UX.
- **Ushauri na kazi za nje**: tunachukua miradi kutoka kwa timu nje ya Kenya na kutoa kazi kwa viwango vyetu wenyewe.

Upeo mahususi, matokeo, ratiba, na ada za mradi wowote hukubaliwa katika pendekezo lililoandikwa au taarifa ya kazi. Pale pendekezo lililosainiwa linapingana na Masharti haya, pendekezo ndilo linalotawala.

## 3. Nani anaweza kufanya kazi nasi

Lazima uwe na angalau miaka 18 kushirikiana na huduma zetu. Ikiwa unakubali kwa niaba ya kampuni, unathibitisha kuwa una mamlaka ya kumfunga kampuni hiyo. Tunaweza kukataa mradi wowote unaopingana na sheria au viwango vyetu vya ndani.

## 4. Ada, malipo, na kodi

- **Ratiba ya malipo**: Isipokuwa ikubaliwe vinginevyo kwa maandishi, tunachukua 40% kuanza kazi na 60% wakati wa kukabidhi. Miradi mikubwa hugawanywa katika hatua.
- **Sarafu**: Bei zinatolewa kwa Shilingi za Kenya (KES) kwa wateja wa ndani na kwa Dola za Marekani (USD) kwa wateja wa kimataifa, isipokuwa ikisemwa vinginevyo.
- **Kodi**: Ada hazijumuishi kodi zinazotumika. Wewe unawajibika kwa VAT yoyote, kodi ya zuio, au malipo sawa na hayo katika mamlaka yako.
- **Malipo ya marehemu**: Ankara zisizobishaniwa ambazo hazijalipwa baada ya siku 30 zinaweza kupata riba ya 1.5% kwa mwezi, au kiwango cha juu kinachoruhusiwa na sheria. Tunaweza kusimamisha kazi kwenye akaunti zilizochelewa.
- **Marejesho**: Malipo ya hatua zilizokamilika hayarudishwi. Ikiwa tunaghairi mradi kwa sababu zetu wenyewe, tunarudisha sehemu isiyotumika.

## 5. Mali miliki

- **Maudhui yako**: Unabaki na haki zote za maudhui, data, na nyenzo unazotupatia.
- **Kazi yetu ya awali**: Tunabaki na umiliki wa mifumo yetu, zana, maktaba za msimbo, na ujuzi wetu. Hizi zinabaki zetu hata baada ya kukabidhi mradi wako.
- **Matokeo**: Mara tu unapolipa kikamilifu, unamiliki msimbo maalum, miundo, na rasilimali tulizounda mahsusi kwa mradi wako. Unaweza kuzitumia, kuzibadilisha, na kuzisambaza upendavyo.
- **Haki za kwingineko**: Isipokuwa utuombe kwa maandishi tusifanye hivyo, tunaweza kuonyesha mradi wako uliokamilika katika kwingineko yetu na kutaja chapa yako.

## 6. Majukumu ya mteja

Ili kufanikisha utoaji, tunahitaji:

- Kutoa mahitaji wazi na sahihi.
- Kujibu maombi ya maoni ndani ya muda unaofaa.
- Kutupa ufikiaji wa zana, akaunti, au nyenzo zozote tunazohitaji.
- Kuhakikisha maudhui unayotoa hayakiuki haki za mtu mwingine.
- Kutumia matokeo yetu kwa madhumuni halali tu.

Ucheleweshaji unaosababishwa nawe unaweza kuongeza ratiba ya mradi kwa uwiano.

## 7. Usiri

Kila mmoja wetu anaweza kupokea taarifa za siri kutoka kwa mwingine. Sote tunakubali kuilinda, kuitumia tu kwa mradi, na kutofichua isipokuwa inapohitajika na sheria. Tunafurahi kutia saini NDA kabla ya kujadili mradi.

## 8. Ulinzi wa data

Tunashughulikia data ya kibinafsi kwa mujibu wa **Sheria ya Ulinzi wa Data ya Kenya, 2019** na, inapotumika, **Kanuni ya Jumla ya Ulinzi wa Data (GDPR)**. Mbinu zetu kamili za faragha ziko katika Sera yetu ya Faragha.

## 9. Huduma za watu wengine

Kazi yetu inaweza kutegemea zana na huduma za watu wengine: hosting ya wingu, wasindikaji wa malipo, usambazaji wa barua pepe, na maktaba za chanzo huria. Hatuwajibiki kwa upatikanaji, utendaji, au masharti ya huduma hizo. Unaweza kuhitaji kukubali masharti yao tofauti.

## 10. Dhamana na kanusho

Tunatoa huduma zetu kwa ujuzi na uangalifu unaofaa. Zaidi ya hayo, tovuti na huduma zetu zinatolewa **"kama zilivyo"** na **"kama zinapatikana"**, bila dhamana za aina yoyote, wazi au kwa kutafsiriwa, ikiwa ni pamoja na kufaa kwa madhumuni fulani au kutokiuka.

Hatuahidi kwamba programu haitakuwa na hitilafu, kwamba API za watu wengine hazitabadilika kamwe, au kwamba tovuti itapatikana kila wakati.

## 11. Kikomo cha dhima

Kwa kiwango kamili kinachoruhusiwa na sheria ya Kenya, dhima jumla ya Khalai inayotokana na mradi wowote imepunguzwa kwa ada ulizolipa kwa mradi huo. Hatuwajibiki kwa uharibifu usio wa moja kwa moja, wa bahati nasibu, au wa matokeo, ikiwa ni pamoja na faida zilizopotea au data iliyopotea.

Hakuna kitu katika Masharti haya kinachopunguza dhima ambayo haiwezi kupunguzwa na sheria.

## 12. Kukomesha

Unaweza kumaliza mradi wakati wowote kwa notisi ya maandishi. Tunaweza kumaliza ikiwa malipo yamechelewa, ikiwa unakiuka Masharti haya, au ikiwa tunahitajika na sheria. Baada ya kukomesha, unalipa kazi iliyokamilika hadi tarehe hiyo. Sehemu zinazopaswa kuendelea baada ya kukomesha — mali miliki, usiri, kikomo cha dhima — zinaendelea kutumika.

## 13. Sheria inayotawala

Masharti haya yanatawaliwa na sheria za **Kenya**. Mgogoro wowote utatatuliwa katika mahakama za **Nairobi, Kenya**, isipokuwa tukubali kwa maandishi jukwaa lingine. Kwa wateja wa kimataifa, tunaweza kukubali usuluhishi chini ya kanuni za **Kituo cha Usuluhishi cha Kimataifa cha Nairobi (NCIA)**.

## 14. Mabadiliko ya Masharti haya

Tunaweza kusasisha Masharti haya mara kwa mara. Mabadiliko muhimu yatawekwa alama na tarehe mpya ya "ilisasishwa mwisho". Kuendelea kutumia tovuti baada ya mabadiliko kuanza kutumika kunamaanisha unakubali Masharti yaliyorekebishwa.

## 15. Mawasiliano

Maswali kuhusu Masharti haya? Tuandikie:

- **Barua pepe**: hello@khalai.studio
- **Mahali**: Nairobi, Kenya
ENDOFFILE
            ;;
        es)
            cat > "terms.es.mdx" << 'ENDOFFILE'
---
title: "Términos de Servicio"
description: "Términos de Servicio de Khalai Studio - que rigen el uso de nuestro sitio web, productos y servicios."
lastUpdated: "2026-10-15"
language: "es"
slug: "terminos"
direction: "ltr"
---

# Términos de Servicio

**Última actualización: 15 de octubre de 2026**

Estos Términos de Servicio ("Términos") rigen el uso del sitio web, productos y servicios de Khalai Studio. Al continuar usando este sitio, usted acepta estos Términos.

## 1. Quiénes somos

Khalai Studio ("Khalai", "nosotros") es un estudio de diseño y software con sede en Nairobi, Kenia. Construimos sitios web, tiendas en línea, software personalizado y brindamos servicios de consultoría relacionados. Nuestros datos de contacto:

- Correo electrónico: hello@khalai.studio
- Ubicación: Nairobi, Kenia

## 2. Qué hacemos

Ofrecemos:

- **Desarrollo de software personalizado**: aplicaciones web y móviles de pila completa construidas según sus especificaciones.
- **Sitios web y tiendas en línea**: codificados a mano, desde el primer píxel.
- **Marca y diseño**: logotipos, sistemas de identidad y diseño UI/UX.
- **Consultoría y externalización**: aceptamos proyectos de equipos fuera de Kenia y entregamos trabajo bajo nuestros propios estándares.

El alcance específico, los entregables, los plazos y las tarifas de cualquier proyecto se acuerdan en una propuesta escrita separada o declaración de trabajo. Cuando una propuesta firmada entra en conflicto con estos Términos, la propuesta prevalece.

## 3. Quién puede trabajar con nosotros

Debe tener al menos 18 años para contratar nuestros servicios. Si está aceptando en nombre de una empresa, confirma que tiene autoridad para vincular a esa empresa. Podemos rechazar cualquier proyecto que entre en conflicto con la ley o nuestros estándares internos.

## 4. Tarifas, pagos e impuestos

- **Calendario de pagos**: A menos que se acuerde lo contrario por escrito, tomamos el 40% para comenzar el trabajo y el 60% en la entrega. Los proyectos más grandes se dividen en hitos.
- **Moneda**: Los precios se cotizan en chelines kenianos (KES) para clientes locales y en dólares estadounidenses (USD) para clientes internacionales, a menos que se indique lo contrario.
- **Impuestos**: Las tarifas excluyen los impuestos aplicables. Usted es responsable de cualquier IVA, impuesto de retención o cargos similares en su jurisdicción.
- **Pago tardío**: Las facturas no disputadas impagas después de 30 días pueden generar intereses al 1.5% mensual, o el máximo permitido por ley. Podemos pausar el trabajo en cuentas vencidas.
- **Reembolsos**: Los pagos por hitos completados no son reembolsables. Si cancelamos un proyecto por nuestras propias razones, reembolsamos la porción no utilizada.

## 5. Propiedad intelectual

- **Su contenido**: Usted conserva todos los derechos sobre el contenido, datos y materiales que nos proporciona.
- **Nuestro trabajo preexistente**: Conservamos la propiedad de nuestros propios marcos, herramientas, bibliotecas de código y conocimientos. Estos siguen siendo nuestros incluso después de entregar su proyecto.
- **Entregables**: Una vez que haya pagado en su totalidad, usted posee el código personalizado, diseños y activos que creamos específicamente para su proyecto. Puede usarlos, modificarlos y desplegarlos como desee.
- **Derechos de portafolio**: A menos que nos solicite por escrito que no lo hagamos, podemos mostrar su proyecto completado en nuestro portafolio y hacer referencia a su marca.

## 6. Responsabilidades del cliente

Para entregar con éxito, necesitamos que usted:

- Proporcione requisitos claros y precisos.
- Responda a las solicitudes de comentarios dentro de un tiempo razonable.
- Nos dé acceso a las herramientas, cuentas o materiales que necesitemos.
- Asegúrese de que el contenido que proporciona no infrinja los derechos de otros.
- Use nuestros entregables solo para fines legales.

Los retrasos causados por usted pueden extender el cronograma del proyecto proporcionalmente.

## 7. Confidencialidad

Cada uno de nosotros puede recibir información confidencial del otro. Ambos acordamos protegerla, usarla solo para el proyecto y no divulgarla excepto cuando lo exija la ley. Estamos felices de firmar un NDA antes de discutir un proyecto.

## 8. Protección de datos

Manejamos datos personales de acuerdo con la **Ley de Protección de Datos de Kenia, 2019** y, cuando corresponda, el **Reglamento General de Protección de Datos (GDPR)**. Nuestras prácticas completas de privacidad están en nuestra Política de Privacidad.

## 9. Servicios de terceros

Nuestro trabajo puede depender de herramientas y servicios de terceros: alojamiento en la nube, procesadores de pagos, entrega de correo electrónico y bibliotecas de código abierto. No somos responsables de la disponibilidad, el rendimiento o los términos de esos servicios. Es posible que deba aceptar sus términos por separado.

## 10. Garantías y exenciones de responsabilidad

Proporcionamos nuestros servicios con habilidad y cuidado razonables. Más allá de eso, nuestro sitio web y servicios se proporcionan **"tal cual"** y **"según disponibilidad"**, sin garantías de ningún tipo, expresas o implícitas, incluida la idoneidad para un propósito particular o la no infracción.

No prometemos que el software esté libre de errores, que las API de terceros nunca cambien o que el sitio siempre esté disponible.

## 11. Limitación de responsabilidad

En la medida máxima permitida por la ley de Kenia, la responsabilidad total de Khalai que surja de cualquier proyecto se limita a las tarifas que pagó por ese proyecto. No somos responsables de daños indirectos, incidentales o consecuentes, incluida la pérdida de ganancias o datos.

Nada en estos Términos limita la responsabilidad que no puede ser limitada por ley.

## 12. Terminación

Puede terminar un proyecto en cualquier momento mediante aviso por escrito. Podemos terminarlo si los pagos están vencidos, si usted viola estos Términos o si la ley nos lo exige. Al terminar, usted paga por el trabajo completado hasta esa fecha. Las secciones que deben sobrevivir a la terminación — propiedad intelectual, confidencialidad, limitación de responsabilidad — continúan aplicándose.

## 13. Ley aplicable

Estos Términos se rigen por las leyes de **Kenia**. Cualquier disputa se resolverá en los tribunales de **Nairobi, Kenia**, a menos que acordemos por escrito otro foro. Para clientes internacionales, podemos acordar arbitraje bajo las reglas del **Centro de Arbitraje Internacional de Nairobi (NCIA)**.

## 14. Cambios a estos Términos

Podemos actualizar estos Términos de vez en cuando. Los cambios materiales se marcarán con una nueva fecha de "última actualización". Continuar usando el sitio después de que los cambios entren en vigencia significa que acepta los Términos revisados.

## 15. Contacto

¿Preguntas sobre estos Términos? Escríbanos:

- **Correo electrónico**: hello@khalai.studio
- **Ubicación**: Nairobi, Kenia
ENDOFFILE
            ;;
        fr)
            cat > "terms.fr.mdx" << 'ENDOFFILE'
---
title: "Conditions d'Utilisation"
description: "Conditions d'Utilisation de Khalai Studio - régissant votre utilisation de notre site web, produits et services."
lastUpdated: "2026-10-15"
language: "fr"
slug: "conditions"
direction: "ltr"
---

# Conditions d'Utilisation

**Dernière mise à jour : 15 octobre 2026**

Ces Conditions d'Utilisation ("Conditions") régissent votre utilisation du site web, des produits et des services de Khalai Studio. En continuant à utiliser ce site, vous acceptez ces Conditions.

## 1. Qui nous sommes

Khalai Studio ("Khalai", "nous") est un studio de design et de logiciels basé à Nairobi, au Kenya. Nous construisons des sites web, des boutiques en ligne, des logiciels personnalisés et fournissons des services de conseil connexes. Nos coordonnées :

- E-mail : hello@khalai.studio
- Emplacement : Nairobi, Kenya

## 2. Ce que nous faisons

Nous fournissons :

- **Développement de logiciels personnalisés** : applications web et mobiles full-stack construites selon vos spécifications.
- **Sites web et boutiques en ligne** : codés à la main, dès le premier pixel.
- **Marque et design** : logos, systèmes d'identité et design UI/UX.
- **Conseil et externalisation** : nous prenons en charge des projets d'équipes hors du Kenya et livrons le travail selon nos propres normes.

La portée spécifique, les livrables, les délais et les frais de tout projet sont convenus dans une proposition écrite séparée ou un énoncé des travaux. Lorsqu'une proposition signée entre en conflit avec ces Conditions, la proposition prévaut.

## 3. Qui peut travailler avec nous

Vous devez avoir au moins 18 ans pour engager nos services. Si vous acceptez au nom d'une entreprise, vous confirmez que vous avez l'autorité de lier cette entreprise. Nous pouvons refuser tout projet qui entre en conflit avec la loi ou nos normes internes.

## 4. Frais, paiement et taxes

- **Calendrier de paiement** : Sauf accord écrit contraire, nous prenons 40 % pour commencer le travail et 60 % à la livraison. Les projets plus importants sont divisés en étapes.
- **Devise** : Les prix sont indiqués en shillings kenyans (KES) pour les clients locaux et en dollars américains (USD) pour les clients internationaux, sauf indication contraire.
- **Taxes** : Les frais excluent les taxes applicables. Vous êtes responsable de toute TVA, retenue à la source ou charges similaires dans votre juridiction.
- **Paiement tardif** : Les factures non contestées impayées après 30 jours peuvent entraîner des intérêts de 1,5 % par mois, ou le maximum autorisé par la loi. Nous pouvons suspendre le travail sur les comptes en retard.
- **Remboursements** : Les paiements pour les étapes terminées ne sont pas remboursables. Si nous annulons un projet pour nos propres raisons, nous remboursons la partie inutilisée.

## 5. Propriété intellectuelle

- **Votre contenu** : Vous conservez tous les droits sur le contenu, les données et les matériaux que vous nous fournissez.
- **Notre travail préexistant** : Nous conservons la propriété de nos propres frameworks, outils, bibliothèques de code et savoir-faire. Ceux-ci restent les nôtres même après la livraison de votre projet.
- **Livrables** : Une fois que vous avez payé intégralement, vous possédez le code personnalisé, les designs et les actifs que nous avons créés spécifiquement pour votre projet. Vous pouvez les utiliser, les modifier et les déployer comme vous le souhaitez.
- **Droits de portfolio** : À moins que vous ne nous demandiez par écrit de ne pas le faire, nous pouvons montrer votre projet terminé dans notre portfolio et référencer votre marque.

## 6. Responsabilités du client

Pour livrer avec succès, nous avons besoin que vous :

- Fournissiez des exigences claires et précises.
- Répondiez aux demandes de commentaires dans un délai raisonnable.
- Nous donniez accès aux outils, comptes ou matériaux dont nous avons besoin.
- Vous assuriez que le contenu que vous fournissez n'enfreint pas les droits d'autrui.
- Utilisiez nos livrables à des fins légales uniquement.

Les retards causés par vous peuvent prolonger le calendrier du projet proportionnellement.

## 7. Confidentialité

Chacun de nous peut recevoir des informations confidentielles de l'autre. Nous acceptons tous les deux de les protéger, de les utiliser uniquement pour le projet et de ne pas les divulguer sauf si la loi l'exige. Nous sommes heureux de signer un NDA avant de discuter d'un projet.

## 8. Protection des données

Nous traitons les données personnelles conformément à la **Loi kenyane sur la protection des données de 2019** et, le cas échéant, au **Règlement général sur la protection des données (RGPD)**. Nos pratiques complètes de confidentialité figurent dans notre Politique de confidentialité.

## 9. Services tiers

Notre travail peut dépendre d'outils et de services tiers : hébergement cloud, processeurs de paiement, livraison d'e-mails et bibliothèques open source. Nous ne sommes pas responsables de la disponibilité, des performances ou des conditions de ces services. Vous devrez peut-être accepter leurs conditions séparément.

## 10. Garanties et clauses de non-responsabilité

Nous fournissons nos services avec une compétence et un soin raisonnables. Au-delà de cela, notre site web et nos services sont fournis **"tels quels"** et **"selon disponibilité"**, sans garanties d'aucune sorte, expresses ou implicites, y compris l'adéquation à un usage particulier ou la non-contrefaçon.

Nous ne promettons pas que le logiciel sera exempt de bogues, que les API tierces ne changeront jamais ou que le site sera toujours disponible.

## 11. Limitation de responsabilité

Dans la mesure maximale permise par la loi kenyane, la responsabilité totale de Khalai découlant de tout projet est limitée aux frais que vous avez payés pour ce projet. Nous ne sommes pas responsables des dommages indirects, accessoires ou consécutifs, y compris la perte de profits ou de données.

Rien dans ces Conditions ne limite la responsabilité qui ne peut être limitée par la loi.

## 12. Résiliation

Vous pouvez mettre fin à un projet à tout moment par avis écrit. Nous pouvons y mettre fin si les paiements sont en retard, si vous violez ces Conditions ou si la loi nous l'exige. En cas de résiliation, vous payez le travail effectué jusqu'à cette date. Les sections qui doivent survivre à la résiliation — propriété intellectuelle, confidentialité, limitation de responsabilité — continuent de s'appliquer.

## 13. Droit applicable

Ces Conditions sont régies par les lois du **Kenya**. Tout litige sera résolu devant les tribunaux de **Nairobi, Kenya**, à moins que nous ne convenions par écrit d'un autre forum. Pour les clients internationaux, nous pouvons convenir d'un arbitrage selon les règles du **Centre d'arbitrage international de Nairobi (NCIA)**.

## 14. Modifications de ces Conditions

Nous pouvons mettre à jour ces Conditions de temps à autre. Les modifications importantes seront marquées par une nouvelle date de "dernière mise à jour". Continuer à utiliser le site après l'entrée en vigueur des modifications signifie que vous acceptez les Conditions révisées.

## 15. Contact

Des questions sur ces Conditions ? Écrivez-nous :

- **E-mail** : hello@khalai.studio
- **Emplacement** : Nairobi, Kenya
ENDOFFILE
            ;;
        ar)
            cat > "terms.ar.mdx" << 'ENDOFFILE'
---
title: "شروط الخدمة"
description: "شروط خدمة Khalai Studio - التي تحكم استخدامك لموقعنا الإلكتروني ومنتجاتنا وخدماتنا."
lastUpdated: "2026-10-15"
language: "ar"
slug: "shurut"
direction: "rtl"
---

# شروط الخدمة

**آخر تحديث: 15 أكتوبر 2026**

تحكم شروط الخدمة هذه ("الشروط") استخدامك لموقع Khalai Studio الإلكتروني ومنتجاتنا وخدماتنا. باستمرارك في استخدام هذا الموقع، فإنك توافق على هذه الشروط.

## 1. من نحن

Khalai Studio ("خالاي"، "نحن") هو استوديو تصميم وبرمجيات مقره نيروبي، كينيا. نبني مواقع إلكترونية ومتاجر عبر الإنترنت وبرمجيات مخصصة ونقدم خدمات استشارية ذات صلة. بيانات الاتصال بنا:

- البريد الإلكتروني: hello@khalai.studio
- الموقع: نيروبي، كينيا

## 2. ماذا نفعل

نقدم:

- **تطوير برمجيات مخصصة**: تطبيقات ويب وجوال متكاملة مبنية وفقًا لمواصفاتك.
- **مواقع إلكترونية ومتاجر عبر الإنترنت**: مبرمجة يدويًا، من البيكسل الأول.
- **العلامة التجارية والتصميم**: شعارات وأنظمة هوية وتصميم واجهة المستخدم/تجربة المستخدم.
- **الاستشارات والتعهيد**: نتولى مشاريع من فرق خارج كينيا ونقدم العمل وفقًا لمعاييرنا الخاصة.

يتم الاتفاق على النطاق المحدد والمخرجات والجداول الزمنية والرسوم لأي مشروع في عرض مكتوب منفصل أو بيان عمل. عندما يتعارض عرض موقع مع هذه الشروط، يسود العرض.

## 3. من يمكنه العمل معنا

يجب أن تكون عمرك 18 عامًا على الأقل للتعامل مع خدماتنا. إذا كنت توافق نيابة عن شركة، فإنك تؤكد أن لديك سلطة إلزام تلك الشركة. قد نرفض أي مشروع يتعارض مع القانون أو معاييرنا الداخلية.

## 4. الرسوم والدفع والضرائب

- **جدول الدفع**: ما لم يتم الاتفاق على خلاف ذلك كتابيًا، نأخذ 40% لبدء العمل و60% عند التسليم. المشاريع الأكبر تُقسّم إلى مراحل.
- **العملة**: تُقتبس الأسعار بالشلن الكيني (KES) للعملاء المحليين وبالدولار الأمريكي (USD) للعملاء الدوليين، ما لم يُذكر خلاف ذلك.
- **الضرائب**: الرسوم لا تشمل الضرائب المطبقة. أنت مسؤول عن أي ضريبة قيمة مضافة أو ضريبة استقطاع أو رسوم مماثلة في ولايتك القضائية.
- **الدفع المتأخر**: الفواتير غير المتنازع عليها غير المدفوعة بعد 30 يومًا قد تتحمل فائدة بنسبة 1.5% شهريًا، أو الحد الأقصى الذي يسمح به القانون. قد نوقف العمل على الحسابات المتأخرة.
- **المبالغ المستردة**: المدفوعات مقابل المراحل المكتملة غير قابلة للاسترداد. إذا ألغينا مشروعًا لأسبابنا الخاصة، نسترد الجزء غير المستخدم.

## 5. الملكية الفكرية

- **محتواك**: تحتفظ بجميع الحقوق في المحتوى والبيانات والمواد التي تقدمها لنا.
- **عملنا السابق**: نحتفظ بملكية أطرنا وأدواتنا ومكتبات الأكواد والمعرفة الفنية الخاصة بنا. تبقى ملكنا حتى بعد تسليم مشروعك.
- **المخرجات**: بمجرد أن تدفع بالكامل، تمتلك الكود المخصص والتصاميم والأصول التي أنشأناها خصيصًا لمشروعك. يمكنك استخدامها وتعديلها ونشرها كما تشاء.
- **حقوق المحفظة**: ما لم تطلب منا كتابيًا عدم القيام بذلك، قد نعرض مشروعك المكتمل في محفظتنا ونشير إلى علامتك التجارية.

## 6. مسؤوليات العميل

للتسليم بنجاح، نحتاج منك أن:

- تقدم متطلبات واضحة ودقيقة.
- تستجيب لطلبات الملاحظات في وقت معقول.
- تمنحنا إمكانية الوصول إلى أي أدوات أو حسابات أو مواد نحتاجها.
- تضمن أن المحتوى الذي تقدمه لا ينتهك حقوق الآخرين.
- تستخدم مخرجاتنا لأغراض قانونية فقط.

التأخيرات التي تسببها قد تمدد الجدول الزمني للمشروع بشكل متناسب.

## 7. السرية

قد يتلقى كل منا معلومات سرية من الآخر. نتفق جميعًا على حمايتها واستخدامها فقط للمشروع وعدم الإفصاح عنها إلا حيث يقتضي القانون. يسعدنا توقيع اتفاقية عدم إفصاح قبل مناقشة أي مشروع.

## 8. حماية البيانات

نتعامل مع البيانات الشخصية وفقًا لـ **قانون حماية البيانات الكيني لعام 2019** وعند الاقتضاء **اللائحة العامة لحماية البيانات (GDPR)**. ممارساتنا الكاملة للخصوصية موجودة في سياسة الخصوصية الخاصة بنا.

## 9. خدمات الطرف الثالث

قد يعتمد عملنا على أدوات وخدمات طرف ثالث: استضافة سحابية ومعالجات دفع وتسليم بريد إلكتروني ومكتبات مفتوحة المصدر. لسنا مسؤولين عن توفر أو أداء أو شروط تلك الخدمات. قد تحتاج إلى قبول شروطها بشكل منفصل.

## 10. الضمانات وإخلاء المسؤولية

نقدم خدماتنا بمهارة وعناية معقولتين. بخلاف ذلك، يتم تقديم موقعنا وخدماتنا **"كما هي"** و**"حسب التوفر"**، دون ضمانات من أي نوع، صريحة أو ضمنية، بما في ذلك الملاءمة لغرض معين أو عدم الانتهاك.

لا نعد بأن البرمجيات ستكون خالية من الأخطاء، أو أن واجهات برمجة التطبيقات الخارجية لن تتغير أبدًا، أو أن الموقع سيكون متاحًا دائمًا.

## 11. تحديد المسؤولية

إلى أقصى حد يسمح به القانون الكيني، تقتصر المسؤولية الإجمالية لـ Khalai الناشئة عن أي مشروع على الرسوم التي دفعتها لذلك المشروع. لسنا مسؤولين عن الأضرار غير المباشرة أو العرضية أو التبعية، بما في ذلك الأرباح الضائعة أو البيانات المفقودة.

لا شيء في هذه الشروط يحد من المسؤولية التي لا يمكن تحديدها بموجب القانون.

## 12. الإنهاء

يمكنك إنهاء مشروع في أي وقت بإشعار كتابي. يمكننا إنهاؤه إذا كانت المدفوعات متأخرة، أو إذا انتهكت هذه الشروط، أو إذا طُلب منا بموجب القانون. عند الإنهاء، تدفع مقابل العمل المكتمل حتى ذلك التاريخ. الأقسام التي يجب أن تبقى بعد الإنهاء - الملكية الفكرية والسرية وتحديد المسؤولية - تستمر في التطبيق.

## 13. القانون الحاكم

تخضع هذه الشروط لقوانين **كينيا**. يتم حل أي نزاع في محاكم **نيروبي، كينيا**، ما لم نتفق كتابيًا على محفل آخر. للعملاء الدوليين، قد نتفق على التحكيم بموجب قواعد **مركز نيروبي للتحكيم الدولي (NCIA)**.

## 14. تغييرات على هذه الشروط

قد نحدّث هذه الشروط من وقت لآخر. سيتم وضع علامة على التغييرات الجوهرية بتاريخ "آخر تحديث" جديد. يعني استمرارك في استخدام الموقع بعد سريان التغييرات قبولك للشروط المعدلة.

## 15. الاتصال

أسئلة حول هذه الشروط؟ اكتب إلينا:

- **البريد الإلكتروني**: hello@khalai.studio
- **الموقع**: نيروبي، كينيا
ENDOFFILE
            ;;
        ru)
            cat > "terms.ru.mdx" << 'ENDOFFILE'
---
title: "Условия обслуживания"
description: "Условия обслуживания Khalai Studio - регулирующие использование вами нашего веб-сайта, продуктов и услуг."
lastUpdated: "2026-10-15"
language: "ru"
slug: "usloviya"
direction: "ltr"
---

# Условия обслуживания

**Последнее обновление: 15 октября 2026 г.**

Настоящие Условия обслуживания ("Условия") регулируют использование вами веб-сайта, продуктов и услуг Khalai Studio. Продолжая использовать этот сайт, вы соглашаетесь с настоящими Условиями.

## 1. Кто мы

Khalai Studio ("Khalai", "мы") — студия дизайна и программного обеспечения, базирующаяся в Найроби, Кения. Мы создаем веб-сайты, интернет-магазины, заказное программное обеспечение и предоставляем сопутствующие консультационные услуги. Наши контактные данные:

- Электронная почта: hello@khalai.studio
- Местоположение: Найроби, Кения

## 2. Что мы делаем

Мы предоставляем:

- **Разработка заказного программного обеспечения**: полнофункциональные веб- и мобильные приложения, созданные по вашим specifications.
- **Веб-сайты и интернет-магазины**: написанные вручную, с первого пикселя.
- **Брендинг и дизайн**: логотипы, системы идентичности и дизайн UI/UX.
- **Консалтинг и аутсорсинг**: мы берем проекты от команд за пределами Кении и выполняем работу по нашим собственным стандартам.

Конкретный объем, результаты, сроки и стоимость любого проекта согласовываются в отдельном письменном предложении или техническом задании. Если подписанное предложение противоречит настоящим Условиям, преимущественную силу имеет предложение.

## 3. Кто может работать с нами

Вам должно быть не менее 18 лет, чтобы воспользоваться нашими услугами. Если вы соглашаетесь от имени компании, вы подтверждаете, что уполномочены связать эту компанию. Мы можем отклонить любой проект, противоречащий закону или нашим внутренним стандартам.

## 4. Стоимость, оплата и налоги

- **График платежей**: Если иное не согласовано в письменной форме, мы берем 40% для начала работы и 60% при сдаче. Крупные проекты разбиваются на этапы.
- **Валюта**: Цены указываются в кенийских шиллингах (KES) для местных клиентов и в долларах США (USD) для международных клиентов, если не указано иное.
- **Налоги**: Стоимость не включает применимые налоги. Вы несете ответственность за любой НДС, налог на удержание или аналогичные сборы в вашей юрисдикции.
- **Просроченная оплата**: Неоспоримые счета, не оплаченные в течение 30 дней, могут повлечь проценты в размере 1,5% в месяц или максимальный размер, разрешенный законом. Мы можем приостановить работу по просроченным счетам.
- **Возвраты**: Платежи за завершенные этапы не подлежат возврату. Если мы отменяем проект по нашим собственным причинам, мы возвращаем неиспользованную часть.

## 5. Интеллектуальная собственность

- **Ваш контент**: Вы сохраняете все права на контент, данные и материалы, которые вы нам предоставляете.
- **Наша предшествующая работа**: Мы сохраняем право собственности на наши собственные фреймворки, инструменты, библиотеки кода и ноу-хау. Они остаются нашими даже после сдачи вашего проекта.
- **Результаты**: После полной оплаты вы владеете заказным кодом, дизайном и активами, которые мы создали специально для вашего проекта. Вы можете использовать, модифицировать и развертывать их по своему усмотрению.
- **Права на портфолио**: Если вы не попросите нас в письменной форме не делать этого, мы можем показать ваш завершенный проект в нашем портфолио и ссылаться на ваш бренд.

## 6. Обязанности клиента

Для успешной сдачи нам нужно, чтобы вы:

- Предоставили четкие и точные требования.
- Отвечали на запросы об обратной связи в разумные сроки.
- Предоставили нам доступ к любым инструментам, учетным записям или материалам, которые нам нужны.
- Убедились, что предоставляемый вами контент не нарушает права других лиц.
- Использовали наши результаты только в законных целях.

Задержки, вызванные вами, могут пропорционально продлить сроки проекта.

## 7. Конфиденциальность

Каждый из нас может получать конфиденциальную информацию от другого. Мы оба соглашаемся защищать ее, использовать только для проекта и не раскрывать, за исключением случаев, требуемых законом. Мы готовы подписать NDA перед обсуждением проекта.

## 8. Защита данных

Мы обрабатываем персональные данные в соответствии с **Законом Кении о защите данных 2019 года** и, где применимо, **Общим регламентом по защите данных (GDPR)**. Наши полные практики конфиденциальности изложены в нашей Политике конфиденциальности.

## 9. Сторонние сервисы

Наша работа может зависеть от сторонних инструментов и сервисов: облачный хостинг, платежные процессоры, доставка электронной почты и библиотеки с открытым исходным кодом. Мы не несем ответственности за доступность, производительность или условия этих сервисов. Возможно, вам придется принять их условия отдельно.

## 10. Гарантии и отказ от ответственности

Мы предоставляем наши услуги с разумной квалификацией и заботой. Помимо этого, наш веб-сайт и услуги предоставляются **"как есть"** и **"по мере доступности"**, без каких-либо гарантий, явных или подразумеваемых, включая пригодность для определенной цели или ненарушение прав.

Мы не обещаем, что программное обеспечение будет свободно от ошибок, что сторонние API никогда не изменятся или что сайт всегда будет доступен.

## 11. Ограничение ответственности

В максимальной степени, разрешенной кенийским законодательством, общая ответственность Khalai, возникающая из любого проекта, ограничивается платой, которую вы заплатили за этот проект. Мы не несем ответственности за косвенные, случайные или последующие убытки, включая упущенную выгоду или потерю данных.

Ничто в настоящих Условиях не ограничивает ответственность, которая не может быть ограничена законом.

## 12. Прекращение

Вы можете прекратить проект в любое время письменным уведомлением. Мы можем прекратить его, если платежи просрочены, если вы нарушаете настоящие Условия или если этого требует закон. При прекращении вы оплачиваете работу, выполненную до этой даты. Разделы, которые должны сохраняться после прекращения — интеллектуальная собственность, конфиденциальность, ограничение ответственности — продолжают применяться.

## 13. Применимое право

Настоящие Условия регулируются законами **Кении**. Любой спор будет разрешаться в судах **Найроби, Кения**, если мы не согласуем в письменной форме другой форум. Для международных клиентов мы можем согласиться на арбитраж по правилам **Найробийского центра международного арбитража (NCIA)**.

## 14. Изменения в настоящих Условиях

Мы можем время от времени обновлять настоящие Условия. Существенные изменения будут отмечены новой датой "последнего обновления". Продолжение использования сайта после вступления изменений в силу означает принятие пересмотренных Условий.

## 15. Контакты

Вопросы об этих Условиях? Напишите нам:

- **Электронная почта**: hello@khalai.studio
- **Местоположение**: Найроби, Кения
ENDOFFILE
            ;;
    esac
}

# Function to create privacy translation
generate_privacy() {
    local lang=$1
    local lang_name=${LANGUAGES[$lang]}
    
    echo "🔒 Generating privacy.$lang.mdx ($lang_name)..."
    
    case $lang in
        sw)
            cat > "privacy.sw.mdx" << 'ENDOFFILE'
---
title: "Sera ya Faragha"
description: "Sera ya Faragha ya Khalai Studio - inayoeleza data ya kibinafsi tunayokusanya, kwa nini tunaikusanya, na haki zako."
lastUpdated: "2026-10-15"
language: "sw"
slug: "faragha"
direction: "ltr"
---

# Sera ya Faragha

**Ilisasishwa mwisho: 15 Oktoba 2026**

Khalai Studio ("Khalai", "sisi", "yetu") inaheshimu faragha yako. Sera hii inaeleza data ya kibinafsi tunayokusanya, kwa nini tunaikusanya, na haki zako. Imeandikwa ili kukidhi **Sheria ya Ulinzi wa Data ya Kenya, 2019** (KDPA) na, kwa wageni kutoka Umoja wa Ulaya, **Kanuni ya Jumla ya Ulinzi wa Data** (GDPR).

## 1. Sisi ni nani (Mdhibiti wa Data)

Kwa madhumuni ya KDPA, Khalai Studio ndiye **mdhibiti wa data**. Maelezo yetu ya mawasiliano:

- Barua pepe: privacy@khalai.studio
- Mahali: Nairobi, Kenya

## 2. Data ya kibinafsi tunayokusanya

Tunakusanya tu kile tunachohitaji. Kulingana na jinsi unavyotumia tovuti yetu, tunaweza kukusanya:

- **Data ya fomu ya mawasiliano**: jina lako, anwani ya barua pepe, jina la kampuni (hiari), namba ya simu (hiari), maelezo ya mradi, na muda uliowasilisha.
- **Data ya jarida**: anwani yako ya barua pepe, hali ya usajili, na mihuri ya uthibitisho.
- **Data ya akaunti**: ikiwa unaunda akaunti, jina lako, barua pepe, namba ya simu (hiari), umri, wasifu (hiari), na nenosiri lililofichwa.
- **Data ya mradi**: taarifa yoyote unayoshiriki nasi wakati wa mradi — hati, msimbo, maelezo ya biashara.
- **Data ya kiufundi**: anwani ya IP, aina ya kivinjari, na shughuli za kikao, zilizokusanywa kwa usalama na utendaji wa msingi wa tovuti. Hatumii vidakuzi vya ufuatiliaji wa watu wengine au matangazo.

Hatukusanyi data kwa uangalifu kutoka kwa mtu yeyote chini ya miaka 18.

## 3. Kwa nini tunaikusanya (Msingi wa kisheria)

Chini ya KDPA, tunategemea moja au zaidi ya misingi hii ya kisheria:

| Kusudi | Msingi wa kisheria |
|---|---|
| Kujibu swali lako la mawasiliano | Idhini yako (unapowasilisha fomu) |
| Kutoa mradi uliotuajiri | Utekelezaji wa mkataba |
| Kutuma jarida | Idhini yako (kuingia mara mbili) |
| Kuweka tovuti salama na inafanya kazi | Maslahi yetu halali |
| Kutii majukumu ya kodi na kisheria | Wajibu wa kisheria |

Pale tunategemea idhini, unaweza kuiondoa wakati wowote. Kuondoa idhini hakuathiri uhalali wa usindikaji uliofanywa kabla ya kuondoa.

## 4. Jinsi tunavyotumia data yako

Tunatumia data ya kibinafsi:

- Kujibu maswali yako na kutoa nukuu za mradi.
- Kutoa, kusaidia, na kuboresha huduma zetu.
- Kutuma jarida ulizojisajili.
- Kuweka rekodi zinazohitajika na sheria (ankara, kodi).
- Kugundua na kuzuia udanganyifu au matumizi mabaya.

**Hatuzi** data yako. **Hatushiriki** kwa matangazo.

## 5. Tunashiriki na nani

Tunashiriki data tu inapohitajika na tu na watu wanaoilinda:

- **Watoa hosting**: tovuti na hifadhidata yetu zimehostiwa kwenye miundombinu salama ya wingu.
- **Usambazaji wa barua pepe**: tunatumia watoa barua pepe za miamala (k.m. Resend) kutuma uthibitisho na arifa.
- **Wasindikaji wa malipo**: kuchukua malipo kwa huduma.
- **Washauri wa kitaalamu**: wahasibu, wanasheria, inapohitajika.
- **Mamlaka**: inapohitajika na sheria au kulinda haki zetu.

Kila msindikaji amefungwa kwa mkataba kutumia data yako tu kwa kusudi lililokubaliwa.

## 6. Uhamisho wa data wa mipakani

Khalai Studio iko Kenya. Baadhi ya watoa huduma wetu huhifadhi au kusindika data nje ya Kenya. Chini ya KDPA, tunahakikisha kwamba uhamisho wowote nje ya Kenya una ulinzi wa kutosha: ama chombo cha kisheria na mpokeaji, uamuzi wa kutosha kutoka kwa Kamishna wa Data, au idhini yako ya wazi.

Ikiwa uko katika EU/EEA, tunahakikisha uhamisho unakidhi mahitaji ya GDPR (Vifungu vya Kawaida vya Mkataba au sawa).

## 7. Tunaiweka kwa muda gani

Tunaiweka data ya kibinafsi tu kwa muda tunaohitaji:

- **Maswali ya mawasiliano**: hadi miezi 24 baada ya mawasiliano ya mwisho, isipokuwa uwe mteja.
- **Data ya mradi wa mteja**: kwa muda wa mradi pamoja na miaka 7 (kwa rekodi za kodi na kisheria).
- **Usajili wa jarida**: hadi ujiondoe, pamoja na kipindi kifupi cha kuheshimu ombi.
- **Data ya akaunti**: hadi ufute akaunti yako, pamoja na dirisha fupi la uhifadhi kwa nakala rudufu.

Wakati data haihitajiki tena, tunaifuta kwa usalama au kuifanya isitambulike.

## 8. Haki zako

Chini ya KDPA na, inapotumika, GDPR, una haki ya:

- **Kufikia** data ya kibinafsi tunayoihifadhi kukuhusu.
- **Kurekebisha** data isiyo sahihi au isiyokamilika.
- **Kufuta** data ambayo hatuhitaji tena.
- **Kuzuia** au **kupinga** usindikaji.
- **Kuhamisha** data yako kwa huduma nyingine (inapowezekana kiufundi).
- **Kuondoa idhini** wakati wowote.
- **Kulalamika** kwa Ofisi ya Kamishna wa Ulinzi wa Data (ODPC) nchini Kenya, au mamlaka yako ya usimamizi ya ndani ikiwa uko katika EU/EEA.

Ili kutekeleza haki zozote hizi, tuma barua pepe kwa **privacy@khalai.studio**. Tutajibu ndani ya siku 30. Tunaweza kukuuliza kuthibitisha utambulisho wako kwanza.

## 9. Usalama

Tunalinda data ya kibinafsi kwa:

- Usambazaji uliosimbwa (HTTPS/TLS).
- Nenosiri zilizofichwa (bcrypt).
- Udhibiti wa ufikiaji na ruhusa za kiwango cha chini.
- Sasisho za programu za mara kwa mara na ukaguzi wa udhaifu.
- Ulinzi wa mikataba na wasindikaji.

Hakuna mfumo ulio salama kabisa. Ikiwa uvunjaji unaathiri haki zako, tutaarifu ODPC na watu walioathirika kama inavyohitajika na sheria.

## 10. Vidakuzi na hifadhi ya ndani

Tunatumia vidakuzi muhimu tu na hifadhi ya ndani kwa:

- Kukuweka umeingia.
- Kukumbuka mapendeleo yako ya mandhari.
- Kuzuia matumizi mabaya ya fomu (kupunguza kiwango).

Hatumii uchanganuzi wa watu wengine au vifuatiliaji vya matangazo. Ikiwa hii itabadilika, tutasasisha sera hii na kuomba idhini yako.

## 11. Watoto

Huduma zetu hazielekezwi kwa watoto chini ya miaka 18. Hatukusanyi data yao kwa uangalifu. Ikiwa unaamini tumefanya hivyo, wasiliana nasi na tutaifuta.

## 12. Mabadiliko ya sera hii

Tunaweza kusasisha sera hii. Mabadiliko muhimu yatawekwa alama na tarehe mpya ya "ilisasishwa mwisho". Kuendelea kutumia tovuti kunamaanisha unakubali sera iliyorekebishwa.

## 13. Mawasiliano

Maswali kuhusu sera hii au data yako? Tuandikie:

- **Barua pepe**: privacy@khalai.studio
- **Mahali**: Nairobi, Kenya
- **Afisa wa Ulinzi wa Data**: Ikiwa tunahitajika kumteua mmoja chini ya KDPA, maelezo yao ya mawasiliano yataonekana hapa.

## 14. Malalamiko

Ikiwa hukuridhika na jibu letu, unaweza kulalamika kwa:

- **Ofisi ya Kamishna wa Ulinzi wa Data (ODPC)**, Kenya — [odpc.go.ke](https://www.odpc.go.ke)
- Mamlaka yako ya ulinzi wa data ya ndani, ikiwa uko nje ya Kenya.
ENDOFFILE
            ;;
        es)
            cat > "privacy.es.mdx" << 'ENDOFFILE'
---
title: "Política de Privacidad"
description: "Política de Privacidad de Khalai Studio - que explica qué datos personales recopilamos, por qué los recopilamos y sus derechos."
lastUpdated: "2026-10-15"
language: "es"
slug: "privacidad"
direction: "ltr"
---

# Política de Privacidad

**Última actualización: 15 de octubre de 2026**

Khalai Studio ("Khalai", "nosotros") respeta su privacidad. Esta política explica qué datos personales recopilamos, por qué los recopilamos y qué derechos tiene. Está redactada para cumplir con la **Ley de Protección de Datos de Kenia de 2019** (KDPA) y, para visitantes de la Unión Europea, el **Reglamento General de Protección de Datos** (GDPR).

## 1. Quiénes somos (Responsable del tratamiento)

A los efectos de la KDPA, Khalai Studio es el **responsable del tratamiento**. Nuestros datos de contacto:

- Correo electrónico: privacy@khalai.studio
- Ubicación: Nairobi, Kenia

## 2. Qué datos personales recopilamos

Solo recopilamos lo que necesitamos. Según cómo use nuestro sitio, podemos recopilar:

- **Datos del formulario de contacto**: su nombre, dirección de correo electrónico, nombre de la empresa (opcional), número de teléfono (opcional), descripción del proyecto y la hora en que lo envió.
- **Datos del boletín**: su dirección de correo electrónico, estado de suscripción y marcas de tiempo de confirmación.
- **Datos de la cuenta**: si crea una cuenta, su nombre, correo electrónico, número de teléfono (opcional), edad, biografía (opcional) y una contraseña cifrada.
- **Datos del proyecto**: cualquier información que comparta con nosotros durante un proyecto — documentos, código, detalles comerciales.
- **Datos técnicos**: dirección IP, tipo de navegador y actividad de sesión, recopilados para seguridad y funcionalidad básica del sitio. No usamos cookies de seguimiento de terceros ni de publicidad.

No recopilamos a sabiendas datos de personas menores de 18 años.

## 3. Por qué lo recopilamos (Base legal)

Según la KDPA, nos basamos en una o más de estas bases legales:

| Propósito | Base legal |
|---|---|
| Responder a su consulta de contacto | Su consentimiento (cuando envía el formulario) |
| Entregar un proyecto que nos contrató | Ejecución de un contrato |
| Enviarle boletines | Su consentimiento (doble opt-in) |
| Mantener el sitio seguro y funcionando | Nuestro interés legítimo |
| Cumplir con obligaciones fiscales y legales | Obligación legal |

Cuando nos basamos en el consentimiento, puede retirarlo en cualquier momento. La retirada del consentimiento no afecta la licitud del tratamiento realizado antes de retirarlo.

## 4. Cómo usamos sus datos

Usamos datos personales para:

- Responder a sus consultas y proporcionar presupuestos de proyectos.
- Entregar, apoyar y mejorar nuestros servicios.
- Enviar boletines a los que se haya suscrito.
- Mantener registros requeridos por ley (facturas, impuestos).
- Detectar y prevenir fraudes o abusos.

**No** vendemos sus datos. **No** los compartimos para publicidad.

## 5. Con quién lo compartimos

Compartimos datos solo cuando es necesario y solo con partes que los protegen:

- **Proveedores de alojamiento**: nuestro sitio y base de datos están alojados en infraestructura de nube segura.
- **Entrega de correo electrónico**: usamos proveedores de correo transaccional (p. ej. Resend) para enviar confirmaciones y notificaciones.
- **Procesadores de pago**: para cobrar por los servicios.
- **Asesores profesionales**: contadores, abogados, cuando sea necesario.
- **Autoridades**: cuando lo exija la ley o para proteger nuestros derechos.

Cada procesador está contractualmente obligado a usar sus datos solo para el propósito acordado.

## 6. Transferencias de datos transfronterizas

Khalai Studio tiene su sede en Kenia. Algunos de nuestros proveedores de servicios almacenan o procesan datos fuera de Kenia. Según la KDPA, aseguramos que cualquier transferencia fuera de Kenia tenga salvaguardias adecuadas: ya sea un instrumento legal con el destinatario, una decisión de adecuación del Comisionado de Datos o su consentimiento explícito.

Si se encuentra en la UE/EEE, aseguramos que las transferencias cumplan con los requisitos del GDPR (Cláusulas Contractuales Tipo o equivalentes).

## 7. Cuánto tiempo lo conservamos

Conservamos datos personales solo durante el tiempo que los necesitamos:

- **Consultas de contacto**: hasta 24 meses después del último contacto, a menos que se convierta en cliente.
- **Datos del proyecto del cliente**: durante la duración del proyecto más 7 años (para registros fiscales y legales).
- **Suscripciones al boletín**: hasta que se dé de baja, más un breve período para honrar la solicitud.
- **Datos de la cuenta**: hasta que elimine su cuenta, más una breve ventana de retención para copias de seguridad.

Cuando los datos ya no son necesarios, los eliminamos de forma segura o los anonimizamos.

## 8. Sus derechos

Según la KDPA y, cuando corresponda, el GDPR, tiene derecho a:

- **Acceder** a los datos personales que tenemos sobre usted.
- **Corregir** datos inexactos o incompletos.
- **Eliminar** datos que ya no necesitamos.
- **Restringir** u **oponerse** al tratamiento.
- **Portar** sus datos a otro servicio (cuando sea técnicamente posible).
- **Retirar el consentimiento** en cualquier momento.
- **Presentar una reclamación** ante la Oficina del Comisionado de Protección de Datos (ODPC) en Kenia, o su autoridad de control local si se encuentra en la UE/EEE.

Para ejercer cualquiera de estos derechos, envíe un correo electrónico a **privacy@khalai.studio**. Responderemos dentro de los 30 días. Podemos pedirle que verifique su identidad primero.

## 9. Seguridad

Protegemos los datos personales con:

- Transmisión cifrada (HTTPS/TLS).
- Contraseñas cifradas (bcrypt).
- Controles de acceso y permisos de privilegio mínimo.
- Actualizaciones regulares de software y verificaciones de vulnerabilidad.
- Salvaguardias contractuales con procesadores.

Ningún sistema es perfectamente seguro. Si una brecha afecta sus derechos, notificaremos a la ODPC y a las personas afectadas según lo exija la ley.

## 10. Cookies y almacenamiento local

Usamos solo cookies esenciales y almacenamiento local para:

- Mantenerlo conectado.
- Recordar su preferencia de tema.
- Prevenir abuso de formularios (limitación de velocidad).

No usamos análisis de terceros ni rastreadores publicitarios. Si esto cambia, actualizaremos esta política y le pediremos su consentimiento.

## 11. Niños

Nuestros servicios no están dirigidos a niños menores de 18 años. No recopilamos a sabiendas sus datos. Si cree que lo hemos hecho, contáctenos y los eliminaremos.

## 12. Cambios a esta política

Podemos actualizar esta política. Los cambios materiales se marcarán con una nueva fecha de "última actualización". Continuar usando el sitio significa que acepta la política revisada.

## 13. Contacto

¿Preguntas sobre esta política o sus datos? Escríbanos:

- **Correo electrónico**: privacy@khalai.studio
- **Ubicación**: Nairobi, Kenia
- **Delegado de Protección de Datos**: Si se nos requiere designar uno según la KDPA, sus datos de contacto aparecerán aquí.

## 14. Reclamaciones

Si no está satisfecho con nuestra respuesta, puede reclamar ante:

- **Oficina del Comisionado de Protección de Datos (ODPC)**, Kenia — [odpc.go.ke](https://www.odpc.go.ke)
- Su autoridad local de protección de datos, si se encuentra fuera de Kenia.
ENDOFFILE
            ;;
        fr)
            cat > "privacy.fr.mdx" << 'ENDOFFILE'
---
title: "Politique de Confidentialité"
description: "Politique de Confidentialité de Khalai Studio - expliquant quelles données personnelles nous collectons, pourquoi nous les collectons et vos droits."
lastUpdated: "2026-10-15"
language: "fr"
slug: "confidentialite"
direction: "ltr"
---

# Politique de Confidentialité

**Dernière mise à jour : 15 octobre 2026**

Khalai Studio ("Khalai", "nous") respecte votre vie privée. Cette politique explique quelles données personnelles nous collectons, pourquoi nous les collectons et quels sont vos droits. Elle est rédigée pour se conformer à la **Loi kenyane sur la protection des données de 2019** (KDPA) et, pour les visiteurs de l'Union européenne, au **Règlement général sur la protection des données** (RGPD).

## 1. Qui nous sommes (Responsable du traitement)

Aux fins de la KDPA, Khalai Studio est le **responsable du traitement**. Nos coordonnées :

- E-mail : privacy@khalai.studio
- Emplacement : Nairobi, Kenya

## 2. Quelles données personnelles nous collectons

Nous ne collectons que ce dont nous avons besoin. Selon la façon dont vous utilisez notre site, nous pouvons collecter :

- **Données du formulaire de contact** : votre nom, adresse e-mail, nom de l'entreprise (facultatif), numéro de téléphone (facultatif), description du projet et l'heure de soumission.
- **Données de la newsletter** : votre adresse e-mail, statut d'abonnement et horodatages de confirmation.
- **Données du compte** : si vous créez un compte, votre nom, e-mail, numéro de téléphone (facultatif), âge, biographie (facultatif) et un mot de passe haché.
- **Données du projet** : toute information que vous partagez avec nous pendant un projet — documents, code, détails commerciaux.
- **Données techniques** : adresse IP, type de navigateur et activité de session, collectées pour la sécurité et les fonctionnalités de base du site. Nous n'utilisons pas de cookies de suivi tiers ou publicitaires.

Nous ne collectons pas sciemment de données auprès de personnes de moins de 18 ans.

## 3. Pourquoi nous les collectons (Base légale)

En vertu de la KDPA, nous nous appuyons sur une ou plusieurs de ces bases légales :

| Finalité | Base légale |
|---|---|
| Répondre à votre demande de contact | Votre consentement (lorsque vous soumettez le formulaire) |
| Livrer un projet pour lequel vous nous avez engagés | Exécution d'un contrat |
| Vous envoyer des newsletters | Votre consentement (double opt-in) |
| Garder le site sécurisé et fonctionnel | Notre intérêt légitime |
| Respecter les obligations fiscales et légales | Obligation légale |

Lorsque nous nous appuyons sur le consentement, vous pouvez le retirer à tout moment. Le retrait du consentement n'affecte pas la licéité du traitement effectué avant votre retrait.

## 4. Comment nous utilisons vos données

Nous utilisons les données personnelles pour :

- Répondre à vos demandes et fournir des devis de projet.
- Livrer, soutenir et améliorer nos services.
- Envoyer des newsletters auxquelles vous vous êtes abonné.
- Tenir les registres requis par la loi (factures, taxes).
- Détecter et prévenir la fraude ou les abus.

Nous ne **vendons pas** vos données. Nous ne les **partageons pas** à des fins publicitaires.

## 5. Avec qui nous les partageons

Nous partageons les données uniquement lorsque cela est nécessaire et uniquement avec des parties qui les protègent :

- **Hébergeurs** : notre site et notre base de données sont hébergés sur une infrastructure cloud sécurisée.
- **Livraison d'e-mails** : nous utilisons des fournisseurs d'e-mails transactionnels (par ex. Resend) pour envoyer des confirmations et des notifications.
- **Processeurs de paiement** : pour percevoir le paiement des services.
- **Conseillers professionnels** : comptables, avocats, si nécessaire.
- **Autorités** : lorsque la loi l'exige ou pour protéger nos droits.

Chaque processeur est contractuellement tenu d'utiliser vos données uniquement aux fins convenues.

## 6. Transferts de données transfrontaliers

Khalai Studio est basé au Kenya. Certains de nos prestataires stockent ou traitent des données en dehors du Kenya. En vertu de la KDPA, nous veillons à ce que tout transfert en dehors du Kenya bénéficie de garanties adéquates : soit un instrument juridique avec le destinataire, une décision d'adéquation du Commissaire aux données, soit votre consentement explicite.

Si vous êtes dans l'UE/EEE, nous veillons à ce que les transferts soient conformes aux exigences du RGPD (Clauses contractuelles types ou équivalent).

## 7. Combien de temps nous les conservons

Nous ne conservons les données personnelles que le temps nécessaire :

- **Demandes de contact** : jusqu'à 24 mois après le dernier contact, sauf si vous devenez client.
- **Données du projet client** : pendant la durée du projet plus 7 ans (pour les dossiers fiscaux et juridiques).
- **Abonnements à la newsletter** : jusqu'à votre désabonnement, plus une courte période pour honorer la demande.
- **Données du compte** : jusqu'à la suppression de votre compte, plus une courte fenêtre de rétention pour les sauvegardes.

Lorsque les données ne sont plus nécessaires, nous les supprimons ou les anonymisons en toute sécurité.

## 8. Vos droits

En vertu de la KDPA et, le cas échéant, du RGPD, vous avez le droit de :

- **Accéder** aux données personnelles que nous détenons à votre sujet.
- **Corriger** les données inexactes ou incomplètes.
- **Supprimer** les données dont nous n'avons plus besoin.
- **Restreindre** ou **vous opposer** au traitement.
- **Porter** vos données vers un autre service (lorsque techniquement possible).
- **Retirer votre consentement** à tout moment.
- **Déposer une plainte** auprès du Bureau du Commissaire à la protection des données (ODPC) au Kenya, ou de votre autorité de contrôle locale si vous êtes dans l'UE/EEE.

Pour exercer l'un de ces droits, envoyez un e-mail à **privacy@khalai.studio**. Nous répondrons dans les 30 jours. Nous pouvons vous demander de vérifier votre identité d'abord.

## 9. Sécurité

Nous protégeons les données personnelles avec :

- Transmission chiffrée (HTTPS/TLS).
- Mots de passe hachés (bcrypt).
- Contrôles d'accès et permissions de moindre privilège.
- Mises à jour logicielles régulières et vérifications des vulnérabilités.
- Garanties contractuelles avec les processeurs.

Aucun système n'est parfaitement sûr. Si une violation affecte vos droits, nous informerons l'ODPC et les personnes concernées comme l'exige la loi.

## 10. Cookies et stockage local

Nous utilisons uniquement des cookies essentiels et le stockage local pour :

- Vous maintenir connecté.
- Mémoriser votre préférence de thème.
- Prévenir les abus de formulaire (limitation de débit).

Nous n'utilisons pas d'analyses tierces ni de traceurs publicitaires. Si cela change, nous mettrons à jour cette politique et demanderons votre consentement.

## 11. Enfants

Nos services ne sont pas destinés aux enfants de moins de 18 ans. Nous ne collectons pas sciemment leurs données. Si vous pensez que nous l'avons fait, contactez-nous et nous les supprimerons.

## 12. Modifications de cette politique

Nous pouvons mettre à jour cette politique. Les modifications importantes seront marquées par une nouvelle date de "dernière mise à jour". Continuer à utiliser le site signifie que vous acceptez la politique révisée.

## 13. Contact

Des questions sur cette politique ou vos données ? Écrivez-nous :

- **E-mail** : privacy@khalai.studio
- **Emplacement** : Nairobi, Kenya
- **Délégué à la protection des données** : Si nous sommes tenus d'en nommer un en vertu de la KDPA, ses coordonnées apparaîtront ici.

## 14. Réclamations

Si vous n'êtes pas satisfait de notre réponse, vous pouvez déposer une réclamation auprès de :

- **Bureau du Commissaire à la protection des données (ODPC)**, Kenya — [odpc.go.ke](https://www.odpc.go.ke)
- Votre autorité locale de protection des données, si vous êtes en dehors du Kenya.
ENDOFFILE
            ;;
        ar)
            cat > "privacy.ar.mdx" << 'ENDOFFILE'
---
title: "سياسة الخصوصية"
description: "سياسة الخصوصية لـ Khalai Studio - توضح البيانات الشخصية التي نجمعها ولماذا نجمعها وحقوقك."
lastUpdated: "2026-10-15"
language: "ar"
slug: "khosusiya"
direction: "rtl"
---

# سياسة الخصوصية

**آخر تحديث: 15 أكتوبر 2026**

تحترم Khalai Studio ("خالاي"، "نحن") خصوصيتك. توضح هذه السياسة البيانات الشخصية التي نجمعها ولماذا نجمعها وحقوقك. وقد كُتبت للامتثال لـ **قانون حماية البيانات الكيني لعام 2019** (KDPA) و، للزوار من الاتحاد الأوروبي، **اللائحة العامة لحماية البيانات** (GDPR).

## 1. من نحن (المتحكم في البيانات)

لأغراض KDPA، Khalai Studio هي **المتحكم في البيانات**. بيانات الاتصال بنا:

- البريد الإلكتروني: privacy@khalai.studio
- الموقع: نيروبي، كينيا

## 2. البيانات الشخصية التي نجمعها

نجمع فقط ما نحتاجه. اعتمادًا على كيفية استخدامك لموقعنا، قد نجمع:

- **بيانات نموذج الاتصال**: اسمك وعنوان بريدك الإلكتروني واسم الشركة (اختياري) ورقم الهاتف (اختياري) ووصف المشروع ووقت الإرسال.
- **بيانات النشرة الإخبارية**: عنوان بريدك الإلكتروني وحالة الاشتراك وطوابع وقت التأكيد.
- **بيانات الحساب**: إذا أنشأت حسابًا، اسمك وبريدك الإلكتروني ورقم هاتفك (اختياري) وعمرك وسيرتك الذاتية (اختياري) وكلمة مرور مشفرة.
- **بيانات المشروع**: أي معلومات تشاركها معنا أثناء المشروع — مستندات، أكواد، تفاصيل تجارية.
- **البيانات التقنية**: عنوان IP ونوع المتصفح ونشاط الجلسة، تُجمع لأغراض الأمان والوظائف الأساسية للموقع. لا نستخدم ملفات تعريف ارتباط تتبع أو إعلانات من أطراف ثالثة.

لا نجمع عن علم بيانات من أي شخص تحت 18 عامًا.

## 3. لماذا نجمعها (الأساس القانوني)

بموجب KDPA، نعتمد على واحد أو أكثر من هذه الأسس القانونية:

| الغرض | الأساس القانوني |
|---|---|
| الرد على استفسارك | موافقتك (عند إرسال النموذج) |
| تسليم مشروع وظفتنا من أجله | تنفيذ عقد |
| إرسال النشرات الإخبارية | موافقتك (الاشتراك المزدوج) |
| الحفاظ على أمان الموقع وعمله | مصلحتنا المشروعة |
| الامتثال للالتزامات الضريبية والقانونية | التزام قانوني |

عندما نعتمد على الموافقة، يمكنك سحبها في أي وقت. لا يؤثر سحب الموافقة على قانونية المعالجة التي تمت قبل السحب.

## 4. كيف نستخدم بياناتك

نستخدم البيانات الشخصية من أجل:

- الرد على استفساراتك وتقديم عروض أسعار للمشاريع.
- تسليم خدماتنا ودعمها وتحسينها.
- إرسال النشرات الإخبارية التي اشتركت فيها.
- الاحتفاظ بالسجلات المطلوبة قانونًا (الفواتير، الضرائب).
- اكتشاف ومنع الاحتيال أو إساءة الاستخدام.

**لا نبيع** بياناتك. **لا نشاركها** لأغراض إعلانية.

## 5. مع من نشاركها

نشارك البيانات فقط عند الضرورة وفقط مع أطراف تحميها:

- **مزودو الاستضافة**: موقعنا وقاعدة بياناتنا مستضافان على بنية سحابية آمنة.
- **تسليم البريد الإلكتروني**: نستخدم مزودي بريد إلكتروني معاملاتي (مثل Resend) لإرسال التأكيدات والإشعارات.
- **معالجو الدفع**: لتحصيل رسوم الخدمات.
- **المستشارون المهنيون**: المحاسبون والمحامون، عند الحاجة.
- **السلطات**: عند اقتضاء القانون أو لحماية حقوقنا.

كل معالج ملزم تعاقديًا باستخدام بياناتك فقط للغرض المتفق عليه.

## 6. نقل البيانات عبر الحدود

Khalai Studio مقرها في كينيا. بعض مزودي الخدمة لدينا يخزنون أو يعالجون البيانات خارج كينيا. بموجب KDPA، نضمن أن أي نقل خارج كينيا لديه ضمانات كافية: إما صك قانوني مع المستلم، أو قرار ملاءمة من مفوض البيانات، أو موافقتك الصريحة.

إذا كنت في الاتحاد الأوروبي/المنطقة الاقتصادية الأوروبية، نضمن أن النقل يتوافق مع متطلبات GDPR (الشروط التعاقدية القياسية أو ما يعادلها).

## 7. مدة الاحتفاظ بها

نحتفظ بالبيانات الشخصية فقط طالما نحتاجها:

- **استفسارات الاتصال**: حتى 24 شهرًا بعد آخر اتصال، ما لم تصبح عميلاً.
- **بيانات مشروع العميل**: طوال مدة المشروع زائد 7 سنوات (للسجلات الضريبية والقانونية).
- **اشتراكات النشرة الإخبارية**: حتى إلغاء الاشتراك، زائد فترة قصيرة لتلبية الطلب.
- **بيانات الحساب**: حتى تحذف حسابك، زائد نافذة احتفاظ قصيرة للنسخ الاحتياطي.

عندما لا تعود البيانات مطلوبة، نحذفها أو نجعلها مجهولة الهوية بشكل آمن.

## 8. حقوقك

بموجب KDPA و، حيث ينطبق، GDPR، لديك الحق في:

- **الوصول** إلى البيانات الشخصية التي نحتفظ بها عنك.
- **تصحيح** البيانات غير الدقيقة أو غير الكاملة.
- **حذف** البيانات التي لم نعد نحتاجها.
- **تقييد** أو **الاعتراض** على المعالجة.
- **نقل** بياناتك إلى خدمة أخرى (حيثما كان ذلك ممكنًا تقنيًا).
- **سحب الموافقة** في أي وقت.
- **تقديم شكوى** إلى مكتب مفوض حماية البيانات (ODPC) في كينيا، أو سلطتك الإشرافية المحلية إذا كنت في الاتحاد الأوروبي/المنطقة الاقتصادية الأوروبية.

لممارسة أي من هذه الحقوق، أرسل بريدًا إلكترونيًا إلى **privacy@khalai.studio**. سنرد خلال 30 يومًا. قد نطلب منك التحقق من هويتك أولاً.

## 9. الأمان

نحمي البيانات الشخصية بـ:

- نقل مشفر (HTTPS/TLS).
- كلمات مرور مشفرة (bcrypt).
- ضوابط الوصول وأذونات الامتياز الأدنى.
- تحديثات برامج منتظمة وفحوصات الثغرات.
- ضمانات تعاقدية مع المعالجين.

لا يوجد نظام آمن تمامًا. إذا أثر خرق على حقوقك، سنخطر ODPC والأفراد المتأثرين كما يقتضي القانون.

## 10. ملفات تعريف الارتباط والتخزين المحلي

نستخدم فقط ملفات تعريف الارتباط الأساسية والتخزين المحلي من أجل:

- إبقائك مسجلاً للدخول.
- تذكر تفضيل المظهر الخاص بك.
- منع إساءة استخدام النماذج (تحديد المعدل).

لا نستخدم تحليلات خارجية أو متتبعات إعلانية. إذا تغير هذا، سنحدّث هذه السياسة ونطلب موافقتك.

## 11. الأطفال

خدماتنا غير موجهة للأطفال تحت 18 عامًا. لا نجمع بياناتهم عن علم. إذا كنت تعتقد أننا فعلنا ذلك، اتصل بنا وسنحذفها.

## 12. تغييرات على هذه السياسة

قد نحدّث هذه السياسة. سيتم وضع علامة على التغييرات الجوهرية بتاريخ "آخر تحديث" جديد. يعني استمرارك في استخدام الموقع قبولك للسياسة المعدلة.

## 13. الاتصال

أسئلة حول هذه السياسة أو بياناتك؟ اكتب إلينا:

- **البريد الإلكتروني**: privacy@khalai.studio
- **الموقع**: نيروبي، كينيا
- **مسؤول حماية البيانات**: إذا طُلب منا تعيين واحد بموجب KDPA، ستظهر بيانات اتصاله هنا.

## 14. الشكاوى

إذا لم تكن راضيًا عن ردنا، يمكنك تقديم شكوى إلى:

- **مكتب مفوض حماية البيانات (ODPC)**، كينيا — [odpc.go.ke](https://www.odpc.go.ke)
- سلطة حماية البيانات المحلية لديك، إذا كنت خارج كينيا.
ENDOFFILE
            ;;
        ru)
            cat > "privacy.ru.mdx" << 'ENDOFFILE'
---
title: "Политика конфиденциальности"
description: "Политика конфиденциальности Khalai Studio - объясняющая, какие персональные данные мы собираем, почему мы их собираем и ваши права."
lastUpdated: "2026-10-15"
language: "ru"
slug: "konfidentsialnost"
direction: "ltr"
---

# Политика конфиденциальности

**Последнее обновление: 15 октября 2026 г.**

Khalai Studio ("Khalai", "мы") уважает вашу конфиденциальность. Настоящая политика объясняет, какие персональные данные мы собираем, почему мы их собираем и какие у вас есть права. Она составлена в соответствии с **Законом Кении о защите данных 2019 года** (KDPA) и, для посетителей из Европейского союза, **Общим регламентом по защите данных** (GDPR).

## 1. Кто мы (Контроллер данных)

Для целей KDPA Khalai Studio является **контроллером данных**. Наши контактные данные:

- Электронная почта: privacy@khalai.studio
- Местоположение: Найроби, Кения

## 2. Какие персональные данные мы собираем

Мы собираем только то, что нам нужно. В зависимости от того, как вы используете наш сайт, мы можем собирать:

- **Данные контактной формы**: ваше имя, адрес электронной почты, название компании (необязательно), номер телефона (необязательно), описание проекта и время отправки.
- **Данные новостной рассылки**: ваш адрес электронной почты, статус подписки и временные метки подтверждения.
- **Данные учетной записи**: если вы создаете учетную запись, ваше имя, электронная почта, номер телефона (необязательно), возраст, биография (необязательно) и хешированный пароль.
- **Данные проекта**: любая информация, которой вы делитесь с нами во время проекта — документы, код, деловые детали.
- **Технические данные**: IP-адрес, тип браузера и активность сессии, собираемые для безопасности и базовой функциональности сайта. Мы не используем сторонние трекинговые или рекламные cookie.

Мы сознательно не собираем данные лиц младше 18 лет.

## 3. Почему мы их собираем (Правовое основание)

В соответствии с KDPA мы полагаемся на одно или несколько из следующих правовых оснований:

| Цель | Правовое основание |
|---|---|
| Ответ на ваш контактный запрос | Ваше согласие (при отправке формы) |
| Выполнение проекта, для которого вы нас наняли | Исполнение договора |
| Отправка вам новостных рассылок | Ваше согласие (двойное подтверждение) |
| Обеспечение безопасности и работы сайта | Наш законный интерес |
| Соблюдение налоговых и юридических обязательств | Юридическая обязанность |

Когда мы полагаемся на согласие, вы можете отозвать его в любое время. Отзыв согласия не влияет на законность обработки, выполненной до отзыва.

## 4. Как мы используем ваши данные

Мы используем персональные данные для:

- Ответа на ваши запросы и предоставления смет по проектам.
- Предоставления, поддержки и улучшения наших услуг.
- Отправки новостных рассылок, на которые вы подписались.
- Ведения записей, требуемых законом (счета, налоги).
- Обнаружения и предотвращения мошенничества или злоупотреблений.

Мы **не продаем** ваши данные. Мы **не делимся** ими для рекламы.

## 5. С кем мы делимся ими

Мы делимся данными только при необходимости и только с сторонами, которые их защищают:

- **Хостинг-провайдеры**: наш сайт и база данных размещены на безопасной облачной инфраструктуре.
- **Доставка электронной почты**: мы используем провайдеров транзакционной электронной почты (например, Resend) для отправки подтверждений и уведомлений.
- **Платежные процессоры**: для приема оплаты за услуги.
- **Профессиональные консультанты**: бухгалтеры, юристы, при необходимости.
- **Органы власти**: когда требуется по закону или для защиты наших прав.

Каждый процессор по договору обязан использовать ваши данные только для согласованной цели.

## 6. Трансграничная передача данных

Khalai Studio базируется в Кении. Некоторые из наших поставщиков услуг хранят или обрабатывают данные за пределами Кении. В соответствии с KDPA мы обеспечиваем, чтобы любая передача за пределы Кении имела адекватные гарантии: либо юридический инструмент с получателем, решение об адекватности от Комиссара по данным, либо ваше явное согласие.

Если вы находитесь в ЕС/ЕЭЗ, мы обеспечиваем соответствие передач требованиям GDPR (Стандартные договорные условия или эквивалент).

## 7. Как долго мы их храним

Мы храним персональные данные только столько, сколько необходимо:

- **Контактные запросы**: до 24 месяцев после последнего контакта, если вы не станете клиентом.
- **Данные проекта клиента**: на протяжении проекта плюс 7 лет (для налоговых и юридических записей).
- **Подписки на новостную рассылку**: до отписки, плюс короткий период для выполнения запроса.
- **Данные учетной записи**: до удаления вашей учетной записи, плюс короткий период хранения для резервных копий.

Когда данные больше не нужны, мы безопасно удаляем или анонимизируем их.

## 8. Ваши права

В соответствии с KDPA и, где применимо, GDPR, вы имеете право:

- **Получить доступ** к персональным данным, которые мы храним о вас.
- **Исправить** неточные или неполные данные.
- **Удалить** данные, которые нам больше не нужны.
- **Ограничить** или **возразить** против обработки.
- **Перенести** ваши данные в другой сервис (где это технически возможно).
- **Отозвать согласие** в любое время.
- **Подать жалобу** в Управление Комиссара по защите данных (ODPC) в Кении или в ваш местный надзорный орган, если вы находитесь в ЕС/ЕЭЗ.

Чтобы воспользоваться любым из этих прав, напишите на **privacy@khalai.studio**. Мы ответим в течение 30 дней. Мы можем сначала попросить вас подтвердить вашу личность.

## 9. Безопасность

Мы защищаем персональные данные с помощью:

- Шифрованной передачи (HTTPS/TLS).
- Хешированных паролей (bcrypt).
- Контроля доступа и разрешений с минимальными привилегиями.
- Регулярных обновлений программного обеспечения и проверок уязвимостей.
- Договорных гарантий с процессорами.

Ни одна система не является абсолютно безопасной. Если нарушение затрагивает ваши права, мы уведомим ODPC и затронутых лиц, как того требует закон.

## 10. Cookie и локальное хранилище

Мы используем только необходимые cookie и локальное хранилище для:

- Поддержания вашего входа в систему.
- Запоминания ваших предпочтений темы.
- Предотвращения злоупотребления формами (ограничение скорости).

Мы не используем стороннюю аналитику или рекламные трекеры. Если это изменится, мы обновим эту политику и запросим ваше согласие.

## 11. Дети

Наши услуги не предназначены для детей младше 18 лет. Мы сознательно не собираем их данные. Если вы считаете, что мы это сделали, свяжитесь с нами, и мы удалим их.

## 12. Изменения в настоящей политике

Мы можем обновлять эту политику. Существенные изменения будут отмечены новой датой "последнего обновления". Продолжение использования сайта означает принятие пересмотренной политики.

## 13. Контакты

Вопросы об этой политике или ваших данных? Напишите нам:

- **Электронная почта**: privacy@khalai.studio
- **Местоположение**: Найроби, Кения
- **Сотрудник по защите данных**: Если мы обязаны назначить такового в соответствии с KDPA, его контактные данные появятся здесь.

## 14. Жалобы

Если вы не удовлетворены нашим ответом, вы можете подать жалобу в:

- **Управление Комиссара по защите данных (ODPC)**, Кения — [odpc.go.ke](https://www.odpc.go.ke)
- Ваш местный орган по защите данных, если вы находитесь за пределами Кении.
ENDOFFILE
            ;;
    esac
}

# Main generation loop
for lang in "${!LANGUAGES[@]}"; do
    generate_terms "$lang"
    generate_privacy "$lang"
done

echo ""
echo "✅ All translation files generated successfully!"
echo ""
echo "📁 Files created in $(pwd):"
ls -la *.mdx

echo "🎉 Done! Legal content files are ready."