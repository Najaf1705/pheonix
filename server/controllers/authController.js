const bcrypt=require('bcryptjs');
const User = require('../models/userSchema');
const { getRandomShipments } = require('../lib/generateShipment');

const userEntry=async(req, res)=> {
    try {
        const userData = req.body;
        console.log("User data received:", userData);

        const userExists=await User.findOne({email:userData.email});

        if(userExists){
            const passMatch=await bcrypt.compare(userData.password, userExists.password);

            if(passMatch) {
                const { name, email, shipments } = userExists;
                return res.status(200).json({
                    message: "User already exists",
                    data: { name, email, shipments }
                });
            } else {
                return res.status(400).json({ message: "Password does not match" });
            }
        }
        else {
            const newUser = new User({
                name: " ",
                email: userData.email,
                password: userData.password,
                shipments: getRandomShipments(4)
            });
            await newUser.save();
            const { name, email, shipments } = newUser;
            res.status(201).json({
                message: "User registered successfully",
                data: { name, email, shipments }
            });
        }
        
    } catch (error) {
        console.error("Error in userEntry:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const addUserName=async(req, res)=> {
    try {
        const { name, email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name;
        await user.save();

        res.status(200).json({ message: "User name updated successfully" }); 
    } catch(err){
        console.log("Could'nt add name",err);
    }
}

module.exports={
    userEntry,
    addUserName
};