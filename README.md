<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Health Monitoring System</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="app">
        <h1>Smart Health Monitoring System</h1>
        <h3>Health Tracker</h3>
        <div class="inputs">
            <div>
                <label for="water">Water Intake (in ml)</label>
                <input id="water" type="number" placeholder="Enter water intake">
            </div>
            <div>
                <label for="exercise">Exercise Duration (in min)</label>
                <input id="exercise" type="number" placeholder="Enter exercise duration">
            </div>
            <div>
                <label for="bloodsugar">Blood Sugar Level (in mg/dL)</label>
                <input id="bloodsugar" type="number" placeholder="Enter blood sugar level">
            </div>
        </div>
        <button id="submit">Submit</button>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Water Intake (ml)</th>
                    <th>Exercise Duration (min)</th>
                    <th>Blood Sugar Level (mg/dL)</th>
                </tr>
            </thead>
            <tbody id="output"></tbody>
        </table>
    </div>
    <script src="script.js"></script>
</body>

</html>

/* styles.css */
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 20px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

// src/main/java/com/example/healthmonitor/HealthData.java
package com.example.healthmonitor;

public class HealthData {
    private int id;
    private String name;
    private int heartRate;
    private String bloodPressure;

  public HealthData(int id, String name, int heartRate, String bloodPressure) {
        this.id = id;
        this.name = name;
        this.heartRate = heartRate;
        this.bloodPressure = bloodPressure;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getHeartRate() {
        return heartRate;
    }
    public void setHeartRate(int heartRate) {
        this.heartRate = heartRate;
    }
    public String getBloodPressure() {
        return bloodPressure;
    }
    public void setBloodPressure(String bloodPressure) {
        this.bloodPressure = bloodPressure;
    }
}
