import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScrollSection from '../Components/ScrollSection'
import DynamicChart from '../Components/DynamicChart'
import Chatbot from '../chatbot'
import mockData from '../Data/mockReportData'
import { useVisibleSection } from '../Hooks/useVisibleSection'

const box = 'bg-white p-6 rounded-xl shadow-md w-full max-w-6xl mb-6 transition-all duration-500'

const sectionIds = [
  'Company Overview',
  'Leadership Vision',
  'Financial Performance',
  'ESG & Sustainability',
  'Stakeholder Impact',
  'Innovation & Strategic Outlook',
]

const sectionThemeMap: Record<string, string> = {
  'Company Overview': 'bg-indigo-100 text-gray-900',
  'Leadership Vision': 'bg-purple-100 text-gray-900',
  'Financial Performance': 'bg-green-100 text-gray-900',
  'ESG & Sustainability': 'bg-emerald-100 text-gray-900',
  'Stakeholder Impact': 'bg-orange-100 text-gray-900',
  'Innovation & Strategic Outlook': 'bg-sky-100 text-gray-900',
}

export default function ReportPage() {
  const [showChat, setShowChat] = useState(false)
  const currentSection = useVisibleSection(sectionIds)
  const theme = sectionThemeMap[currentSection] || 'bg-white text-gray-900'
  const navigate = useNavigate()

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-2 items-end">
        <button
          title="Go to Home"
          className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg"
          onClick={() => navigate('/')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        </button>

        {!showChat && (
          <button
            className="bg-[#7f5af0] hover:bg-[#6b46e5] text-white px-4 py-2 rounded-full shadow-lg"
            onClick={() => setShowChat(true)}
          >
            Chat
          </button>
        )}
      </div>

      {/* Slide-in Chatbot */}
      {showChat && (
        <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] z-50 transition-all">
          <Chatbot theme={theme} />
          <button
            onClick={() => setShowChat(false)}
            className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>
      )}

      {/* Scrollable Content */}
      <div
        className={`snap-y snap-mandatory h-full w-full overflow-y-scroll scroll-smooth transition-all duration-300 ${
          showChat ? 'sm:pr-[400px]' : ''
        }`}
      >
        {/* --- Section: Company Overview --- */}
        <ScrollSection id="Company Overview" title="Company Overview" backgroundColor="bg-indigo-100">
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

        {/* --- Section: Leadership Vision --- */}
        <ScrollSection id="Leadership Vision" title="Leadership Vision" backgroundColor="bg-purple-100">
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

        {/* --- Section: Financial Performance (1) --- */}
        <ScrollSection id="Financial Performance" title="Financial Performance" backgroundColor="bg-green-100">
          <div className="grid gap-6 md:grid-cols-2">
            <div className={box}>
              <DynamicChart
                type="bar"
                title="Revenue vs PAT (FY24)"
                labels={["Revenue", "PAT"]}
                values={[mockData.financials.revenue.FY24, mockData.financials.profitAfterTax.FY24]}
              />
              <p className="text-sm text-gray-700 mt-4 italic text-center">{mockData.financials.revenue.summary}</p>
            </div>
            <div className={box}>
              <DynamicChart
                type="bar"
                title="Total Income YoY"
                labels={["FY23", "FY24"]}
                values={[324771, 349633]}
              />
              <p className="text-sm text-gray-700 mt-4 italic text-center">Income rose 7.6% driven by global expansion.</p>
            </div>
          </div>
        </ScrollSection>

        {/* --- Section: Financial Performance (2) --- */}
        <ScrollSection id="Financial Performance" title="Financial Performance" backgroundColor="bg-green-100">
          <div className="grid gap-6 md:grid-cols-2">
            <div className={box}>
              <DynamicChart
                type="bar"
                title="Comprehensive Income"
                labels={["FY23", "FY24"]}
                values={[
                  mockData.financials.comprehensiveIncome.FY23,
                  mockData.financials.comprehensiveIncome.FY24,
                ]}
              />
              <p className="text-sm text-gray-700 mt-4 italic text-center">{mockData.financials.comprehensiveIncome.summary}</p>
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

        {/* --- Section: ESG & Sustainability --- */}
        <ScrollSection id="ESG & Sustainability" title="ESG & Sustainability" backgroundColor="bg-emerald-100">
          <div className="grid gap-6 md:grid-cols-2">
            <div className={box}>
              <DynamicChart
                type="pie"
                title="Environmental Metrics"
                labels={["Energy (GJ)", "Water (ML)", "Carbon Offset (tons)"]}
                values={[
                  mockData.esg.energyUsedGJ,
                  mockData.esg.waterUsedML,
                  mockData.esg.carbonOffsetTons,
                ]}
              />
            </div>
            <div className={box}>
              <p className="text-sm text-gray-700">{mockData.esg.summary}</p>
              <p className="text-sm text-gray-600 mt-2 italic">
                Waste Recycled: {mockData.esg.wasteRecycledPercent}%
              </p>
            </div>
          </div>
        </ScrollSection>

        {/* --- Section: Stakeholder Impact --- */}
        <ScrollSection id="Stakeholder Impact" title="Stakeholder Impact" backgroundColor="bg-orange-100">
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

        {/* --- Section: Innovation --- */}
        <ScrollSection id="Innovation & Strategic Outlook" title="Innovation & Strategic Outlook" backgroundColor="bg-sky-100">
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
      </div>
    </div>
  )
}
