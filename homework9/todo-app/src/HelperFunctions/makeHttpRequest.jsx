export const makeHttpRequest = (url, method = "GET", body = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      const options = {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
      };

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      resolve(data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
