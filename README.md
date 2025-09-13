# Brokerage Dashboard - Sterling Real Estate Group

A comprehensive React-based real estate brokerage dashboard application built with Tailwind CSS. This multi-page dashboard provides detailed insights into deal analytics, agent performance, market metrics, and property distribution with interactive editing capabilities and data management features.

## Features

- 📊 **Multi-Page Brokerage Dashboard** - Three comprehensive pages covering deals, agents, and market analysis
- 💰 **Deal Analytics** - Detailed breakdown of closed, pending, and active deals with volume analysis
- 👥 **Agent Performance Tracking** - Monitor agent metrics, rankings, and commission data
- 📈 **Market Analysis** - Property listing status, price ratios, and market trends
- 🎯 **Interactive Charts** - Pie charts with tooltips showing deal distribution and agent performance
- ✏️ **Inline Editing** - Click any editable value to modify it directly
- 💾 **Data Persistence** - Automatic localStorage integration
- 📥 **Import/Export** - Download/upload data as JSON files
- 🔄 **Reset Functionality** - Restore default values with confirmation
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Professional design with gradient effects and hover animations
- 🔄 **Pagination** - Navigate between dashboard pages seamlessly

## Dashboard Pages

### Page 1: Deal Overview & Performance
- **Closed Deal Summary** - Total deal value and allocation information
- **Deal Type Metrics** - Sell side, dual side, buy side, and closed deal counts
- **Pending & Active Deals** - Current pipeline with detailed breakdowns
- **Price Analysis** - Price ranges and average sold prices
- **Visual Analytics** - Pie charts for deal volume by type and top agent performance

### Page 2: Agents & Market Performance
- **Agent Statistics** - Total, active, and inactive agent counts
- **Office Information** - Number of physical locations
- **Market Performance** - Sold-to-list price ratios and days on market metrics
- **Revenue Analytics** - Estimated organizational revenue with breakdown
- **Market Ranking** - Company's position in the market (TTM basis)

### Page 3: Market Analysis & Distribution
- **Market Overview** - Average listing prices and active agent counts
- **Property Status** - Closed, pending, active property counts
- **Deal Type Distribution** - Single vs multiple agent deal percentages
- **Property Listing Status** - Interactive donut chart showing distribution
- **Market Metrics** - Median prices and gross commission data

## Components

- **BrokerageDashboard** - Main dashboard component with multi-page layout
- **EditableValue** - Reusable component for inline value editing
- **DataManagementPanel** - Comprehensive data control panel
- **DashboardDataContext** - Global state management with localStorage integration
- **MetricCard** - Reusable UI component for displaying key metrics
- **CustomPieChart** - Interactive chart component with tooltips and animations
- **Section** - Layout wrapper for dashboard sections

## Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd financial-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:5173
   ```

## Usage

### Navigation
- Use the **Previous/Next** buttons at the bottom to navigate between dashboard pages
- **Page 1**: Deal overview and performance analytics
- **Page 2**: Agent statistics and market performance
- **Page 3**: Market analysis and property distribution

### Editing Values
- Click on any **highlighted/editable value** to modify it directly
- Press **Enter** to save changes or **Escape** to cancel
- Changes are automatically reflected in charts and related calculations
- Most numeric values, text fields, and percentages are editable

### Interactive Charts
- **Hover** over chart segments to view detailed tooltips
- Charts automatically update when underlying data is modified
- **Pie charts** show both percentages and actual values
- **Donut charts** include center content for additional context

### Data Management
- **💾 Save**: Store current values to browser localStorage for persistence
- **📥 Export JSON**: Download complete dashboard data as a timestamped JSON file
- **📤 Import JSON**: Upload a previously exported JSON file to restore data
- **🔄 Reset**: Restore all values to default settings (with confirmation prompt)

### Data Structure
The application manages comprehensive brokerage data across three main categories:

**Page 1 - Deal Analytics:**
- Closed deal values and allocation information
- Deal type metrics (sell side, dual side, buy side counts)
- Pending and active deal pipelines
- Price range analysis and averages
- Agent performance rankings with volume data

**Page 2 - Agent & Office Performance:**
- Agent statistics (total, active, inactive counts)
- Office locations and organizational structure
- Market performance ratios and timing metrics
- Revenue calculations and sales frequency
- Market ranking and competitive positioning

**Page 3 - Market Analysis:**
- Listing price averages and market trends
- Property status distribution (closed, pending, active)
- Deal type percentages and agent collaboration metrics
- Market median values and commission totals

## Project Structure

```
src/
├── components/
│   ├── BrokerageDashboard.jsx     # Main dashboard with 3 pages and interactive charts
│   ├── EditableValue.jsx          # Reusable inline editing component
│   └── DataManagementPanel.jsx    # Data controls (save/export/import/reset)
├── context/
│   ├── DashboardDataContext.jsx   # Global state management and data operations
│   └── DataContext.jsx            # Legacy context (kept for compatibility)
├── assets/
│   └── react.svg                  # React logo
├── App.jsx                        # Main application component
├── main.jsx                       # Application entry point
└── index.css                      # Tailwind CSS imports and custom styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- **React 18** - UI framework with hooks and context
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Recharts** - Chart library for interactive data visualization
- **Context API** - Global state management for dashboard data
- **localStorage** - Browser-based data persistence
- **File API** - JSON file import/export functionality
- **PostCSS** - CSS processing for Tailwind
- **ESLint** - Code linting and quality assurance

