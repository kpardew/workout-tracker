CREATE TABLE workouts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    reps INT,
    weight INT,
    date DATE,
    lbs BOOLEAN
);