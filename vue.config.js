const PROXY = 'http://localhost:3000'
module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: false
    }
  },
  configureWebpack: {
    devServer: {
      // proxy: {
      //   "/api": {

      //     traget: "http://localhost:3000", 
      //     changeOrigin: true
      //   }
      // },
      before (app) {
        app.get('/api/login', (req, res) => {
          const { username, password } = req.query;
          if (username === 'leon' && password === '123') {
            res.json({ code: 1, token: 'aaa' })
          } else {
            res.status(401).json({ code: 0, message: "用户名或密码错误" })
          }
        });
        //认证函数auth，通过了才执行后面的函数，可以有效保护接口
        function auth (req, res, next) {
          if (req.headers.token) {
            next();
          } else {
            res.sendStatus(401);
          }
        }
        app.get('/api/userInfo', auth, (req, res) => {
          res.json({ code: 1, data: { name: 'aaa' } });
        })
      }
    }
  }
};
