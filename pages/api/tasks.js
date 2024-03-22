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
        if (!ObjectId.isValid(req.query.id)) {
          return res.status(400).json({ message: 'Invalid task ID.' });
        }

        const taskToUpdate = await collection.findOne({ _id: new ObjectId(req.query.id) });

        if (!taskToUpdate) {
          return res.status(404).json({ message: 'Task not found.' });
        }

        const updatedTask = await collection.findOneAndUpdate(
          { _id: new ObjectId(req.query.id) },
          req.body.text
            ? { $set: { text: req.body.text } }
            :
          { $set: { completed: !taskToUpdate.completed } },
          { returnDocument: 'after' }
        );

        res.status(200).json(updatedTask.value);
        break;
      case 'DELETE':
        // Valider l'ID
        if (!ObjectId.isValid(req.query.id)) {
          return res.status(400).json({ message: 'Invalid task ID.' });
        }

        const deleteResult = await collection.deleteOne({ _id: new ObjectId(req.query.id) });

        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({ message: 'Task not found.' });
        }

        res.status(204).end();
        break;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
