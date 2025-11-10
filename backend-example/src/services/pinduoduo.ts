import crypto from 'crypto';
import axios from 'axios';

const PDD_API_URL = 'https://gw-api.pinduoduo.com/api/router';
const CLIENT_ID = process.env.PDD_CLIENT_ID || '';
const CLIENT_SECRET = process.env.PDD_CLIENT_SECRET || '';

/**
 * 生成拼多多API签名
 */
function generateSign(params: Record<string, any>): string {
  const sortedKeys = Object.keys(params).sort();
  const str = CLIENT_SECRET +
    sortedKeys.map(key => `${key}${params[key]}`).join('') +
    CLIENT_SECRET;
  return crypto.createHash('md5').update(str).digest('hex').toUpperCase();
}

/**
 * 搜索拼多多商品
 * API文档: https://open.pinduoduo.com/
 */
export async function searchPinduoduo(keyword: string) {
  try {
    if (!CLIENT_ID || !CLIENT_SECRET) {
      console.warn('Pinduoduo API credentials not configured');
      return getMockPDDProducts(keyword);
    }

    const timestamp = Math.floor(Date.now() / 1000);

    const params = {
      type: 'pdd.ddk.goods.search',
      client_id: CLIENT_ID,
      timestamp,
      data_type: 'JSON',
      keyword,
      page: 1,
      page_size: 20,
      sort_type: 0 // 综合排序
    };

    (params as any).sign = generateSign(params);

    const response = await axios.post(PDD_API_URL, params, {
      timeout: 5000
    });

    if (response.data.error_response) {
      console.error('PDD API error:', response.data.error_response);
      return getMockPDDProducts(keyword);
    }

    const goods = response.data.goods_search_response?.goods_list || [];

    return goods.map((item: any) => ({
      id: `pdd_${item.goods_id}`,
      name: item.goods_name,
      price: item.min_group_price / 100,
      originalPrice: item.market_price ? item.market_price / 100 : undefined,
      platform: 'pinduoduo',
      platformName: '拼多多',
      image: item.goods_thumbnail_url,
      url: item.goods_sign,
      appId: 'wx32540bd863b27570',
      path: `/pages/goods/goods?goods_id=${item.goods_id}`,
      stock: true,
      deliveryTime: '次日达',
      discount: item.coupon_discount / 100 || 0
    }));
  } catch (error) {
    console.error('PDD search error:', error);
    return getMockPDDProducts(keyword);
  }
}

function getMockPDDProducts(keyword: string) {
  return [
    {
      id: `pdd_mock_${Date.now()}`,
      name: `产地直发${keyword}`,
      price: Math.random() * 12 + 5,
      originalPrice: Math.random() * 20 + 10,
      platform: 'pinduoduo',
      platformName: '拼多多',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
      url: 'https://mobile.yangkeduo.com/mock',
      appId: 'wx32540bd863b27570',
      stock: true,
      deliveryTime: '次日达',
      discount: Math.floor(Math.random() * 5)
    }
  ];
}
