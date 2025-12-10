import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts'
import type { AgeHistogram } from '../types'

interface AgeHistogramChartProps {
    histogram: AgeHistogram
}

export default function AgeHistogramChart({ histogram }: AgeHistogramChartProps) {

    const ageRanges = Object.keys(histogram)
    const data = ageRanges.map(label => ({
        label,
        count: histogram[label] ?? 0,
    }))

    return (
        <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{ top: 16, right: 16, left: 0, bottom: 16 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
