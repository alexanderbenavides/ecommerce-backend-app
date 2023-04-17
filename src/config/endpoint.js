function saveData(res, model) {
    model.save()
    .then( (dataStorage) => {
        return res.status(200).send({response: dataStorage});
    }).catch( (error) => {
        return res.status(400).send(errorMapper(error));
    });
}

function updateData(res, model, id, data) {
    model.findByIdAndUpdate({_id: id}, data)
    .then( (dataStorage) => {
        return res.status(200).send({response: dataStorage});
    })
    .catch( (error) => {
        return res.status(400).send(errorMapper(error));
    });
}

function deleteData(res, model, id) {
    model.findByIdAndDelete({_id: id})
    .then( (dataStorage) => {
        return res.status(200).send({response: dataStorage});
    })
    .catch( (error) => {
        return res.status(400).send(errorMapper(error));
    });
}

async function findDataById(res, model, id) {
    const result = await model.findById(id).exec();
    if (!result) return res.status(400).send({message: 'No se ha podido encontrar resultados'});
    return  res.status(200).send(result);
}

async function getDataListPaginated(res, model, page, size) {
    const response = await model.find().skip((page - 1)* size).limit(size).exec();
    const count = await model.count().exec();
    res.status(200).send(
        {
            response: {
                totalRecords: count,
                currentPage: page,
                size: size,
                data: response
            }
        }
    );
}

function errorMapper(error) {
    const requiredFields = error?.message.includes('required');
    const duplicadeFields = error?.message.includes('duplicate');
    
    if (requiredFields) return {message: 'Revise los campos obligatorios'};
    if (duplicadeFields) return {message: 'Revise campos únicos'};
    return {message: 'Ha ocurrido un error. Revise bien sus datos'};
}

module.exports = {
    saveData,
    updateData,
    deleteData,
    findDataById,
    getDataListPaginated
}