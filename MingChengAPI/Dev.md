---
outline: deep
title: 开发者API
order: 3
---

# 开发者API

## 天气服务

> **注意**：天气服务需要应用在 `useService` 中启用 `weatherAPI` 服务

### 获取天气数据

| 项目 | 内容 |
|------|------|
| **API** | `/api/getWeather/:appname` |
| **方法** | POST |
| **描述** | 获取天气数据 |
| **权限** | 应用 Key |
| **服务要求** | 应用必须启用 `weatherAPI` 服务 |

#### 请求参数

```json
{
  "Key": "设备 Key",
  "days": 7,
  "longitude": "116.404",
  "latitude": "39.915",
  "lang": "zh"
}
```

#### 返回值

```json
{
  "status": 200,
  "result": [
    {
      "Date": "2024-01-01",
      "updateTime": "2024-01-01 00:00:00",
      "sunrise": "07:00",
      "sunset": "17:00",
      "tempMax": "10",
      "tempMin": "0",
      "iconDay": "100",
      "textDay": "晴",
      "iconNight": "100",
      "textNight": "晴",
      "windDirDay": "北",
      "windScaleDay": "1-2",
      "windSpeedDay": "3",
      "windDirNight": "北",
      "windScaleNight": "1-2",
      "windSpeedNight": "3",
      "humidity": "50",
      "precip": "0",
      "pressure": "1013",
      "vis": "10",
      "cloud": "10",
      "uvIndex": "5",
      "hourly": [
        {
          "hours": "0",
          "temp": "-3",
          "icon": "150",
          "text": "晴",
          "wind360": "270",
          "windDir": "西风",
          "windScale": "2",
          "windSpeed": "10",
          "humidity": "60",
          "pop": "0",
          "precip": "0",
          "pressure": "1013",
          "cloud": "10",
          "dew": "-5",
          "air": {
            "code": "良",
            "name": "良",
            "aqi": "60",
            "aqiDisplay": "60",
            "level": "2",
            "color": {
              "red": 0,
              "green": 228,
              "blue": 0,
              "alpha": 1
            },
            "category": "良",
            "primaryPollutant": "PM2.5",
            "health": "良"
          }
        }
      ]
    }
  ]
}
```

**状态码说明**：
- 200: 获取成功
- 400: 参数不完整或应用不存在
- 401: 鉴权失败（Key 无效）
- 403: 应用未启用 weatherAPI 服务
- 500: 天气 API 配置未初始化或服务器内部错误

### 获取天气预警

| 项目 | 内容 |
|------|------|
| **API** | `/api/getWarn/:appname` |
| **方法** | POST |
| **描述** | 获取天气预警信息 |
| **权限** | 应用 Key |
| **服务要求** | 应用必须启用 `weatherAPI` 服务 |

#### 请求参数

```json
{
  "Key": "设备 Key",
  "longitude": "116.404",
  "latitude": "39.915",
  "lang": "zh"
}
```

#### 返回值

```json
{
  "status": 200,
  "result": [
    {
      "id": "123",
      "sender": "北京市气象台",
      "pubTime": "2024-01-01 00:00:00",
      "title": "大风预警",
      "startTime": "2024-01-01 00:00:00",
      "endTime": "2024-01-01 23:59:59",
      "status": "active",
      "level": "黄色",
      "type": "wind",
      "typeName": "大风",
      "text": "预计...",
      "related": []
    }
  ]
}
```

**状态码说明**：
- 200: 获取成功
- 400: 参数不完整或应用不存在
- 401: 鉴权失败
- 403: 应用未启用 weatherAPI 服务
- 500: 天气 API 配置未初始化或服务器内部错误

### 获取天气指数

| 项目 | 内容 |
|------|------|
| **API** | `/api/getIndices/:appname` |
| **方法** | POST |
| **描述** | 获取天气生活指数预报 |
| **权限** | 应用 Key |
| **服务要求** | 应用必须启用 `weatherAPI` 服务 |

#### 请求参数

```json
{
  "Key": "设备 Key",
  "days": 1,
  "longitude": "116.404",
  "latitude": "39.915",
  "lang": "zh"
}
```

#### 返回值

```json
{
  "status": 200,
  "result": [
    {
      "date": "2024-01-01",
      "data": [
        {
          "name": "穿衣指数",
          "level": "3",
          "category": "较冷",
          "text": "建议穿厚外套"
        },
        {
          "name": "洗车指数",
          "level": "2",
          "category": "较适宜",
          "text": "较适宜洗车"
        }
      ]
    }
  ]
}
```

**指数类型**：
- 穿衣指数、紫外线指数、运动指数
- 洗车指数、感冒指数、旅游指数等

**状态码说明**：
- 200: 获取成功
- 400: 参数不完整或应用不存在
- 401: 鉴权失败
- 403: 应用未启用 weatherAPI 服务
- 500: 天气 API 配置未初始化或服务器内部错误

### 获取城市信息

| 项目 | 内容 |
|------|------|
| **API** | `/api/getCity` |
| **方法** | POST |
| **描述** | 获取城市信息列表 |
| **权限** | 无 |

#### 请求参数

```json
{
  "number": 10,
  "lang": "zh"
}
```

#### 返回值

```json
{
  "status": 200,
  "result": [
    {
      "id": "101010100",
      "name": "北京",
      "adm1": "北京市",
      "adm2": "北京",
      "adm3": "朝阳",
      "lat": "39.9042",
      "lon": "116.4074"
    }
  ]
}
```

## 其他

### 获取设备信息

| 项目 | 内容 |
|------|------|
| **API** | `/api/getInfo/:appname` |
| **方法** | POST |
| **描述** | 获取设备详细信息（状态、请求数等） |
| **权限** | 应用 Key |

#### 请求参数

```json
{
  "Key": "设备 Key"
}
```

#### 返回值

```json
{
  "status": 200,
  "result": {
    "DeviceName": "设备名称",
    "status": "pass",
    "requestsMonth": 500,
    "UseRequests": 100,
    "remaining": 400,
    "userType": "normal"
  }
}
```

**状态码说明**：
- 200: 获取成功
- 201: Key 无效
- 400: 参数不完整
- 500: 服务器内部错误

**userType 说明**：
- `banned`: 封禁用户
- `normal`: 普通用户（付费）
- `free`: 免费用户

**状态码说明**：
- 200: 处理成功（即使备注格式不正确也返回 200，避免重复推送）

**处理流程**：
1. 验证回调数据格式
2. 验证备注格式（应用名 +32 位设备 ID）
3. 检查应用是否存在
4. 创建 NoReg 表（如果不存在）
5. 将备注添加到 NoReg 表（使用 INSERT IGNORE 确保幂等性）
