import { View, Text, ScrollView, Checkbox, Button } from '@tarojs/components';
import { useState, useEffect, useMemo } from 'react';
import Taro from '@tarojs/taro';
import { Recipe, ShoppingListItem, PurchasePlan } from '../../types';
import { mockRecipes } from '../../data/recipes';
import {
  generateShoppingList,
  checkUserInventory,
  suggestOptimizations,
  calculateTotalPrice,
  generatePurchasePlans
} from '../../utils/shoppingList';
import './index.scss';

export default function ShoppingList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [purchasePlans, setPurchasePlans] = useState<PurchasePlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<PurchasePlan>();
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    vegetable: true,
    meat: true,
    seafood: true,
    egg: true,
    seasoning: true,
    other: true
  });

  // 获取URL参数中的菜谱ID
  useEffect(() => {
    const instance = Taro.getCurrentInstance();
    const recipeIds = instance.router?.params?.recipes?.split(',') || [];

    if (recipeIds.length > 0) {
      const selectedRecipes = mockRecipes.filter((r) => recipeIds.includes(r.id));
      setRecipes(selectedRecipes);

      // 生成购物清单
      let list = generateShoppingList(selectedRecipes);

      // 检查用户库存
      list = checkUserInventory(list);

      setShoppingList(list);

      // 生成购买方案
      const plans = generatePurchasePlans(list);
      setPurchasePlans(plans);

      // 默认选中推荐方案
      const recommendedPlan = plans.find((p) => p.recommended);
      if (recommendedPlan) {
        setSelectedPlan(recommendedPlan);
      }
    }
  }, []);

  // 计算总价
  const totalPrice = useMemo(() => {
    return calculateTotalPrice(shoppingList);
  }, [shoppingList]);

  // 需要购买的食材数量
  const toBuyCount = useMemo(() => {
    return shoppingList.filter((item) => !item.inStock).length;
  }, [shoppingList]);

  // 智能建议
  const suggestions = useMemo(() => {
    return suggestOptimizations(shoppingList);
  }, [shoppingList]);

  // 切换勾选状态
  const toggleCheck = (index: number) => {
    const newList = [...shoppingList];
    newList[index].checked = !newList[index].checked;
    setShoppingList(newList);

    // 添加触觉反馈
    Taro.vibrateShort({ type: 'light' });
  };

  // 全选/取消全选
  const toggleCheckAll = () => {
    const allChecked = shoppingList.every((item) => item.checked);
    const newList = shoppingList.map((item) => ({
      ...item,
      checked: !allChecked
    }));
    setShoppingList(newList);

    Taro.vibrateShort({ type: 'medium' });
    Taro.showToast({
      title: allChecked ? '已取消全选' : '已全选',
      icon: 'none',
      duration: 1000
    });
  };

  // 切换分类展开/折叠
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // 长按复制食材名称
  const handleLongPress = (itemName: string) => {
    Taro.setClipboardData({
      data: itemName,
      success: () => {
        Taro.showToast({
          title: '已复制到剪贴板',
          icon: 'success',
          duration: 1500
        });
      }
    });
  };

  // 清除已勾选项
  const clearChecked = () => {
    const uncheckedItems = shoppingList.filter((item) => !item.checked);
    if (uncheckedItems.length === shoppingList.length) {
      Taro.showToast({
        title: '没有已勾选的项目',
        icon: 'none'
      });
      return;
    }

    Taro.showModal({
      title: '确认清除',
      content: `是否清除 ${shoppingList.length - uncheckedItems.length} 项已勾选的食材？`,
      success: (res) => {
        if (res.confirm) {
          setShoppingList(uncheckedItems);
          Taro.showToast({
            title: '已清除',
            icon: 'success'
          });
        }
      }
    });
  };

  // 一键购齐
  const handleBuyAll = () => {
    if (!selectedPlan) {
      Taro.showToast({
        title: '请选择购买方案',
        icon: 'none'
      });
      return;
    }

    setShowPlanModal(true);
  };

  // 跳转到购买平台
  const handleBuyFromPlatform = (platform: string, url: string) => {
    Taro.showToast({
      title: `即将跳转到${platform}`,
      icon: 'none',
      duration: 2000
    });

    // 真实场景中跳转到小程序
    // Taro.navigateToMiniProgram({
    //   appId: platformAppId,
    //   path: url
    // });
  };

  // 分类统计
  const categorizedList = useMemo(() => {
    const categories: Record<string, ShoppingListItem[]> = {
      vegetable: [],
      meat: [],
      seafood: [],
      egg: [],
      seasoning: [],
      other: []
    };

    shoppingList.forEach((item) => {
      categories[item.ingredient.category].push(item);
    });

    return categories;
  }, [shoppingList]);

  const categoryNames: Record<string, string> = {
    vegetable: '蔬菜类',
    meat: '肉禽类',
    seafood: '海鲜类',
    egg: '蛋类',
    seasoning: '调料类',
    other: '其他'
  };

  return (
    <View className="page shopping-list-page">
      <ScrollView scrollY className="shopping-scroll">
        <View className="container">
          {/* 顶部摘要 */}
          <View className="summary-card card">
            <View className="summary-header">
              <Text className="summary-title">本周采购清单</Text>
              <Text className="summary-subtitle">Shopping List</Text>
            </View>

            <View className="summary-stats">
              <View className="stat-item">
                <Text className="stat-value">{recipes.length}</Text>
                <Text className="stat-label">道菜</Text>
              </View>
              <View className="stat-divider" />
              <View className="stat-item">
                <Text className="stat-value">{toBuyCount}</Text>
                <Text className="stat-label">种食材</Text>
              </View>
              <View className="stat-divider" />
              <View className="stat-item">
                <Text className="stat-value">¥{selectedPlan?.totalPrice || totalPrice}</Text>
                <Text className="stat-label">预计</Text>
              </View>
            </View>

            {/* 智能建议 */}
            {suggestions.length > 0 && (
              <View className="suggestions">
                <Text className="suggestions-title">💡 智能建议</Text>
                {suggestions.map((suggestion, index) => (
                  <Text key={index} className="suggestion-item">• {suggestion}</Text>
                ))}
              </View>
            )}
          </View>

          {/* 购买方案 */}
          {selectedPlan && (
            <View className="plan-card card animate-fade-in">
              <View className="plan-header">
                <View>
                  <Text className="plan-badge">推荐方案</Text>
                  <Text className="plan-title">{selectedPlan.title}</Text>
                  <Text className="plan-desc">{selectedPlan.description}</Text>
                </View>
                {selectedPlan.savings > 0 && (
                  <View className="plan-savings">
                    <Text className="savings-label">已省</Text>
                    <Text className="savings-value">¥{selectedPlan.savings}</Text>
                  </View>
                )}
              </View>

              <View className="plan-channels">
                {selectedPlan.channels.map((channel, index) => (
                  <View key={index} className="channel-item">
                    <View className="channel-info">
                      <Text className="channel-name">{channel.name}</Text>
                      <Text className="channel-meta">
                        {channel.items.length}种食材 · {channel.deliveryTime}
                      </Text>
                    </View>
                    <View className="channel-price">
                      <Text className="price-value">¥{channel.totalPrice}</Text>
                      {channel.discount && channel.discount > 0 && (
                        <Text className="price-discount">-¥{channel.discount}</Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>

              <Button
                className="plan-button"
                onClick={() => setShowPlanModal(true)}
              >
                查看其他方案 ▼
              </Button>
            </View>
          )}

          {/* 详细清单 */}
          <View className="list-section">
            <View className="section-header-with-actions">
              <View>
                <Text className="section-title">详细清单</Text>
                <Text className="section-subtitle">Detailed List</Text>
              </View>
              <View className="list-actions">
                <View className="action-btn" onClick={toggleCheckAll}>
                  <Text className="action-text">全选</Text>
                </View>
                {shoppingList.some((item) => item.checked) && (
                  <View className="action-btn" onClick={clearChecked}>
                    <Text className="action-text">清除已选</Text>
                  </View>
                )}
              </View>
            </View>

            <View className="list-card card mt-md">
              {Object.entries(categorizedList).map(([category, items]) => {
                if (items.length === 0) return null;

                const isExpanded = expandedCategories[category];
                const checkedCount = items.filter((i) => i.checked).length;

                return (
                  <View key={category} className="category-section">
                    <View
                      className="category-header"
                      onClick={() => toggleCategory(category)}
                    >
                      <View className="category-header-left">
                        <Text className={`category-arrow ${isExpanded ? 'category-arrow-open' : ''}`}>
                          ▶
                        </Text>
                        <Text className="category-title">{categoryNames[category]}</Text>
                        <Text className="category-count">
                          {items.length}项
                          {checkedCount > 0 && ` · ${checkedCount}已选`}
                        </Text>
                      </View>
                    </View>

                    {isExpanded && items.map((item, index) => {
                      const globalIndex = shoppingList.findIndex(
                        (i) => i.ingredient.id === item.ingredient.id
                      );

                      return (
                        <View
                          key={item.ingredient.id}
                          className={`list-item ${item.checked ? 'list-item-checked' : ''}`}
                          onLongPress={() => handleLongPress(item.ingredient.name)}
                        >
                          <View className="list-item-left">
                            <View className="checkbox-wrapper">
                              <Checkbox
                                checked={item.checked}
                                color="#7C8B6F"
                                onChange={() => toggleCheck(globalIndex)}
                              />
                            </View>
                            <View className="item-info">
                              <Text
                                className={`item-name ${item.checked ? 'item-checked' : ''}`}
                              >
                                {item.ingredient.name}
                              </Text>
                              <Text className="item-amount">
                                {item.totalAmount} {item.totalUnit}
                              </Text>
                              {item.fromRecipes.length > 1 && (
                                <Text className="item-from">
                                  用于 {item.fromRecipes.join('、')}
                                </Text>
                              )}
                            </View>
                          </View>

                          <View className="list-item-right">
                            {item.inStock ? (
                              <Text className="item-stock">家里有</Text>
                            ) : (
                              <Text className="item-platform">
                                {selectedPlan?.channels[0]?.name || '待购'}
                              </Text>
                            )}
                          </View>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 底部按钮 */}
      <View className="bottom-bar">
        <View className="bottom-bar-content">
          <View>
            <Text className="bottom-bar-title">
              共 ¥{selectedPlan?.totalPrice || totalPrice}
            </Text>
            <Text className="bottom-bar-subtitle">
              {toBuyCount} 种食材待购买
            </Text>
          </View>
          <View className="btn btn-primary" onClick={handleBuyAll}>
            一键购齐
          </View>
        </View>
      </View>

      {/* 购买方案弹窗 */}
      {showPlanModal && (
        <View className="modal-mask" onClick={() => setShowPlanModal(false)}>
          <View className="modal-content" onClick={(e) => e.stopPropagation()}>
            <View className="modal-header">
              <Text className="modal-title">选择购买方案</Text>
              <Text className="modal-close" onClick={() => setShowPlanModal(false)}>
                ✕
              </Text>
            </View>

            <ScrollView scrollY className="modal-body">
              {purchasePlans.map((plan) => (
                <View
                  key={plan.id}
                  className={`plan-option ${selectedPlan?.id === plan.id ? 'plan-option-active' : ''}`}
                  onClick={() => {
                    setSelectedPlan(plan);
                    setShowPlanModal(false);
                  }}
                >
                  <View className="plan-option-header">
                    <View>
                      {plan.recommended && (
                        <Text className="plan-badge-small">推荐</Text>
                      )}
                      <Text className="plan-option-title">{plan.title}</Text>
                      <Text className="plan-option-desc">{plan.description}</Text>
                    </View>
                    <Text className="plan-option-price">¥{plan.totalPrice}</Text>
                  </View>

                  <View className="plan-option-channels">
                    {plan.channels.map((channel, idx) => (
                      <View key={idx} className="plan-option-channel">
                        <Text className="channel-name-small">{channel.name}</Text>
                        <Text className="channel-time-small">{channel.deliveryTime}</Text>
                      </View>
                    ))}
                  </View>

                  <Button
                    className="plan-option-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      plan.channels.forEach((channel) => {
                        handleBuyFromPlatform(channel.name, channel.items[0]?.url || '');
                      });
                    }}
                  >
                    立即购买
                  </Button>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
}
