const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL
}

function validateEnvs(o: Record<string, unknown>) {
  Object.keys(o).forEach(key=> {
    if (o[key] == undefined) {
      throw new Error(`Env ${key} is not defined`)
    }
  })
}

validateEnvs(env)

export default env
