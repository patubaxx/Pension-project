# Pension Project — ratkaisusuunnitelma

## 1. Projektin tarkoitus

**Pension Project** on Next.js-pohjainen portfolioverkkosivu, jonka tarkoitus on esitellä visuaalisesti näyttävällä mutta teknisesti kurinalaisella tavalla dataa Suomen eläkejärjestelmän rahoituksesta.

Projektin ensimmäinen julkaistava versio on **yksisivuinen editorial-tyylinen data story**, mutta arkkitehtuuri rakennetaan alusta asti niin, että projektiin voidaan lisätä myöhemmin uusia sivuja, uusia datanäkymiä ja laajempaa sisältöä ilman rakenteellista uudelleenkirjoitusta.

Projektin pitää osoittaa erityisesti:

* vahvaa frontend- ja UI-osaamista
* data-visualisoinnin suunnittelukykyä
* selkeää arkkitehtuurista ajattelua
* hallittua datankeruun, validoinnin ja transformoinnin mallia

## 2. Lukitut päätökset

Nämä toimivat projektin tämän vaiheen sitovina linjauksina.

### Tuote ja sisältö

* MVP on **yksisivuinen**
* päätarina on **Suomen eläkejärjestelmän rahoituksen yleiskuva + työeläkevarojen kehitys ajassa**
* kohdeyleisö on ensisijaisesti:

  * rekrytoijat
  * työnantajat
  * tekniset osaajat
* esitystapa on **helposti lähestyttävä**, mutta visuaalisesti ja rakenteellisesti asiantunteva
* projekti tehdään **portfolio-first mutta production-minded** -periaatteella

### Kielet ja i18n

* kielituki sisällytetään alusta lähtien
* tuetut kielet:

  * **englanti**
  * **suomi**
* **englanti on pääkieli**
* i18n-rakenne ja kirjastot otetaan käyttöön heti ensimmäisessä versiossa

### Data

* ensisijainen lähde on **ETK**
* täydentävä lähde voi olla **Tela**
* MVP:ssä käytetään yhtä pääasiallista lähdettä ja korkeintaan yhtä täydentävää
* data tuodaan ensin **ingestion + transform + validation** -putken kautta
* käyttöliittymä käyttää **esikäsiteltyä dataa**, ei raakadataa
* data voidaan tallentaa paikalliseen prosessoituun muotoon, esimerkiksi JSON-tiedostoiksi

### Visualisointi ja design

* yksi visualisointi nostetaan projektin **signature pieceksi**
* pääpaino on editorial-henkisessä, korkealaatuisessa dataesityksessä
* interaktiivisuus on **kevyt tai kohtalainen**
* design on **premium editorial**, hieman design-projektin suuntaan kallistuva mutta luotettavuus säilyttäen
* animaatio on hienovarainen mutta tärkeä osa laatumielikuvaa

### Teknologia

* **Next.js**
* **TypeScript**
* **App Router**
* **Tailwind CSS**
* i18n-kirjasto mukaan heti
* perusvisualisoinnit ensisijaisesti **Rechartsilla**
* mahdolliset uniikit custom-visualisoinnit omalla SVG-ratkaisulla tai visx:llä
* **Zod** datan validointiin
* **ESLint + Prettier** mukaan heti

### Arkkitehtuuriperiaatteet

* ei raskasta client-stateä ilman todellista tarvetta
* UI ei käsittele raakadataa
* datan transformointi tehdään erillisessä kerroksessa
* dependency footprint pidetään siistinä
* rakenne on laajennettava mutta ei enterprise-raskas
* saavutettavuus huomioidaan alusta asti
* animaatio ei saa heikentää luettavuutta tai suorituskykyä

---

# 3. Arkkitehtuurinen tavoitetila

Projektin tavoitearkkitehtuuri on:

1. **selkeästi rajattu domain**
2. **eroteltu data pipeline**
3. **komponenttipohjainen UI**
4. **monikielinen sisältörakenne**
5. **helposti laajennettava reititys**
6. **Cursorille ohjattavissa oleva selkeä työnjako**

Arkkitehtuurin tulee tukea seuraavaa kehityspolkua:

* ensin yksisivuinen MVP
* sitten methodology/sources-sivut
* myöhemmin explore- tai about-tyyppiset lisäsivut
* myöhemmin uusia datanäkymiä ja mahdollisesti uusia datalähteitä

