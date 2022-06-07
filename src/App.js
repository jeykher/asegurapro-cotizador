import React, { Component } from "react";
import { BrowserRouter as Router, Route, BrowserRouter } from "react-router-dom";
import routes from "./routes";
import { ServicesContext } from "./context/servicesContext/servicesContext";
import Layout from "./layout/Layout";
import { BackdropContextProvider } from "./context/Backdrop";
import { CotizarContext } from "./context/cotizarContext/cotizarContext";
import { CotizaPageContextProvider } from "./context/CotizaPageContext/CotizaPageContext";
import { AlertContextProvider } from "./context/alertContext";


class App extends Component {
  render() {
    let baseURL = '/asegurapro/cotizador';
    const routeComponents = routes.map(({ path, component }, key) => (
      <Route exact path={baseURL + path} component={component} key={key} />
    ));
    return (
      <BrowserRouter>
        <AlertContextProvider>
          <BackdropContextProvider>
            <CotizarContext>
              <CotizaPageContextProvider>
                <ServicesContext>
                  <Layout>{routeComponents}</Layout>
                </ServicesContext>
              </CotizaPageContextProvider>
            </CotizarContext>
          </BackdropContextProvider>
        </AlertContextProvider>
      </BrowserRouter>
    );
  }
}

export default App;
