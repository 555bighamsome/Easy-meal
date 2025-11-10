// 菜谱类型
export interface Recipe {
  id: string;
  name: string;
  nameEn: string;
  image: string;
  description: string;
  cookTime: number; // 分钟
  difficulty: 'easy' | 'medium' | 'hard';
  servings: number; // 几人份
  calories: number; // 卡路里
  protein: number; // 蛋白质(g)
  tags: string[];
  mood: MoodType[]; // 适合的心情
  ingredients: Ingredient[];
  steps: CookingStep[];
  nutrition: Nutrition;
}

// 食材类型
export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: IngredientCategory;
  isOptional?: boolean;
}

// 食材分类
export type IngredientCategory =
  | 'vegetable' // 蔬菜
  | 'meat' // 肉类
  | 'seafood' // 海鲜
  | 'egg' // 蛋类
  | 'seasoning' // 调料
  | 'staple' // 主食
  | 'other'; // 其他

// 烹饪步骤
export interface CookingStep {
  step: number;
  description: string;
  image?: string;
  duration?: number; // 这一步需要的时间（分钟）
  tips?: string;
}

// 营养信息
export interface Nutrition {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
}

// 心情类型
export type MoodType =
  | 'healing' // 需要治愈
  | 'celebrate' // 想要庆祝
  | 'tired' // 累到爆炸
  | 'romantic' // 想做给TA吃
  | 'foodie' // 就是想吃好的
  | 'healthy'; // 健康减脂

// 心情选项
export interface MoodOption {
  type: MoodType;
  label: string;
  emoji: string;
  description: string;
}

// 购物清单项
export interface ShoppingListItem {
  ingredient: Ingredient;
  fromRecipes: string[]; // 来自哪些菜谱
  totalAmount: number;
  totalUnit: string;
  checked: boolean;
  inStock?: boolean; // 家里是否有库存
}

// 购买渠道
export interface PurchaseChannel {
  platform: 'hema' | 'meituan' | 'jd' | 'taobao' | 'pdd';
  name: string;
  logo: string;
  items: PurchaseItem[];
  totalPrice: number;
  deliveryTime: string;
  discount?: number;
  minOrder?: number;
}

// 购买商品项
export interface PurchaseItem {
  ingredientId: string;
  productId: string;
  name: string;
  amount: number;
  unit: string;
  price: number;
  url: string;
  inStock: boolean;
}

// 购买方案
export interface PurchasePlan {
  id: string;
  type: 'optimal' | 'fastest' | 'cheapest' | 'single';
  title: string;
  description: string;
  channels: PurchaseChannel[];
  totalPrice: number;
  savings: number;
  deliveryTime: string;
  recommended?: boolean;
}

// 用户偏好
export interface UserPreference {
  dietaryRestrictions: string[]; // 饮食禁忌
  allergies: string[]; // 过敏原
  favoriteCategories: string[]; // 喜欢的菜系
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  budget: 'low' | 'medium' | 'high';
  timeAvailable: number; // 可用时间（分钟）
}
