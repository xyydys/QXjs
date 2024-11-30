```javascript
// 脚本名称：555影视广告拦截
// 脚本作者：Assistant
// 更新时间：2023-06-14
// 使用说明：在Quantumult X中添加以下重写规则
[rewrite_local]
^https?:\/\/[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+){1,3}(:\d+)?\/api\/v\d\/.* url script-response-body https://raw.githubusercontent.com/xyydys/QXjs/main/adblock555.js
[mitm]
hostname = *.qyfxgd.cn, *.weilai555.com, *.ecoliving168.com
**/

let obj = JSON.parse($response.body);

#通用函数：过滤广告
function filterAds(data) {
  if (Array.isArray(data)) {
    return data.filter(item => {
      if (item.layout === "advert_self") return false;
      if (Array.isArray(item.list)) {
        item.list = filterAds(item.list);
      }
      return item.type !== 3;
    });
  }
  return data;
}

# 应用过滤
if (obj.data) {
  obj.data = filterAds(obj.data);
}

# 移除广告相关字段
['advert', 'advertStatus', 'ads', 'adInfo', 'advert_info', 'advertisement'].forEach(field => {
  if (obj[field]) {
    if (Array.isArray(obj[field])) {
      obj[field] = [];
    } else if (typeof obj[field] === 'object') {
      obj[field] = {};
    } else {
      delete obj[field];
    }
  }
});

$done({body: JSON.stringify(obj)});
```
