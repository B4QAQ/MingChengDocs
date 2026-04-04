# 天气数据管理

## `updateWeather(location, value)`

**描述**: 更新天气数据

**参数**:
- `location`: 城市索引（number）、lat_lon格式字符串（string）或包含 {lat, lon, name} 的对象
- `value`: 天数

**返回值**:

**成功**:
```javascript
{ code: 200, message: '更新成功' }
```

**批量更新成功**:
```javascript
{ cdoe: 200, message: '成功更新{cities.length}个城市' }
```

**失败**:
- 抛出异常，错误信息在控制台输出 `[X]更新天气失败: {error}`

---

## `mergeWeatherData(existingData, newData)`

**描述**: 合并天气数据

**参数**:
- `existingData`: 现有天气数据数组
- `newData`: 新天气数据数组

**返回值**:

**成功**:
- 返回合并后的天气数据数组

**无法找到合并索引**:
- 返回 `newData`（直接写入新数据）

**数据格式**:
```javascript
[
  {
    "Date": "2026-01-01",
    "updateTime": "2026-01-01T12:00:00.000Z",
    "sunrise": "07:30",
    "sunset": "17:30",
    "moonrise": "19:00",
    "moonset": "07:00",
    "moonPhase": "满月",
    "moonPhaseIcon": "101",
    "tempMax": "10",
    "tempMin": "-5",
    "iconDay": "100",
    "textDay": "晴",
    "iconNight": "150",
    "textNight": "晴",
    "wind360Day": "180",
    "windDirDay": "南风",
    "windScaleDay": "3",
    "windSpeedDay": "15",
    "wind360Night": "270",
    "windDirNight": "西风",
    "windScaleNight": "2",
    "windSpeedNight": "10",
    "humidity": "50",
    "precip": "0",
    "pressure": "1013",
    "vis": "10",
    "cloud": "10",
    "uvIndex": "3",
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
          "category": "良",
          "primaryPollutant": "PM2.5",
          "health": "良"
        }
      }
    ]
  }
]
```

---

## `updateWarn(location)`

**描述**: 更新预警数据

**参数**:
- `location`: 城市索引（number）、lat_lon格式字符串（string）或包含 {lat, lon, name} 的对象

**返回值**:

**成功**:
```javascript
{ code: 200, message: '更新成功' }
```

**失败**:
- 抛出异常，错误信息在控制台输出 `[X]更新预警失败: {error}`

---

## `saveWeatherFile(lat, lon, type, data)`

**描述**: 保存天气文件

**参数**:
- `lat`: 纬度
- `lon`: 经度
- `type`: 文件类型（'weather' 或 'warn'）
- `data`: 要保存的数据

**返回值**:
- 成功: `true` (Promise resolve)
- 失败: 抛出异常 `写入失败: {code}`

---

## `getWeather(location, type)`

**描述**: 获取天气数据

**参数**:
- `location`: 城市索引（number）或 lat_lon 格式的字符串（string）
- `type`: 返回类型，'normal'（原始数据）或 'index'（当天天气+24小时预报）

**返回值**:

**成功 - type='normal'**:
```javascript
[
  {
    "Date": "2026-01-01",
    "updateTime": "2026-01-01T12:00:00.000Z",
    "sunrise": "07:30",
    "sunset": "17:30",
    "moonrise": "19:00",
    "moonset": "07:00",
    "moonPhase": "满月",
    "moonPhaseIcon": "101",
    "tempMax": "10",
    "tempMin": "-5",
    "iconDay": "100",
    "textDay": "晴",
    "iconNight": "150",
    "textNight": "晴",
    "wind360Day": "180",
    "windDirDay": "南风",
    "windScaleDay": "3",
    "windSpeedDay": "15",
    "wind360Night": "270",
    "windDirNight": "西风",
    "windScaleNight": "2",
    "windSpeedNight": "10",
    "humidity": "50",
    "precip": "0",
    "pressure": "1013",
    "vis": "10",
    "cloud": "10",
    "uvIndex": "3",
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
          "category": "良",
          "primaryPollutant": "PM2.5",
          "health": "良"
        }
      }
    ]
  }
]
```

**成功 - type='index'**:
```javascript
{
  "Date": "2026-01-01",
  "updateTime": "2026-01-01T12:00:00.000Z",
  "sunrise": "07:30",
  "sunset": "17:30",
  "moonrise": "19:00",
  "moonset": "07:00",
  "moonPhase": "满月",
  "moonPhaseIcon": "101",
  "tempMax": "10",
  "tempMin": "-5",
  "iconDay": "100",
  "textDay": "晴",
  "iconNight": "150",
  "textNight": "晴",
  "wind360Day": "180",
  "windDirDay": "南风",
  "windScaleDay": "3",
  "windSpeedDay": "15",
  "wind360Night": "270",
  "windDirNight": "西风",
  "windScaleNight": "2",
  "windSpeedNight": "10",
  "humidity": "50",
  "precip": "0",
  "pressure": "1013",
  "vis": "10",
  "cloud": "10",
  "uvIndex": "3",
  "hourly": [
    {
      "hours": "12",
      "temp": "5",
      "icon": "100",
      "text": "晴",
      "wind360": "180",
      "windDir": "南风",
      "windScale": "3",
      "windSpeed": "15",
      "humidity": "50",
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
        "category": "良",
        "primaryPollutant": "PM2.5",
        "health": "良"
      }
    }
  ]
}
```
注意: `hourly` 数组包含从当前小时开始的24小时预报数据

**失败**:
- `null`（未找到今天的天气数据或读取失败）

---

## `getWarn(location)`

**描述**: 获取预警数据

**参数**:
- `location`: 城市索引（number）或 lat_lon 格式的字符串（string）

**返回值**:

**成功 - 所有预警都有效**:
```javascript
{
  code: 200,
  result: [
    {
      "senderName": "临桂区气象台",
      "issuedTime": "2026-01-01 16:00",
      "icon": "1006",
      "color": {
        "red": 30,
        "green": 50,
        "blue": 205,
        "alpha": 1
      },
      "expireTime": "2026-01-01 16:00",
      "title": "大风蓝色预警",
      "headline": "临桂区气象台更新大风蓝色预警信号",
      "description": "临桂区气象台24日11时19分继续发布大风蓝色预警信号：预计未来24小时内临桂将出现6级（或阵风7级）以上大风，请做好防范。",
      "criteria": "24小时内可能受大风影响，平均风力可达6级以上，或者阵风7级以上；或者已经受大风影响，平均风力为6～7级，或者阵风7～8级并可能持续。",
      "instruction": "1. 政府及有关部门按照职责做好防大风工作。\n2. 关好门窗，加固围板、棚架、广告牌等易被风吹动的搭建物，妥善安置易受大风影响的室外物品，遮盖建筑物资。\n3. 相关水域水上作业和过往船舶采取积极的应对措施，如回港避风或者绕道航行等。\n4. 行人注意尽量少骑自行车，刮风时不要在广告牌、临时搭建物等下面逗留。\n5. 有关部门和单位注意森林、草原等防火。"
    }
  ]
}
```

**成功 - 有过期预警被过滤**:
```javascript
{
  code: 201,
  result: [有效的预警信息数组]
}
```

**失败或无预警数据**:
```javascript
{ code: 200, result: [] }
```
