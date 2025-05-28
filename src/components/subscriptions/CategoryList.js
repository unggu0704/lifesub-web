import React from 'react';
import { Box, Grid, Button, styled } from '@mui/material';

const CategoryButton = styled(Button)(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(2),
  fontSize: '1.1rem',
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  border: '1px solid',
  borderColor: theme.palette.grey[300],
  '&.selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows[3],
    borderColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    }
  }
}));

const CategoryList = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <Box sx={{ width: '100%', mb: 4, px: 2 }}>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={4} key={category.categoryId}>
            <CategoryButton
              variant={selectedCategory === category.categoryId ? "contained" : "outlined"}
              className={selectedCategory === category.categoryId ? 'selected' : ''}
              onClick={() => onCategoryChange(category.categoryId)}
            >
              {category.categoryName}
            </CategoryButton>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryList;