export async function fetchCollection(endpoint) {
  const response = await fetch(endpoint)
  if (!response.ok) throw new Error(`Unable to load ${endpoint}`)
  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  return payload.results ?? payload.data ?? payload.items ?? []
}