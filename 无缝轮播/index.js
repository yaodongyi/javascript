/*
 * @Author: yaodongyi
 * @Date: 2019-08-21 15:48:58
 * @Description:一个拼拼凑凑实现的无缝连接。
 * 结论
 * 1.尽量不要用父元素做位移。不好控制。👇
 * 2.尽量不要使用以下代码，(因为只是拿来尝试节点交换方式实现轮播图)操作节点增删来更新轮播位置，会导致节点一直刷新(性能不好)。
 */
/**
 * 轮播
 * @param { Array } arr 传入需要轮播的数组，的可以是文本也可以是节点
 * @param { Number } width 轮播图的宽度
 * @param { Number } delay 轮播延迟时间
 */
function runload(arr, width, delay) {
  let i = 0;
  let len = arr.length;
  let clickable = true; // 轮播的情况下设置不可点击
  let motion = document.querySelector('.motion'); // 父节点
  let transition = 'transition:' + motion.style.transition + ';'; // 过度属性，获取style设置的transition属性值。
  let time = motion.style.transition.split(' ')[1].split('s')[0] * 1000; // 根据过度时间，设置轮播图定时器时间

  /**
   * 创建节点
   * @param {*} element 传入arr数组内容
   * @param {*} index 传入arr数组下标
   */
  let createNode = function(element, index) {
    motion.setAttribute('style', 'width:' + width * element + 'px;');
    let node = document.createElement('div');
    node.setAttribute('class', 'run run' + (index + 1));
    node.innerHTML = element;
    motion.appendChild(node);
  };
  arr.forEach((element, index) => {
    createNode(element, index);
  });
  /**
   * 克隆节点
   * @param {*} type 克隆第一个还是最后一个
   * @description 这里只克隆头尾
   * @returns 克隆的节点
   */
  function clone(type) {
    if (type === 'first') {
      let node = motion.firstChild.cloneNode();
      node.innerHTML = motion.firstChild.innerHTML;
      return node;
    } else {
      let node = motion.lastChild.cloneNode();
      node.innerHTML = motion.lastChild.innerHTML;
      return node;
    }
  }
  // 👈向左
  let left = () => {
    clearInterval(this.timer); // 停止轮播
    if (clickable === false) return false;
    clickable = false;
    i <= 0 ? (i = len - 1) : i--;
    // 向左运行的时候先克隆最后一个节点，插入到第一个。
    motion.insertBefore(clone('last'), motion.childNodes[0]);
    run();
    let runleft = Number(motion.style.left.split('px')[0]) + 0;
    motion.setAttribute('style', 'transition: all 0s;width:' + width * len + 'px;' + 'left:' + -width + 'px;');
    setTimeout(() => {
      motion.setAttribute('style', transition + 'width:' + width * len + 'px;' + 'left:' + runleft + 'px');
    }, 1);
    // 删除最后一个节点，还原轮播长度。
    setTimeout(() => {
      motion.removeChild(motion.lastChild);
      motion.setAttribute('style', 'transition: all 0s;width:' + width * len + 'px;' + 'left:' + 0 + 'px;');
      clickable = true;
      this.timer = setInterval(right, delay); // 开启
    }, time);
  };
  // 向右👉
  let right = () => {
    clearInterval(this.timer); // 停止轮播
    if (clickable === false) return false;
    clickable = false;
    i >= len - 1 ? (i = 0) : i++;
    let run_element = run();
    let runright = Number(motion.style.left.split('px')[0]) - width;
    motion.setAttribute('style', transition + 'width:' + width * len + 'px;' + 'left:' + runright + 'px');
    // 向右运行的时候删除第一个节点，添加到末尾
    setTimeout(() => {
      motion.setAttribute('style', 'transition: all 0s;width:' + width * len + 'px;' + 'left:' + 0 + 'px;');
      motion.removeChild(run_element);
      motion.appendChild(run_element);
      clickable = true;
      this.timer = setInterval(right, delay); // 开启
    }, time);
  };
  // 返回当前运行的节点
  function run() {
    let run_index = i === 0 ? len : i;
    let run = {};
    run[run_index] = document.querySelector('.run' + run_index);
    return run[run_index];
  }

  this.timer = setInterval(right, delay); // 自动轮播

  document.getElementsByClassName('right')[0].addEventListener('click', right);
  document.getElementsByClassName('left')[0].addEventListener('click', left);
}

