'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

// Service data with 3-4 sentence main descriptions and subservice details
const mainServiceDescriptions: Record<number, { main: string; subDescriptions: string[] }> = {
  1: { 
    main: "Accurate financial records are the foundation of every successful business. We maintain complete books of accounts including ledgers, journals, and subsidiary records in compliance with applicable accounting standards. Our team prepares financial statements — Balance Sheet, Profit & Loss Account, and Cash Flow Statement — that give you a clear picture of your financial health. We also provide management accounting and MIS reports tailored to your decision-making needs.",
    subDescriptions: ['Maintaining comprehensive books of accounts with ledger management', 'Preparation of financial statements including Balance Sheet, P&L, and Cash Flow', 'Management accounting reports and MIS for strategic decisions']
  },
  2: { 
    main: "An independent audit provides credibility to your financial statements and builds trust with stakeholders, investors, and regulators. We conduct statutory audits under the Companies Act, tax audits under Section 44AB of the Income Tax Act, and internal audits that strengthen your internal control systems. Our forensic audit services help detect and investigate financial fraud, while our bank audits cover concurrent, stock, and branch audit assignments. Every audit engagement is conducted with objectivity, professional skepticism, and strict adherence to auditing standards.",
    subDescriptions: ['Statutory Audit under the Companies Act 2013', 'Tax Audit under Section 44AB of the Income Tax Act', 'Internal Audit for control systems strengthening', 'Forensic Audit and fraud investigation']
  },
  3: { 
    main: "Navigating India's complex tax landscape requires both deep technical knowledge and strategic foresight. We handle income tax return filing for individuals, partnership firms, LLPs, and companies while ensuring full compliance with the latest provisions. Our tax planning advisory helps you legally minimize your tax liability through careful structuring of income, investments, and business transactions. We also represent clients before tax authorities for assessments, scrutiny proceedings, and appeals before CIT(A) and ITAT.",
    subDescriptions: ['Income Tax return filing for all entities', 'Tax planning and advisory for liability optimization', 'TDS and TCS compliance management', 'Representation in tax assessments and appeals']
  },
  4: { 
    main: "Since its introduction in 2017, GST has fundamentally transformed indirect taxation in India and non-compliance carries significant financial and legal consequences. We manage end-to-end GST compliance including registration, monthly and quarterly return filing (GSTR-1, GSTR-3B, GSTR-9), and annual GST audit and reconciliation. Our team advises on GST applicability, rate classification, input tax credit optimization, and handles GST refund claims for exporters and inverted duty structure cases. We also represent clients in GST audits, scrutiny notices, and departmental proceedings.",
    subDescriptions: ['GST registration and ongoing compliance management', 'Monthly and quarterly return filing (GSTR-1, GSTR-3B, GSTR-9)', 'GST audit and annual reconciliation', 'GST refund claims and representation']
  },
  5: { 
    main: "Incorporating and operating a company in India involves ongoing compliance obligations that require expert guidance to navigate without penalties. We assist with the incorporation of Private Limited Companies, LLPs, One Person Companies, and Section 8 Companies, including preparation of MOA, AOA, and all MCA filings. Post-incorporation, we handle all ROC compliance including annual returns, board meeting documentation, statutory registers, and event-based filings under the Companies Act 2013. Our secretarial services ensure your company maintains full legal standing at all times.",
    subDescriptions: ['Company incorporation (Pvt Ltd, LLP, OPC) with full documentation', 'Ongoing ROC compliance and filing management', 'Annual returns and statutory register maintenance', 'MOA, AOA drafting and board resolutions']
  },
  6: { 
    main: "Sound financial planning is the difference between reactive decision-making and confident long-term growth. We provide personalized financial planning for individuals covering investments, insurance, retirement, and wealth structuring, as well as corporate financial advisory covering capital allocation, business valuation, and M&A support. Our project finance services include preparation of detailed feasibility reports and CMA data for bank financing, while our budgeting and forecasting work helps management track performance against financial targets. We help you align financial strategy with your business objectives.",
    subDescriptions: ['Personal financial planning and wealth management', 'Investment advisory and portfolio optimization', 'Business valuation and M&A advisory', 'Project finance and feasibility studies']
  },
  7: { 
    main: "Accessing the right financing at the right time is critical for business growth and working capital stability. We prepare comprehensive project reports and CMA (Credit Monitoring Arrangement) data that meet the detailed requirements of scheduled banks and NBFCs. Our team structures working capital facilities, term loans, and project finance proposals to maximize your chances of approval at competitive rates. We also liaise directly with bank officials and financial institutions on your behalf throughout the loan process.",
    subDescriptions: ['CMA data preparation to banking standards', 'Project reports for institutional lending', 'Working capital finance structuring', 'Bank liaison and loan negotiation']
  },
  8: { 
    main: "The Insolvency and Bankruptcy Code 2016 introduced a time-bound resolution mechanism that has transformed how financial distress is handled in India. We provide advisory services to corporate debtors, financial creditors, and operational creditors on their rights and obligations under the IBC framework. Our registered Insolvency Professionals can act as Interim Resolution Professionals or Resolution Professionals in Corporate Insolvency Resolution Processes (CIRP). We also advise on pre-packaged insolvency resolutions and voluntary liquidation proceedings for companies and LLPs.",
    subDescriptions: ['Advisory to debtors and creditors under IBC', 'Acting as Insolvency and Resolution Professional', 'Corporate restructuring and recovery proceedings', 'Voluntary liquidation and exit planning']
  },
  9: { 
    main: "Starting and scaling a business in India requires careful structuring, timely registrations, and strategic advisory at every stage. We advise founders on choosing the right business structure — private limited company, LLP, or partnership — based on their funding, liability, and tax goals. Our team handles Startup India recognition, MSME (Udyam) registration, DPIIT filings, and assists with drafting shareholder agreements, founders' agreements, and investor term sheets. We also conduct due diligence for mergers, acquisitions, and investment transactions.",
    subDescriptions: ['Business structure advisory and entity formation', 'Startup India and MSME registration', 'Shareholder and founders agreements', 'M&A due diligence and transaction support']
  },
  10: { 
    main: "Managing payroll accurately and staying compliant with India's labour laws is a complex, ongoing responsibility for every employer. We handle complete payroll processing including salary structuring, payslip generation, and full-and-final settlement calculations in a tax-efficient manner. Our compliance services cover monthly PF and ESIC filings, professional tax registration and payments, and labour welfare fund contributions across states. We also advise on compliance with the new Labour Codes and help employers align their HR policies with applicable statutory requirements.",
    subDescriptions: ['Salary structuring and payroll processing', 'PF, ESIC and Professional Tax compliance', 'Labour law advisory and policy alignment', 'Statutory reporting and state compliance']
  },
  11: { 
    main: "A wide range of official transactions — visa applications, bank loans, tenders, and legal proceedings — require certificates issued by a practicing Chartered Accountant. We issue net worth certificates, income certificates, turnover certificates, and solvency certificates that are accepted by embassies, banks, and courts across India. Our Form 15CB certification services facilitate outward remittances in compliance with Section 195 of the Income Tax Act, with proper characterization of payments and applicable DTAA provisions. We also provide project-specific certificates required by government departments, SEBI, and regulatory bodies.",
    subDescriptions: ['Net worth and solvency certificates', 'Income certificates for visa and loan applications', 'Turnover and business certificates', 'Form 15CB for remittance certification']
  },
  12: { 
    main: "Non-Resident Indians have unique tax obligations in India that arise from property income, capital gains, interest, dividends, and business income sourced from Indian territory. We determine your residential status under both the Income Tax Act and FEMA, which is the critical first step in understanding your Indian tax liability. Our team files NRI income tax returns, claims applicable deductions and exemptions, and advises on leveraging Double Taxation Avoidance Agreements (DTAA) to eliminate double taxation on the same income. We also advise on TDS implications for buyers of NRI property and assist NRIs in obtaining lower deduction certificates.",
    subDescriptions: ['Residential status determination for NRI taxation', 'Income Tax return filing for non-residents', 'DTAA benefits and double taxation avoidance', 'TDS optimization and lower deduction certificates']
  },
  13: { 
    main: "The Foreign Exchange Management Act governs all cross-border financial transactions by Indian residents and non-residents, and violations attract serious civil penalties. We advise individuals and businesses on the permissibility of specific foreign exchange transactions under the current account and capital account regulations. Our services include structuring fund repatriation from India, advising on NRE, NRO, and FCNR account operations, and filing compounding applications for past FEMA contraventions. We also prepare and file Annual Performance Reports and other FEMA compliance filings required by the RBI.",
    subDescriptions: ['FEMA transaction advisory and compliance', 'Foreign investment and fund repatriation structuring', 'NRE, NRO, FCNR account operations', 'FEMA filing and return submission']
  },
  14: { 
    main: "Every foreign direct investment into India and every outbound investment by an Indian entity triggers specific RBI reporting obligations that must be met within strict timelines. We handle FC-GPR and FC-TRS filings for inbound FDI transactions, Form ODI filings for overseas direct investments by Indian companies, and Form ECB filings for external commercial borrowings. Our team also prepares and files the Annual Return on Foreign Liabilities and Assets (FLA Return) which is mandatory for all companies that have received FDI or made ODI. Non-compliance with these filings attracts penalties under FEMA and can complicate future foreign transactions.",
    subDescriptions: ['FDI (Foreign Direct Investment) filings', 'ODI (Overseas Direct Investment) forms', 'ECB (External Commercial Borrowings)', 'Annual return on Foreign Liabilities and Assets']
  },
  15: { 
    main: "Transfer pricing regulations require that all international transactions between related parties be conducted at arm's length prices, failing which significant tax adjustments and penalties apply. We prepare comprehensive transfer pricing documentation including the Master File, Local File, and the mandatory Form 3CEB report that must be filed with the income tax return. Our economists and tax professionals determine the most appropriate transfer pricing method and benchmark transactions against comparable uncontrolled data. We also represent clients in transfer pricing assessments before the TPO and in appeals before the DRP and ITAT.",
    subDescriptions: ['Transfer Pricing documentation and Master File', 'Form 3CEB compliance and filing', 'Arm\'s Length Price determination and benchmarking', 'TP assessment defense and ITAT appeals']
  },
  16: { 
    main: "As Indian businesses expand globally and foreign companies invest in India, cross-border transactions create complex tax challenges that require specialized expertise. We advise on the tax-efficient structuring of outbound and inbound transactions, taking into account India's tax treaties with over 90 countries under the DTAA network. Our permanent establishment risk analysis helps multinational enterprises avoid inadvertently creating taxable presence in India or abroad. We also handle Form 15CA and 15CB certifications for all outward remittances and advise on BEPS-related compliance including Country-by-Country Reporting.",
    subDescriptions: ['Cross-border transaction structuring', 'DTAA advisory and treaty benefits', 'PE risk analysis for MNEs', 'Form 15CA/15CB and BEPS compliance']
  },
  17: { 
    main: "Indian residents holding foreign assets — bank accounts, immovable property, equity investments, or beneficial interests — must disclose them in Schedule FA of their income tax return every year without exception. Failure to disclose foreign assets attracts penalties of Rs. 10 lakhs per year per asset under the Black Money (Undisclosed Foreign Income and Assets) and Imposition of Tax Act 2015. We assist clients in correctly identifying reportable foreign assets, computing their value as per prescribed rules, and ensuring accurate Schedule FA disclosure in the ITR. We also advise on voluntary disclosure options and compliance strategies for clients with previously undisclosed foreign assets.",
    subDescriptions: ['Schedule FA (Foreign Assets) disclosure', 'Foreign bank account and property reporting', 'Black Money Act compliance', 'Voluntary disclosure and amnesty schemes']
  },
  18: { 
    main: "Structuring foreign investments correctly from the outset avoids costly restructuring later and ensures regulatory compliance across multiple jurisdictions. For inbound investments into India, we advise on sectoral FDI caps, eligible entry routes (automatic vs government approval), valuation requirements, and post-investment compliance obligations. For outbound investments by Indian companies and individuals, we structure overseas direct investments, advise on ODI limits and conditions, and assist in setting up wholly-owned subsidiaries, joint ventures, and liaison or project offices abroad. Our end-to-end advisory covers tax, FEMA, and corporate law dimensions of every cross-border investment decision.",
    subDescriptions: ['Inbound investment structuring and FDI routing', 'Outbound investment planning and ODI advisory', 'Setting up subsidiaries and joint ventures', 'Cross-border transaction and tax planning']
  }
}

