const fs = require('fs');

function getFilePath(file) {
    const path = file.path.split('\\');
    const imageName = path.pop();
    const imageFolder = path.pop();
   return `${imageFolder}/${imageName}`;
}

function unlinkFile(fileName) {
    try {
        if (!fileName) throw new Error('No exite la imagen a eliminar');
        fs.unlinkSync(`src/uploads/${fileName}`);
    } catch (err) {
        console.log(typeof err === 'string' ? err : 'Error eliminando la imagen');
    }
}

module.exports = {
    getFilePath,
    unlinkFile
}