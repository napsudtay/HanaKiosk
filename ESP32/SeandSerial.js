let port;
let reader;
let monitorOutput;




function test(){
    monitorOutput = document.getElementById('serialMonitor');
    document.getElementById('sendButton').disabled = false;
    //ไปเปิดบรรทัดที่ 37 ด้วย message
}

async function openSerial() {
    try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 9600 });

        console.log('Port opened successfully.');

        reader = port.readable.getReader();
        test();

        // Start reading data from the serial port
        readSerialData();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function sendSerialMessage(message) {
    try {

        const writer = port.writable.getWriter();
        const encoder = new TextEncoder();

        // message = document.getElementById('messageInput').value;
        const encodedMessage = encoder.encode(message);

        await writer.write(encodedMessage);
        await writer.close();

        console.log('Message sent successfully.');
    } catch (error) {
        console.error('Error:', error);
    }
}

async function readSerialData() {
    console.log('readSerialData');
    try {
        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                break;
            }
            // Convert the received data to a string and append it to the serial monitor
            const decoder = new TextDecoder();
            const decodedData = decoder.decode(value);
            monitorOutput.value += decodedData;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// document.getElementById('openButton').addEventListener('click', openSerial);
// document.getElementById('sendButton').addEventListener('click', sendSerialMessage);