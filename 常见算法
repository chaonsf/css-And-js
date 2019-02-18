//判断一个单词是否是回文（回文是指把相同的词汇或句子，在下文中调换位置或颠倒过来，产生首尾回环的情趣，叫做回文，也叫回环。比如 mamam redivider ）
function checkPalindrom(str) {  
    return str == str.split('').reverse().join('');
}

//去掉一组整型数组重复的值
let unique = function(arr) {  
  let hashTable = {};
  let data = [];
  for(let i=0,l=arr.length;i<l;i++) {
    if(!hashTable[arr[i]]) {
      hashTable[arr[i]] = true;
      data.push(arr[i]);
    }
  }
  return data

}

//统计一个字符串出现最多的字母
function findMaxDuplicateChar(str) {  
  if(str.length == 1) {
    return str;
  }
  let charObj = {};
  for(let i=0;i<str.length;i++) {
    if(!charObj[str.charAt(i)]) {
      charObj[str.charAt(i)] = 1;
    }else{
      charObj[str.charAt(i)] += 1;
    }
  }
  let maxChar = '',
      maxValue = 1;
  for(var k in charObj) {
    if(charObj[k] >= maxValue) {
      maxChar = k;
      maxValue = charObj[k];
    }
  }
  return maxChar;

}

//冒泡排序算法
function bubbleSort(arr) {  
    for(let i = 0,l=arr.length;i<l-1;i++) {
        for(let j = i+1;j<l;j++) { 
          if(arr[i]>arr[j]) {
                let tem = arr[i];
                arr[i] = arr[j];
                arr[j] = tem;
            }
        }
    }
    return arr;
}

//快速排序
function quickSort(arr) {

    if(arr.length<=1) {
        return arr;
    }

    let leftArr = [];
    let rightArr = [];
    let q = arr[0];
    for(let i = 1,l=arr.length; i<l; i++) {
        if(arr[i]>q) {
            rightArr.push(arr[i]);
        }else{
            leftArr.push(arr[i]);
        }
    }

    return [].concat(quickSort(leftArr),[q],quickSort(rightArr));
}

//找出下列正数组的最大差值
function getMaxProfit(arr) {

    var minPrice = arr[0];
    var maxProfit = 0;

    for (var i = 0; i < arr.length; i++) {
        var currentPrice = arr[i];

        minPrice = Math.min(minPrice, currentPrice);

        var potentialProfit = currentPrice - minPrice;

        maxProfit = Math.max(maxProfit, potentialProfit);
    }

    return maxProfit;
}
