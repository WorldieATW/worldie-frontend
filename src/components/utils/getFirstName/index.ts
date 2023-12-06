export const getFirstName = (fullName: string) => {
  const name = fullName.split(' ')
  return name[0]
}