// Service data with updated descriptions (2-line versions)
const allServices = [
  { id: 1, title: 'Accounting & Bookkeeping', description: 'Complete books of accounts, financial statements, and MIS reports. Ensuring accurate records for informed business decisions.', category: 'Core', subServices: ['Maintaining books of accounts', 'Preparation of financial statements (Balance Sheet, P&L, Cash Flow)', 'Management accounting and MIS reports'] },
  { id: 2, title: 'Auditing & Assurance', description: 'Statutory, tax, internal, forensic, and bank audits under one roof. Independent verification for compliance and credibility.', category: 'Core', subServices: ['Statutory Audit under Companies Act', 'Tax Audit under section 44AB', 'Internal Audit and Bank Audit', 'Forensic Audit and Cost Audit'] },
  { id: 3, title: 'Taxation Services', description: 'Income tax filing, planning, TDS compliance, and appeal handling. End-to-end tax management for individuals and businesses.', category: 'Core', subServices: ['Income Tax return filing', 'Tax planning and advisory', 'TDS/TCS compliance', 'Advance tax computation'] },
  { id: 4, title: 'GST Compliance', description: 'GST registration, return filing, audits, and refund claims. Full compliance with all GST regulations and advisories.', category: 'Core', subServices: ['GST registration and filing', 'Monthly/quarterly GSTR-1 and GSTR-3B filing', 'GST audit and reconciliation', 'GST refund claims'] },
  { id: 5, title: 'Corporate & Company Law', description: 'Company incorporation, ROC filings, and secretarial services. Complete corporate compliance under Companies Act 2013.', category: 'Core', subServices: ['Company incorporation (Pvt Ltd, LLP, OPC)', 'ROC compliances', 'Annual returns and forms filing', 'MOA, AOA, board resolutions'] },
  { id: 6, title: 'Financial Advisory & Planning', description: 'Investment advisory, business valuation, and feasibility reports. Strategic financial planning for growth and stability.', category: 'Core', subServices: ['Personal financial planning', 'Investment advisory', 'Business valuation', 'Project finance and feasibility'] },
  { id: 7, title: 'Loan & Fund Raising', description: 'CMA data, project reports, and working capital assistance. Expert liaison with banks and financial institutions.', category: 'Specialized', subServices: ['CMA data preparation', 'Project reports for bank loans', 'Working capital finance assistance', 'Bank liaison and coordination'] },
  { id: 8, title: 'Insolvency & Bankruptcy', description: 'IBC 2016 advisory, insolvency proceedings, and resolution support. Acting as Insolvency Professional for corporate restructuring.', category: 'Specialized', subServices: ['Acting as Insolvency Professional', 'Advisory under IBC 2016', 'Resolution and liquidation proceedings', 'Financial restructuring and recovery'] },
  { id: 9, title: 'Startup & Business Advisory', description: 'Startup India, MSME registration, and M&A due diligence. End-to-end advisory for new ventures and growing businesses.', category: 'Specialized', subServices: ['Business registration and structure advisory', 'Startup India registration', 'MSME registration', 'Partnership deeds and shareholder agreements'] },
  { id: 10, title: 'Payroll & Labour Law', description: 'Payroll processing, PF, ESIC, and professional tax compliance. Complete workforce financial compliance management.', category: 'Specialized', subServices: ['Salary structuring and payroll processing', 'PF, ESIC, and Professional Tax compliance', 'Labour law advisory', 'Statutory reporting and filings'] },
  { id: 11, title: 'Certification Services', description: 'Net worth, income, turnover, and Form 15CB certificates. Trusted certifications accepted by banks, courts, and embassies.', category: 'Specialized', subServices: ['Net worth certificates', 'Income certificates for visa and loans', 'Turnover certificates', 'Form 15CB (remittance certification)'] },
  { id: 12, title: 'NRI Taxation', description: 'NRI income tax returns, residential status advisory, and DTAA benefits. Complete tax compliance for non-resident Indians.', category: 'International', subServices: ['Income Tax filing for NRI', 'Residential status determination', 'Foreign asset reporting', 'FEMA compliance for NRI'] },
  { id: 13, title: 'FEMA Compliance', description: 'FEMA advisory, fund repatriation, and NRE/NRO account guidance. Full compliance with foreign exchange regulations.', category: 'International', subServices: ['Foreign investment regulation', 'Remittance and capital transfer', 'AD Code maintenance', 'FEMA return filings'] },
  { id: 14, title: 'RBI Filings & Compliances', description: 'FDI, ODI, ECB filings, and FLA annual return submissions. Complete RBI regulatory compliance for cross-border transactions.', category: 'International', subServices: ['FDI (Foreign Direct Investment) filings', 'ODI (Overseas Direct Investment) forms', 'ECB (External Commercial Borrowings)', 'Annual return on Foreign Liabilities'] },
  { id: 15, title: 'Transfer Pricing', description: 'International transaction documentation and Form 3CEB reports. Expert transfer pricing advisory and dispute handling.', category: 'International', subServices: ['TP documentation', 'Form 3CEB compliance', 'Arm\'s Length Price advisory', 'TP assessments and disputes'] },
  { id: 16, title: 'International Taxation', description: 'Cross-border tax structuring, PE analysis, and BEPS compliance. Form 15CA/15CB and withholding tax advisory.', category: 'International', subServices: ['Cross-border tax structuring', 'PE advisory', 'International tax compliance', 'Form 15CA/15CB withholding'] },
  { id: 17, title: 'Foreign Asset Reporting', description: 'ITR Schedule FA disclosure and Black Money Act compliance. Advisory on foreign asset reporting and disclosure schemes.', category: 'International', subServices: ['Schedule FA (Foreign Assets) reporting', 'Foreign bank account reporting', 'Foreign property and securities reporting', 'Penalty and prosecution protection'] },
  { id: 18, title: 'Inbound & Outbound Investment Advisory', description: 'FDI structuring, outbound investment planning, and JV setup. Strategic advisory for global investment decisions.', category: 'International', subServices: ['Inbound investment structuring (FDI routes)', 'Outbound investments by Indian companies', 'Setting up subsidiaries and JVs', 'Cross-border transaction advisory'] }
]

