import { View, Text, ScrollView } from '@tarojs/components';
import { useState, useMemo } from 'react';
import Taro from '@tarojs/taro';
import { MoodType, Recipe } from '../../types';
import { mockRecipes } from '../../data/recipes';
import MoodSelector from '../../components/MoodSelector';
import RecipeCard from '../../components/RecipeCard';
import RecipeFilter from '../../components/RecipeFilter';
import './index.scss';

interface FilterOptions {
  difficulty?: 'easy' | 'medium' | 'hard';
  maxTime?: number;
  searchText?: string;
}

export default function Index() {
  const [selectedMood, setSelectedMood] = useState<MoodType>();
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});

  // 综合筛选菜谱
  const filteredRecipes = useMemo(() => {
    let recipes = mockRecipes;

    // 1. 按心情筛选
    if (selectedMood) {
      recipes = recipes.filter((recipe) => recipe.mood.includes(selectedMood));
    }

    // 2. 按难度筛选
    if (filterOptions.difficulty) {
      recipes = recipes.filter((recipe) => recipe.difficulty === filterOptions.difficulty);
    }

    // 3. 按时间筛选
    if (filterOptions.maxTime !== undefined) {
      recipes = recipes.filter((recipe) => recipe.cookTime <= filterOptions.maxTime!);
    }

    // 4. 按搜索文本筛选
    if (filterOptions.searchText) {
      const searchLower = filterOptions.searchText.toLowerCase();
      recipes = recipes.filter((recipe) => {
        // 搜索菜谱名称
        if (recipe.name.toLowerCase().includes(searchLower)) return true;
        if (recipe.nameEn.toLowerCase().includes(searchLower)) return true;

        // 搜索食材
        const hasIngredient = recipe.ingredients.some(ing =>
          ing.name.toLowerCase().includes(searchLower)
        );
        if (hasIngredient) return true;

        // 搜索标签
        const hasTag = recipe.tags?.some(tag =>
          tag.toLowerCase().includes(searchLower)
        );
        if (hasTag) return true;

        return false;
      });
    }

    return recipes;
  }, [selectedMood, filterOptions]);

  // 处理心情选择
  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    setSelectedRecipes([]);
  };

  // 处理筛选条件变化
  const handleFilterChange = (filters: FilterOptions) => {
    setFilterOptions(filters);
  };

  // 选择/取消选择菜谱
  const toggleRecipe = (recipe: Recipe) => {
    const isSelected = selectedRecipes.some((r) => r.id === recipe.id);
    if (isSelected) {
      setSelectedRecipes(selectedRecipes.filter((r) => r.id !== recipe.id));
    } else {
      setSelectedRecipes([...selectedRecipes, recipe]);
    }
  };

  // 生成采购清单
  const handleGenerateList = () => {
    if (selectedRecipes.length === 0) {
      Taro.showToast({
        title: '请先选择菜谱',
        icon: 'none'
      });
      return;
    }

    // 将选中的菜谱传递给购物清单页面
    const recipeIds = selectedRecipes.map((r) => r.id).join(',');
    Taro.navigateTo({
      url: `/pages/shopping-list/index?recipes=${recipeIds}`
    });
  };

  return (
    <View className="page index-page">
      <ScrollView scrollY className="index-scroll">
        <View className="container">
          {/* 顶部标题 */}
          <View className="index-header">
            <Text className="index-title">今天吃什么</Text>
            <Text className="index-subtitle">What to Eat Today</Text>
          </View>

          {/* 心情选择器 */}
          <MoodSelector onSelect={handleMoodSelect} selectedMood={selectedMood} />

          {/* 筛选器 - 在选择心情后显示 */}
          {selectedMood && (
            <RecipeFilter onFilterChange={handleFilterChange} />
          )}

          {/* 推荐菜谱 */}
          {selectedMood && (
            <View className="recipes-section animate-fade-in">
              <View className="section-header">
                <View>
                  <Text className="section-title">为你推荐</Text>
                  <Text className="section-subtitle">Recommended for You</Text>
                </View>
                {selectedRecipes.length > 0 && (
                  <Text className="selected-count">已选 {selectedRecipes.length} 道</Text>
                )}
              </View>

              <View className="recipes-grid">
                {filteredRecipes.map((recipe) => {
                  const isSelected = selectedRecipes.some((r) => r.id === recipe.id);
                  return (
                    <View
                      key={recipe.id}
                      className={`recipe-wrapper ${isSelected ? 'recipe-selected' : ''}`}
                      onClick={() => toggleRecipe(recipe)}
                    >
                      <RecipeCard recipe={recipe} />
                      {isSelected && (
                        <View className="recipe-check">
                          <Text className="recipe-check-icon">✓</Text>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>

              {filteredRecipes.length === 0 && (
                <View className="empty">
                  <Text className="empty-icon">🍳</Text>
                  <Text className="empty-text">暂无适合这个心情的菜谱</Text>
                </View>
              )}
            </View>
          )}

          {/* 空状态 */}
          {!selectedMood && (
            <View className="empty-state">
              <Text className="empty-state-emoji">😊</Text>
              <Text className="empty-state-text">选择你的心情，发现美食</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* 底部操作栏 */}
      {selectedRecipes.length > 0 && (
        <View className="bottom-bar">
          <View className="bottom-bar-content">
            <View>
              <Text className="bottom-bar-title">已选 {selectedRecipes.length} 道菜</Text>
              <Text className="bottom-bar-subtitle">
                约 {selectedRecipes.reduce((sum, r) => sum + r.cookTime, 0)} 分钟
              </Text>
            </View>
            <View className="btn btn-primary" onClick={handleGenerateList}>
              生成采购清单
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
