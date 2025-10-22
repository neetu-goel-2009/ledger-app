import React from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  AccountBalance as AccountBalanceIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';

interface Transaction {
  id: string;
  accountId: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
}

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
  transactions: Transaction[];
}

interface AccountHeaderProps {
  selectedAccount: Account | null;
  onEditAccount: (account: Account) => void;
  onViewDetails: (account: Account) => void;
  onAccountSelect: (account: Account | null) => void;
}

export default function AccountHeader({
  selectedAccount,
  onEditAccount,
  onViewDetails,
  onAccountSelect,
}: AccountHeaderProps) {
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('sm'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    if (selectedAccount) {
      onEditAccount(selectedAccount);
      handleClose();
    }
  };

  const handleViewDetails = () => {
    if (selectedAccount) {
      onViewDetails(selectedAccount);
      handleClose();
    }
  };

  const handleClearSelection = () => {
    onAccountSelect(null);
    handleClose();
  };

  if (!selectedAccount) {
    return null;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 1,
        pl: 2,
        mb: 2,
        backgroundColor: theme.palette.background.default,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <AccountBalanceIcon
        color="primary"
        sx={{ fontSize: 24, opacity: 0.7 }}
      />
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {selectedAccount.name}
          </Typography>
          <Chip
            label={selectedAccount.type}
            size="small"
            sx={{
              backgroundColor: theme.palette.primary.main + '20',
              color: theme.palette.primary.main,
              fontWeight: 500,
            }}
          />
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Balance: ${selectedAccount.balance.toLocaleString()}
        </Typography>
      </Box>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{
          ml: 1,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleViewDetails}>
          <VisibilityIcon sx={{ mr: 1, fontSize: 20 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <EditIcon sx={{ mr: 1, fontSize: 20 }} />
          Edit Account
        </MenuItem>
        <MenuItem onClick={handleClearSelection}>
          Clear Selection
        </MenuItem>
      </Menu>
    </Paper>
  );
}