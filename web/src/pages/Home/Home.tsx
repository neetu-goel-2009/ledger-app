import { Page, View } from "framework7-react";
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Chip,
  useTheme,
  useMediaQuery
} from "@mui/material";
import Header from "../../components/common/Header/Header";
import FooterOptions from "../../components/common/Footer/FooterOptions";
import FoodCard from "../../components/common/FoodCard";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getLoginStatus } from "../../store/components/users/users";
import { setToggleStatus } from "../../store/components/uiInteraction/uiInteraction";

import data from "./data/data";
import "./home.scss";

// Sample food data for demonstration
const sampleFoods = [
  {
    id: "1",
    name: "Butter Chicken",
    description: "Creamy and rich Indian curry with tender chicken pieces in a tomato-based sauce.",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    rating: 4.5,
    reviewCount: 128,
    tags: ["Popular", "Spicy", "Indian"],
    isVegetarian: false,
    isSpicy: true,
    preparationTime: "25-30 min"
  },
  {
    id: "2",
    name: "Paneer Tikka",
    description: "Grilled cottage cheese marinated in aromatic spices and yogurt.",
    price: 199,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    rating: 4.3,
    reviewCount: 89,
    tags: ["Vegetarian", "Grilled", "Appetizer"],
    isVegetarian: true,
    isSpicy: false,
    preparationTime: "20-25 min"
  },
  {
    id: "3",
    name: "Biryani",
    description: "Fragrant rice dish cooked with aromatic spices, herbs, and tender meat.",
    price: 349,
    originalPrice: 449,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    rating: 4.7,
    reviewCount: 156,
    tags: ["Premium", "Rice", "Traditional"],
    isVegetarian: false,
    isSpicy: true,
    preparationTime: "35-40 min"
  },
  {
    id: "4",
    name: "Dal Makhani",
    description: "Slow-cooked black lentils with cream and butter for a rich, creamy texture.",
    price: 149,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
    rating: 4.2,
    reviewCount: 67,
    tags: ["Vegetarian", "Healthy", "Comfort"],
    isVegetarian: true,
    isSpicy: false,
    preparationTime: "30-35 min"
  }
];

const Home = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(getLoginStatus);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleFavoriteToggle = (id: string) => {
    console.log('Toggle favorite for:', id);
  };

  const handleAddToCart = (id: string) => {
    console.log('Add to cart:', id);
  };

  const handleRemoveFromCart = (id: string) => {
    console.log('Remove from cart:', id);
  };

  return (
    <>
      <View>
        <Header
          onUserIconClick={() => {
            console.log("User icon clicked");
            if (isLoggedIn)
              dispatch(setToggleStatus({ key: "profilePage", status: true }));
            else dispatch(setToggleStatus({ key: "loginForm", status: true }));
          }}
        />
        <FooterOptions />
        <Page name="home" className="home">
          <Container maxWidth="lg" sx={{ py: 3 }}>
            {/* Hero Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant={isMobile ? "h4" : "h3"}
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  marginBottom: 1,
                  textAlign: isMobile ? 'center' : 'left'
                }}
              >
                Delicious Food Delivered
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  marginBottom: 2,
                  textAlign: isMobile ? 'center' : 'left',
                  maxWidth: isMobile ? '100%' : '600px'
                }}
              >
                Order your favorite meals from the best restaurants in your area. 
                Fast delivery, great prices, and amazing taste guaranteed.
              </Typography>
              
              {/* Quick Categories */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                {['All', 'Indian', 'Chinese', 'Italian', 'Fast Food', 'Desserts'].map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    variant="outlined"
                    sx={{
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Featured Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 600,
                  marginBottom: 2,
                  color: theme.palette.text.primary
                }}
              >
                Featured Dishes
              </Typography>
              
              <Grid container spacing={3}>
                {sampleFoods.map((food) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={food.id}>
                    <FoodCard
                      {...food}
                      onFavoriteToggle={handleFavoriteToggle}
                      onAddToCart={handleAddToCart}
                      onRemoveFromCart={handleRemoveFromCart}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Popular Categories */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 600,
                  marginBottom: 2,
                  color: theme.palette.text.primary
                }}
              >
                Popular Categories
              </Typography>
              
              <Grid container spacing={2}>
                {[
                  { name: 'Main Course', count: 45, color: theme.palette.primary.main },
                  { name: 'Appetizers', count: 32, color: theme.palette.secondary.main },
                  { name: 'Desserts', count: 28, color: theme.palette.warning.main },
                  { name: 'Beverages', count: 24, color: theme.palette.info.main }
                ].map((category) => (
                  <Grid item xs={6} sm={3} key={category.name}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: category.color + '10',
                        border: `1px solid ${category.color}30`,
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: category.color + '20',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: category.color,
                          marginBottom: 0.5
                        }}
                      >
                        {category.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {category.count} items
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Special Offers */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 600,
                  marginBottom: 2,
                  color: theme.palette.text.primary
                }}
              >
                Special Offers
              </Typography>
              
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  color: theme.palette.primary.contrastText,
                  textAlign: 'center'
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    marginBottom: 1
                  }}
                >
                  🎉 50% OFF
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    marginBottom: 2,
                    opacity: 0.9
                  }}
                >
                  On your first order
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    opacity: 0.8,
                    marginBottom: 2
                  }}
                >
                  Use code: FIRST50 at checkout
                </Typography>
              </Box>
            </Box>
          </Container>
        </Page>
      </View>
    </>
  );
};

export default Home;
