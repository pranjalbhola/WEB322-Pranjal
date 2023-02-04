const fs = require('fs');
const { builtinModules } = require('module');

global.posts_A = [];
global.Categories_A = [];

module.exports.initialize = function() {
    return new Promise(async(resolve, reject) => {
        const dataBuffer = fs.readFileSync('./data/posts.json');
        if (dataBuffer.length > 0) {
            posts_A = JSON.parse(dataBuffer);
            const dataCat = fs.readFileSync('./data/categories.json');
            if (dataCat.length > 0) {
                Categories_A = JSON.parse(dataCat);
            } else {
                reject("can't read categories.json");
            }

            resolve("success");
        } else {
            reject("can not read file");
        }
    })
}


module.exports.getallPosts = function() {
    return new Promise(async(resolve, reject) => {
        if (posts_A.length > 0) {
            resolve(posts_A);
        } else {
            reject("no results returned");
        }
    })
}

module.exports.getPublishedPosts = function() {
    return new Promise(async(resolve, reject) => {
        const df = fs.readFileSync('./data/posts.json');
        var publishedPosts = JSON.parse(df);
        var filtered = publishedPosts.filter(a => a.published == true);
        if (filtered.length > 0) {
            resolve(filtered);
        } else {
            reject("no results Found");
        }
    })
}


module.exports.getCategories = function() {
    return new Promise(async(resolve, reject) => {
        if (Categories_A.length > 0) {
            resolve(Categories_A);
        } else {
            reject("no results Found");
        }
    })
}