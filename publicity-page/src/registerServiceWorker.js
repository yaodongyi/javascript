/*
 * @Author: yaodongyi
 * @Date: 2019-08-29 18:31:26
 * @Description: 
 */
import Toast from './plugins/Toast/Toast.js';
// production 使用pwa
if (process.env.NODE_ENV === 'production') {
  if (navigator.serviceWorker != null) {
    navigator.serviceWorker.register('./service-worker.js').then(function(registartion) {
      // registartion.update();
      console.log('浏览器支持service-worker:', registartion.scope);
    });
  }

  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', registartion => {
    if (refreshing) {
      return;
    }
    refreshing = true;
    // 防止一直刷新
    Toast.show().then(res => {
      window.location.reload();
    });
  });

}
