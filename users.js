async function ambilDataUserAsync() {
  let response = await fetch("https://jsonplaceholder.typicode.com/users");
  response = await response.json();
  return response;
}

module.exports = ambilDataUserAsync();
