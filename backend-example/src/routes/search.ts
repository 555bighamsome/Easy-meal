import { Router } from 'express';
import { searchJD } from '../services/jd';
import { searchTaobao } from '../services/taobao';
import { searchPinduoduo } from '../services/pinduoduo';
import { getCachedData, setCachedData } from '../services/cache';

const router = Router();

/**
 * 聚合搜索所有平台
 */
router.post('/all', async (req, res) => {
  try {
    const { keyword } = req.body;

    if (!keyword) {
      return res.status(400).json({
        success: false,
        error: 'keyword is required'
      });
    }

    // 检查缓存
    const cacheKey = `search:all:${keyword}`;
    const cached = await getCachedData(cacheKey);
    if (cached) {
      return res.json({
        success: true,
        data: cached,
        cached: true
      });
    }

    // 并发搜索所有平台
    const [jdResults, taobaoResults, pddResults] = await Promise.allSettled([
      searchJD(keyword),
      searchTaobao(keyword),
      searchPinduoduo(keyword)
    ]);

    const allProducts = [];

    if (jdResults.status === 'fulfilled') {
      allProducts.push(...jdResults.value);
    }
    if (taobaoResults.status === 'fulfilled') {
      allProducts.push(...taobaoResults.value);
    }
    if (pddResults.status === 'fulfilled') {
      allProducts.push(...pddResults.value);
    }

    // 按价格排序
    allProducts.sort((a, b) => a.price - b.price);

    // 缓存结果（1小时）
    await setCachedData(cacheKey, allProducts, 3600);

    res.json({
      success: true,
      data: allProducts,
      cached: false
    });
  } catch (error: any) {
    console.error('Search all error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * 搜索京东
 */
router.post('/jd', async (req, res) => {
  try {
    const { keyword } = req.body;
    const results = await searchJD(keyword);
    res.json({ success: true, data: results });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 搜索淘宝
 */
router.post('/taobao', async (req, res) => {
  try {
    const { keyword } = req.body;
    const results = await searchTaobao(keyword);
    res.json({ success: true, data: results });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 搜索拼多多
 */
router.post('/pinduoduo', async (req, res) => {
  try {
    const { keyword } = req.body;
    const results = await searchPinduoduo(keyword);
    res.json({ success: true, data: results });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 批量搜索
 */
router.post('/batch', async (req, res) => {
  try {
    const { keywords } = req.body;

    if (!Array.isArray(keywords)) {
      return res.status(400).json({
        success: false,
        error: 'keywords must be an array'
      });
    }

    const results = await Promise.all(
      keywords.map(async (keyword) => {
        const cacheKey = `search:all:${keyword}`;
        const cached = await getCachedData(cacheKey);

        if (cached) {
          return { keyword, products: cached };
        }

        const [jd, taobao, pdd] = await Promise.allSettled([
          searchJD(keyword),
          searchTaobao(keyword),
          searchPinduoduo(keyword)
        ]);

        const products = [];
        if (jd.status === 'fulfilled') products.push(...jd.value);
        if (taobao.status === 'fulfilled') products.push(...taobao.value);
        if (pdd.status === 'fulfilled') products.push(...pdd.value);

        products.sort((a, b) => a.price - b.price);

        await setCachedData(cacheKey, products, 3600);

        return { keyword, products };
      })
    );

    res.json({
      success: true,
      data: results
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
