export default async function requestDeleteUsers(id){
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: 'DELETE'
    });
    if(response.status !== 204) throw new Error('error status');
  }