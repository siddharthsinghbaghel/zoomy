let IS_PROD = true;
const server = IS_PROD ?
     :

    "http://localhost:8000"


export default server;
// let IS_PROD = false;
// const server = {
//     dev: "http://localhost:8000",
//     prod: "https://zoomybackend.onrender.com"
// }
// export default server;