function runCode() {
    const language = document.getElementById('language').value;
    const code = document.getElementById('code').value;
    const input = document.getElementById('input').value;

    const requestBody = {
        language,
        script: code,
        stdin: input
    };

    fetch('http://localhost:3000/api/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        displayOutput(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayOutput(data) {
    const outputElement = document.getElementById('output');
    if (data.error === 0) {
        outputElement.textContent = data.output || 'No output';
    } else {
        outputElement.textContent = `Error: ${data.error}`;
    }
}
