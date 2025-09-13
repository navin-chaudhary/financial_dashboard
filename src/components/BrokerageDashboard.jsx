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
                <span className="mr-2 text-xl">{icon}</span>
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
            {title && <h3 className="mb-4 text-lg font-semibold text-center">{title}</h3>}
            {children}
        </div>
    );

    const CustomPieChart = ({ data, colors, size = 200, showCenter = false, centerContent, innerRadius = 0, showLabels = true, showValues = false }) => {
        const CustomTooltip = ({ active, payload }) => {
            if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                    <div className="p-2 bg-white border rounded shadow-lg">
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
                                        className="transition-opacity cursor-pointer hover:opacity-80"
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
        <div className="border-0 rounded-lg">
            {/* Header Section */}
            <Section className="p-0 m-0 border-0 bg-gray-50">
                    <div className="p-4 border-2 border-gray-400 rounded-lg bg-gray-50">
                        <div className="flex items-center justify-center mb-1">
                            <span className="mr-2 text-xl text-yellow-500">💰</span>
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
                <div className="grid grid-cols-4 gap-4 mt-6 mb-6">
                    <MetricCard 
                        icon="🏠" 
                        label="# Sell Side" 
                        value={data.page1.metrics.sellSide} 
                        path="page1.metrics.sellSide"
                        type="number"
                        className="flex flex-col items-center text-center border-2 border-gray-400" 
                    />
                    <MetricCard 
                        icon="🤝" 
                        label="# Dual Side" 
                        value={data.page1.metrics.dualSide} 
                        path="page1.metrics.dualSide"
                        type="number"
                        className="flex flex-col items-center text-center border-2 border-gray-400" 
                    />
                    <MetricCard 
                        icon="📈" 
                        label="# Buy Side" 
                        value={data.page1.metrics.buySide} 
                        path="page1.metrics.buySide"
                        type="number"
                        className="flex flex-col items-center text-center border-2 border-gray-400" 
                    />
                    <MetricCard 
                        icon="📌" 
                        label="Closed Deal" 
                        value={data.page1.metrics.closedDeals} 
                        path="page1.metrics.closedDeals"
                        type="number"
                        className="flex flex-col items-center text-center border-2 border-gray-400" 
                    />
                </div>

                {/* Pending and Active Section */}
                <div className="grid grid-cols-2 gap-4 mb-5 overflow-hidden rounded-lg">
                    {/* Pending Section */}
                    <div className="text-center bg-white border-2 border-r border-gray-400 rounded-lg">
                        <div className='p-2 border-b-2 border-gray-400'>
                        <div className="flex items-center justify-center">
                            <span className="mr-2">⏳</span>
                            <span className="font-medium">Pending</span>
                        </div>
                        <div className="text-2xl font-bold">
                            $<EditableValue 
                                path="page1.pending.value" 
                                defaultValue="103M"
                                className="text-2xl font-bold"
                            />
                        </div>
                        <div className="mb-3 text-xs text-gray-600">(Primary Agent)</div>
                        </div>
                        <div className="grid grid-cols-3 text-sm">
                            <div className="border-r-2 border-gray-400">
                                <div className="flex items-center justify-center gap-1 p-3">
                                    <span>🏠</span>
                                    <span>Sell Side</span>
                                </div>
                                <div className="font-bold">
                                    <EditableValue 
                                        path="page1.pending.sellSide" 
                                        defaultValue={78}
                                        type="number"
                                        className="font-bold"
                                    />
                                </div>
                            </div>
                            <div className="border-r-2 border-gray-400">
                                <div className="flex items-center justify-center gap-1 p-3">
                                    <span>⚖️</span>
                                    <span>Dual</span>
                                </div>
                                <div className="font-bold">
                                    <EditableValue 
                                        path="page1.pending.dual" 
                                        defaultValue={28}
                                        type="number"
                                        className="font-bold"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-center gap-1 p-3">
                                    <span>🔑</span>
                                    <span>Buy Side</span>
                                </div>
                                <div className="font-bold">
                                    <EditableValue 
                                        path="page1.pending.buySide" 
                                        defaultValue={19}
                                        type="number"
                                        className="font-bold"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Active Section */}
                    <div className="p-4 pl-0 pr-0 text-center bg-white border-2 border-gray-400 rounded-lg">
                        <div className="p-2 border-b-2 border-gray-400">
                        <div className="flex items-center justify-center mb-1">
                            <span className="mr-2">📍</span>
                            <span className="font-medium">Active</span>
                        </div>
                        <div className="text-2xl font-bold">
                            $<EditableValue 
                                path="page1.active.value" 
                                defaultValue="46M"
                                className="text-2xl font-bold"
                            />
                        </div>
                        <div className="mb-3 text-xs text-gray-600">(Primary Agent)</div>
                        </div>
                        <div className="text-3xl font-bold">
                            <EditableValue 
                                path="page1.active.total" 
                                defaultValue={71}
                                type="number"
                                className="text-3xl font-bold"
                            />
                        </div>
                    </div>
                </div>

                {/* Price Range and Average */}
                <div className="grid grid-cols-2 gap-6 mb-6 ">
                    <MetricCard 
                        icon="💎" 
                        label="Range" 
                        value={data.page1.priceRange.range} 
                        path="page1.priceRange.range"
                        className="flex flex-col items-center text-center border-2 border-gray-400" 
                    />
                    <MetricCard 
                        icon="📊" 
                        label="Avg. Sold Price" 
                        value={data.page1.priceRange.avgSoldPrice} 
                        path="page1.priceRange.avgSoldPrice"
                        className="flex flex-col items-center text-center border-2 border-gray-400" 
                    />
                </div>
            </Section>

            {/* Charts Section */}
            <Section className='border-2 border-gray-400'>
                <h4 className="mb-2 text-3xl font-medium text-center">Total Closed Deals Analysis</h4>
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
                        <h4 className="text-2xl font-medium text-center">Top Agents by Volume($)</h4>
                        <div className="relative">
                            <CustomPieChart
                                size={280}
                                showValues={true}
                                data={data.page1.chartData.topAgents}
                                colors={["#3B82F6", "#06B6D4", "#10B981", "#F59E0B"]}
                            />
                        </div>
                        <div className="mt-4 text-lg ">
                            <div># Closed Deals <span className="font-bold">
                                <EditableValue 
                                    path="page1.totalClosedDeals" 
                                    defaultValue={142}
                                    type="number"
                                    className="font-bold"
                                />
                            </span></div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );

    const renderPage2 = () => (
        <div className="space-y-6">
            {/* Agents & Offices */}
            <Section title={<span className="text-2xl font-bold">Agents & Offices</span>} className="border-2 border-gray-400 bg-gray-50">
                <div className="grid grid-cols-4 gap-6">
                    <MetricCard 
                        label="Current Total Agents" 
                        value={data.page2.agentsOffices.totalAgents} 
                        path="page2.agentsOffices.totalAgents"
                        type="number"
                        className="flex flex-col items-center text-center transition-shadow duration-200 border-2 border-gray-300 hover:shadow-lg"
                        subtitle="All registered agents" 
                    />
                    <MetricCard 
                        label="Current Active Agents" 
                        value={data.page2.agentsOffices.activeAgents} 
                        path="page2.agentsOffices.activeAgents"
                        type="number"
                        className="flex flex-col items-center text-center transition-shadow duration-200 border-2 border-gray-300 hover:shadow-lg"
                        subtitle="Agents with recent activity"
                    />
                    <MetricCard 
                        label="Current Inactive Agents" 
                        value={data.page2.agentsOffices.inactiveAgents} 
                        path="page2.agentsOffices.inactiveAgents"
                        type="number"
                        className="flex flex-col items-center text-center transition-shadow duration-200 border-2 border-gray-300 hover:shadow-lg"
                        subtitle="No recent activity"
                    />
                    <MetricCard 
                        label="# Offices" 
                        value={data.page2.agentsOffices.offices} 
                        path="page2.agentsOffices.offices"
                        type="number"
                        className="flex flex-col items-center text-center transition-shadow duration-200 border-2 border-gray-300 hover:shadow-lg"
                        subtitle="Physical locations"
                    />
                </div>
            </Section>

            {/* Market Performance Metrics */}
            <div className="grid grid-cols-2 gap-6">
                <Section title={<span className="text-xl font-bold">Sold to List Price Ratio Change (%)</span>} className="transition-shadow duration-200 border-2 border-gray-400 bg-gray-50 hover:shadow-lg">
                    <div className="grid grid-cols-3 gap-6 p-4 text-center">
                        <div className="p-4 bg-white border-2 border-gray-300 rounded-lg">
                            <h1 className="mb-2 text-lg font-medium text-gray-800">All Sides</h1>
                            <div className="mb-2 text-sm text-gray-600">Year over Year</div>
                            <div className="text-2xl font-bold text-green-600">
                                +<EditableValue 
                                    path="page2.priceRatios.allSides" 
                                    defaultValue={5.6}
                                    type="number"
                                    suffix="%"
                                    className="text-2xl font-bold text-green-600"
                                />
                            </div>
                        </div>
                        <div className="p-4 bg-white border-2 border-gray-300 rounded-lg">
                            <div className="mb-2 text-lg font-medium text-gray-800">Buy Side</div>
                            <div className="mb-2 text-sm text-gray-600">Previous vs Current</div>
                            <div className="text-2xl font-bold text-green-600">
                                +<EditableValue 
                                    path="page2.priceRatios.buyPrevCurrent" 
                                    defaultValue={4.9}
                                    type="number"
                                    suffix="%"
                                    className="text-2xl font-bold text-green-600"
                                />
                            </div>
                        </div>
                        <div className="p-4 bg-white border-2 border-gray-300 rounded-lg">
                            <div className="mb-2 text-lg font-medium text-gray-800">Buy Side</div>
                            <div className="mb-2 text-sm text-gray-600">Target vs Actual</div>
                            <div className="text-2xl font-bold text-green-600">
                                +<EditableValue 
                                    path="page2.priceRatios.buyTargetActual" 
                                    defaultValue={6.0}
                                    type="number"
                                    suffix="%"
                                    className="text-2xl font-bold text-green-600"
                                />
                            </div>
                        </div>
                    </div>
                </Section>
                <Section title={<span className="text-xl font-bold">Avg. Days on Market (List to Close)</span>} className="transition-shadow duration-200 border-2 border-gray-400 bg-gray-50 hover:shadow-lg">
                    <div className="grid grid-cols-3 gap-6 p-4 text-center">
                        <div className="p-4 bg-white border-2 border-gray-300 rounded-lg">
                            <div className="mb-2 text-lg font-medium text-gray-800">All Sides</div>
                            <div className="mb-2 text-sm text-gray-600">Current</div>
                            <div className="text-2xl font-bold text-blue-600">
                                <EditableValue 
                                    path="page2.daysOnMarket.allSides" 
                                    defaultValue={175}
                                    type="number"
                                    className="text-2xl font-bold text-blue-600"
                                />
                            </div>
                            <div className="text-sm text-gray-500">days</div>
                        </div>
                        <div className="p-4 bg-white border-2 border-gray-300 rounded-lg">
                            <div className="mb-2 text-lg font-medium text-gray-800">Buy Side</div>
                            <div className="mb-2 text-sm text-gray-600">Previous vs Current</div>
                            <div className="text-2xl font-bold text-blue-600">
                                <EditableValue 
                                    path="page2.daysOnMarket.buyPrevCurrent" 
                                    defaultValue={134}
                                    type="number"
                                    className="text-2xl font-bold text-blue-600"
                                />
                            </div>
                            <div className="text-sm text-gray-500">days</div>
                        </div>
                        <div className="p-4 bg-white border-2 border-gray-300 rounded-lg">
                            <div className="mb-2 text-lg font-medium text-gray-800">Buy Side</div>
                            <div className="mb-2 text-sm text-gray-600">Target vs Actual</div>
                            <div className="text-2xl font-bold text-blue-600">
                                <EditableValue 
                                    path="page2.daysOnMarket.buyTargetActual" 
                                    defaultValue={200}
                                    type="number"
                                    className="text-2xl font-bold text-blue-600"
                                />
                            </div>
                            <div className="text-sm text-gray-500">days</div>
                        </div>
                    </div>
                </Section>
            </div>

            {/* Revenue and Performance */}
            <Section title={<span className="text-xl font-bold">Estimated Total Org. Revenue</span>} className="transition-shadow duration-200 border-2 border-gray-400 bg-gray-50 hover:shadow-lg">
                <div className="mb-6 text-center">
                    <div className="inline-block p-2 mb-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg">
                        <span className="font-medium">Revenue Share:</span> 
                        <EditableValue 
                            path="page2.revenue.overhead" 
                            defaultValue="5%"
                            className="text-sm text-gray-600"
                        /> overhead + 
                        <EditableValue 
                            path="page2.revenue.brokerage" 
                            defaultValue="2.5%"
                            className="text-sm text-gray-600"
                        /> brokerage share
                    </div>
                    <div className="mt-3 text-4xl font-bold text-green-600">
                        $<EditableValue 
                            path="page2.revenue.total" 
                            defaultValue="213K"
                            className="text-4xl font-bold text-green-600"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-6">
                    <MetricCard 
                        label="Monthly Sales" 
                        value={data.page2.revenue.monthlySales} 
                        path="page2.revenue.monthlySales"
                        type="number"
                        icon="📅"
                        className="text-center transition-colors bg-white border-2 border-gray-300 hover:border-gray-400" 
                    />
                    <MetricCard 
                        label="Weekly Sales" 
                        value={data.page2.revenue.weeklySales} 
                        path="page2.revenue.weeklySales"
                        type="number"
                        icon="📊"
                        className="text-center transition-colors bg-white border-2 border-gray-300 hover:border-gray-400" 
                    />
                    <MetricCard 
                        label="Daily Sales" 
                        value={data.page2.revenue.dailySales} 
                        path="page2.revenue.dailySales"
                        icon="📈"
                        className="text-center transition-colors bg-white border-2 border-gray-300 hover:border-gray-400" 
                    />
                    <MetricCard 
                        label="Deals/Agent" 
                        value={data.page2.revenue.dealsPerAgent} 
                        path="page2.revenue.dealsPerAgent"
                        type="number"
                        icon="👥"
                        className="text-center transition-colors bg-white border-2 border-gray-300 hover:border-gray-400" 
                    />
                </div>
            </Section>

            {/* Market Rank */}
            <Section className="text-2xl text-center border-2 border-gray-400">
                <h4 className="mb-2 text-3xl font-medium text-center">Market Rank (TTM*)</h4>
                <div className="mb-6 text-2xl text-gray-600">(Your Company's Rank)</div>
                <div className="relative inline-block">
                    <div className="flex items-center justify-center w-32 h-32 mx-auto mb-4 border-8 border-yellow-300 rounded-full shadow-lg bg-gradient-to-r from-yellow-400 to-yellow-600">
                        <div className="text-4xl font-bold text-white">
                            <EditableValue 
                                path="page2.marketRank" 
                                defaultValue={18}
                                type="number"
                                className="text-4xl font-bold text-white"
                            />
                        </div>
                    </div>
                    <div className="absolute transform -translate-x-1/2 -bottom-2 left-1/2">
                        <div className="px-4 py-2 text-sm font-semibold text-white bg-yellow-600 rounded-full">
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
                <Section className="text-center transition-all duration-300 transform border-2 border-gray-300 bg-gradient-to-br from-blue-50 to-white hover:border-blue-400 hover:-translate-y-1">
                    <div className="flex items-center justify-center mb-3">
                        <span className="mr-2 text-2xl">💰</span>
                        <h3 className="text-xl font-semibold">Average Listing Price</h3>
                    </div>
                    <div className="mb-3 text-sm text-gray-600">Per Square Foot</div>
                    <div className="text-4xl font-bold text-blue-600">
                        $<EditableValue 
                            path="page3.averageListingPrice" 
                            defaultValue={379}
                            type="number"
                            className="text-4xl font-bold text-blue-600"
                        />
                    </div>
                </Section>
                <Section className="text-center transition-all duration-300 transform border-2 border-gray-300 bg-gradient-to-br from-green-50 to-white hover:border-green-400 hover:-translate-y-1">
                    <div className="flex items-center justify-center mb-3">
                        <span className="mr-2 text-2xl">👥</span>
                        <h3 className="text-xl font-semibold">Active Agents</h3>
                    </div>
                    <div className="mb-3 text-sm text-gray-600">(Minimum 1 Deal Completed)</div>
                    <div className="text-4xl font-bold text-green-600">
                        <EditableValue 
                            path="page3.activeAgents" 
                            defaultValue={2504}
                            type="number"
                            className="text-4xl font-bold text-green-600"
                        />
                    </div>
                </Section>
            </div>

            {/* Market Status Row */}
            <div className="grid grid-cols-5 gap-6">
                <MetricCard 
                    icon="📌" 
                    label="# Closed" 
                    value={data.page3.marketStatus.closed} 
                    path="page3.marketStatus.closed"
                    type="number"
                    className="text-center transition-all duration-300 transform border-2 border-gray-300 shadow-sm bg-gradient-to-br from-blue-50 to-white hover:border-blue-400 hover:-translate-y-1 hover:shadow-md"
                />
                <MetricCard 
                    icon="🏆" 
                    label="# Pending" 
                    value={data.page3.marketStatus.pending}
                    path="page3.marketStatus.pending"
                    type="number"
                    className="text-center transition-all duration-300 transform border-2 border-gray-300 shadow-sm bg-gradient-to-br from-green-50 to-white hover:border-green-400 hover:-translate-y-1 hover:shadow-md"
                />
                <MetricCard 
                    icon="📍" 
                    label="# Active" 
                    value={data.page3.marketStatus.active}
                    path="page3.marketStatus.active"
                    type="number"
                    className="text-center transition-all duration-300 transform border-2 border-gray-300 shadow-sm bg-gradient-to-br from-yellow-50 to-white hover:border-yellow-400 hover:-translate-y-1 hover:shadow-md"
                />
                <div className="p-4 text-center transition-all duration-300 transform border-2 border-gray-300 rounded-lg shadow-sm bg-gradient-to-br from-purple-50 to-white hover:border-purple-400 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-center justify-center mb-2">
                        <span className="mr-2 text-xl">💰</span>
                        <span className="text-sm font-medium">Property Price Market Median</span>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">
                        $<EditableValue 
                            path="page3.marketStatus.median" 
                            defaultValue="138K"
                            className="text-2xl font-bold text-purple-600"
                        />
                    </div>
                </div>
                <div className="p-4 text-center transition-all duration-300 transform border-2 border-gray-300 rounded-lg shadow-sm bg-gradient-to-br from-pink-50 to-white hover:border-pink-400 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex items-center justify-center mb-2">
                        <span className="mr-2 text-xl">⏱️</span>
                        <div className="text-sm font-medium text-gray-600">Gross Commission</div>
                    </div>
                    <div className="flex items-center justify-center mb-2">
                        <div className="text-2xl font-bold text-pink-600">
                            $<EditableValue 
                                path="page3.marketStatus.grossCommission" 
                                defaultValue="245M"
                                className="text-2xl font-bold text-pink-600"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Deal Types */}
            <div className="grid grid-cols-5 gap-6 mt-8 mb-8">
                <MetricCard 
                    icon="👥"
                    label="Multiple-Agent Deal (Seller)" 
                    value={data.page3.dealTypes.multiAgentSeller} 
                    path="page3.dealTypes.multiAgentSeller"
                    type="number"
                    suffix="%"
                    className="text-center transition-all duration-300 transform border-2 border-gray-300 shadow-sm bg-gradient-to-br from-indigo-50 to-white hover:border-indigo-400 hover:-translate-y-1 hover:shadow-md"
                />
                <MetricCard 
                    icon="👥"
                    label="Multiple-Agent Deal (Buyer)" 
                    value={data.page3.dealTypes.multiAgentBuyer} 
                    path="page3.dealTypes.multiAgentBuyer"
                    type="number"
                    suffix="%"
                    className="text-center transition-all duration-300 transform border-2 border-gray-300 shadow-sm bg-gradient-to-br from-blue-50 to-white hover:border-blue-400 hover:-translate-y-1 hover:shadow-md"
                />
                <MetricCard 
                    icon="🤝"
                    label="Dual (Buyer, Seller)" 
                    value={data.page3.dealTypes.dual} 
                    path="page3.dealTypes.dual"
                    type="number"
                    suffix="%"
                    className="text-center transition-all duration-300 transform border-2 border-gray-300 shadow-sm bg-gradient-to-br from-purple-50 to-white hover:border-purple-400 hover:-translate-y-1 hover:shadow-md"
                />
                <MetricCard 
                    icon="👤"
                    label="Single Agent Deal (Seller)" 
                    value={data.page3.dealTypes.singleAgentSeller} 
                    path="page3.dealTypes.singleAgentSeller"
                    type="number"
                    suffix="%"
                    className="text-center transition-all duration-300 transform border-2 border-gray-300 shadow-sm bg-gradient-to-br from-green-50 to-white hover:border-green-400 hover:-translate-y-1 hover:shadow-md"
                />
                <MetricCard 
                    icon="👤"
                    label="Single Agent Deal (Buyer)" 
                    value={data.page3.dealTypes.singleAgentBuyer} 
                    path="page3.dealTypes.singleAgentBuyer"
                    type="number"
                    suffix="%"
                    className="text-center transition-all duration-300 transform border-2 border-gray-300 shadow-sm bg-gradient-to-br from-emerald-50 to-white hover:border-emerald-400 hover:-translate-y-1 hover:shadow-md"
                />
            </div>

            {/* Property Listing Status Distribution */}
            <Section className='border-2 border-gray-400'>
                <h4 className="mb-2 text-3xl font-medium text-center">Distribution of Property Listing Status</h4>
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
                <div className="px-4 py-6 mx-auto max-w-7xl">
                    {/* Header */}
                    <h1 className="mb-2 text-4xl font-bold text-center text-gray-800">
                        Brokerage Dashboard: <span className="text-orange-700">Sterling Real Estate Group</span>
                    </h1>

                    {/* Page Content */}
                    {currentPage === 1 && renderPage1()}
                    {currentPage === 2 && renderPage2()}
                    {currentPage === 3 && renderPage3()}

                {/* Footer Pagination */}
                <div className="flex items-center justify-between mt-8 mb-3">
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

                    <span className="font-medium text-gray-600">
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