---

# 4. Suositeltu tekninen rakenne

## 4.1 Sovellusrakenne

Suositeltu hakemistorakenne:

```txt
src/
  app/
    [locale]/
      layout.tsx
      page.tsx
      methodology/
        page.tsx
      sources/
        page.tsx
    globals.css

  components/
    layout/
    navigation/
    sections/
    charts/
    primitives/
    ui/

  features/
    pension/
      components/
      model/
      transforms/
      content/
      utils/

  lib/
    i18n/
    data/
    formatting/
    constants/
    utils/

  messages/
    en.json
    fi.json

  data/
    raw/
    processed/

  scripts/
    ingest/
    transform/

  types/
```

## 4.2 Rakenneperiaate

### `app/`

Sisältää reitit ja route-level layoutit.
Täällä ei pidä olla liiketoimintalogiikkaa tai raakaa datankäsittelyä.

### `components/`

Jaetut käyttöliittymäkomponentit:

* layout-rakenteet
* section wrapperit
* generiset chart shellit
* typografia- ja sisältökomponentit

### `features/pension/`

Projektin domain-alue. Tänne sijoitetaan kaikki eläkejärjestelmän sisältöön ja visualisointiin liittyvä logiikka:

* domain-mallit
* transform-funktiot
* feature-kohtaiset komponentit
* selittävät sisältörakenteet

### `lib/data/`

Datan lataamiseen, normalisointiin ja tiedostojen lukemiseen liittyvät työkalut.

### `lib/i18n/`

Kielten resolvointi, locale-konfiguraatio, mahdollinen routing-tuki ja viestien lataus.

### `messages/`

UI-tekstit ja käännökset.

### `data/raw/`

Sisään haettu, lähteestä saatu raakadata.

### `data/processed/`

UI:lle tai domain-kerrokselle siivottu ja vakioitu data.

### `scripts/`

Erilliset ingestion- ja transform-skriptit.
Näitä ei sekoiteta runtime-sovellukseen.

---

# 5. i18n-ratkaisun periaatteet

Koska kielituki lukitaan heti, i18n ei saa jäädä pintakorjaukseksi. Se on osa arkkitehtuuria.

## 5.1 Periaate

* reititys on locale-pohjainen
* englanti on oletuskieli
* suomi on rinnakkainen kieli
* kaikki käyttöliittymätekstit tulevat viestitiedostoista tai rakenteisesta sisältökerroksesta
* vältetään hardcodatut tekstit komponenteissa

## 5.2 Käytännön malli

Suositeltu rakenne:

* `/en/...`
* `/fi/...`

tai vaihtoehtoisesti locale-segmentti App Routerissa `[locale]`.

## 5.3 Mitä käännetään

Käännettäväksi suunnitellaan heti:

* navigation
* otsikot
* ingressit
* CTA:t
* methodology- ja source-tekstit
* chartien käyttöliittymätekstit
* empty/error-state-tekstit

## 5.4 Mitä ei pidä tehdä

* ei sekoiteta sisältötekstejä suoraan JSX:ään
* ei tehdä i18n:stä “lisätään myöhemmin” -tyyppistä kerrosta
* ei sidota domain-dataa liian tiukasti kielikohtaisiin esitysteksteihin

---

# 6. Data-arkkitehtuuri

Tämä on projektin yksi tärkeimmistä laatutekijöistä.

## 6.1 Tavoite

Datan kulku pitää olla yksiselitteinen:

```txt
external source
-> raw ingestion
-> schema validation
-> normalization
-> chart-specific transform
-> presentation layer
```

## 6.2 Kerrokset

### A. Ingestion layer

Hakee datan lähteestä ja tallentaa sen raakamuodossa.

Vastuu:

* tiedon lataus
* lähteen URL/rajapinta
* raakavasteen talteenotto
* perusvirheenkäsittely

Tulos:

* tiedostot `data/raw/`

### B. Validation layer

Tarkistaa, että data vastaa odotettua rakennetta.

Työkalu:

* Zod

Vastuu:

* skeemojen määrittely
* formaatin tarkistus
* poikkeamien varhainen tunnistaminen

### C. Normalization layer

Muuttaa lähdekohtaisen datan projektin sisäiseen domain-muotoon.

