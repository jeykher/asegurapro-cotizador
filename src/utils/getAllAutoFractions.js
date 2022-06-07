const getAllAutoFractions = (planes) => {
    let fractions = [];
    fractions = [
        ...fractions,
        {
            ideplan: 0,
            nomplan: "Anual"
        }
    ];
    planes.map(plan => {
        const { fraccionamiento } = plan;
        fraccionamiento.map(fraccion => {
            let fractionsTemp = fractions.find(fraccionTemp => fraccionTemp.ideplan === fraccion.ideplan);
            if(fractionsTemp === undefined || fractionsTemp === null) {
                fractions = [...fractions, fraccion];
            }
        });
    });
    return fractions;
};

export default getAllAutoFractions;