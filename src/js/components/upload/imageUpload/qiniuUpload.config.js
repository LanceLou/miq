// import config from 'Config';
let config = {
  runtimes: 'html5,html4',      // 上传模式，依次退化
  browse_button: 'pickfiles',         // 上传选择的点选按钮，必需
  get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的uptoken
  domain: 'ou8se5gfn.bkt.clouddn.com',     // bucket域名，下载资源时用到，必需
  container: 'container',             // 上传区域DOM ID，默认是browser_button的父元素
  max_file_size: '100mb',             // 最大文件体积限制
  max_retries: 3,                     // 上传失败最大重试次数
  uptoken_url: '/uptoken',            // 文件上传token获取url
  dragdrop: true,                     // 开启可拖曳上传
  drop_element: 'container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
  chunk_size: '4mb',                  // 分块上传时，每块的体积
  auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
};

export default config;
