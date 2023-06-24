void setup() {
  Serial.begin(9600); // Initialize serial communication
  while (Serial.available() <= 0) {
    ; // Wait for Serial port to connect
  }
  
  String testString = "Hello, World!"; // The string to check
  
  if (isNumeric(testString)) {
    Serial.println("Numeric string");
  } else if (isAlpha(testString)) {
    Serial.println("Alphabetic string");
  } else {
    Serial.println("Other type of string");
  }
}

void loop() {
  // Empty loop
}

bool isNumeric(String str) {
  for (int i = 0; i < str.length(); i++) {
    if (!isdigit(str.charAt(i))) {
      return false;
    }
  }
  return true;
}

bool isAlpha(String str) {
  for (int i = 0; i < str.length(); i++) {
    if (!isalpha(str.charAt(i))) {
      return false;
    }
  }
  return true;
}
