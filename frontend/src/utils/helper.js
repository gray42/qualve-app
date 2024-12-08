export const getInitials = (name) => {
  if (!name) {
    return "";
  }
  const input = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(input.length, 2); i++) {
    initials += input[i][0];
  }

  return initials.toUpperCase();
};
