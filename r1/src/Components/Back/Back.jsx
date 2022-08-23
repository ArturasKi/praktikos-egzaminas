import { useState, useEffect } from "react";
import axios from "axios";
import Nav from './Nav';
import BackContext from "./BackContext";
import { authConfig } from '../../Functions/auth.js';
import Create from "./Fixers/Create";
import List from "./Fixers/List";

function Back() {

  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const [fixers, setFixers] = useState(null);
  const [createFixers, setCreateFixers] = useState(null);
  const [deleteFixers, setDeleteFixers] = useState(null);
  const [editFixers, setEditFixers] = useState(null);
  const [deletePhoto, setDeletePhoto] = useState(null);

// READ FIXERS
  useEffect(() => {
    axios
      .get("http://localhost:3003/admin/fixers", authConfig())
      .then((res) => setFixers(res.data));
  }, [lastUpdate]);

// CREATE FIXER
  useEffect(() => {
    if (null === createFixers) return;
    axios
      .post("http://localhost:3003/admin/fixers", createFixers, authConfig())
      .then((res) => {
        // showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((error) => {
        // showMessage({ text: error.message, type: "success" });
      });
  }, [createFixers]);

// DELETE FIXER
  useEffect(() => {
    if (null === deleteFixers) return;
    axios
      .delete("http://localhost:3003/admin/fixers/" + deleteFixers.id, authConfig())
      .then((res) => {
        // showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((error) => {
        // showMessage({ text: error.message, type: "danger" });
      });
  }, [deleteFixers]);

  // DELETE PHOTO
  useEffect(() => {
    if (null === deletePhoto) return;
    axios
      .delete("http://localhost:3003/admin/photos/" + deletePhoto.id, authConfig())
      .then((res) => {
        // showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((error) => {
        // showMessage({ text: error.message, type: "danger" });
      });
  }, [deletePhoto]);

  // EDIT CLOTHING
  useEffect(() => {
    if (null === editFixers) return;
    axios
      .put("http://localhost:3003/admin/fixers/" + editFixers.id, editFixers, authConfig())
      .then((res) => {
        // showMessage(res.data.msg);
        setLastUpdate(Date.now()); // irasymas, update;
      })
      .catch((error) => {
        // showMessage({ text: error.message, type: "info" });
      });
  }, [editFixers]);

//   const showMessage = (msg) => {
//     setMessage(msg); // set'inam msg, kad pasirodytų;
//     setTimeout(() => setMessage(null), 5000); // vienkartinis intervalas, žinutė dingsta už 5s;
//   };

  return (
    <BackContext.Provider value={{
        fixers,
        setCreateFixers,
        setDeleteFixers,
        setEditFixers,
        setDeletePhoto
    }}>
      <Nav />
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <Create />
                </div>
                <div className="col-8">
                    <List />
                </div>
            </div>
        </div>
    </BackContext.Provider>
  );
}

export default Back;