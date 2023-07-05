import { FieldValue } from "firebase-admin/firestore";
import db from "./dbconnect.js";

const coll = db.collection("task");

export async function getTasks(req,res) {
    const { uid } = req.params;
    //get all task by user;
   const task = await coll.where('uid', '==', uid).get();
   //arranges task in an array:
   const taskArray = task.docs.map(doc => ({id: doc.id, ...doc.data() }));
    res.send(taskArray);
}

export async function addTask(req,res) {
    const { title, uid } = req.body;
    if (!title || !uid ) {
        res.status(401).send({ success: false, message: "Not a valid request"});
        return;
    }
    const newTask = {
        title, 
        uid, 
        done: false,
        createdAt: FieldValue.serverTimestamp(), 
    }
    await coll.add(newTask);
    getTasks(req,res);

}

