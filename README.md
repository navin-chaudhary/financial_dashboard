# Financial Dashboard - Sterling Real Estate Group

A React + Tailwind CSS application that replicates a financial statement dashboard with interactive editing capabilities, data persistence, and export/import functionality.

## Features

- 📊 **Interactive Financial Dashboard** - Replicates the PDF layout with professional styling
- ✏️ **Inline Editing** - Click any number to edit it directly
- 💾 **Data Persistence** - Automatically saves to localStorage
- 📥 **Import/Export** - Download data as JSON and import it back
- 🔄 **Reset Functionality** - Restore default values
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Modern UI** - Clean design with Tailwind CSS

## Components

- **Header** - Dashboard title and key metrics
- **IncomeStatement** - Current/previous quarter financial tables
- **FinancialRatios** - Market analysis, charts, and KPIs
- **DataManagementButtons** - Save, export, import, and reset controls
- **Footer** - Company information and technology details
- **EditableNumber** - Reusable component for inline number editing

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

### Editing Numbers
- Click on any number in the dashboard to edit it
- Press Enter to save or Escape to cancel
- Changes are automatically applied to the UI

### Data Management
- **Save**: Store current values to localStorage
- **Export JSON**: Download all data as a JSON file
- **Import JSON**: Upload a previously exported JSON file
- **Reset**: Restore all values to defaults

### Data Structure
The application manages the following data categories:
- Header metrics (revenue, commission, profit, margin)
- Income statements (current and previous quarter)
- Top offices performance
- Market analysis metrics
- Property distribution percentages
- Key performance indicators
- Awards and recognition

## Project Structure

```
src/
├── components/
│   ├── Header.jsx                 # Dashboard header with key metrics
│   ├── IncomeStatement.jsx        # Financial tables and office performance
│   ├── FinancialRatios.jsx        # Charts, ratios, and additional metrics
│   ├── DataManagementButtons.jsx  # Data controls (save/export/import/reset)
│   ├── Footer.jsx                 # Footer with company info
│   └── EditableNumber.jsx         # Reusable inline editing component
├── context/
│   └── DataContext.jsx            # Global state management and data operations
├── App.jsx                        # Main application component
└── index.css                      # Tailwind CSS imports and custom styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management
- **localStorage** - Data persistence
- **File API** - JSON import/export

## Browser Compatibility

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## Data Format

Exported JSON files contain all dashboard data in the following structure:

```json
{
  "grossRevenue": 46000000,
  "avgCommission": 8500,
  "netProfit": 12500000,
  "netProfitMargin": 27.17,
  "currentQuarter": {
    "revenue": 46000000,
    "cogs": 21000000,
    "operatingExpenses": 12500000,
    "netIncome": 12500000
  },
  "previousQuarter": { ... },
  "topOffices": [ ... ],
  "marketAnalysis": { ... },
  "propertyDistribution": { ... },
  "kpi": { ... },
  "awards": { ... }
}
```

## Customization

### Adding New Editable Fields
1. Add the field to `defaultData` in `DataContext.jsx`
2. Use the `EditableNumber` component in your JSX:
   ```jsx
   <EditableNumber 
     path="your.field.path" 
     format="currency|percentage|number" 
     decimals={2} 
   />
   ```

### Styling
- Modify `tailwind.config.js` for theme customization
- Add custom styles in `src/index.css`
- Use Tailwind utility classes for component styling

## Troubleshooting

**Tailwind CSS PostCSS Error:**
- Fixed by using Tailwind CSS 3.x instead of 4.x for better compatibility
- If you encounter PostCSS plugin errors, ensure you're using compatible versions

**Numbers not saving:**
- Check browser console for errors
- Ensure localStorage is enabled
- Try refreshing the page

**Import not working:**
- Verify JSON file format matches expected structure
- Check file size (browser limits apply)
- Ensure valid JSON syntax

**Styling issues:**
- Clear browser cache
- Check Tailwind CSS is loaded properly
- Verify responsive breakpoints

**Development server issues:**
- Run `npm run build` first to check for compilation errors
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

## License

This project is for demonstration purposes. Feel free to use and modify as needed.

## Support

For questions or issues, please check the browser console for error messages and ensure all dependencies are properly installed.