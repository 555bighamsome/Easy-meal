/**
 * API服务层 - 统一管理所有平台的API调用
 */
import Taro from '@tarojs/taro';

// API配置
const API_CONFIG = {
  // 京东联盟 API（需要申请appKey和appSecret）
  jd: {
    baseUrl: 'https://api.jd.com/routerjson',
    appKey: process.env.JD_APP_KEY || 'YOUR_JD_APP_KEY',
    appSecret: process.env.JD_APP_SECRET || 'YOUR_JD_APP_SECRET'
  },
  // 淘宝联盟 API
  taobao: {
    baseUrl: 'https://eco.taobao.com/router/rest',
    appKey: process.env.TAOBAO_APP_KEY || 'YOUR_TAOBAO_APP_KEY',
    appSecret: process.env.TAOBAO_APP_SECRET || 'YOUR_TAOBAO_APP_SECRET'
  },
  // 拼多多 API
  pinduoduo: {
    baseUrl: 'https://gw-api.pinduoduo.com/api/router',
    clientId: process.env.PDD_CLIENT_ID || 'YOUR_PDD_CLIENT_ID',
    clientSecret: process.env.PDD_CLIENT_SECRET || 'YOUR_PDD_CLIENT_SECRET'
  },
  // 自建后端服务（推荐方案）
  backend: {
    baseUrl: process.env.BACKEND_URL || 'https://your-backend-api.com/api'
  }
};

export interface ProductSearchResult {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  platform: 'jd' | 'taobao' | 'pinduoduo' | 'hema' | 'meituan';
  platformName: string;
  image: string;
  url: string;
  appId?: string; // 小程序AppID
  path?: string;  // 小程序页面路径
  stock: boolean;
  deliveryTime: string;
  discount?: number;
}

/**
 * 搜索商品 - 聚合多个平台
 */
export async function searchProducts(keyword: string): Promise<ProductSearchResult[]> {
  try {
    // 方案1: 如果有后端服务，直接调用后端聚合接口
    if (API_CONFIG.backend.baseUrl !== 'https://your-backend-api.com/api') {
      return await searchFromBackend(keyword);
    }

    // 方案2: 小程序端直接调用各平台API（需要各平台appKey）
    const results = await Promise.allSettled([
      searchJD(keyword),
      searchTaobao(keyword),
      searchPinduoduo(keyword)
    ]);

    // 合并结果
    const products: ProductSearchResult[] = [];
    results.forEach((result) => {
      if (result.status === 'fulfilled' && result.value) {
        products.push(...result.value);
      }
    });

    return products.sort((a, b) => a.price - b.price);
  } catch (error) {
    console.error('搜索商品失败:', error);
    // 降级方案：返回模拟数据
    return getMockProducts(keyword);
  }
}

/**
 * 京东联盟API搜索
 */
async function searchJD(keyword: string): Promise<ProductSearchResult[]> {
  try {
    // 京东联盟API需要签名，实际使用时需要在后端实现
    const response = await Taro.request({
      url: `${API_CONFIG.backend.baseUrl}/search/jd`,
      method: 'POST',
      data: { keyword }
    });

    if (response.statusCode === 200 && response.data.success) {
      return response.data.data.map((item: any) => ({
        id: `jd_${item.skuId}`,
        name: item.skuName,
        price: parseFloat(item.price),
        originalPrice: item.originalPrice ? parseFloat(item.originalPrice) : undefined,
        platform: 'jd',
        platformName: '京东',
        image: item.imageUrl,
        url: item.materialUrl,
        appId: 'wx91d27dbf599dff74', // 京东小程序AppID
        path: `/pages/item/item?skuId=${item.skuId}`,
        stock: true,
        deliveryTime: '次日达',
        discount: item.couponDiscount
      }));
    }
    return [];
  } catch (error) {
    console.error('京东搜索失败:', error);
    return [];
  }
}

/**
 * 淘宝联盟API搜索
 */
async function searchTaobao(keyword: string): Promise<ProductSearchResult[]> {
  try {
    const response = await Taro.request({
      url: `${API_CONFIG.backend.baseUrl}/search/taobao`,
      method: 'POST',
      data: { keyword }
    });

    if (response.statusCode === 200 && response.data.success) {
      return response.data.data.map((item: any) => ({
        id: `tb_${item.itemId}`,
        name: item.title,
        price: parseFloat(item.zkFinalPrice),
        originalPrice: item.reservePrice ? parseFloat(item.reservePrice) : undefined,
        platform: 'taobao',
        platformName: '淘宝',
        image: item.pictUrl,
        url: item.url,
        stock: true,
        deliveryTime: '2-3天',
        discount: item.couponAmount
      }));
    }
    return [];
  } catch (error) {
    console.error('淘宝搜索失败:', error);
    return [];
  }
}

/**
 * 拼多多API搜索
 */
