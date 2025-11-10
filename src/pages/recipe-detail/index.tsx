import { View, Text, Image, ScrollView } from '@tarojs/components';
import { useState, useEffect } from 'react';
import Taro from '@tarojs/taro';
import { Recipe } from '../../types';
import { mockRecipes } from '../../data/recipes';
import './index.scss';

export default function RecipeDetail() {
  const [recipe, setRecipe] = useState<Recipe>();
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const instance = Taro.getCurrentInstance();
    const recipeId = instance.router?.params?.id;

    if (recipeId) {
      const found = mockRecipes.find((r) => r.id === recipeId);
      if (found) {
        setRecipe(found);
        // 从本地存储读取收藏状态
        const favorites = Taro.getStorageSync('favorites') || [];
        setIsFavorite(favorites.includes(recipeId));
      }
    }
  }, []);

  // 切换步骤完成状态
  const toggleStepComplete = (stepNumber: number) => {
    setCompletedSteps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(stepNumber)) {
        newSet.delete(stepNumber);
      } else {
        newSet.add(stepNumber);
      }
      return newSet;
    });
    Taro.vibrateShort({ type: 'light' });
  };

  // 切换收藏状态
  const toggleFavorite = () => {
    if (!recipe) return;

    const favorites = Taro.getStorageSync('favorites') || [];
    const newFavorites = isFavorite
      ? favorites.filter((id: string) => id !== recipe.id)
      : [...favorites, recipe.id];

    Taro.setStorageSync('favorites', newFavorites);
    setIsFavorite(!isFavorite);

    Taro.showToast({
      title: isFavorite ? '已取消收藏' : '已收藏',
      icon: 'success',
      duration: 1500
    });
  };

  // 分享菜谱
  const handleShare = () => {
    Taro.showShareMenu({
      withShareTicket: true
    });
    Taro.showToast({
      title: '点击右上角分享',
      icon: 'none',
      duration: 2000
    });
  };

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
          <View className="hero-gradient" />
          <View className="hero-overlay">
            <Text className="hero-title">{recipe.name}</Text>
            <Text className="hero-subtitle">{recipe.nameEn}</Text>
          </View>

          {/* 顶部操作按钮 */}
          <View className="hero-actions">
            <View className="action-icon" onClick={toggleFavorite}>
              <Text className="icon-text">{isFavorite ? '❤️' : '🤍'}</Text>
            </View>
            <View className="action-icon" onClick={handleShare}>
              <Text className="icon-text">📤</Text>
            </View>
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

          {/* 标签 */}
          {recipe.tags && recipe.tags.length > 0 && (
            <View className="tags-section">
              {recipe.tags.map((tag, index) => (
                <View key={index} className="tag">
                  <Text className="tag-text">{tag}</Text>
                </View>
              ))}
            </View>
          )}

          {/* 描述 */}
          {recipe.description && (
            <View className="description card">
              <Text className="description-text">{recipe.description}</Text>
            </View>
          )}

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
              {recipe.steps.map((step) => {
                const isCompleted = completedSteps.has(step.step);
                return (
                  <View
                    key={step.step}
                    className={`step-item card ${isCompleted ? 'step-completed' : ''}`}
                    onClick={() => toggleStepComplete(step.step)}
                  >
                    <View className="step-header">
                      <View className="step-header-left">
                        <View className={`step-number ${isCompleted ? 'step-number-completed' : ''}`}>
                          {isCompleted ? '✓' : step.step}
                        </View>
                        {step.duration && (
                          <Text className="step-duration">⏱ {step.duration}分钟</Text>
                        )}
                      </View>
                      <Text className="step-tap-hint">点击标记完成</Text>
                    </View>

                    <Text className={`step-description ${isCompleted ? 'step-description-completed' : ''}`}>
                      {step.description}
                    </Text>

                    {step.tips && (
                      <View className="step-tips">
                        <Text className="step-tips-text">💡 {step.tips}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
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
