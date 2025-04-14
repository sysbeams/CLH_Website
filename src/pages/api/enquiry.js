import mysql from "mysql2/promise";
import dotenv from "dotenv";


export default async function handler(req, res) {
    dotenv.config();
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { name, tel, email, address, sponsorTel, education, source } = req.body;

    if (!name || !tel || !address || !education || !source) {
        return res.status(400).json({ message: "Fill the required fields" });
    }

    const dbConfig = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    };

    try {
        // Connect to MySQL (without specifying a database yet)
        const connection = await mysql.createConnection(dbConfig);

        // Insert enquiry data
        const insertQuery = `
            INSERT INTO Enquiries (name, tel, email, address, sponsorTel, education, source)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        await connection.execute(insertQuery, [name, tel, email, address, sponsorTel ?? "", education, source]);

        await connection.end();
        return res.status(200).json({ message: "Enquiry saved successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong. Please try again later." });
    }
}