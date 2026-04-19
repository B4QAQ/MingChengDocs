---
outline: deep
title: 授权API
order: 2
---

# 授权API

## 设备验证

### 设备验证（重定向到爱发电）

| 项目 | 内容 |
|------|------|
| **API** | `/verify/:appname` |
| **方法** | GET |
| **描述** | 设备验证，生成设备 Key 并重定向到爱发电支付页面 |
| **权限** | 无 |

#### 请求参数

Query 参数：
- `data`: URL 编码的数据字符串，格式为 `deviceName.deviceID.onlyID.timestamp`
  - `deviceName`: 设备名称
  - `deviceID`: 设备 ID
  - `onlyID`: 设备唯一标识
  - `timestamp`: 时间戳（Unix 时间戳，5 分钟有效期）

**示例**：
```
GET /verify/testapp?data=xxx.xxx.xxx.xxx
```

#### 返回值

**重定向**：
- 成功：302 重定向到爱发电支付页面
- 失败：返回 JSON 错误信息

```json
{
  "status": 400,
  "result": "参数不完整"
}
```

**状态码说明**：
- 302: 重定向成功
- 400: 参数不完整/应用不存在
- 500: 生成 Key 失败

### 设备验证检查

| 项目 | 内容 |
|------|------|
| **API** | `/verifyCheck/:appname` |
| **方法** | GET |
| **描述** | 检查设备授权状态，返回签名后的 APIKey |
| **权限** | 无 |

#### 请求参数

Query 参数：
- `data`: URL 编码的数据字符串，格式为 `deviceName.deviceID.onlyID.timestamp`

**示例**：
```
GET /verifyCheck/testapp?data=xxx.xxx.xxx.xxx
```

#### 返回值

```json
{
  "status": 200,
  "result": {
    "APIKey": "signed_api_key",
    "signature": "signature"
  }
}
```
#### 应用建议
返回的APIKey不要直接存储，要经过signature验证签名后在进行存储  
针对于Vela设备，代码如下：
```JavaScript
crypto.verify({
  data: Req.result.APIKey,
  algo: 'RSA-SHA256',
  publicKey: this.pubKey, //替换为你的公钥
  signature: Req.result.signature,
  success: (res) => {
    try{
      prompt.showToast({message: '验证成功',duration: 2000})
      //这里就可以保存APIKey了
    }catch(e){
      prompt.showToast({message: JSON.stringify(e),duration: 2000})
    }
  },
  fail: function(data, code) {
    prompt.showToast({message: '签名验证失败' + code,duration: 2000})
  }
});
```
**状态码说明**：
- 200: 验证通过
- 201: 设备未找到
- 400: 参数不完整/应用不存在
- 403: 设备被封禁
- 500: 验证失败
