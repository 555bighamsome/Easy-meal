import crypto from 'crypto';
import axios from 'axios';

const TAOBAO_API_URL = 'https://eco.taobao.com/router/rest';
const APP_KEY = process.env.TAOBAO_APP_KEY || '';
const APP_SECRET = process.env.TAOBAO_APP_SECRET || '';

/**
 * 生成淘宝API签名
 */
function generateSign(params: Record<string, any>): string {
  const sortedKeys = Object.keys(params).sort();
  const str = APP_SECRET +
    sortedKeys.map(key => `${key}${params[key]}`).join('') +
    APP_SECRET;
  return crypto.createHash('md5').update(str).digest('hex').toUpperCase();
}

/**
 * 搜索淘宝商品
 * API文档: https://open.taobao.com/api.htm?docId=24515
 */
export async function searchTaobao(keyword: string) {
  try {
    if (!APP_KEY || !APP_SECRET) {
      console.warn('Taobao API credentials not configured');
      return getMockTaobaoProducts(keyword);
    }

    const timestamp = new Date().toISOString().replace(/\.\d{3}Z$/, '+08:00');

    const params = {
      method: 'taobao.tbk.dg.material.optional',
      app_key: APP_KEY,
      timestamp,
      format: 'json',
      v: '2.0',
      sign_method: 'md5',
      q: keyword,
      adzone_id: 'YOUR_ADZONE_ID', // 需要从淘宝联盟获取
      page_size: 20,
      page_no: 1,
      sort: 'total_sales_desc'
    };

    (params as any).sign = generateSign(params);

    const response = await axios.get(TAOBAO_API_URL, {
      params,
      timeout: 5000
    });

    if (response.data.error_response) {
      console.error('Taobao API error:', response.data.error_response);
      return getMockTaobaoProducts(keyword);
    }

    const goods = response.data.tbk_dg_material_optional_response?.result_list?.map_data || [];

    return goods.map((item: any) => ({
      id: `tb_${item.item_id}`,
      name: item.title,
      price: parseFloat(item.zk_final_price),
      originalPrice: item.reserve_price ? parseFloat(item.reserve_price) : undefined,
      platform: 'taobao',
      platformName: '淘宝',
      image: item.pict_url,
      url: item.url,
      stock: true,
      deliveryTime: '2-3天',
      discount: item.coupon_amount || 0
    }));
  } catch (error) {
    console.error('Taobao search error:', error);
    return getMockTaobaoProducts(keyword);
  }
}

function getMockTaobaoProducts(keyword: string) {
  return [
    {
      id: `tb_mock_${Date.now()}`,
      name: `${keyword} - 天猫超市`,
      price: Math.random() * 18 + 8,
      platform: 'taobao',
      platformName: '淘宝',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
      url: 'https://detail.tmall.com/mock',
      stock: true,
      deliveryTime: '2-3天',
      discount: Math.floor(Math.random() * 3)
    }
  ];
}
