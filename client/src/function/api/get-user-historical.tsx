export const getUserHistorical = (
    userId: number,
    successCallback: (data: any) => void,
    errorCallback: (err: any) => void
) => {
    fetch(
        `${process.env.REACT_APP_API_URL}/hist/user/${userId}`,
        {
            method: 'GET',
        }
    )
    .then(res => res.json())
    .then(data => successCallback(data))
    .catch(err => errorCallback(err));
}