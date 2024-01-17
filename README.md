## 1 Задание
*Примерная оценка работы в сторипоинтах*  
*1 - 2ч*  
*2 - 4ч*  
*3 - 1д*  
*5 - 2д*  
*8 - неделя*

### Проектирование БД и создание диаграммы работы системы - **5**
### Бойлерплейт и первичная разметка реализации - **2**
### Сервис биллинга - **8**
    - Контроллеры
    - Модуль счетов
    - Модуль оплаты
    - Логгирование и обработка ошибок
### Сервис B2B оплаты - **3**
    - Контроллеры
    - Бизнес логика
    - Логгирование и обработка ошибок
### Гейтвей - **3**
    - Котроллеры
    - Маппинг
    - Логгирование и обработка ошибок

### Документация Swagger (если писать после реализации БЛ) - **2**
### Написание тестов (для мануального тестирования) - **3**
### Рефакторинг - **2-3**

---

## 2 задание
Файл [diagram.drawio](./diagram.drawio)

---

## 3 задание

```bash
$ docker-compose up --build -V
```
### Комментарии:
    - Не мог стабильно использовать Kafka, чтобы не тратить время перешёл на RMQ.
    - В идеале, ещё нужен сервис API Gateway, в котором будет взаимодейтсвие с пользователем по http,  
    а в микросервисы можно будет стучаться только по МС-транспорту.
    - Решил не тратить время на обработку ошибок
    - Логика БД просачивается в слой бизнес-логики, в реальном проекте такое не следует допускать
    - Нет логгирования
    - В сервисе accounting_proxy над логикой работы со статусами можно поразмыслить,  
    возможно, можно реализовать паттерном "Состояние"
    - В роутах, относящихся к микросервисному взаимодействию, следует вынести в константы имена очередей.  
    Там где происходит создание чего-то нужно реализовать механизм подтверждения выполнения (acknowledgement)
    - Многие вещи лучше держать в конфиг файлах
    
---

## 4 задание

### Регистрация

```bash
$ curl --location 'http://localhost:3000/v1/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "user@mail.com",
    "password": "1234",
    "name": "user"
}'
```

Ожидаемое поведение: Создался пользователь user, создан счёт в рублях, на счёте 0 рублей

*Для дальнейших запросов нужна авторизация*

### Авторизация

```bash
$ curl --location 'http://localhost:3000/v1/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "user@mail.com",
    "password": "1234"
}'
```
*Скопировать accessToken и прикреплять к каждому запросу*


### Создать новый счёт

```bash
$ curl --location 'http://localhost:3001/v1/billing/account' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer accessToken' \
--data '{
    "currency": "USD",
    "bankCard": {
        "cardNumber": "1234 1234 1234 1234",
        "cardHolder": "USER USER",
        "cvv": "123",
        "expirationDate": "02/24"
    },
    "requisites": {
        "inn": "123412341234",
        "kpp": "123412341234",
        "bik": "1234123412",
        "bank": "BANK BANK"
    }
}'
```

Ожидаемое поведение: Для конкретного пользователя открыт новый счёт

### Просмотр информации о счетах

```bash
$ curl --location 'http://localhost:3001/v1/billing/accounts' \
--header 'Authorization: Bearer accessToken'
```
Ожидаемое поведение: Возвращается массив счетов со всей информацией

*В дальнейшем, подставлять id нужного счёта в accountId запроса*

### B2B пополенение

```bash
$ curl --location 'http://localhost:3001/v1/billing/account/accountId/charge?method=requisites&amount=1000' \
--header 'Authorization: Bearer accessToken'
```

Ожидаемое поведение: в базе данных bills появился чек, в течении 2 минут его статус изменился на closed, появились завершающие документы, к счёту прибавилась сумма.

*Логика сервиса бухгалтерии -- если сумма меньше 100, статус не изменится*

### B2C пополнение

```bash
$ curl --location 'http://localhost:3001/v1/billing/account/accountId/charge?method=creditCard&amount=1000' \
--header 'Authorization: Bearer accessToken'
```

Ожидаемое поведение: аккаунт пополнился мнгновенно, в базе данных bills не появилось чеков

### Списание

```bash
$ curl --location 'http://localhost:3001/v1/billing/account/accountId/withdraw?amount=1400' \
--header 'Authorization: accessToken'
```

Ожидаемое поведение: При списании суммы меньше, чем баланс, она списывается. При списании суммы больше баланса ничего не происходит (даже тела ответа не приходит)

*Пополнение и списание предлагаю проверять либо подключаясь к БД, либо выполняя запрос на все счета*