module.exports = {
    //axios域代理，解决axios跨域问题
    // baseUrl: '/',
    devServer: {
        proxy: {
            '/v1_badcase': {
                target: "https://www.fastmock.site/mock/f184598ed3f958f47a62880f6c012b2c/v1_badcase",
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/v1_badcase':"/"
                }
            }
        }
    }
}