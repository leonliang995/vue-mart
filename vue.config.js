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
      //   "/api": { \

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
        });

        app.get('/api/goods', function (req, res) {
          res.json({
            code: 1,
            //轮播图数据
            slider: [
              {
                id: 21,
                img: "/img/01.jpg"//相对地址
              },
              {
                id: 22,
                img: "/img/02.jpg"
              },
              {
                id: 23,
                img: "/img/03.jpg"
              },
              {
                id: 24,
                img: "/img/04.jpg"
              }
            ],
            //商品列表数据
            data: {
              nanzhuang: [
                {
                  id: 1,
                  title: "风衣",
                  price: "100",
                  img: "/img/01.jpg",
                  count: 100
                },
                {
                  id: 2,
                  title: "运动外套",
                  price: "120",
                  img: "/img/03.jpg",
                  count: 100
                },
                {
                  id: 3,
                  title: "针织衫",
                  price: "80",
                  img: "/img/02.jpg",
                  count: 100
                },
                {
                  id: 4,
                  title: "呢大衣",
                  price: "110",
                  img: "/img/04.jpg",
                  count: 100
                },
                {
                  id: 5,
                  title: "西装",
                  price: "200",
                  img: "/img/02.jpg",
                  count: 100
                },
                {
                  id: 6,
                  title: "羽绒服",
                  price: "30",
                  img: "/img/05.jpg",
                  count: 100
                }
              ],
              shuma: [
                {
                  id: 7,
                  title: "手机",
                  price: "120",
                  img: "/img/03.jpg",
                  count: 101
                },
                {
                  id: 8,
                  title: "平板",
                  price: "80",
                  img: "/img/02.jpg",
                  count: 100
                },
                {
                  id: 9,
                  title: "单反",
                  price: "110",
                  img: "/img/01.jpg",
                  count: 100
                },
                {
                  id: 10,
                  title: "摄像机",
                  price: "200",
                  img: "/img/04.jpg",
                  count: 100
                }
              ],
              shoubiao: [
                {
                  id: 11,
                  title: "运动表",
                  price: "80",
                  img: "/img/02.jpg",
                  count: 100
                },
                {
                  id: 12,
                  title: "时尚表",
                  price: "110",
                  img: "/img/01.jpg",
                  count: 100
                },
                {
                  id: 13,
                  title: "女表",
                  price: "30",
                  img: "/img/04.jpg",
                  count: 100
                }
              ],
              yueqi: [
                {
                  id: 14,
                  title: "电子琴",
                  price: "200",
                  img: "/img/01.jpg",
                  count: 100
                },
                {
                  id: 15,
                  title: "古琴",
                  price: "120",
                  img: "/img/03.jpg",
                  count: 100
                },
                {
                  id: 16,
                  title: "二胡",
                  price: "80",
                  img: "/img/02.jpg",
                  count: 100
                }
              ],
              jiaju: [
                {
                  id: 17,
                  title: "床",
                  price: "100",
                  img: "/img/01.jpg",
                  count: 100
                },
                {
                  id: 18,
                  title: "沙发",
                  price: "120",
                  img: "/img/03.jpg",
                  count: 100
                },
                {
                  id: 19,
                  title: "衣柜",
                  price: "80",
                  img: "/img/02.jpg",
                  count: 100
                },
                {
                  id: 20,
                  title: "鞋柜",
                  price: "110",
                  img: "/img/05.jpg",
                  count: 100
                }
              ]
            },
            keys: ["nanzhuang", "shuma", "shoubiao", "yueqi", "jiaju"]
          })
        })
      }
    }
  }
};
