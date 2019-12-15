export default async function requestListUsers(pages){
  const response = await fetch(`https://reqres.in/api/users?page=${pages}`);
  if(response.status === 200){
     const data = await response.json();
     return data;
  } else {
    throw new Error('error status');
  }
}