Esimerkki:

* lähteiden erilaiset sarakenimet tai aikamuodot yhtenäistetään
* numeroformaatit ja yksiköt vakioidaan

Tulos:

* yksi projektin sisäinen yhtenäinen data shape

### D. Transform layer

Tekee domain-datasta visualisointikohtaista dataa.

Esimerkki:

* time series chart model
* comparison cards model
* funding overview model

Tärkeä sääntö:

* visualisointikomponentti ei tee liiketoimintatason muunnoksia itse

## 6.3 Dataformaattien roolit

### Raw data

Säilytetään lähteen mukaisena mahdollisimman muuttumattomana.

### Processed data

Rakenteellisesti siivottua ja käyttöliittymäystävällistä.

### Chart data

Valmiiksi tietyn visualisoinnin tarpeeseen muotoiltua.

---

# 7. Domain-malli

Projektin domain kannattaa pitää pienenä mutta eksplisiittisenä.

## 7.1 Ensimmäiset ydinkäsitteet

* pension funding overview
* pension assets
* investment returns
* assets to GDP ratio
* source metadata
* methodology metadata

## 7.2 Domain-tyyppien suunta

Esimerkiksi:

```ts
type TimeSeriesPoint = {
  year: number
  value: number
  unit: 'eur' | 'percent'
}

type PensionAssetsSeries = {
  id: string
  label: string
  points: TimeSeriesPoint[]
  source: SourceReference
}

type SourceReference = {
  id: string
  name: string
  publisher: string
  url?: string
  retrievedAt?: string
}
```

Tämä ei tarkoita, että kaikki tyypit pitää lukita heti täydellisesti, mutta domain-sanaston pitää olla johdonmukainen alusta alkaen.

---

# 8. UI-arkkitehtuuri

## 8.1 Sisältörakenne etusivulla

MVP:n etusivu suositellaan rakentamaan seuraavista osioista:

1. **Hero**
2. **Funding overview**
3. **Signature visualization**
4. **Supporting visualizations**
5. **Methodology preview**
6. **Sources preview**

## 8.2 Roolit osioittain

### Hero

Tavoite:

* luoda vahva ensivaikutelma
* tehdä projektin aihe ymmärrettäväksi heti
* antaa tilaa yhdelle näyttävälle visualisointielementille tai tilastokohosteelle

### Funding overview

Tavoite:

* selittää järjestelmän rahoituksen peruslogiikka ilman liiallista tekstimassaa
* yhdistää lyhyt selitys + numerokortit + mahdollinen yksinkertainen rakennevisualisointi

### Signature visualization

Tavoite:

* toimia projektin visuaalisena ja teknisenä huippukohtana
* olla se näkymä, joka jää mieleen portfoliosta

### Supporting visualizations

Tavoite:

* syventää päätarinaa
* tarjota toinen ja kolmas näkökulma ilman dashboard-tunnelmaa

### Methodology preview

Tavoite:

* viestiä uskottavuudesta
* tehdä näkyväksi datan käsittelyn logiikka

### Sources preview

Tavoite:

* kertoa läpinäkyvästi, mistä data tulee
* tukea projektin luotettavuutta

---

# 9. Visualisointistrategia

## 9.1 Suositeltu MVP-jakauma

### Signature visual

* työeläkevarojen kehitys ajassa
* editorial-henkinen line/area-hybridivisual
* erittäin tarkasti viimeistelty typografia, spacing ja interaktiot

### Tukivisualit

* eläkevarat suhteessa BKT:hen
* sijoitustuotot tai sijoitusjakauma
* rahoituksen yleiskuvan yksinkertaistettu rakennevisualisointi

## 9.2 Interaktiivisuuden rajaus

Sallittu MVP:hen:

* hover state
* tooltip
* kevyt metric toggle
* kevyt locale-aware labeling
* mahdollinen animate-on-view

Ei MVP:hen oletuksena:

* raskaat filtteri- ja query-paneelit
* monimutkainen crossfiltering
* suuri client-side data explorer

## 9.3 Chart-komponenttien arkkitehtuuri

Suositus:

* generinen `ChartShell`
* dataspesifi chart-komponentti
* formatterit erillään
* tooltipit erillisinä, uudelleenkäytettävinä osina

Esimerkiksi:

