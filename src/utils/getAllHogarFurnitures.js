const getAllHogarFurnitures = (planes) => {
    let furnitures = [];
    planes.map(plan => {
        const { bienes } = plan;
        bienes.map(bien => {
            const { descbien, coberturas } = bien;
            if(descbien === "Mobiliario") {
                coberturas.map(cobertura => {
                    let coberturasTemp = furnitures.find(coberturasTemp => coberturasTemp.desccobert === cobertura.desccobert);
                    if(coberturasTemp === undefined || coberturasTemp === null) {
                        furnitures = [...furnitures, cobertura];
                    }
                });
            }
        });
    });
    return furnitures;
};

export default getAllHogarFurnitures;