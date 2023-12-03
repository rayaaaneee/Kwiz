export const login = (jsonBody: {}, then: (res: any) => void) => {
    fetch(`${ process.env.REACT_APP_API_URL }/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonBody),
    }).then(res => res.json()).then(data => then(data))
    .catch(err => {
        // Toast erreur
        console.log(err)
    });
}