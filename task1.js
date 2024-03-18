/*Напишите HTTP сервер и реализуйте два обработчика, где:
— По URL “/” будет возвращаться страница, на которой есть гиперссылка на 
вторую страницу по ссылке “/about”
— А по URL “/about” будет возвращаться страница, на которой 
есть гиперссылка на первую страницу “/”
— Также реализуйте обработку несуществующих роутов (404).
— * На каждой странице реализуйте счетчик просмотров. 
Значение счетчика должно увеличиваться на единицу каждый раз, к
огда загружается страница. */


const http = require('http');
const url = require('url');

// Объект, в котором будем хранить счетчики для каждого пути
const counters = {
    '/': 0,
    '/about': 0
};

// Функция для обработки запросов
function handleRequest(req, res) {
    const path = url.parse(req.url).pathname;

    // Увеличиваем счетчик просмотров для текущего пути
    counters[path]++;
    
    // В зависимости от запрошенного пути формируем содержимое страницы
    if (path === '/') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
        res.end(`<html><head><title>Главная страница</title></head><body><h1>Главная страница</h1><p>Количество просмотров: ${counters['/']}</p><a href="/about">О нас</a></body></html>`);
    } else if (path === '/about') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
        res.end(`<html><head><title>О нас</title></head><body><h1>О нас</h1><p>Количество просмотров: ${counters['/about']}</p><a href="/">Главная страница</a></body></html>`);
    } else {
        // Если запрошенный путь не совпадает ни с одним из известных, отправляем ошибку 404
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('404 Not Found');
    }
}

// Создаем HTTP сервер и слушаем порт 3000
const server = http.createServer(handleRequest);
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});