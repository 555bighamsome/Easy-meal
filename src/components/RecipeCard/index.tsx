import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Recipe } from '../../types';
import './index.scss';

interface RecipeCardProps {
  recipe: Recipe;
  large?: boolean;
}

export default function RecipeCard({ recipe, large = false }: RecipeCardProps) {
  const handleClick = () => {
    Taro.navigateTo({
      url: `/pages/recipe-detail/index?id=${recipe.id}`
    });
  };

  return (
    <View className={`recipe-card ${large ? 'recipe-card-large' : ''}`} onClick={handleClick}>
      <View className="recipe-image-wrapper">
        <Image
          src={recipe.image}
          mode="aspectFill"
          className="recipe-image"
        />
      </View>

      <View className="recipe-info">
        <Text className="recipe-name">{recipe.name}</Text>
        <Text className="recipe-name-en">{recipe.nameEn}</Text>

        <View className="recipe-meta">
          <Text className="recipe-meta-item">{recipe.cookTime}分钟</Text>
          <Text className="recipe-meta-dot">·</Text>
          <Text className="recipe-meta-item">
            {recipe.difficulty === 'easy' && '简单'}
            {recipe.difficulty === 'medium' && '中等'}
            {recipe.difficulty === 'hard' && '较难'}
          </Text>
        </View>

        {recipe.tags && recipe.tags.length > 0 && (
          <View className="recipe-tags">
            {recipe.tags.slice(0, 3).map((tag, index) => (
              <Text key={index} className="recipe-tag">{tag}</Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
