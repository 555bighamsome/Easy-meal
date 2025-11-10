import { View, Text, Input } from '@tarojs/components';
import { useState } from 'react';
import './index.scss';

interface FilterOptions {
  difficulty?: 'easy' | 'medium' | 'hard';
  maxTime?: number;
  searchText?: string;
}

interface RecipeFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export default function RecipeFilter({ onFilterChange }: RecipeFilterProps) {
  const [difficulty, setDifficulty] = useState<string>('');
  const [timeRange, setTimeRange] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');

  const difficultyOptions = [
    { value: '', label: '全部', labelEn: 'All' },
    { value: 'easy', label: '简单', labelEn: 'Easy' },
    { value: 'medium', label: '中等', labelEn: 'Medium' },
    { value: 'hard', label: '复杂', labelEn: 'Hard' }
  ];

  const timeRangeOptions = [
    { value: '', label: '不限', maxTime: undefined },
    { value: 'quick', label: '快手菜', maxTime: 20 },
    { value: 'normal', label: '常规', maxTime: 45 },
    { value: 'long', label: '耗时', maxTime: 999 }
  ];

  const handleDifficultyChange = (value: string) => {
    setDifficulty(value);
    updateFilters(value, timeRange, searchText);
  };

  const handleTimeChange = (value: string) => {
    setTimeRange(value);
    updateFilters(difficulty, value, searchText);
  };

  const handleSearchChange = (e: any) => {
    const text = e.detail.value;
    setSearchText(text);
    updateFilters(difficulty, timeRange, text);
  };

  const updateFilters = (diff: string, time: string, search: string) => {
    const timeOption = timeRangeOptions.find(opt => opt.value === time);

    onFilterChange({
      difficulty: diff as any || undefined,
      maxTime: timeOption?.maxTime,
      searchText: search || undefined
    });
  };

  const clearFilters = () => {
    setDifficulty('');
    setTimeRange('');
    setSearchText('');
    onFilterChange({});
  };

  const hasActiveFilters = difficulty || timeRange || searchText;

  return (
    <View className="recipe-filter">
      {/* 搜索框 */}
      <View className="filter-search">
        <View className="search-icon">🔍</View>
        <Input
          className="search-input"
          placeholder="搜索菜谱名称或食材"
          value={searchText}
          onInput={handleSearchChange}
        />
        {searchText && (
          <View className="search-clear" onClick={() => handleSearchChange({ detail: { value: '' } })}>
            <Text className="search-clear-icon">✕</Text>
          </View>
        )}
      </View>

      {/* 筛选条件 */}
      <View className="filter-section">
        <View className="filter-label">
          <Text className="filter-label-text">难度</Text>
        </View>
        <View className="filter-options">
          {difficultyOptions.map(option => (
            <View
              key={option.value}
              className={`filter-tag ${difficulty === option.value ? 'filter-tag-active' : ''}`}
              onClick={() => handleDifficultyChange(option.value)}
            >
              <Text className="filter-tag-text">{option.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="filter-section">
        <View className="filter-label">
          <Text className="filter-label-text">时间</Text>
        </View>
        <View className="filter-options">
          {timeRangeOptions.map(option => (
            <View
              key={option.value}
              className={`filter-tag ${timeRange === option.value ? 'filter-tag-active' : ''}`}
              onClick={() => handleTimeChange(option.value)}
            >
              <Text className="filter-tag-text">
                {option.label}
                {option.maxTime && option.maxTime < 999 && (
                  <Text className="filter-tag-time"> ≤{option.maxTime}min</Text>
                )}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 清除按钮 */}
      {hasActiveFilters && (
        <View className="filter-clear" onClick={clearFilters}>
          <Text className="filter-clear-text">清除筛选</Text>
        </View>
      )}
    </View>
  );
}
