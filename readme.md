# Backend-часть для форума brics 

### Проект написан на TS и использует следующие технологии - express, postgres, S3.

Для старта проекта необходимо склонировать репозиторий, установить все зависимости при помощи `yarn` или `npm`, я рекомендую yarn. Далее необходимо настроить конфиги подключения к бд и S3. Они указаны в соответствующих файлах директории [/#src/config/](https://github.com/DataforumIDP/brics/tree/dev/%23src/config). Последний дамп базы данных находится в корне проекта. S3 предполагалось использовать в проекте для загрузки и храниния загруженных логотипов, но в последствии от этого отказались, S3 можно выпилить или использовать для чего-то другого. Конфигурация ts так же содержится в проекте. Сценарий `compts` запустит следящую компиляцию файлов. Для старта тестового стенда сценарий `dev`. На продакшене советую использовать `pm2`. В проекте есть базовый CI/CD в виде деплоя обновления, при пуше в main ветку. 

Список эндпоинтов и примерных данных для них можно найти в [Postman Collection](https://www.postman.com/aerospace-physicist-46799223/workspace/brics/collection/32803601-74d88d68-8a3b-4092-9016-c81aa9fba07b?action=share&source=copy-link&creator=32803601). Для авторизации используется Bearer Token. 

Для поиска и проверки на существование организации пользователя используется внешний сервис [API DaData](https://dadata.ru)
