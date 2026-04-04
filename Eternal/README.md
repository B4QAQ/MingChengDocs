# Eternal 相关文档

本文为 Eternal 相关文档，支持开发者为其开发LUA表盘，依照Storage.js或getWeather.js直接二次开发其他天气APP
![Powered by MingChengAPI](https://img.shields.io/badge/Powered_by-MingChengAPI-brightgreen)
## 文档列表
### 开发者使用文档
1.[开发者API](./DevUse.md) - 含有Eternal的存储逻辑和存储位置
### Storage.js - 主要的数据合并/保存/获取函数逻辑
2. [初始化相关](./Initialization.md) - 包含 `init()` 和 `createDir()` 函数的返回值说明
3. [天气数据管理](./WeatherDataManagement.md) - 包含天气数据更新、合并、保存和获取相关函数的返回值说明
4. [城市管理](./CityManagement.md) - 包含城市列表读取、写入、添加、删除、编辑和定位相关函数的返回值说明
5. [设置管理](./SettingsManagement.md) - 包含设置获取和保存相关函数的返回值说明
6. [基础文件操作](./BasicFileOperations.md) - 包含 JSON 文件读写、目录和文件删除相关函数的返回值说明

## 状态码说明

| 状态码 | 说明 |
|--------|------|
| 200 | 操作成功 |
| 201 | 预警有过期项被过滤 |
| 404 | 城市不存在 |
| 429 | 请求繁忙（定位已锁定） |
| 500 | 服务器内部错误或操作失败 |

## 注意事项

- 所有异步函数都返回 Promise
- 文件操作失败时通常返回 `null` 或 `false`，而不是抛出异常
- 城市文件和设置文件有锁机制，防止并发写入
- 预警数据会自动过滤过期项，并通过状态码 201 标识
- 天气数据合并逻辑会替换相同日期的数据，保留不同日期的数据
