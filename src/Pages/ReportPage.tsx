import MainLayout from '../Layouts/MainLayout'
import ScrollSection from '../Components/ScrollSection'
import Sidebar from '../Components/Sidebar'
import Chatbot from '../Components/Chatbot'
import { motion } from 'framer-motion'
import DynamicChart from '../Components/DynamicChart'
import MultiChartSlider from '../Components/MultiChartSlider'
import ContentSlider from '../Components/ContentSlider'
import mockData from '../Data/mockReportData'

const box = 'bg-white p-6 rounded-xl shadow-md w-full max-w-4xl mb-6 transition-all duration-500'

export default function ReportPage() {
  return (
    <>
      <Sidebar />
      <Chatbot />
      <MainLayout>

        {/* 1. Company Overview */}
        <ScrollSection title="Company Overview" backgroundColor="bg-indigo-100" linger>
          <ContentSlider
            key="company-overview-slider"
            slides={[
              {
                content: (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className={box}>
                      <p>“We are not just building solutions — we are shaping ecosystems.”</p>
                      <p className="text-sm text-gray-500 mt-2 italic">– Internal culture doc</p>
                    </div>
                    <div className={box}>
                      <p>Total Employees: {mockData.companyOverview.employees}</p>
                      <p>Countries Present: {mockData.companyOverview.countriesPresent}</p>
                    </div>
                  </div>
                ),
              },
              {
                content: (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className={box}>
                      <p>“Every interaction should drive innovation, not just efficiency.”</p>
                      <p className="text-sm text-gray-500 mt-2 italic">– Company Value Charter</p>
                    </div>
                    <div className={box}>
                      <p>Export Revenue: {mockData.companyOverview.exportsPercent}</p>
                      <p>Global Offices: 39 (India), 77 (Int’l)</p>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </ScrollSection>

        {/* 2. Leadership Vision */}
        <ScrollSection title="Leadership Vision" backgroundColor="bg-purple-100">
          <ContentSlider
            key="leadership-slider"
            slides={[
              {
                content: (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className={box}>
                      <p>{mockData.leadership.chairmanQuote}</p>
                      <p className="text-sm text-gray-500 mt-2 italic">– Chairman</p>
                    </div>
                    <div className={box}>
                      <p>Key Partner: {mockData.leadership.partnerships[0]}</p>
                      <p>Focus: Sustainable global leadership</p>
                    </div>
                  </div>
                ),
              },
              {
                content: (
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className={box}>
                      <p>{mockData.leadership.ceoQuote}</p>
                      <p className="text-sm text-gray-500 mt-2 italic">– CEO</p>
                    </div>
                    <div className={box}>
                      <p>Key Technologies: {mockData.leadership.partnerships.slice(1).join(', ')}</p>
                      <p>Vision: Transform industries with compassion + AI</p>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </ScrollSection>

        {/* 3. Financial Performance */}
        <ScrollSection title="Financial Performance" backgroundColor="bg-green-100" linger>
          <motion.div className={`${box} space-y-4`}>
            <p>
              FY24 Revenue: {mockData.financials.revenue.FY24.toLocaleString()} |
              Net Profit: {mockData.financials.profitAfterTax.FY24.toLocaleString()}
            </p>
            <p>ROE: {mockData.financials.returnOnEquity}</p>
          </motion.div>

          <MultiChartSlider
            key="financial-slider"
            groups={[
              {
                charts: [
                  {
                    type: 'bar',
                    title: 'Revenue & PAT (FY24)',
                    labels: ['Revenue', 'PAT'],
                    values: [
                      mockData.financials.revenue.FY24,
                      mockData.financials.profitAfterTax.FY24,
                    ],
                    summary: mockData.financials.revenue.summary,
                  },
                  {
                    type: 'bar',
                    title: 'Total Income YoY',
                    labels: ['FY23', 'FY24'],
                    values: [324771, 349633],
                    summary: 'Total income rose due to global expansion and operational scaling.',
                  },
                ]
              },
              {
                charts: [
                  {
                    type: 'bar',
                    title: 'Comprehensive Income',
                    labels: ['FY23', 'FY24'],
                    values: [
                      mockData.financials.comprehensiveIncome.FY23,
                      mockData.financials.comprehensiveIncome.FY24,
                    ],
                    summary: mockData.financials.comprehensiveIncome.summary,
                  },
                  {
                    type: 'pie',
                    title: 'Export vs Domestic Revenue',
                    labels: ['Exports', 'Domestic'],
                    values: [94, 6],
                    summary: '94% of LTIMindtree’s revenue came from exports across 37 countries.',
                  }
                ]
              }
            ]}
          />
        </ScrollSection>

        {/* 4. Capital & Risk Structure */}
        <ScrollSection title="Capital & Risk Structure" backgroundColor="bg-yellow-100">
          <motion.div className={`${box} space-y-4`}>
            <p>{mockData.capitalStructure.summary}</p>
          </motion.div>
        </ScrollSection>

        {/* 5. ESG & Sustainability */}
        <ScrollSection title="ESG & Sustainability" backgroundColor="bg-emerald-100" linger>
          <motion.div className={box}>
            <DynamicChart
              type="pie"
              title="Environmental Impact Breakdown"
              labels={["Energy (GJ)", "Water (ML)", "Carbon Offset (tons)"]}
              values={[
                mockData.esg.energyUsedGJ,
                mockData.esg.waterUsedML,
                mockData.esg.carbonOffsetTons
              ]}
            />
            <p className="text-sm text-gray-700 mt-4 italic text-center">
              {mockData.esg.summary}
            </p>
          </motion.div>
        </ScrollSection>

        {/* 6. Stakeholder Impact */}
        <ScrollSection title="Stakeholder Impact" backgroundColor="bg-orange-100">
          <motion.div className={`${box} space-y-4`}>
            <p>{mockData.stakeholderImpact.summary}</p>
          </motion.div>
        </ScrollSection>

        {/* 7. Innovation & Strategic Outlook */}
        <ScrollSection title="Innovation & Strategic Outlook" backgroundColor="bg-sky-100" linger>
          <motion.div className={box}>
            <DynamicChart
              type="bar"
              title="Global Market Growth Trends"
              labels={["Cybersecurity", "Cloud", "ESG Tech"]}
              values={[183, 678.8, 83.6]}
            />
            <p className="text-sm text-gray-700 mt-4 italic text-center">
              {mockData.innovation.summary}
            </p>
          </motion.div>
        </ScrollSection>

      </MainLayout>
    </>
  )
}
