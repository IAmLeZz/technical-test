require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const https = require('https');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect();

app.get('/store-launch-data', (req, res) => {
    connection.query('SELECT COUNT(*) as count FROM launches', (selectError, selectResults) => {
        if (selectError) {
            console.error(selectError);
            res.status(500).send('Error checking table rows');
            return;
        }
        const rowCount = selectResults[0].count;

        if (rowCount === 0) {
            https.get('https://api.spacexdata.com/v5/launches', (apiRes) => {
                // Query to count the number of rows in the launches table
                let data = '';

                apiRes.on('data', (chunk) => {
                    data += chunk;
                });

                apiRes.on('end', () => {
                    const jsonData = JSON.parse(data);

                    const launchDataValues = jsonData.map((launch) => {
                        const year = new Date(launch.date_utc).getUTCFullYear();
                        const launches = 1;
                        const succesfulLaunches = launch.success ? 1 : 0;
                        const failedLaunches = launch.success ? 0 : 1;

                        return [year, launches, succesfulLaunches, failedLaunches];
                    });

                    const uniqueYears = [...new Set(launchDataValues.map((entry) => entry[0]))];

                    uniqueYears.forEach((year) => {
                        const yearData = launchDataValues.filter((entry) => entry[0] === year);
                        const totalLaunches = yearData.length;
                        const totalSuccessfulLaunches = yearData.reduce((sum, entry) => sum + entry[2], 0);
                        const totalFailedLaunches = yearData.reduce((sum, entry) => sum + entry[3], 0);

                        connection.query(
                            'INSERT INTO launches (year, launches, successful_launches, failed_launches) VALUES (?, ?, ?, ?)',
                            [year, totalLaunches, totalSuccessfulLaunches, totalFailedLaunches],
                            (error) => {
                                if (error) {
                                    console.error(error);
                                }
                            }
                        );
                    });
                    res.send('Data stored successfully');
                });
            });

        } else {
            res.send('Data already stored');
        }
    });
})
app.get('/store-landpad-type-data', (req, res) => {
    connection.query('SELECT COUNT(*) as count FROM landpads', (selectError, selectResults) => {
        if (selectError) {
            console.error(selectError);
            res.status(500).send('Error checking table rows');
            return;
        }
        const rowCount = selectResults[0].count;

        if (rowCount === 0) {
            https.get('https://api.spacexdata.com/v4/landpads', (apiRes) => {
                let data = '';

                apiRes.on('data', (chunk) => {
                    data += chunk;
                });

                apiRes.on('end', async () => {
                    const jsonData = JSON.parse(data);
                    const asdsLandpads = jsonData.filter((landpad) => landpad.type === 'ASDS').length;
                    const rtlsLandpads = jsonData.filter((landpad) => landpad.type === 'RTLS').length;

                    try {
                        connection.query(
                            'INSERT INTO landpads (asds, rtls) VALUES (?, ?)',
                            [asdsLandpads, rtlsLandpads]
                        );
                        res.send('Data stored successfully');
                    } catch (error) {
                        console.log(error);
                        res.status(500).send('Error storing data in database');
                    }
                });
            });
        } else {
            res.send('Data already stored');
        }
    })
});

app.get('/store-payload-data', (req, res) => {
    connection.query('SELECT COUNT(*) as count FROM payloads', (selectError, selectResults) => {
        if (selectError) {
            console.error(selectError);
            res.status(500).send('Error checking table rows');
            return;
        }
        const rowCount = selectResults[0].count;

        if (rowCount === 0) {
            https.get('https://api.spacexdata.com/v4/payloads', (apiRes) => {
                let data = '';
                apiRes.on('data', (chunk) => {
                    data += chunk;
                });

                apiRes.on('end', async () => {
                    const jsonData = JSON.parse(data);
                    const payloadTypes = jsonData.map((payload) => payload.type);
                    const uniquePayloadTypes = [...new Set(payloadTypes)];

                    try {
                        for (const type of uniquePayloadTypes) {
                            const typeData = payloadTypes.filter((entry) => entry === type);
                            const totalPayloads = typeData.length;

                            connection.query(
                                'INSERT INTO payloads (type_of_payload, times_launched) VALUES (?, ?)',
                                [type, totalPayloads]
                            );
                        }
                        res.send('Data stored successfully');
                    } catch (error) {
                        console.log(error);
                        res.status(500).send('Error storing data in database');
                    }
                });
            });
        } else {
            res.send('Data already stored');
        }
    })
});

app.get('/get-launch-data', (req, res) => {
    connection.query('SELECT * FROM launches', (error, results) => {
        if (error) {
            console.error(error);
        }
        res.send(results);
    });

})

app.get('/get-landpad-type-data', (req, res) => {
    connection.query('SELECT * FROM landpads', (error, results) => {
        if (error) {
            console.error(error);
        }
        res.send(results);
    })
})


app.get('/get-payload-data', (req, res) => {
    connection.query('SELECT * FROM payloads', (error, results) => {
        if (error) {
            console.error(error);
        }
        res.send(results);
    })
})

app.listen(4000, () => {
    console.log('Server listening on port 4000 https://localhost:4000');
});
