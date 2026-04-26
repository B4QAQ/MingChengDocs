# 基础文件操作

## `readJsonFile(path)`

**描述**: 读取JSON文件

**参数**:
- `path`: 文件路径

**返回值**:

**成功**:
- 返回解析后的JSON对象

**失败或文件不存在**:
- `null`


## `writeJsonFile(path, data)`

**描述**: 写入JSON文件

**参数**:
- `path`: 文件路径
- `data`: 要写入的数据

**返回值**:

**成功**:
- `true` (Promise resolve)

**失败**:
- 抛出异常 `写入失败: {code}`


## `deleteDir(path)`

**描述**: 删除目录

**参数**:
- `path`: 目录路径

**返回值**:

**成功**:
- `true` (Promise resolve)

**失败**:
- `false` (Promise resolve)


## `deleteFile(path)`

**描述**: 删除文件

**参数**:
- `path`: 文件路径

**返回值**:

**成功**:
- `true` (Promise resolve)

**失败**:
- `false` (Promise resolve)
