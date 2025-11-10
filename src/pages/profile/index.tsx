import { View, Text } from '@tarojs/components';
import './index.scss';

export default function Profile() {
  return (
    <View className="page profile-page">
      <View className="container">
        <View className="profile-header">
          <Text className="profile-title">我的</Text>
          <Text className="profile-subtitle">Profile</Text>
        </View>

        <View className="profile-card card">
          <View className="avatar">
            <Text className="avatar-text">👤</Text>
          </View>
          <Text className="username">美食爱好者</Text>
          <Text className="user-desc">开始你的美食之旅</Text>
        </View>

        <View className="stats-grid">
          <View className="stat-card card">
            <Text className="stat-value">12</Text>
            <Text className="stat-label">收藏</Text>
          </View>
          <View className="stat-card card">
            <Text className="stat-value">45</Text>
            <Text className="stat-label">做过</Text>
          </View>
          <View className="stat-card card">
            <Text className="stat-value">8</Text>
            <Text className="stat-label">关注</Text>
          </View>
        </View>

        <View className="menu-list">
          <View className="menu-item card">
            <Text className="menu-label">我的菜谱</Text>
            <Text className="menu-arrow">→</Text>
          </View>
          <View className="menu-item card">
            <Text className="menu-label">厨艺等级</Text>
            <Text className="menu-arrow">→</Text>
          </View>
          <View className="menu-item card">
            <Text className="menu-label">设置</Text>
            <Text className="menu-arrow">→</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
