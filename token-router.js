const express = require('express');
const request = require('request-promise');
const tokenRouter = express.Router();

tokenRouter.post('/', function (req, res) {
    const data = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: {
                'Authorization': `Basic ${Buffer.from('4e4c2dc3e0644eb2a0b97f45336f69eb:c9becfab7a8440fb880903ac12222980').toString('base64')}`,
                'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };
    request(data).then(response => res.json(response));
});

module.exports = tokenRouter;
