// pages/api/tasks.js
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const collection = db.collection('tasks');

  switch (req.method) {
    case 'GET':
      const tasks = await collection.find({}).toArray();
      res.status(200).json(tasks);
      break;
    case 'POST':
      const task = await collection.insertOne({
        text: req.body.text,
        completed: false,
      });
      res.status(201).json(task.ops[0]);
      break;
    case 'PUT':
      const updateResult = await collection.updateOne(
        { _id: new ObjectId(req.body._id) },
        { $set: { completed: req.body.completed } }
      );
      res.status(200).json(updateResult);
      break;
    case 'DELETE':
      const deleteResult = await collection.deleteOne({ _id: new ObjectId(req.body._id) });
      res.status(200).json(deleteResult);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
