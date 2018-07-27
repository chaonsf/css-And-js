const request=require("request");
const crypto=require("crypto");
const md5=require("md5")
const common=require("./common")


module.exports={
    async reqResult({json,url}){
        function result(){
            var crypted=common.encypt(JSON.stringify(json),common.key,common.iv);
            var md=JSON.stringify(json)+common.key;
            var result=md5(md).toLowerCase().split("-");
            var token="";
            for(let j=0;j<result.length;j++){
                token+=result[j]
            }
            return new Promise((resolve, reject) => {
                request({
                        url:url,
                        method:"POST",
                        headers: {
                            "Content-Type": "application/json",
                            'Content-Length':crypted.length,
                            "REQUEST_TOKEN":token
                        },
                        body:crypted,
                    },function (error,response,body) {
                        if (!error && response.statusCode == 200) {
                             var data=common.decrypt(body,common.key,common.iv)
                            resolve(data)
                        }
                    }
                )
            })
        }
        let data=await result();
        return data
    }
}
//异步调用例子（从另一个js里调用）
/*
const requestResult=require("../../libs/requestResult")
let json={
    DB_NAME:"OA_PROD",
    SP_NAME:"SP_TEST",
    m:"select",
    EHUSER:"552"
};
let url="http://139.196.108.200/BFInsuredPlatInterface/"
requestResult.reqResult({json,url}).then(outcome=>{
    console.log(outcome);
})*/
