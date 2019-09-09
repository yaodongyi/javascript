/*
 * @Author: yaodongyi
 * @Date: 2019-09-03 10:10:32
 * @Description:
 */
import Toast from '../../plugins/Toast/Toast.js';
import { all_api, all_mock } from '../../assets/js/utils/api.js';


console.log($web, process.env);
new (class {
  constructor() {
    this.create();
    this.methods();
  }
  async create() {
    /* await all_api();
    let data = (await all_mock()).data;
    data.projects.map(res => {
      console.log(res.number, res.address);
    }); */
  }
  methods() {
    $('#jump_home').click(function() {
      Toast.show().then(res => {
        console.log(res);
        $web.router({
          path: 'info.html',
          query: { a: 1 }
        });
      });
    });
  }
})();
