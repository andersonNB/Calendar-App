//Archivo encargado de tener las variables de entorno
export const getEnvVariables = () => {

    // import.meta.env;
//Se comento la linea de arriba por que generaba un error al importar la variables de entorno
//se debe exportar de manera manual de la siguiente manera: 
// console.log(import.meta.env)
  return{
    // ...import.meta.env,
    VITE_API_URL:import.meta.env.VITE_API_URL,
  }
}
