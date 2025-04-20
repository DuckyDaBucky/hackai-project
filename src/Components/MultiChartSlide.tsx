import DynamicChart from './DynamicChart'

type ChartBlock = {
  type: 'bar' | 'pie' | 'line'
  title: string
  labels: string[]
  values: number[]
  summary: string
}

type Props = {
  charts: ChartBlock[]
}

export default function MultiChartSlide({ charts }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
      {charts.map((chart, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-md transition-all duration-500"
        >
          <DynamicChart
            type={chart.type}
            title={chart.title}
            labels={chart.labels}
            values={chart.values}
          />
          <p className="text-sm text-gray-700 mt-4 italic text-center">
            {chart.summary}
          </p>
        </div>
      ))}
    </div>
  )
}
