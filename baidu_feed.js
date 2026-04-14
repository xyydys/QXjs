 let body = $response.body;
try {
    let obj = JSON.parse(body);
    if (obj.data && Array.isArray(obj.data.data)) {
        obj.data.data = obj.data.data.filter(item => {
            const forbiddenTypes = ["novel", "shortplay", "print", "job_hunt"];
            return !forbiddenTypes.includes(item.type);
        });
        $done({ body: JSON.stringify(obj) });
    } else {
        $done({});
    }
} catch (e) {
    console.log("百度网盘脚本错误: " + e);
    $done({});
}
