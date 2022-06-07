const CONFIG = {
    app: {
        enviroment: process.env.APP_ENVIROMENT
    },
    endpointsAPI: {
        endpointProduccion: process.env.REACT_APP_SERVICE_BASE_URL,
        endpointCalidad: process.env.REACT_APP_SERVICES_CALIDAD_BASE_URL    
    }
};

export default CONFIG;