## Browser Compatibility

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## Data Format

Exported JSON files contain all dashboard data organized by pages:

```json
{
  "page1": {
    "closedDeal": {
      "value": "69M",
      "allocation": "100% allocated to Primary Agent"
    },
    "metrics": {
      "sellSide": 67,
      "dualSide": 38,
      "buySide": 37,
      "closedDeals": 142
    },
    "chartData": {
      "volumeByDealType": [...],
      "topAgents": [...]
    }
  },
  "page2": {
    "agentsOffices": {
      "totalAgents": 32,
      "activeAgents": 32,
      "inactiveAgents": 0,
      "offices": 1
    },
    "revenue": {
      "total": "213K",
      "monthlySales": 18,
      "weeklySales": 4
    },
    "marketRank": 18
  },
  "page3": {
    "averageListingPrice": 379,
    "activeAgents": 2504,
    "marketStatus": {...},
    "listingStatus": [...]
  }
}
```

## Customization

### Adding New Editable Fields
1. Add the field to `defaultData` in `DashboardDataContext.jsx`
2. Use the `EditableValue` component in your JSX:
   ```jsx
   <EditableValue 
     path="your.field.path" 
     defaultValue="initial value"
     prefix="$" 
     suffix="%" 
     type="text|number" 
     className="custom-styling"
   />
   ```

### Adding New Dashboard Pages
1. Add new page data structure to `defaultData` in `DashboardDataContext.jsx`
2. Create a new render function (e.g., `renderPage4()`) in `BrokerageDashboard.jsx`
3. Update the pagination logic to include the new page
4. Add conditional rendering in the main component return statement

### Customizing Charts
1. Modify chart data in the `defaultData` structure
2. Adjust `CustomPieChart` component properties:
   - `size`: Chart dimensions
   - `colors`: Array of hex colors for segments
   - `showCenter`: Boolean for donut charts
   - `showLabels`: Boolean for displaying labels
   - `showValues`: Boolean for displaying values instead of percentages

### Styling
- Modify `tailwind.config.js` for theme customization
- Add custom styles in `src/index.css`
- Use Tailwind utility classes for component styling

## Troubleshooting

**Dashboard Pages Not Loading:**
- Check browser console for JavaScript errors
- Verify all components are properly imported
- Ensure React and dependencies are correctly installed

**Editable Values Not Saving:**
- Check browser console for errors in `DashboardDataContext`
- Ensure localStorage is enabled in your browser
- Verify the path parameter matches the data structure
- Try refreshing the page to reload saved data

**Charts Not Displaying:**
- Ensure Recharts library is properly installed: `npm install recharts`
- Check data format matches expected chart data structure
- Verify chart containers have proper dimensions
- Look for console errors related to chart rendering

**Import/Export Not Working:**
- Verify JSON file format matches the three-page data structure
- Check file size limits (most browsers support files up to 100MB)
- Ensure valid JSON syntax with proper page1, page2, page3 structure
- Try exporting first to see the expected format

**Styling Issues:**
- Clear browser cache and hard refresh (Ctrl+F5)
- Check Tailwind CSS is loading: look for utility classes in browser dev tools
- Verify PostCSS configuration in `postcss.config.js`
- Ensure all Tailwind directives are in `src/index.css`

**Performance Issues:**
- Large datasets may slow chart rendering - consider data pagination
- Multiple page renders can impact performance - optimize with React.memo if needed
- Clear localStorage if it becomes too large: `localStorage.clear()`

**Development Server Issues:**
- Run `npm run build` to check for compilation errors
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility (14+ required)

## Key Features Summary

### 📊 Comprehensive Analytics
- **Deal Pipeline Management**: Track closed, pending, and active deals with detailed breakdowns
- **Agent Performance**: Monitor individual agent metrics and rankings
- **Market Intelligence**: Analyze property trends, pricing, and market positioning

### 🎯 Interactive Experience
- **Real-time Editing**: Click-to-edit functionality for all key metrics
- **Dynamic Charts**: Interactive pie and donut charts with hover tooltips
- **Multi-page Navigation**: Seamless page transitions with pagination controls

### 💾 Data Management
- **Persistent Storage**: Automatic localStorage integration
- **Import/Export**: Full data backup and restore capabilities
- **Reset Function**: Quick return to default values with safety confirmation

### 🎨 Professional Design
- **Responsive Layout**: Optimized for all device sizes
- **Modern UI**: Gradient effects, hover animations, and clean typography
- **Accessibility**: Proper contrast ratios and semantic HTML structure

## Contributing

This is a demonstration project. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is for demonstration purposes. Feel free to use and modify as needed for your own brokerage dashboard requirements.

## Support

For questions or issues:
1. Check the browser console for error messages
2. Ensure all dependencies are properly installed (`npm install`)
3. Verify Node.js version compatibility (14+ required)
4. Review the troubleshooting section above for common solutions