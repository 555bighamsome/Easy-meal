import { View, Text, ScrollView } from '@tarojs/components';
import { mockRecipes } from '../../data/recipes';
import RecipeCard from '../../components/RecipeCard';
import './index.scss';

export default function Discover() {
  return (
    <View className="page discover-page">
      <ScrollView scrollY className="discover-scroll">
        <View className="container">
          <View className="discover-header">
            <Text className="discover-title">发现美食</Text>
            <Text className="discover-subtitle">Discover Recipes</Text>
          </View>

          <View className="recipes-grid">
            {mockRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
