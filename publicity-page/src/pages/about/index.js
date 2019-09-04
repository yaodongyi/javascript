/*
 * @Author: yaodongyi
 * @Date: 2019-09-03 10:10:32
 * @Description:
 */
import Toast from '../../plugins/Toast/Toast.js';
$('#jump_home').click(function() {
  console.log('about');
  Toast.show().then(res => {
    console.log(res);
  });
});
