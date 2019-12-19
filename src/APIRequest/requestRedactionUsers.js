export default async function requestRedactionUsers(value){
  const dataJSON = JSON.stringify(value.objectData);
  const response = await fetch(`https://reqres.in/api/users/${value.id}`, {
    method: 'PUT', 
    body: dataJSON,
  });
  if(response.status === 200){
    const data = await response.json();
    return data;
  } else {
    throw new Error('error status');
  }
}