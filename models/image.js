const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'image.json'
);

const getImagesFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if(err){
            cb([]);
        }else {
            cb(JSON.parse(fileContent));
        }
    })
}

module.exports = class Image {
    constructor (title, imageUrl) {
        this.title = title;
        this.imageUrl = imageUrl;
    }
    //save the title 
    save() {
        // save an id to evry item that is created
        this.id = Math.floor(Math.random() * 200000000).toString();
        getImagesFromFile(images => {
            images.push(this);
           // JSON stringify converts a array or object to JSON format
           fs.writeFile(p, JSON.stringify(images), (err) => {
               console.log(err);
           })
        });
    }

    static fetchAll(cb){
        getImagesFromFile(cb)
    }

    static findById (id, cb) {
        getImagesFromFile(images => {
            const image = images.find(i => i.id === id)
            cb(image)
        })
    }
}
