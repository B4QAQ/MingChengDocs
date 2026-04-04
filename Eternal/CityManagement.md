# 城市管理

## `readCityList()`

**描述**: 读取城市列表

**返回值**:

**成功**:
```javascript
[
  {
    "name": "北京",
    "lat": "39.9042",
    "lon": "116.4074",
    "adm2": "北京",
    "adm1": "北京市",
    "country": "中国",
    "fxLink": "https://h5.qweather.com/weather/beijing/101010100.html",
    "isGeoCity": false
  }
]
```

**无数据**:
```javascript
[]
```

---

## `writeCityList(cities)`

**描述**: 写入城市列表

**参数**:
- `cities`: 城市数组

**返回值**:
- 成功: `undefined` (Promise resolve)
- 失败: 抛出异常 `City file locked`

---

## `addCity(cityInfo)`

**描述**: 添加城市

**参数**:
- `cityInfo`: 城市信息对象

**返回值**:

**成功**:
```javascript
{ code: 200, message: '添加成功' }
```

**城市已存在**:
```javascript
{ code: 201, message: '城市已存在' }
```

---

## `deleteCity(lat, lon)`

**描述**: 删除城市

**参数**:
- `lat`: 纬度
- `lon`: 经度

**返回值**:
```javascript
{ code: 200, message: '删除成功' }
```

---

## `editCity(index, newCityInfo)`

**描述**: 编辑城市

**参数**:
- `index`: 城市索引
- `newCityInfo`: 新城市信息对象

**返回值**:

**成功**:
```javascript
{ code: 200, message: '修改成功' }
```

**城市不存在**:
```javascript
{ code: 404, message: '城市不存在' }
```

---

## `updateGeoCity()`

**描述**: 更新定位城市

**返回值**:

**成功 - 定位城市已更新**:
```javascript
{ code: 200, message: '定位城市已更新' }
```

**成功 - 定位城市已添加**:
```javascript
{ code: 200, message: '定位城市已添加' }
```

**失败 - 定位失败**:
```javascript
{ code: 500, message: '定位失败' }
```

**失败 - 获取城市信息失败**:
```javascript
{ code: 500, message: '获取城市信息失败' }
```

**失败 - 更新定位城市失败**:
```javascript
{ code: 500, message: '更新定位城市失败' }
```

---

## `getAllCitiesWeather()`

**描述**: 获取所有城市天气

**返回值**:

**成功**:
```javascript
[
  {
    "name": "北京",
    "currentTemp": "15",
    "todayTemp": "15°/5°",
    "weather": "晴"
  }
]
```

**无数据**:
```javascript
[]
```
