export const getQuizById = (id: number, callback: (data: any) => void): void => {

    fetch(`${ process.env.REACT_APP_API_URL }/quiz/${ id }`, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(data => callback(data));

}