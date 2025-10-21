import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Menu,
} from '@mui/material';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { GetApp as DownloadIcon } from '@mui/icons-material';
import StyledButton from '../../components/common/StyledButton/StyledButton';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const monthlyData = [
  { month: 'Jan', income: 4000, expenses: 2400 },
  { month: 'Feb', income: 3000, expenses: 1398 },
  { month: 'Mar', income: 2000, expenses: 9800 },
  { month: 'Apr', income: 2780, expenses: 3908 },
  { month: 'May', income: 1890, expenses: 4800 },
  { month: 'Jun', income: 2390, expenses: 3800 },
];

const categoryData = [
  { name: 'Rent', value: 2400 },
  { name: 'Utilities', value: 1398 },
  { name: 'Groceries', value: 9800 },
  { name: 'Transportation', value: 3908 },
  { name: 'Entertainment', value: 4800 },
];

export default function Reports() {
  const [timeFrame, setTimeFrame] = useState('6m');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDownloadClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDownloadClose = () => {
    setAnchorEl(null);
  };

  const handleExport = (format: 'pdf' | 'csv') => {
    // Implement export functionality here
    console.log(`Exporting as ${format}`);
    handleDownloadClose();
  };

  const isMobile = window.innerWidth < 600;

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' },
        justifyContent: 'space-between',
        gap: 2,
        mb: 3 
      }}>
        <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
          Financial Reports
        </Typography>
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 2 },
          width: { xs: '100%', sm: 'auto' }
        }}>
          <FormControl 
            sx={{ 
              minWidth: { xs: '100%', sm: 120 }
            }}
          >
            <InputLabel>Time Frame</InputLabel>
            <Select
              value={timeFrame}
              label="Time Frame"
              onChange={(e) => setTimeFrame(e.target.value)}
              size={isMobile ? "small" : "medium"}
            >
              <MenuItem value="1m">Last Month</MenuItem>
              <MenuItem value="3m">Last 3 Months</MenuItem>
              <MenuItem value="6m">Last 6 Months</MenuItem>
              <MenuItem value="1y">Last Year</MenuItem>
            </Select>
          </FormControl>
          <StyledButton
            variant="contained"
            startIcon={<DownloadIcon sx={{ fontSize: 16 }} />}
            onClick={handleDownloadClick}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
            compact={isMobile}
          >
            Export
          </StyledButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleDownloadClose}
          >
            <MenuItem onClick={() => handleExport('pdf')}>Export as PDF</MenuItem>
            <MenuItem onClick={() => handleExport('csv')}>Export as CSV</MenuItem>
          </Menu>
        </Box>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              Income vs Expenses
            </Typography>
            <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
              <BarChart 
                data={monthlyData}
                margin={{ 
                  top: 5, 
                  right: 5, 
                  bottom: isMobile ? 20 : 5, 
                  left: isMobile ? -20 : 0 
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  interval={isMobile ? 1 : 0}
                />
                <YAxis
                  tick={{ fontSize: isMobile ? 10 : 12 }}
                  width={isMobile ? 50 : 60}
                />
                <Tooltip />
                <Legend 
                  wrapperStyle={{ 
                    fontSize: isMobile ? '10px' : '12px',
                    marginTop: isMobile ? '10px' : '0px'
                  }}
                />
                <Bar dataKey="income" fill="#0088FE" />
                <Bar dataKey="expenses" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              Expense Categories
            </Typography>
            <ResponsiveContainer width="100%" height={isMobile ? 250 : 300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={isMobile ? 60 : 80}
                  label={isMobile ? undefined : true}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  wrapperStyle={{
                    fontSize: isMobile ? '10px' : '12px',
                    marginTop: isMobile ? '10px' : '0px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              Monthly Summary
            </Typography>
            <Box sx={{ 
              mt: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}>
              <Typography variant="body1" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                Total Income: $
                {monthlyData
                  .reduce((sum, item) => sum + item.income, 0)
                  .toLocaleString()}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                Total Expenses: $
                {monthlyData
                  .reduce((sum, item) => sum + item.expenses, 0)
                  .toLocaleString()}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                Net Savings: $
                {monthlyData
                  .reduce((sum, item) => sum + (item.income - item.expenses), 0)
                  .toLocaleString()}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
