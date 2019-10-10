// 前端通过网址（url）生成二维码
// 首先要在页面上放一个容器，id传入下面的插件，canvans就会生成在那个容器里面，多张就会有多个canvas。
import QRCode from 'qrcodejs2';

/* 必须传url,text两个参数,url为地址，text为二维码下面的文本 */
function qrcode(opts={}){
    if(!opts.url || !opts.text){
        return;
    }
    let id=opts.id?opts.id:'qrcode';
    new QRCode(id,{
        width:750,
        height:750,
        text:opts.url,
        render:'canvas'
    })
    let text=opts.text
    let code=document.getElementById(id);
    let canvasEle=code.getElementsByTagName('canvas')
    let canvas=canvasEle[canvasEle.length-1];//多个二维码
    let uri=canvas.toDataURL("image/png");
    let img=new Image();
    return new Promise((resolve)=>{
        img.onload=()=>{
            let canvas2= document.createElement('canvas');
            canvas2.width =750;
            if(text.length>16){
                canvas2.height=900;
            }else{
                canvas2.height=850
            }
            let ctx=canvas2.getContext('2d');
            ctx.fillStyle ='#fff';
            ctx.fillRect(0,0,750,canvas2.height);
            ctx.drawImage(img,0,0);
            code.innerHTML=''
            ctx.font = '56px  Microsoft YaHei';
            ctx.fillStyle ='#000';
            ctx.textAlign='center';
            let width=canvas.width/2;
            if(text.length>16){
                 let one=text.substring(0,16);
                 let two=text.substring(16,text.length);
                 ctx.fillText(one,width,810);
                 ctx.fillText(two,width,860)
            }else{
                ctx.fillText(text,width,800);
            }
           let imgurl=canvas2.toDataURL("image/png");
             resolve(imgurl)
       }
       img.src=uri;
    })
    
   
}
export default qrcode
