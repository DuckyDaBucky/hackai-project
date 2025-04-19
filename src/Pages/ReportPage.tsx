import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../Layouts/MainLayout'
import ScrollSection from '../Components/ScrollSection'
import Sidebar from '../Components/Sidebar'
import Chatbot from '../Components/Chatbot'
import DynamicChart from '../Components/DynamicChart'
import DataCard from '../Components/DataCard'
import { useStore } from '../Data/store'

export default function ReportPage() {
  const navigate = useNavigate()
  const { analysisData } = useStore()

  useEffect(() => {
    if (!analysisData) {
      navigate('/')
    }
  }, [analysisData, navigate])

  if (!analysisData) return null

  const { companyName, revenue, profit, employees, revenueBreakdown } = analysisData

  return (
    <>
      <Sidebar />
      <Chatbot />
      <MainLayout>
        {/* Section 1: Company Overview */}
        <ScrollSection
          backgroundColor="bg-cloud"
          title="Company Overview"
          linger
        >
          <div id="overview" className="text-lg max-w-3xl space-y-4">
            <p>
              {companyName} is a global technology consulting and digital solutions company,
              with over {employees} employees and a presence in more than 30 countries.
            </p>
            <p>
              Founded from the merger of LTI and Mindtree, the company serves clients across
              industries with a focus on innovation and value-driven digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <DataCard label="FY24 Revenue" value={revenue} />
            <DataCard label="Net Profit" value={profit} />
            <DataCard label="Employee Count" value={employees} />
          </div>
        </ScrollSection>

        {/* Section 2: Leadership Vision */}
        <ScrollSection
          backgroundColor="bg-paleLavender"
          title="Leadership Vision"
        >
          <div id="vision" className="text-lg max-w-3xl space-y-4">
            <p>
              "Our future is limitless. We are shaping a sustainable tomorrow through
              technology and purpose." – Chairman
            </p>
            <p>
              "Together, we are pioneering digital transformation with compassion, creativity,
              and capability." – CEO
            </p>
          </div>
        </ScrollSection>

        {/* Section 3: Financial Performance */}
        <ScrollSection
          backgroundColor="bg-mintWash"
          title="Financial Performance"
          linger
        >
          <div id="finance" className="text-lg max-w-3xl mb-6">
            <p>
              {companyName} reported a revenue of {revenue} in FY24 with 7% year-over-year growth.
              The net profit stood at {profit}, reflecting strong operational efficiency.
            </p>
          </div>

          <DynamicChart
            type="pie"
            title="FY24 Revenue Breakdown"
            labels={Object.keys(revenueBreakdown)}
            values={Object.values(revenueBreakdown)}
          />
        </ScrollSection>
      </MainLayout>
    </>
  )
}
