// Specify the file extension you want to import
declare module "*.yaml" {
  const value: any // Add type definitions here if desired
  export default value
}
