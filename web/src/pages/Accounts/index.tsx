import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  useTheme,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useFormik } from 'formik';
import StyledButton from '../../components/common/StyledButton/StyledButton';
import * as Yup from 'yup';

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

const initialAccounts: Account[] = [
  { 
    id: '1', 
    name: 'Main Checking', 
    type: 'Checking', 
    balance: 5000,
    transactions: [
      {
        id: '1',
        accountId: '1',
        type: 'credit',
        amount: 2000,
        description: 'Initial deposit',
        date: '2025-10-16'
      }
    ]
  },
  { 
    id: '2', 
    name: 'Savings', 
    type: 'Savings', 
    balance: 10000,
    transactions: []
  },
  { 
    id: '3', 
    name: 'Emergency Fund', 
    type: 'Savings', 
    balance: 15000,
    transactions: []
  },
];

const AccountSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  type: Yup.string().required('Required'),
  balance: Yup.number().required('Required').min(0, 'Must be positive'),
});

const TransactionSchema = Yup.object().shape({
  amount: Yup.number()
    .required('Required')
    .moreThan(0, 'Must be greater than 0'),
  description: Yup.string()
    .required('Required')
    .min(3, 'Must be at least 3 characters'),
});

export default function Accounts() {
    const [accounts, setAccounts] = useState<Account[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openTransactionDialog, setOpenTransactionDialog] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [transactionType, setTransactionType] = useState<'credit' | 'debit' | null>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      type: '',
      balance: 0,
    },
    validationSchema: AccountSchema,
    onSubmit: (values) => {
      if (editingAccount) {
        setAccounts(accounts.map(acc => 
          acc.id === editingAccount.id ? { 
            ...values, 
            id: acc.id,
            transactions: acc.transactions 
          } : acc
        ));
      } else {
        setAccounts([
          ...accounts, 
          { 
            ...values, 
            id: Date.now().toString(),
            transactions: []
          }
        ]);
      }
      handleCloseDialog();
    },
  });

  const transactionFormik = useFormik({
    initialValues: {
      amount: 0,
      description: '',
    },
    validationSchema: TransactionSchema,
    onSubmit: (values) => {
      if (selectedAccount && transactionType) {
        const newTransaction: Transaction = {
          id: Date.now().toString(),
          accountId: selectedAccount.id,
          type: transactionType,
          amount: Number(values.amount),
          description: values.description,
          date: new Date().toISOString().split('T')[0],
        };

        const updatedAccount = {
          ...selectedAccount,
          balance: transactionType === 'credit'
            ? selectedAccount.balance + Number(values.amount)
            : selectedAccount.balance - Number(values.amount),
          transactions: [...selectedAccount.transactions, newTransaction],
        };

        setAccounts(accounts.map(acc =>
          acc.id === selectedAccount.id ? updatedAccount : acc
        ));
        
        // Update the selected account with the new data
        setSelectedAccount(updatedAccount);

        handleCloseTransactionDialog();
      }
    },
  });

  const handleOpenDialog = (account?: Account) => {
    if (account) {
      setEditingAccount(account);
      formik.setValues(account);
    } else {
      setEditingAccount(null);
      formik.resetForm();
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAccount(null);
    // If we were editing the selected account, update the selection
    if (editingAccount?.id === selectedAccount?.id) {
      const updatedAccount = accounts.find(acc => acc.id === selectedAccount.id);
      if (updatedAccount) {
        setSelectedAccount(updatedAccount);
      }
    }
    formik.resetForm();
  };

  const handleOpenTransactionDialog = (account: Account, type: 'credit' | 'debit') => {
    if (!account) return;
    setSelectedAccount(account);
    setTransactionType(type);
    setOpenTransactionDialog(true);
    transactionFormik.resetForm();
  };

  const handleRowClick = (account: Account) => {
    setSelectedAccount(selectedAccount?.id === account.id ? null : account);
  };



  const handleCloseTransactionDialog = () => {
    setOpenTransactionDialog(false);
    setTransactionType(null);
    transactionFormik.resetForm();
  };

  const handleDeleteAccount = (id: string) => {
    if (selectedAccount?.id === id) {
      setSelectedAccount(null);
    }
    setAccounts(accounts.filter(acc => acc.id !== id));
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const theme = useTheme();

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
          Accounts
        </Typography>
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1,
          flex: { xs: '1', sm: '0 0 auto' }
        }}>
          <StyledButton
            variant="contained"
            compact
            startIcon={<AddIcon sx={{ fontSize: 16 }} />}
            onClick={() => handleOpenDialog()}
          >
            New Account
          </StyledButton>
        </Box>
      </Box>

      <Paper sx={{ mb: 3, p: { xs: 2, sm: 3 } }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2
        }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Total Balance
            </Typography>
            <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
              ${totalBalance.toLocaleString()}
            </Typography>
          </Box>
          <Box sx={{ 
            display: 'flex',
            flexDirection: { xs: 'row', sm: 'row' },
            gap: 1,
            width: { xs: '100%', sm: 'auto' }
          }}>
            <StyledButton
              variant="contained"
              color="success"
              onClick={() => handleOpenTransactionDialog(selectedAccount!, 'credit')}
              disabled={!selectedAccount}
              sx={{ flex: { xs: 1, sm: 0 } }}
            >
              Add Credit
            </StyledButton>
            <StyledButton
              variant="contained"
              color="error"
              onClick={() => handleOpenTransactionDialog(selectedAccount!, 'debit')}
              disabled={!selectedAccount}
              sx={{ flex: { xs: 1, sm: 0 } }}
            >
              Add Debit
            </StyledButton>
          </Box>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>Type</TableCell>
              <TableCell align="right">Balance</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <TableRow 
                key={account.id}
                hover
                selected={selectedAccount?.id === account.id}
                onClick={() => handleRowClick(account)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  {account.name}
                  <Typography 
                    variant="body2" 
                    color="textSecondary" 
                    sx={{ display: { xs: 'block', sm: 'none' } }}
                  >
                    {account.type}
                  </Typography>
                </TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                  {account.type}
                </TableCell>
                <TableCell align="right">
                  ${account.balance.toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpenDialog(account)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteAccount(account.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>
            {editingAccount ? 'Edit Account' : 'New Account'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Account Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                id="type"
                name="type"
                label="Account Type"
                value={formik.values.type}
                onChange={formik.handleChange}
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
              />
              <TextField
                fullWidth
                id="balance"
                name="balance"
                label="Balance"
                type="number"
                value={formik.values.balance}
                onChange={formik.handleChange}
                error={formik.touched.balance && Boolean(formik.errors.balance)}
                helperText={formik.touched.balance && formik.errors.balance}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={handleCloseDialog} variant="outlined" compact>
              Cancel
            </StyledButton>
            <StyledButton type="submit" variant="contained" compact>
              {editingAccount ? 'Save' : 'Add'}
            </StyledButton>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={openTransactionDialog} onClose={handleCloseTransactionDialog}>
        <form onSubmit={transactionFormik.handleSubmit}>
          <DialogTitle>
            {transactionType === 'credit' ? 'Add Credit' : 'Add Debit'} - {selectedAccount?.name}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                id="amount"
                name="amount"
                label="Amount"
                type="number"
                value={transactionFormik.values.amount}
                onChange={transactionFormik.handleChange}
                error={transactionFormik.touched.amount && Boolean(transactionFormik.errors.amount)}
                helperText={transactionFormik.touched.amount && transactionFormik.errors.amount}
              />
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                multiline
                rows={2}
                value={transactionFormik.values.description}
                onChange={transactionFormik.handleChange}
                error={transactionFormik.touched.description && Boolean(transactionFormik.errors.description)}
                helperText={transactionFormik.touched.description && transactionFormik.errors.description}
              />
            </Box>

            {selectedAccount && selectedAccount.transactions.length > 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Recent Transactions
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedAccount.transactions
                        .slice()
                        .reverse()
                        .slice(0, 5)
                        .map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>
                              <Typography
                                color={transaction.type === 'credit' ? 'success.main' : 'error.main'}
                              >
                                {transaction.type}
                              </Typography>
                            </TableCell>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell align="right">
                              ${transaction.amount.toLocaleString()}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={handleCloseTransactionDialog} variant="outlined" compact>
              Cancel
            </StyledButton>
            <StyledButton 
              type="submit" 
              variant="contained"
              color={transactionType === 'credit' ? 'success' : 'error'}
              compact
            >
              {transactionType === 'credit' ? 'Add Credit' : 'Add Debit'}
            </StyledButton>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
