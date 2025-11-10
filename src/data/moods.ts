import { MoodOption } from '../types';

export const moodOptions: MoodOption[] = [
  {
    type: 'healing',
    label: '需要被治愈',
    emoji: '😌',
    description: '来碗温暖的汤，抚慰疲惫的心'
  },
  {
    type: 'celebrate',
    label: '想要庆祝',
    emoji: '🎉',
    description: '整个硬菜，庆祝美好时刻'
  },
  {
    type: 'tired',
    label: '累到爆炸',
    emoji: '😫',
    description: '15分钟快手菜，简单又好吃'
  },
  {
    type: 'romantic',
    label: '想做给TA吃',
    emoji: '🥰',
    description: '用心做一顿，爱意满满'
  },
  {
    type: 'foodie',
    label: '就是想吃好的',
    emoji: '😋',
    description: '满足你的味蕾，享受美食'
  },
  {
    type: 'healthy',
    label: '健康减脂中',
    emoji: '💪',
    description: '低卡高蛋白，健康又美味'
  }
];
