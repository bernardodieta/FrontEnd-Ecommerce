

export const getHeader = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        withCredentials: true
    }
}