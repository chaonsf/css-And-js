//reduce（）和reduceRight() 这俩个方法都会迭代数组的所有项，然后构建一个最终返回的值。reduce（）是从数组的第一项开始，逐个遍历到最后。而reduceRight（）则从最后一项，向前遍历到第一项
//俩个方法都有四个参数：前一个值、当前值、项的索引和数组对象。这个函数返回的任何值都会作为参数自动传给下一项。因此第一个参数是数组的第一项，第二个参数是数组的第二项

//数组求和
var values=[1,2,3,4,5];
var sum=values.reduce(function(prev,cur,index,array){
        return prev+cur;
})
console.log(sum)//15
