# Easy Meal 后端API服务

这是一个Node.js后端服务示例，用于聚合各电商平台的API。

## 功能特性

- ✅ 统一的API接口
- ✅ 京东联盟API集成
- ✅ 淘宝联盟API集成
- ✅ 拼多多API集成
- ✅ 智能缓存机制
- ✅ 请求限流保护
- ✅ 错误处理

## 技术栈

- Node.js + Express
- TypeScript
- Redis (缓存)
- 各平台SDK

## 快速开始

### 1. 安装依赖

```bash
cd backend-example
npm install
```

### 2. 配置环境变量

复制 `.env.example` 到 `.env` 并填写你的API密钥：

```bash
cp .env.example .env
```

编辑 `.env`:

```env
# 服务器配置
PORT=3000
NODE_ENV=development

# 京东联盟
JD_APP_KEY=your_jd_app_key
JD_APP_SECRET=your_jd_app_secret

# 淘宝联盟
TAOBAO_APP_KEY=your_taobao_app_key
TAOBAO_APP_SECRET=your_taobao_app_secret

# 拼多多
PDD_CLIENT_ID=your_pdd_client_id
PDD_CLIENT_SECRET=your_pdd_client_secret

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
```

### 3. 运行服务

```bash
# 开发模式
npm run dev

# 生产模式
npm run build
npm start
```

## API文档

### 搜索商品

**请求**
```http
POST /api/search/all
Content-Type: application/json

{
  "keyword": "番茄"
}
```

**响应**
```json
{
  "success": true,
  "data": [
    {
      "id": "jd_123456",
      "name": "新鲜番茄 500g",
      "price": 15.9,
      "platform": "jd",
      "platformName": "京东",
      "image": "https://...",
      "url": "https://...",
      "stock": true,
      "deliveryTime": "次日达"
    }
  ]
}
```

### 批量搜索

```http
POST /api/search/batch
Content-Type: application/json

{
  "keywords": ["番茄", "鸡蛋", "葱"]
}
```

## 如何获取API密钥

### 京东联盟

1. 访问 [京东联盟](https://union.jd.com/)
2. 注册成为推广者
3. 申请API权限
4. 获取 AppKey 和 AppSecret

### 淘宝联盟

1. 访问 [淘宝开放平台](https://open.taobao.com/)
2. 注册开发者账号
3. 创建应用
4. 获取 AppKey 和 AppSecret

### 拼多多

1. 访问 [拼多多开放平台](https://open.pinduoduo.com/)
2. 注册开发者
3. 创建应用
4. 获取 ClientId 和 ClientSecret

## 部署建议

推荐部署到：
- 阿里云函数计算
- 腾讯云云函数
- AWS Lambda
- Vercel (Node.js serverless)

## 费用估算

- 京东联盟：免费，按成交佣金结算
- 淘宝联盟：免费，按成交佣金结算
- 拼多多：免费，按成交佣金结算
- 服务器：约 $5-20/月

## 注意事项

⚠️ **隐私和安全**
- 不要在前端直接使用API密钥
- 所有API调用必须通过后端
- 实现请求频率限制
- 添加用户认证

⚠️ **合规要求**
- 遵守各平台的使用协议
- 正确展示商品信息
- 不得修改商品价格
- 保留平台logo和链接
