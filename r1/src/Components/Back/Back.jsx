import { useState, useEffect } from "react";
import axios from "axios";
import Nav from './Nav';
import BackContext from "./BackContext";
import { authConfig } from '../../Functions/auth.js';
import CreateFixers from "./Fixers/Create";
import ListFixers from "./Fixers/List";
import EditFixers from "./Fixers/Edit";
import ListServices from './Services/List';
import CreateServices from './Services/Create';
import EditServices from './Services/Edit';

function Back({show}) {

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [fixers, setFixers] = useState(null);
  const [createFixers, setCreateFixers] = useState(null);
  const [deleteFixers, setDeleteFixers] = useState(null);
  const [editFixers, setEditFixers] = useState(null);
  const [modalFixers, setModalFixers] = useState(null);
  const [deletePhoto, setDeletePhoto] = useState(null);

  const [services, setServices] = useState(null);
  const [createServices, setCreateServices] = useState(null);
  const [deleteServices, setDeleteServices] = useState(null);
  const [editServices, setEditServices] = useState(null);
  const [modalServices, setModalServices] = useState(null);

// READ FIXERS
  useEffect(() => {
    axios
      .get("http://localhost:3003/admin/fixers", authConfig())
      .then((res) => setFixers(res.data));
  }, [lastUpdate]);

// READ SERVICES
  useEffect(() => {
    axios
      .get("http://localhost:3003/admin/services", authConfig())
      .then((res) => setServices(res.data));
  }, [lastUpdate]);

// CREATE SERVICE
  useEffect(() => {
    if (null === createServices) return;
    axios
      .post("http://localhost:3003/admin/services", createServices, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      })
      .catch((error) => {
      });
  }, [createServices]);

// CREATE FIXER
  useEffect(() => {
    if (null === createFixers) return;
    axios
      .post("http://localhost:3003/admin/fixers", createFixers, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      })
      .catch((error) => {
      });
  }, [createFixers]);

// DELETE SEVICE
  useEffect(() => {
    if (null === deleteServices) return;
    axios
      .delete("http://localhost:3003/admin/services/" + deleteServices.id, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      })
      .catch((error) => {
      });
  }, [deleteServices]);

// DELETE FIXER
  useEffect(() => {
    if (null === deleteFixers) return;
    axios
      .delete("http://localhost:3003/admin/fixers/" + deleteFixers.id, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      })
      .catch((error) => {
      });
  }, [deleteFixers]);

  // DELETE PHOTO
  useEffect(() => {
    if (null === deletePhoto) return;
    axios
      .delete("http://localhost:3003/admin/photos/" + deletePhoto.id, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      })
      .catch((error) => {
      });
  }, [deletePhoto]);

  // EDIT SERVICE
  useEffect(() => {
    if (null === editServices) return;
    axios
      .put("http://localhost:3003/admin/services/" + editServices.id, editServices, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      })
      .catch((error) => {
      });
  }, [editServices]);

  // EDIT FIXER
  useEffect(() => {
    if (null === editFixers) return;
    axios
      .put("http://localhost:3003/admin/fixers/" + editFixers.id, editFixers, authConfig())
      .then((res) => {
        setLastUpdate(Date.now());
      })
      .catch((error) => {
      });
  }, [editFixers]);

  return (
    <BackContext.Provider value={{
        services,
        setCreateServices,
        setDeleteServices,
        setEditServices,
        modalServices,
        setModalServices,
        fixers,
        setCreateFixers,
        setDeleteFixers,
        setEditFixers,
        setDeletePhoto,
        modalFixers,
        setModalFixers
    }}>
      {show === "create" ? (
        <>
          <Nav />
          <div className='container'>
            <div className='row justify-content-center'>
              <div className="col-6">
                  <CreateFixers />
              </div>
            </div>
          </div>
        </>
      ) : show === "fixers" ? (
        <>
          <Nav />
          <div className='container'>
            <div className='row justify-content-center'>
              <div className="col-10">
                  <ListFixers />
              </div>
            </div>
          </div>
          <EditFixers />
        </>
      ) : show === "services" ? (
        <>
          <Nav />
          <div className='container'>
            <div className='row justify-content-center'>
              <div className="col-10">
                  <ListServices />
              </div>
            </div>
          </div>
          <EditServices />
        </>
      ) : show === "admin" ? (
        <>
          <Nav />
          <div className='container'>
            <div className='row justify-content-center'>
              <div className="col-10">
                  <CreateServices />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </BackContext.Provider>
  );
}

export default Back;