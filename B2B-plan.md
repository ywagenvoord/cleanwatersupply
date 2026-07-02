# B2B-erhvervsshop med login og faktura – teknisk plan

**Formål:** Erhvervskunder logger ind på cleanwatersupply.dk, ser deres egne varer og priser (ekskl. moms), og bestiller på faktura. Ordren lægges automatisk ind i **E-komplet**, så fakturaen dannes der. Firmaoplysninger gemmes på kontoen og udfyldes automatisk ved hver ordre.

Denne plan er skrevet, så den kan gives direkte til udvikleren. Stack i dag: **Next.js 14 (App Router), TypeScript, Tailwind, hostet på Netlify.**

---

## Hvad der allerede er på plads

- Produkter kan mærkes `audience: 'privat' | 'erhverv'` og med pris ekskl. moms (`priceExMoms`) – i `src/lib/products.ts`.
- Erhvervsshoppen er gemt bag et login-gate: `src/app/shop/erhverv/ErhvervShopGate.tsx`.
- Der findes et **demo-login** (`src/lib/b2bDemo.ts`) + sider til login/ansøgning/min konto under `src/app/min-konto/`.
- **Vigtigt:** demo-login er kun en markør i browserens localStorage – ingen rigtig sikkerhed, ingen identitet, kan ikke gemme profil per kunde. Skal erstattes af rigtig auth.

---

## Anbefalet arkitektur

Byg ikke login-sikkerhed fra bunden. Brug en færdig tjeneste. To gode veje på denne stack:

1. **Supabase** (anbefalet) – Postgres-database + indbygget auth i ét. Gratis niveau rækker langt, god Next.js-integration, hurtigt at komme i gang.
2. **Auth.js (NextAuth) + hostet Postgres** (fx Neon) – hvis udvikleren foretrækker at holde auth i Next.js selv.

Resten af planen antager Supabase, men mønsteret er det samme uanset valg.

### Datamodel (minimum)

- **company** (virksomhed): `id`, `firmanavn`, `cvr`, `ean` (valgfri), `att`, `faktura_adresse`, `leverings_adresse`, `ekomplet_debitor_id`, `godkendt` (bool).
- **user** (login): knyttet til `company_id`. Auth håndteres af Supabase.
- **order** (ordre): `id`, `company_id`, `linjer` (produkt + antal + pris), `status`, `ekomplet_ordre_id`, `oprettet`.

### Kontooprettelse (B2B er ikke fri selvbetjening)

Erhvervskunder skal typisk **godkendes**. Den eksisterende "Ansøg om konto"-side (`min-konto/ansog`) bliver til en rigtig ansøgning → Camilla/admin godkender → konto aktiveres og kobles til en E-komplet-debitor.

---

## Faser og hvem gør hvad

### Fase 0 – Frontend uden backend  → *kan laves nu (Claude/Camilla)*
- Færdiggør erhvervsshoppen med den fælles erhvervsprisliste (ekskl. moms).
- Byg "Bestil på faktura"-kassen med felter for firmaoplysninger + hele ordren.
- Struktureres, så den senere blot læser fra kontoen og poster til backend.
- Midlertidigt: ordren sendes som struktureret e-mail til jer, så shoppen er brugbar med det samme.

### Fase 1 – Rigtige konti  → *udvikleren*
- Sæt Supabase (eller valgt løsning) op: database + auth.
- Erstat demo-login (`b2bDemo.ts` + gate) med rigtig, server-side beskyttet auth.
- Company-profil gemmes og udfyldes automatisk ved kassen (på tværs af enheder).
- Admin-godkendelse af nye erhvervskonti.
- Secrets (Supabase-nøgler) lægges i Netlify miljøvariabler.

### Fase 2 – E-komplet-integration  → *udvikler + Claude, kræver API-adgang*
- Server-route (`/api/erhverv/ordre`) der modtager kurven + `ekomplet_debitor_id` og opretter ordren/fakturaen i E-komplet via deres API.
- E-komplet API-nøgle lægges i Netlify miljøvariabler (ses aldrig i frontend).

---

## Forudsætninger (skal skaffes)

1. **E-komplet API-adgang** (nøgle/token + adgang til apidoc.e-komplet.dk). Uden den kan Fase 2 ikke bygges. *(Se mail-udkast nederst.)*
2. **Beslutning om auth-løsning** (Supabase vs. Auth.js) – tages med udvikleren.
3. Afklaring: hvordan matches en webshop-konto til den rigtige **debitor** i E-komplet (eksisterende kundenummer?).

---

## Sikkerhed (kort)

- Erhvervspriser og -varer må aldrig kunne ses uden gyldigt login → kontrollen skal ske **server-side**, ikke kun i browseren.
- Alle nøgler (E-komplet, Supabase service-key) kun i miljøvariabler på Netlify – aldrig i koden.
- Personlige/firmadata gemmes i databasen efter gældende regler (GDPR: kun det nødvendige).

---

## Mail-udkast til E-komplet (API-adgang)

> Emne: Anmodning om API-adgang
>
> Hej,
>
> Vi bruger E-komplet og vil gerne integrere vores webshop, så erhvervsordrer oprettes automatisk som ordre/faktura i E-komplet. Kan I hjælpe os med at få API-adgang (nøgle/token) samt adgang til API-dokumentationen?
>
> Konkret har vi brug for at kunne: oprette en ordre/faktura på en eksisterende debitor og slå debitorer op. Kan I samtidig oplyse, hvordan vi bedst matcher en kunde til den rigtige debitor?
>
> På forhånd tak.
> Clean Water Supply

---

*Opdateret: juli 2026*
