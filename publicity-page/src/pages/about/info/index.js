/*
 * @Author: yaodongyi
 * @Date: 2019-09-04 21:43:36
 * @Description:
 */
console.log($web);
console.log($web.query);

$('#info').click(function() {
  $web.router({
    path: 'about.html',
    query: { b: 2 }
  });
});