async function searchPinduoduo(keyword: string): Promise<ProductSearchResult[]> {
  try {
    const response = await Taro.request({
      url: `${API_CONFIG.backend.baseUrl}/search/pinduoduo`,
      method: 'POST',
      data: { keyword }
    });

    if (response.statusCode === 200 && response.data.success) {
      return response.data.data.map((item: any) => ({
        id: `pdd_${item.goodsId}`,
        name: item.goodsName,
        price: parseFloat(item.minGroupPrice) / 100,
        originalPrice: item.marketPrice ? parseFloat(item.marketPrice) / 100 : undefined,
        platform: 'pinduoduo',
        platformName: '拼多多',
        image: item.goodsImageUrl,
        url: item.url,
        appId: 'wx32540bd863b27570', // 拼多多小程序AppID
        path: `/pages/goods/goods?goods_id=${item.goodsId}`,
        stock: true,
        deliveryTime: '次日达',
        discount: item.couponDiscount
      }));
    }
    return [];
  } catch (error) {
    console.error('拼多多搜索失败:', error);
    return [];
  }
}

/**
 * 后端聚合服务搜索
 */
async function searchFromBackend(keyword: string): Promise<ProductSearchResult[]> {
  const response = await Taro.request({
    url: `${API_CONFIG.backend.baseUrl}/search/all`,
    method: 'POST',
    data: { keyword }
  });

  if (response.statusCode === 200 && response.data.success) {
    return response.data.data;
  }
  return [];
}

/**
 * 跳转到平台小程序购买
 */
export function navigateToPlatform(product: ProductSearchResult) {
  if (product.appId && product.path) {
    // 跳转到对应平台小程序
    Taro.navigateToMiniProgram({
      appId: product.appId,
      path: product.path,
      success: () => {
        console.log('跳转成功');
      },
      fail: (err) => {
        console.error('跳转失败:', err);
        // 降级方案：复制链接到剪贴板
        if (product.url) {
          Taro.setClipboardData({
            data: product.url,
            success: () => {
              Taro.showToast({
                title: '链接已复制，请在浏览器打开',
                icon: 'none'
              });
            }
          });
        }
      }
    });
  } else if (product.url) {
    // 复制链接
    Taro.setClipboardData({
      data: product.url,
      success: () => {
        Taro.showToast({
          title: '链接已复制',
          icon: 'success'
        });
      }
    });
  }
}

/**
 * 降级方案：模拟数据
 */
function getMockProducts(keyword: string): ProductSearchResult[] {
  // 基于关键词返回模拟数据
  const baseProducts = [
    {
      id: 'mock_jd_1',
      name: `${keyword} - 京东自营`,
      price: 15.9,
      originalPrice: 19.9,
      platform: 'jd' as const,
      platformName: '京东',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
      url: 'https://item.jd.com/xxx',
      appId: 'wx91d27dbf599dff74',
      stock: true,
      deliveryTime: '次日达',
      discount: 4
    },
    {
      id: 'mock_tb_1',
      name: `新鲜${keyword} - 天猫超市`,
      price: 12.8,
      platform: 'taobao' as const,
      platformName: '淘宝',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
      url: 'https://detail.tmall.com/xxx',
      stock: true,
      deliveryTime: '2-3天',
      discount: 3
    },
    {
      id: 'mock_pdd_1',
      name: `产地直发${keyword}`,
      price: 9.9,
      originalPrice: 14.9,
      platform: 'pinduoduo' as const,
      platformName: '拼多多',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
      url: 'https://mobile.yangkeduo.com/xxx',
      appId: 'wx32540bd863b27570',
      stock: true,
      deliveryTime: '次日达',
      discount: 5
    }
  ];

  return baseProducts;
}

/**
 * 批量搜索食材
 */
export async function batchSearchIngredients(
  ingredients: string[]
): Promise<Map<string, ProductSearchResult[]>> {
  const resultMap = new Map<string, ProductSearchResult[]>();

  // 并发搜索所有食材
  const searches = ingredients.map(async (ingredient) => {
    const products = await searchProducts(ingredient);
    resultMap.set(ingredient, products);
  });

  await Promise.all(searches);
  return resultMap;
}

/**
 * 获取最优购买方案
 */
export function getOptimalPurchasePlan(
  ingredientProducts: Map<string, ProductSearchResult[]>
) {
  // 实现智能算法：
  // 1. 计算每个平台的总价
  // 2. 考虑运费（满减优惠）
  // 3. 考虑配送时间
  // 4. 生成推荐方案

  const platforms = ['jd', 'taobao', 'pinduoduo'] as const;
  const plans = platforms.map((platform) => {
    let totalPrice = 0;
    let items: ProductSearchResult[] = [];

    ingredientProducts.forEach((products) => {
      const platformProduct = products.find((p) => p.platform === platform);
      if (platformProduct) {
        totalPrice += platformProduct.price;
        items.push(platformProduct);
      }
    });

    return {
      platform,
      totalPrice,
      items,
      deliveryFee: totalPrice > 49 ? 0 : 6
    };
  });

  return plans.sort((a, b) =>
    (a.totalPrice + a.deliveryFee) - (b.totalPrice + b.deliveryFee)
  );
}