// SVG Illustrations for each service
function ServiceSVG({ serviceId }: { serviceId: number }) {
  const svgContent: Record<number, string> = {
    1: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="1.5" fill="none"><rect x="30" y="40" width="140" height="120" rx="2"/><line x1="60" y1="40" x2="60" y2="160"/><line x1="90" y1="40" x2="90" y2="160"/><line x1="120" y1="40" x2="120" y2="160"/><line x1="150" y1="40" x2="150" y2="160"/><line x1="30" y1="65" x2="170" y2="65"/><line x1="30" y1="90" x2="170" y2="90"/><line x1="30" y1="115" x2="170" y2="115"/><line x1="30" y1="140" x2="170" y2="140"/></g><text x="100" y="175" text-anchor="middle" font-size="12" fill="var(--foreground)">∑</text></svg>',
    2: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="2" fill="none"><circle cx="130" cy="80" r="45"/><line x1="90" y1="50" x2="160" y2="120" stroke-width="2.5"/></g><g stroke="var(--foreground)" stroke-width="1.5" fill="none"><rect x="40" y="50" width="70" height="80" rx="2"/><line x1="50" y1="65" x2="100" y2="65"/><line x1="50" y1="80" x2="100" y2="80"/><line x1="50" y1="95" x2="100" y2="95"/><line x1="50" y1="110" x2="100" y2="110"/></g></svg>',
    3: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="1.5" fill="none"><path d="M 40 150 L 40 50 L 90 20 L 140 50 L 140 150" stroke-width="2"/><line x1="70" y1="50" x2="70" y2="150"/><line x1="100" y1="50" x2="100" y2="150"/><circle cx="50" cy="80" r="6" fill="var(--foreground)"/><circle cx="80" cy="60" r="6" fill="var(--foreground)"/><circle cx="120" cy="90" r="6" fill="var(--foreground)"/></g></svg>',
    4: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="1.5" fill="none"><circle cx="60" cy="80" r="35"/><circle cx="100" cy="80" r="35"/><circle cx="140" cy="80" r="35"/><line x1="95" y1="80" x2="105" y2="80" stroke-width="2"/><line x1="135" y1="80" x2="145" y2="80" stroke-width="2"/><circle cx="60" cy="80" r="8" fill="var(--foreground)"/><circle cx="100" cy="80" r="8" fill="var(--foreground)"/><circle cx="140" cy="80" r="8" fill="var(--foreground)"/></g></svg>',
    5: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="2" fill="none"><path d="M 100 30 L 150 70 L 140 150 L 60 150 L 50 70 Z"/><line x1="100" y1="30" x2="100" y2="150"/><line x1="60" y1="150" x2="140" y2="150"/><rect x="80" y="80" width="40" height="40" rx="2"/></g></svg>',
    6: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="2" fill="none"><polyline points="40,140 80,80 120,100 160,40"/><circle cx="40" cy="140" r="5" fill="var(--foreground)"/><circle cx="80" cy="80" r="5" fill="var(--foreground)"/><circle cx="120" cy="100" r="5" fill="var(--foreground)"/><circle cx="160" cy="40" r="5" fill="var(--foreground)"/><line x1="30" y1="160" x2="170" y2="160" stroke-width="1.5"/></g></svg>',
    7: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="2" fill="none"><rect x="50" y="50" width="100" height="100" rx="3"/><rect x="65" y="65" width="20" height="15" fill="var(--foreground)"/><rect x="92" y="60" width="20" height="20" fill="var(--foreground)"/><rect x="119" y="55" width="20" height="25" fill="var(--foreground)"/></g></svg>',
    8: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="2" fill="none"><path d="M 70 80 L 100 120 L 130 80 Z"/><line x1="100" y1="50" x2="100" y2="120" stroke-width="1.5"/><line x1="70" y1="140" x2="130" y2="140" stroke-width="1.5"/><path d="M 70 150 L 75 160 L 130 160 L 125 150" fill="var(--border)"/></g></svg>',
    9: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="1.5" fill="none"><line x1="50" y1="160" x2="50" y2="60"/><line x1="50" y1="160" x2="150" y2="160"/><polyline points="60,140 80,100 100,120 120,60 140,100"/><circle cx="60" cy="140" r="3" fill="var(--foreground)"/><circle cx="80" cy="100" r="3" fill="var(--foreground)"/><circle cx="100" cy="120" r="3" fill="var(--foreground)"/><circle cx="120" cy="60" r="3" fill="var(--foreground)"/><circle cx="140" cy="100" r="3" fill="var(--foreground)"/></g></svg>',
    10: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="1.5" fill="none"><circle cx="50" cy="70" r="12"/><circle cx="100" cy="70" r="12"/><circle cx="150" cy="70" r="12"/><line x1="50" y1="85" x2="50" y2="110"/><line x1="100" y1="85" x2="100" y2="110"/><line x1="150" y1="85" x2="150" y2="110"/><line x1="35" y1="110" x2="65" y2="110" stroke-width="2"/><line x1="85" y1="110" x2="115" y2="110" stroke-width="2"/><line x1="135" y1="110" x2="165" y2="110" stroke-width="2"/></g></svg>',
    11: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="2" fill="none"><circle cx="100" cy="100" r="50" stroke-width="1.5"/><circle cx="100" cy="100" r="30"/><path d="M 100 50 L 100 80 M 60 100 L 80 100 M 140 100 L 160 100 M 100 120 L 100 150"/></g><circle cx="100" cy="100" r="12" fill="var(--foreground)"/></svg>',
    12: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="1.5" fill="none"><circle cx="100" cy="100" r="60" stroke-width="2"/><path d="M 100 50 Q 150 75 150 100 Q 150 145 100 160 Q 50 145 50 100 Q 50 75 100 50" stroke-width="1.5"/><line x1="100" y1="50" x2="100" y2="160" stroke-width="1"/></g></svg>',
    13: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="2" fill="none"><path d="M 50 150 L 80 60 L 120 60 L 150 150 Z"/><line x1="100" y1="60" x2="100" y2="150"/><line x1="70" y1="100" x2="130" y2="100"/></g><line x1="30" y1="155" x2="170" y2="155" stroke="var(--foreground)" stroke-width="1.5"/></svg>',
    14: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="2" fill="none"><polygon points="100,40 160,160 40,160" fill="none"/><circle cx="100" cy="90" r="15" fill="var(--foreground)"/><line x1="100" y1="110" x2="100" y2="140"/></g></svg>',
    15: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="1.5" fill="none"><rect x="50" y="60" width="100" height="80" rx="3"/><circle cx="65" cy="75" r="5" fill="var(--foreground)"/><circle cx="105" cy="75" r="5" fill="var(--foreground)"/><circle cx="145" cy="75" r="5" fill="var(--foreground)"/><line x1="60" y1="95" x2="140" y2="95"/><line x1="60" y1="115" x2="140" y2="115"/></g></svg>',
    16: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="2" fill="none"><circle cx="100" cy="100" r="55"/><circle cx="100" cy="100" r="45"/><path d="M 100 55 L 100 65 L 110 75 L 100 75 L 90 75 L 100 65 Z" fill="var(--foreground)"/><path d="M 145 100 Q 155 90 165 100" fill="none" stroke-width="1.5"/></g></svg>',
    17: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="1.5" fill="none"><rect x="45" y="50" width="110" height="100" rx="4"/><circle cx="60" cy="70" r="4" fill="var(--foreground)"/><circle cx="85" cy="70" r="4" fill="var(--foreground)"/><circle cx="110" cy="70" r="4" fill="var(--foreground)"/><circle cx="135" cy="70" r="4" fill="var(--foreground)"/><line x1="55" y1="90" x2="145" y2="90"/><line x1="55" y1="110" x2="145" y2="110"/></g></svg>',
    18: '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="200" height="200" fill="var(--muted)"/><g stroke="var(--foreground)" stroke-width="2" fill="none"><path d="M 60 80 L 100 50 L 140 80 L 140 150 L 60 150 Z"/><line x1="100" y1="50" x2="100" y2="150"/><line x1="60" y1="100" x2="140" y2="100"/><circle cx="100" cy="125" r="8" fill="var(--foreground)"/></g></svg>'
  }
  return <svg dangerouslySetInnerHTML={{ __html: svgContent[serviceId] || '' }} style={{ width: '100%', height: '100%' }} />
}