```txt
components/charts/
  ChartShell.tsx
  ChartTitle.tsx
  MetricToggle.tsx
  ChartTooltip.tsx

features/pension/components/
  PensionAssetsChart.tsx
  FundingOverviewChart.tsx
  AssetsToGdpChart.tsx
```

---

# 10. Suorituskyky- ja laatulinjaukset

## 10.1 Performance

* suositaan server-rendered tai statically rendered sisältöä
* minimoidaan tarpeeton client-side state
* vältetään raskaita animoituja layout-muutoksia
* chartit ladataan kevyesti ja tarkoituksenmukaisesti
* ei tarpeettomia kirjastoja “varmuuden vuoksi”

## 10.2 Accessibility

* semanttinen rakenne
* kunnollinen heading hierarchy
* riittävä kontrasti
* näppäimistökäytettävyys niissä interaktioissa, joissa relevanttia
* tooltipit eivät saa olla ainoa tapa ymmärtää dataa
* locale-aware number/date formatting

## 10.3 Maintainability

* komponentit pidetään tarkoituksenmukaisina, ei liian geneerisinä liian aikaisin
* domain-sanasto pidetään johdonmukaisena
* kaikki raakadataan liittyvä logiikka keskitetään data- ja transform-kerrokseen

---

# 11. Reitit ja laajennettavuus

MVP toteutetaan etusivuvetoisesti, mutta nämä reitit huomioidaan heti arkkitehtuurissa:

* `/[locale]`
* `/[locale]/methodology`
* `/[locale]/sources`

Mahdollisia myöhempiä laajennuksia:

* `/[locale]/about`
* `/[locale]/explore`

Periaate:

* route-rakenne pitää olla valmis kasvamaan
* etusivua ei rakenneta niin, että kaikki tuleva logiikka jää siihen pysyvästi kiinni

---

# 12. Sisältöstrategia

## 12.1 Content source of truth

Sisällölle pitää olla selkeä lähde. Suositus:

* UI-tekstit viestitiedostoissa
* pidemmät sisältörakenteet joko viestitiedostoissa tai features/content-rakenteessa
* datalähdekuvaukset structured muodossa

## 12.2 Copy-periaatteet

* lyhyet, vahvat otsikot
* vaikea aihe tehdään ymmärrettäväksi
* vältetään instituutiokieltä, jota käyttäjä ei heti ymmärrä
* vältetään liian markkinointihenkistä sävyä
* sisältö tukee visualisointia, ei kilpaile sen kanssa

---

# 13. Cursor-ohjauksen toimintamalli

Tämä dokumentti toimii Cursorissa korkean tason runkona, mutta käytännön toteutus kannattaa jakaa hallittaviin agenttivaiheisiin.

## 13.1 Suositeltu työnjako Cursorille

### Vaihe 1: perustukset

Tavoite:

* pystyttää projekti
* asentaa stack
* ottaa käyttöön i18n-runko
* luoda hakemistorakenne
* lisätä peruslayout

### Vaihe 2: data pipeline

Tavoite:

* tuoda ensimmäinen datasetti
* määritellä skeemat
* kirjoittaa normalisointi
* kirjoittaa ensimmäinen processed output

### Vaihe 3: content + routing

Tavoite:

* locale-routing
* englanti/suomi viestit
* navigation
* methodology/sources stubit

### Vaihe 4: etusivun layout

Tavoite:

* hero
* section-rakenne
* editorial spacing
* typografia ja layout-järjestelmä

### Vaihe 5: visualisoinnit

Tavoite:

* signature chart
* tukichartit
* formatterit
* tooltipit
* responsiivisuus

### Vaihe 6: viimeistely

Tavoite:

* motion
* saavutettavuus
* source/methodology-integraatio
* cleanup
* refaktorointi

---

# 14. Cursorille annettavat pysyvät toteutusperiaatteet

Nämä kannattaa käytännössä toistaa Cursor-ohjauksessa projektin aikana.

## Ei-neuvoteltavat säännöt

* älä laita raakadataan liittyvää logiikkaa UI-komponentteihin
* älä kovakoodaa käyttöliittymätekstejä komponentteihin
* älä lisää uusia kirjastoja ilman selkeää syytä
* pidä client componenttien määrä minimissä
* tee datan validointi eksplisiittisesti
* pidä komponentit luettavina ja rajattuina
* rakenna MVP:tä varten, mutta älä tee umpikujaa lisäsivuille
* priorisoi luettavuus ja visuaalinen hierarkia
* animaatio saa tukea sisältöä, ei häiritä sitä

