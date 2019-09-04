/*
 * @Author: yaodongyi
 * @Date: 2019-09-03 10:10:32
 * @Description:
 */
import Toast from '../../plugins/Toast/Toast.js';
console.log($web);
$('#jump_home').click(function() {
  Toast.show().then(res => {
    console.log(res);
    $web.router({
      path: 'info.html',
      query: { id: 1 }
    });
  });
});
