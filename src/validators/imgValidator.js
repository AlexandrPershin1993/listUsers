export default function imgValidator(value){
  if(value === '' || value.search(/http/) === -1 || value.search(/\.jpg|\.png|\.jpeg/) === -1) return false;
  return true;
}