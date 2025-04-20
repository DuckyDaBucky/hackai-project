export let mockData = {
  companyOverview: {
    description:
      "LTIMindtree is a global technology consulting and digital solutions company with 81,000+ employees, operating across 38 countries, and boasting a diverse and unified culture. The company emerged from a merger of equals to drive transformation at scale for global clients.",
    employees: "81,000+",
    countriesPresent: "38",
    exportsPercent: "94%",
  },

  leadership: {
    chairmanQuote:
      "“Our future is limitless. We shape a sustainable tomorrow.”",
    ceoQuote:
      "“We pioneer digital transformation with compassion and capability.”",
    partnerships: ["AWS", "Microsoft", "Google", "Oracle", "ServiceNow"],
  },

  financials: {
    revenue: {
      FY24: 355170,
      FY23: 331490,
      summary:
        "7% YoY growth driven by strong digital transformation demand and robust delivery efficiency.",
    },
    profitAfterTax: {
      FY24: 45846,
      FY23: 44000,
    },
    comprehensiveIncome: {
      FY24: 42000,
      FY23: 39000,
      summary:
        "Steady increase attributed to cost optimization and service line expansion.",
    },
    returnOnEquity: "25.0%",
    barChartData: [
      { label: "Revenue", FY23: 331490, FY24: 355170 },
      { label: "PAT", FY23: 44000, FY24: 45846 },
      { label: "Total Income", FY23: 324771, FY24: 349633 },
    ],
  },

  capitalStructure: {
    summary:
      "LTIMindtree maintains a multi-capital strategy with INR 200,264M net worth, INR 115,596M cash & investments, and diversified capital exposure across financial, intellectual, and human assets.",
  },

  esg: {
    energyUsedGJ: 198654,
    waterUsedML: 333.724,
    carbonOffsetTons: 1200,
    wasteRecycledPercent: 92.14,
    summary:
      "Significant reduction in environmental impact through water-saving strategies, green buildings, and investment in carbon offset projects.",
  },

  stakeholderImpact: {
    summary:
      "Clients rated satisfaction at 5.85/6. LTIMindtree impacted 598,698 lives in FY24 through CSR, and invested ₹807M toward community and sustainability programs.",
    customerSatisfaction: 5.85,
    employeeLearningHours: 4.37,
    activeClients: 738,
  },

  innovation: {
    summary:
      "Focused innovation across AI, cloud, analytics, and cybersecurity with $208B market in cybersecurity and $678B in public cloud spending in 2024. Strategic alliances accelerated go-to-market capabilities.",
    strategicAlliances: [
      "Snowflake",
      "AWS",
      "ServiceNow",
      "Google Cloud",
      "Microsoft",
    ],
    patents: 20,
    platforms: ["Fosfor", "Infinity", "Canvas", "NXT"],
  },
};

export default mockData;
