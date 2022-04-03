import fs from 'fs';
import { v4 as uuid } from 'uuid';
let urls = JSON.parse(fs.readFileSync('./urls.dev.json').toString());
const save_url = (update, url) => {
};
const get_owned_urls = (user, groups) => {
    return urls;
};
const create_url = (url) => {
    url['id'] = uuid();
    urls.push(url);
    fs.writeFileSync('./urls.dev.json', JSON.stringify(urls));
    return url.id;
};
const patch_url = (url) => {
    //urls.push(url)
    let new_urls = urls.filter(u => u.id != url.id);
    new_urls.push(url);
    fs.writeFileSync('./urls.dev.json', JSON.stringify(new_urls));
    return url.id;
};
const delete_url = (id) => {
    urls = urls.filter((url) => id != url.id);
    console.info(urls);
    fs.writeFileSync('./urls.dev.json', JSON.stringify(urls));
};
export default {
    save_url,
    get_owned_urls,
    create_url,
    patch_url,
    delete_url,
};
