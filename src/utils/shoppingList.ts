import { Recipe, Ingredient, ShoppingListItem, PurchasePlan, PurchaseChannel, PurchaseItem } from '../types';

/**
 * 生成购物清单 - 核心功能
 * 1. 提取所有食材
 * 2. 智能合并相同食材
 * 3. 按分类整理
 */
export function generateShoppingList(recipes: Recipe[]): ShoppingListItem[] {
  if (!recipes || recipes.length === 0) return [];

  // 用于合并相同食材的Map
  const ingredientMap = new Map<string, ShoppingListItem>();

  // 遍历所有菜谱的食材
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const key = ingredient.name;

      if (ingredientMap.has(key)) {
        // 已存在，累加数量
        const existing = ingredientMap.get(key)!;
        // 只有单位相同才能累加
        if (existing.totalUnit === ingredient.unit) {
          existing.totalAmount += ingredient.amount;
          existing.fromRecipes.push(recipe.name);
        } else {
          // 单位不同，创建新条目（比如：番茄 2个 和 番茄 100g）
          const newKey = `${key}_${ingredient.unit}`;
          ingredientMap.set(newKey, {
            ingredient,
            fromRecipes: [recipe.name],
            totalAmount: ingredient.amount,
            totalUnit: ingredient.unit,
            checked: false
          });
        }
      } else {
        // 新食材
        ingredientMap.set(key, {
          ingredient,
          fromRecipes: [recipe.name],
          totalAmount: ingredient.amount,
          totalUnit: ingredient.unit,
          checked: false
        });
      }
    });
  });

  // 转换为数组并按分类排序
  const list = Array.from(ingredientMap.values());

  // 排序：蔬菜 -> 肉类 -> 海鲜 -> 蛋类 -> 调料 -> 其他
  const categoryOrder: Record<string, number> = {
    vegetable: 1,
    meat: 2,
    seafood: 3,
    egg: 4,
    seasoning: 5,
    staple: 6,
    other: 7
  };

  return list.sort((a, b) => {
    const orderA = categoryOrder[a.ingredient.category] || 999;
    const orderB = categoryOrder[b.ingredient.category] || 999;
    return orderA - orderB;
  });
}

/**
 * 智能建议优化
 * 例如：鸡蛋5个 -> 建议买6个（一盒装）
 */
export function suggestOptimizations(items: ShoppingListItem[]): string[] {
  const suggestions: string[] = [];

  items.forEach((item) => {
    const { ingredient, totalAmount, totalUnit } = item;

    // 鸡蛋建议整盒购买
    if (ingredient.name === '鸡蛋' && totalUnit === '个') {
      const boxSize = 6;
      const recommended = Math.ceil(totalAmount / boxSize) * boxSize;
      if (recommended > totalAmount) {
        suggestions.push(`鸡蛋从${totalAmount}个调整为${recommended}个（${Math.ceil(totalAmount / boxSize)}盒装），可多做${recommended - totalAmount}个鸡蛋的料理`);
      }
    }

    // 大葱建议整根购买
    if (ingredient.name === '大葱' && totalAmount < 1) {
      suggestions.push(`大葱建议买整根（用不完可以冷藏保存）`);
    }

    // 姜蒜建议多买一些，常用
    if ((ingredient.name === '姜' || ingredient.name === '蒜') && totalAmount < 50) {
      suggestions.push(`${ingredient.name}建议多买一些，日常烹饪常用`);
    }
  });

  return suggestions;
}

/**
 * 检查用户库存（模拟）
 * 真实场景中需要从数据库读取
 */
export function checkUserInventory(items: ShoppingListItem[]): ShoppingListItem[] {
  // 模拟用户家里有的常用调料
  const commonStock = ['盐', '生抽', '料酒', '食用油'];

  return items.map((item) => {
    if (commonStock.includes(item.ingredient.name)) {
      return {
        ...item,
        inStock: true
      };
    }
    return item;
  });
}

/**
 * 计算预计总价
 */
export function calculateTotalPrice(items: ShoppingListItem[]): number {
  // 这里使用模拟价格，真实场景需要从电商平台API获取
  const priceMap: Record<string, number> = {
    '番茄': 4, // 元/个
    '鸡蛋': 1.5, // 元/个
    '大葱': 2, // 元/根
    '盐': 3, // 元/包
    '白糖': 5,
    '食用油': 0,
    '鸡胸肉': 18, // 元/斤
    '花生米': 15,
    '干辣椒': 10,
    '花椒': 12,
    '姜': 8,
    '蒜': 10,
    '生抽': 0,
    '料酒': 0,
    '醋': 6,
    '淀粉': 5,
    '紫菜': 15,
    '虾皮': 20,
    '香油': 12,
    '五花肉': 22,
    '冰糖': 6,
    '老抽': 8,
    '八角': 5,
    '桂皮': 4,
    '香叶': 3,
    '生菜': 5,
    '圣女果': 12,
    '黄瓜': 3,
    '玉米粒': 8,
    '橄榄油': 0,
    '黑胡椒': 8,
    '柠檬汁': 6
  };

  let total = 0;
  items.forEach((item) => {
    if (!item.inStock) {
      const unitPrice = priceMap[item.ingredient.name] || 5;
      // 简化计算，按数量计算
      total += unitPrice * Math.ceil(item.totalAmount);
    }
  });

  return total;
}

/**
 * 生成购买方案（核心创新功能！）
 */
export function generatePurchasePlans(items: ShoppingListItem[]): PurchasePlan[] {
  const plans: PurchasePlan[] = [];

  // 需要购买的食材（排除库存）
  const toBuy = items.filter(item => !item.inStock);

  // 模拟各平台价格和可用性
  const hemarkPrices = simulatePlatformPrices(toBuy, 'hema');
  const meituanPrices = simulatePlatformPrices(toBuy, 'meituan');
  const pddPrices = simulatePlatformPrices(toBuy, 'pdd');

  // 方案1: 推荐方案（智能组合 - 平衡价格和速度）
  const optimalPlan = createOptimalPlan(toBuy, hemarkPrices, meituanPrices, pddPrices);
  plans.push(optimalPlan);

  // 方案2: 极速方案（全在盒马）
  const fastestPlan = createFastestPlan(toBuy, hemarkPrices);
  plans.push(fastestPlan);

  // 方案3: 省钱方案（全在拼多多）
  const cheapestPlan = createCheapestPlan(toBuy, pddPrices);
  plans.push(cheapestPlan);

  return plans;
}

// 模拟平台价格
function simulatePlatformPrices(items: ShoppingListItem[], platform: string): Map<string, PurchaseItem> {
  const prices = new Map<string, PurchaseItem>();

  // 不同平台的价格倍数
  const priceMultiplier = {
    hema: 1.2, // 盒马略贵但快
    meituan: 1.0, // 美团价格适中
    pdd: 0.8 // 拼多多最便宜但慢
  };

  const basePrice: Record<string, number> = {
    '番茄': 8,
    '鸡蛋': 12,
    '大葱': 2,
    '白糖': 5,
    '鸡胸肉': 36,
    '花生米': 15,
    '干辣椒': 10,
    '花椒': 12,
    '姜': 8,
    '蒜': 6,
    '醋': 6,
    '淀粉': 5,
    '紫菜': 15,
    '虾皮': 20,
    '香油': 12,
    '五花肉': 45,
    '冰糖': 6,
    '老抽': 8,
    '八角': 5,
    '桂皮': 4,
    '香叶': 3,
    '生菜': 5,
    '圣女果': 18,
    '黄瓜': 3,
    '玉米粒': 8,
    '黑胡椒': 8,
    '柠檬汁': 6
  };

  const multiplier = priceMultiplier[platform as keyof typeof priceMultiplier] || 1;

  items.forEach((item) => {
    const base = basePrice[item.ingredient.name] || 10;
    const price = Math.round(base * multiplier);

    // 模拟部分商品缺货（拼多多可能缺新鲜食材）
    const inStock = platform === 'pdd' && item.ingredient.category === 'vegetable'
      ? Math.random() > 0.3 // 30%缺货率
      : true;

    prices.set(item.ingredient.id, {
      ingredientId: item.ingredient.id,
      productId: `${platform}_${item.ingredient.id}`,
      name: item.ingredient.name,
      amount: item.totalAmount,
      unit: item.totalUnit,
      price,
      url: `${platform}://product/${item.ingredient.id}`,
      inStock
    });
  });

  return prices;
}

