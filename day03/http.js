// 引入http模块
const http = require("http");

// 创建服务
const server = http.createServer((req, res) => {
  /*
    request 请求对象：客户端发送给服务器的数据
    response 响应对象：服务器发送给客户端的数据
  */
  // 处理请求
  // 返回响应
  // res.setHeader("Content-Type", "text/plain;charset=utf8");
  res.setHeader("Content-Type", "text/html;charset=utf-8");
  // res.end("hello server~");
  // res.end("你好，旅客~");
  res.end(`
  <!DOCTYPE html>
  <html>
      <head>
          <meta charset="utf-8">
          <title>为什么宜宾会被称为万里长江第一城</title>
          <link rel="shortcut icon" href="favicon.ico"/>
          <link rel="stylesheet" type="text/css" href="font-awesome-4.7.0/css/font-awesome.css"/>
          <link rel="stylesheet" type="text/css" href="css/first.css"/>
          <style>
          * {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .clearFix::before,
        .clearFix::after {
          content: '';
          display: table;
          clear: both;
        }
        body {
          background: #454545;
          color: #b9b8b8;
        }
        .fenlei-wrap {
          width: 100%;
          padding-top: 40px;
          background: #2b2b2b;
          margin-bottom: 20px;
        }
        .fenlei-wrap .fenlei {
          width: 1200px;
          height: auto;
          margin: 0 auto;
        }
        .fenlei-wrap .fenlei .header {
          height: 100px;
          color: #fff;
        }
        .fenlei-wrap .fenlei .header h2 {
          font-size: 40px;
          height: 52px;
          line-height: 52px;
          text-align: center;
        }
        .fenlei-wrap .fenlei .header span {
          display: block;
          text-align: center;
          font-size: 30px;
          position: relative;
        }
        .fenlei-wrap .fenlei .header span::before,
        .fenlei-wrap .fenlei .header span::after {
          content: "";
          height: 1px;
          width: 200px;
          background: #fff;
          position: absolute;
          top: 50%;
          left: 10%;
        }
        .fenlei-wrap .fenlei .header span::after {
          left: auto;
          right: 10%;
        }
        .center-warp {
          width: 1200px;
          height: 360px;
          margin: 0 auto;
        }
        .center-warp .left video {
          display: block;
          float: left;
          width: 636px;
          height: 360px;
        }
        .center-warp .right {
          float: left;
          width: 563px;
          height: 360px;
          padding-left: 20px;
          box-sizing: border-box;
        }
        .center-warp .right span {
          display: block;
          text-indent: 2em;
          line-height: 24px;
        }
        .bottom-warp {
          width: 100%;
          background: #454545;
        }
        .bottom-warp .bottom {
          width: 1200px;
          margin: 0 auto;
        }
        .bottom-warp .bottom .top {
          width: 100%;
          height: 129px;
          border-bottom: 1px solid #c2c1c1;
        }
        .bottom-warp .bottom .top h3 {
          width: 110px;
          height: 129px;
          line-height: 129px;
          color: #FFF;
          float: left;
        }
        .bottom-warp .bottom .top ul {
          width: 1090px;
          float: left;
          margin-top: 40px;
        }
        .bottom-warp .bottom .top ul li {
          float: left;
          height: 49px;
          width: 159px;
          margin-right: 20px;
          overflow: hidden;
        }
        .bottom-warp .bottom .top ul li:last-of-type {
          margin: 0;
        }
        .bottom-warp .bottom .top ul li img {
          display: block;
          width: 100%;
          height: 100%;
          transition: all 0.5s;
        }
        .bottom-warp .bottom .top ul li:hover img {
          transform: scale(1.1);
        }
        .bottom-warp .bottom .bot {
          width: 100%;
          height: 269px;
          border-bottom: 1px solid #c2c1c1;
          padding: 40px 0 39px 0;
          box-sizing: border-box;
        }
        .bottom-warp .bottom .bot .bot-top {
          width: 540px;
          height: 100px;
          float: left;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-content: space-between;
        }
        .bottom-warp .bottom .bot .bot-top li {
          width: 180px;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
        }
        .bottom-warp .bottom .bot .bot-top li a {
          display: block;
          height: 30px;
          text-decoration: none;
          color: #b9b8b8;
        }
        .bottom-warp .bottom .bot .bot-top li a:hover {
          color: #fff;
          text-decoration: underline;
        }
        .bottom-warp .bottom .bot h2 {
          float: left;
          width: 120px;
          height: 150px;
          margin-right: 40px;
        }
        .bottom-warp .bottom .bot h2 img {
          display: block;
          width: 120px;
          height: 120px;
        }
        .bottom-warp .bottom .bot h2 span {
          display: block;
          height: 30px;
          font-size: 14px;
          line-height: 30px;
          color: #b9b8b8;
          text-align: center;
        }
        .bottom-warp .bottom .bot .bot-bot1 {
          float: left;
          width: 490px;
          color: #b9b8b8;
          padding-left: 40px;
          box-sizing: border-box;
        }
        .bottom-warp .bottom .bot .bot-bot1 h4 {
          margin-bottom: 10px;
        }
        .bottom-warp .bottom .bot .bot-bot1 h4 i {
          font-style: normal;
          margin-right: 15px;
        }
        .bottom-warp .bottom .bot .bot-bot1 ul li {
          text-indent: 10px;
          line-height: 30px;
        }
        .bottom-warp .bottom .bot .bot-bot1 ul li span {
          margin-left: 40px;
        }
        .bottom-warp .bottom .bot .bot-bot2 {
          color: #b9b8b8;
          height: 30px;
          margin-top: 20px;
          float: left;
        }
        .bottom-warp .bottom .bot .bot-bot2 h5 {
          width: 100px;
          height: 30px;
          float: left;
          font-size: 16px;
        }
        .bottom-warp .bottom .bot .bot-bot2 ul {
          float: left;
          width: 1000px;
        }
        .bottom-warp .bottom .bot .bot-bot2 ul li {
          float: left;
          height: 30px;
          width: 100px;
        }
        .bottom-warp .bottom .bott {
          height: 70px;
          line-height: 70px;
          text-align: center;
        }
        .bottom-warp .bottom .bott span {
          color: #b9b8b8;
          font-size: 14px;
        }
        
          </style>
      </head>
      <body>
          <!-- 顶部 -->
          <div class="fenlei-wrap">
              <div class="fenlei">
                  <div class="header">
                      <h2>万里长江第一城</h2>
                      <span>The first city on the Yangtze River</span>
                  </div>
              </div>
          </div>
          <!-- 中部 -->
          <div class="center-warp clearFix">
              <div class="left">
                  <video controls="controls">
                      <source src="video/dili.mp4" type="video/mp4"></source>
                  </video>
              </div>
              <div class="right">
                  <span>
                      长江（英文名称：the Changjiang River/the Yangtze River）发源于“ 世界屋脊 ”—— 青藏高原的唐古拉山脉各拉丹冬峰西南侧。
                      干流流经青海省、西藏自治区、四川省、云南省、重庆市、湖北省、湖南省、江西 省、安徽省、江苏省、上海 市共11个省级行政区 (八省二市一区)，
                      于崇明岛以东注入东海，全长6387公里，在世界大河中长度仅次于非洲的尼罗河和南美洲的亚马逊河，居世界第三位。
                  </span>
                  <span>
                      从玉树至宜宾这一段长江，称为金沙江。玉树以西的海拔越来越高，因此人们将玉树上游的长江称为通天河。
                      长江干流自西而东横贯中国中部，位于东经90°33′～122°25′，北纬24°30′～35°45′之间。
                      数百条支流辐辏南北，延伸至贵州、甘肃、陕西、河南、广西、广东、浙江、福建8个省、自治区的部分地区。流域面积达180万平方公里，约占中国陆地总面积的1/5。
                  </span>
                  <span>
                      长江干流宜昌以上为上游，长4504公里，流域面积100万平方公里，其中直门达至宜宾称金沙江，长3464公里；宜宾至宜昌河段习称川江，长1040公里；
                      宜昌至湖口为中游，长955公里，流域面积68万平方公里。湖口以下为下游，长938公里，流域面积12万平方公里。
                  </span>
              </div>
          </div>
          <!-- 底部赞助 -->
          <div class="bottom-warp">
              <div class="bottom">
                  <div class="top clearFix">
                      <h3>合作单位：</h3>
                      <ul>
                          <li>
                              <img  src="img/1.jpg"/>
                          </li>
                          <li>
                              <img  src="img/2.jpg"/>
                          </li>
                          <li>
                              <img  src="img/3.jpg"/>
                          </li>
                          <li>
                              <img  src="img/4.jpg"/>
                          </li>
                          <li>
                              <img  src="img/5.jpg"/>
                          </li>
                      </ul>
                  </div>
                  <div class="bot clearFix">
                      <ul class="bot-top">
                          <li>
                              <a href="https://baike.baidu.com/item/%E5%AE%9C%E5%AE%BE%E6%97%85%E6%B8%B8%E6%99%AF%E5%8C%BA/23573016#0_1" target="_blank">七洞沟旅游景区</a>
                          </li>
                          <li>
                              <a href="https://baike.baidu.com/item/%E5%AE%9C%E5%AE%BE%E6%97%85%E6%B8%B8%E6%99%AF%E5%8C%BA/23573016#0_1" target="_blank">蜀南竹海</a>
                          </li>
                          <li>
                              <a href="https://baike.baidu.com/item/%E5%AE%9C%E5%AE%BE%E6%97%85%E6%B8%B8%E6%99%AF%E5%8C%BA/23573016#0_1" target="_blank">石海洞乡</a>
                          </li>
                          <li>
                              <a href="https://baike.baidu.com/item/%E5%AE%9C%E5%AE%BE%E6%97%85%E6%B8%B8%E6%99%AF%E5%8C%BA/23573016#0_1" target="_blank">李庄古镇</a>
                          </li>
                          <li>
                              <a href="https://baike.baidu.com/item/%E5%AE%9C%E5%AE%BE%E6%97%85%E6%B8%B8%E6%99%AF%E5%8C%BA/23573016#0_1" target="_blank">夕佳山古民居</a>
                          </li>
                          <li>
                              <a href="https://baike.baidu.com/item/%E5%AE%9C%E5%AE%BE%E6%97%85%E6%B8%B8%E6%99%AF%E5%8C%BA/23573016#0_1" target="_blank">流杯池公园</a>
                          </li>
                          <li>
                              <a href="https://baike.baidu.com/item/%E5%AE%9C%E5%AE%BE%E6%97%85%E6%B8%B8%E6%99%AF%E5%8C%BA/23573016#0_1" target="_blank">南溪古街</a>
                          </li><!-- 
                          <li>
                              <a href="https://baike.baidu.com/item/%E5%AE%9C%E5%AE%BE%E6%97%85%E6%B8%B8%E6%99%AF%E5%8C%BA/23573016#0_1" target="_blank">蜀南花海</a>
                          </li> -->
                      </ul>
                      <h2>
                          <img src="img/yibin.png"/>
                          <span>扫码获取更多消息</span>
                      </h2>
                      <div class="bot-bot1 clearFix">
                          <h4>
                              <i>联系我们</i>
                              <span>周一至周五 9：00-18：00</span>
                          </h4>
                          <ul>
                              <li>
                                  <i class="fa fa-qq"></i>
                                  <span>2855******</span>
                              </li>
                              <li>
                                  <i class="fa fa-phone"></i>
                                  <span>182********</span>
                              </li>
                              <li>
                                  <i class="fa  fa-envelope"></i>
                                  <span>联系邮箱：baidu@.163.con</span>
                              </li>
                              <li>
                                  <i class="fa fa-map-marker "></i>
                                  <span>地址：四川宜宾</span>
                              </li>
                          </ul>
                      </div>
                      <div class="bot-bot2 clearFix">
                          <h5>
                              友情链接：
                          </h5>
                          <ul>
                              <li>乐山宣传片</li>
                              <li>自贡宣传片</li>
                              <li>宜宾宣传片</li>
                              <li>泸州宣传片</li>
                              <li>长宁宣传片</li>
                              <li>南溪宣传片</li>
                          </ul>
                      </div>
                  </div>
                  <div class="bott">
                      <span>Copyright (c) 2020 - 2021 万里长江第一城 网站备案号：蜀ICP备12014244号-2</span>
                  </div>
              </div>
          </div>
      </body>
  </html>
  
  `);
});
// 端口号
const port = 3000;
// 主机名 / 域名
// const host = "localhost"; // 域名
const host = "192.168.17.49"; // ip地址
// 启动服务
server.listen(port, host, err => {
  if (err) {
    console.log("服务器启动失败了", err);
    return;
  }
  // 访问服务器地址： http://localhost:3000
  const address = `http://${host}:${port}`;
  console.log(`服务器启动成功了~ 访问服务器地址：${address}`);
});