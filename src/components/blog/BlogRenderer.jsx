import { useState } from 'react';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell,
    AreaChart, Area
} from 'recharts';
import Reveal from '../common/Reveal';

const ChartCard = ({ chartData }) => {
    const [viewMode, setViewMode] = useState('chart');
    const { type, title, data } = chartData;

    // Premium Color Palette
    const COLORS = ['#FF385C', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
    const gridColor = "rgba(255,255,255,0.05)";
    const textColor = "#94A3B8";

    return (
        <div className="my-12 p-1 md:p-8 bg-white/[0.03] backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-bloom-primary/5 blur-[60px] rounded-full group-hover:bg-bloom-primary/10 transition-colors"></div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 px-4 md:px-0">
                {title && (
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-6 bg-bloom-primary rounded-full shadow-[0_0_10px_rgba(255,56,92,0.5)]"></div>
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h3>
                    </div>
                )}

                <div className="flex bg-white/5 p-1 rounded-xl self-start">
                    <button
                        onClick={() => setViewMode('chart')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'chart' ? 'bg-bloom-primary text-bloom-dark shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Visual Chart
                    </button>
                    <button
                        onClick={() => setViewMode('table')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'table' ? 'bg-bloom-primary text-bloom-dark shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Data Table
                    </button>
                </div>
            </div>

            <div className="h-[400px] w-full px-4 md:px-0">
                {viewMode === 'chart' ? (
                    <ResponsiveContainer width="100%" height="100%">
                        {type === 'bar' ? (
                            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                                <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} tick={{ dy: 10 }} />
                                <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{
                                        backgroundColor: '#1E1B4B',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)',
                                        padding: '8px 12px'
                                    }}
                                    itemStyle={{ color: '#ffffff', fontWeight: 'bold', fontSize: '14px' }}
                                    labelStyle={{ color: '#94A3B8', marginBottom: '4px', fontWeight: 'bold' }}
                                />
                                <Bar dataKey="value" name="Value" radius={[6, 6, 0, 0]} barSize={40}>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.8} />
                                    ))}
                                </Bar>
                            </BarChart>
                        ) : type === 'line' ? (
                            <LineChart data={data} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                                <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} tick={{ dy: 10 }} />
                                <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1E1B4B',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)',
                                        padding: '8px 12px'
                                    }}
                                    itemStyle={{ color: '#ffffff', fontWeight: 'bold', fontSize: '14px' }}
                                    labelStyle={{ color: '#94A3B8', marginBottom: '4px', fontWeight: 'bold' }}
                                    cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#3B82F6"
                                    strokeWidth={4}
                                    dot={{ r: 6, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 8, strokeWidth: 0 }}
                                />
                            </LineChart>
                        ) : type === 'pie' ? (
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1E1B4B',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)',
                                        padding: '8px 12px'
                                    }}
                                    itemStyle={{ color: '#ffffff', fontWeight: 'bold', fontSize: '14px' }}
                                />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        ) : (
                            <AreaChart data={data} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                                <XAxis dataKey="name" stroke={textColor} fontSize={12} tickLine={false} axisLine={false} tick={{ dy: 10 }} />
                                <YAxis stroke={textColor} fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1E1B4B',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)',
                                        padding: '8px 12px'
                                    }}
                                    itemStyle={{ color: '#ffffff', fontWeight: 'bold', fontSize: '14px' }}
                                    labelStyle={{ color: '#94A3B8', marginBottom: '4px', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        )}
                    </ResponsiveContainer>
                ) : (
                    <div className="overflow-x-auto h-full scrollbar-hidden">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-gray-400">
                                    <th className="py-4 font-bold uppercase tracking-wider">Category</th>
                                    <th className="py-4 font-bold uppercase tracking-wider text-right">Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, i) => (
                                    <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="py-4 text-white font-medium">{item.name}</td>
                                        <td className="py-4 text-bloom-primary font-bold text-right">{item.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

const BlogRenderer = ({ content }) => {
    // - [x] Create `BlogRenderer.jsx` as a shared component for rendering blog content with charts <!-- id: 30 -->
    // - [x] Update `BlogDetail.jsx` to use `BlogRenderer` <!-- id: 31 -->
    return (
        <div className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-h1:text-white prose-h2:text-white prose-h3:text-white
            prose-headings:font-bold prose-headings:tracking-tight
            prose-p:text-bloom-text-muted/90 prose-p:leading-relaxed prose-p:mb-8
            prose-a:text-bloom-primary prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-4 prose-blockquote:border-bloom-primary prose-blockquote:bg-white/5 prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic
            prose-ul:list-disc prose-ul:pl-6 prose-li:marker:text-bloom-primary prose-li:mb-2
            prose-img:rounded-2xl prose-img:shadow-2xl">
            {parse(DOMPurify.sanitize(content, {
                ADD_ATTR: ['data-chart', 'class', 'style'],
                ADD_TAGS: ['div', 'h1', 'h2', 'h3']
            }), {
                replace: (domNode) => {
                    // Robust detection: Look for data-chart attribute or the specific class
                    const hasChartData = domNode.attribs && domNode.attribs['data-chart'];
                    const isPlaceholder = domNode.attribs && domNode.attribs.class && domNode.attribs.class.includes('custom-chart-placeholder');

                    if (hasChartData || isPlaceholder) {
                        try {
                            let chartData;
                            let rawData = domNode.attribs['data-chart'];

                            if (!rawData) {
                                console.warn("Chart element found but no data-chart attribute present");
                                return null;
                            }

                            // Clean data from potential entity encoding or whitespace
                            rawData = rawData.trim()
                                .replace(/&quot;/g, '"')
                                .replace(/&amp;/g, '&')
                                .replace(/&lt;/g, '<')
                                .replace(/&gt;/g, '>')
                                .replace(/\s/g, ''); // Base64 should not have spaces

                            const tryDecode = (str) => {
                                // Attempt transformations
                                const attempts = [
                                    // 1. Standard UTF-8 Base64 (what we mostly use)
                                    () => JSON.parse(decodeURIComponent(escape(atob(str)))),
                                    // 2. Simple atob
                                    () => JSON.parse(atob(str)),
                                    // 3. Direct JSON
                                    () => JSON.parse(str),
                                    // 4. URL-safe Base64 conversion
                                    () => JSON.parse(decodeURIComponent(escape(atob(str.replace(/-/g, '+').replace(/_/g, '/')))))
                                ];

                                for (let attempt of attempts) {
                                    try {
                                        return attempt();
                                    } catch (e) {
                                        continue;
                                    }
                                }
                                throw new Error("All decoding attempts failed");
                            };

                            try {
                                chartData = tryDecode(rawData);
                            } catch (error) {
                                console.error("Chart data parsing failed:", error);
                                // Return null/empty fragment to remove from DOM entirely
                                return <></>;
                            }

                            if (!chartData || !chartData.data || !Array.isArray(chartData.data)) {
                                console.warn("Invalid chart data structure:", chartData);
                                return <></>;
                            }

                            return <ChartCard chartData={chartData} />;
                        } catch (e) {
                            console.error("General chart error:", e);
                            return null;
                        }
                    }
                }
            })}
        </div>
    );
};

export default BlogRenderer;
export { ChartCard };
