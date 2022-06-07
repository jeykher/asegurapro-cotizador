const getAllHogarBuildings = (planes) => {
    let buildings = [];
    planes.map(plan => {
        const { bienes } = plan;
        bienes.map(bien => {
            const { descbien, coberturas } = bien;
            if(descbien === "Edificacion") {
                coberturas.map(cobertura => {
                    let coberturasTemp = buildings.find(coberturasTemp => coberturasTemp.desccobert === cobertura.desccobert);
                    if(coberturasTemp === undefined || coberturasTemp === null) {
                        buildings = [...buildings, cobertura];
                    }
                });
            }
        });
    });
    return buildings;
};

export default getAllHogarBuildings;