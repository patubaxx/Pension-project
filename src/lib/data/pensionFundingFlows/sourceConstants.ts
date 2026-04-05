/**
 * Pension funding flows — Eläketurvakeskus (ETK) PxWeb API.
 *
 * Table: Työeläkejärjestelmän eläkevarat ja rahavirrat, milj. euroa
 * Combined institutions: "Laitokset yhteensä" (code 399).
 *
 * API discovery: GET https://tilastot.etk.fi/api/v1/fi/ETK/180tyoelakkeiden_rahoitus/10rahavirrat
 * Metadata / POST target: .../rahavirrat01_kaikki.px
 *
 * Methodology (Finnish): https://www.etk.fi/tutkimus-tilastot-ja-ennusteet/tilastot/tyoelakkeiden-rahoitus/tyoelakejarjestelman-elakevarat-ja-rahavirrat/
 * PxWeb UI: https://tilastot.etk.fi/pxweb/fi/ETK/ETK__180tyoelakkeiden_rahoitus__10rahavirrat/rahavirrat01_kaikki.px/
 */
export const ETK_PENSION_FUNDING_FLOWS = {
  /** Relative to https://tilastot.etk.fi/api/v1/fi/ETK/ */
  apiTablePath:
    "180tyoelakkeiden_rahoitus/10rahavirrat/rahavirrat01_kaikki.px",
  pxTableId: "rahavirrat01_kaikki",
  providerEn: "Finnish Centre for Pensions (ETK)",
  providerFi: "Eläketurvakeskus",
  datasetTitleEn:
    "Earnings-related pension system: pension assets and funding flows, million EUR",
  datasetTitleFi:
    "Työeläkejärjestelmän eläkevarat ja rahavirrat, milj. euroa",
  documentationUrl:
    "https://www.etk.fi/tutkimus-tilastot-ja-ennusteet/tilastot/tyoelakkeiden-rahoitus/tyoelakejarjestelman-elakevarat-ja-rahavirrat/",
  dataPortalUrl:
    "https://tilastot.etk.fi/pxweb/fi/ETK/ETK__180tyoelakkeiden_rahoitus__10rahavirrat/rahavirrat01_kaikki.px/",
  seriesDefinitionEn:
    "ETK rahavirrat01_kaikki: all earnings-related pension institutions combined (code 399), annual flow lines (Rahavirta) in million EUR, current prices.",
} as const;

/** POST body uses this institution filter for a single national series. */
export const INSTITUTION_COMBINED_CODE = "399" as const;

export const RAW_FILENAME = "etk-rahavirrat01-kaikki-funding-flows.json";

export const PROCESSED_FILENAME = "pension-funding-flows-finland.json";
