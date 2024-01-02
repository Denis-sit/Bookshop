const server = 'https://www.googleapis.com/books/v1/volumes?q="subject:Business"&key=<AIzaSyDvIpoSKK0AQ3kbwdqvaIdvQzdqKtItLf0>&printType=books&startIndex=0&maxResults=6&langRestrict=en';


export default function displayingContent(){
    fetch(server)
    .then(response => response.json())
    .then(data => console.log(data));
}