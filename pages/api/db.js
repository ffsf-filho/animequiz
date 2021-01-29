import db from '../../db.json';

export default function dbHandler (request, response) {
    if(request.method === 'OPTIONS') {
        response.status(200).end()
        return;
    }

    response.setHeader('access-Control-Allow-Credentials', true);
    response.setHeader('access-Control-Allow-Origin', '*');
    response.setHeader('access-Control-Allow-Methods', 'GET,OPTIONS');
    //response.setHeader('access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

    response.json(db);
};