 # 基本开发指南
本应用支持开发者为其开发LUA表盘  
## 应用基本信息
### 应用包名`moe.mcns.Eternal`  
### 版本代号（文档编辑时）`Next`  
### 应用版本（文档编辑时）`260426`  
## 城市列表文件  
### 存储位置  
`internal://files/weather/citylist.json`  
### 存储格式

使用MingChengAPI `/api/3f/getCity` 返回格式  
[点击查看格式](/MingChengAPI/Dev.html#获取城市信息)

## 城市天气信息

### 存储位置
`internal://files/weather/weatherdata/{lat}_{lon}/weather.json`   
::: tip
请替换{lat}为城市纬度，{lon}为城市经度  
lat和lon数据均在citylist中有存储  
:::
### 存储格式

使用MingChengAPI `/api/3f/getWeather` 返回格式  
[点击查看格式](/MingChengAPI/Dev.html#获取天气信息)

## 城市预警信息

### 存储位置
`internal://files/weather/weatherdata/{lat}_{lon}/warn.json`   
::: tip
请替换{lat}为城市纬度，{lon}为城市经度  
lat和lon数据均在citylist中有存储  
:::
### 存储格式
使用MingChengAPI `/api/3f/getWarn` 返回格式  
[点击查看格式](/MingChengAPI/Dev.html#获取天气预警)
