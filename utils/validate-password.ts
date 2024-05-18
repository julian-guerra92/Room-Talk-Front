
export const isValidPassword = (password: string): boolean => {
  console.log("Esto valida el password del usuario");
  let valid = false;
  var exp = /^(?!\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%*?&])([A-Za-z\d#$@!%*?&]|[^ ]){8,25}$/;
  if (exp.test(password)) {
    valid = true;
  }
  return valid;
}

export const isPassword = (password: string): string | undefined => {
  return isValidPassword(password)
    ? undefined
    : 'La contraseña debe incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial, y su extensión debe ser entre 8 y 25 caracteres.';
}