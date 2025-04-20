const mockReportData = {
  companyOverview: {
    name: "LTIMindtree",
    founded: "2022",
    employees: "81,000+",
    headquarters: "Mumbai, India",
    countriesPresent: 37,
    exportsPercent: "94%",
    description: `LTIMindtree is a global technology consulting and digital solutions company that enables enterprises across industries to reimagine business models, accelerate innovation, and maximize growth by harnessing digital technologies.`,
  },

  leadership: {
    chairmanQuote:
      "Our future is limitless. We are shaping a sustainable tomorrow through technology and purpose.",
    ceoQuote:
      "Together, we are pioneering digital transformation with compassion, creativity, and capability.",
    partnerships: ["AWS", "Google", "SAP", "Databricks", "HPE"],
  },

  financials: {
    revenue: {
      FY23: 319755,
      FY24: 342534,
      summary: "Revenue increased due to strong growth across BFSI, manufacturing, and energy verticals along with international expansion."
    },
    profitAfterTax: {
      FY23: 42482,
      FY24: 44859,
      summary: "Net profit grew modestly, supported by improved operational efficiency and margin optimization despite inflationary pressures."
    },
    comprehensiveIncome: {
      FY23: 35648,
      FY24: 49708,
      summary: "A significant boost from investment income and one-time strategic gains contributed to higher comprehensive income."
    },
    returnOnEquity: "25%",
    basicEPS: "₹151.60",
    barChartData: [
      { label: "Revenue", FY23: 319755, FY24: 342534 },
      { label: "PAT", FY23: 42482, FY24: 44859 },
      { label: "Total Income", FY23: 324771, FY24: 349633 }
    ],
  },

  capitalStructure: {
    netWorth: 200264,
    cashInvestments: 115596,
    rAndD: 746,
    greenCapex: 3081,
    patents: 2,
    summary: "The company's strong net worth and cash reserves reflect capital discipline, while strategic investments in R&D and green infra demonstrate futureproofing."
  },

  esg: {
    energyUsedGJ: 198654,
    waterUsedML: 333.7,
    wasteRecycledPercent: 92.14,
    carbonOffsetTons: 1200,
    csrSpend: 807,
    livesImpactedFY24: 598698,
    livesImpactedTotal: "1.59M+",
    summary: "Sustainability gains were driven by campus-wide waste initiatives, targeted CSR partnerships, and an ongoing shift to renewable sources."
  },

  stakeholderImpact: {
    employees: 81000,
    suppliers: 6700,
    boardAttendance: "98%",
    boardMedianAge: 64,
    academicPartners: true,
    summary: "High engagement and transparency across all stakeholder groups reinforced LTIMindtree’s reputation for inclusive, ethical operations."
  },

  innovation: {
    focusAreas: [
      "Adaptive AI",
      "GenAI",
      "Cloud-native platforms",
      "Cybersecurity",
      "Edge Computing",
      "Zero Trust Security"
    ],
    externalMarketGrowth: {
      cybersecurity: "USD 183B (2024)",
      cloud: "USD 678.8B (2024)",
      esgTech: "USD 19.8B → 83.6B by 2032"
    },
    summary: "Strategic focus on scalable tech like GenAI and Zero Trust frameworks reflects market demand and positions LTIMindtree for hypergrowth."
  }
}

export default mockReportData
