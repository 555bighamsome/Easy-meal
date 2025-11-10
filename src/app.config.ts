export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/recipe-detail/index',
    'pages/shopping-list/index',
    'pages/discover/index',
    'pages/profile/index'
  ],
  tabBar: {
    color: '#9E9E9E',
    selectedColor: '#1A1A1A',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/icons/home.png',
        selectedIconPath: 'assets/icons/home-active.png'
      },
      {
        pagePath: 'pages/discover/index',
        text: '发现',
        iconPath: 'assets/icons/discover.png',
        selectedIconPath: 'assets/icons/discover-active.png'
      },
      {
        pagePath: 'pages/shopping-list/index',
        text: '清单',
        iconPath: 'assets/icons/cart.png',
        selectedIconPath: 'assets/icons/cart-active.png'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: 'assets/icons/profile.png',
        selectedIconPath: 'assets/icons/profile-active.png'
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FFFFFF',
    navigationBarTitleText: 'Easy Meal',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F5F5F5'
  }
});

function defineAppConfig(config: any) {
  return config;
}
