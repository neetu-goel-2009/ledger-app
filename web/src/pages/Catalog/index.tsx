import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import StyledButton from '../../components/common/StyledButton/StyledButton';
import * as Yup from 'yup';

interface CatalogItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
}

const initialItems: CatalogItem[] = [
  {
    id: '1',
    name: 'Business Consultation',
    category: 'Services',
    price: 150,
    description: 'One hour business consultation session',
  },
  {
    id: '2',
    name: 'Web Development',
    category: 'Services',
    price: 1000,
    description: 'Custom website development',
  },
];

const CatalogItemSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  category: Yup.string().required('Required'),
  price: Yup.number().required('Required').min(0, 'Must be positive'),
  description: Yup.string().required('Required'),
});

export default function Catalog() {
  const [items, setItems] = useState<CatalogItem[]>(initialItems);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      price: 0,
      description: '',
    },
    validationSchema: CatalogItemSchema,
    onSubmit: (values) => {
      if (editingItem) {
        setItems(items.map(item => 
          item.id === editingItem.id ? { ...values, id: item.id } : item
        ));
      } else {
        setItems([...items, { ...values, id: Date.now().toString() }]);
      }
      handleCloseDialog();
    },
  });

  const handleOpenDialog = (item?: CatalogItem) => {
    if (item) {
      setEditingItem(item);
      formik.setValues(item);
    } else {
      setEditingItem(null);
      formik.resetForm();
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    formik.resetForm();
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Catalog</Typography>
        <StyledButton
          variant="contained"
          compact
          startIcon={<AddIcon sx={{ fontSize: 16 }} />}
          onClick={() => handleOpenDialog()}
        >
          Add Item
        </StyledButton>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell align="right">
                  ${item.price.toLocaleString()}
                </TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(item)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>
            {editingItem ? 'Edit Item' : 'New Item'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Item Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                id="category"
                name="category"
                label="Category"
                value={formik.values.category}
                onChange={formik.handleChange}
                error={formik.touched.category && Boolean(formik.errors.category)}
                helperText={formik.touched.category && formik.errors.category}
              />
              <TextField
                fullWidth
                id="price"
                name="price"
                label="Price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                multiline
                rows={3}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={handleCloseDialog} variant="outlined" compact>
              Cancel
            </StyledButton>
            <StyledButton type="submit" variant="contained" compact>
              {editingItem ? 'Save' : 'Add'}
            </StyledButton>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
