export const getQuizById = (
    id: number, 
    callback: (data: any) => void,
    errcallback: (res: any) => void = (res: any) => {}): void => {

    fetch(`${ process.env.REACT_APP_API_URL }/quiz/${ id }`, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(data => callback(data))
    .catch(err => errcallback(err));
}