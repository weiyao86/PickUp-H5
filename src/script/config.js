const URL_IDX = process.env.NODE_ENV == "production" ? 0 : 0;
const URL_OPTS = ['https://www.xinyingtong.cn', 'http://192.168.30.217/'];

const config = {
  BASE_URL: URL_OPTS[URL_IDX]
}

export default config;
