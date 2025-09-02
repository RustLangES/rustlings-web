/**
 * Hacer una petición a una API
 * @param {string} method - Método de la petición en mayúsculas Ej: GET, POST, PUT, DELETE
 * @param {string} url - URL completa de la API
 * @param {Object} payload - Body/Cuerpo de la petición
 * @returns {Promise} - Promesa con la respuesta de la petición
 */
export async function hitApi(
  method: string,
  url: string,
  payload: Object,
): Promise<any> {
  const response = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: method !== "GET" ? JSON.stringify(payload) : null,
  });
  return {
    body: await response.json(),
    status: response.status,
  };
}