function ServiceCard({ service, onClick }: { service: typeof allServices[0]; onClick: () => void }) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="group relative rounded-2xl overflow-hidden cursor-pointer border border-border bg-card h-64 md:h-72 flex flex-col hover:border-foreground"
      whileHover={{ scale: 1.03 }}
      style={{ x: 0 }}
    >
      {/* Image Area (55%) */}
      <motion.div
        className="relative w-full h-[55%] overflow-hidden rounded-t-2xl filter transition-all duration-300 group-hover:brightness-[1.15]"
        style={{ backgroundColor: 'var(--muted)' }}
      >
        <ServiceSVG serviceId={service.id} />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ x: '-100%' }}
          whileHover={{ x: '100%' }}
          transition={{ duration: 0.6, ease: 'linear' }}
          style={{
            background: 'linear-gradient(90deg, transparent, var(--foreground) 15%, transparent)',
            opacity: 0.15
          }}
        />
      </motion.div>

      {/* Text Area (45%) */}
      <div className="p-3 md:p-4 flex flex-col justify-between h-[45%]">
        <div>
          <h3 className="font-semibold text-sm md:text-base text-foreground line-clamp-2 mb-2">{service.title}</h3>
          <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{service.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{service.category}</span>
          <motion.span animate={{ x: [0, 2, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-xs text-muted-foreground">→</motion.span>
        </div>
      </div>
    </motion.button>
  )
}

function DetailPanel({ service, onNext, onPrev, currentIndex, totalServices, onClose }: any) {
  const [phase, setPhase] = useState<'headingIn' | 'mainTyping' | 'mainFadeOut' | 'subservicesReveal' | 'done'>('headingIn')
  const [typedMain, setTypedMain] = useState('')
  const [typedSubDescriptions, setTypedSubDescriptions] = useState<Record<number, string>>({})
  const [expandedSubIndex, setExpandedSubIndex] = useState<number | null>(null)
  const [overviewVisible, setOverviewVisible] = useState(true)
  const [overviewHidden, setOverviewHidden] = useState(false)
  
  // Timer refs for all intervals and timeouts
  const mainTyperRef = useRef<NodeJS.Timeout | null>(null)
  const subDescTyperRef = useRef<NodeJS.Timeout | null>(null)
  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null)
  const overviewHideTimerRef = useRef<NodeJS.Timeout | null>(null)
  
  const serviceData = mainServiceDescriptions[service.id] || { main: service.description, subDescriptions: service.subServices }

  const resetAll = () => {
    if (mainTyperRef.current) clearInterval(mainTyperRef.current)
    if (subDescTyperRef.current) clearInterval(subDescTyperRef.current)
    if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current)
    if (overviewHideTimerRef.current) clearTimeout(overviewHideTimerRef.current)
    setPhase('headingIn')
    setTypedMain('')
    setTypedSubDescriptions({})
    setExpandedSubIndex(null)
    setOverviewVisible(true)
    setOverviewHidden(false)
  }

  // Phase 1: Heading animation (500ms) -> Phase 2
  useEffect(() => {
    if (phase === 'headingIn') {
      phaseTimerRef.current = setTimeout(() => {
        setPhase('mainTyping')
      }, 500)
    }
    return () => {
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current)
    }
  }, [phase])

  // Phase 2: Main description typewriter (8ms per char) -> wait 1200ms -> Phase 3
  useEffect(() => {
    if (phase === 'mainTyping') {
      let charIdx = 0
      mainTyperRef.current = setInterval(() => {
        if (charIdx < serviceData.main.length) {
          setTypedMain(serviceData.main.slice(0, ++charIdx))
        } else {
          if (mainTyperRef.current) clearInterval(mainTyperRef.current)
          phaseTimerRef.current = setTimeout(() => {
            setPhase('mainFadeOut')
          }, 1200)
        }
      }, 8)
    }
    return () => {
      if (mainTyperRef.current) clearInterval(mainTyperRef.current)
    }
  }, [phase, serviceData.main])

  // Phase 3: Main fade out (400ms) with onAnimationComplete -> Phase 4
  useEffect(() => {
    if (phase === 'mainFadeOut') {
      setOverviewVisible(false)
      // Phase will be set to subservicesReveal only after fade completes via onAnimationComplete callback
    }
    return () => {
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current)
    }
  }, [phase])

  // Phase 4: Subservices reveal - schedule overview to be hidden after 500ms
  useEffect(() => {
    if (phase === 'subservicesReveal') {
      overviewHideTimerRef.current = setTimeout(() => {
        setOverviewHidden(true)
      }, 500)
    }
    return () => {
      if (overviewHideTimerRef.current) clearTimeout(overviewHideTimerRef.current)
    }
  }, [phase])

  // Phase 5: Done - fade overview back in
  useEffect(() => {
    if (phase === 'done') {
      setOverviewVisible(true)
      setOverviewHidden(false)
    }
    return () => {
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current)
    }
  }, [phase])

  // Trigger subservicesReveal after all subservices have staggered in
  useEffect(() => {
    if (phase === 'subservicesReveal') {
      const totalSubServiceDuration = serviceData.subDescriptions.length * 120 + 600
      phaseTimerRef.current = setTimeout(() => {
        setPhase('done')
      }, totalSubServiceDuration)
    }
    return () => {
      if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current)
    }
  }, [phase, serviceData.subDescriptions.length])

  // Handle subservice expand/collapse with typewriter (8ms per character)
  const handleSubServiceClick = (idx: number) => {
    if (expandedSubIndex === idx) {
      setExpandedSubIndex(null)
      setTypedSubDescriptions(prev => {
        const updated = { ...prev }
        delete updated[idx]
        return updated
      })
      if (subDescTyperRef.current) clearInterval(subDescTyperRef.current)
    } else {
      setExpandedSubIndex(idx)
      setTypedSubDescriptions(prev => {
        const updated = { ...prev }
        updated[idx] = ''
        return updated
      })
      
      // Type out the description (8ms per character)
      const desc = serviceData.subDescriptions[idx] || ''
      let charIdx = 0
      if (subDescTyperRef.current) clearInterval(subDescTyperRef.current)
      
      subDescTyperRef.current = setInterval(() => {
        if (charIdx < desc.length) {
          setTypedSubDescriptions(prev => ({
            ...prev,
            [idx]: desc.slice(0, ++charIdx)
          }))
        } else {
          if (subDescTyperRef.current) clearInterval(subDescTyperRef.current)
        }
      }, 8)
    }
  }

  const handleSkip = () => {
    resetAll()
    setPhase('done')
    setTypedMain(serviceData.main)
    setOverviewVisible(true)
    setOverviewHidden(false)
    setExpandedSubIndex(null)
    setTypedSubDescriptions({})
  }

  useEffect(() => {
    return () => {
      resetAll()
    }
  }, [service.id])

  // Progress calculation: only reaches 100% at the end after all animations
  const progress = phase === 'done' ? 100 : phase === 'subservicesReveal' ? 80 : phase === 'mainFadeOut' ? 60 : phase === 'mainTyping' ? 40 : 20

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-background border border-border rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Progress Bar */}
        <div className="h-0.5 bg-border overflow-hidden">
          <motion.div
            className="h-full bg-foreground"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Header */}
        <div className="border-b border-border px-6 md:px-8 py-4 md:py-6 flex justify-between items-start">
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 18 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground font-poppins">{service.title}</h2>
            <div className="flex items-center gap-2 mt-2">
              <p className="text-xs md:text-sm text-muted-foreground">{service.category}</p>
              <div className="w-px h-4 bg-border" />
              <p className="text-xs text-muted-foreground">{serviceData.subDescriptions.length} services included</p>
            </div>
          </motion.div>
          <button onClick={onClose} className="p-2 hover:bg-foreground/5 rounded transition-colors flex-shrink-0">
            <X size={20} className="text-foreground/60" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-[40%_60%]">
          {/* Left Panel - Image */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 90, damping: 20, duration: 0.5 }}
            className="hidden md:flex items-center justify-center min-h-96 rounded-l-2xl overflow-hidden"
            style={{ backgroundColor: 'var(--muted)' }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="w-full h-full flex items-center justify-center"
            >
              <ServiceSVG serviceId={service.id} />
            </motion.div>
          </motion.div>

          {/* Right Panel - Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="overflow-y-auto p-5 md:p-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border"
          >
            {/* OVERVIEW Section - Fades out completely and is removed from layout */}
            <AnimatePresence mode="wait">
              {!overviewHidden && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 1, height: 'auto' }}
                  animate={{ opacity: overviewVisible ? 1 : 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  onAnimationComplete={() => {
                    // Only transition to subservicesReveal after fade-out completes
                    if (phase === 'mainFadeOut' && !overviewVisible) {
                      setPhase('subservicesReveal')
                    }
                  }}
                  className="mb-6 overflow-hidden"
                >
                  <p className="text-xs md:text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3">Overview</p>
                  <p className="text-sm md:text-base text-foreground/80 leading-relaxed font-sans">
                    {phase === 'done' ? serviceData.main : typedMain}
                    {phase !== 'done' && typedMain.length < serviceData.main.length && <span className="animate-pulse">|</span>}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Services Breakdown - Clean fade in and slide up after OVERVIEW is removed */}
            <AnimatePresence>
              {(phase === 'subservicesReveal' || phase === 'done') && (
                <motion.div
                  key="services"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <p className="text-xs md:text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">
                    Services Included ({serviceData.subDescriptions.length})
                  </p>
                  
                  <div className="space-y-2 mb-8">
                    {serviceData.subDescriptions.map((desc, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => handleSubServiceClick(idx)}
                        className="w-full group relative flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer"
                        style={{
                          backgroundColor: expandedSubIndex === idx ? 'var(--card)' : 'transparent',
                          border: expandedSubIndex === idx ? '1px solid var(--border)' : '1px solid var(--border)',
                        }}
                        whileHover={{ backgroundColor: 'var(--card)', scale: 1.02 }}
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-foreground/10 text-foreground flex items-center justify-center text-xs font-semibold">
                          {idx + 1}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-semibold text-foreground">{service.subServices[idx]}</p>
                          <AnimatePresence>
                            {expandedSubIndex === idx && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.35 }}
                                className="overflow-hidden mt-2"
                              >
                                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed pl-8 border-l border-border font-sans">
                                  {typedSubDescriptions[idx] || ''}
                                  {typedSubDescriptions[idx] && typedSubDescriptions[idx].length < (serviceData.subDescriptions[idx] || '').length && (
                                    <span className="animate-pulse">|</span>
                                  )}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <motion.div
                          animate={{ rotate: expandedSubIndex === idx ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0 text-muted-foreground group-hover:text-foreground"
                        >
                          +
                        </motion.div>
                      </motion.button>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ y: 15, opacity: 0, scale: 0.95 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                  >
                    <Link
                      href="/contact"
                      className="inline-block px-6 py-3 bg-foreground text-background rounded-lg text-sm font-semibold hover:bg-foreground/90 transition-all hover:shadow-lg"
                    >
                      Get This Service
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 md:px-8 py-3 md:py-4 flex justify-between items-center gap-4 flex-wrap text-sm">
          <button onClick={handleSkip} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Skip Animation
          </button>
          <span className="text-xs text-foreground/50">{currentIndex + 1} of {totalServices}</span>
          <div className="flex gap-2">
            <button onClick={onPrev} className="p-2 hover:bg-foreground/5 rounded transition-colors">
              <ChevronLeft size={18} className="text-foreground/60" />
            </button>
            <button onClick={onNext} className="p-2 hover:bg-foreground/5 rounded transition-colors">
              <ChevronRight size={18} className="text-foreground/60" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ServicesContent() {
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<'All' | 'Core' | 'Specialized' | 'International'>('All')

  const selectedService = allServices.find(s => s.id === selectedServiceId)
  const currentIndex = allServices.findIndex(s => s.id === selectedServiceId)

  const filteredServices = allServices.filter(s => {
    if (activeFilter === 'All') return true
    if (activeFilter === 'Core') return s.category === 'Core'
    if (activeFilter === 'Specialized') return s.category === 'Specialized'
    return s.category === 'International'
  })

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % allServices.length
    setSelectedServiceId(allServices[nextIdx].id)
  }

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + allServices.length) % allServices.length
    setSelectedServiceId(allServices[prevIdx].id)
  }

  return (
    <>
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">Our Services</h1>
            <p className="text-base md:text-lg text-foreground/60 max-w-2xl">Comprehensive financial solutions spanning accounting, taxation, compliance, and international advisory.</p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
            {(['All', 'Core', 'Specialized', 'International'] as const).map(filter => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                animate={{
                  backgroundColor: activeFilter === filter ? 'var(--foreground)' : 'var(--card)',
                  color: activeFilter === filter ? 'var(--background)' : 'var(--foreground)',
                  borderColor: activeFilter === filter ? 'var(--foreground)' : 'var(--border)',
                }}
                transition={{ duration: 0.25 }}
                className="px-4 py-2 border rounded-full text-xs md:text-sm font-semibold hover:border-foreground transition-colors"
              >
                {filter}
              </motion.button>
            ))}
          </div>

          {/* Services Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.07,
                  delayChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} onClick={() => setSelectedServiceId(service.id)} />
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedService && (
          <DetailPanel
            service={selectedService}
            onNext={handleNext}
            onPrev={handlePrev}
            currentIndex={currentIndex}
            totalServices={allServices.length}
            onClose={() => setSelectedServiceId(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
