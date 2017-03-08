var {Router} = require('express');
export function authApi() {
    let router = Router();

    router.route('/signup')
        .post((req,res)=>{
            
        })

    return router;
}