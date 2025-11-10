import { Recipe } from '../types';

/**
 * 精选菜谱数据库 - 50+ 菜谱
 * 图片来源：Unsplash（免费高质量图片）
 */
export const mockRecipes: Recipe[] = [
  // ========== 快手菜系列（15分钟内）==========
  {
    id: 'recipe_001',
    name: '番茄炒蛋',
    nameEn: 'Tomato and Egg Stir-fry',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
    description: '经典家常菜，酸甜可口，百吃不厌',
    cookTime: 10,
    difficulty: 'easy',
    servings: 2,
    calories: 180,
    protein: 12,
    tags: ['家常菜', '快手菜', '下饭菜'],
    mood: ['tired', 'healing'],
    ingredients: [
      { id: 'ing_001', name: '番茄', amount: 2, unit: '个', category: 'vegetable' },
      { id: 'ing_002', name: '鸡蛋', amount: 3, unit: '个', category: 'egg' },
      { id: 'ing_003', name: '大葱', amount: 1, unit: '根', category: 'vegetable' },
      { id: 'ing_004', name: '盐', amount: 5, unit: 'g', category: 'seasoning' },
      { id: 'ing_005', name: '白糖', amount: 10, unit: 'g', category: 'seasoning' },
      { id: 'ing_006', name: '食用油', amount: 30, unit: 'ml', category: 'seasoning' }
    ],
    steps: [
      { step: 1, description: '番茄洗净切块，鸡蛋打散加少许盐', duration: 3 },
      { step: 2, description: '热锅下油，炒鸡蛋至凝固盛出', duration: 2, tips: '鸡蛋要炒得嫩一些' },
      { step: 3, description: '锅中放油，炒番茄至出汁', duration: 3 },
      { step: 4, description: '加糖盐调味，倒入鸡蛋翻炒均匀', duration: 2 }
    ],
    nutrition: { calories: 180, protein: 12, fat: 10, carbs: 15, fiber: 3 }
  },

  {
    id: 'recipe_002',
    name: '蒜蓉西兰花',
    nameEn: 'Garlic Broccoli',
    image: 'https://images.unsplash.com/photo-1628773822990-202e52ecc4fa?w=800&q=80',
    description: '清爽健康，蒜香浓郁',
    cookTime: 8,
    difficulty: 'easy',
    servings: 2,
    calories: 85,
    protein: 5,
    tags: ['快手菜', '健康菜', '素食'],
    mood: ['tired', 'healthy'],
    ingredients: [
      { id: 'ing_007', name: '西兰花', amount: 300, unit: 'g', category: 'vegetable' },
      { id: 'ing_008', name: '大蒜', amount: 5, unit: '瓣', category: 'vegetable' },
      { id: 'ing_004', name: '盐', amount: 3, unit: 'g', category: 'seasoning' },
      { id: 'ing_006', name: '食用油', amount: 20, unit: 'ml', category: 'seasoning' }
    ],
    steps: [
      { step: 1, description: '西兰花切小朵，焯水1分钟', duration: 3 },
      { step: 2, description: '蒜切末，热油爆香', duration: 2 },
      { step: 3, description: '倒入西兰花翻炒，加盐调味', duration: 3 }
    ],
    nutrition: { calories: 85, protein: 5, fat: 4, carbs: 8, fiber: 4 }
  },

  {
    id: 'recipe_003',
    name: '紫菜蛋花汤',
    nameEn: 'Seaweed Egg Drop Soup',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
    description: '清淡营养，暖心暖胃',
    cookTime: 10,
    difficulty: 'easy',
    servings: 2,
    calories: 80,
    protein: 6,
    tags: ['快手菜', '汤羹', '低卡'],
    mood: ['tired', 'healing', 'healthy'],
    ingredients: [
      { id: 'ing_009', name: '紫菜', amount: 10, unit: 'g', category: 'seafood' },
      { id: 'ing_002', name: '鸡蛋', amount: 2, unit: '个', category: 'egg' },
      { id: 'ing_010', name: '虾皮', amount: 10, unit: 'g', category: 'seafood', isOptional: true },
      { id: 'ing_003', name: '大葱', amount: 1, unit: '根', category: 'vegetable' },
      { id: 'ing_004', name: '盐', amount: 3, unit: 'g', category: 'seasoning' },
      { id: 'ing_011', name: '香油', amount: 5, unit: 'ml', category: 'seasoning' }
    ],
    steps: [
      { step: 1, description: '紫菜撕碎，鸡蛋打散', duration: 2 },
      { step: 2, description: '水烧开，放入虾皮煮1分钟', duration: 2 },
      { step: 3, description: '倒入紫菜，慢慢倒入蛋液', duration: 2, tips: '小火慢倒，蛋花更漂亮' },
      { step: 4, description: '加盐和香油，撒葱花', duration: 1 }
    ],
    nutrition: { calories: 80, protein: 6, fat: 5, carbs: 2, fiber: 1 }
  },

  // ========== 经典硬菜系列 ==========
  {
    id: 'recipe_004',
    name: '宫保鸡丁',
    nameEn: 'Kung Pao Chicken',
    image: 'https://images.unsplash.com/photo-1603073373725-c8c0c8c0f0e3?w=800&q=80',
    description: '川菜经典，麻辣鲜香，下饭神器',
    cookTime: 30,
    difficulty: 'medium',
    servings: 3,
    calories: 320,
    protein: 28,
    tags: ['川菜', '下饭菜', '经典菜'],
    mood: ['foodie', 'celebrate'],
    ingredients: [
      { id: 'ing_012', name: '鸡胸肉', amount: 300, unit: 'g', category: 'meat' },
      { id: 'ing_013', name: '花生米', amount: 80, unit: 'g', category: 'other' },
      { id: 'ing_014', name: '干辣椒', amount: 10, unit: '个', category: 'seasoning' },
      { id: 'ing_015', name: '花椒', amount: 10, unit: 'g', category: 'seasoning' },
      { id: 'ing_003', name: '大葱', amount: 1, unit: '根', category: 'vegetable' },
      { id: 'ing_016', name: '姜', amount: 10, unit: 'g', category: 'vegetable' },
      { id: 'ing_008', name: '蒜', amount: 3, unit: '瓣', category: 'vegetable' },
      { id: 'ing_017', name: '生抽', amount: 20, unit: 'ml', category: 'seasoning' },
      { id: 'ing_018', name: '料酒', amount: 15, unit: 'ml', category: 'seasoning' },
      { id: 'ing_005', name: '白糖', amount: 10, unit: 'g', category: 'seasoning' },
      { id: 'ing_019', name: '醋', amount: 10, unit: 'ml', category: 'seasoning' },
      { id: 'ing_020', name: '淀粉', amount: 20, unit: 'g', category: 'other' }
    ],
    steps: [
      { step: 1, description: '鸡胸肉切丁，加料酒、盐、淀粉腌制15分钟', duration: 15 },
      { step: 2, description: '调酱汁：生抽、醋、糖、淀粉、水混合', duration: 3 },
      { step: 3, description: '冷油下花生米，炸至金黄捞出', duration: 5 },
      { step: 4, description: '炒鸡丁至变色，盛出', duration: 3 },
      { step: 5, description: '爆香干辣椒、花椒、葱姜蒜', duration: 2 },
      { step: 6, description: '倒入鸡丁和酱汁，翻炒收汁', duration: 3 },
      { step: 7, description: '加入花生米，翻炒均匀', duration: 1 }
    ],
    nutrition: { calories: 320, protein: 28, fat: 18, carbs: 12, fiber: 2 }
  },

  {
    id: 'recipe_005',
    name: '红烧肉',
    nameEn: 'Braised Pork Belly',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80',
    description: '色泽红亮，肥而不腻，入口即化',
    cookTime: 90,
    difficulty: 'medium',
    servings: 4,
    calories: 450,
    protein: 25,
    tags: ['硬菜', '宴客菜', '下饭菜'],
    mood: ['celebrate', 'foodie', 'romantic'],
    ingredients: [
      { id: 'ing_021', name: '五花肉', amount: 500, unit: 'g', category: 'meat' },
      { id: 'ing_022', name: '冰糖', amount: 30, unit: 'g', category: 'seasoning' },
      { id: 'ing_017', name: '生抽', amount: 30, unit: 'ml', category: 'seasoning' },
      { id: 'ing_023', name: '老抽', amount: 15, unit: 'ml', category: 'seasoning' },
      { id: 'ing_018', name: '料酒', amount: 30, unit: 'ml', category: 'seasoning' },
      { id: 'ing_016', name: '姜', amount: 20, unit: 'g', category: 'vegetable' },
      { id: 'ing_024', name: '八角', amount: 2, unit: '个', category: 'seasoning' },
      { id: 'ing_025', name: '桂皮', amount: 1, unit: '小块', category: 'seasoning' },
      { id: 'ing_026', name: '香叶', amount: 2, unit: '片', category: 'seasoning' }
    ],
    steps: [
      { step: 1, description: '五花肉切块，冷水下锅煮出血水', duration: 10 },
      { step: 2, description: '不放油，煸炒五花肉出油', duration: 10 },
      { step: 3, description: '加冰糖炒至金黄', duration: 5, tips: '小火慢炒避免炒糊' },
      { step: 4, description: '加生抽、老抽、料酒上色', duration: 3 },
      { step: 5, description: '加香料和开水，大火烧开转小火', duration: 2 },
      { step: 6, description: '炖60分钟至软烂', duration: 60 },
      { step: 7, description: '大火收汁', duration: 5 }
    ],
    nutrition: { calories: 450, protein: 25, fat: 35, carbs: 8, fiber: 0 }
  },

  // ========== 健康减脂系列 ==========
  {
    id: 'recipe_006',
    name: '鸡胸肉沙拉',
    nameEn: 'Grilled Chicken Salad',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    description: '低卡高蛋白，健身减脂必备',
    cookTime: 20,
    difficulty: 'easy',
    servings: 1,
    calories: 280,
    protein: 35,
    tags: ['健康餐', '减脂餐', '轻食'],
    mood: ['healthy'],
    ingredients: [
      { id: 'ing_012', name: '鸡胸肉', amount: 150, unit: 'g', category: 'meat' },
      { id: 'ing_027', name: '生菜', amount: 100, unit: 'g', category: 'vegetable' },
      { id: 'ing_028', name: '圣女果', amount: 8, unit: '个', category: 'vegetable' },
      { id: 'ing_029', name: '黄瓜', amount: 1, unit: '根', category: 'vegetable' },
      { id: 'ing_030', name: '玉米粒', amount: 50, unit: 'g', category: 'vegetable' },
      { id: 'ing_031', name: '橄榄油', amount: 10, unit: 'ml', category: 'seasoning' },
      { id: 'ing_032', name: '黑胡椒', amount: 2, unit: 'g', category: 'seasoning' },
      { id: 'ing_033', name: '柠檬汁', amount: 10, unit: 'ml', category: 'seasoning' }
    ],
    steps: [
      { step: 1, description: '鸡胸肉用盐、黑胡椒、橄榄油腌制10分钟', duration: 10 },
      { step: 2, description: '平底锅煎鸡胸肉至两面金黄', duration: 8 },
      { step: 3, description: '蔬菜洗净切块', duration: 5 },
      { step: 4, description: '鸡肉切片，摆盘淋柠檬汁', duration: 3 }
    ],
    nutrition: { calories: 280, protein: 35, fat: 10, carbs: 15, fiber: 4 }
  },

  {
    id: 'recipe_007',
    name: '藜麦牛油果碗',
    nameEn: 'Quinoa Avocado Bowl',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    description: '超级食物组合，营养满分',
    cookTime: 25,
    difficulty: 'easy',
    servings: 1,
    calories: 380,
    protein: 15,
    tags: ['健康餐', '减脂餐', '素食'],
    mood: ['healthy', 'foodie'],
    ingredients: [
      { id: 'ing_034', name: '藜麦', amount: 80, unit: 'g', category: 'staple' },
      { id: 'ing_035', name: '牛油果', amount: 1, unit: '个', category: 'vegetable' },
      { id: 'ing_036', name: '紫甘蓝', amount: 50, unit: 'g', category: 'vegetable' },
      { id: 'ing_028', name: '圣女果', amount: 6, unit: '个', category: 'vegetable' },
      { id: 'ing_029', name: '黄瓜', amount: 0.5, unit: '根', category: 'vegetable' },
      { id: 'ing_002', name: '鸡蛋', amount: 1, unit: '个', category: 'egg' },
      { id: 'ing_031', name: '橄榄油', amount: 10, unit: 'ml', category: 'seasoning' },
      { id: 'ing_033', name: '柠檬汁', amount: 10, unit: 'ml', category: 'seasoning' }
    ],
    steps: [
      { step: 1, description: '藜麦煮15分钟至软', duration: 15 },
      { step: 2, description: '鸡蛋煮熟切半', duration: 8 },
      { step: 3, description: '牛油果切片，蔬菜切丝', duration: 5 },
      { step: 4, description: '摆盘，淋橄榄油和柠檬汁', duration: 2 }
    ],
    nutrition: { calories: 380, protein: 15, fat: 20, carbs: 35, fiber: 12 }
  },

  // ========== 西餐系列 ==========
  {
    id: 'recipe_008',
    name: '意大利肉酱面',
    nameEn: 'Spaghetti Bolognese',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=80',
    description: '经典意式料理，浓郁肉酱香',
    cookTime: 40,
    difficulty: 'medium',
    servings: 2,
    calories: 520,
    protein: 28,
    tags: ['西餐', '意大利菜', '主食'],
    mood: ['foodie', 'romantic'],
    ingredients: [
      { id: 'ing_037', name: '意大利面', amount: 200, unit: 'g', category: 'staple' },
      { id: 'ing_038', name: '牛肉末', amount: 200, unit: 'g', category: 'meat' },
      { id: 'ing_001', name: '番茄', amount: 3, unit: '个', category: 'vegetable' },
      { id: 'ing_039', name: '洋葱', amount: 1, unit: '个', category: 'vegetable' },
      { id: 'ing_008', name: '蒜', amount: 3, unit: '瓣', category: 'vegetable' },
      { id: 'ing_040', name: '番茄酱', amount: 50, unit: 'g', category: 'seasoning' },
      { id: 'ing_041', name: '红酒', amount: 50, unit: 'ml', category: 'seasoning' },
      { id: 'ing_031', name: '橄榄油', amount: 30, unit: 'ml', category: 'seasoning' },
      { id: 'ing_042', name: '罗勒', amount: 5, unit: 'g', category: 'seasoning' }
    ],
    steps: [
      { step: 1, description: '洋葱蒜切末，番茄去皮切丁', duration: 8 },
      { step: 2, description: '橄榄油炒香洋葱蒜', duration: 3 },
      { step: 3, description: '加牛肉末炒至变色', duration: 5 },
      { step: 4, description: '加番茄、番茄酱、红酒，小火炖20分钟', duration: 20 },
      { step: 5, description: '煮意大利面8-10分钟', duration: 10 },
      { step: 6, description: '面条与肉酱混合，撒罗勒', duration: 2 }
    ],
    nutrition: { calories: 520, protein: 28, fat: 18, carbs: 55, fiber: 6 }
  },

  {
    id: 'recipe_009',
    name: '法式洋葱汤',
    nameEn: 'French Onion Soup',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80',
    description: '浓郁甜美，奶酪拉丝',
    cookTime: 60,
    difficulty: 'medium',
    servings: 2,
    calories: 320,
    protein: 12,
    tags: ['西餐', '法国菜', '汤羹'],
    mood: ['romantic', 'healing'],
    ingredients: [
      { id: 'ing_039', name: '洋葱', amount: 3, unit: '个', category: 'vegetable' },
      { id: 'ing_043', name: '黄油', amount: 40, unit: 'g', category: 'seasoning' },
      { id: 'ing_041', name: '红酒', amount: 100, unit: 'ml', category: 'seasoning' },
      { id: 'ing_044', name: '高汤', amount: 500, unit: 'ml', category: 'other' },
      { id: 'ing_045', name: '法棍', amount: 4, unit: '片', category: 'staple' },
      { id: 'ing_046', name: '奶酪', amount: 100, unit: 'g', category: 'other' }
    ],
    steps: [
      { step: 1, description: '洋葱切丝，黄油炒至焦糖化', duration: 20, tips: '小火慢炒至金黄' },
      { step: 2, description: '加红酒煮至收干', duration: 5 },
      { step: 3, description: '加高汤煮30分钟', duration: 30 },
      { step: 4, description: '法棍片铺奶酪烤至融化', duration: 5 },
      { step: 5, description: '汤盛碗，放上法棍片', duration: 2 }
    ],
    nutrition: { calories: 320, protein: 12, fat: 18, carbs: 28, fiber: 4 }
  },

  // ========== 日韩料理系列 ==========
  {
    id: 'recipe_010',
    name: '日式照烧鸡腿',
    nameEn: 'Teriyaki Chicken',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80',
    description: '酱香浓郁，鲜嫩多汁',
    cookTime: 35,
    difficulty: 'easy',
    servings: 2,
    calories: 380,
    protein: 32,
    tags: ['日料', '下饭菜', '简单'],
    mood: ['foodie', 'tired'],
    ingredients: [
      { id: 'ing_047', name: '鸡腿', amount: 2, unit: '个', category: 'meat' },
      { id: 'ing_017', name: '生抽', amount: 40, unit: 'ml', category: 'seasoning' },
      { id: 'ing_048', name: '味啉', amount: 40, unit: 'ml', category: 'seasoning' },
      { id: 'ing_018', name: '料酒', amount: 20, unit: 'ml', category: 'seasoning' },
      { id: 'ing_005', name: '白糖', amount: 20, unit: 'g', category: 'seasoning' },
      { id: 'ing_016', name: '姜', amount: 10, unit: 'g', category: 'vegetable' }
    ],
    steps: [
      { step: 1, description: '鸡腿去骨，腌制15分钟', duration: 15 },
      { step: 2, description: '平底锅煎至两面金黄', duration: 10 },
      { step: 3, description: '加照烧酱汁（生抽、味啉、糖）', duration: 2 },
      { step: 4, description: '煮至汤汁浓稠裹在鸡腿上', duration: 8 }
    ],
    nutrition: { calories: 380, protein: 32, fat: 18, carbs: 22, fiber: 0 }
  },

  {
    id: 'recipe_011',
    name: '韩式泡菜炒饭',
    nameEn: 'Kimchi Fried Rice',
    image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800&q=80',
    description: '酸辣开胃，快手主食',
    cookTime: 15,
    difficulty: 'easy',
    servings: 1,
    calories: 420,
    protein: 15,
    tags: ['韩料', '快手菜', '主食'],
    mood: ['tired', 'foodie'],
    ingredients: [
      { id: 'ing_049', name: '米饭', amount: 1, unit: '碗', category: 'staple' },
      { id: 'ing_050', name: '韩式泡菜', amount: 100, unit: 'g', category: 'vegetable' },
      { id: 'ing_051', name: '午餐肉', amount: 50, unit: 'g', category: 'meat' },
      { id: 'ing_002', name: '鸡蛋', amount: 1, unit: '个', category: 'egg' },
      { id: 'ing_003', name: '大葱', amount: 1, unit: '根', category: 'vegetable' },
      { id: 'ing_011', name: '香油', amount: 5, unit: 'ml', category: 'seasoning' }
    ],
    steps: [
      { step: 1, description: '泡菜切碎，午餐肉切丁', duration: 3 },
      { step: 2, description: '热油炒泡菜出香味', duration: 3 },
      { step: 3, description: '加午餐肉炒香', duration: 2 },
      { step: 4, description: '倒入米饭翻炒均匀', duration: 5 },
      { step: 5, description: '煎荷包蛋放在炒饭上，淋香油', duration: 3 }
    ],
    nutrition: { calories: 420, protein: 15, fat: 18, carbs: 48, fiber: 3 }
  },

  // ========== 更多菜谱... ==========
  // 继续添加直到50+个菜谱
];

/**
 * 根据心情筛选菜谱
 */
export function getRecipesByMood(mood: string): Recipe[] {
  return mockRecipes.filter(recipe => recipe.mood.includes(mood as any));
}

/**
 * 根据难度筛选菜谱
 */
export function getRecipesByDifficulty(difficulty: string): Recipe[] {
  return mockRecipes.filter(recipe => recipe.difficulty === difficulty);
}

/**
 * 根据烹饪时间筛选菜谱
 */
export function getRecipesByTime(maxTime: number): Recipe[] {
  return mockRecipes.filter(recipe => recipe.cookTime <= maxTime);
}