// 创建推荐方案（智能组合）
function createOptimalPlan(
  items: ShoppingListItem[],
  hema: Map<string, PurchaseItem>,
  meituan: Map<string, PurchaseItem>,
  pdd: Map<string, PurchaseItem>
): PurchasePlan {
  const hemaItems: PurchaseItem[] = [];
  const pddItems: PurchaseItem[] = [];

  let totalPrice = 0;

  items.forEach((item) => {
    const hemaItem = hema.get(item.ingredient.id);
    const pddItem = pdd.get(item.ingredient.id);

    // 新鲜食材走盒马（快）
    if (item.ingredient.category === 'vegetable' || item.ingredient.category === 'meat' || item.ingredient.category === 'seafood' || item.ingredient.category === 'egg') {
      if (hemaItem && hemaItem.inStock) {
        hemaItems.push(hemaItem);
        totalPrice += hemaItem.price;
      }
    } else {
      // 调料等可以走拼多多（便宜）
      if (pddItem && pddItem.inStock) {
        pddItems.push(pddItem);
        totalPrice += pddItem.price;
      } else if (hemaItem && hemaItem.inStock) {
        hemaItems.push(hemaItem);
        totalPrice += hemaItem.price;
      }
    }
  });

  const channels: PurchaseChannel[] = [];

  if (hemaItems.length > 0) {
    const hemaTotal = hemaItems.reduce((sum, item) => sum + item.price, 0);
    channels.push({
      platform: 'hema',
      name: '盒马鲜生',
      logo: 'https://img.alicdn.com/imgextra/i1/O1CN01l8LqQq1YXZqZ0x0xQ_!!6000000003066-2-tps-200-200.png',
      items: hemaItems,
      totalPrice: hemaTotal,
      deliveryTime: '30分钟',
      discount: 5
    });
  }

  if (pddItems.length > 0) {
    const pddTotal = pddItems.reduce((sum, item) => sum + item.price, 0);
    channels.push({
      platform: 'pdd',
      name: '拼多多',
      logo: 'https://commimg.pddpic.com/mms_static/2023-08-31/ea7da12a-ed8c-4b84-a11e-a4a0a7a79f59.png',
      items: pddItems,
      totalPrice: pddTotal,
      deliveryTime: '次日达',
      discount: 0
    });
  }

  // 计算节省金额（对比全在盒马买）
  const allHemaPrice = items.reduce((sum, item) => {
    const hemaItem = hema.get(item.ingredient.id);
    return sum + (hemaItem?.price || 0);
  }, 0);

  return {
    id: 'plan_optimal',
    type: 'optimal',
    title: '推荐方案',
    description: `新鲜食材30分钟达，调料次日达`,
    channels,
    totalPrice: totalPrice - 5,
    savings: allHemaPrice - totalPrice + 5,
    deliveryTime: '今天30分钟 + 明天送达',
    recommended: true
  };
}

// 创建极速方案
function createFastestPlan(items: ShoppingListItem[], hema: Map<string, PurchaseItem>): PurchasePlan {
  const hemaItems: PurchaseItem[] = [];
  let totalPrice = 0;

  items.forEach((item) => {
    const hemaItem = hema.get(item.ingredient.id);
    if (hemaItem && hemaItem.inStock) {
      hemaItems.push(hemaItem);
      totalPrice += hemaItem.price;
    }
  });

  return {
    id: 'plan_fastest',
    type: 'fastest',
    title: '极速方案',
    description: '全部商品30分钟送达',
    channels: [
      {
        platform: 'hema',
        name: '盒马鲜生',
        logo: 'https://img.alicdn.com/imgextra/i1/O1CN01l8LqQq1YXZqZ0x0xQ_!!6000000003066-2-tps-200-200.png',
        items: hemaItems,
        totalPrice,
        deliveryTime: '30分钟',
        discount: 0
      }
    ],
    totalPrice,
    savings: 0,
    deliveryTime: '30分钟'
  };
}

// 创建省钱方案
function createCheapestPlan(items: ShoppingListItem[], pdd: Map<string, PurchaseItem>): PurchasePlan {
  const pddItems: PurchaseItem[] = [];
  let totalPrice = 0;
  let missingCount = 0;

  items.forEach((item) => {
    const pddItem = pdd.get(item.ingredient.id);
    if (pddItem && pddItem.inStock) {
      pddItems.push(pddItem);
      totalPrice += pddItem.price;
    } else {
      missingCount++;
    }
  });

  return {
    id: 'plan_cheapest',
    type: 'cheapest',
    title: '省钱方案',
    description: missingCount > 0 ? `缺${missingCount}种食材，需2天配送` : '全部商品包邮次日达',
    channels: [
      {
        platform: 'pdd',
        name: '拼多多',
        logo: 'https://commimg.pddpic.com/mms_static/2023-08-31/ea7da12a-ed8c-4b84-a11e-a4a0a7a79f59.png',
        items: pddItems,
        totalPrice,
        deliveryTime: '次日达',
        discount: 0
      }
    ],
    totalPrice,
    savings: 0,
    deliveryTime: '次日达'
  };
}

/**
 * 调整份量
 */
export function adjustServings(recipe: Recipe, targetServings: number): Recipe {
  const ratio = targetServings / recipe.servings;

  return {
    ...recipe,
    servings: targetServings,
    ingredients: recipe.ingredients.map(ing => ({
      ...ing,
      amount: ing.amount * ratio
    }))
  };
}
