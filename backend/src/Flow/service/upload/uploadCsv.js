const { DataTables } = require('../../../db/models');
const csv = require('fast-csv');

const uploadCsv = async (filePath) => {
    return new Promise((resolve, reject) => {
        try {
            // Leitura do arquivo CSV
            let newDataTable = [];
            csv
                .parseFile(filePath, { headers: true, delimiter: ';', ignoreEmpty: true })
                .on('data', (data) => {

                    // Chaves do objeto que será populado com os dados do CSV
                    const keys = [
                        'loja', 'data', 'hora', 'pdv', 'nsuTef',
                        'nsuHost', 'transacao', 'estado', 'codResp',
                        'autorizadora', 'concessionariaIntegrador',
                        'telefone', 'valor', 'nsuSitefPagto', 'lojaConc',
                        'operador', 'usuarioPend', 'dataPend', 'horaPend',
                        'cupomFiscal', 'horaFiscal'
                    ]
                    // Quando o arquivo CSV é gerado com o separador de vírgula
                    // const values = Object.values(data);
                    // const dataUnion = values.map(value => {
                    //     const data = value.split(',');
                    //     return keys.reduce((obj, key, index) => {
                    //         obj[key] = data[index];
                    //         return obj;
                    //     }, {});
                    // });
                    // newDataTable.push(dataUnion[0]);

                    // Quando o arquivo CSV é gerado com o separador de ponto e vírgula
                    const values = Object.values(data);
                    const dataUnion = values.reduce((acc, value) => {
                        return acc.concat(value.replace(',', '.').split(';'));
                    }, []);
                    const result = keys.reduce((obj, key, index) => {
                        obj[key] = dataUnion[index];
                        return obj;
                    }, {});
                    newDataTable.push(result);

                })
                .on('end', async () => {
                    try {
                        // Limpar a tabela "DataTables"
                        await DataTables.truncate();

                        // Popular a tabela "DataTables" com os dados do CSV
                        await DataTables.bulkCreate(newDataTable);
                        const dataUpdate = await DataTables.max('updatedAt')
                            .then(max => {
                                return max;
                            });
                        resolve({
                            success: true,
                            data: dataUpdate.toLocaleString(),
                        });
                    } catch (error) {
                        console.log(error);
                        reject({
                            success: false,
                            data: error,
                        });
                    }
                });
        } catch (error) {
            console.log(error);
            reject({
                success: false,
                data: error,
            });
        }
    });
};

module.exports = {
    uploadCsv,
};