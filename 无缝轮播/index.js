/*
 * @Author: yaodongyi
 * @Date: 2019-08-21 15:48:58
 * @Description:一个拼拼凑凑实现的无缝连接。
 * 结论尽量不要用父元素做位移。不好控制。👇
 */
function runload(arr, width) {
  console.log('load', arr, width);

  // let arr = ["<img src='./1.jpeg'>", 2, "<img src='./2.jpeg'>", 4, "<img src='./3.jpeg'>"];
  // let width = 300;
  let i = 0;
  let len = arr.length;
  let clickable = true;
  let motion = document.querySelector('.motion');
  let transition = 'transition:' + motion.style.transition + ';';
  let time = motion.style.transition.split(' ')[1].split('s')[0] * 1000;

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

  function left() {
    if (clickable === false) return false;
    clickable = false;
    i <= 0 ? (i = len - 1) : i--;
    motion.insertBefore(clone('last'), motion.childNodes[0]);
    run();
    let runleft = Number(motion.style.left.split('px')[0]) + 0;
    motion.setAttribute('style', 'transition: all 0s;width:' + width * len + 'px;' + 'left:' + -width + 'px;');
    setTimeout(() => {
      motion.setAttribute('style', transition + 'width:' + width * len + 'px;' + 'left:' + runleft + 'px');
    }, 1);
    setTimeout(() => {
      motion.removeChild(motion.lastChild);
      motion.setAttribute('style', 'transition: all 0s;width:' + width * len + 'px;' + 'left:' + 0 + 'px;');
      clickable = true;
    }, time);
  }
  function right() {
    if (clickable === false) return false;
    clickable = false;
    i >= len - 1 ? (i = 0) : i++;
    let run_element = run();
    let runright = Number(motion.style.left.split('px')[0]) - width;
    motion.setAttribute('style', transition + 'width:' + width * len + 'px;' + 'left:' + runright + 'px');
    setTimeout(() => {
      motion.setAttribute('style', 'transition: all 0s;width:' + width * len + 'px;' + 'left:' + 0 + 'px;');
      motion.removeChild(run_element);
      motion.appendChild(run_element);
      clickable = true;
    }, time);
  }

  function run() {
    let run_index = i === 0 ? len : i;
    let run = {};
    run[run_index] = document.querySelector('.run' + run_index);
    return run[run_index];
  }
  
  document.getElementsByClassName('right')[0].addEventListener('click', right);
  document.getElementsByClassName('left')[0].addEventListener('click', left);
}

// 交换dom节点
// function exchange(id_1, id_2) {
//   let run_node = document.querySelector('.run');
//   var newNode = document.createElement('div');
//   run_node.parentNode.insertBefore(newNode, id_2);
//   run_node.parentNode.insertBefore(id_2, id_1);
//   run_node.parentNode.insertBefore(id_1, newNode);
//   run_node.parentNode.removeChild(newNode);
// }
