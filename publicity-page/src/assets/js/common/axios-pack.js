import axios from 'axios';

var service = axios.create({
	baseURL: process.env.BASE_URL,
	timeout: 5000
});

//service.interceptors.request.use(
//	config => {
//		config.headers = {
//			"Accept": "application/json"
//		};
//		return config;
//	},
//	error => {
//		console.log("requestError: " + error)
//		return Promise.reject(err);
//	}
//);
//
//service.interceptors.response.use(
//	response => {
//		if(response.status == 200) {
//			return response
//		} else {
//			return Promise.reject('error res.status=' + response.status)
//		}
//	},
//	error => {
//		/*报错处理 -->弹窗*/
//		console.log("responseError: ", error.response)
//		return Promise.reject(error)
//	}
//);

export function request(url, data, method) {
	console.log(JSON.stringify(data))
	return service.request({
		url: url,
		method: method,
		data: data,
		dataType: "json",
		async: true,
	}).then(function(data) {
		return Promise.resolve(data.data);
	});
};