import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
  IconButton,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Add,
  Remove,
  LocalOffer
} from '@mui/icons-material';

interface FoodCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  isFavorite?: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  preparationTime?: string;
  onFavoriteToggle?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  onRemoveFromCart?: (id: string) => void;
  quantity?: number;
  className?: string;
}

const FoodCard: React.FC<FoodCardProps> = ({
  id,
  name,
  description,
  price,
  originalPrice,
  image,
  rating,
  reviewCount,
  tags,
  isFavorite = false,
  isVegetarian = false,
  isSpicy = false,
  preparationTime,
  onFavoriteToggle,
  onAddToCart,
  onRemoveFromCart,
  quantity = 0,
  className
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleFavoriteToggle = () => {
    onFavoriteToggle?.(id);
  };

  const handleAddToCart = () => {
    onAddToCart?.(id);
  };

  const handleRemoveFromCart = () => {
    onRemoveFromCart?.(id);
  };

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Card 
      className={`food-card ${className || ''}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8]
        }
      }}
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            zIndex: 1,
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
            borderRadius: '12px',
            padding: '4px 8px',
            fontSize: '0.75rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          <LocalOffer sx={{ fontSize: '0.875rem' }} />
          {discount}% OFF
        </Box>
      )}

      {/* Favorite Button */}
      <IconButton
        onClick={handleFavoriteToggle}
        sx={{
          position: 'absolute',
          top: 8,
          width: '40px',
          right: 8,
          zIndex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(4px)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)'
          }
        }}
      >
        {isFavorite ? (
          <Favorite sx={{ color: theme.palette.error.main }} />
        ) : (
          <FavoriteBorder />
        )}
      </IconButton>

      {/* Food Image */}
      <CardMedia
        component="img"
        height={isMobile ? "160" : "200"}
        image={image}
        alt={name}
        sx={{
          objectFit: 'cover',
          position: 'relative'
        }}
      />

      {/* Food Type Indicators */}
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          left: discount > 0 ? 80 : 8,
          zIndex: 1,
          display: 'flex',
          gap: 0.5
        }}
      >
        {isVegetarian && (
          <Chip
            label="Veg"
            size="small"
            sx={{
              backgroundColor: theme.palette.success.main,
              color: theme.palette.success.contrastText,
              fontSize: '0.625rem',
              height: '20px'
            }}
          />
        )}
        {isSpicy && (
          <Chip
            label="Spicy"
            size="small"
            sx={{
              backgroundColor: theme.palette.warning.main,
              color: theme.palette.warning.contrastText,
              fontSize: '0.625rem',
              height: '20px'
            }}
          />
        )}
      </Box>

      <CardContent sx={{ flexGrow: 1, padding: theme.spacing(2) }}>
        {/* Food Name and Rating */}
        <Box sx={{ marginBottom: 1 }}>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            component="h3"
            sx={{
              fontWeight: 600,
              marginBottom: 0.5,
              lineHeight: 1.2,
              color: theme.palette.text.primary
            }}
          >
            {name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
            <Rating
              value={rating}
              readOnly
              size="small"
              sx={{ '& .MuiRating-iconFilled': { color: theme.palette.warning.main } }}
            />
            <Typography variant="caption" color="text.secondary">
              ({reviewCount})
            </Typography>
          </Box>
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginBottom: 1.5,
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {description}
        </Typography>

        {/* Tags */}
        {tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', marginBottom: 1.5 }}>
            {tags.slice(0, 3).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.625rem',
                  height: '20px',
                  borderColor: theme.palette.divider,
                  color: theme.palette.text.secondary
                }}
              />
            ))}
          </Box>
        )}

        {/* Preparation Time */}
        {preparationTime && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: 'block',
              marginBottom: 1.5,
              fontSize: '0.75rem'
            }}
          >
            ⏱️ {preparationTime}
          </Typography>
        )}

        {/* Price and Add to Cart */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              ₹{price}
              {originalPrice && (
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: 'line-through',
                    color: theme.palette.text.disabled,
                    fontWeight: 400
                  }}
                >
                  ₹{originalPrice}
                </Typography>
              )}
            </Typography>
          </Box>

          {/* Add to Cart Button */}
          {quantity === 0 ? (
            <Button
              variant="contained"
              size="small"
              onClick={handleAddToCart}
              startIcon={<Add />}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                fontWeight: 600,
                minWidth: '100px',
                width: '100px',
                padding: '6px 16px'
              }}
            >
              Add
            </Button>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                size="small"
                onClick={handleRemoveFromCart}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark
                  }
                }}
              >
                <Remove sx={{ fontSize: '1rem' }} />
              </IconButton>
              
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  minWidth: '20px',
                  textAlign: 'center'
                }}
              >
                {quantity}
              </Typography>
              
              <IconButton
                size="small"
                onClick={handleAddToCart}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.primary.dark
                  }
                }}
              >
                <Add sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FoodCard; 