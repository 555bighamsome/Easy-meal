import { View, Text, Image } from '@tarojs/components';
import { ProductSearchResult } from '../../services/api';
import './index.scss';

interface ProductCardProps {
  product: ProductSearchResult;
  onBuy: () => void;
}

export default function ProductCard({ product, onBuy }: ProductCardProps) {
  return (
    <View className="product-card" onClick={onBuy}>
      <View className="product-image-wrapper">
        <Image
          src={product.image}
          mode="aspectFill"
          className="product-image"
        />
        {product.discount && product.discount > 0 && (
          <View className="product-discount">
            <Text className="discount-text">立减¥{product.discount}</Text>
          </View>
        )}
      </View>

      <View className="product-info">
        <Text className="product-name" numberOfLines={2}>
          {product.name}
        </Text>

        <View className="product-meta">
          <View className="product-platform">
            <Text className="platform-badge">{product.platformName}</Text>
            <Text className="product-delivery">{product.deliveryTime}</Text>
          </View>
        </View>

        <View className="product-footer">
          <View className="product-price-wrapper">
            <Text className="product-price">¥{product.price.toFixed(2)}</Text>
            {product.originalPrice && (
              <Text className="product-original-price">
                ¥{product.originalPrice.toFixed(2)}
              </Text>
            )}
          </View>
          <View className="buy-button">
            <Text className="buy-button-text">购买</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
