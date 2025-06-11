# ITStart_test

## О проекте
Приложение представляет собой список с информацией о предстоящих семинаров. Данные хранятся в локальном JSON-файле и загружаются с помощью сервера json-server. Пользователь может редактировать или удалять записи через всплывающее модальное окно. При каждом изменении появляется окно подтверждения.

Все изменения автоматически сохраняются в основном JSON-файле seminars.json. Также предусмотрен резервный файл с исходными данными. Чтобы восстановить исходное состояние, нужно скопировать содержимое резервного файла, вставить его в seminars.json, сохранить изменения и перезапустить json-server.

## Процесс запуска
1. Клонировать репозиторий:
    ```bash
        git clone https://github.com/Alpha3625/ITStart_test.git
    ```

2. Установить необходимые пакеты:
    ```bash
        npm install
    ```

3. Запустить JSON-сервер:
    ```bash
        npm run json-server
    ```
    
4. Запустить проект:
    ```bash
        npm run dev
    ```
    
5. Параллельное выполнение команд ```npm run json-server и npm run dev```:
    ```bash
        npm run all
    ```
 
6. После запуска приложения вы можете открыть его в браузере по следующему URL:
    ```bash
        http://localhost:5173
    ```
   
## Используемые технологии
[![My Skills](https://skillicons.dev/icons?i=react,typescript,vite,sass)](https://skillicons.dev)

## Скриншоты
### 💻 Desktop
<div align="center">
    <img src="https://github.com/user-attachments/assets/165e41bf-a46d-4115-ad17-71728873ca44"/>
</div>

### 📱 Mobile
<div align="center">
    <img height="400px" src="https://github.com/user-attachments/assets/bde60af3-17af-4bec-be5b-f208201381b2"/>
    <img height="400px" src="https://github.com/user-attachments/assets/c1569eda-a6ec-4588-90a1-6d4ff0c1bf34"/>
</div>
