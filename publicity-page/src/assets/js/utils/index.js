/*
 * @Author: yaodongyi
 * @Date: 2019-08-28 23:02:28
 * @Description:
 */
addEventListener(
  'load',
  function() {
    setTimeout(hideURLbar, 0);
  },
  false
);

function hideURLbar() {
  window.scrollTo(0, 1);
}

$('#jump_about').click(function() {
  console.log('jump_about');
  $web.router({
    path: 'about.html',
    query: { id: 1, a: { b: { c: [123] } } }
  });
});
