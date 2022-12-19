import express from 'express';

let administrador = true;

function permissions(req, res, next){

    if(!administrador){
        res.json({
            'status': 'ok',
            'message': 'No tiene permiso para ejecutar esta acción',
            'code': '403',
        });

        return;
    }
    next();
}

export { permissions };