import React, { useState, useEffect, Fragment } from 'react';
import Formulario from './Componentes/Fomulario';
import Cancion from './Componentes/Cancion';
import Informacion from './Componentes/Informacion';
import axios from 'axios';

function App() {

  //#region  State
  const [artista, agregarArtista] = useState('');
  const [letra, agregarLetra] = useState([]);
  const [info, agregarInfo] = useState({});

  //#endregion

  //#region API

  //API de letras
  const consultarAPIletra = async busqueda => {
    const { artista, cancion } = busqueda;
    const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;

    const result = await axios(url);

    agregarArtista(artista);
    agregarLetra(result.data.lyrics);

  }
  //API de informacion del artista
  const consultarAPIinfo = async () => {

    if(artista){
      const url = `https://theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
      const result = await axios(url);
      agregarInfo(result.data.artists[0]);
    }
  }

  useEffect(
    () => {
      consultarAPIinfo();
    }, [artista]
  )

  //#endregion

  return (
    <Fragment>
      <Formulario
        consultarAPIletra={consultarAPIletra}
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Informacion
              info={info}
            />
          </div>
          <div className="col-md-6">
            <Cancion
              letra={letra}
            />
          </div>
        </div>

      </div>


    </Fragment>

  )
}

export default App;

