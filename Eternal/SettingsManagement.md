# 设置管理

## `getSettings()`

**描述**: 获取设置

**返回值**:

**成功**:
```javascript
{
  code: 200,
  result: [
    {
      "title": "设置项名称",
      "val": "设置值",
      "type": "list"
    }
  ]
}
```

**无数据或文件锁定**:
```javascript
{ code: 200, result: [] }
```

---

## `saveSettings(settingsArray)`

**描述**: 保存设置

**参数**:
- `settingsArray`: 设置数组

**返回值**:

**成功**:
```javascript
{ code: 200, savedCount: number }
```

**失败**:
- 抛出异常 `Settings locked`
