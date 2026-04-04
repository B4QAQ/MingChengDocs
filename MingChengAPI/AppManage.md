---
outline: deep
title: 应用管理API
order: 4
---

# 应用管理API

::: warning
请替换下文示例数据为实际值
:::

## 公告管理

### 获取公告

| 项目 | 内容 |
|------|------|
| **API** | `/api/notice` 或 `/api/notice/:appname` |
| **方法** | POST |
| **描述** | 获取应用公告列表 |
| **权限** | 无 |

#### 请求参数

**方式 1：通过 body 传递 appname**
```json
{
  "appname": "testapp"
}
```

**方式 2：通过路径参数传递**
```
POST /api/notice/testapp
```

**不指定 appname 时，默认获取 API 公告**

#### 返回值

```json
{
  "status": 200,
  "result": [
    {
      "title": "公告标题",
      "time": "2024-01-01 12:00:00",
      "content": "公告内容",
      "type": "info"
    }
  ]
}
```