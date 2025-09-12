import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LabelList } from 'recharts';
import { useDashboardData } from '../context/DashboardDataContext';
import EditableValue from './EditableValue';
import DataManagementPanel from './DataManagementPanel';

const BrokerageDashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data } = useDashboardData();

    // Reusable UI Components
    const MetricCard = ({ icon, label, value, subtitle, className = "", path, prefix = "", suffix = "", type = "text" }) => (
        <div className={`bg-white rounded-lg p-4 border ${className}`}>
            <div className="flex items-center mb-2">
                <span className="text-xl mr-2">{icon}</span>
                <span className="text-sm font-medium">{label}</span>
            </div>
            <div className="text-2xl font-bold">
                {path ? (
                    <EditableValue 
                        path={path} 
                        defaultValue={value} 
                        prefix={prefix}
                        suffix={suffix}
                        type={type}
                        className="text-2xl font-bold"
                    />
                ) : (
                    value
                )}
            </div>
            {subtitle && <div className="text-sm text-gray-600">{subtitle}</div>}
        </div>
    );

    const Section = ({ title, children, className = "bg-white" }) => (
        <div className={`${className} rounded-lg p-6 border mb-6`}>
            {title && <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>}
            {children}
        </div>
    );

    const CustomPieChart = ({ data, colors, size = 200, showCenter = false, centerContent, innerRadius = 0, showLabels = true, showValues = false }) => {
        const CustomTooltip = ({ active, payload }) => {
            if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                    <div className="bg-white p-2 border rounded shadow-lg">
                        <p className="font-semibold">{data.name}</p>
                        <p className="text-sm">{`Value: ${data.value}`}</p>
                        {data.percentage && <p className="text-sm">{`${data.percentage}%`}</p>}
                    </div>
                );
            }
            return null;
        };

        const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, value, name, index, payload }) => {
            if (percent < 0.02) return null; // Don't show labels for very small segments
            
            const RADIAN = Math.PI / 180;
            let radius;
            
            if (showCenter) {
                // For donut charts, position labels in the middle of the ring
                radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            } else {
                // For pie charts, position labels closer to the center
                radius = outerRadius * 0.7;
            }
            
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            if (showValues) {
                // For agents chart, show dollar values
                const displayValue = payload.dollarValue || value;
                return (
                    <text 
                        x={x} 
                        y={y} 
                        fill="white" 
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={size > 300 ? "14" : "12"}
                        fontWeight="bold"
                    >
                        {displayValue}
                    </text>
                );
            }

            return (
                <text 
                    x={x} 
                    y={y} 
                    fill="white" 
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={size > 300 ? "16" : "14"}
                    fontWeight="bold"
                >
                    {`${value}%`}
                </text>
            );
        };

        return (
            <div className="flex justify-center">
                <div className="relative" style={{ width: size, height: size }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={showLabels ? renderCustomLabel : false}
                                innerRadius={showCenter ? innerRadius || 60 : 0}
                                outerRadius={size > 300 ? 120 : size > 250 ? 100 : 80}
                                paddingAngle={2}
                                dataKey="value"
                                startAngle={90}
                                endAngle={450}
                            >
                                {data.map((entry, index) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={colors[index % colors.length]}
                                        className="hover:opacity-80 transition-opacity cursor-pointer"
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                    {showCenter && centerContent && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {centerContent}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const Legend = ({ items, columns = 2 }) => (
        <div className={`grid grid-cols-${columns} gap-4 mt-6 text-sm`}>
            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    <div className={`w-4 h-4 ${item.color} rounded mr-2`}></div>
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const renderPage1 = () => (
        <div className="rounded-lg border-0">
            {/* Header Section */}
            <Section className="bg-gray-50 border-0 p-0 m-0">
                    <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-400">
                        <div className="flex items-center justify-center mb-1">
                            <span className="text-yellow-500 text-xl mr-2">💰</span>
                            <span className="text-lg font-bold">Closed Deal</span>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-gray-800">
                                $<EditableValue 
                                    path="page1.closedDeal.value" 
                                    defaultValue="69M"
                                    className="text-3xl font-bold text-gray-800"
                                />
                            </div>
                            <div className="text-sm text-black">
                                (<EditableValue 
                                    path="page1.closedDeal.allocation" 
                                    defaultValue="100% allocated to Primary Agent"
                                    className="text-sm text-black"
                                />)
                            </div>
                        </div>
                    </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-4 mt-6 gap-4 mb-6">
                    <MetricCard 
                        icon="🏠" 
                        label="# Sell Side" 
                        value={data.page1.metrics.sellSide} 
                        path="page1.metrics.sellSide"
                        type="number"
                        className="border-2 border-gray-400 text-center flex flex-col items-center" 
                    />
                    <MetricCard 
                        icon="🤝" 
                        label="# Dual Side" 
                        value={data.page1.metrics.dualSide} 
                        path="page1.metrics.dualSide"
                        type="number"
                        className="border-2 border-gray-400 text-center flex flex-col items-center" 
                    />
                    <MetricCard 
                        icon="📈" 
                        label="# Buy Side" 
                        value={data.page1.metrics.buySide} 
                        path="page1.metrics.buySide"
                        type="number"
                        className="border-2 border-gray-400 text-center flex flex-col items-center" 
                    />
                    <MetricCard 
                        icon="📌" 
                        label="Closed Deal" 
                        value={data.page1.metrics.closedDeals} 
                        path="page1.metrics.closedDeals"
                        type="number"
                        className="border-2 border-gray-400 text-center flex flex-col items-center" 
                    />
                </div>

                {/* Pending and Active Section */}
                <div className="grid grid-cols-2 mb-5 gap-4 rounded-lg overflow-hidden">
                    {/* Pending Section */}
                    <div className="border-r text-center bg-white border-2 border-gray-400 rounded-lg">
                        <div className='border-b-2 p-2 border-gray-400'>
                        <div className="flex items-center justify-center">
                            <span className="mr-2">⏳</span>
                            <span className="font-medium">Pending</span>
                        </div>
                        <div className="text-2xl font-bold">$103M</div>
                        <div className="text-xs text-gray-600 mb-3">(Primary Agent)</div>
                        </div>
                        <div className="grid grid-cols-3 text-sm">
                            <div className="border-r  border-r-2 border-gray-400">
                                <div className="flex items-center justify-center gap-1 p-3">
                                    <span>🏠</span>
                                    <span>Sell Side</span>
                                </div>
                                <div className="font-bold">78</div>
                            </div>
                            <div className="border-r border-r-2 border-gray-400">
                                <div className="flex items-center justify-center gap-1 p-3">
                                    <span>⚖️</span>
                                    <span>Dual</span>
                                </div>
                                <div className="font-bold">28</div>
                            </div>
                            <div>
                                <div className="flex items-center justify-center gap-1 p-3">
                                    <span>🔑</span>
                                    <span>Buy Side</span>
                                </div>
                                <div className="font-bold">19</div>
                            </div>
                        </div>
                    </div>
                    {/* Active Section */}
                    <div className="p-4 pl-0 pr-0 text-center bg-white border-2 rounded-lg border-gray-400">
                        <div className="border-b-2 border-gray-400 p-2">
                        <div className="flex items-center justify-center mb-1">
                            <span className="mr-2">📍</span>
                            <span className="font-medium">Active</span>
                        </div>
                        <div className="text-2xl font-bold">$46M</div>
                        <div className="text-xs text-gray-600 mb-3">(Primary Agent)</div>
                        </div>
                        <div className="text-3xl font-bold">71</div>
                    </div>
                </div>

                {/* Price Range and Average */}
                <div className="grid grid-cols-2 gap-6 mb-6 ">
                    <MetricCard icon="💎" label="Range" value="$1.7M - $100K" className="text-center flex flex-col items-center border-2 border-gray-400" />
                    <MetricCard icon="📊" label="Avg. Sold Price" value="$517K" className="text-center flex flex-col items-center border-2 border-gray-400" />
                </div>
            </Section>

            {/* Charts Section */}
            <Section className='border-2 border-gray-400'>
                <h4 className="text-2xl font-medium text-center text-3xl mb-2">Total Closed Deals Analysis</h4>
                <div className="grid grid-cols-2 gap-12">
                    <div>
                        <h4 className="text-2xl font-medium text-center">Volume($) by Deal Type</h4>
                        <CustomPieChart
                            size={280}
                            data={data.page1.chartData.volumeByDealType}
                            colors={["#10B981", "#8B5CF6", "#F59E0B", "#EF4444"]}
                        />
                    </div>
                    <div>
                        <h4 className="font-medium text-2xl text-center">Top Agents by Volume($)</h4>
                        <div className="relative">
                            <CustomPieChart
                                size={280}
                                showValues={true}
                                data={data.page1.chartData.topAgents}
                                colors={["#3B82F6", "#06B6D4", "#10B981", "#F59E0B"]}
                            />
                        </div>
                        <div className=" text-lg mt-4">
                            <div># Closed Deals <span className="font-bold">142</span></div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );

    const renderPage2 = () => (
        <div className="space-y-6">
            {/* Agents & Offices */}
            <Section title={<span className="font-bold text-2xl">Agents & Offices</span>} className="bg-gray-50 border-2 border-gray-400">
                <div className="grid grid-cols-4 gap-6">
                    <MetricCard 
                        label="Current Total Agents" 
                        value="32" 
                        className="text-center flex flex-col items-center hover:shadow-lg transition-shadow duration-200 border-2 border-gray-300"
                        subtitle="All registered agents" 
                    />
                    <MetricCard 
                        label="Current Active Agents" 
                        value="32" 
                        className="text-center flex flex-col items-center hover:shadow-lg transition-shadow duration-200 border-2 border-gray-300"
                        subtitle="Agents with recent activity"
                    />
                    <MetricCard 
                        label="Current Inactive Agents" 
                        value="0" 
                        className="text-center flex flex-col items-center hover:shadow-lg transition-shadow duration-200 border-2 border-gray-300"
                        subtitle="No recent activity"
                    />
                    <MetricCard 
                        label="# Offices" 
                        value="1" 
                        className="text-center flex flex-col items-center hover:shadow-lg transition-shadow duration-200 border-2 border-gray-300"
                        subtitle="Physical locations"
                    />
                </div>
            </Section>

            {/* Market Performance Metrics */}
            <div className="grid grid-cols-2 gap-6">
                <Section title={<span className="font-bold text-xl">Sold to List Price Ratio Change (%)</span>} className="bg-gray-50 border-2 border-gray-400 hover:shadow-lg transition-shadow duration-200">
                    <div className="grid grid-cols-3 gap-6 text-center p-4">
                        <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
                            <h1 className="text-lg font-medium text-gray-800 mb-2">All Sides</h1>
                            <div className="text-sm text-gray-600 mb-2">Year over Year</div>
                            <div className="text-2xl font-bold text-green-600">+5.6%</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
                            <div className="text-lg font-medium text-gray-800 mb-2">Buy Side</div>
                            <div className="text-sm text-gray-600 mb-2">Previous vs Current</div>
                            <div className="text-2xl font-bold text-green-600">+4.9%</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
                            <div className="text-lg font-medium text-gray-800 mb-2">Buy Side</div>
                            <div className="text-sm text-gray-600 mb-2">Target vs Actual</div>
                            <div className="text-2xl font-bold text-green-600">+6.0%</div>
                        </div>
                    </div>
                </Section>
                <Section title={<span className="font-bold text-xl">Avg. Days on Market (List to Close)</span>} className="bg-gray-50 border-2 border-gray-400 hover:shadow-lg transition-shadow duration-200">
                    <div className="grid grid-cols-3 gap-6 text-center p-4">
                        <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
                            <div className="text-lg font-medium text-gray-800 mb-2">All Sides</div>
                            <div className="text-sm text-gray-600 mb-2">Current</div>
                            <div className="text-2xl font-bold text-blue-600">175</div>
                            <div className="text-sm text-gray-500">days</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
                            <div className="text-lg font-medium text-gray-800 mb-2">Buy Side</div>
                            <div className="text-sm text-gray-600 mb-2">Previous vs Current</div>
                            <div className="text-2xl font-bold text-blue-600">134</div>
                            <div className="text-sm text-gray-500">days</div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
                            <div className="text-lg font-medium text-gray-800 mb-2">Buy Side</div>
                            <div className="text-sm text-gray-600 mb-2">Target vs Actual</div>
                            <div className="text-2xl font-bold text-blue-600">200</div>
                            <div className="text-sm text-gray-500">days</div>
                        </div>
                    </div>
                </Section>
            </div>

            {/* Revenue and Performance */}
            <Section title={<span className="font-bold text-xl">Estimated Total Org. Revenue</span>} className="bg-gray-50 border-2 border-gray-400 hover:shadow-lg transition-shadow duration-200">
                <div className="text-center mb-6">
                    <div className="text-sm text-gray-600 mb-2 bg-white rounded-lg p-2 inline-block border border-gray-300">
                        <span className="font-medium">Revenue Share:</span> 5% overhead + 2.5% brokerage share
                    </div>
                    <div className="text-4xl font-bold text-green-600 mt-3">$213K</div>
                </div>
                <div className="grid grid-cols-4 gap-6">
                    <MetricCard 
                        label="Monthly Sales" 
                        value="18" 
                        icon="📅"
                        className="text-center bg-white border-2 border-gray-300 hover:border-gray-400 transition-colors" 
                    />
                    <MetricCard 
                        label="Weekly Sales" 
                        value="4" 
                        icon="📊"
                        className="text-center bg-white border-2 border-gray-300 hover:border-gray-400 transition-colors" 
                    />
                    <MetricCard 
                        label="Daily Sales" 
                        value="~1" 
                        icon="📈"
                        className="text-center bg-white border-2 border-gray-300 hover:border-gray-400 transition-colors" 
                    />
                    <MetricCard 
                        label="Deals/Agent" 
                        value="5" 
                        icon="👥"
                        className="text-center bg-white border-2 border-gray-300 hover:border-gray-400 transition-colors" 
                    />
                </div>
            </Section>

            {/* Market Rank */}
            <Section className="text-center text-2xl border-2 border-gray-400">
                <h4 className="text-2xl font-medium text-center text-3xl mb-2">Market Rank (TTM*)</h4>
                <div className="text-2xl text-gray-600 mb-6">(Your Company's Rank)</div>
                <div className="relative inline-block">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center mx-auto mb-4 border-8 border-yellow-300 shadow-lg">
                        <div className="text-4xl font-bold text-white">18</div>
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                            Rank
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );

    const renderPage3 = () => (
        <div className="space-y-6">
            {/* Top Metrics */}
            <div className="grid grid-cols-2 gap-6">
                <Section className="text-center bg-gradient-to-br from-blue-50 to-white border-2 border-gray-300 hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-center mb-3">
                        <span className="text-2xl mr-2">💰</span>
                        <h3 className="text-xl font-semibold">Average Listing Price</h3>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">Per Square Foot</div>
                    <div className="text-4xl font-bold text-blue-600">$379</div>
                </Section>
                <Section className="text-center bg-gradient-to-br from-green-50 to-white border-2 border-gray-300 hover:border-green-400 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="flex items-center justify-center mb-3">
                        <span className="text-2xl mr-2">👥</span>
                        <h3 className="text-xl font-semibold">Active Agents</h3>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">(Minimum 1 Deal Completed)</div>
                    <div className="text-4xl font-bold text-green-600">2,504</div>
                </Section>
            </div>

            {/* Market Status Row */}
            <div className="grid grid-cols-5 gap-6">
                <MetricCard 
                    icon="📌" 
                    label="# Closed" 
                    value="6,573" 
                    className="text-center bg-gradient-to-br from-blue-50 to-white border-2 border-gray-300 hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md"
                />
                <MetricCard 
                    icon="🏆" 
                    label="# Pending" 
                    value="3,215"
                    className="text-center bg-gradient-to-br from-green-50 to-white border-2 border-gray-300 hover:border-green-400 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md"
                />
                <MetricCard 
                    icon="📍" 
                    label="# Active" 
                    value="3,606"
                    className="text-center bg-gradient-to-br from-yellow-50 to-white border-2 border-gray-300 hover:border-yellow-400 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md"
                />
                <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-4 border-2 border-gray-300 hover:border-purple-400 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md text-center">
                    <div className="flex items-center justify-center mb-2">
                        <span className="text-xl mr-2">💰</span>
                        <span className="text-sm font-medium">Property Price Market Median</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">$138K</div>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-white rounded-lg p-4 border-2 border-gray-300 hover:border-pink-400 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md text-center">
                    <div className="flex items-center justify-center mb-2">
                        <span className="text-xl mr-2">⏱️</span>
                        <div className="text-sm font-medium text-gray-600">Gross Commission</div>
                    </div>
                    <div className="flex items-center justify-center mb-2">
                        <div className="text-2xl font-bold text-pink-600">$245M</div>
                    </div>
                </div>
            </div>

            {/* Deal Types */}
            <div className="grid grid-cols-5 gap-6 mt-8 mb-8">
                <MetricCard 
                    icon="👥"
                    label="Multiple-Agent Deal (Seller)" 
                    value="14%" 
                    className="text-center bg-gradient-to-br from-indigo-50 to-white border-2 border-gray-300 hover:border-indigo-400 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md"
                />
                <MetricCard 
                    icon="👥"
                    label="Multiple-Agent Deal (Buyer)" 
                    value="6%" 
                    className="text-center bg-gradient-to-br from-blue-50 to-white border-2 border-gray-300 hover:border-blue-400 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md"
                />
                <MetricCard 
                    icon="🤝"
                    label="Dual (Buyer, Seller)" 
                    value="14%" 
                    className="text-center bg-gradient-to-br from-purple-50 to-white border-2 border-gray-300 hover:border-purple-400 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md"
                />
                <MetricCard 
                    icon="👤"
                    label="Single Agent Deal (Seller)" 
                    value="86%" 
                    className="text-center bg-gradient-to-br from-green-50 to-white border-2 border-gray-300 hover:border-green-400 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md"
                />
                <MetricCard 
                    icon="👤"
                    label="Single Agent Deal (Buyer)" 
                    value="94%" 
                    className="text-center bg-gradient-to-br from-emerald-50 to-white border-2 border-gray-300 hover:border-emerald-400 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md"
                />
            </div>

            {/* Property Listing Status Distribution */}
            <Section className='border-2 border-gray-400'>
                <h4 className="text-2xl font-medium text-center text-3xl mb-2">Distribution of Property Listing Status</h4>
                <CustomPieChart
                    size={350}
                    showCenter={true}
                    showLabels={true}
                    innerRadius={80}
                    data={data.page3.listingStatus}
                    colors={["#10B981", "#3B82F6", "#EF4444", "#F97316", "#8B5CF6", "#EC4899"]}
                    centerContent={
                        <div className="text-center">
                            <div className="text-sm text-gray-600">Data as of</div>
                            <div className="text-sm font-medium">July 31, 2025</div>
                        </div>
                    }
                />
            </Section>
        </div>
    );

        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    {/* Header */}
                    <h1 className="text-2xl font-bold text-gray-800 text-4xl   text-center mb-2">
                        Brokerage Dashboard: <span className="text-orange-700">Sterling Real Estate Group</span>
                    </h1>

                    {/* Page Content */}
                    {currentPage === 1 && renderPage1()}
                    {currentPage === 2 && renderPage2()}
                    {currentPage === 3 && renderPage3()}

                {/* Footer Pagination */}
                <div className="flex justify-between items-center mt-8 mb-3">
                    <button
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg font-medium ${currentPage === 1
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border'
                            }`}
                    >
                        Previous
                    </button>

                    <span className="text-gray-600 font-medium">
                        Page {currentPage} of 3
                    </span>

                    <button
                        onClick={() => handlePageChange(Math.min(3, currentPage + 1))}
                        disabled={currentPage === 3}
                        className={`px-4 py-2 rounded-lg font-medium ${currentPage === 3
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border'
                            }`}
                    >
                        Next
                    </button>
                </div>

                <DataManagementPanel />
            </div>
        </div>
    );
};

export default BrokerageDashboard;