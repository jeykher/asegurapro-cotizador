const getAllHogarCoverages = (planes) => {
    let coverages = [];
    planes.map(plan => {
        const { coberturas } = plan;
        coberturas.map(cobertura => {
            let coberturasTemp = coverages.find(coberturasTemp => coberturasTemp.desccobert === cobertura.desccobert);
            if(coberturasTemp === undefined || coberturasTemp === null) {
                coverages = [...coverages, cobertura];
            }
        });
    });
    return coverages;
};

export default getAllHogarCoverages;