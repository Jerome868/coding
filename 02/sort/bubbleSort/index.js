// 冒泡排序 Bubble sort
function bubbleSort(arr) {
  let len = arr.length;
  // 外层 for 循环控制长短
  for (let i = len; i >= 0; i--) {
    // 内存 for 循环调换位置
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
