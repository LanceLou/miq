const Router = require('koa-router');
const userControllers = require('./controllers/user.controller');
const circleController = require('./controllers/circle.controller');

/**
 * GET(SELECT)： 从服务器取出一个资源
 * POST(CREATE)：在服务器新建一个资源。
 * PUT(UPDATE)：在服务器更新资源(提供改变后的完整资源)
 * PATCH(UPDATE)：在服务器更新资源(客服端提供改变的属性)
 * DELETE(DELETE): 从服务器删除数据
 */
// restful支持
const router = new Router();

// --------------------User--------------------start

router.get('/xhr/user/detail.json', userControllers.getUserDetail);

router.get('/xhr/user/message.json', userControllers.getUserMessage);

router.get('/xhr/user/circles.json', circleController.getUserAllCircles);

// --------------------User--------------------end


// --------------------User--------------------start

router.post('/xhr/circle.json', circleController.createCircle);

// --------------------User--------------------end


// --------------------search--------------------start

// router.get('/xhr/search/composite.json') 综合搜索
router.get('/xhr/search/circle.json', circleController.search);

// --------------------search--------------------end

// router.get('/logout', userControllers.logOut);

module.exports = router.routes();

