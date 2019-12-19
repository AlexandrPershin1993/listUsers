export default async function requestDeleteUsers(value){
  const response = await fetch(`https://reqres.in/api/users/${value.id}`, {
    method: 'DELETE'
  });
  
  if(response.status !== 204) throw new Error('error status');
  }