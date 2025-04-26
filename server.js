const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json()); 

const users = [
    { email: "alice@example.com", password: "alice123" },
    { email: "bob@example.com", password: "bob123" },
    { email: "charlie@example.com", password: "charlie123" }
];

app.put("/update-user", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email);

    if (user) {
        user.password = password; 
        return res.json({ success: true, message: "Password updated successfully" });
    } else {
        return res.status(404).json({ success: false, message: "Email not found" });
    }
});

app.delete("/delete-user", (req, res) => {
    const { email } = req.body;

    const userIndex = users.findIndex(user => user.email === email);

    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        return res.json({ success: true, message: "User deleted successfully" });
    } else {
        return res.status(404).json({ success: false, message: "Email not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
