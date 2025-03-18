
export default async function GetCsrfToken():Promise<string | null> {
    const response = await fetch('/get-csrf-token')
    const data = await response.json()
    return data.csrf_token
}
