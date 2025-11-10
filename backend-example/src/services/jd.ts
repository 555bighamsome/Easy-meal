import crypto from 'crypto';
import axios from 'axios';

const JD_API_URL = 'https://api.jd.com/routerjson';
const APP_KEY = process.env.JD_APP_KEY || '';
const APP_SECRET = process.env.JD_APP_SECRET || '';

/**
 * 生成京东API签名
 */
function generateSign(params: Record<string, any>): string {
  const sortedKeys = Object.keys(params).sort();
  const str = APP_SECRET +
    sortedKeys.map(key => `${key}${params[key]}`).join('') +
    APP_SECRET;
  return crypto.createHash('md5').update(str).digest('hex').toUpperCase();
}

/**
 * 搜索京东商品
 * API文档: https://union.jd.com/openplatform/api
 */
export async function searchJD(keyword: string) {
  try {
    if (!APP_KEY || !APP_SECRET) {
      console.warn('JD API credentials not configured');
      return getMockJDProducts(keyword);
    }

    const timestamp = new Date().toISOString().replace(/[:-]/g, '').split('.')[0];

    const params = {
      method: 'jd.union.open.goods.query',
      app_key: APP_KEY,
      timestamp,
      format: 'json',
      v: '1.0',
      sign_method: 'md5',
      param_json: JSON.stringify({
        keyword,
        pageIndex: 1,
        pageSize: 20,
        sortName: 'price',
        sort: 'asc'
      })
    };

    // 生成签名
    (params as any).sign = generateSign(params);

    const response = await axios.get(JD_API_URL, {
      params,
      timeout: 5000
    });

    if (response.data.error_response) {
      console.error('JD API error:', response.data.error_response);
      return getMockJDProducts(keyword);
    }

    const goods = response.data.jd_union_open_goods_query_response?.result?.data || [];

    return goods.map((item: any) => ({
      id: `jd_${item.skuId}`,
      name: item.skuName,
      price: parseFloat(item.price),
      originalPrice: item.originalPrice ? parseFloat(item.originalPrice) : undefined,
      platform: 'jd',
      platformName: '京东',
      image: item.imageUrl,
      url: item.materialUrl,
      appId: 'wx91d27dbf599dff74',
      path: `/pages/item/item?skuId=${item.skuId}`,
      stock: true,
      deliveryTime: '次日达',
      discount: item.couponInfo?.discount || 0
    }));
  } catch (error) {
    console.error('JD search error:', error);
    return getMockJDProducts(keyword);
  }
}

/**
 * 模拟京东商品数据（用于测试）
 */
function getMockJDProducts(keyword: string) {
  return [
    {
      id: `jd_mock_${Date.now()}`,
      name: `${keyword} - 京东自营`,
      price: Math.random() * 20 + 10,
      originalPrice: Math.random() * 30 + 15,
      platform: 'jd',
      platformName: '京东',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
      url: 'https://item.jd.com/mock',
      appId: 'wx91d27dbf599dff74',
      stock: true,
      deliveryTime: '次日达',
      discount: Math.floor(Math.random() * 5)
    }
  ];
}
