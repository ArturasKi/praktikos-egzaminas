function getBase64(file) {
    return new Promise((resolve, reject) => {
      // gaunamas naujas promise;
      const reader = new FileReader(); // failo skaitytuvas;
      reader.readAsDataURL(file); // pradedamas failo nuskaitymas;
      reader.onload = () => resolve(reader.result); // jei nuskaitomas, gaunamas failas į readerį, gaunamas nuskaitytas string'as;
      reader.onerror = (error) => reject(error); // jei nenuskaitomas - error;
    });
  }
  export default getBase64;