## Koodin laatuperiaatteet

* TypeScript tiukkana
* nimet johdonmukaisia
* formatterit erillään
* locale-aware formaatit keskitetysti
* ei “misc”- tai “helpers”-kaatoluokkia ilman tarkoitusta
* suositaan pieniä, selkeitä transform-funktioita

---

# 15. Ensimmäisen toteutusvaiheen konkreettinen tavoite

Ensimmäisen toteutusvaiheen deliverable ei ole “valmis sivu”, vaan:

**teknisesti oikea perusta**, jossa on:

* Next.js + TS + Tailwind + App Router
* locale-rakenne englannille ja suomelle
* peruslayout
* navigation
* methodology/sources-reitit
* data pipeline skeleton
* processed-data-malli ensimmäiselle datasetille

Tämä varmistaa, että visuaalinen työ ei ala huteralta pohjalta.

---

# 16. Toisen toteutusvaiheen tavoite

Toisen vaiheen deliverable on:

**etusivun ensimmäinen käyttökelpoinen versio**, jossa on:

* hero
* funding overview -osio
* yksi toimiva signature-visualisointi
* vähintään yksi tukivisualisointi
* EN/FI-kielenvaihto
* lähde- ja methodology-esikatselut

---

# 17. Riskit ja niiden hallinta

## Riski 1: aihe leviää liian laajaksi

Hallinta:

* pidetään päätarina tiukkana
* uusia datanäkymiä lisätään vasta kun ydinvisualisointi on hyvä

## Riski 2: i18n lisää liikaa monimutkaisuutta

Hallinta:

* kielituki tehdään rakenteellisesti oikein heti
* vältetään hybridiratkaisuja ja hardcodattuja tekstejä

## Riski 3: datalähteet eivät ole yhtenäisiä

Hallinta:

* yksi päälähde ensin
* täydentävä lähde vasta selkeällä tarpeella
* normalization layer pakollinen

## Riski 4: UI muuttuu dashboardiksi

Hallinta:

* editorial-rakenne pidetään tietoisena design-linjana
* vältetään liiallista widget-ajattelua

## Riski 5: Cursor lähtee liian geneeriseen toteutukseen

Hallinta:

* ohjaus tehdään vaihekohtaisina, tarkkarajaisina tehtävinä
* annetaan selkeät ei-neuvoteltavat periaatteet
* arvioidaan jokainen vaihe ennen seuraavaa

---

# 18. Definition of Done arkkitehtuuritasolla

Arkkitehtuurinen perusta on hyväksyttävä, kun:

* projektissa on selkeä locale-pohjainen reititys
* EN/FI-tekstit eivät ole hajallaan komponenteissa
* data pipeline on erotettu UI:sta
* ensimmäinen datasetti on validoitu ja transformoitu
* etusivun section-rakenne tukee editorial-lähestymistä
* chart-komponentit eivät tee raakamuunnoksia
* methodology ja sources mahtuvat luonnollisesti rakenteeseen
* projektia voi kasvattaa lisäsivuihin ilman rakenneuudistusta

---

# 19. Tiivis ohjaava yhteenveto Cursor-käyttöön

**Pension Project** toteutetaan monikielisenä Next.js-sovelluksena, jossa englanti on pääkieli ja suomi rinnakkainen kieli. Projekti on ensin yksisivuinen editorial-henkinen data story Suomen eläkejärjestelmän rahoituksesta ja työeläkevarojen kehityksestä. Arkkitehtuuri rakennetaan laajennettavaksi, mutta kevyeksi: data ingestion, validation, normalization ja chart-transform erotetaan UI:sta; käyttöliittymä käyttää vain prosessoitua dataa. Reititys tehdään locale-pohjaisena, methodology ja sources huomioidaan alusta asti, ja visualisointien painopiste on yhdessä erittäin laadukkaassa signature-chartissa sekä muutamassa tukevassa näkymässä. Tekninen toteutus on portfolio-first mutta production-minded: siisti, ymmärrettävä, performant ja visuaalisesti vahva.
