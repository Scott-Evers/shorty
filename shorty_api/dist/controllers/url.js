import model from '../models/dev.js';
import { Principal_Types, Operation_Types } from '../types/types.spec.js';
const get_owned_urls = (req, res) => {
    let user = req.headers['user'];
    let groups = req.headers['groups'];
    try {
        let urls = model.get_owned_urls(user, groups);
        console.log(urls);
        res.send(JSON.stringify(urls));
    }
    catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
};
const create_url = (req, res) => {
    //TODO: validate the user can create in this domain
    //TODO: validate the entry does not already exist
    try {
        let user = req.headers['user'];
        let groups = req.headers['groups'];
        let url = req.body;
        let perms = {
            type: Principal_Types.User,
            id: user,
            operation: Operation_Types.Edit,
        };
        url.permissions = [perms];
        let id = model.create_url(url);
        res.send(id);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
};
const patch_url = (req, res) => {
    //TODO: validate the user can create in this domain
    //TODO: validate the entry does not already exist
    try {
        let user = req.headers['user'];
        let groups = req.headers['groups'];
        let url = req.body;
        let perms = {
            type: Principal_Types.User,
            id: user,
            operation: Operation_Types.Edit,
        };
        url.permissions = [perms];
        let id = model.patch_url(url);
        res.send(id);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
};
const delete_url = (req, res) => {
    let user = req.headers['user'];
    let groups = req.headers['groups'];
    try {
        let id = req.params.id;
        //TODO: validate the user can delete this record
        model.delete_url(id);
        res.send('Record successfully deleted');
    }
    catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
};
export default {
    get_owned_urls,
    create_url,
    patch_url,
    delete_url,
};
