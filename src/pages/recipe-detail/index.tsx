import { View, Text, Image, ScrollView } from '@tarojs/components';
import { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { Recipe } from '../../types';
import { mockRecipes } from '../../data/recipes';
import './index.scss';

export default function RecipeDetail() {
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    const instance = Taro.getCurrentInstance();
    const recipeId = instance.router?.params?.id;

    if (recipeId) {
      const found = mockRecipes.find((r) => r.id === recipeId);
      if (found) {
        setRecipe(found);
      }
    }
  }, []);

  if (!recipe) {
    return (
      <View className="page">
        <View className="loading">加载中...</View>
      </View>
    );
  }

  return (
    <View className="page recipe-detail-page">
      <ScrollView scrollY className="detail-scroll">
        {/* 顶部大图 */}
        <View className="hero-image">
          <Image src={recipe.image} mode="aspectFill" className="hero-img" />
          <View className="hero-overlay">
            <Text className="hero-title">{recipe.name}</Text>
            <Text className="hero-subtitle">{recipe.nameEn}</Text>
          </View>
        </View>

        <View className="container">
          {/* 基本信息 */}
          <View className="info-cards">
            <View className="info-card">
              <Text className="info-value">{recipe.cookTime}</Text>
              <Text className="info-label">分钟</Text>
            </View>
            <View className="info-card">
              <Text className="info-value">
                {recipe.difficulty === 'easy' && '简单'}
                {recipe.difficulty === 'medium' && '中等'}
                {recipe.difficulty === 'hard' && '较难'}
              </Text>
              <Text className="info-label">难度</Text>
            </View>
            <View className="info-card">
              <Text className="info-value">{recipe.servings}</Text>
              <Text className="info-label">人份</Text>
            </View>
          </View>

          {/* 描述 */}
          <View className="description">
            <Text className="description-text">{recipe.description}</Text>
          </View>

          {/* 营养信息 */}
          <View className="nutrition card">
            <Text className="section-title">营养成分</Text>
            <View className="nutrition-grid">
              <View className="nutrition-item">
                <Text className="nutrition-label">热量</Text>
                <Text className="nutrition-value">{recipe.nutrition.calories} kcal</Text>
              </View>
              <View className="nutrition-item">
                <Text className="nutrition-label">蛋白质</Text>
                <Text className="nutrition-value">{recipe.nutrition.protein}g</Text>
              </View>
              <View className="nutrition-item">
                <Text className="nutrition-label">脂肪</Text>
                <Text className="nutrition-value">{recipe.nutrition.fat}g</Text>
              </View>
              <View className="nutrition-item">
                <Text className="nutrition-label">碳水</Text>
                <Text className="nutrition-value">{recipe.nutrition.carbs}g</Text>
              </View>
            </View>
          </View>

          {/* 食材清单 */}
          <View className="ingredients card">
            <Text className="section-title">食材清单</Text>
            <Text className="section-subtitle">Ingredients</Text>

            <View className="ingredients-list mt-md">
              {recipe.ingredients.map((ing) => (
                <View key={ing.id} className="ingredient-item">
                  <Text className="ingredient-name">{ing.name}</Text>
                  <Text className="ingredient-amount">
                    {ing.amount} {ing.unit}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* 烹饪步骤 */}
          <View className="steps">
            <Text className="section-title">烹饪步骤</Text>
            <Text className="section-subtitle">Cooking Steps</Text>

            <View className="steps-list mt-md">
              {recipe.steps.map((step) => (
                <View key={step.step} className="step-item card">
                  <View className="step-header">
                    <View className="step-number">{step.step}</View>
                    {step.duration && (
                      <Text className="step-duration">⏱ {step.duration}分钟</Text>
                    )}
                  </View>

                  <Text className="step-description">{step.description}</Text>

                  {step.tips && (
                    <View className="step-tips">
                      <Text className="step-tips-text">💡 {step.tips}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 底部操作栏 */}
      <View className="bottom-bar">
        <View className="bottom-bar-content">
          <View
            className="btn btn-secondary"
            onClick={() => Taro.navigateBack()}
          >
            返回
          </View>
          <View
            className="btn btn-primary"
            style={{ flex: 1, marginLeft: '16rpx' }}
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/shopping-list/index?recipes=${recipe.id}`
              });
            }}
          >
            生成采购清单
          </View>
        </View>
      </View>
    </View>
  );
}
