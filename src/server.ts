/**
 * the polyfills must be the first thing imported
 */
import './polyfills.ts';
import './__2.1.1.workaround.ts'; // temporary until 2.1.1 things are patched in Core
import * as path from 'path';
import * as express from 'express';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';
import { createEngine } from 'angular2-express-engine';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.node.module';
import { environment } from './environments/environment';
import { routes } from './server.routes';
import * as cookieParser from 'cookie-parser';
//APIs
import { userApi } from './server/userApi';
import { authApi } from './server/authApi';
// App
import { OrderSrv } from './app/providers/order.service';
import { Contact } from './app/providers/contact.service';
import { ClientSrv } from './app/providers/clients.service';
import { Auth } from './app/providers/auth.service';
import { AuthGuard } from './app/core/auth-guard.service';
import { HttpClient } from './app/core/http-client';
import { Config } from './app/core/config';
import { ModelService } from './app/shared/model.service';import {OrderData} from './app/core/order-data';
import {UserData} from './app/core/user-data';
const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));
const port = process.env.PORT || 4200;

/**
 * enable prod mode for production environments
 */
enableProdMode();

/**
 * Mongoose
 */

/**
 * Express View
 */
app.engine('.html', createEngine({
  ngModule: AppModule,
  providers: [
    Auth,
    OrderSrv,
    Contact,
    ClientSrv,
    AuthGuard,
    HttpClient,
    Config,
    ModelService,
    OrderData,
    UserData,
    // use only if you have shared state between users
    // { provide: 'LRU', useFactory: () => new LRU(10) }

    // stateless providers only since it's shared
  ]
}));
app.set('views', path.join(ROOT, 'client'));
app.set('view engine', 'html');



function cacheControl(req, res, next) {
  // instruct browser to revalidate in 60 seconds
  res.header('Cache-Control', 'max-age=60');
  next();
}

app.use(cookieParser('Transportes de carga | Yetcargo'));
app.use((req, res, next) => {
  req.headers['if-none-match'] = 'no-match-for-this';
  next();
});
app.disable('etag');
/**
 * Enable compression
 */
app.use(compression());

/**
 * serve static files
 */
app.use('/', cacheControl, express.static(path.join(ROOT, 'client'), { index: false, maxAge: 30 }));


app.all("/api/*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  return next();
});


/**
 * bootstrap universal app
 * @param req
 * @param res
 */
function ngApp(req: any, res: any) {
  res.render('index', {
    req,
    res,
    preboot: false,
    baseUrl: '/',
    requestUrl: req.originalUrl,
    originUrl: req.hostname,
    providers: `[Auth,
    OrderSrv,
    Contact,
    ClientSrv,
    AuthGuard,
    HttpClient,
    Config,
    ModelService,
    OrderData,
    UserData,]` 
  });
}

  /**
   * api routes
   */
  // app.use('/api/auth', authApi());
  // app.use('/api', userApi());

  /**
   * use universal for specific routes
   */
  app.get('/', ngApp);
  routes.forEach(route => {
    app.get(`/${route}`, ngApp);
    app.get(`/${route}/*`, ngApp);
  });

  /**
   * if you want to use universal for all routes, you can use the '*' wildcard
   */

  app.get('*', function (req: any, res: any) {
    res.setHeader('Content-Type', 'application/json');
    const pojo = { status: 404, message: 'No Content' };
    const json = JSON.stringify(pojo, null, 2);
    res.status(404).send(json);
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });