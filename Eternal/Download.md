# 多线程文件下载

## 全局状态

### `global.downloadStatus`

下载状态对象：

```javascript
{
  total: 0,      // 总任务数
  completed: 0,   // 已完成数
  failed: 0,     // 失败数
  running: 0     // 运行中数
}
```

### `global.downloadQueue`

下载任务队列数组。

### `global.downloadListeners`

事件监听器对象：

```javascript
{
  complete: [],  // 下载完成监听器
  fail: []       // 下载失败监听器
}
```



## `addDownload(url, targetPath, options)`

**描述**: 添加下载任务

**参数**:
- `url`: 下载地址
- `targetPath`: 目标路径（最终保存位置）
- `options`: 配置项 `{ header }`（可选）

**返回值**:
- 无返回值

**示例**:
```javascript
import { addDownload } from './download.js'

addDownload('https://example.com/file.zip', 'internal://files/downloads/file.zip')
addDownload('https://example.com/image.png', 'internal://files/images/photo.png', {
  header: { 'Authorization': 'Bearer xxx' }
})
```



## `onDownloadEvent(event, callback)`

**描述**: 订阅下载事件

**参数**:
- `event`: 事件名（`'complete'` 或 `'fail'`）
- `callback`: 回调函数

**返回值**:
- 取消订阅函数

**示例**:
```javascript
import { onDownloadEvent } from './download.js'

const unsubscribeComplete = onDownloadEvent('complete', (result) => {
  console.log('下载完成:', result)
  // result = { code: 0, uri: '...', total: 10, completed: 5 }
})

const unsubscribeFail = onDownloadEvent('fail', (error) => {
  console.log('下载失败:', error)
  // error = { code: xxx, message: '...', total: 10, failed: 1 }
})

// 取消订阅
unsubscribeComplete()
unsubscribeFail()
```



## `clearDownloadQueue()`

**描述**: 清空下载队列（不清除状态）

**返回值**:
- 无返回值



## `resetDownloadStatus()`

**描述**: 重置下载状态

**返回值**:
- 无返回值

**效果**:
```javascript
global.downloadQueue = []
global.downloadStatus = { total: 0, completed: 0, failed: 0, running: 0 }
```



## 下载事件结果格式

### 成功结果 (`complete`)

```javascript
{
  code: 0,
  uri: 'internal://files/downloads/file.zip',
  total: 10,
  completed: 5
}
```

### 失败结果 (`fail`)

```javascript
{
  code: '下载失败原因代码',
  message: '下载失败: xxx',
  total: 10,
  failed: 1
}
```



## 常量

### `MAX_THREAD`

最大并发下载线程数：`3`



## 使用示例

```javascript
import { addDownload, onDownloadEvent, clearDownloadQueue, resetDownloadStatus } from './download.js'

// 订阅下载完成事件
onDownloadEvent('complete', (result) => {
  console.log(`下载进度: ${result.completed}/${result.total}`)
  if (result.completed === result.total) {
    console.log('全部下载完成!')
  }
})

// 订阅下载失败事件
onDownloadEvent('fail', (error) => {
  console.error('下载失败:', error.message)
})

// 添加下载任务
for (let i = 0; i < 10; i++) {
  addDownload(`https://example.com/file${i}.zip`, `internal://files/downloads/file${i}.zip`)
}

// 清空队列（不清除状态）
// clearDownloadQueue()

// 重置所有状态
// resetDownloadStatus()
```