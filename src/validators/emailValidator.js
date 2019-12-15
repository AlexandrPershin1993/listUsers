export default function emailValidator(value){
  if(value === '' || value.search(/[@]/) === -1 || value.search(/[/.]/) === -1) return false;
  return true;
}