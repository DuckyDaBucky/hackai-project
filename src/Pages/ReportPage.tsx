import MainLayout from '../Layouts/MainLayout'
import ScrollSection from '../Components/ScrollSection'
import Sidebar from '../Components/Sidebar'
import Chatbot from '../Components/Chatbot'
import { motion } from 'framer-motion'
import DynamicChart from '../Components/DynamicChart'
import mockData from '../Data/mockReportData'

const box = 'bg-white p-6 rounded-xl shadow-md w-full max-w-6xl mb-6 transition-all duration-500'

export default function ReportPage() {
  return (
    <>
      { <Sidebar /> }
      <Chatbot />
      <div className="min-h-screen font-sans">
        <main className="mt-24 px-6">
          {/* Company Overview */}
          <ScrollSection title="Company Overview" backgroundColor="bg-indigo-100" linger>
            <div className="grid gap-6 md:grid-cols-2">
              <div className={box}>
                <p>{mockData.companyOverview.description}</p>
              </div>
              <div className={box}>
                <p>Employees FY24: {mockData.companyOverview.employees} (↑ 5.2% from FY23)</p>
                <p>Countries Present: {mockData.companyOverview.countriesPresent} (↑ 2 countries YoY)</p>
              </div>
            </div>
          </ScrollSection>

          {/* Leadership Vision */}
          <ScrollSection title="Leadership Vision" backgroundColor="bg-purple-100">
            <div className="grid gap-6 md:grid-cols-2">
              <div className={box}>
                <p>{mockData.leadership.chairmanQuote}</p>
                <p className="text-sm text-gray-500 italic mt-2">– Chairman</p>
              </div>
              <div className={box}>
                <p>{mockData.leadership.ceoQuote}</p>
                <p className="text-sm text-gray-500 italic mt-2">– CEO</p>
              </div>
            </div>
          </ScrollSection>

          {/* Financial Performance (1) */}
          <ScrollSection title="Financial Performance" backgroundColor="bg-green-100" linger>
            <div className="grid gap-6 md:grid-cols-2">
              <div className={box}>
                <DynamicChart
                  type="bar"
                  title="Revenue vs PAT (FY24)"
                  labels={["Revenue", "PAT"]}
                  values={[mockData.financials.revenue.FY24, mockData.financials.profitAfterTax.FY24]}
                />
                <p className="text-sm text-gray-700 mt-4 italic text-center">
                  {mockData.financials.revenue.summary}
                </p>
              </div>
              <div className={box}>
                <DynamicChart
                  type="bar"
                  title="Total Income YoY"
                  labels={["FY23", "FY24"]}
                  values={[324771, 349633]}
                />
                <p className="text-sm text-gray-700 mt-4 italic text-center">
                  Income rose 7.6% driven by global client delivery expansion.
                </p>
              </div>
            </div>
          </ScrollSection>

          {/* Financial Performance (2) */}
          <ScrollSection title="Financial Performance" backgroundColor="bg-green-100">
            <div className="grid gap-6 md:grid-cols-2">
              <div className={box}>
                <DynamicChart
                  type="bar"
                  title="Comprehensive Income"
                  labels={["FY23", "FY24"]}
                  values={[
                    mockData.financials.comprehensiveIncome.FY23,
                    mockData.financials.comprehensiveIncome.FY24
                  ]}
                />
                <p className="text-sm text-gray-700 mt-4 italic text-center">
                  {mockData.financials.comprehensiveIncome.summary}
                </p>
              </div>
              <div className={box}>
                <DynamicChart
                  type="pie"
                  title="Revenue Mix"
                  labels={["Exports", "Domestic"]}
                  values={[94, 6]}
                />
                <p className="text-sm text-gray-700 mt-4 italic text-center">
                  Export revenue dominated at 94% across 37 countries.
                </p>
              </div>
            </div>
          </ScrollSection>

          {/* ESG & Sustainability */}
          <ScrollSection title="ESG & Sustainability" backgroundColor="bg-emerald-100" linger>
            <div className="grid gap-6 md:grid-cols-2">
              <div className={box}>
                <DynamicChart
                  type="pie"
                  title="Environmental Metrics"
                  labels={["Energy (GJ)", "Water (ML)", "Carbon Offset (tons)"]}
                  values={[
                    mockData.esg.energyUsedGJ,
                    mockData.esg.waterUsedML,
                    mockData.esg.carbonOffsetTons
                  ]}
                />
              </div>
              <div className={box}>
                <p className="text-sm text-gray-700">
                  {mockData.esg.summary}
                </p>
                <p className="text-sm text-gray-600 mt-2 italic">Waste Recycled: {mockData.esg.wasteRecycledPercent}%</p>
              </div>
            </div>
          </ScrollSection>

          {/* Stakeholder Impact */}
          <ScrollSection title="Stakeholder Impact" backgroundColor="bg-orange-100">
            <div className="grid gap-6 md:grid-cols-2">
              <div className={box}>
                <p>{mockData.stakeholderImpact.summary}</p>
                <p className="mt-2">Active Clients: {mockData.stakeholderImpact.activeClients}</p>
              </div>
              <div className={box}>
                <p>Client Satisfaction: {mockData.stakeholderImpact.customerSatisfaction} / 6</p>
                <p>Employee Learning Hours: {mockData.stakeholderImpact.employeeLearningHours} hrs avg</p>
              </div>
            </div>
          </ScrollSection>

          {/* Innovation & Strategy */}
          <ScrollSection title="Innovation & Strategic Outlook" backgroundColor="bg-sky-100" linger>
            <div className="grid gap-6 md:grid-cols-2">
              <div className={box}>
                <DynamicChart
                  type="bar"
                  title="Market Opportunities"
                  labels={["Cybersecurity", "Cloud", "ESG Tech"]}
                  values={[208, 678.8, 83.6]}
                />
              </div>
              <div className={box}>
                <p>{mockData.innovation.summary}</p>
                <p className="mt-2">Patents Filed: {mockData.innovation.patents}</p>
              </div>
            </div>
          </ScrollSection>
        </main>
      </div>
    </>
  )
}
