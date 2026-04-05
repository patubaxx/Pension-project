/**
 * Phase 2 primary dataset — Statistics Finland national financial accounts.
 *
 * ETK is the domain authority for pensions narrative; the official time series for
 * employment-pension-sector financial asset stocks is published in national
 * accounts (RTP) by Statistics Finland, using ESA 2010 sector S13141.
 *
 * PxWeb table: Financial assets and liabilities, annually (11qp)
 * Selection: sector S13141 Employment pension schemes, instrument F0 total
 * financial assets, stocks (million EUR), debtor sector total (S0).
 *
 * API: https://pxdata.stat.fi/PXWeb/api/v1/en/StatFin/statfin_rtp_pxt_11qp.px
 * Documentation: https://stat.fi/en/statistics/rtp
 */
export const STATFIN_PENSION_ASSETS = {
  pxTableId: "statfin_rtp_pxt_11qp",
  pxTablePath: "/StatFin/statfin_rtp_pxt_11qp.px",
  providerEn: "Statistics Finland",
  providerFi: "Tilastokeskus",
  datasetTitleEn:
    "Financial assets and liabilities, annually (employment pension schemes)",
  documentationUrl: "https://stat.fi/en/statistics/rtp",
  pxWebUiUrl:
    "https://pxdata.stat.fi/PXWeb/pxweb/en/StatFin/rtp/statfin_rtp_pxt_11qp.px/",
  seriesDefinitionEn:
    "Sector S13141 (Employment pension schemes), instrument F0 (Financial assets total), stock positions, million euros.",
} as const;

export const RAW_FILENAME = "statfin-rtp-11qp-pension-assets.json";
export const PROCESSED_FILENAME = "pension-assets-finland.json";
