# 智能天气预测

## `predictHourlyData(weatherData, nowHour)`

**描述**: 基于日数据预测小时级天气数据

**参数**:
- `weatherData`: 天气数据数组（至少包含1天）
- `nowHour`: 当前小时（0-23，默认0）

**返回值**:

**成功**:
```javascript
{
  Date: "2026-01-01",
  sunrise: "07:00",
  sunset: "18:00",
  tempMax: "25",
  tempMin: "15",
  iconDay: "100",
  iconNight: "150",
  textDay: "晴",
  textNight: "晴",
  windDirDay: "南风",
  windDirNight: "北风",
  windScaleDay: "3",
  windScaleNight: "2",
  windSpeedDay: "15",
  windSpeedNight: "10",
  humidity: "60",
  precip: "0",
  pressure: "1013",
  cloud: "20",
  hourly: [
    {
      hours: "00",
      temp: "16",
      icon: "150",
      text: "晴",
      windDir: "北风",
      windScale: "2",
      windSpeed: "10",
      wind360: "0",
      humidity: "70",
      pop: "0",
      precip: "0",
      pressure: "1013",
      cloud: "30",
      dew: "12"
    },
    // ... 24小时数据
  ],
  AutoPrediction: true
}
```

**数据不足或格式错误**:
```javascript
null
```

---

## `predictIndices(weatherData)`

**描述**: 预测天气指数

**参数**:
- `weatherData`: 天气数据对象

**返回值**:

```javascript
[
  {
    name: "防晒",
    icon: "sun",
    level: "需要",
    desc: "紫外线较强，注意防晒"
  },
  {
    name: "穿衣",
    icon: "wear",
    level: "短袖",
    desc: "薄外套"
  },
  {
    name: "洗车",
    icon: "car",
    level: "适宜",
    desc: "适宜"
  },
  {
    name: "感冒",
    icon: "cold",
    level: "少发",
    desc: "注意保暖"
  },
  {
    name: "运动",
    icon: "sport",
    level: "适宜",
    desc: "适合运动"
  },
  {
    name: "带伞",
    icon: "umbrella",
    level: "无需",
    desc: "不需要"
  }
]
```

---

## 计算函数说明

### `WIND_DIR_MAP`

风向映射表，将中文风向转换为角度：

| 风向 | 角度 |
|------|------|
| 北风 | 0 |
| 东北风 | 45 |
| 东风 | 90 |
| 东南风 | 135 |
| 南风 | 180 |
| 西南风 | 225 |
| 西风 | 270 |
| 西北风 | 315 |

### 内部计算函数

- `calcTemp()`: 计算温度
- `calcText()`: 计算天气文字
- `calcHumidity()`: 计算湿度
- `calcPop()`: 计算降水概率
- `calcPressure()`: 计算气压
- `calcCloud()`: 计算云量

---

## 使用示例

```javascript
import { predictHourlyData, predictIndices } from './autoPrediction.js'

// 预测小时级数据
const dailyWeather = [
  {
    Date: "2026-01-01",
    sunrise: "07:00",
    sunset: "18:00",
    tempMax: "25",
    tempMin: "15",
    // ... 其他日数据字段
  }
]

const hourlyData = predictHourlyData(dailyWeather, 12)
console.log(hourlyData.hourly) // 24小时预报数据

// 预测天气指数
const indices = predictIndices(hourlyData)
console.log(indices) // 防晒、穿衣、洗车等指数
```