import axios from "axios";

const serverConfig = {
  rootURL: "/api/dou", 
  useTokenAuthorization: false, 
};

const serviceAxios = axios.create({
  timeout: 10000, 
  withCredentials: false, 
});

serviceAxios.interceptors.request.use(
  (config) => {
    if (serverConfig.useTokenAuthorization) {
      config.headers["Authorization"] = localStorage.getItem("token"); 
    }
    config.headers["content-type"] = "application/json;charset=UTF-8"; 
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

serviceAxios.interceptors.response.use(
  (res) => {
    if (res.status !== 200) {
        return Promise.reject(res.data);
    }
    return res;
  },
  (error) => {
    let message = "";
    if (error && error.response) {
      switch (error.response.status) {
        case 302:
          message = "接口重定向了！";
          break;
        case 400:
          message = "参数不正确！";
          break;
        case 401:
          message = "您未登录，或者登录已经超时，请先登录！";
          break;
        case 403:
          message = "您没有权限操作！";
          break;
        case 404:
          message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          message = "请求超时！";
          break;
        case 409:
          message = "系统已存在相同数据！";
          break;
        case 415:
          message = "Unsupported Media Type!";
          break;
        case 500:
          message = "服务器内部错误！";
          break;
        case 501:
          message = "服务未实现！";
          break;
        case 502:
          message = "网关错误！";
          break;
        case 503:
          message = "服务不可用！";
          break;
        case 504:
          message = "服务暂时无法访问，请稍后再试！";
          break;
        case 505:
          message = "HTTP 版本不受支持！";
          break;
        default:
          message = "异常问题，请联系管理员！";
          break;
      }
    }
    console.error('error--', message)
    return Promise.reject(error.response.data);
  }
);

const createHttpUrl = (url:string) => {
    return `${serverConfig.rootURL}${url}`
}

const http = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(url:string, params?: any) {
      return new Promise((resolve, reject) => {
      serviceAxios
          .get(createHttpUrl(url), { params })
          .then((res) => {
              resolve(res.data)
          })
          .catch((err) => {
              reject(err.data)
          })
      })
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post(url:string, params?: any) {
      return new Promise((resolve, reject) => {
      serviceAxios
          .post(createHttpUrl(url), params)
          .then((res) => {
              resolve(res.data)
          })
          .catch((err) => {
              reject(err.data)
          })
      })
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  postMultipart(url:string, params?: any) {
    return new Promise((resolve, reject) => {
      axios
        .post(createHttpUrl(url), params, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err.data)
        })
    })
  },
};

export default http