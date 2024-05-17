// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://votre_api", // Remplacez par l'URL de votre API
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("mon_token"); // Remplacez "mon_token" par la clé utilisée pour stocker le token dans le localStorage

    if (token) {
      const tokenExpiration = decodeToken(token).exp;
      const currentTime = Math.floor(Date.now() / 1000);

      if (tokenExpiration < currentTime) {
        localStorage.removeItem("mon_token");
        window.location.replace("/login");
        return Promise.reject("Token expired"); // Rejette la requête si le token est expiré
      }

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;



// index.js ou App.js (ou le fichier principal de votre application)

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import api from "./api"; // Importez l'instance Axios personnalisée

import App from "./App";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")






    <div className="datatable__header">
        <div className="datatable__header--left input--form">
          <span className="datatable__header--icon">
            <HiSearch />
          </span>

          <input
            type="text"
            name="search"
            placeholder="Rechercher quelque chose"
            className="form-control datatable__header--input"
            id=""
            onChange={handleFilter}
          />
        </div>
        <div className="datatable__header--right">
          <button className="btn " onClick={() => setModal(true)}>
            Ajouter une année
          </button>
        </div>
      </div>

      <div className="datatable__grade">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Datatable
            columns={columns}
            data={filteredAcademicYears}
            selectableRows
            pagination
          />
        )}
      </div>
      {modal && (
        <ModalHandleAcademicYear
          onClose={() => setModal(false)}
          modal={modal}
        />
      )}









      <!-- ACADEMICYEAR.JSX -->

         <div className="datatable__header">
        <div className="datatable__header--left input--form">
          <span className="datatable__header--icon">
            <HiSearch />
          </span>

          <input
            type="text"
            name="search"
            placeholder="Rechercher quelque chose"
            className="form-control datatable__header--input"
            id=""
            onChange={handleFilter}
          />
        </div>
        <div className="datatable__header--right">
          <button className="btn " onClick={() => setModal(true)}>
            Ajouter une année
          </button>
        </div>
      </div>

      <div className="datatable__grade">
    
      </div>
 