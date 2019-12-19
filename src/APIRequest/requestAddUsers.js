export default async function requestAddUsers(value){
  const response = await fetch(`https://reqres.in/api/users`, {
    method: 'POST',
    data: JSON.stringify(value)
  });

  if(response.status === 201){
    const data = await response.json();
    return data;
  } else {
    throw new Error('error status');
  }
}