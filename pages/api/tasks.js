// pages/api/tasks.js
import { connectToDatabase } from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const collection = db.collection('tasks');

  try {
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
        // Valider l'ID
        if (!ObjectId.isValid(req.body._id)) {
          return res.status(400).json({ message: 'Invalid task ID.' });
        }

        const updateData = {};
        if (req.body.text !== undefined) updateData.text = req.body.text;
        if (req.body.completed !== undefined) updateData.completed = req.body.completed;

        const updateResult = await collection.updateOne(
          { _id: new ObjectId(req.body._id) },
          { $set: updateData }
        );

        if (updateResult.matchedCount === 0) {
          return res.status(404).json({ message: 'Task not found.' });
        }

        res.status(200).json(updateResult);
        break;
      case 'DELETE':
        // Valider l'ID
        if (!ObjectId.isValid(req.body._id)) {
          return res.status(400).json({ message: 'Invalid task ID.' });
        }

        const deleteResult = await collection.deleteOne({ _id: new ObjectId(req.body._id) });

        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({ message: 'Task not found.' });
        }

        res.status(200).json(deleteResult);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
