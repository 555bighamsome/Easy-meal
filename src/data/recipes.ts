import { Recipe } from '../types';

export const mockRecipes: Recipe[] = [
  {
    id: 'recipe_001',
    name: '番茄炒蛋',
    nameEn: 'Tomato and Egg Stir-fry',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800',
    description: '经典家常菜，酸甜可口，百吃不厌',
    cookTime: 15,
    difficulty: 'easy',
    servings: 2,
    calories: 180,
    protein: 12,
    tags: ['家常菜', '快手菜', '下饭菜'],
    mood: ['tired', 'healing'],
    ingredients: [
      {
        id: 'ing_001',
        name: '番茄',
        amount: 2,
        unit: '个',
        category: 'vegetable'
      },
      {
        id: 'ing_002',
        name: '鸡蛋',
        amount: 3,
        unit: '个',
        category: 'egg'
      },
      {
        id: 'ing_003',
        name: '大葱',
        amount: 1,
        unit: '根',
        category: 'vegetable'
      },
      {
        id: 'ing_004',
        name: '盐',
        amount: 5,
        unit: 'g',
        category: 'seasoning'
      },
      {
        id: 'ing_005',
        name: '白糖',
        amount: 10,
        unit: 'g',
        category: 'seasoning'
      },
      {
        id: 'ing_006',
        name: '食用油',
        amount: 30,
        unit: 'ml',
        category: 'seasoning'
      }
    ],
    steps: [
      {
        step: 1,
        description: '番茄洗净，切成小块。鸡蛋打入碗中，加少许盐打散。',
        duration: 3,
        tips: '番茄切小块更容易出汁'
      },
      {
        step: 2,
        description: '热锅下油，油温六成热时倒入蛋液，快速翻炒至凝固，盛出备用。',
        duration: 2,
        tips: '鸡蛋要炒得嫩一些，稍微凝固就可以盛出'
      },
      {
        step: 3,
        description: '锅中再加少许油，放入葱花爆香，倒入番茄块翻炒。',
        duration: 3
      },
      {
        step: 4,
        description: '番茄炒出汁后，加入白糖和盐调味，倒入炒好的鸡蛋。',
        duration: 5,
        tips: '加糖可以中和番茄的酸味'
      },
      {
        step: 5,
        description: '快速翻炒均匀，让蛋和番茄充分融合，即可出锅。',
        duration: 2
      }
    ],
    nutrition: {
      calories: 180,
      protein: 12,
      fat: 10,
      carbs: 15,
      fiber: 3
    }
  },
  {
    id: 'recipe_002',
    name: '宫保鸡丁',
    nameEn: 'Kung Pao Chicken',
    image: 'https://images.unsplash.com/photo-1603073373725-c8c0c8c0f0e3?w=800',
    description: '川菜经典，麻辣鲜香，下饭神器',
    cookTime: 30,
    difficulty: 'medium',
    servings: 3,
    calories: 320,
    protein: 28,
    tags: ['川菜', '下饭菜', '经典菜'],
    mood: ['foodie', 'celebrate'],
    ingredients: [
      {
        id: 'ing_007',
        name: '鸡胸肉',
        amount: 300,
        unit: 'g',
        category: 'meat'
      },
      {
        id: 'ing_008',
        name: '花生米',
        amount: 80,
        unit: 'g',
        category: 'other'
      },
      {
        id: 'ing_009',
        name: '干辣椒',
        amount: 10,
        unit: '个',
        category: 'seasoning'
      },
      {
        id: 'ing_010',
        name: '花椒',
        amount: 10,
        unit: 'g',
        category: 'seasoning'
      },
      {
        id: 'ing_003',
        name: '大葱',
        amount: 1,
        unit: '根',
        category: 'vegetable'
      },
      {
        id: 'ing_011',
        name: '姜',
        amount: 10,
        unit: 'g',
        category: 'vegetable'
      },
      {
        id: 'ing_012',
        name: '蒜',
        amount: 3,
        unit: '瓣',
        category: 'vegetable'
      },
      {
        id: 'ing_013',
        name: '生抽',
        amount: 20,
        unit: 'ml',
        category: 'seasoning'
      },
      {
        id: 'ing_014',
        name: '料酒',
        amount: 15,
        unit: 'ml',
        category: 'seasoning'
      },
      {
        id: 'ing_005',
        name: '白糖',
        amount: 10,
        unit: 'g',
        category: 'seasoning'
      },
      {
        id: 'ing_015',
        name: '醋',
        amount: 10,
        unit: 'ml',
        category: 'seasoning'
      },
      {
        id: 'ing_016',
        name: '淀粉',
        amount: 20,
        unit: 'g',
        category: 'other'
      }
    ],
    steps: [
      {
        step: 1,
        description: '鸡胸肉切丁，加料酒、盐、淀粉腌制15分钟。',
        duration: 15,
        tips: '腌制可以让鸡肉更嫩'
      },
      {
        step: 2,
        description: '调酱汁：生抽、醋、白糖、淀粉、少许水混合均匀。',
        duration: 3
      },
      {
        step: 3,
        description: '热锅凉油，放入花生米小火炸至金黄，捞出备用。',
        duration: 5,
        tips: '冷油下锅炸花生不容易糊'
      },
      {
        step: 4,
        description: '锅中留底油，放入鸡丁滑炒至变色，盛出。',
        duration: 3
      },
      {
        step: 5,
        description: '锅中放油，下干辣椒、花椒爆香，加葱姜蒜炒香。',
        duration: 2,
        tips: '小火慢炒，避免辣椒炒糊'
      },
      {
        step: 6,
        description: '倒入鸡丁翻炒，淋入酱汁，快速翻炒至收汁。',
        duration: 3
      },
      {
        step: 7,
        description: '最后加入花生米翻炒均匀，即可出锅。',
        duration: 1
      }
    ],
    nutrition: {
      calories: 320,
      protein: 28,
      fat: 18,
      carbs: 12,
      fiber: 2
    }
  },
  {
    id: 'recipe_003',
    name: '紫菜蛋花汤',
    nameEn: 'Seaweed Egg Drop Soup',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800',
    description: '清淡营养，简单快手，适合各个季节',
    cookTime: 10,
    difficulty: 'easy',
    servings: 2,
    calories: 80,
    protein: 6,
    tags: ['快手菜', '汤羹', '低卡'],
    mood: ['tired', 'healing', 'healthy'],
    ingredients: [
      {
        id: 'ing_017',
        name: '紫菜',
        amount: 10,
        unit: 'g',
        category: 'seafood'
      },
      {
        id: 'ing_002',
        name: '鸡蛋',
        amount: 2,
        unit: '个',
        category: 'egg'
      },
      {
        id: 'ing_018',
        name: '虾皮',
        amount: 10,
        unit: 'g',
        category: 'seafood',
        isOptional: true
      },
      {
        id: 'ing_003',
        name: '大葱',
        amount: 1,
        unit: '根',
        category: 'vegetable'
      },
      {
        id: 'ing_004',
        name: '盐',
        amount: 3,
        unit: 'g',
        category: 'seasoning'
      },
      {
        id: 'ing_019',
        name: '香油',
        amount: 5,
        unit: 'ml',
        category: 'seasoning'
      }
    ],
    steps: [
      {
        step: 1,
        description: '紫菜撕成小片，放入碗中。鸡蛋打散备用。',
        duration: 2
      },
      {
        step: 2,
        description: '锅中加水烧开，放入虾皮煮1分钟。',
        duration: 2,
        tips: '虾皮可以增加鲜味'
      },
      {
        step: 3,
        description: '水开后，倒入紫菜，煮30秒。',
        duration: 1
      },
      {
        step: 4,
        description: '转小火，慢慢倒入蛋液，边倒边搅拌，形成蛋花。',
        duration: 2,
        tips: '小火慢倒，蛋花更漂亮'
      },
      {
        step: 5,
        description: '加盐调味，撒上葱花，淋少许香油即可。',
        duration: 1
      }
    ],
    nutrition: {
      calories: 80,
      protein: 6,
      fat: 5,
      carbs: 2,
      fiber: 1
    }
  },
  {
    id: 'recipe_004',
    name: '红烧肉',
    nameEn: 'Braised Pork Belly',
    image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800',
    description: '色泽红亮，肥而不腻，入口即化',
    cookTime: 90,
    difficulty: 'medium',
    servings: 4,
    calories: 450,
    protein: 25,
    tags: ['硬菜', '宴客菜', '下饭菜'],
    mood: ['celebrate', 'foodie', 'romantic'],
    ingredients: [
      {
        id: 'ing_020',
        name: '五花肉',
        amount: 500,
        unit: 'g',
        category: 'meat'
      },
      {
        id: 'ing_021',
        name: '冰糖',
        amount: 30,
        unit: 'g',
        category: 'seasoning'
      },
      {
        id: 'ing_013',
        name: '生抽',
        amount: 30,
        unit: 'ml',
        category: 'seasoning'
      },
      {
        id: 'ing_022',
        name: '老抽',
        amount: 15,
        unit: 'ml',
        category: 'seasoning'
      },
      {
        id: 'ing_014',
        name: '料酒',
        amount: 30,
        unit: 'ml',
        category: 'seasoning'
      },
      {
        id: 'ing_011',
        name: '姜',
        amount: 20,
        unit: 'g',
        category: 'vegetable'
      },
      {
        id: 'ing_023',
        name: '八角',
        amount: 2,
        unit: '个',
        category: 'seasoning'
      },
      {
        id: 'ing_024',
        name: '桂皮',
        amount: 1,
        unit: '小块',
        category: 'seasoning'
      },
      {
        id: 'ing_025',
        name: '香叶',
        amount: 2,
        unit: '片',
        category: 'seasoning'
      }
    ],
    steps: [
      {
        step: 1,
        description: '五花肉切成2cm见方的块，冷水下锅，加姜片和料酒，煮出血水后捞出。',
        duration: 10,
        tips: '冷水下锅更容易去除血水'
      },
      {
        step: 2,
        description: '锅中不放油，放入五花肉小火煸炒，炒出油脂。',
        duration: 10,
        tips: '煸炒可以让红烧肉不油腻'
      },
      {
        step: 3,
        description: '加入冰糖，小火炒至糖色金黄。',
        duration: 5,
        tips: '炒糖色要小火慢炒，避免炒糊'
      },
      {
        step: 4,
        description: '加入生抽、老抽、料酒翻炒上色。',
        duration: 3
      },
      {
        step: 5,
        description: '加入八角、桂皮、香叶，倒入开水没过肉块。',
        duration: 2,
        tips: '一定要加开水，冷水会让肉变硬'
      },
      {
        step: 6,
        description: '大火烧开后转小火，盖上锅盖炖60分钟。',
        duration: 60,
        tips: '小火慢炖，肉才会软烂'
      },
      {
        step: 7,
        description: '大火收汁，汤汁浓稠即可出锅。',
        duration: 5
      }
    ],
    nutrition: {
      calories: 450,
      protein: 25,
      fat: 35,
      carbs: 8,
      fiber: 0
    }
  },
  {
    id: 'recipe_005',
    name: '鸡胸肉沙拉',
    nameEn: 'Grilled Chicken Salad',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    description: '低卡高蛋白，健身减脂必备',
    cookTime: 20,
    difficulty: 'easy',
    servings: 1,
    calories: 280,
    protein: 35,
    tags: ['健康餐', '减脂餐', '轻食'],
    mood: ['healthy'],
    ingredients: [
      {
        id: 'ing_007',
        name: '鸡胸肉',
        amount: 150,
        unit: 'g',
        category: 'meat'
      },
      {
        id: 'ing_026',
        name: '生菜',
        amount: 100,
        unit: 'g',
        category: 'vegetable'
      },
      {
        id: 'ing_027',
        name: '圣女果',
        amount: 8,
        unit: '个',
        category: 'vegetable'
      },
      {
        id: 'ing_028',
        name: '黄瓜',
        amount: 1,
        unit: '根',
        category: 'vegetable'
      },
      {
        id: 'ing_029',
        name: '玉米粒',
        amount: 50,
        unit: 'g',
        category: 'vegetable'
      },
      {
        id: 'ing_030',
        name: '橄榄油',
        amount: 10,
        unit: 'ml',
        category: 'seasoning'
      },
      {
        id: 'ing_031',
        name: '黑胡椒',
        amount: 2,
        unit: 'g',
        category: 'seasoning'
      },
      {
        id: 'ing_004',
        name: '盐',
        amount: 3,
        unit: 'g',
        category: 'seasoning'
      },
      {
        id: 'ing_032',
        name: '柠檬汁',
        amount: 10,
        unit: 'ml',
        category: 'seasoning'
      }
    ],
    steps: [
      {
        step: 1,
        description: '鸡胸肉用盐、黑胡椒、橄榄油腌制10分钟。',
        duration: 10
      },
      {
        step: 2,
        description: '平底锅加热，放入鸡胸肉煎至两面金黄，熟透。',
        duration: 8,
        tips: '中小火煎，避免外焦里生'
      },
      {
        step: 3,
        description: '生菜、黄瓜洗净切块，圣女果对半切开。',
        duration: 5
      },
      {
        step: 4,
        description: '将所有蔬菜放入碗中，加入玉米粒。',
        duration: 2
      },
      {
        step: 5,
        description: '鸡胸肉切片，放在蔬菜上，淋上柠檬汁和橄榄油即可。',
        duration: 3,
        tips: '柠檬汁可以提鲜，让沙拉更清爽'
      }
    ],
    nutrition: {
      calories: 280,
      protein: 35,
      fat: 10,
      carbs: 15,
      fiber: 4
    }
  }
];
