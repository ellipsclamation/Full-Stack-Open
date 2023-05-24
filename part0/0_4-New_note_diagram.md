sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes into text field and clicks the submit button
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of browser: Server adds new note to an array called notes

    server-->>browser: HTTP status code 302
    deactivate server
    Note right of browser: URL redirect asks the browser to do a new HTTP GET request

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content":"test","date":"2023-05-23T18:20:54.912Z"}, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes