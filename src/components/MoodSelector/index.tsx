import { View, Text } from '@tarojs/components';
import { useState } from 'react';
import { MoodType } from '../../types';
import { moodOptions } from '../../data/moods';
import './index.scss';

interface MoodSelectorProps {
  onSelect: (mood: MoodType) => void;
  selectedMood?: MoodType;
}

export default function MoodSelector({ onSelect, selectedMood }: MoodSelectorProps) {
  const handleSelect = (mood: MoodType) => {
    onSelect(mood);
  };

  return (
    <View className="mood-selector">
      <View className="mood-header">
        <Text className="mood-title">今天的心情</Text>
        <Text className="mood-subtitle">Today's Mood</Text>
      </View>

      <View className="mood-grid">
        {moodOptions.map((mood) => (
          <View
            key={mood.type}
            className={`mood-card ${selectedMood === mood.type ? 'mood-card-active' : ''}`}
            onClick={() => handleSelect(mood.type)}
          >
            <Text className="mood-emoji">{mood.emoji}</Text>
            <Text className="mood-label">{mood.label}</Text>
            <Text className="mood-desc">{mood.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
