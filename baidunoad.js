 ^https:\/\/pan\.baidu\.com\/api\/getconfig\? reject-dict
^https:\/\/pan\.baidu\.com\/api\/getsyscfg\? reject-dict
^https:\/\/pan\.baidu\.com\/api\/taskscore\/tasklist\? reject-dict
^https:\/\/pan\.baidu\.com\/act\/api\/activityentry\? reject-dict
^https:\/\/pan\.baidu\.com\/rest\/\d\.\d\/pcs\/adv\? reject-dict
^https:\/\/pan\.baidu\.com\/api\/plugin\/get\? reject-dict
^https:\/\/pan\.baidu\.com\/recommend\/query\/list\? reject-dict
^http://example.com/resource1/4/ url reject-dict
 [rewrite_local]
# 匹配你的目标 URL
^https:\/\/pan\.baidu\.com\/feed\/kingkongdistrict\? url script-response-body baidu_feed.js

[mitm]
hostname = pan.baidu.com，api.pc.baidu.com, ad.baidu.com

 /**
 * 百度网盘 feed 流过滤
 * 逻辑：过滤掉 novel, shortplay, print, job_hunt 类型的金刚区图标
 */

let body = $response.body;
try {
    let obj = JSON.parse(body);
    if (obj.data && Array.isArray(obj.data.data)) {
        // 实现你 jq 里的 select(!=) 逻辑
        obj.data.data = obj.data.data.filter(item => {
            const forbiddenTypes = ["novel", "shortplay", "print", "job_hunt"];
            return !forbiddenTypes.includes(item.type);
        });
        $done({ body: JSON.stringify(obj) });
    } else {
        $done({}); // 结构不匹配，原样返回
    }
} catch (e) {
    console.log("百度网盘脚本错误: " + e);
    $done({}); // 解析失败，原样返回
}

 
;^http://example.com/resource1/4/ url reject-dict
